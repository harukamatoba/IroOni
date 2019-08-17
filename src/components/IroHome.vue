<template lang='pug'>
v-layout#IroHome(fill-height column)
    .main-pane
        v-breadcrumbs.py-0( :items="items" divider=">")
        v-layout(justify-center)
            v-card(:color="roleColor[myrole]")
                v-layout(row wrap)
                    v-card-text.ma-2.title 貴方は {{ roleString[myrole] }} !!
        v-card.grey.lighten-2.ma-3(min-width='70vw' min-height='40vh')
            v-layout.primary.mx-0(row span)
                v-card-text.ml-5.pr-0.white--text.text-center.title 色ゲージ
                v-spacer
                v-btn.mt-3.ml-0(icon @click='question = true')
                    v-icon mdi-help-circle-outline
                v-dialog(v-model="question" max-width="290")
                    v-card
                        v-card-title.primary-title ヒント
                        v-divider
                        v-card.pa-4(flat) {{hintText}}
                        v-divider
                        v-layout(row wrap)
                            v-spacer
                            v-btn.primary.mr-5(@click="question = false") OK

            .hoge.text-center
                v-progress-circular.mt-5(
                    :value="circul.value" :size="circul.size"
                    :rotate="-90" :width="circul.width"
                    :color="circul.color" )
                    span.title {{ circul.value }}
            v-slider.align-center(v-model="circul.value"  max=100 min= 0)

</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class IroHome extends Vue {
    protected colors = ['black', 'red', 'deep-orange', 'orange darken-3', 'orange',
        'amber daken-2', 'amber', 'yellow darken-2',
        'yellow', 'lime accent-2', 'lime', 'lime accent-4',
        'light-green', 'green', 'teal', 'cyan', 'light-blue', 'blue', 'blue accent-3', 'indigo accent-3', 'indigo'];
    protected question = false;
    protected hintText = ' 色ゲージには自分に残っている"いろ"がどれくらいなのか表示されています。'
                        + '  その"いろ"が0になったら貴方の負けです。相手にタッチされることで減っていきます。'
                        + '逆に相手をタッチしたり、回復スポットにタッチするとゲージが増えます。';
    protected circul = {
        value: 20,
        width: 30,
        size: 200,
        color: 'primary',
    };
    protected roleColor = [ 'red', 'blue' ];
    protected roleString = [ '鬼', '逃走者' ];
    protected myrole: number|null = null;
    protected items = [
        { text: 'HOME', disabled: false, to: '/' },
        { text: 'IRO', disabled: true, herf: 'IroHome' },
    ];
    @Watch('circul.value')
        protected colorChenge() {
            this.circul.color = this.colors[Math.floor((this.circul.value) / 5) ];
        }
    protected beforeMount() {
        this.myrole = 0;
    }



}
</script>

<style lang='stylus'>
@require '~@/assets/styles/entry/_view.styl';

html
    scroll-view: true;
    // static-view: true;

#IroHome
    .main-pane
        main-pane();
</style>
