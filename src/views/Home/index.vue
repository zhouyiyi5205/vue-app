<!--
 * @Author: zhouyajuan
 * @Date: 2020-08-20 08:21:56
 * @LastEditTime: 2020-09-21 11:14:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app-vant\src\views\Home\index.vue
-->
<template>
    <div class="home-page">

        <div class="home-top-content">
            <div class="home-header">
                <div class="leftInfo">
                    <div class="imgDiv">
                        <img src="../../assets/avatar@2x.png" alt="">
                    </div>
                    <span>{{dataInfo.name}}</span>
                    <em @click="goToRealName"><img src="../../assets/icon/ic_未实名@2x.png" alt=""></em>
                </div>
                <div class="rightSeting">
                    <em><img src="../../assets/icon/ic_客服@2x.png" alt=""></em>
                    <em><img src="../../assets/icon/ic_设置@2x.png" alt=""></em>
                </div>
            </div>

            <div class="home-title-info">
                <!-- 未绑定 -->
                <!-- <div class="noBind">
                    <p>您还未绑定任何水表</p>
                    <div class="noBind-title">
                        <span>立即绑定享受用水的便捷之旅吧~</span>
                        <div class="quick-payment">
                            <em><img src="../../assets/icon/ic_living_expenses@2x.png" alt=""></em>
                            <span @click="bindFn">立即绑定</span> 
                            <van-icon name="arrow" class="arrowIcon"/>
                        </div>
                    </div>
                </div> -->
                <!-- 未绑定 -->
                <div class="noBind">
                    <div class="noBind-txt">
                        <p>您还未绑定任何水表</p>
                        <span>立即绑定享受用水的便捷之旅吧~</span>
                    </div>
                    
                    <div class="quick-payment">
                        <em><img src="../../assets/icon/ic_living_expenses@2x.png" alt=""></em>
                        <span @click="bindFn">立即绑定</span> 
                        <van-icon name="arrow" class="arrowIcon"/>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="home-bottom-content">
            <div class="myWater">
                <div class="myWater-content">
                    <span class="title">我的用水</span>
                    
                    <!-- 已绑定 -->
                    <div class="myWater-info">
                        <div class="current-author-info">
                            <ul>
                                <li v-for="(item, index) in authorInfo" :key="index">
                                    <p>{{item.num}}<i>{{item.unit}}</i></p>
                                    <em>{{item.numinfo}}</em>
                                    <span v-if="item.isTitle">待充值</span>
                                </li>
                            </ul>
                        </div>

                        <!-- :autoplay="3000"  -->
                        <van-swipe class="my-swipe" indicator-color="#A2B0C6" show-indicators>
                            <van-swipe-item v-for="(item, index) in warningInfo" :key="index">
                                <div class="current-author-payInfo">
                                    <span class="leftSpan">欠费停表</span>
                                    <div class="van-ellipsis">{{item.info}} </div>
                                </div>
                            </van-swipe-item>
                        </van-swipe>

                    </div>

                    <div class="current-author-grid">
                        <van-grid column-num="5" :border="false">
                            <van-grid-item use-slot v-for="(item, index) in girdIcon" :key="index" >
                                <em><img :src="item.icon" alt=""></em>
                                <span class="name">{{item.name}}</span>
                                <i v-if="item.badgeInfo">{{item.badgeInfo}}</i>
                            </van-grid-item>
                        </van-grid>
                    </div>
                </div>
            </div>

            <div class="business-processing">
                <div class="business-processing-content">

                    <van-cell title="业务办理" is-link>
                        <span>我的办理</span>
                        <!-- <em>12</em> -->
                    </van-cell>

                    <div class="business-info">
                        <van-grid column-num="4" :border="false">
                            <van-grid-item use-slot v-for="(item, index) in businessIcon" :key="index" >
                                <em><img :src="item.icon" alt=""></em>
                                <span class="name">{{item.name}}</span>
                            </van-grid-item>
                        </van-grid>
                    </div>
                </div>
            </div>

            <div class="feedback">
                <div class="feedback-content">
                    <van-cell title="我要反馈" is-link>
                        <span>我的反馈</span>
                        <!-- <em>10</em> -->
                    </van-cell>

                    <div class="feedback-info">
                        <ul>
                            <li>
                                <p>违章举报</p>
                                <em>确认可获奖励</em>
                            </li>
                            <li>
                                <p>意见反馈</p>
                                <em>欢迎您来吐槽</em>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Popup, Icon, Toast } from 'vant';
