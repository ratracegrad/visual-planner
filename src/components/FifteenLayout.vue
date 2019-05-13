<template>
    <v-container fluid>
        <!--        <v-layout row mb-3>-->
        <!--            <v-spacer></v-spacer>-->
        <!--            <v-btn light class="yellow" @click="show12 = true">12 hour</v-btn>-->
        <!--            <v-btn light class="yellow" @click="show12 = false">24 hour</v-btn>-->
        <!--            <v-spacer></v-spacer>-->
        <!--        </v-layout>-->
        <v-layout row style="overflow-y: scroll;">
            <!-- container left -->
            <v-flex xs2>
                <v-container fluid mx-0 px-0 class="timeSlots">
                    <v-layout row align-center style="height: 50px;">
                        <v-flex>
                            <div class="text-align-center">Machine</div>
                        </v-flex>
                    </v-layout>
                    <v-layout
                        row
                        v-for="machine in machines"
                        :key="machine.name"
                    >
                        <div class="subheading machine-title">
                            {{ machine.name }}
                        </div>
                    </v-layout>
                </v-container>
            </v-flex>
            <!-- container right -->
            <v-flex xs10>
                <v-container
                    fluid
                    ml-0
                    pl-0
                    class="timeSlots"
                    id="scrollContainer"
                >
                    <v-layout row align-center style="height: 50px;">
                        <template v-for="hour in 24">
                            <template v-for="min in 4">
                                <div
                                    class="d-inline-flex align-center justify-center slot"
                                    :key="`${hour}-${min}`"
                                >
                                    {{ showHour(hour, min) }}
                                </div>
                            </template>
                        </template>
                    </v-layout>

                    <template v-for="machine in machines">
                        <v-layout row :key="machine.name" class="relative">
                            <template v-for="n in 96">
                                <div
                                    class="d-inline-flex align-center justify-center slot border"
                                    :class="setBorder(n)"
                                    :key="n"
                                    :id="`day-${machine.name}-${n}`"
                                    @drop.self="onDrop(n, $event)"
                                    @dragover="onDragOver(n, $event)"
                                    @dragenter="onDragEnter($event)"
                                    @dragleave="onDragLeave($event)"
                                ></div>
                            </template>

                            <template v-for="(entry, i) in machine.data">
                                <div
                                    :id="`${machine.name}-${i}`"
                                    :key="`${machine.name}-${i}`"
                                    class="entry"
                                    :style="getStyle(entry)"
                                    draggable="true"
                                    @dragstart="onDragStart(entry, $event)"
                                    @mousedown="
                                        onMouseDown(
                                            `${machine.name}-${i}`,
                                            $event
                                        )
                                    "
                                    @mouseup="onMouseUp()"
                                >
                                    <span class="workOrderId">{{
                                        entry.workOrderId
                                    }}</span>
                                </div>
                            </template>
                        </v-layout>
                    </template>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'FifteenLayout',
    data: () => ({
        _startX: 0,
        _startY: 0,
        _offsetX: 0,
        _offsetY: 0,
        _dragElement: null,
        _viewportWidth: null,
        _edgeSize: 500,
        _edgeRight: null,
        _edgeLeft: null,
        timer: null,
        machines: [
            {
                name: 'Brushless Drill',
                data: [
                    {
                        workOrderId: 123,
                        status: 'green',
                        offset: 2,
                        length: 8
                    },
                    {
                        workOrderId: 222,
                        status: 'red',
                        offset: 24,
                        length: 12
                    }
                ]
            },
            {
                name: 'Sample Machine',
                data: [
                    {
                        workOrderId: 123,
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        status: 'green',
                        offset: 5,
                        length: 16
                    },
                    {
                        workOrderId: 'A472',
                        status: 'grey',
                        offset: 25,
                        length: 8
                    },
                    {
                        workOrderId: 'id42',
                        status: 'red',
                        offset: 40,
                        length: 32
                    }
                ]
            },
            {
                name: 'Hair Dryer',
                data: [
                    {
                        workOrderId: 123,
                        status: 'green',
                        offset: 1,
                        length: 5
                    },
                    {
                        workOrderId: 222,
                        status: 'green',
                        offset: 7,
                        length: 1
                    },
                    {
                        workOrderId: 222,
                        status: 'grey',
                        offset: 12,
                        length: 8
                    }
                ]
            },
            {
                name: 'Blue Yeti Microphone',
                data: [
                    {
                        workOrderId: 123,
                        status: 'green',
                        offset: 2,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        status: 'red',
                        offset: 6,
                        length: 3
                    }
                ]
            },
            {
                name: 'Lucky the Cat',
                data: [
                    {
                        workOrderId: 123,
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        status: 'green',
                        offset: 5,
                        length: 4
                    },
                    {
                        workOrderId: 'A472',
                        status: 'grey',
                        offset: 13,
                        length: 2
                    },
                    {
                        workOrderId: 'id42',
                        status: 'red',
                        offset: 18,
                        length: 3
                    }
                ]
            },
            {
                name: 'Nalgene Bottle',
                data: [
                    {
                        workOrderId: 123,
                        status: 'green',
                        offset: 1,
                        length: 20
                    },
                    {
                        workOrderId: 222,
                        status: 'green',
                        offset: 27,
                        length: 1
                    },
                    {
                        workOrderId: 222,
                        status: 'grey',
                        offset: 34,
                        length: 32
                    }
                ]
            }
        ]
    }),
    props: ['show12'],
    methods: {
        showHour(hour, min) {
            let minConvertor = {
                '1': '00',
                '2': '15',
                '3': '30',
                '4': '45'
            };
            hour = hour - 1;
            min = +min;
            if (this.show12) {
                if (hour === 0) {
                    return `12:${minConvertor[min]} AM`;
                } else if (hour < 12) {
                    return `${hour}:${minConvertor[min]} AM`;
                } else if (hour === 12) {
                    return `${hour}:${minConvertor[min]} PM`;
                }
                return `${hour - 12}:${minConvertor[min]} PM`;
            } else {
                if (hour === 0) {
                    return `00:${minConvertor[min]} AM`;
                } else if (hour < 12) {
                    return `${hour}:${minConvertor[min]} AM`;
                }
                return `${hour}:${minConvertor[min]} PM`;
            }
        },
        getStyle(machine) {
            let offset = `${machine.offset * 75 + 1}px`;
            let length = `${machine.length * 75 - 2}px`;
            return {
                background: machine.status,
                left: offset,
                width: length
            };
        },
        setBorder(n) {
            // n = n - 1;
            if (n === 0) {
                return ['border-solid-left', 'border-dashed-right'];
            } else if (n % 4 === 0) {
                return ['border-solid-right', 'border-dashed-left'];
            } else if (n % 4 === 1) {
                return ['border-solid-left', 'border-dashed-right'];
            } else {
                return ['border-dashed-left', 'border-dashed-right'];
            }
        },
        onDrop(n, event) {
            n = n - 1;
            event.target.classList.remove('dragHover'); // remove highlight on day square
            const data = event.dataTransfer.getData('text');
            const item = document.getElementById(data);
            item.style.left = `${n * 75 + 1}px`;
        },
        onDragOver(n, event) {
            event.preventDefault();
        },
        onDragEnter(event) {
            event.target.classList.add('dragHover');
        },
        onDragLeave(event) {
            event.target.classList.remove('dragHover');
        },
        onDragStart(item, event) {
            event.dataTransfer.setData('text', event.target.id);
        },
        onMouseDown(entry, event) {
            this._startX = event.clientX;
            this._startY = event.clientY;
            this._offsetX = document.getElementById(entry).offsetLeft;
            this._offsetY = document.getElementById(entry).offsetTop;
            this._viewportWidth = document.documentElement.clientWidth;
            this._dragElement = document.getElementById(entry);
        },
        onMouseUp() {
            this._dragElement = null;
        }
    }
};
</script>

<style scoped>
.border {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}
.border-solid-right {
    border-right: 1px solid white;
}
.border-solid-left {
    border-left: 1px solid white;
}
.border-dashed-right {
    border-right: 1px dashed white;
}
.border-dashed-left {
    border-left: 1px dashed white;
}
.slot {
    display: inline-block;
    width: 75px;
    min-width: 75px;
    height: 75px;
    box-sizing: border-box;
    text-align: center;
}
.machine-title {
    height: 75px;
    line-height: 75px;
}
.timeSlots {
    overflow-x: auto;
}
.entry {
    position: absolute;
    bottom: 3px;
    height: 30px;
    border-radius: 10px;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
.relative {
    position: relative;
}
.workOrderId {
    color: white;
    padding-left: 8px;
    line-height: 30px;
    font-weight: 500;
}
.dragHover {
    box-shadow: inset 0 0 0.2em 0.2em yellow;
}
</style>
