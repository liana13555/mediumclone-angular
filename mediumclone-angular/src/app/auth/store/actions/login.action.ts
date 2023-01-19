import {createAction, props} from '@ngrx/store'

import {ActionTypes} from '../actionTypes'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