import { selectMonthRestrictionsFiling } from '../../api/home';
import myWater_First from '../../assets/icon/ic_blue_自助抄表@2x.png';
import myWater_Second from '../../assets/icon/ic_blue_预存充值@2x.png';
import myWater_Third from '../../assets/icon/ic_blue_电子发票@2x.png';
import myWater_Fourth from '../../assets/icon/ic_blue_用水统计@2x.png';
import myWater_Fifth from '../../assets/icon/ic_blue_用户绑定@2x.png';

import business_First from '../../assets/icon/ic_用水报装@2x.png';
import business_Second from '../../assets/icon/ic_过户更名@2x.png';
import business_Third from '../../assets/icon/ic_报事报修@2x.png';
import business_Fourth from '../../assets/icon/ic_用水性质@2x.png';
import business_Fifth from '../../assets/icon/ic_阶梯人口@2x.png';
import business_Sixth from '../../assets/icon/ic_低保申请@2x.png';
import business_Seventh from '../../assets/icon/ic_水表报停@2x.png';
import business_Eighth from '../../assets/icon/ic_水表复装@2x.png';
import business_Ninth from '../../assets/icon/ic_销户@2x.png';
import business_Tenth from '../../assets/icon/ic_移管申请@2x.png';
import business_Eleventh from '../../assets/icon/ic_水表迁移@2x.png';
import business_Twelfth from '../../assets/icon/ic_口径变更@2x.png';

