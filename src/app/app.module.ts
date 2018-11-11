import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {HttpClientModule} from "@angular/common/http";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {RestProvider} from '../providers/rest/rest';
import {CommonProvider} from '../providers/common/common';
import {StorageProvider} from '../providers/storage/storage';

import {ComponentsModule} from "../components/components.module";
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {MinePage} from "../pages/mine/mine";
import {OrderPage} from "../pages/order/order";
import {AreasProvincesPage} from "../pages/areas-provinces/areas-provinces";
import {AreasCitiesPage} from "../pages/areas-cities/areas-cities";
import {AreasCountiesPage} from "../pages/areas-counties/areas-counties";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {CodePage} from "../pages/code/code";

//导入四个外部组件
import {File} from "@ionic-native/file";
import {Transfer} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {CartPage} from "../pages/cart/cart";
import {DetailPage} from "../pages/detail/detail";
import {PopoverPage} from "../pages/popover/popover";
import {AddressPage} from "../pages/address/address";
import {BookPage} from "../pages/book/book";
import {OrderDetailPage} from "../pages/order-detail/order-detail";


@NgModule({
  declarations: [
    MyApp,
    OrderPage,
    MinePage,
    HomePage,
    DetailPage,
    CartPage,
    AddressPage,
    BookPage,
    OrderDetailPage,
    TabsPage,
    AreasProvincesPage,
    AreasCitiesPage,
    AreasCountiesPage,
    LoginPage,
    RegisterPage,
    CodePage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      // 安卓icon强制使用ios的icon以及样式
      iconMode: 'ios',
      // 样式强制使用ios样式
      mode: 'ios',
      // 隐藏全部子页面tabs
      tabsHideOnSubPages: 'true'
    }),
    ComponentsModule
    // 全局注册storage
    // IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderPage,
    MinePage,
    HomePage,
    DetailPage,
    CartPage,
    AddressPage,
    BookPage,
    OrderDetailPage,
    TabsPage,
    AreasProvincesPage,
    AreasCitiesPage,
    AreasCountiesPage,
    LoginPage,
    RegisterPage,
    CodePage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    CommonProvider,
    StorageProvider,
    File,
    Transfer,
    FilePath,
    Camera,
  ]
})
export class AppModule {
}
