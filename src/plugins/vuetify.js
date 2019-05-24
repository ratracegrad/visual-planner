import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
    theme: {
        primary: '#FFD20A',
        sbdGreen: '#00E5B1',
        sbdYellow: '#FFD20A',
        sbdOrange: '#F98D00',
        sbdRed: '#E60000',
        sbdBlue: '#219DFF',
        sbdPurple: '#6800FF',
        sbdBlack: '#000000',
        sbdBlackGrey: '#252525',
        sbdDarkGrey: '#424242',
        sbdGrey: '#898989',
        sbdMediumGrey: '#BDBDBD',
        sbdLightGrey: '#E0E0E0',
        sbdWhite: '#FFFFFF'
    },
    iconfont: 'md'
});
