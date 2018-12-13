import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  items;
  searchQuery;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.initializeItems();
    this.searchQuery='';
  }

  ionViewDidLoad() {
    //this.initializeItems();
  }
  initializeItems(){
    this.items= [
      'user1',
      'user2',
      'user3',
      'user4',
      'user5',
      'user6'
    ];
  }
  itemSelected(item){
    const modal = this.modalCtrl.create(ModalPage);
    modal.present();
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
}
