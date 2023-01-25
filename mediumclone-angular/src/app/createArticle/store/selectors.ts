import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {CreateArticleStateInterface} from '../types/createArticleState.interface'

export const createArticleSelector = createFeatureSelector<
  AppStateInterface,
  CreateArticleStateInterface
>('createArticle')

export const isSubmittingSelector = createSelector(
  createArticleSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  createArticleSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors
)
