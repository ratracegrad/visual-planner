<template>
    <div>
        <v-toolbar flat color="transparent">
            <v-toolbar-items>
                <v-icon
                    large
                    class=" ml-5 mr-3"
                    @click="filterDialog = !filterDialog"
                    >filter_list</v-icon
                >
                <v-icon large @click="appearanceShowDialog" class="mr-3"
                    >tune</v-icon
                >
                <v-icon large>insert_chart_outlined</v-icon>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-icon left large @click="changeDate('down')"
                >keyboard_arrow_left</v-icon
            >
            <span class="title">{{ dateShown }}</span>
            <v-icon right large @click="changeDate('up')"
                >keyboard_arrow_right</v-icon
            >
            <v-spacer></v-spacer>
        </v-toolbar>
        <span>
            <v-container fluid>
                <v-layout row style="overflow-y: scroll;">
                    <v-flex xs2>
                        <v-container fluid mx-0 px-0 class="timeSlots">
                            <v-layout row align-center style="height: 50px;">
                                <v-flex>
                                    <div class="text-align-center">
                                        Machine
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout
                                row
                                v-for="machine in machines"
                                :key="machine.name"
                            >
                                <div class="subheading" :style="leftSlotStyle">
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
                                        v-else-if="
                                            machine.status === 'maintenance'
                                        "
                                        color="sbdYellow"
                                        >change_history</v-icon
                                    >
                                    <span>{{ machine.name }}</span>
                                </div>
                            </v-layout>
                        </v-container>
                    </v-flex>
                    <v-flex xs10>
                        <v-container
                            fluid
                            class="timeSlots"
                            id="scrollContainer"
                        >
                            <v-layout row align-center style="height: 50px;">
                                <template v-for="hour in 48">
                                    <div
                                        class="d-inline-flex align-center justify-start slotHeader timeEntry"
                                        :style="headerStyle"
                                        :key="`${hour}-${hour}`"
                                    >
                                        {{ showHour(hour) }}
                                    </div>
                                </template>
                            </v-layout>

                            <template v-for="machine in machines">
                                <v-layout
                                    row
                                    :key="machine.name"
                                    class="relative"
                                >
                                    <template v-for="n in 48">
                                        <div
                                            class="d-inline-flex align-center justify-center slot border"
                                            :class="setBorder(n)"
                                            :style="slotStyle"
                                            :key="n"
                                            :id="`day-${machine.name}-${n}`"
                                            @drop.self="onDrop(n, $event)"
                                            @dragover="onDragOver(n, $event)"
                                            @dragenter="onDragEnter($event)"
                                            @dragleave="onDragLeave($event)"
                                        ></div>
                                    </template>

                                    <template
                                        v-for="(entry, i) in machine.data"
                                    >
                                        <div
                                            :id="`${machine.name}-${i}`"
                                            :key="`${machine.name}-${i}`"
                                            class="entry"
                                            :style="getStyle(entry)"
                                            draggable="true"
                                            @dragstart="
                                                onDragStart(entry, $event)
                                            "
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
                                                    >{{
                                                        entry.workOrderId
                                                    }}</span
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
        </span>

        <!--        <v-dialog v-model="filterDialog" max-width="500" persistent>-->
        <!--            <v-card>-->
        <!--                <v-card-title class="sbdDarkGrey text-uppercase text-xs-center">-->
        <!--                    <v-spacer></v-spacer>-->
        <!--                    <span class="headline">Work Order Filters</span>-->
        <!--                    <v-spacer></v-spacer>-->
        <!--                </v-card-title>-->
        <!--                <v-card-text class="sbdBlackGrey">-->
        <!--                    <v-form-->
        <!--                        ref="filterForm"-->
        <!--                        v-model="filterValid"-->
        <!--                        lazy-validation-->
        <!--                    >-->
        <!--                        <v-container grid-list-lg>-->
        <!--                            <v-layout>-->
        <!--                                <v-flex xs6>-->
        <!--                                    <v-combobox-->
        <!--                                        v-model="filter.searchBy"-->
        <!--                                        :items="items"-->
        <!--                                        label="Search By"-->
        <!--                                    ></v-combobox>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs6>-->
        <!--                                    <v-combobox-->
        <!--                                        v-model="filter.department"-->
        <!--                                        :items="items"-->
        <!--                                        label="Department"-->
        <!--                                    ></v-combobox>-->
        <!--                                </v-flex>-->
        <!--                            </v-layout>-->
        <!--                            <v-layout>-->
        <!--                                <v-flex xs6>-->
        <!--                                    <v-combobox-->
        <!--                                        v-model="filter.tool"-->
        <!--                                        :items="items"-->
        <!--                                        label="Select a Tool"-->
        <!--                                    ></v-combobox>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs6>-->
        <!--                                    <v-combobox-->
        <!--                                        v-model="filter.material"-->
        <!--                                        :items="items"-->
        <!--                                        label="Select a Material"-->
        <!--                                    ></v-combobox>-->
        <!--                                </v-flex>-->
        <!--                            </v-layout>-->

        <!--                            <v-layout>-->
        <!--                                <v-flex xs6>-->
        <!--                                    <v-combobox-->
        <!--                                        v-model="filter.startDate"-->
        <!--                                        :items="items"-->
        <!--                                        label="Select a Start Date"-->
        <!--                                        color="black"-->
        <!--                                    ></v-combobox>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs6>-->
        <!--                                    <v-combobox-->
        <!--                                        v-model="filter.endDate"-->
        <!--                                        :items="items"-->
        <!--                                        label="Select an End Date"-->
        <!--                                    ></v-combobox>-->
        <!--                                </v-flex>-->
        <!--                            </v-layout>-->
        <!--                        </v-container>-->
        <!--                    </v-form>-->
        <!--                </v-card-text>-->
        <!--                <v-card-actions class="sbdBlackGrey pr-3 pl-1">-->
        <!--                    <v-btn flat large color="sbdYellow" @click="reset"-->
        <!--                        >Reset Filters</v-btn-->
        <!--                    >-->
        <!--                    <v-spacer></v-spacer>-->
        <!--                    <v-btn-->
        <!--                        large-->
        <!--                        outline-->
        <!--                        color="sbdLightGrey"-->
        <!--                        @click="filterDialog = false"-->
        <!--                        >Cancel</v-btn-->
        <!--                    >-->
        <!--                    <v-btn large light color="sbdYellow" @click="handleFilterDialog">Apply</v-btn>-->
        <!--                </v-card-actions>-->
        <!--            </v-card>-->
        <!--        </v-dialog>-->

        <v-dialog v-model="showAppearanceDialog" width="500">
            <v-card>
                <v-card-title class="sbdDarkGrey text-uppercase text-xs-center">
                    <v-spacer></v-spacer>
                    <span class="headline">APPEARANCE</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="sbdBlackGrey">
                    <v-container grid-list-md mt-0 pt-0>
                        <v-layout align-center>
                            <v-flex xs3 class="subheading">Time:</v-flex>
                            <v-flex xs9>
                                <v-radio-group
                                    row
                                    v-model="appearanceDialog.time"
                                >
                                    <v-radio
                                        v-for="(time,
                                        $timeIndex) in timesComputed"
                                        :key="$timeIndex"
                                        :label="time.name"
                                        :value="time.value"
                                        color="sbdYellow"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                        <v-layout align-center>
                            <v-flex xs3 class="subheading">View By:</v-flex>
                            <v-flex xs9>
                                <v-slider
                                    :tick-labels="viewBy"
                                    :max="viewBy.length - 1"
                                    v-model="appearanceDialog.viewBy"
                                    always-dirty
                                >
                                </v-slider>
                            </v-flex>
                        </v-layout>

                        <v-layout align-center>
                            <v-flex xs3 class="subheading">Rows:</v-flex>
                            <v-flex xs9>
                                <v-slider
                                    :tick-labels="rowsComputed"
                                    :max="rowsComputed.length - 1"
                                    v-model="appearanceDialog.rows"
                                    always-dirty
                                >
                                </v-slider>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="sbdBlackGrey pr-3 pl-1">
                    <v-btn flat large color="sbdYellow" @click="appearanceReset"
                        >Reset Appearance</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        large
                        outline
                        color="sbdLightGrey"
                        @click="showAppearanceDialog = false"
                        >Cancel</v-btn
                    >
                    <v-btn
                        large
                        light
                        color="sbdYellow"
                        @click="appearanceApply"
                        >Apply</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="settingsDialog" width="500">
            <v-card>
                <v-card-title class="sbdDarkGrey text-uppercase text-xs-center">
                    <v-spacer></v-spacer>
                    <span class="headline">Appearance</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="sbdBlackGrey">
                    <v-container grid-list-md mt-0 pt-0>
                        <v-layout align-center>
                            <v-flex xs3 class="subheading">Time:</v-flex>
                            <v-flex xs9>
                                <v-radio-group
                                    row
                                    v-model="dialogAppearance.time"
                                >
                                    <v-radio
                                        v-for="(time, $timeIndex) in times"
                                        :key="$timeIndex"
                                        :label="time.name"
                                        :value="time.value"
                                        color="sbdYellow"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                        <v-layout align-center>
                            <v-flex xs3 class="subheading">View By:</v-flex>
                            <v-flex xs9>
                                <v-slider
                                    :tick-labels="viewBy"
                                    :max="viewBy.length - 1"
                                    v-model="dialogAppearance.viewBy"
                                    always-dirty
                                >
                                </v-slider>
                            </v-flex>
                        </v-layout>

                        <v-layout align-center>
                            <v-flex xs3 class="subheading">Rows:</v-flex>
                            <v-flex xs9>
                                <v-slider
                                    :tick-labels="rows"
                                    :max="rows.length"
                                    v-model="dialogAppearance.rows"
                                    always-dirty
                                >
                                </v-slider>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions class="sbdBlackGrey pr-3 pl-1">
                    <v-btn flat large color="sbdYellow">Reset Appearance</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        large
                        outline
                        color="sbdLightGrey"
                        @click="settingsDialog = false"
                        >Cancel</v-btn
                    >
                    <v-btn large light color="sbdYellow">Apply</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'FifteenLayout',
    data: () => ({
        slider: null,
        show12: false,
        dateShown: null,
        filterDialog: false,
        filterValid: false,
        filter: {},
        settingsDialog: false,
        showAppearanceDialog: false,
        appearance: {
            time: 24,
            viewBy: 0,
            rows: 1
        },
        appearanceDialog: {
            time: 24,
            viewBy: 0,
            rows: 1
        },
        dialogAppearance: {},
        ticksLabels: [{ name: '' }],
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
            },
            {
                name: 'ultima',
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
                name: 'Computer Glasses',
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
                name: 'StarTech Hub',
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
                name: 'Samsung Tablet',
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
                name: 'Livesavers',
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
                name: 'Power Outlet',
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
            },
            {
                name: 'Dasani Water',
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
                name: 'Miso Soup',
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
                name: 'Lalit',
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
                name: 'Spoon',
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
                name: 'Soup Bowl',
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
                name: 'Stapler',
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
        ],
        viewBy: ['30 Min', '2 Hours', '4 Hours', '6 Hours'],
        rows: ['S', 'M', 'L'],
        times: [{ name: '12 Hour', value: 12 }, { name: '24 Hour', value: 24 }],
        items: ['Stub 1', 'Stub 2', 'Stub 3'],
        plannerSizes: ['75px', '125px', '175px'],
        slotStyle: {
            width: '75px',
            height: '75px',
            minWidth: '75px'
        },
        leftSlotStyle: {
            height: '75px'
        },
        headerStyle: {
            width: null,
            height: '50px',
            minWidth: null
        }
    }),
    computed: {
        timesComputed() {
            return [
                { name: '12 Hour', value: 12 },
                { name: '24 Hour', value: 24 }
            ];
        },
        rowsComputed() {
            return ['Small', 'Medium', 'Large'];
        }
    },
    mounted() {
        this.dateShown = moment().format('MM/DD/YY');
    },
    methods: {
        season() {
            return this.times.value;
        },
        showHour(hour) {
            hour = hour - 1;
            if (this.show12) {
                if (hour === 0) {
                    return `12 AM`;
                } else if (hour === 47) {
                    return '';
                } else if (hour % 2 === 1) {
                    return '';
                } else if (hour < 24) {
                    return `${hour / 2} AM`;
                } else if (hour === 12) {
                    return `${hour} PM`;
                } else {
                    return `${hour / 2 - 12} PM`;
                }
            } else {
                if (hour === 0) {
                    return `00`;
                } else if (hour === 47) {
                    return '';
                } else if (hour % 2 === 1) {
                    return '';
                } else if (hour < 24) {
                    return `${hour / 2}`;
                } else {
                    return `${hour / 2}`;
                }
            }
        },
        getStyle(machine) {
            let len = this.slotStyle.width.substring(
                0,
                this.slotStyle.width.length - 2
            );
            let height = `${len - 6}px`;
            let left = `${machine.offset * len + 1}px`;
            let width = `${machine.length * len - 2}px`;
            let top = '3px';
            let borderTop = `5px solid ${machine.status}`;
            return {
                borderTop,
                left,
                width,
                top,
                height
            };
        },
        setBorder(n) {
            n = n - 1;
            if (n === 0) {
                return ['border-solid-left', 'border-dashed-right'];
            } else if (n === 47) {
                return ['border-solid-right'];
            } else if (n % 2 === 0) {
                return ['border-solid-double-left', 'border-dashed-right'];
            } else if (n % 2 === 1) {
                return '';
            } else {
                return '';
            }
        },
        onDrop(n, event) {
            n = n - 1;
            event.target.classList.remove('dragHover'); // remove highlight on day square
            const data = event.dataTransfer.getData('text');
            const item = document.getElementById(data);
            item.style.left = `${n * 75 + 1}px`;
            document.getElementById(data).style['pointer-events'] = 'unset';
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
            this._startX = event.clientX;
            this._startY = event.clientY;
            this._offsetX = document.getElementById(entry).offsetLeft;
            this._offsetY = document.getElementById(entry).offsetTop;
            this._viewportWidth = document.documentElement.clientWidth;
            this._dragElement = document.getElementById(entry);
        },
        onMouseUp() {
            this._dragElement = null;
        },
        changeDate(direction) {
            if (direction === 'up') {
                this.dateShown = moment(this.dateShown)
                    .add(1, 'day')
                    .format('MM/DD/YY');
            } else {
                this.dateShown = moment(this.dateShown)
                    .subtract(1, 'day')
                    .format('MM/DD/YY');
            }
        },
        reset(form) {
            this.$refs[form].reset();
        },
        setSize(val) {
            if (val === 'small') {
                this.styleData.height = '50px';
                this.styleData.width = '50px';
                this.styleData.minWidth = '50px';
                this.styleData.maxWidth = '50px';
            }
        },
        appearanceShowDialog() {
            this.appearanceDialog = Object.assign({}, this.appearance);
            this.showAppearanceDialog = !this.showAppearanceDialog;
        },
        appearanceReset() {
            this.appearanceDialog = Object.assign({}, this.appearance);
        },
        appearanceApply() {
            this.appearance = Object.assign({}, this.appearanceDialog);
            this.resizePlanner(this.appearance.rows);
            this.show12 = this.appearance.time === 12;

            this.showAppearanceDialog = false;
        },
        resizePlanner(size) {
            this.slotStyle.width = this.plannerSizes[size];
            this.slotStyle.height = this.plannerSizes[size];
            this.slotStyle.minWidth = this.plannerSizes[size];
            this.leftSlotStyle.height = this.plannerSizes[size];
            this.leftSlotStyle.lineHeight = this.plannerSizes[size];
            this.headerStyle.width = this.plannerSizes[size];
            this.headerStyle.minWidth = this.plannerSizes[size];
        }
    }
};
</script>

