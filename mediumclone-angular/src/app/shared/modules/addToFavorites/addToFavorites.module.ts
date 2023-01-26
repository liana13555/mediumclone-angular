import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AddToFavoritesComponent} from './components/addToFavorites.component'
import {AddToFavoritesService} from './services/addToFavorites.service'
import {EffectsModule} from '@ngrx/effects'
import {AddToFavoritesEffect} from './store/effects/addToFavorites.effect'

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
