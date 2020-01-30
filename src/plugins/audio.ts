import APlayer from '@moefe/vue-aplayer';
import AudioVisual from "vue-audio-visual";
import Vue from 'vue';

Vue.use(APlayer, {
    defaultCover: '/img/dd.png',
    productionTip: false,
});

Vue.use(AudioVisual);