import {routerNavigationAction} from '@ngrx/router-store'
import {createReducer, on, Action} from '@ngrx/store'
import {ArticleStateInterface} from '../types/articleState.interface'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action'

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): ArticleStateInterface => initialState) // Исп-ем для редьюсеров страниц
)

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action)
}
