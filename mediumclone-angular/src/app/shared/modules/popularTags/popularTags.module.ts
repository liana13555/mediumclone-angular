import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {PopularTagsComponent} from './components/popularTags/popularTags.component'
import {PopularTagsService} from './services/popularTags.service'
import {reducers} from './store/reducers'
import {GetPopularTagsEffect} from './store/effects/getPopularTags.effect'

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
