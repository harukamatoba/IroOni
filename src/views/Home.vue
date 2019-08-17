<template lang='pug'>
v-layout#Home(fill-height column)
    .main-pane
        role
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Role from '@/components/Role.vue';

@Component({
    components: {
        Role,
    },
})
export default class Home extends Vue {}
</script>

<style lang='stylus'>
@require '~@/assets/styles/entry/_view.styl';

html
    scroll-view: true;
    // static-view: true;

#Home
    .main-pane
        main-pane();
</style>
