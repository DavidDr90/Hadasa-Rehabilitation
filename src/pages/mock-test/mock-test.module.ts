import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MockTestPage } from './mock-test';

@NgModule({
  declarations: [
    MockTestPage,
  ],
  imports: [
    IonicPageModule.forChild(MockTestPage),
  ],
})
export class MockTestPageModule {}
