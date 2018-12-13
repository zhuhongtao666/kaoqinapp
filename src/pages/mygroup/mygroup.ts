import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Appconfig } from '../../app/app.config';
import { GroupinfoPage } from '../groupinfo/groupinfo';

/**
 * Generated class for the MygroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mygroup',
  templateUrl: 'mygroup.html',
})
export class MygroupPage {
  items;
  searchQuery;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.initializeItems();
    this.searchQuery='';
  }

  ionViewDidLoad() {
  }
  initializeItems(){
    var lessons = Appconfig.getlessons();
    this.items = lessons;
  }
  getItems(ev){
    this.initializeItems();
    var val = ev.target.value;
    if(val && val.trim()!= ''){
      this.items = this.items.filter((v)=>{
        return (v.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }
  itemSelected(item){
    const modal = this.modalCtrl.create(GroupinfoPage);
    modal.present();
    Appconfig.setmygroup(item);
  }
  joingroup(){
    
  }

}
