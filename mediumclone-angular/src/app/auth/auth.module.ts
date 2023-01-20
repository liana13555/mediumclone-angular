import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {ReducerObservable, StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {RegisterComponent} from 'src/app/auth/components/register/register.component'
import {LoginComponent} from './components/login/login.component'
import {reducers} from './store/reducers'
import {AuthService} from './services/auth.service'
import {PersistanceService} from '../shared/services/persistance.service'
import {RegisterEffect} from './store/effects/register.effect'
import {LoginEffect} from './store/effects/login.effect'
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backendErrorMessages.module'

const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect]),
    BackendErrorMessagesModule,
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
