<template>
  <div class="example-box">
    <!-- 当前的进度条 -->
    <div class="steps-content">
        <ul>
            <li v-for="(item, index) in stepsContent" :key="index">
                <span :class="item.isActive ? 'active' : ''">{{item.text}}</span>
                <p>{{item.desc}}</p>
            </li>
        </ul>
    </div>

    <!-- 身份证上传 -->
    <div class="uploadCardID">
        <div class="fileInput">
            <input type="file" accept="image/*" class="file" ref="file" @change="upload" style="display:none"/>
            <van-button type="primary" @click="clickFunc"  size="mini">上传身份证</van-button>
        </div>

        <div class="fileCanvas">
            <!-- <span v-if="isShowCard" >身份证正面照</span> -->
            <canvas :width="CW" :height="CH" ref="canvas" class="canvas"></canvas>
        </div>

        <div class="fileList">
            <ul>
                <li v-for="(item,index) in result_list" class="list" :key="index">
                    <span>{{index+1}}</span>
                    <span>{{item.pre}}</span>
                    <span>{{item.text}}</span>
                </li>
            </ul>
        </div>
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
  name: 'IDCardExample',
  components: {
    BarChart,
    // Canvas
  },
  data () {
    return {
        show: false,
        active: 1,
        stepsContent: [
            { text: 1, desc: '短信验证', isActive: false },
            { text: 2, desc: '证件验证', isActive: true },
            { text: 3, desc: '人脸认证' },
        ],
        // ---- 身份证 ----
        isShowCard: true,
        CW: '250px',
        CH: '210px',
        detail: ['type','name','gender', 'nationality','birth','address','id','valid_date','authority'],
        result_list: [],
        pre: ['正反面：','名字：','性别：','民族：','出生年月：','地址：','身份证号：','有效日期：','签证机关：'],
        loading: false,
        err: false
    }
  },
  mounted() {
      this.showClick();
  },
  methods: {
    // ---------- 身份证上传 ----------
    clickFunc() {
        this.$refs.file.click();
        this.isShowCard = false
    },
    upload(){
        // console.log(file)
        let file = this.$refs.file.files[0];
        let canvas = this.$refs.canvas;
        if (!file) return;
        this.loading = true;

        // 先基于FileReader进行文件的读取
        let fileExample = new FileReader();
        // console.dir(fileExample)
        fileExample.readAsDataURL(file);
        fileExample.onload = ev => {
            // 创建新图片
            console.log('11111----', new Image())
            this.IMAGE = new Image();
            this.IMAGE.src = ev.target.result;
            this.IMAGE.onload = () => {
                this.IW = this.IMAGE.width;
                this.IH = this.IMAGE.height;
                const NCW = parseInt(this.CW);
                const NCH = parseInt(this.CW);
                // 重新按照比例计算宽高
                let n = 1;
                // 宽度 大于 高度
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
        axios.post('https://mp.weixin.qq.com/wxamusic/ocr/idcard?action=idcard&type=photo&test_sign=yi_ke_shi_ge_sha_diao', forms, config)
            .then(res => {
                console.log(res);
                this.loading=false;
                // this.driving = res.data.ocrcomm_res.items
                const data = res.data;
                console.log('数据--', data);
                if (data.hasOwnProperty("result")) {
                    this.err = false;
                    let result = data.result;
                    let data_to_set = [];
                    for (let i = 0; i < this.detail.length; i++) {
                        let result_key = this.detail[i];
                        if (result.hasOwnProperty(result_key)) {
                            data_to_set.push(result[result_key]);
                        }
                    }
                    console.log(data_to_set)
                    this.result_list=[].concat(data_to_set);
                
                    console.log(this.result_list)
                    if (result['type'] === 0){
                        let obj = {};
                        obj.pre = this.pre[0]
                        obj.text = '正面';
                        this.result_list[0]=obj;
                        // this.result_list[0].text="正面";
                        for(let j = 1 ;j < this.result_list.length; j++){
                            this.result_list[j].pre = this.pre[j]
                        }
                    } else {
                        let obj = {};
                        obj.pre = this.pre[0]
                        obj.text='反面';
                        this.result_list[0] = obj;
                        this.result_list[1].pre = this.pre[7]
                        this.result_list[2].pre = this.pre[8]
                    }
                } else {
                    // 请空画布
                    // this.CTX.clearRect(0, 0, parseInt(this.CW), parseInt(this.CH));
                    this.result_list = [];
                    this.err = true
                }
            })
            .catch(err => {
              //补充异常处理代码
              console.log(err)
            })
        },
        showClick() {
            let arr = [{name: '中国', code: '23'}, {name: '新疆', code: '24'}]
            // let obj = {}
            // arr.map((item,index) => {
            //     obj[item.name] = item.code
            // })
            // console.log('PP--', obj)
            // arr.forEach((item, index) => {
            //     console.log(item)
            // })
            const bb = arr.filter((item, index) => { return item.name === '中国' })
            console.log(bb)
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

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
                font-size: 14px;
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
                margin-top: 8px;
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
    .fileCanvas {
        margin-top: 8px;
        width: 100%;
        height: 240px;
        background-color: rgba(0, 0, 0, 0.3);
        // position: relative;
        span {
            color: #cccccc;
            line-height: 210px;
        }
    }
    .fileList {
        li {
            text-align: left;
            padding-left: 20px;
            font-size: 14px;
        }
    }
}
</style>
