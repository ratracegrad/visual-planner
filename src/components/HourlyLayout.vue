<template>
    <v-container fluid>
        <v-layout row mb-3>
            <v-spacer></v-spacer>
            <v-btn light class="yellow" @click="show12 = true">12 hour</v-btn>
            <v-btn light class="yellow" @click="show12 = false">24 hour</v-btn>
            <v-spacer></v-spacer>
        </v-layout>
        <v-layout row style="overflow-y: scroll;">
            <!-- container left -->
            <v-flex xs2>
                <v-container fluid mr-0 pr-0 class="timeSlots">
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
                <v-container fluid ml-0 pl-0 class="timeSlots">
                    <v-layout row align-center>
                        <template v-for="n in 24">
                            <div
                                class="d-inline-flex align-center justify-center slot"
                                :key="n"
                            >
                                {{ showHour(n) }}
                            </div>
                        </template>
                    </v-layout>

                    <template v-for="machine in machines">
                        <v-layout row :key="machine.name" class="relative">
                            <template v-for="n in 24">
                                <div
                                    class="d-inline-flex align-center justify-center slot border"
                                    :key="n"
                                ></div>
                            </template>

                            <template v-for="(entry, i) in machine.data">
                                <div
                                    :key="`${machine}-${i}`"
                                    class="entry"
                                    :style="getStyle(entry)"
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
    name: 'HourlyLayout',
    data: () => ({
        show12: false,
        machines: [
            {
                name: 'Brushless Drill',
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
            }
        ]
    }),
    methods: {
        showHour(n) {
            n = n - 1;
            if (this.show12) {
                if (n === 0) {
                    return '12 AM';
                } else if (n < 12) {
                    return `${n} AM`;
                } else if (n === 12) {
                    return `${n} PM`;
                }
                return `${n - 12} PM`;
            } else {
                if (n === 0) {
                    return '00 AM';
                } else if (n < 12) {
                    return `${n} AM`;
                }
                return `${n} PM`;
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
        }
    }
};
</script>

<style scoped>
.border {
    border: 1px solid white;
}
.slot {
    display: inline-block;
    width: 75px;
    min-width: 75px;
    height: 50px;
    box-sizing: border-box;
    text-align: center;
}
.machine-title {
    height: 50px;
    line-height: 50px;
}
.timeSlots {
    overflow-x: auto;
}
.entry {
    position: absolute;
    top: 10px;
    height: 30px;
}
.relative {
    position: relative;
}
.workOrderId {
    color: white;
    padding-left: 3px;
    line-height: 30px;
}
</style>
