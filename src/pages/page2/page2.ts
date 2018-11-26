import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page7Page } from '../page7/page7';
//import { Page2Page } from '../page2/page2';
import { Page10Page } from '../page10/page10';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

declare var BMap;

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2Page {
  public map: any;
  public imageurl: any;

  constructor(public navCtrl: NavController, private camera: Camera, private geolocation: Geolocation) {
  }
  ionViewDidEnter() {
    this.loadmap();
  }
  loadmap(){
    var map = new BMap.Map("map_container");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,14);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == 0 ){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        //alert(r.point.lng+','+r.point.lat);
        document.getElementById("result").innerHTML = r.point.lng+','+r.point.lat;
      }
      else {
        document.getElementById("result").innerHTML = this.getStatus();
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
    this.geolocation.getCurrentPosition().then((resp) => {
      document.getElementById("result").innerHTML = resp.coords.latitude + ',' + resp.coords.longitude;

      var map = new BMap.Map("map_container");
      map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
      map.enableScrollWheelZoom(true);

      map.clearOverlays();
      var new_point = new BMap.Point(resp.coords.longitude,resp.coords.latitude);
      var marker = new BMap.Marker(new_point);
      map.addOverlay(marker);
      map.panTo(new_point);
    }).catch((error) => {
      document.getElementById("result").innerHTML = error;
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
     //document.getElementById("test").innerHTML = imageData;
    }, (err) => {
     // Handle error
    });
  }
  goToPage7(params){
    if (!params) params = {};
    this.navCtrl.push(Page7Page);
  }goToPage2(params){
    if (!params) params = {};
    this.navCtrl.push(Page2Page);
  }goToPage10(params){
    if (!params) params = {};
    this.navCtrl.push(Page10Page);
  }
}
