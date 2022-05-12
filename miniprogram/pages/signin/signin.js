// pages/signin/signin.js
import SignInServices from "./../../services/SignInServices";
import timeServices from "./../../services/timeServices"
let num =0
var signin = null;
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data_arr:["日","一","二","三","四","五","六"],
    year:"",
    month:"",
    today:[],
    num:0,
    lianxu:0,
    signInDays:[],
    isqiandao:false,
     signText:"签到",
    nowlist:[]
  },
  qiandao(){ 
    
    
    if(!signin.data.isqiandao){
     /* 
      num++
      let todaylist = this.data.today
      todaylist.push({
        today:time
      })
      
      this.setData({
        num:num,
        today:todaylist
      })
      // console.log(todaylist);
   
      wx.setStorageSync('day', new Date().getDate()) 
      wx.setStorageSync('month', new Date().getMonth()+1)
      wx.setStorageSync('num', this.data.num)*/
     var lianxu=signin.data.lianxu;
     console.log(lianxu)
      SignInServices. addTodayByID(lianxu,"1",function (data) {
        console.log(data)
      });
      this.onLoad();
      wx.showToast({
        title: '今日已成功签到',
        duration:2000
      })
      
}
else{
  wx.showToast({
    title: '今日已签到',
    icon:'error',
    duration:2000
  })
  
  
}

   
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
  signin=this;
  let number = wx.getStorageSync('num')   
   let day = wx.getStorageSync('day')
   let nowlist = this.data.nowlist
   nowlist.push({
     today:day
   })
    this.setData({
      num:number,
     today:nowlist
    })
    
 
    let now = new Date()
    let year = now.getFullYear()
    // month获取是从 0~11
    let month = now.getMonth() + 1
    this.setData({
      year,month
    })
    
    
    SignInServices.getAllRiByID("1",function (data) {
      var sigindays=[];
      var isto=false;
      var lianxu=0;
      let now = new Date()
    let nowdate=now.getDate();
      for(var i=0;i<data.length;i++){
        var dateindata=data[i].signInDate.getDate();
        if(dateindata==nowdate){
           isto=true;
           lianxu=data[i].lianXu;
        }
        if(dateindata==nowdate-1){
          lianxu=data[i].lianXu;
        }
         sigindays.push(dateindata);
      }

      
      signin.setData({
        signInDays:sigindays,
        isqiandao:isto,
        lianxu:lianxu
      })
      if(signin.data.isqiandao==true){
        signin.setData({
          signText:"已签到"
        })
      }
      //当未签到且今天是周一
      if(nowdate==1&&!signin.data.isqiandao){
        var year=signin.data.year;
        var month=signin.data.month;
    //判断是否是1月
    if(month - 1 >= 1){
      month = month - 1 
    }else{
      month = 12
      year = year - 1
    }
    var days=timeServices.getDayNumByYM(year,month)
    SignInServices.getAllRiByYM("1",year,month-1,function (data) {
      
      for(var i=0;i<data.length;i++){
        if(data[i].signInDate.getDate()==days){
           lianxu=data[i].lianXu
        }
      }
      console.log(sigindays)
      signin.setData({
        lianxu:lianxu
      })
       });
      }
    });
    
    this.showCalendar()
 
    
  },
  showCalendar(){
    let {year,month} = this.data
    //以下两个month已经+1
    let currentMonthDays = new Date(year,month,0).getDate() //获取当前月份的天数
    let startWeek = new Date(year + '/' + month + '/' + 1).getDay(); //本月第一天是从星期几开始的
    this.setData({
      currentMonthDays,startWeek
    })
  },
  test(){
    console.log(signin.data.num);
    SignInServices.getAllRiByID(function (data) {
      var sigindays=[];
      for(var i=0;i<data.length;i++){
         sigindays.push(data[i].signInDate.getDate());
      }
      signin.setData({
        signInDays:sigindays
      })
      console.log(signin.data.signInDays);
      
      
      
      
    });
  },
 
  //上个月按钮
  bindPreMonth(){
    let {year,month} = this.data
    //判断是否是1月
    if(month - 1 >= 1){
      month = month - 1 
    }else{
      month = 12
      year = year - 1
    }
    this.setData({
      month,year
    })
    
    SignInServices.getAllRiByYM("1",year,month-1,function (data) {
      console.log(data)
      var sigindays=[];
      for(var i=0;i<data.length;i++){
        var dateindata=data[i].signInDate.getDate();
        
         sigindays.push(dateindata);
      }
      console.log(sigindays)
      signin.setData({
        signInDays:sigindays
      })
    });
    this.showCalendar()
  },
 
  //下个月按钮
  bindNextMonth(){
    let {year,month} = this.data
    //判断是否是12月
    if(month + 1 <= 12){
      month = month + 1 
    }else{
      month = 1
      year = year + 1
    }
    this.setData({
      month,year
    })
    SignInServices.getAllRiByYM("1",year,month-1,function (data) {
      console.log(data)
      var sigindays=[];
      for(var i=0;i<data.length;i++){
        var dateindata=data[i].signInDate.getDate();
        
         sigindays.push(dateindata);
      }
      console.log(sigindays)
      signin.setData({
        signInDays:sigindays
      })
    });
    this.showCalendar()
  }
 
})