import {createAction, props} from '@ngrx/store'

import {ActionsTypes} from '../actionTypes'
import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface'

export const registerAction = createAction(
  ActionsTypes.REGISTER,
  props<RegisterRequestInterface>()
)
