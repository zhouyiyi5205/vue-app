<template>
    <div class="bind-page">
        <div class="bind-header">
            <p>欢迎绑定用水账户</p>
            <span>您还未绑定任何客户，请先绑定！</span>
        </div>
        <div class="bind-content" id="bind">
            <van-form @submit="onSubmit">
                <van-cell-group>
                    <van-field label="缴费单位" placeholder="请选择" v-model="paymentUnit"  readonly  right-icon="arrow" @click="showSelectContent" />
                    <van-field label="户号" placeholder="请填写或扫码" v-model="accountNumber"  :right-icon="scan" label-class="title_quester" @click-right-icon="getScan"/>
                    <van-row>
                        <van-col span="12">
                            <van-field label="账单验证" placeholder="月份" v-model="billValue"  :right-icon="invertedTriangle" @click="showPopup"/>
                        </van-col>
                        <van-col span="12">
                            <van-field label="抄见数" placeholder="请填写" type="number" v-model="copyNumber"  />
                        </van-col>
                    </van-row>
                    <van-field label="标签" placeholder="请选择" v-model="labelValue" readonly right-icon="arrow" @click="showSelectSpan"/>
                </van-cell-group>
                <p class="bind-userinfo" @click="goToUserInfoBind">通过手机/证件绑定</p>
                <div class="submit-button">
                    <van-button  block type="info" native-type="submit">
                        立即绑定
                    </van-button>
                    <p>最多可绑定<em>20个</em>用水账户</p>
                </div>
            </van-form>
            <input class="camera" ref="camera" type="file" accept="image/*" capture="camera" multiple @change="handleClick">
        </div>

        <!-- 弹出框 -->
        <van-popup v-model="show" round closeable close-icon="close" position="bottom" :style="{ height: '50%' }" get-container="#bind">
            <div class="title">
                <p>请选择账单月份</p>
                <span>需为最近一年账单</span>
            </div>
            <div class="content">
                <div v-for="(item,index) in mounthData" :key="index">
                    <p>{{item.year}}年账单</p>
                    <van-row gutter="20">
                        <van-col span="8" class="span8" v-for="(list, i) in item.yearMounth" :key="i" @click="selectSpan(list.mounth)">
                            <span>{{list.mounth}}月</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import scan from '../../assets/icon/scan@2x.png';
import invertedTriangle from '../../assets/icon/invertedTriangle@2x.png';
import axios from 'axios'
import { Toast } from 'vant';

export default {
    name: 'Bind',
    data() {
        return {
            scan, 
            invertedTriangle, // 图标
            show: false,
            paymentUnit: '上海浦东新区自来水有限公司',
            accountNumber: '61234',
            billValue: '5月',
            copyNumber: '269',
            labelValue: '我家',
            show: false,
            mounthData: [
                {
                    year: '2020',
                    yearMounth: [
                        { mounth: '9' },
                        { mounth: '8' },
                        { mounth: '7' },
                        { mounth: '6' },
                        { mounth: '5' },
                        { mounth: '4' },
                        { mounth: '3' },
                        { mounth: '2' },
                        { mounth: '1' },
                    ]
                }, {
                    year: '2019',
                    yearMounth: [
                        { mounth: '10' },
                        { mounth: '11' },
                        { mounth: '12' },
                    ]
                }
            ]
        }
    },
    mounted () {
       
        
    },
    // keep-alive 时。
    activated () {
        this.paymentUnit = this.$route.params &&  this.$route.params.name === 'undefined' ?  this.paymentUnit : this.$route.params.name 
    },
    methods: {
        // 选择缴费单位
        showSelectContent() {
           this.$router.push({
               path: '/Bind/module/selectContent'
           })
        },
        showPopup() {
            this.show = true;
        },
        selectSpan(value) {
            console.log('value', value)
            this.billValue = value + '月';
            this.show = false
        },
        // 标签
        showSelectSpan() {

        },
        getScan() {
            this.$refs.camera.click();
        },
        // 扫描
        handleClick() {
            let file = this.$refs.camera.files[0];
            if (!file) return;
            this.loading = true;

            console.log('上传文件前---', file)
            var forms = new FormData();
            forms.append('file', file)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            axios.post('https://mp.weixin.qq.com/wxamusic/ocr/apidebug_imagequery?action=ocr_comm', forms, config)
                .then (res => {
                    console.log(res);
                    this.loading = false;
                    if (res.data.ocrcomm_res.items.length !== 0) {
                        console.log('显示的数据--', res.data)
                        Toast({
                            message: '顶部展示',
                            position: 'top',
                        });
                    } else {
                        console.log('没数据--')
                        this.accountNumber = ''
                    }
                }).catch(err => {
                    console.log(err)
                })
    
        },
        goToUserInfoBind() {
            this.$router.push({
                path: '/Bind/householderInfo'
            })
        },
        // 提交
        onSubmit(values) {
            console.log('submit', values);
        },

    },
}
</script>

<style lang="less" scoped>
.bind-page {
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
        /deep/.title_quester::after {
            display: inline-block;
            width: 18px;
            height: 18px;
            content: '';
            vertical-align: middle;
            background: url('../../assets/icon/question@2x.png') no-repeat 3px -1px;
            background-size: cover;
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
            color: #FFFFFF;
            text-align: center;
        }
    }
    .camera {
        // visibility: hidden;
        display: none;
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
        margin: 10px 24px;
        p {
            font-family: PingFangSC-Medium;
            font-size: 17px;
            color: #333333;
            text-align: left;
        }
        .van-col {
            margin-top: 10px;
        }
        .span8 {
            text-align: center;
            span {
                display: inline-block;
                width: 90px;
                height: 32px;
                line-height: 32px;
                border: 1px solid #eeeeee;
                border-radius: 3px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #6E6E6E;
                text-align: center;
            }

        }
    }
}
</style>