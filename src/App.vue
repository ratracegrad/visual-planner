<template>
    <v-app dark>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Visual Planner</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-content>
            <v-tabs v-model="active" dark slider-color="yellow" centered>
                <v-tab :key="'fifteen'" @click="active = 'fifteen'">
                    Fifteen Minutes
                </v-tab>
                <v-tab :key="'hourly'" @click="active = 'fifteen'">
                    Hourly
                </v-tab>

                <v-tab-item :key="'fifteen'">
                    <fifteen-layout></fifteen-layout>
                </v-tab-item>
                <v-tab-item :key="'hourly'">
                    <hourly-layout></hourly-layout>
                </v-tab-item>
            </v-tabs>
        </v-content>
    </v-app>
</template>

<script>
import FifteenLayout from '@/components/FifteenLayout';
import HourlyLayout from '@/components/HourlyLayout';
export default {
    name: 'App',
    components: {
        FifteenLayout,
        HourlyLayout
    },
    data() {
        return {
            active: null
        };
    }
};
</script>
