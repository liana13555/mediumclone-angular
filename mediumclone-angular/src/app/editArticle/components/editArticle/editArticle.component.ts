import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {filter, map} from 'rxjs/operators'
import {ArticleInputInterface} from 'src/app/shared/types/articleInput.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {getArticleAction} from '../../store/actions/getArticle.action'
import {updateArticleAction} from '../../store/actions/updateArticle.action'
import {
  articleSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/editArticle/store/selectors'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {createArticleAction} from 'src/app/createArticle/store/actions/createArticle.action'

@Component({
  selector: 'app-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>
  isLoading$: Observable<boolean>
  slug: string

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean), // filter(Boolean) - когда хотим получить знач-я не являющимися 'null' или 'undefined'
      map((article: ArticleInterface) => {
        console.log('article', article)

        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        }
      })
    )
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({articleInput, slug: this.slug}))
  }
}
