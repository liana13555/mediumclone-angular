import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {YourFeedComponent} from './components/yourFeed/yourFeed.component'
import {BannerModule} from '../shared/modules/banner/banner.module'
import {FeedTogglerModule} from '../shared/modules/feedToggler/feedToggler.module'
import {FeedModule} from '../shared/modules/feed/feed.module'
import {PopularTagsModule} from '../shared/modules/popularTags/popularTags.module'
import {RouterModule} from '@angular/router'

const routes = [
  {
    path: 'feed',
    component: YourFeedComponent,
  },
]

@NgModule({
  declarations: [YourFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    FeedTogglerModule,
    FeedModule,
    PopularTagsModule,
  ],
})
export class YourFeedModule {}
