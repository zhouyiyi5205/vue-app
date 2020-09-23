<template>
    <div class="select-content">
        <van-cell-group>
            <van-radio-group v-model="radio" >
                <van-radio v-for="(item,index) in paymentUnitList" :key="index" :name="item.value" @click="changeRadio(item.name)">
                    <van-cell :title="item.name"> 
                        <template #icon="props">
                            <van-icon name="success" v-if="props.checked"/>
                        </template>
                    </van-cell>
                </van-radio>
            </van-radio-group>
        </van-cell-group>
    </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant';

export default {
    name: 'selectContent',
    created() {
        document.title = "选择缴费机构"
    },
    data() {
        return {
            radio: '1',
            paymentUnitList: [
                {name: '上海浦东新区自来水有限公司', value: '1'},
                {name: '上海黄浦区自来水有限公司', value: '2'},
                {name: '上海闵行区自来水有限公司', value: '3'},
                {name: '上海嘉定区自来水有限公司', value: '4'}
            ]
        }
    },
    methods: {
        changeRadio(value) {
            console.log('value--', value)
            // this.$router.push({
            //     path: '/Bind',
            //     params: {name: value}
            // })
            this.$router.push({ name: 'Bind', params: { name: value }})
        }
    }
}
</script>

<style lang="less" scoped>
.select-content {
    /deep/.van-cell__title {
        text-align: left;
    }
    /deep/.van-cell__value {
        text-align: left;
    }
    /deep/.van-radio__icon .van-icon {
        border: 0px solid transparent;
    }
    /deep/.van-radio__icon--checked .van-icon {
        background-color: transparent;
        border-color: transparent;
        color: #1989fa;
    }
    /deep/.van-radio {
        position: relative;
        margin: 0px 16px;
        border-bottom: 1px solid #EEEEEE;
    }
    /deep/.van-radio__icon {
        position: absolute;
        right: 0px;
    }
    .van-cell {
        padding-left: 0px;
    }
}
</style>