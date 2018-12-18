import { Component } from '@angular/core';
import { NavController, NavParams, Events,ToastController,Platform} from 'ionic-angular';
import { Page7Page } from '../page7/page7';
//import { Page2Page } from '../page2/page2';
import { Page10Page } from '../page10/page10';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Appconfig } from '../../app/app.config';
import { HttpClient,HttpHeaders } from '@angular/common/http';

declare var BMap;
declare var AMap;
//declare var qq;

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@Component({
  selector: 'page-kaoqin',
  templateUrl: 'kaoqin.html'
})
export class kaoqinPage {
  public map: any;
  public imageurl: any;
  public test: any;
  public username: string;
  photo: string;
  public place:any;
  public lessons:any;
  public jingweidu:any;
  public usergroup:any;
  public classroom:any;
  public gpsx:any;
  public gpsy:any;
  public dis:any;

  constructor(public platform: Platform,public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, private camera: Camera, private geolocation: Geolocation, public navparams: NavParams, public events: Events) {
  }
  ionViewDidLoad() {
    this.cordovamap();
    this.username = Appconfig.getusername();
    this.usergroup = Appconfig.getusergroup();
    let array :Array<string> = new Array<string>();
    for(var i = 0 ;i<this.usergroup.length;i++){
      array[i] = this.usergroup[i].groupname;
    }
    this.lessons = array;
    //this.getselect();
  }
  test2(l1:string,l2:string){
    //var lessons = Appconfig.getlessons();
    var usergroup = Appconfig.getusergroup();
    for(var i=0;i<usergroup.length;i++){
      if(l2 == usergroup[i].groupname){
        document.getElementById("classroom").innerHTML = usergroup[i].dwname;
        break;
      }
      else{
        document.getElementById("classroom").innerHTML = '请选择课程！';
      }
    }
    return l1===l2;
  }
  getselect(){
    var select = <HTMLSelectElement>document.getElementById("place");
    for(var i=0;i<this.usergroup.length;i++){
      select.options.add(new Option(this.usergroup[i].groupname,this.usergroup[i].groupname));
    }
  }
  getclassroom(){
   for(var i=0;i<this.usergroup.length;i++){
     if(this.place ==  this.usergroup[i].groupname){
       this.classroom = this.usergroup[i].dwname;
       console.log(this.place);
       console.log(this.classroom);
       document.getElementById("classroom").innerHTML = this.classroom;
       break;
     }
     else{
       this.classroom = '请选择课程';
       document.getElementById("classroom").innerHTML = this.classroom;
     }
   }
  }
  map2(){
    if(this.place != null){
      this.jingweidu = {
        "lng_max":121.41,
        "lng_min":121.40,
        "lat_max":31.33,
        "lat_min":31.31
        };
      if(this.platform.is("ios")){
        this.cordovamap();
      }
      else if(this.platform.is("android")){
        this.cordovamap();
      }
      else{
        this.loadmap();
      }
    }
    else{
      const toast1 = this.toastCtrl.create({
        message: "请选择上课地点！",
        duration: 2000
      });
      toast1.present();
    }
    
  }
  gaodemap(){
    var map = new AMap.Map('amap',{
      resizeEnable:true
    });
    AMap.plugin('AMap.Geolocation',function(){
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 15),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition(function(data){
        console.log('gaopde'+data.position);
      })
    })
  }
  loadmap(){
    //var lng_max = this.jingweidu.lng_max;
    //var lng_min = this.jingweidu.lng_min;
    //var lat_max = this.jingweidu.lat_max;
    //var lat_min = this.jingweidu.lat_min;
    var success = this.toastCtrl.create({
      message: "地点定位成功！",
      duration: 2000
    });
    var fail = this.toastCtrl.create({
      message: "地点定位失败！",
      duration: 2000
    });
    var x,y:number;
    var map = new BMap.Map("map_container2");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,14);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == 0 ){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        //if(r.point.lng<=lng_max && r.point.lng>=lng_min && r.point.lat<=lat_max && r.point.lat>=lat_min)
        //{
          //alert("上课地点定位成功！");
        x = r.point.lng;
        y = r.point.lat;
        success.present();
        document.getElementById("commit").removeAttribute("disabled");
        //}
        //else{
          //alert("上课地点定位失败！");
          //fail.present();
          //document.getElementById("commit").removeAttribute("disabled");
        //}
        //document.getElementById("result").innerHTML = r.point.lng + ',' + r.point.lat;
      }
      else {
        alert(this.getStatus());
        fail.present();
      }
    },{enableHighAccuracy: true});
    
    this.gpsx = x;
    this.gpsy = y;
  }
  maptest() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById("result").innerHTML = latitude+','+longitude;
      },function(error) {
        document.getElementById("result").innerHTML = 'error';
      })
    }
  }
  cordovamap() {
    var x,y:any;
    //var lng_max = this.jingweidu.lng_max;
    //var lng_min = this.jingweidu.lng_min;
    //var lat_max = this.jingweidu.lat_max;
    //var lat_min = this.jingweidu.lat_min;
    var success = this.toastCtrl.create({
      message: "地点定位成功！",
      duration: 4000
    });
    var fail = this.toastCtrl.create({
      message: "GPS定位失败,采用baidumap！",
      duration: 4000
    });
    var geo_options = {
      enableHighAccuracy: true, 
      maximumAge        : 0, 
      timeout           : Infinity
    };
    this.geolocation.getCurrentPosition(geo_options).then((resp) => {
      var lat = resp.coords.latitude+0.00401;
      var lng = resp.coords.longitude+0.01121;
      var alat = resp.coords.latitude;
      var alng = resp.coords.longitude;
      //document.getElementById("test3").innerHTML = lat.toString()+" "+lng.toString();
      x = lng;
      y = lat;

      var map = new BMap.Map("map3");
      var point = new BMap.Point(alng,alat);
      var convertor = new BMap.Convertor();
      var pointArr = [];
      pointArr.push(point);
      convertor.translate(pointArr,1,5,function(data){
        var mk = new BMap.Marker(data.points[0]);
        //map.centerAndZoom(point,14);
        map.addOverlay(mk);
      })
      
      
      //document.getElementById("result").innerHTML = resp.coords.longitude + ',' + resp.coords.latitude;
      var map = new AMap.Map("map_container2",{
        resizeEnable:true,
        zoom:14,
        center:[alng,alat]
      });
      var gps = [alng,alat];
      var lnglats: any;
      AMap.convertFrom(gps,'gps',function(status,result){
          lnglats = result.locations[0];
          console.log(x+'gps'+y);
          console.log(lnglats.lng+'amap'+lnglats.lat);
          var marker = new AMap.Marker({
            map:map,
            position:[lnglats.lng,lnglats.lat]
          });
      })
     
      
      //if(lng<=lng_max && lng>=lng_min && lat<=lat_max && lat>=lat_min)
     // {

      success.present();
      document.getElementById("commit").removeAttribute("disabled");
      
      this.gpsx = x;
      this.gpsy = y;
     // }
     // else{
        //fail.present();
        //document.getElementById("commit").removeAttribute("disabled");
      //}
    }).catch((error) => {
      fail.present();
      this.loadmap();
      console.log(error);
      //document.getElementById("result2").innerHTML = error;
    });
  }
  baidumap(x,y){
      
  }
  usecamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 400,
      targetWidth: 400,
      cameraDirection: 1
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     var image = (<HTMLInputElement>document.getElementById("myphoto2"));
     image.src = "data:image/jpeg;base64,"+imageData;
     this.photo = imageData;
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
  }
  kaoqintest(){
    console.log(this.gpsx);
    console.log(this.gpsy);
  }
  kaoqin() {
    //document.getElementById("test1").innerHTML = this.gpsx;
    //document.getElementById("test2").innerHTML = this.gpsy;
    var groupid:string;
    var dwid:string;
    for(var i=0;i<this.usergroup.length;i++){
      if(this.place == this.usergroup[i].groupname){
        dwid=this.usergroup[i].dwid;
        groupid=this.usergroup[i].groupid;
      }
    }
    const toast2 = this.toastCtrl.create({
      message: '考勤成功，但使用了库中重复的照片！',
      duration: 2000
    });
    const toast3 = this.toastCtrl.create({
      message: '图像解析错误！',
      duration: 2000
    });
    const toast4 = this.toastCtrl.create({
      message: '由于用户未完成录入，考勤失败！',
      duration: 2000
    });
    const toast0 = this.toastCtrl.create({
      message: '考勤失败，不匹配录成功！',
      duration: 2000
    });
    
    if(this.photo == null){
      const toast1 = this.toastCtrl.create({
        message: '请上传照片！',
        duration: 2000
      });
      toast1.present();
    }
    else{
      console.log(dwid);
      console.log(groupid);
      console.log(this.gpsx);
      console.log(this.gpsy);
      let pathurl:string = 'http://118.24.76.130:8000/kaoqin1v1';
      let pramas = JSON.stringify({
        uid: Appconfig.getuid(),
        groupid: groupid,
        dwid: dwid,
        gpsx: this.gpsx,
        gpsy: this.gpsy,
        img: this.photo
      });
      this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
        if(data['code'] == 1){
          this.dis = data['dis'];
          //document.getElementById("test1").innerHTML = this.dis;
          //toast1.present();
          if(this.dis <= 1){
            var str = data['kqinfo'];
            var arr = str.split("|");
            var arr2 = arr[5].split(":");
            if(arr2.length <= 2){
              const toast = this.toastCtrl.create({
                message: '上课考勤成功，请记得下课考勤！'+"距离地点："+this.dis+"km",
                duration: 8000
              });
              toast.present();
            }
            else{
              const toast_success = this.toastCtrl.create({
                message: '下课考勤成功！'+"距离地点："+this.dis+"km",
                duration: 1000
              });
              toast_success.present();
            }
          }
          else{
            const toast_dwfail = this.toastCtrl.create({
              message: '考勤失败，不在地点范围内！',
              duration: 1000
            });
            toast_dwfail.present();
          }
        }
        else if(data['code'] == 2){
          toast2.present();
        }
        else if(data['code'] == 3){
          toast3.present();
        }
        else if(data['code'] == 4){         
          toast4.present();
        }
        else{
          toast0.present();
        }
      });
    }
  }
  goToPage7(params){
    if (!params) params = {};
    this.navCtrl.push(Page7Page);
    this.events.subscribe('bevents',(paramsVar) => {
      var image = (<HTMLInputElement>document.getElementById("myphoto"));
      image.src = paramsVar;
      this.events.unsubscribe('bevents');
    })
  }
  goToPage10(params){
    if (!params) params = {};
    this.navCtrl.push(Page10Page);
  }
}
