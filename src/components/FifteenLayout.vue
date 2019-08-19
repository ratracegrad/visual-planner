<template>
    <div>
        <v-toolbar flat color="transparent">
            <v-toolbar-items>
                <v-icon
                    large
                    class=" ml-5 mr-3"
                    @click="showFilterDialog = !showFilterDialog"
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
                <v-layout row class="scroll-vertical">
                    <v-flex xs2>
                        <v-container fluid mx-0 px-0 class="timeSlots">
                            <v-layout row align-center style="height: 50px;">
                                <v-flex>
                                    <div class="text-align-center">
                                        Machine
                                    </div>
                                </v-flex>
                            </v-layout>

                            <MachineEntry
                                v-for="machine in machines"
                                :key="machine.name"
                                :machine="machine"
                                :leftSlotStyle="leftSlotStyle"
                            ></MachineEntry>
                        </v-container>
                    </v-flex>
                    <v-flex xs10>
                        <GridLayout
                            :headerStyle="headerStyle"
                            :machines="machines"
                            :slotStyle="slotStyle"
                        ></GridLayout>
                    </v-flex>
                </v-layout>
            </v-container>
        </span>

        <v-dialog v-model="showFilterDialog" width="500">
            <v-card>
                <v-card-title class="sbdDarkGrey text-uppercase text-xs-center">
                    <v-spacer></v-spacer>
                    <span class="headline">Filters</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="sbdBlackGrey">
                    <v-form
                        ref="filterForm"
                        v-model="filterValid"
                        lazy-validation
                    >
                        <v-container grid-list-lg>
                            <v-layout>
                                <v-flex xs6>
                                    <v-combobox
                                        v-model="filter.searchBy"
                                        :items="items"
                                        label="Search By"
                                    ></v-combobox>
                                </v-flex>
                                <v-flex xs6>
                                    <v-combobox
                                        v-model="filter.department"
                                        :items="items"
                                        label="Department"
                                    ></v-combobox>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs6>
                                    <v-combobox
                                        v-model="filter.tool"
                                        :items="items"
                                        label="Select Tool"
                                    ></v-combobox>
                                </v-flex>
                                <v-flex xs6>
                                    <v-combobox
                                        v-model="filter.material"
                                        :items="items"
                                        label="Select Material"
                                    ></v-combobox>
                                </v-flex>
                            </v-layout>

                            <v-layout>
                                <v-flex xs6>
                                    <v-combobox
                                        v-model="filter.startDate"
                                        :items="items"
                                        label="Start Date"
                                        color="black"
                                    ></v-combobox>
                                </v-flex>
                                <v-flex xs6>
                                    <v-combobox
                                        v-model="filter.endDate"
                                        :items="items"
                                        label="End Date"
                                    ></v-combobox>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions class="sbdBlackGrey pr-3 pl-1">
                    <v-btn flat large color="sbdYellow" @click="reset"
                        >Reset Filters</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        large
                        outline
                        color="sbdLightGrey"
                        @click="showFilterDialog = false"
                        >Cancel</v-btn
                    >
                    <v-btn large light color="sbdYellow">Apply</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showAppearanceDialog" width="500">
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
                        @click="showAppearanceDialog = false"
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
import machines from '@/data/machines.json';
import MachineEntry from '@/components/MachineEntry';
import GridLayout from '@/components/GridLayout';

export default {
    name: 'FifteenLayout',
    components: {
        MachineEntry,
        GridLayout
    },
    data: () => ({
        show12: false,
        dateShown: null,
        filterDialog: false,
        settingsDialog: false,
        showAppearanceDialog: false,
        showFilterDialog: false,
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
        filterValid: false,
        filter: {},
        machines: machines,
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
            height: '75px',
            lineHeight: '75px'
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

<style lang="scss" scoped>
.dragHover {
    box-shadow: inset 0 0 0.2em 0.2em yellow;
}
.scroll-vertical {
    overflow-y: scroll;
}
.timeSlots {
    overflow-x: auto;
}
</style>
