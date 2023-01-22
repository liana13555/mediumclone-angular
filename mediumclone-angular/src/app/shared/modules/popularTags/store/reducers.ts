import {routerNavigationAction} from '@ngrx/router-store'
import {createReducer, on, Action} from '@ngrx/store'
import {PopularTagsStateInterface} from '../types/popularTagsState.interface'
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from './actions/getPopularTags.action'

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action)
}
