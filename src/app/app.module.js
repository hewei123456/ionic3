var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from "../components/components.module";
import { RestProvider } from '../providers/rest/rest';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MinePage } from "../pages/mine/mine";
import { OrderPage } from "../pages/order/order";
import { AreasProvincesPage } from "../pages/areas-provinces/areas-provinces";
import { AreasCitiesPage } from "../pages/areas-cities/areas-cities";
import { AreasCountiesPage } from "../pages/areas-counties/areas-counties";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                OrderPage,
                MinePage,
                HomePage,
                TabsPage,
                AreasProvincesPage,
                AreasCitiesPage,
                AreasCountiesPage
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                ComponentsModule,
                IonicModule.forRoot(MyApp, {
                    backButtonText: '', iconMode: 'ios',
                    mode: 'ios',
                }),
                IonicStorageModule.forRoot() // 全局注册storage
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                OrderPage,
                MinePage,
                HomePage,
                TabsPage,
                AreasProvincesPage,
                AreasCitiesPage,
                AreasCountiesPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                RestProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map