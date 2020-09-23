<!--
 * @Author: zhouyajuan
 * @Date: 2020-09-22 16:33:32
 * @LastEditTime: 2020-09-23 09:41:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app-vant\src\views\Bind\householderInfo.vue
-->
<template>
    <div class="householderInfo-page" id="householderInfo">
        <div class="bind-header">
            <p>请填写户主信息</p>
            <span>您在水司已预留手机、证件信息才可以找到哦~</span>
        </div>

        <div class="bind-content" id="bind">
            <van-form >
                <van-cell-group>
                    <van-field label="姓名" placeholder="用水户主姓名" v-model="userName" clearable/>
                    <van-field label="手机号" placeholder="水司预留手机号" v-model="phoneNumber" clearable/>
                    <van-field label="验证码" placeholder="填写验证码" center clearable v-model="sms">
                        <template #button>
                            <van-button size="mini" type="default" class="sms-button" @click="getSendMessage" :disabled="isDisabled">{{buttonContent}}</van-button>
                        </template>
                    </van-field>
                    <van-field label="身份证" placeholder="用水户主身份证号" class="idCard-span" clearable readonly v-model="idCard" @click="showPopupIDCard"/>
                </van-cell-group>
                <p class="bind-userinfo" @click="goToBind">通过用水户号绑定</p>
                <div class="submit-button">
                    <van-button  block type="info" @click="onSubmit">
                        确定
                    </van-button>
                </div>
            </van-form>
        </div>

        <!-- 弹出框 -->
        <van-popup v-model="show" round closeable close-icon="close" position="bottom" :style="{ height: '50%' }" get-container="#householderInfo">
            <div class="title">
                <p>请选择证件类型</p>
                <span>需为户主在水司预留的证件</span>
            </div>
            <div class="content">
                <van-cell-group>
                    <van-radio-group v-model="radio">
                        <van-radio v-for="(item,index) in IDCardList" :key="index" :name="item.value" @click="changeRadio(item.name)">
                            <van-cell :title="item.name"> 
                                <template #icon="props">
                                    <!-- <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> -->
                                    <van-icon name="success" v-if="props.checked"/>
                                </template>
                            </van-cell>
                        </van-radio>
                    </van-radio-group>
                </van-cell-group>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant';
import invertedTriangle from '../../assets/icon/invertedTriangle@2x.png';

export default {
    name: 'householderInfo',
    data() {
        return {
            invertedTriangle,
            userName: '',
            phoneNumber: '',
            sms:'',
            idCard:'',
            isDisabled: false,
            buttonContent: '获取验证码',
            wait: 60,
            show: false,
            radio: '1',
            IDCardList: [
                {name: '身份证', value: '1'},
                {name: '往来大陆通行证', value: '2'},
                {name: '台胞证', value: '3'},
                {name: '外国人永久居留身份证', value: '4'}
            ]
        }
    },
    mounted () {

    },
    methods: {
        getSendMessage() {
            if (this.wait === 0) {
                this.isDisabled = false
                this.buttonContent = "获取验证码";
                this.wait = 60;
            } else {
                this.isDisabled = true
                this.buttonContent = this.wait + "s后重新获取";
                this.wait--;
                setTimeout(() => {
                    this.getSendMessage();
                }, 1000);
            }
        },
        showPopupIDCard() {
            this.show = true
        },
        changeRadio(value) {
            console.log('KK--', value)
            this.idCard = value
            this.show = false
        },
        goToBind() {
            this.$router.push({
                path:'/Bind'
            })
        },
        // 提交
        onSubmit(values) {
            console.log('submit', values);
        },
    }
}
</script>

<style lang="less" scoped>
.householderInfo-page{
    .bind-header {
        margin-top: 33px;;
        padding-left: 16px;
        text-align: left;
        border-bottom: 1px solid #EEEEEE;
        p {
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #1C2734;
            line-height: 26px;
        }
        span {
            display: block;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            line-height: 26px;
            line-height: 26px;
            margin-bottom: 36px
        }
    }
    .bind-content {
        display: inline-block;
        width: 100%;
        /deep/.van-cell__title {
            span {
                font-family: PingFangSC-Regular;
                font-size: 17px;
                color: #333333;
            }
        }
        /deep/.van-field__control {
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #5E6268;
        }
        /deep/.van-field__right-icon {
            font-size: 17px;
        }
        .sms-button {
            color: #999999;
            border: 1px solid #999999;
            border-radius: 100px;
            .van-button__text {
                font-size: 12px;
            }
        }
        /deep/.idCard-span {
            .van-cell__title::after {
                display: inline-block;
                width: 18px;
                height: 18px;
                content: '';
                vertical-align: middle;
                background: url('../../assets/icon/invertedTriangle@2x.png') no-repeat 3px -1px;
                background-size: cover;
            }
        }
        .bind-userinfo {
            text-align: left;
            padding-left: 16px;
            padding-top: 14px;
            padding-bottom: 14px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4466AD;
        }
        .submit-button {
            border-radius: 5px;
            margin: 62px 16px 0px;
            p {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #999999;
                text-align: center;
                line-height: 17px;
                margin-top: 12px;
                em {
                    font-style: normal;
                    color: #5f97f4;
                }
            }
        }
        .van-button__text{
            font-family: PingFangSC-Regular;
            font-size: 18px;
            text-align: center;
        }
    }
    .title {
        border-bottom: 1px solid #eeeeee;
        padding-top: 12px;
        padding-bottom: 12px;
        p {
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #333333;
            text-align: center;
            line-height: 26px;
        }
        span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;
            text-align: center;
            line-height: 26px;
        }
    }
    .content {
        /deep/.van-cell__title {
            text-align: center;
        }
        /deep/.van-radio__label {
            width: 90%;
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
}
</style>