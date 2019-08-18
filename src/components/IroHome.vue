<template lang='pug'>
v-layout#IroHome(fill-height column)
    .main-pane
        v-breadcrumbs.py-0( :items="items" divider=">")
        v-layout.mt-1(justify-center)
            v-card(:color="roleColor[myrole]")
                v-layout(row wrap)
                    v-card-text.ma-2.my-0.title 貴方は {{ roleString[myrole] }} !!
        v-card.grey.lighten-2.ma-3.pb-3(min-width='70vw' min-height='40vh')
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
            //- v-slider.align-center(v-model="circul.value"  max=100 min= 0)
        v-dialog(v-model="dialog")
            v-card.primary-lighten-3
                v-card-title coloni とは?
                v-divider
                .text.ma-1
                    p 今までの鬼ごっことは一味違う！
                    li 鬼は逃走者をタッチするとその相手から色を奪えます。
                    li 回復スポットで色は回復します。
                    li ゲージ内の色が無くなったら負け!
                v-divider
                v-layout(wrap row)
                    v-spacer
                    v-btn.mr-5.primary(@click='dialog = false') OK

</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { aswait } from '@/utils/AsyncTimeout';

@Component
export default class IroHome extends Vue {
    protected dialog = true;
    protected window = 0;
    protected colors = ['red', 'deep-orange', 'orange',
        'amber',
        'yellow', 'lime',
        'light-green', 'green',  'cyan', 'light-blue', 'blue'];
    protected question = false;
    protected hintText = ' 色ゲージには自分に残っている"いろ"がどれくらいなのか表示されています。'
                        + '  その"いろ"が0になったら貴方の負けです。相手にタッチされることで減っていきます。'
                        + '逆に相手をタッチしたり、回復スポットにタッチするとゲージが増えます。';
    protected circul = {
        value: 0,
        width: 30,
        size: 200,
        color: 'red',
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
            this.circul.color = this.colors[Math.floor((this.circul.value) / 10) ];
        }
    protected beforeMount() {
        this.myrole = 0;
        const Obniz = require('obniz');
        const obniz = new Obniz('2793-7341');
        console.log(obniz.connectionState);
        obniz.onconnect = async () => {
            const uart = obniz.getFreeUart();
            uart.start({tx: 0, rx: 1, gnd: 2 });

            uart.send('Hello');

            while ( 1 ) {
                if (uart.isDataExists()) {
                const res = (uart.readText());
                if('0' <= res && '9' >= res) {
                    this.circul.value = (Number(res)) * 10;
                    console.log(res);
                }
                await aswait(10);
            }
                await obniz.wait(10);
            }
        };

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
