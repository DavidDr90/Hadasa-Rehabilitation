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
import { CategoriesPage } from '../pages/categories/categories';
import { AboutMePage } from '../pages/about-me/about-me';
import { PhrasesPage } from '../pages/phrases/phrases';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { TabsPage } from '../pages/tabs/tabs';
import { PhrasePopupPage } from '../pages/phrase-popup/phrase-popup';

//import component
import { PhraseComponent } from '../components/phrase/phrase';
import { MyCategoryComponent } from '../components/my-category/my-category';
import { FavoritesComponent } from '../components/favorites/favorites';

//import services
import { PhrasesProvider } from '../providers/phrases/phrases';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { HTTP } from '@ionic-native/http';
import { HttpProvider } from '../providers/http/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AutenticationProvider } from '../providers/autentication/autentication';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { AudioRecordProvider } from '../providers/audio-record/audio-record';
import { GetImageProvider } from '../providers/get-image/get-image';
import { StorageProvider } from '../providers/storage/storage';
// import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { AddPhrasePageModule } from '../pages/add-phrase/add-phrase.module';
import { AppBuilderProvider } from '../providers/app-builder/app-builder';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { UsersProvider } from '../providers/users/users';
import { AboutMeFormPage } from '../pages/about-me-form/about-me-form';
import { ErrorProvider } from '../providers/error/error';
import { Base64 } from '@ionic-native/base64';
import { CustomErrorHandler } from '../models/CustomErrorHandler';


// use our custom fatel error handler in production, and the ionic error handler on devlopment
const ERROR_HANDLER = ((<any>window)['IonicDevServer'] == undefined) ? CustomErrorHandler : IonicErrorHandler;


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // AddPhrasePage,
    CategoriesPage,
    MyCategoryComponent,
    AboutMePage,
    IntroSliderPage,
    PhrasesPage,
    PhraseComponent,
    // TimerComponent,
    TabsPage,
    FavoritesComponent,
    AboutMeFormPage,
    // ProgressBarComponent,
    PhrasePopupPage,
    //NumbersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true //show the tabs bar only on pages navigated by tabs
    }),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AddPhrasePageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPhrasePage,
    CategoriesPage,
    AboutMePage,
    IntroSliderPage,
    TabsPage,
    PhrasePopupPage,
    PhrasesPage,
    AboutMeFormPage
    //NumbersPage
  ],
  providers: [
    CategoryServiceProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: ERROR_HANDLER },
    NativeAudio,
    PhrasesProvider,
    HTTP,
    Media,
    File,
    Transfer,
    Camera,
    FilePath,
    AudioRecordProvider,
    GetImageProvider,
    HttpProvider,
    PhrasesProvider,
    FirebaseProvider,
    AutenticationProvider,
    StorageProvider,
    AppBuilderProvider,
    FavoriteProvider,
    UsersProvider,
    ErrorProvider,
    Base64

  ]
})

export class AppModule { }
[
  CategoryServiceProvider,
  PhrasesProvider,
  FavoriteProvider,
  FirebaseProvider,
  AutenticationProvider,
  StorageProvider,
  AppBuilderProvider
]


