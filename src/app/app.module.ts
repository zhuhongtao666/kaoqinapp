import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//import { Page2Page } from '../pages/page2/page2';
import { Page4Page } from '../pages/page4/page4';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { Page7Page } from '../pages/page7/page7';
import { Page9Page } from '../pages/page9/page9';
import { Page10Page } from '../pages/page10/page10';
import { kaoqinPage } from '../pages/kaoqin/kaoqin';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Calendar } from '@ionic-native/calendar';
import { CalendarModule } from 'ion2-calendar';
import { HttpClientModule } from '@angular/common/http';
import { AdminPage } from '../pages/admin/admin';
import { ImagePicker } from '@ionic-native/image-picker';
import { MubanPage } from '../pages/muban/muban';
import { ListPage } from '../pages/list/list';
import { ModalPage } from '../pages/modal/modal';
import { MygroupPage } from '../pages/mygroup/mygroup';
import { GroupinfoPage } from '../pages/groupinfo/groupinfo';
import { AdmincardsPage } from '../pages/admincards/admincards';
import { InfoPage } from '../pages/info/info';
import { BLE } from '@ionic-native/ble';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Device } from '@ionic-native/device';
import { BackgroundMode } from '@ionic-native/background-mode';

@NgModule({
  declarations: [
    MyApp,
    //Page2Page,
    Page4Page,
    TabsControllerPage,
    LoginPage,
    SignupPage,
    Page7Page,
    Page9Page,
    Page10Page,
    kaoqinPage,
    AdminPage,
    MubanPage,
    ListPage,
    ModalPage,
    MygroupPage,
    GroupinfoPage,
    AdmincardsPage,
    InfoPage,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //Page2Page,
    Page4Page,
    TabsControllerPage,
    LoginPage,
    SignupPage,
    Page7Page,
    Page9Page,
    Page10Page,
    kaoqinPage,
    AdminPage,
    MubanPage,
    ListPage,
    ModalPage,
    MygroupPage,
    GroupinfoPage,
    AdmincardsPage,
    InfoPage,
  ],
  providers: [
    StatusBar,
    BackgroundMode,
    Camera,
    Geolocation,
    ImagePicker,
    Calendar,
    BLE,
    Device,
    BluetoothSerial,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}