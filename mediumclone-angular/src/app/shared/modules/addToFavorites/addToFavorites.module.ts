import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AddToFavoritesComponent} from './components/addToFavorites.component'

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule],
  exports: [AddToFavoritesComponent],
})
export class AddToFavoritesModule {}
