import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EditArticleComponent} from './components/editArticle/editArticle.component'
import {EditArticleService} from './services/editArticle.service'
import {ArticleService as SharedArticleService} from '../shared/services/article.service'
import {EffectsModule} from '@ngrx/effects'
import {UpdateArticleEffect} from './store/effects/updateArticle.effect'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module'
import {LoadingModule} from '../shared/modules/loading/loading.module'
import {RouterModule} from '@angular/router'

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
]

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    ArticleFormModule,
    LoadingModule,
  ],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
