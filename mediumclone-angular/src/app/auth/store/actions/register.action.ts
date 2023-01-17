import {createAction, props} from '@ngrx/store'

import {ActionsTypes} from '../actionTypes'

export const registerAction = createAction(
  ActionsTypes.REGISTER,
  props<{username: string; email: string; password: string}>()
)
