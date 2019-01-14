import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { Appconfig } from '../../app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
};

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  items;
  searchQuery;
  constructor(public toastCtrl: ToastController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.initializeItems();
    this.searchQuery='';
  }

  ionViewDidLoad() {
    //this.initializeItems();
    this.getlist();

  }
  initializeItems(){
    this.items = [];
  }
  getlist() {
    var groupid,people,id,array:any;
    var groupname = Appconfig.getadmingroup();
    groupid = Appconfig.getmyadmingroupid();
    let pathurl:string = 'http://118.24.76.130:8000/selectallpeople';
    let pramas = JSON.stringify({
      groupid:groupid
    });
    this.http.post(pathurl,pramas,httpOptions).subscribe( (data => {
      console.log(data);
      if(data['code'] == 0){
        people = data['people'];
        id = data['id'];
        for(var i=0;i<id.length;i++){
          array = {
            id:id[i],
            truename:people[i]
          };
          this.items.push(array);
        }
        console.log(this.items);
      }
      else if(data['code'] == 3){
        const toast = this.toastCtrl.create({
          message: '没人！',
          duration: 1000
        });
        toast.present();
      }
      else if(data['code'] == 1){
        const toast = this.toastCtrl.create({
          message: '不存在这个组！',
          duration: 1000
        });
        toast.present();
      }
      else if(data['code'] == 2){
        const toast = this.toastCtrl.create({
          message: data['info'],
          duration: 1000
        });
        toast.present();
      }
    }));
  }
  itemSelected(item){
    const modal = this.modalCtrl.create(ModalPage, { user: item });
    modal.present();
  }
  getItems(ev){
    this.initializeItems();
    var val = ev.target.value;
    if(val && val.trim()!= ''){
      this.items.truename = this.items.truename.filter((v)=>{
        return (v.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }
}
