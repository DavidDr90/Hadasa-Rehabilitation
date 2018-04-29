import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//native services
import { NativeAudio } from '@ionic-native/native-audio';
import { Media } from '@ionic-native/media';
//for handle the images
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

//import pages
import { HomePage } from '../pages/home/home';
import { AddPhrasePage } from '../pages/add-phrase/add-phrase';
import { MockTestPage } from '../pages/mock-test/mock-test';
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

import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPhrasePage,
    MockTestPage,
    CategoriesPage,
    MyCategoryComponent,
    AboutMePage,
    PhrasesPage,
    PhraseComponent,
    NothingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPhrasePage,
    MockTestPage,
    CategoriesPage,
    AboutMePage,
    NothingPage
  ],
  providers: [
    CategoryServiceProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativeAudio,
    CategoryServiceProvider,
    PhrasesProvider,
    HTTP,
    Media,
    File,
    Transfer,
    Camera,
    FilePath,
  ]
})
export class AppModule { }
