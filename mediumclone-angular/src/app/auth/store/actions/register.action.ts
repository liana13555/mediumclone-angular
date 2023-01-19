import {createAction, props} from '@ngrx/store'

import {ActionsTypes} from '../actionTypes'
import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export const registerAction = createAction(
  ActionsTypes.REGISTER,
  props<{request: RegisterRequestInterface}>()
)

export const registerSuccessAction = createAction(
  ActionsTypes.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const registerFailureAction = createAction(ActionsTypes.REGISTER_FAILURE)
