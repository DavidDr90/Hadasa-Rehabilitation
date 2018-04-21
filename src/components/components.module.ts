import { NgModule } from '@angular/core';
import { MyCategoryComponent } from './my-category/my-category';
import { PhraseComponent } from './phrase/phrase';

@NgModule({
	declarations: [
    MyCategoryComponent,
    PhraseComponent
  ],
	imports: [],
	exports: [
    MyCategoryComponent,
    PhraseComponent
  ]

export class ComponentsModule {}
