import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TagFeedComponent} from './components/tagFeed/tagFeed.component'
import {BannerModule} from '../shared/modules/banner/banner.module'
import {FeedTogglerModule} from '../shared/modules/feedToggler/feedToggler.module'
import {FeedModule} from '../shared/modules/feed/feed.module'
import {PopularTagsModule} from '../shared/modules/popularTags/popularTags.module'
import {RouterModule} from '@angular/router'

const routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent,
  },
]

@NgModule({
  declarations: [TagFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    FeedTogglerModule,
    FeedModule,
    PopularTagsModule,
  ],
})
export class TagFeedModule {}
