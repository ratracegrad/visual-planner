<template>
    <v-container fluid class="timeSlots" id="scrollContainer">
        <v-layout row align-center style="height: 50px;">
            <GridHeader
                v-for="hour in 48"
                :key="hour"
                :headerStyle="headerStyle"
                :hour="hour"
            ></GridHeader>
        </v-layout>

        <v-layout
            row
            v-for="machine in machines"
            :key="machine.name"
            class="relative"
        >
            <template v-for="n in 48">
                <GridCell
                    :key="n"
                    :machines="machines"
                    :machine="machine"
                    :slotStyle="slotStyle"
                    :n="n"
                ></GridCell>
            </template>

            <JobEntry
                v-for="(entry, i) in machine.data"
                :key="entry.id"
                :machine="machine"
                :entry="entry"
                :slotStyle="slotStyle"
                :i="i"
            ></JobEntry>
        </v-layout>
    </v-container>
</template>

<script>
import GridHeader from '@/components/GridHeader';
import GridCell from '@/components/GridCell';
import JobEntry from '@/components/JobEntry';

export default {
    name: 'GridLayout',
    props: {
        machines: {
            type: Array,
            required: true
        },
        headerStyle: {
            type: Object,
            required: true
        },
        slotStyle: {
            type: Object,
            required: true
        }
    },
    components: {
        GridHeader,
        GridCell,
        JobEntry
    }
};
</script>

<style scoped>
.relative {
    position: relative;
}
#scrollContainer::-webkit-scrollbar {
    display: none;
}
.timeSlots {
    overflow-x: auto;
}
</style>
