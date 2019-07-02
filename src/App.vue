<template>
    <v-app dark>
        <v-content>
            <fifteen-layout></fifteen-layout>
        </v-content>
    </v-app>
</template>

<script>
import FifteenLayout from '@/components/FifteenLayout';

export default {
    name: 'App',
    components: {
        FifteenLayout
    },
    data() {
        return {
            active: null,
            show12: true
        };
    }
};
</script>
