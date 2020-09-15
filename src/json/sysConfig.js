/*
 * @Author: your name
 * @Date: 2020-09-09 14:34:09
 * @LastEditTime: 2020-09-15 09:16:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \water-monitor-management\src\json\sysConfig.js
 */
export function sysConfig() {
  // const evn = 0; //0代表开发环境，1是正式环境,2是测试环境
  const env = process.env.BUILD_ENV;
  let baseUrl = ''
  let chartMapUrl = ''
  let cookiePath = ''
  let superApi = ''
  let leafletMapApi = '';
  let leafletMapAliApi = '';
  let STATIC_PREFIX = ''
  switch (env) {
    case 'release':
      // 默认用当前网页路径的前缀
      baseUrl = 'http://web.dcyun.com:48125/';
      // chartMapUrl = 'http://serv.dcxxsoft.xyz:52006/'
      chartMapUrl = 'http://web.dcyun.com:48125/';
      cookiePath = '48116'
      // superApi = 'http://10.10.15.133/superApi/'
      superApi = '/superApi/'
      // superApi = 'http://139.196.86.193/superApi/'
      // superApi = 'http://web.dcyun.com:48125/superApi/'
      // superApi = 'https://cxqjgs.dcyun.com:38070/superApi/'
      // superApi = 'http://web.dcyun.com:48125/'
      leafletMapApi = 'https://cxqjgs.dcyun.com:38120/zheJiangJson/' // 定川服务器
      // leafletMapApi = 'http://139.196.86.193/zheJiangJson/' // wpg服务器
      break
    case 'test':
      baseUrl = 'http://10.33.155.20:8090/' // 测试环境
      chartMapUrl = 'http://serv.dcxxsoft.xyz:52006/'
      cookiePath = '48116'
      superApi = 'http://139.196.86.193/superApi/'
      leafletMapApi = 'https://cxqjgs.dcyun.com:38120/zheJiangJson/' // 定川服务器
      // leafletMapApi = 'http://139.196.86.193/zheJiangJson/' // wpg服务器
      break
    default:
      // baseUrl = 'http://192.168.2.137:8090/'
      baseUrl = 'http://web.dcyun.com:48125/'
      // baseUrl = 'https://cxqjgs.dcyun.com:38120/'
      STATIC_PREFIX = 'http://192.168.2.137:8090'
      // baseUrl = 'https://cxqjgs.dcyun.com:38120/'
      // baseUrl = 'http://10.33.158.123:38117/'
      chartMapUrl = 'http://serv.dcxxsoft.xyz:52006/'
      cookiePath = '48116'
      // superApi = 'http://116.236.135.253:81/superApi'
      // superApi = 'http://192.168.2.137:8098/superApi/'
      superApi = 'http://139.196.86.193/superApi/'
      // leafletMapApi = 'https://cxqjgs.dcyun.com:38120/zheJiangJson/', // 定川服务器
      leafletMapApi = 'http://139.196.86.193/zheJiangJson/' // wpg服务器
  }
  STATIC_PREFIX += '/api/static/file'
  return {
    STATIC_PREFIX,
    'QRImgAndroid': baseUrl + 'View/App/Images/android-html.jpg',
    'QRIMGIos': baseUrl + 'View/App/Images/ios-html.jpg',
    'ServiceUrl': baseUrl,
    'ServiceUrlSuper': superApi,
    'ServiceUrlLeaflet': leafletMapApi, // 地图静态资源
    'ServiceUrlLeafletAli': leafletMapAliApi, // 阿里服务地图静态资源
    'chartMapServiceUrl': chartMapUrl,
    'cookiePath': cookiePath
  }
}
