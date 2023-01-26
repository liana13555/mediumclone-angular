import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, catchError} from 'rxjs/operators'
import {of} from 'rxjs'
import {AddToFavoritesService} from '../../services/addToFavorites.service'
import {
  addToFavoritesAction,
  addToFavoritesFailureAction,
  addToFavoritesSuccessAction,
} from '../actions/addToFavorites.action'
import {ArticleInterface} from 'src/app/shared/types/article.interface'

@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug)

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article})
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}
}
