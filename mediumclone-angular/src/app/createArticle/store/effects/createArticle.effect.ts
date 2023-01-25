import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Router} from '@angular/router'
import {switchMap, map, catchError, tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/createArticle.action'
import {CreateArticleService} from '../../services/createArticle.service'
import {ArticleInterface} from 'src/app/shared/types/article.interface'

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/article', article.slug])
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
