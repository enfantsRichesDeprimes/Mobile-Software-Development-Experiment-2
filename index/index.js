// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    image: "../images/QWeather-Icons-1.4.0/icons/999.svg" ,
    city_name:'',
    region:['山东省','青岛市','崂山区'],
    locationId:'',
    now:{
      temp:0,
      text:'',
      icon:'999',
      humidity:0,
      pressure:0,
      vis:0,
      windDir:0,
      windSpeed:0,
      windScale:0
    }
  },
  onLoad() {
    this.getLocationId()
    .then(() => this.getWeather()) // 在 getLocationId() 的 Promise 解析后，调用 getWeather()
    .catch(error => {
      // 错误处理
      console.error(error);
    });
  },
  
  onPickerChange(e){
    console.log(e.detail.value)
    this.setData({
      region:e.detail.value
    })
    this.getLocationId().then(result=>{
      this.getWeather()
    })
  },
  getWeather(e){
    let that =this
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:that.data.locationId,
        key:'e21f318045b848e29f6b1b1634dbe163'
      },
      success:(res)=>{
        console.log(res.data)
        that.setData({
          now:res.data.now
        })
      }
    })
  },
  getLocationId() {
    return new Promise((resolve, reject) => {
      let that = this;
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?',
        data: {
          location: that.data.region[1],
          adm: that.data.region[0],
          key: 'e21f318045b848e29f6b1b1634dbe163'
        },
        success: (res) => {
          console.log("getLocationId", res.data);
          that.setData({
            locationId: res.data.location[0].id
          });
          resolve(); // 解析 Promise
        },
        fail: (error) => {
          reject(error); // 拒绝 Promise 并传递错误
        }
      });
    });
  }
})
