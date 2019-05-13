<template>
    <v-app dark>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Visual Planner</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn light class="yellow" @click="show12 = true">12 hour</v-btn>
            <v-btn light class="yellow" @click="show12 = false">24 hour</v-btn>
        </v-toolbar>

        <v-content>
            <fifteen-layout :show12="show12"></fifteen-layout>
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
            show12: false
        };
    }
};
</script>
