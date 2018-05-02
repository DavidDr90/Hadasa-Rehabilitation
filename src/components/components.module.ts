import { NgModule } from '@angular/core';
import { MyCategoryComponent } from './my-category/my-category';
import { PhraseComponent } from './phrase/phrase';
import { TimerComponent } from './timer/timer';

@NgModule({
	declarations: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent
  ],
	imports: [],
	exports: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent
  ]
})

export class ComponentsModule {}