export default {
  name: 'Home',
  data () {
    return {
      show: false,
      dataInfo: {
        name: '刘保军',
        time: '2020年5月20日15:00 PM',
        amountMoney: '1,172.80',
        islogoin: true,
      },
      authorInfo: [
        { num: '15', numinfo: '9月份水量', unit: '吨' },
        { num: '98', numinfo: '今年水量', unit: '吨' },
        { num: '100.00', numinfo: '预存金额', unit: '元', isTitle: true }
      ],
      warningInfo: [
        { info: '「刘保军」【户号-AA】福州鼓楼区馥郁14栋馥郁14栋馥郁14栋' },
        { info: '「刘保军」【户号-BB】福州鼓楼区馥郁14栋馥郁14栋馥郁14栋' }
      ],
      girdIcon: [
        { name: '自助抄表', icon: myWater_First, badgeInfo: '待抄表' },
        { name: '预存充值', icon: myWater_Second },
        { name: '电子发票', icon: myWater_Third },
        { name: '用水统计', icon: myWater_Fourth },
        { name: '用户绑定', icon: myWater_Fifth }
      ],
      businessIcon: [
        { name: '用水报装', icon: business_First },
        { name: '过户更名', icon: business_Second },
        { name: '报事报修', icon: business_Third },
        { name: '用水性质', icon: business_Fourth },
        { name: '阶梯人口', icon: business_Fifth },
        { name: '低保申请', icon: business_Sixth },
        { name: '水表报停', icon: business_Seventh },
        { name: '水表复装', icon: business_Eighth },
        { name: '销户', icon: business_Ninth },
        { name: '移管申请', icon: business_Tenth },
        { name: '水表迁移', icon: business_Eleventh },
        { name: '口径变更', icon: business_Twelfth }
      ]
    }
  },
  mounted() {
      this.initFn();
  },
  methods: {
    // 点击 -- 进入未实名已绑定
    bindFn() {
        this.$router.push({
            path: '/Bind'
        })
        // 绑定完成后 --- 暂不需要
        // this.$router.push({
        //     path: `/Home/HomeNoRealName`
        // })
    },
    // 点击 -- 进入已实名未绑定
    goToRealName() {
        this.$router.push({
            path: `/Home/HomeNoBind`
        })
    },
    async initFn () {
      // 限制日期
      const { status, resultData, errorMessage } = await selectMonthRestrictionsFiling()
      if (status === 'complete') {
        console.log('数据---', resultData)
      } else {

      }
    },
    showPopup() {
      this.show = true;
    },
    clickFn () {
        Toast({
            message: '文字提示'
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home-page {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;

    .home-top-content {
        height: 165px;
        background: linear-gradient(to top, #CFE6FF, #FAFAFA);
        .home-header {
            padding: 16px 15px;
            height: 45px;
            // line-height: 45px;
            margin-bottom: 25px;
            // background-color: #F5F5F5;
            .leftInfo {
                float: left;
                display: table-cell;
                .imgDiv {
                    width: 44px;
                    height: 44px;
                    display: inline-block;
                    vertical-align: middle;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 100px;
                    }
                }
                em {
                    width: 72px;
                    height: 21px;
                    display: inline-block;
                    vertical-align: middle;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0px;
                        left: 0px;
                    }
                }
                span {
                    font-weight: 700;
                    vertical-align: middle;
                    font-family: PingFangSC-Medium;
                    font-size: 17px;
                    color: #142233;
                    letter-spacing: -0.51px;
                    vertical-align: middle;
                }
            }
            .rightSeting {
                float: right;
                font-size: 18px;
                padding-top: 8px;
                vertical-align: middle;
                em {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                em:last-child {
                    margin-left: 15px;
                }
            }
        }
        .home-title-info {
            margin: 0px 23px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            background: linear-gradient(to right,#0061FF, #63C6FF );
            background: url('../../assets/pic_blue2@2x.png') no-repeat 0 0;
            background-size: cover;
            // 未绑定
            .noBind {
                padding-top: 30px;
                padding-left: 20px;
                padding-bottom: 18px;
                position: relative;
                .noBind-txt {
                    p {
                        font-family: PingFangSC-Semibold;
                        font-size: 14px;
                        color: #FFFFFF;
                        letter-spacing: 0.22px;
                        line-height: 21px;
                        text-align: left;
                    }
                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #000000;
                        letter-spacing: 0.18px;
                        line-height: 21px;
                        color: #ffffff;
                        text-align: left;
                        display: block;
                    }
                }
                .quick-payment {
                    position: absolute;
                    top: 40px;
                    right: 0px;
                    text-align: left;
                    height: 32px;
                    border-top-left-radius: 50px;
                    border-bottom-left-radius: 50px;
                    width: 100px;
                    float: right;
                    text-align: center;
                    background: #188CFF;
                    font-family: PingFangSC-Medium;
                    vertical-align: middle;
                    margin-top: 3px;
                    em {
                        display: inline-block;
                        width: 12px;
                        height: 13px;
                        vertical-align: middle;
                        position: relative;
                        margin-bottom: 5px;
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0px;
                            top: 0px;
                        }
                    }
                    span {
                        display: inline-block;
                        font-size: 12px;
                        color: #FFFFFF;
                        letter-spacing: 0.18px;
                        padding-left: 0px;
                        vertical-align: middle;
                        margin-bottom: 5px;
                    }
                    .arrowIcon {
                        font-size: 12px;
                        vertical-align: middle;
                        margin-bottom: 5px;
                        margin-left: -5px;
                        color: #ffffff;
                    }
                }
            }
            // 已绑定
            .bind {
                .time-info {
                    font-family: PingFangSC-Regular;
                    color: rgba(255,255,255,0.54);
                    vertical-align: middle;
                    text-align: left;
                    padding-top: 16px;
                    padding-left: 15px;
                    font-size: 12px;
                    letter-spacing: 0;
                    .infoIcon {
                        vertical-align: middle;
                    }
                    span {
                        vertical-align: middle;
                    }
                    em {
                        font-style: normal;
                        vertical-align: middle;
                    }
                }
                .pay-info {
                    font-family: PingFangSC-Semibold;
                    text-align: left;
                    color: #ffffff;
                    p {
                        font-size: 14px;
                        padding-top: 11px;
                        padding-left: 20px;
                    }
                    span {
                        margin-bottom: 5px;
                        padding-left: 20px;
                        font-size: 42px;
                        color: #FFFFFF;
                        letter-spacing: 0;
                    }
                    .quick-payment {
                        height: 32px;
                        border-top-left-radius: 50px;
                        border-bottom-left-radius: 50px;
                        width: 100px;
                        float: right;
                        margin-top: 18px;
                        text-align: center;
                        background: #188CFF;
                        font-family: PingFangSC-Medium;
                        vertical-align: middle;
                        em {
                            display: inline-block;
                            width: 12px;
                            height: 13px;
                            vertical-align: middle;
                            position: relative;
                            margin-bottom: 5px;
                            img {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                left: 0px;
                                top: 0px;
                            }
                        }
                        span {
                            display: inline-block;
                            font-size: 12px;
                            color: #FFFFFF;
                            letter-spacing: 0.18px;
                            padding-left: 0px;
                            vertical-align: middle;
                        }
                        .arrowIcon {
                            font-size: 12px;
                            vertical-align: middle;
                            margin-bottom: 5px;
                            margin-left: -5px;
                        }
                    }
                }
            }
        }
        .home-title-noInfo {
            margin: 0px 23px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            background: linear-gradient(to right,#3481ff, #36b1ff); 
            font-size: 14px;
            line-height: 28px;
            color: #ffffff;
            padding: 10px;
        }
    }
    .home-bottom-content {
        margin-top: -6px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .myWater {
        background-color: #F6F6F6;
        padding-bottom: 5px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .myWater-content {
            margin: 0px 15px;
            // padding-top: 10px;
            .title {
                display: inline-block;
                width: 100%;
                font-weight: 700;
                text-align: left;
                padding-bottom: 8px;
                font-family: PingFangSC-Semibold;
                font-size: 16px;
                color: #222F45;
                letter-spacing: 0;
            }
            .myWater-info {
                width: 100%;
                // height: 200px;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                background-color: #ffffff;
                padding-bottom: 4px;
                margin-bottom: 10px;
                display: none;
                .current-author {
                    background: linear-gradient(to bottom, #cfe1ff,#f2f8ff);
                    border-bottom-right-radius: 3px;
                    font-size: 12px;
                    float: left;
                    color: #8cb8ff;
                    padding: 3px 10px;
                    font-weight: bold;
                } 
                .current-author-info {
                    width: 100%;
                    display: inline-block;
                    margin-top: 20px;
                    margin-bottom: 8px;
                    ul {
                        li {
                            width: calc(100% / 3 - 10px);
                            display: inline-block;
                            border-right: 1px solid #e7e7e7;
                            position: relative;
                            p {
                                margin: 0px;
                                padding: 0px;
                                margin-bottom: -8px;
                                font-family: DINAlternate-Bold;
                                font-size: 20px;
                                color: #5F97F4;
                                letter-spacing: 1.43px;
                                i {
                                    font-style: normal;
                                    font-size: 12px;
                                }
                            }
                            em {
                                color: #98989f;
                                font-style: normal;
                                font-weight: 600;
                                font-family: PingFangSC-Medium;
                                font-size: 12px;
                                color: #5C6775;
                                letter-spacing: 0;
                            }
                            span {
                                background-color: #ff5858;
                                border-top-left-radius: 50px;
                                border-top-right-radius: 50px;
                                border-bottom-right-radius: 50px;
                                position: absolute;
                                top: -10px;
                                left: 55px;
                                padding: 0px 1px;
                                font-style: normal;
                                font-family: PingFangSC-Regular;
                                font-size: 8px;
                                color: #FFFFFF;
                                letter-spacing: 0;
                                padding: 0px 4px;
                            }
                        }
                        li:last-child {
                            border-right: 0px solid transparent;
                        }
                    }
                }
                .my-swipe {
                    .current-author-payInfo {
                        font-size: 12px;
                        color: #999999;
                        margin: 0px 15px 0px;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        text-align: left;
                        position: relative;
                        border-top: 1px solid #e7e7e7;
                        margin-bottom: 10px;
                        .leftSpan {
                            display: inline-block;
                            border: 1px solid #ff5858;
                            border-radius: 100px;
                            vertical-align: top;
                            padding: 0px 4px;
                            background: #FFEAEA;
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #F64357;
                            letter-spacing: 0;
                            vertical-align: middle;
                        }
                        div {
                            display: inline-block;
                            height: 28px;
                            line-height: 30px;
                            width: calc(100% - 65px);
                            // padding-bottom: 4px;
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #5C6775;
                            letter-spacing: -0.36px;
                            vertical-align: middle;
                        }
                    } 
                    .van-swipe__indicators {
                        bottom: 0px;
                    }
                    .van-swipe__indicator {
                        background-color: #A2B0C6;
                    }
                }
            }
            .current-author-grid {
                background: #ffffff;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                padding-top: 7px;
                padding-bottom: 13px;
                em {
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .name {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #5C6775;
                    letter-spacing: 0;
                }
                i {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    border-top-left-radius: 100px;
                    border-top-right-radius: 100px;
                    border-bottom-right-radius: 100px;
                    padding: 1px 3px;
                    font-style: normal;
                    font-family: PingFangSC-Regular;
                    font-size: 8px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    background-color: #5F97F4;
                }
            }
        }
    }
    .business-processing {
        background-color: #F6F6F6;
        padding-bottom: 10px;
        .business-processing-content {
            margin: 0px 15px;
            text-align: left;
            padding-top: 10px;
            .business-info {
                width: 100%;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                padding-top: 11px;
                padding-bottom: 16px;
                background-color: #fff;
                em {
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .name {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #5C6775;
                    letter-spacing: 0;
                }
            }
        }
    }
    .feedback {
        background-color: #F6F6F6;
        padding-bottom: 18px;
        .feedback-content {
            margin: 0px 15px;
            text-align: left;
            padding-top: 10px;
            .feedback-info {
                width: 100%;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                display: inline-block;
                background: #fff;
                ul {
                    li {
                        display: inline-block;
                        width: calc(100% / 2 - 10px);
                        text-align: left;
                        padding-left: 16px;
                        padding-top: 27px;
                        padding-bottom: 27px;
                        p {
                            font-family: PingFangSC-Medium;
                            font-size: 13px;
                            color: #5C6775;
                            letter-spacing: 0;
                            margin-bottom: -10px;
                        }
                        em {
                            font-family: PingFangSC-Regular;
                            font-size: 10px;
                            color: #B7C4D6;
                            letter-spacing: 0;
                            font-style: normal;
                        }
                    }
                    li:first-child {
                        background: url('../../assets/pic_banner_blue_left@2x.png') no-repeat 0 0;
                        background-size: cover;
                    }
                    li:last-child {
                        background: url('../../assets/pic_banner_blue_right@2x.png') no-repeat 0 0;
                        background-size: cover;
                    }
                }
            }
        }
    }
    .mgr20 {
        margin-right: 20px;
    }
}
.home-page {
    .van-cell {
        background: #F6F6F6;
        padding: 0px 0px 10px;
    }
    .van-grid-item__content {
        padding: 0px;
    }
    .van-cell__title {
        span {
            width: 100%;
            font-weight: 700;
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #222F45;
            letter-spacing: 0;
        }
    }
    .van-cell__value {
        position: relative;
        span {
            font-weight: 600;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #596C86;
            letter-spacing: 0;
        }
        em {
            width: 16px;
            height: 16px; 
            line-height: 18px;
            color: #ffffff;
            background-color: #ff5858;
            border-radius: 100px;
            font-size: 12px;
            font-style: normal;
            // padding: 0px 1px;
            text-align: center;
            position: absolute;
            color: #ffffff;
            top: 4px;
            right: 0px;
        }
    }
}
</style>
