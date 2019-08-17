<template lang='pug'>
.hello-world
    v-layout(align-center justify-center)
        v-card.light-blue--text(flat)
            v-card-title.display-1.font-weight-bold いろおに!!!
    v-img(max-width="90vw"
        max-height="300"
        aspect-ratio = "0.2"
        src= 'https://4.bp.blogspot.com/-78qHMXJjumI/UQC7a3Z1ENI/AAAAAAAALGI/eLkWo5PzEG0/s1600/setsubun_akaoni.png')
    v-layout(align-center justify-center)
        v-btn(@click="change") START!!!!
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
    @Prop({ type: String, default: () => '' })
    protected msg!: string;

    protected change() {
        this.$router.push('irocheck');
    }
}
</script>

<style lang='stylus' scoped>
@require '~@/assets/styles/entry/_variable.styl';

.hello-world {}
</style>
