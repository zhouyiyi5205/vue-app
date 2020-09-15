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

    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    
    <!-- 图表 -->
    <bar-chart :option="chartTwoOption" chart-id="chartTwo" style="height:330px" />

    <div class="steps-content">
        <ul>
            <li v-for="(item, index) in stepsContent" :key="index">
                <span :class="item.isActive ? 'active' : ''">{{item.text}}</span>
                <p>{{item.desc}}</p>
            </li>
        </ul>
    </div>

    <!-- 身份证上传 -->
    <input type="file" accept="image/*" class="file" ref="file" @change="upload"/>
    <van-button type="primary"  @click="clickFunc" size="mini">主要按钮</van-button>

    <canvas :width="CW" :height="CH" ref="canvas"></canvas>
    
    <!-- <div class="showlist">
        <div v-for="(item,index) in result_list" class="list" :key="index">
            <div class="index">{{index+1}}</div>
            <div class="pre">{{item.pre}}</div>
            <div class="text">{{item.text}}</div>
        </div>
    </div> -->

    <div class="showlist">
        <ul>
            <li v-for="(item,index) in result_list" class="list" :key="index">
                <span>{{index+1}}</span>
                <span>{{item.pre}}</span>
                <span>{{item.text}}</span>
            </li>
        </ul>
    </div>
    
    <!-- <Canvas @upload="upload" :result_show="result_title"
        :list="result_list" :show="loading" :err="err"></Canvas> -->

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
            xAxis: [
            {
                data: [],
                axisPointer: { type: 'shadow' }
            }
            ],
            yAxis: [
            {
                type: 'value',
                name: '用水总量(m³)',
                axisLabel: {
                    formatter: '{value} m³',
                    color: '#333'
                },
                axisTick: { show: false },
                axisLine: { show: false }
            },
            {
                type: 'value',
                name: '上报率(%)',
                // smooth:false,   //关键点，为true是不支持虚线的，实线就用true
                axisLabel: {
                formatter: '{value} %',
                color: '#333'
                },
                axisTick: {
                show: false
                },
                axisLine: {
                show: false
                }
            }
            ],
            series: [
            {
                name: '用水总量(m³)',
                type: 'bar',
                barWidth: '5px',
                itemStyle: {
                barBorderRadius: [6, 6, 0, 0]
                },
                data: []
            },
            {
                name: '上报率(%)',
                type: 'line',
                barWidth: '2px',
                itemStyle: {
                barBorderRadius: [6, 6, 0, 0]
                },
                yAxisIndex: 1,
                data: []
            }
            ]
        },
        // ---- 身份证 ----
            CW: '300px',
            CH: '300px',
            result_title:'身份证OCR识别结果',
            detail:['type','name','gender',
                'nationality','birth','address','id','valid_date','authority'],
            result_list:[],
            pre:['正反面：','名字：','性别：','民族：',
                '出生年月：','地址：','身份证号：','有效日期：','签证机关：'],
            loading:false,
            err:false
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
    },
    // ---------- 身份证上传 ----------
    clickFunc() {
        // 触发FILE选择文件的操作
        this.$refs.file.click();
    },
    upload(){
          // console.log(file)
          let file = this.$refs.file.files[0];
          let canvas = this.$refs.canvas;
          if (!file) return;
          this.loading=true
          // 先基于FileReader进行文件的读取
          let fileExample = new FileReader();
          // console.dir(fileExample)
          fileExample.readAsDataURL(file);
          fileExample.onload = ev => {
            // 创建新图片
            // console.dir(ev)
            this.IMAGE = new Image();
            this.IMAGE.src = ev.target.result;
            this.IMAGE.onload = () => {
              this.IW = this.IMAGE.width;
              this.IH = this.IMAGE.height;
              const NCW = parseInt(this.CW);
              const NCH = parseInt(this.CW);
              // 重新按照比例计算宽高
              let n = 1;
              if (this.IW > this.IH) {
                n = this.IW / NCW;
                this.IW = NCW;
                this.IH = this.IH / n;
              } else {
                n = this.IH / NCH;
                this.IH = NCH;
                this.IW = this.IW / n;
              }
              this.IL = (NCW - this.IW) / 2;
              this.IT = (NCH - this.IH) / 2;
              // 绘制图片
              this.CTX = canvas.getContext("2d");
              // 清空画布
              this.CTX.clearRect(0, 0, parseInt(this.CW), parseInt(this.CH));
              // 绘制图片
              this.CTX.drawImage(this.IMAGE, this.IL, this.IT, this.IW, this.IH);

              //上传文件1
              console.log('上传文件前---', file)
              this.uploadImg(file)
            };
          }
        },
        uploadImg(file) {
          var forms = new FormData();
          forms.append('file', file)
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          };
        //   console.log('vvvv---', this.$axios)
          axios.post('https://mp.weixin.qq.com/wxamusic/ocr/idcard?action=idcard&type=photo&test_sign=yi_ke_shi_ge_sha_diao', forms, config)
            .then(res => {
              console.log(res);
              this.loading=false;
              // this.driving = res.data.ocrcomm_res.items
              const data=res.data;
              if (data.hasOwnProperty("result")) {
                this.err=false;
                let result = data.result;
                let data_to_set = [];
                for (let i = 0; i < this.detail.length; i++) {
                  let result_key = this.detail[i];
                  if (result.hasOwnProperty(result_key)) {
                    data_to_set.push( result[result_key]);
                  }
                }
                console.log(data_to_set)
                this.result_list=[].concat(data_to_set);
                console.log(this.result_list)
                  if(result['type']===0){
                      let obj={};
                      obj.pre=this.pre[0]
                      obj.text='正面';
                      this.result_list[0]=obj;
                      // this.result_list[0].text="正面";
                      for(let j=1;j<this.result_list.length;j++){
                          this.result_list[j].pre=this.pre[j]
                      }
                  }
                  else{
                      let obj={};
                      obj.pre=this.pre[0]
                      obj.text='反面';
                      this.result_list[0]=obj;
                      this.result_list[1].pre=this.pre[7]
                      this.result_list[2].pre=this.pre[8]
                  }

              }else{
                this.result_list=[];
                this.err=true
              }
            })
            .catch(err => {
              //补充异常处理代码
              console.log(err)
            })
        },
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
        span:first-child {
            // float: left;
        }
  }
}
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
.showlist {
    li {
        text-align: left;
        padding-left: 20px;
    }
}
</style>
