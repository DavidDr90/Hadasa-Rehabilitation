import { NgModule } from '@angular/core';
import { MyCategoryComponent } from './my-category/my-category';
import { PhraseComponent } from './phrase/phrase';
import { TimerComponent } from './timer/timer';
import { UploadProgressComponent } from './upload-progress/upload-progress';

@NgModule({
	declarations: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent,
    UploadProgressComponent
  ],
	imports: [],
	exports: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent,
    UploadProgressComponent
  ]
})

export class ComponentsModule {}
