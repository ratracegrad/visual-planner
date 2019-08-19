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
            const transferData = JSON.parse(e.dataTransfer.getData('payload'));
            this.$emit('drop', transferData, e.target.id);
        }
    }
};
</script>

<style scoped></style>
