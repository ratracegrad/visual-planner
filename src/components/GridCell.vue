<template>
    <AppDrop @drop="moveJobEntry" :style="slotStyle">
        <div
            class="d-inline-flex align-center justify-center slot border"
            :class="setBorder(n)"
            :style="slotStyle"
            :id="`machine-${machine.id}-${n}`"
        ></div>
    </AppDrop>
</template>

<script>
import AppDrop from '@/components/AppDrop';
export default {
    name: 'GridCell',
    props: {
        machines: {
            type: Array,
            required: true
        },
        machine: {
            type: Object,
            required: true
        },
        slotStyle: {
            type: Object,
            required: true
        },
        n: {
            type: Number,
            required: true
        }
    },
    components: {
        AppDrop
    },
    methods: {
        setBorder(n) {
            n = n - 1;
            if (n === 0) {
                return ['border-solid-left', 'border-dashed-right'];
            } else if (n === 47) {
                return ['border-solid-right'];
            } else if (n % 2 === 0) {
                return ['border-solid-left', 'border-dashed-right'];
            } else if (n % 2 === 1) {
                return '';
            } else {
                return '';
            }
        },
        moveJobEntry(payload) {
            this.$store.commit('MOVE_JOB', payload);
        }
    }
};
</script>

<style scoped>
.slot {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
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
</style>
