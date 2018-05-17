import { NgModule } from '@angular/core';
import { MyCategoryComponent } from './my-category/my-category';
import { PhraseComponent } from './phrase/phrase';
import { TimerComponent } from './timer/timer';
import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
	declarations: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent,
    ProgressBarComponent
  ],
	imports: [],
	exports: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent,
    ProgressBarComponent
  ]
})

export class ComponentsModule {}
