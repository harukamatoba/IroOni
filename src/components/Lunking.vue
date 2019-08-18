<template lang='pug'>
v-layout#Lunking(fill-height column)
    .main-pane
        p.display-1.text-center ランキング
        v-divider.primary
        v-card.ma-1
            v-simple-table
                thead
                    tr
                        th.text-left 順位
                        th.text-left 名前
                        th.text-left 残りポイント
                tbody
                    tr(v-for ="(item,index) in list" :key="item")
                        td {{index + 1}}
                        td {{item.id}} : {{item.name}}
                        td {{item.point}}

</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Lunk from '@/LunkTmp.vue';

@Component
export default class Lunking extends Vue {
        protected list = [
                { id: '005', name: 'neko', point: 100},
                { id: '003', name: 'huga', point: 50},
                { id: '001', name: 'hoge', point: 20},
                { id: '002', name: 'hoge', point: 10},
        ];

        protected mounted() {

        }
}
</script>

<style lang='stylus'>
@require '~@/assets/styles/entry/_view.styl';

html
    scroll-view: true;
    // static-view: true;

#Lunking
    .main-pane
        main-pane();
</style>
