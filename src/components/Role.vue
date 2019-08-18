<template lang='pug'>
.hello-world
    v-overlay(:value="overlay" color='primary')
        v-layout(row wrap)
            v-card.light-blue.lighten-2(width="80vw")
                v-img(:src ="team" aspect-ratio=1/2 :lazy-src="def" height= 200)
                v-progress-linear(striped :value="time" buffer-value=100)
                p.text-center  {{time}}
                v-layout(wrap row)
                    p.pl-5.ml-5 loading ...

    .white(v-if="time == 100")
        v-layout(align-center justify-center)
            v-card.light-blue--text(flat)
                v-img(:src="coloni" width="70vw" height="150")
        v-layout(align-center justify-center)
            v-img(max-width="400"
                max-height="300"
                aspect-ratio = "0.2"
                src= 'https://4.bp.blogspot.com/-78qHMXJjumI/UQC7a3Z1ENI/AAAAAAAALGI/eLkWo5PzEG0/s1600/setsubun_akaoni.png')

        v-layout.mb-2(align-center justify-center)
            v-card.red(width='320' height='50')
                v-layout(align-center justify-center)
                    v-card.white.mt-1(width='300' height='42')
                        v-layout.ma-2(align-center justify-center)
                            p.pb-3.display-1.font-weight-bold.primary--text coloni
                            p で相手の色を奪い合え !!!
        v-layout(align-center justify-center)
            v-btn.primary(@click="changeGage") START!!!!
            v-btn.light-green.ml-3.white--text(@click ="changeLank") ランキング
    .load(v-else)
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { aswait } from '@/utils/AsyncTimeout';

@Component
export default class HelloWorld extends Vue {
    @Prop({ type: String, default: () => '' })
    protected msg!: string;
    protected overlay = false;
    protected time: number = 0;
    protected timetmp: number = 0;
    protected coloni = '/img/coloni.jpg';
    protected team = '/img/team-nothing.jpg';
    protected def ='https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-9/68641201_2308577176074379_4644787370032365568_o.jpg?_nc_cat=108&_nc_oc=AQkMquSvZXO9Moi4FLHpBJj4f3JnJKI18bK6oGQ0cFMq6GsouYg4UHskIJ1cALHgQZs&_nc_ht=scontent-nrt1-1.xx&oh=438abe967f97126c03dbe49e34ff2c82&oe=5DD442DE';


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
    }
    protected changeGage() {
        this.$router.push('irocheck');
    }
    protected changeLank() {
        this.$router.push('lunking');
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.hello-world {}
</style>
