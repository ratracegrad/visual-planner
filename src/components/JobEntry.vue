<template>
    <AppDrag
        :transferData="{
            type: 'grid',
            jobId: entry.id,
            fromMachine: machine.id
        }"
    >
        <div :id="`job-${entry.id}`" class="entry" :style="getStyle(entry)">
            <div>
                <v-icon left color="sbdWhite">trending_up</v-icon>
                <span class="white--text subheading font-weight-bold">{{
                    entry.workOrderId
                }}</span>
            </div>
            <div class="white--text subheading font-weight-bold">
                #{{ entry.sku }}
            </div>
        </div>
    </AppDrag>
</template>

<script>
import AppDrag from '@/components/AppDrag';

export default {
    name: 'JobEntry',
    props: {
        machine: {
            type: Object,
            required: true
        },
        entry: {
            type: Object,
            required: true
        },
        slotStyle: {
            type: Object,
            required: true
        },
        i: {
            type: Number,
            required: true
        }
    },
    components: {
        AppDrag
    },
    methods: {
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
        }
    }
};
</script>

<style scoped>
.entry {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #252525;
}
</style>
