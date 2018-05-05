
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//native services
import { NativeAudio } from '@ionic-native/native-audio';
import { Camera } from '@ionic-native/camera';

//import pages
import { HomePage } from '../pages/home/home';
import { AddPhrasePage } from '../pages/add-phrase/add-phrase';
import { MockTestPage } from '../pages/mock-test/mock-test';
import { CategoriesPage } from '../pages/categories/categories';
import { AboutMePage } from '../pages/about-me/about-me';
import { PhrasesPage } from '../pages/phrases/phrases';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';

//import component
import { PhraseComponent } from '../components/phrase/phrase';
import { MyCategoryComponent } from '../components/my-category/my-category';

//import services
import { PhrasesProvider } from '../providers/phrases/phrases';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { LoginProvider } from '../providers/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AutenticationProvider } from '../providers/autentication/autentication';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPhrasePage,
    MockTestPage,
    CategoriesPage,
    MyCategoryComponent,
    AboutMePage,
    IntroSliderPage,
    PhrasesPage,
    PhraseComponent
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
    MockTestPage,
    CategoriesPage,
    AboutMePage,
    IntroSliderPage
  ],
  providers: [
    CategoryServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeAudio,
    Camera,
    CategoryServiceProvider,
    PhrasesProvider,
    FirebaseProvider,
    LoginProvider,
    AutenticationProvider
  ]
})
export class AppModule {

  constructor()
  {

  }

}
