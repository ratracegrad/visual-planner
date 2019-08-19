<template>
    <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AppDrop',
    methods: {
        onDrop(e) {
            const moveTo = e.target.id.split('-');
            const transferData = JSON.parse(e.dataTransfer.getData('payload'));
            transferData.toMachine = moveTo[1];
            transferData.offset = moveTo[2];
            this.$emit('drop', transferData);
        }
    }
};
</script>

<style scoped></style>
