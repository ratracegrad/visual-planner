<template>
    <div
        class="d-inline-flex align-center justify-start slotHeader timeEntry"
        :style="headerStyle"
    >
        {{ showHour(hour) }}
    </div>
</template>

<script>
export default {
    name: 'GridHeader',
    props: {
        headerStyle: {
            type: Object,
            required: true
        },
        hour: {
            type: Number,
            required: true
        }
    },
    methods: {
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
        }
    }
};
</script>

<style scoped>
.slotHeader {
    display: inline-block;
    width: 75px;
    min-width: 75px;
    height: 75px;
    box-sizing: border-box;
    text-align: center;
}
.timeEntry {
    margin-left: -10px;
    margin-right: 10px;
}
</style>
