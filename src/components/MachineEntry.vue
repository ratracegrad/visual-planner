<template>
    <v-layout row class="align-center">
        <div class="subheading" :style="leftSlotStyle">
            <v-icon left v-if="machine.status === 'up'" color="sbdGreen"
                >arrow_upward</v-icon
            >
            <v-icon left v-else-if="machine.status === 'down'" color="sbdRed"
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
</template>

<script>
export default {
    name: 'MachineEntry',
    props: {
        machine: {
            type: Object,
            required: true
        },
        leftSlotStyle: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped></style>
