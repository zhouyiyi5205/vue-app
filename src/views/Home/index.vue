<!--
 * @Author: zhouyajuan
 * @Date: 2020-08-20 08:21:56
 * @LastEditTime: 2020-09-15 10:59:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app-vant\src\views\Home\index.vue
-->
<template>
    <div class="home-page">
        <div class="home-header">
            <div class="leftInfo">
                <div class="imgDiv">
                    <img src="../../assets/avatar.png" alt="">
                </div>
                <span>{{dataInfo.name}}</span>
            </div>
            <div class="rightSeting">
                <van-icon name="setting-o" />
            </div>
        </div>

        <div class="home-title-info" v-if="dataInfo.islogoin">
            <div class="time-info">
                <span>数据截止统计</span>
                <em>{{dataInfo.time}}</em>
                <van-icon name="info-o" />
                <span>数据说明</span>
            </div>
            <div class="pay-info">
                <p>未缴账单</p>
                <span>¥ {{dataInfo.amountMoney}}</span>
                <div class="quick-payment">
                    快捷缴费
                </div>
            </div>
        </div>
        
        <div class="home-title-noInfo" v-else>
            <p>您还未绑定任何水表</p>
            <p>立即绑定享受用水的便捷之旅吧~</p>
        </div>


        <div class="myWater">
            <div class="myWater-content">
                <span class="title">我的用水</span>
                <div class="myWater-info">
                    <p class="current-author">我家</p>
                    <div class="current-author-info">
                        <ul>
                            <li v-for="(item, index) in authorInfo" :key="index">
                                <p>{{item.num}}<i v-if="item.isUnit">吨</i></p>
                                <em>{{item.numinfo}}</em>
                            </li>
                        </ul>
                    </div>
                    <div class="current-author-payInfo">
                        <van-icon name="info-o" class="warningIcon"/>
                        <span>欠费停表：刘大意 户号-61234福州鼓楼区馥郁14栋馥郁14栋馥郁14栋 </span>
                        <van-icon name="cross" class="closeIcon"/>
                    </div>
                    <div class="current-author-grid">
                        <van-grid column-num="5" :border="false">
                            <van-grid-item use-slot v-for="(item, index) in girdIcon" :key="index" >
                                <van-icon :name="item.icon" :badge="item.badgeInfo"/>
                                <span class="name">{{item.name}}</span>
                            </van-grid-item>
                        </van-grid>
                    </div>
                </div>
            </div>
        </div>
        <div class="business-processing">
            <div class="business-processing-content">
                <span class="title">业务办理</span>
                <span class="sub-title">我的办理 <em>99+</em> </span>
                <div class="business-info">
                    <van-grid column-num="4" :border="false">
                        <van-grid-item use-slot v-for="(item, index) in businessIcon" :key="index" >
                            <van-icon :name="item.icon"/>
                            <span class="name">{{item.name}}</span>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
        </div>
        <div class="feedback">
            <div class="feedback-content">
                <span class="title">我要反馈</span>
                <span class="sub-title">我的反馈</span>
                <div class="feedback-info">
                    <van-grid column-num="2" :border="false">
                        <van-grid-item use-slot v-for="(item, index) in feedbackIcon" :key="index" >
                            <van-icon :name="item.icon"/>
                            <span class="name">{{item.name}}</span>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
        </div>
        <div class="customer-service-hotline">
            <div class="customer-service-hotline-content">
                <div class="feedback-info">
                    <van-grid column-num="1" :border="false" direction="horizontal">
                        <van-grid-item use-slot v-for="(item, index) in customerService" :key="index" >
                            <van-icon :name="item.icon"/>
                            <span class="name">{{item.name}}</span>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, Popup, Icon } from 'vant';
import { selectMonthRestrictionsFiling } from '../../api/home';

