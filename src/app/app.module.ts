import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyCategoryComponent } from '../components/my-category/my-category';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { CategoriesPage } from '../pages/categories/categories';
import { NothingPage } from '../pages/nothing/nothing';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage,
    NothingPage,
    MyCategoryComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    CategoryServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryServiceProvider
  ]
})
export class AppModule {}