<style lang="scss">
.scroll-box-grid {
    height: 100%;
    overflow: auto;
}
.line-grid-wrap {
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    border: 2px solid white;
    color: white;
    padding: 5px 10px;
    margin: 0 0 10px;
}
.border {
    border-top: 1px solid #252525;
    border-bottom: 1px solid #252525;
}
.border-solid-right {
    border-right: 1px solid white;
}
.border-solid-left {
    border-left: 1px solid white;
}
.border-dashed-right {
    background-image: linear-gradient(white 33%, rgba(255, 255, 255, 0) 0%);
    background-position: right;
    background-size: 1px 17px;
    background-repeat: repeat-y;
}
.border-dashed-left {
    border-left: 1px dashed white;
}
.slotHeader {
    display: inline-block;
    width: 75px;
    min-width: 75px;
    height: 75px;
    box-sizing: border-box;
    text-align: center;
}
.slot {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
}
.small-size {
    width: 50px;
    min-width: 50px;
    height: 50px;
}
.medium-size {
    width: 75px;
    min-width: 75px;
    height: 75px;
}
.large-size {
    width: 100px;
    min-width: 100px;
    height: 100px;
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
.splitpanes.default-theme .splitpanes__pane {
    background-color: transparent;
}
.splitpanes.default-theme .splitpanes__pane {
    height: 20px;
}
.splitpanes.default-theme .splitpanes__splitter:after,
.splitpanes.default-theme .splitpanes__splitter:before {
    background-color: black;
}
.default-theme.splitpanes--horizontal > .splitpanes__splitter,
.default-theme .splitpanes--horizontal > .splitpanes__splitter {
    height: 40px;
}
.noScrollbar::-webkit-scrollbar {
    display: none;
}
#scrollContainer::-webkit-scrollbar {
    display: none;
}
</style>