export default {
  name: 'Home',
  data () {
    return {
      show: false,
      dataInfo: {
        name: '刘保军',
        time: '2020.9.11 14:06',
        amountMoney: '1,172.80',
        islogoin: true,
      },
      authorInfo: [
        { num: '15', numinfo: '9月份水量', isUnit: true },
        { num: '98', numinfo: '今年水量', isUnit: true },
        { num: '100.00', numinfo: '预存金额', isUnit: false }
      ],
      girdIcon: [
        { name: '自助抄表', icon: 'location-o', badgeInfo: '待抄表' },
        { name: '预存充值', icon: 'like-o' },
        { name: '电子发票', icon: 'star-o' },
        { name: '用水统计', icon: 'phone-o' },
        { name: '用户绑定', icon: 'setting-o' }
      ],
      businessIcon: [
        { name: '用水报装', icon: 'location-o', badgeInfo: '待抄表' },
        { name: '过户更名', icon: 'like-o' },
        { name: '报事报修', icon: 'star-o' },
        { name: '用水性质', icon: 'phone-o' },
        { name: '阶梯人口', icon: 'location-o', badgeInfo: '待抄表' },
        { name: '低保申请', icon: 'like-o' },
        { name: '水表报亭', icon: 'star-o' },
        { name: '水表复装', icon: 'phone-o' },
        { name: '销户', icon: 'location-o', badgeInfo: '待抄表' },
        { name: '移管申请', icon: 'like-o' },
        { name: '水表迁移', icon: 'star-o' },
        { name: '口径变更', icon: 'phone-o' }
      ],
      feedbackIcon: [
        { name: '违章举报', icon: 'star-o' },
        { name: '意见反馈', icon: 'phone-o' } 
      ],
      customerService: [
        { name: '客服热线', icon: 'phone-o' } 
      ]
    }
  },
  mounted() {
      this.initFn();
  },
  methods: {
    async initFn () {
      // 限制日期
      const { status, resultData, errorMessage } = await selectMonthRestrictionsFiling()
      if (status === 'complete') {
        console.log('YYY---', resultData)
      } else {

      }
    },
    showPopup() {
      this.show = true;
    },
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
    background-color: #F5F5F5;
    .home-header {
        width: 100%;
        padding: 0px 15px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 5px;
        position: fixed;
        background-color: #F5F5F5;
        z-index: 99;
        .leftInfo {
            float: left;
            .imgDiv {
                width: 25px;
                height: 25px;
                display: inline-block;
                vertical-align: middle;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100px;
                }
            }
            span {
                font-size: 16px;
                color: #000000;
                font-weight: 700;
                vertical-align: middle;
            }
        }
        .rightSeting {
            float: right;
            font-size: 18px;
            padding-top: 4px;
            vertical-align: middle;
        }
    }
    .home-title-info {
        margin: 0px 15px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: linear-gradient(to right,#3481ff, #36b1ff);
        padding-top: 42px;
        .time-info {
            height: auto;
            color: #6aa9ff;
            font-size: 12px;
            text-align: left;
            padding-top:  8px;
            padding-left: 15px;
            em {
                font-style: normal;
            }
            .van-icon {
                // vertical-align: middle;
            }
        }
        .pay-info {
            text-align: left;
            color: #ffffff;
            padding: 40px 0px 15px 15px;
            p {
                font-size: 14px;
            }
            span {
                font-size: 20px;
            }
            .quick-payment {
                background-color: rgba(0, 0, 0, 0.3);
                height: 25px;
                line-height: 25px;
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
                color: #ffffff;
                font-size: 14px;
                width: 100px;
                float: right;
                margin-top: 5px;
                text-align: center;
                background-color: #359aff;
                .van-icon {
                    vertical-align: middle;
                    padding-left: 15px;
                }
            }
        }
    }
    .home-title-noInfo {
        margin: 0px 15px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: linear-gradient(to right,#3481ff, #36b1ff); 
        font-size: 14px;
        line-height: 28px;
        color: #ffffff;
        padding: 10px;
    }
    .myWater {
        background-color: #fdfdfd;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding-bottom: 5px;
        .myWater-content {
            margin: 0px 15px;
            padding-top: 10px;
            .title {
                display: inline-block;
                width: 100%;
                font-size: 14px;
                font-weight: 700;
                text-align: left;
                padding-bottom: 8px;
                color: #080808;
            }
            .myWater-info {
                width: 100%;
                // height: 200px;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                background-color: #ffffff;
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
                    margin-top: 10px;
                    ul {
                        li {
                            width: calc(100% / 3 - 10px);
                            display: inline-block;
                            border-right: 1px solid #e7e7e7;
                            p {
                                color: #5f97f4;
                                font-size: 24px;
                                font-weight: bold;
                                margin: 0px;
                                padding: 0px;
                                margin-bottom: -8px;
                                i {
                                    font-style: normal;
                                    font-size: 12px;
                                }
                            }
                            em {
                                color: #98989f;
                                font-style: normal;
                                font-size: 12px;
                                font-weight: 700;
                            }
                        }
                        li:last-child {
                            border-right: 0px solid transparent;
                        }
                    }
                }
                .current-author-payInfo {
                    border-top: 1px solid #e7e7e7;
                    border-bottom: 1px solid #e7e7e7;
                    font-size: 12px;
                    color: #999999;
                    
                    margin: 15px 15px 0px;
                    text-align: left;
                    position: relative;
                    span {
                        text-indent: 1.5em;
                        display: inline-block;
                        height: 28px;
                        line-height: 28px;
                        width: calc(100% - 24px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-family:"Times New Roman", Times, serif;
                    }
                    .warningIcon {
                        color: #f64357;
                        position: absolute;
                        left: 0;
                        top: 10px;
                    }
                    .closeIcon {
                        position: absolute;
                        right: 0;
                        top: 10px;
                    }
                }
                .current-author-grid {
                    padding-top: 10px;
                    .name {
                        color: #98989f;
                        font-size: 12px;
                        margin-top: 15px;
                    }
                    .van-info {
                        padding-top: 2px;
                        background-color: #ff5858;
                        width: 45px;
                    }
                }
            }
        }
    }
    .business-processing {
        background-color: #fdfdfd;
        padding-bottom: 10px;
        .business-processing-content {
            margin: 0px 15px;
            text-align: left;
            padding-top: 10px;
            .title {
                width: 100%;
                font-size: 14px;
                font-weight: 700;
                padding-bottom: 8px;
                color: #080808;
            }
            .sub-title {
                color: #7d8693;
                font-size: 12px;
                position: relative;
                em {
                    font-style: normal;
                    background-color: #ff5858;
                    border-top-left-radius: 50px;
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 50px;
                    color: #ffffff;
                    font-size: 12px;
                    padding: 1px;
                    position: absolute;
                    top: -12px;
                    right: -26px;
                }
            }
            .business-info {
                width: 100%;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                padding-top: 10px;
                .name {
                    color: #98989f;
                    font-size: 12px;
                    margin-top: 15px;
                }
            }
        }
    }
    .feedback {
        background-color: #fdfdfd;
        padding-bottom: 10px;
        .feedback-content {
            margin: 0px 15px;
            text-align: left;
            padding-top: 10px;
            .title {
                width: 100%;
                font-size: 14px;
                font-weight: 700;
                padding-bottom: 8px;
                color: #080808;
            }
            .sub-title {
                color: #7d8693;
                font-size: 12px;
                position: relative;
            }
            .feedback-info {
                width: 100%;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                padding-top: 10px;
                .name {
                    color: #98989f;
                    font-size: 12px;
                    margin-top: 15px;
                }
            }
        }
    }
    .customer-service-hotline {
        background-color: #fdfdfd;
        padding-bottom: 10px;
        .customer-service-hotline-content {
            margin: 0px 15px;
            text-align: left;
            padding-top: 10px;
            .feedback-info {
                width: 100%;
                border-radius: 3px;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
                padding-top: 10px;
                .name {
                    color: #98989f;
                    font-size: 14px;
                    margin-left: 10px;
                    margin-top: -5px;
                }
                .van-icon {
                    color: #ff5858;
                }
            }
        }
    }
}
</style>
