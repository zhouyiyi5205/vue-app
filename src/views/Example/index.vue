<template>
  <div class="home-page">
<!-- 
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup> -->

    <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe> -->

    <!-- <div class="stepsDiv">
        <van-steps :active="active">
            <van-step v-for="(item, index) in steps" :key="index">
                <span >{{item.text}}</span>
            </van-step>
        </van-steps>
    </div> -->

<!-- 
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid> -->
    
    <!-- 图表 -->
    <div class="chart-box">
        <bar-chart :option="chartTwoOption" chart-id="chartTwo" style="height:330px" />
    </div>

    <!-- 当前的进度条 -->
    <div class="steps-content">
        <ul>
            <li v-for="(item, index) in stepsContent" :key="index">
                <span :class="item.isActive ? 'active' : ''">{{item.text}}</span>
                <p>{{item.desc}}</p>
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
import { Button, Popup, Steps } from 'vant';
import BarChart from '@/components/chart/BarChart';
// import Canvas from '@/components/Canvas/Canvas';
import { selectAreaWaterVolume, OCR } from '../../api/home';
import axios from 'axios'

export default {
  name: 'Example',
  components: {
    BarChart,
    // Canvas
  },
  data () {
    return {
        show: false,
        active: 0,
        stepsContent: [
            { text: 1, desc: '短信验证', isActive: true },
            { text: 2, desc: '证件验证' },
            { text: 3, desc: '人脸认证' },
        ],
        steps: [
            { text: '短信验证', desc: '描述信息' },
            { text: '证件验证', desc: '描述信息' },
            { text: '人脸认证', desc: '描述信息' } 
        ],
        chartTwoOption: {
            tooltip: {
                axisPointer: { type: 'none' }
            },
            grid: [{ left: '5%', right: '5%' }],
            color: ['#5790FB', '#9B92F3'],
            legend: {
            type: 'scroll',
            bottom: 0,
            icon: ['rect', 'triangle'],
            data: [
                { name: '用水总量(m³)', icon: 'rect' },
                { name: '上报率(%)', icon: 'line' }
            ],
            textStyle: {
                rich: {
                    a: { width: 'auto', align: 'left' },
                    b: { width: 'auto', align: 'left' }
                }
            }
            },
            xAxis: [{
                data: [],
                axisPointer: { type: 'shadow' }
            }],
            yAxis: [
                {
                    type: 'value',
                    name: '用水总量(m³)',
                    axisLabel: { formatter: '{value} m³', color: '#333' },
                    axisTick: { show: false },
                    axisLine: { show: false }
                },
                {
                    type: 'value',
                    name: '上报率(%)',
                    axisLabel: { formatter: '{value} %', color: '#333' },
                    axisTick: { show: false },
                    axisLine: { show: false }
                }
            ],
            series: [
                {
                    name: '用水总量(m³)', type: 'bar', barWidth: '5px',
                    itemStyle: { barBorderRadius: [6, 6, 0, 0] },
                    data: []
                },
                {
                    name: '上报率(%)', type: 'line', barWidth: '2px',
                    itemStyle: { barBorderRadius: [6, 6, 0, 0] },
                    yAxisIndex: 1,
                    data: []
                }
            ]
        }
    }
  },
  mounted() {
    this.selectAreaWaterVolume();
  },
  methods: {
    // 右下角
    async selectAreaWaterVolume() {
      const params = {
        oneYear: '2019', // 饼图参数
        regionId: '33'
      }
      const { resultData, status, errorMessage } = await selectAreaWaterVolume(
        params
      )
      if (status === 'complete') {
        const xlist = []
        const waterTotalData = []
        const reportRateData = []
        resultData &&
          resultData.map((item) => {
            xlist.push(item.regionName)
            waterTotalData.push(item.waterTotal)
            reportRateData.push(item.reportRate)
          })
        this.chartTwoOption.xAxis[0].data = xlist
        this.chartTwoOption.series[0].data = waterTotalData
        this.chartTwoOption.series[1].data = reportRateData
      } else {
        this.$message.error(errorMessage)
      }
    },
    showPopup() {
      this.show = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home-page {
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .stepsDiv {
        width: 90%;
        margin: 0 auto;
        .van-step--horizontal .van-step__title {
            display: block;
        }
    }
}
// ----- 图表 -----
.chart-box {
    margin-top: 20px;
}

// ----- 当前的进度条 -----
.steps-content {
    margin-top: 20px;
    ul {
        width: 100%;
        li {
            display: inline-block;
            width: calc(100% / 3 - 30px);
            span {
                display: block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 100px;
                background-color: #cccccc;
                color: #ffffff;
                text-align: center;
                margin: 0 auto;
                position: relative;
            }
            .active {
                display: block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 100px;
                background-color: royalblue;
                color: #ffffff;
                text-align: center;
                margin: 0 auto;
                position: relative;
            }
            p {
                font-style: normal;
                text-align: center;
                color: #cccccc;
                font-size: 14px;
                
            }
            span::before {
                display: inline-block;
                content: '';
                width: 20px;
                border-bottom: 1px dashed #cccccc;
                position: absolute;
                top: 10px;
                right: -50px;
            }
        }
        li:last-child {
            span::before {
                display: inline-block;
                content: '';
                border-bottom: 0px transparent;
            }
        }
    }
}

// ----- 身份证上传 -----
.uploadCardID {
    .showlist {
        li {
            text-align: left;
            padding-left: 20px;
        }
    }
}
</style>
