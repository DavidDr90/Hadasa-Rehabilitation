import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//import pages
import { HomePage } from '../pages/home/home';
import { CategoriesPage } from '../pages/categories/categories';
import { NothingPage } from '../pages/nothing/nothing';
import { AboutMePage } from '../pages/about-me/about-me';
import { PhrasesPage } from '../pages/phrases/phrases';

//import component
import { PhraseComponent } from '../components/phrase/phrase';
import { MyCategoryComponent } from '../components/my-category/my-category';

//import services
import { PhrasesProvider } from '../providers/phrases/phrases';
import { CategoryServiceProvider } from '../providers/category-service/category-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage,
    NothingPage,
    MyCategoryComponent,
    AboutMePage
    PhrasesPage,
    PhraseComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriesPage,
    AboutMePage
  ],
  providers: [
    CategoryServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryServiceProvider,
    PhrasesProvider
  ]
})
export class AppModule {}
