<template>
    <v-container fluid>
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
                            <v-icon
                                left
                                v-if="machine.status === 'up'"
                                color="sbdGreen"
                                >arrow_upward</v-icon
                            >
                            <v-icon
                                left
                                v-else-if="machine.status === 'down'"
                                color="sbdRed"
                                >arrow_downward</v-icon
                            >
                            <v-icon
                                left
                                v-else-if="machine.status === 'maintenance'"
                                color="sbdYellow"
                                >change_history</v-icon
                            >
                            <span>{{ machine.name }}</span>
                        </div>
                    </v-layout>
                </v-container>
            </v-flex>
            <!-- container right -->
            <v-flex xs10>
                <v-container fluid class="timeSlots" id="scrollContainer">
                    <v-layout row align-center style="height: 50px;">
                        <template v-for="hour in 24">
                            <template v-for="min in 2">
                                <div
                                    class="d-inline-flex align-center justify-start slot timeEntry"
                                    :key="`${hour}-${min}`"
                                >
                                    {{ showHour(hour, min) }}
                                </div>
                            </template>
                        </template>
                    </v-layout>

                    <template v-for="machine in machines">
                        <v-layout row :key="machine.name" class="relative">
                            <template v-for="n in 48">
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
                                    <div>
                                        <v-icon left color="sbdWhite"
                                            >trending_up</v-icon
                                        >
                                        <span
                                            class="white--text subheading font-weight-bold"
                                            >{{ entry.workOrderId }}</span
                                        >
                                    </div>
                                    <div
                                        class="white--text subheading font-weight-bold"
                                    >
                                        #{{ entry.sku }}
                                    </div>
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
                status: 'up',
                data: [
                    {
                        workOrderId: '123',
                        sku: '04081962',
                        status: 'green',
                        maintenance: true,
                        offset: 2,
                        length: 8
                    },
                    {
                        workOrderId: '222',
                        sku: '04081962',
                        status: 'red',
                        offset: 24,
                        length: 12
                    }
                ]
            },
            {
                name: 'Sample Machine',
                status: 'down',
                data: [
                    {
                        workOrderId: 123,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 16
                    },
                    {
                        workOrderId: 'A472',
                        sku: '04081962',
                        status: 'grey',
                        offset: 25,
                        length: 8
                    }
                ]
            },
            {
                name: 'Hair Dryer',
                status: 'maintenance',
                data: [
                    {
                        workOrderId: 123,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 5
                    },
                    {
                        workOrderId: 222,
                        sku: '04081962',
                        status: 'green',
                        offset: 7,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        sku: '04081962',
                        status: 'grey',
                        offset: 12,
                        length: 8
                    }
                ]
            },
            {
                name: 'Blue Yeti Microphone',
                status: 'up',
                data: [
                    {
                        workOrderId: 123,
                        sku: '04081962',
                        status: 'green',
                        offset: 2,
                        length: 2
                    },
                    {
                        workOrderId: 222,
                        sku: '04081962',
                        status: 'red',
                        offset: 6,
                        length: 3
                    }
                ]
            },
            {
                name: 'Lucky the Cat',
                status: 'down',
                data: [
                    {
                        workOrderId: 123,
                        sku: '04081962',
                        status: 'green',
                        offset: 0,
                        length: 3
                    },
                    {
                        workOrderId: 222,
                        sku: '04081962',
                        status: 'green',
                        offset: 5,
                        length: 4
                    },
                    {
                        workOrderId: 'A472',
                        sku: '04081962',
                        status: 'grey',
                        offset: 13,
                        length: 2
                    },
                    {
                        workOrderId: 'id42',
                        sku: '04081962',
                        status: 'red',
                        offset: 18,
                        length: 3
                    }
                ]
            },
            {
                name: 'Nalgene Bottle',
                status: 'maintenance',
                data: [
                    {
                        workOrderId: 123,
                        sku: '04081962',
                        status: 'green',
                        offset: 1,
                        length: 20
                    },
                    {
                        workOrderId: 222,
                        sku: '04081962',
                        status: 'green',
                        offset: 27,
                        length: 3
                    }
                ]
            }
        ]
    }),
    props: ['show12'],
    methods: {
        showHour(hour, min) {
            console.log(min);
            if (min === 2) {
                return '';
            }
            let minConvertor = {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            };
            hour = hour - 1;
            min = +min;
            if (this.show12) {
                if (hour === 0 && min === 1) {
                    return `12AM`;
                } else if (hour < 12 && min === 1) {
                    return `${hour}AM`;
                } else if (hour === 12) {
                    return `${hour}PM`;
                }
                return `${hour - 12}PM`;
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
                borderTop: `5px solid ${machine.status}`,
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
            console.log('onDrop');
            n = n - 1;
            event.target.classList.remove('dragHover'); // remove highlight on day square
            const data = event.dataTransfer.getData('text');
            const item = document.getElementById(data);
            item.style.left = `${n * 75 + 1}px`;
            document.getElementById(data).style['pointer-events'] = 'unset';
        },
        onDragOver(n, event) {
            console.log('onDragOver');
            event.preventDefault();
        },
        onDragEnter(event) {
            console.log('onDragEnter');
            event.target.classList.add('dragHover');
        },
        onDragLeave(event) {
            console.log('onDragLeave');
            event.target.classList.remove('dragHover');
        },
        onDragStart(item, event) {
            console.log('onDragStart');
            event.dataTransfer.setData('text', event.target.id);
            let crt = event.srcElement.cloneNode(true);
            crt.style.left = 'unset';
            crt.style.right = 'unset';
            crt.style.top = 'unset';
            crt.id = 'something';
            document.body.appendChild(crt);
            event.dataTransfer.setDragImage(crt, 0, 0);
            setTimeout(function() {
                document.getElementById(event.target.id).style[
                    'pointer-events'
                ] = 'none';
            }, 0);
        },
        onMouseDown(entry, event) {
            console.log('onMouseDown');
            this._startX = event.clientX;
            this._startY = event.clientY;
            this._offsetX = document.getElementById(entry).offsetLeft;
            this._offsetY = document.getElementById(entry).offsetTop;
            this._viewportWidth = document.documentElement.clientWidth;
            this._dragElement = document.getElementById(entry);
        },
        onMouseUp() {
            console.log('onMouseUp');
            this._dragElement = null;
        },
        onMouseOver(event) {
            console.log('onMouseOver', event);
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
    top: 3px;
    height: 69px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #252525;
}
.relative {
    position: relative;
}
.workOrderId {
    color: white;
    font-weight: 500;
}
.dragHover {
    box-shadow: inset 0 0 0.2em 0.2em yellow;
}
.timeEntry {
    margin-left: -10px;
    margin-right: 10px;
}
</style>
