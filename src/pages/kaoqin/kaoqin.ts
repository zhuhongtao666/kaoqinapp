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
  public jingweidu:any;

  constructor(public platform: Platform,public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, private camera: Camera, private geolocation: Geolocation, public navparams: NavParams, public events: Events) {
  }
  ionViewWillEnter() {
    this.map2();
    this.username = Appconfig.getusername();
  }
  map2(){
    if(this.place == 'ces'){
      this.jingweidu = {
        "lng_max":121.40680,
        "lng_min":121.40606,
        "lat_max":31.32335,
        "lat_min":31.32299
        };
      if(this.platform.is("ios")){
        this.cordovamap();
      }
      else if(this.platform.is("android")){
        this.loadmap();
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
  loadmap(){
    var lng_max = this.jingweidu.lng_max;
    var lng_min = this.jingweidu.lng_min;
    var lat_max = this.jingweidu.lat_max;
    var lat_min = this.jingweidu.lat_min;
    var success = this.toastCtrl.create({
      message: "上课地点定位成功！",
      duration: 4000
    });
    var fail = this.toastCtrl.create({
      message: "上课地点定位失败！",
      duration: 4000
    });

    var map = new BMap.Map("map_container2");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,14);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == 0 ){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        if(r.point.lng<=lng_max && r.point.lng>=lng_min && r.point.lat<=lat_max && r.point.lat>=lat_min)
        {
          //alert("上课地点定位成功！");
          success.present();
          document.getElementById("commit").removeAttribute("disabled");
        }
        else{
          //alert("上课地点定位失败！");
          fail.present();
          //document.getElementById("commit").removeAttribute("disabled");
        }
        //document.getElementById("result").innerHTML = r.point.lng + ',' + r.point.lat;
      }
      else {
        alert(this.getStatus());
      }
    },{enableHighAccuracy: true})
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
    var lng_max = this.jingweidu.lng_max;
    var lng_min = this.jingweidu.lng_min;
    var lat_max = this.jingweidu.lat_max;
    var lat_min = this.jingweidu.lat_min;
    var success = this.toastCtrl.create({
      message: "上课地点定位成功！",
      duration: 4000
    });
    var fail = this.toastCtrl.create({
      message: "上课地点定位失败！",
      duration: 4000
    });
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude+0.00401;
      var lng = resp.coords.longitude+0.01121;
      //document.getElementById("result").innerHTML = resp.coords.longitude + ',' + resp.coords.latitude;
      var map = new BMap.Map("map_container2");
      var point = new BMap.Point(lng,lat);
      map.centerAndZoom(point,14);
      var mk = new BMap.Marker(point);
      map.addOverlay(mk);
      map.panTo(point);
      if(lng<=lng_max && lng>=lng_min && lat<=lat_max && lat>=lat_min)
      {
        success.present();
        document.getElementById("commit").removeAttribute("disabled");
      }
      else{
        fail.present();
        //document.getElementById("commit").removeAttribute("disabled");
      }
    }).catch((error) => {
      //document.getElementById("result2").innerHTML = error;
    })
    
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
     var image = (<HTMLInputElement>document.getElementById("myphoto"));
     image.src = "data:image/jpeg;base64,"+imageData;
     this.photo = imageData;
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
  }
  kaoqin() {
    if(this.photo == null){
      const toast1 = this.toastCtrl.create({
        message: '请上传照片！',
        duration: 2000
      });
      toast1.present();
    }
    else{
      let pathurl:string = 'http://118.24.76.130:8000/kaoqin1v1';
      let pramas = JSON.stringify({
        uid: Appconfig.getuid(),
        img: this.photo
      });
      this.http.post(pathurl,pramas,httpOptions).subscribe( (data) => {
        if(data['code'] == 1){
          const toast1 = this.toastCtrl.create({
            message: '考勤成功！',
            duration: 1000
          });
          toast1.present();
          var str = data['kqinfo'];
          var arr = str.split("|");
          var arr2 = arr[5].split(":");
          if(arr2.length <= 2){
            const toast = this.toastCtrl.create({
              message: '上课考勤成功，请记得下课考勤！',
              duration: 8000
            });
            toast.present();
          }
          else{
            const toast = this.toastCtrl.create({
              message: '下课考勤成功！',
              duration: 1000
            });
            toast.present();
          }
        }
        else if(data['code'] == 2){
          const toast2 = this.toastCtrl.create({
            message: '考勤成功，但使用了库中重复的照片！',
            duration: 2000
          });
          toast2.present();
        }
        else if(data['code'] == 3){
          const toast3 = this.toastCtrl.create({
            message: '图像解析错误！',
            duration: 2000
          });
          toast3.present();
        }
        else if(data['code'] == 4){
          const toast4 = this.toastCtrl.create({
            message: '由于用户未完成录入，考勤失败！',
            duration: 2000
          });
          toast4.present();
        }
        else{
          const toast0 = this.toastCtrl.create({
            message: '考勤失败，不匹配录成功！',
            duration: 2000
          });
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
