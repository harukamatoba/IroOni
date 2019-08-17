<template lang='pug'>
.hello-world
    v-overlay(:value="overlay" color='primary')
        v-layout(row wrap)
            v-card.light-blue.lighten-2(width="80vw")
                v-progress-linear(striped :value="time" buffer-value='100')
                p.text-center {{time}}

    .white(v-if="time == 100")
        v-layout(align-center justify-center)
            v-card.light-blue--text(flat)
                v-card-title.display-1.font-weight-bold いろおに!!!
        v-img(max-width="400"
            max-height="300"
            aspect-ratio = "0.2"
            src= 'https://4.bp.blogspot.com/-78qHMXJjumI/UQC7a3Z1ENI/AAAAAAAALGI/eLkWo5PzEG0/s1600/setsubun_akaoni.png')
        v-layout(align-center justify-center)
            v-btn.primary(@click="change") START!!!!
    .load(v-else)

</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { aswait } from '@/utils/AsyncTimeout';

@Component
export default class HelloWorld extends Vue {
    @Prop({ type: String, default: () => '' })
    protected msg!: string;
    protected overlay = false;
    protected time: number = 0;

    protected async beforeMount() {
        if (this.$store.state.changeKaisu === 0) {
            this.overlay = true;
            for (this.time = 0; this.time < 100; this.time += 1) {
                await aswait(40);
            }
            this.overlay = false;
        } else {
            this.time = 100;
        }
        this.$store.state.changeKaisu = 1;
        const Obniz = require('obniz');
        const obniz = new Obniz('2793-7341');
        console.log(obniz);
        obniz.onconnect = async () => {
            const uart = obniz.getFreeUart();
            uart.start({tx: 0, rx: 1, gnd: 2 });

            uart.send('Hello');

            while ( 1 ) {
                if (uart.isDataExists()) {
                console.log(uart.readText());
            }
                await obniz.wait(10);
            }
        };

    }
    protected change() {
        this.$router.push('irocheck');
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.hello-world {}
</style>
