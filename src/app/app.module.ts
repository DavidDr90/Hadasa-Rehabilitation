
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

//import component
import { PhraseComponent } from '../components/phrase/phrase';
import { MyCategoryComponent } from '../components/my-category/my-category';

//import services
import { PhrasesProvider } from '../providers/phrases/phrases';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import {HTTP} from '@ionic-native/http';
import { HttpProvider } from '../providers/http/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AutenticationProvider } from '../providers/autentication/autentication';



import { AudioRecordProvider } from '../providers/audio-record/audio-record';
import { GetImageProvider } from '../providers/get-image/get-image';
import { TimerComponent } from '../components/timer/timer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPhrasePage,
    CategoriesPage,
    MyCategoryComponent,
    AboutMePage,
    IntroSliderPage,
    PhrasesPage,
    PhraseComponent,
    TimerComponent,
    TabsPage,
    //NumbersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
    PhrasesPage,
    //NumbersPage
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
    AudioRecordProvider,
    GetImageProvider,
    HttpProvider,
    PhrasesProvider,
    FirebaseProvider,
    AutenticationProvider
  ]
})

export class AppModule {}
[
    CategoryServiceProvider,
    PhrasesProvider,
    FirebaseProvider,
    AutenticationProvider
  ]


