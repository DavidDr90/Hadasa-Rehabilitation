import { NgModule } from '@angular/core';
import { MyCategoryComponent } from './my-category/my-category';
import { PhraseComponent } from './phrase/phrase';
import { TimerComponent } from './timer/timer';
import { FavoritesComponent } from './favorites/favorites';

@NgModule({
	declarations: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent,
    FavoritesComponent
  ],
	imports: [],
	exports: [
    MyCategoryComponent,
    PhraseComponent,
    TimerComponent,
    FavoritesComponent
  ]
})

export class ComponentsModule {}
