import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CallNumber } from '@ionic-native/call-number';
import { environment } from '../config/config';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider
  ]
})
export class AppModule {
  
}
