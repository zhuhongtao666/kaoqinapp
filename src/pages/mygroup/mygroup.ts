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
  public items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    var lessons = Appconfig.getlessons();
    this.items = lessons;
  }
  itemSelected(item){
    const modal = this.modalCtrl.create(GroupinfoPage);
    modal.present();
    Appconfig.setmygroup(item);
  }
  joingroup(){
    
  }

}
