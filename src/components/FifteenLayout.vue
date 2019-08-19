<template>
    <div>
        <v-toolbar flat color="transparent">
            <v-toolbar-items>
                <v-icon
                    large
                    class=" ml-5 mr-3"
                    @click="showAppearanceDialog = !showAppearanceDialog"
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
        <v-dialog v-model="showSettingsDialog" width="500">
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
        showSettingsDialog: false,
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
