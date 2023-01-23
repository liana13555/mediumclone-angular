import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ArticleComponent} from './components/article/article.component'
import {EffectsModule} from '@ngrx/effects'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {RouterModule} from '@angular/router'
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module'
import {LoadingModule} from '../shared/modules/loading/loading.module'
import {ArticleService as SharedArticleService} from '../shared/services/article.service'

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
  ],
  providers: [SharedArticleService],
})
export class ArticleModule {}
