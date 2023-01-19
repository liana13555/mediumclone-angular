import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AuthService} from '../../services/auth.service'
import {registerAction} from '../../store/actions/register.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: '',
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    // console.log('isSubmitting$', this.isSubmitting$)
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(): void {
    console.log(this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.value,
    }

    this.store.dispatch(registerAction({request}))

    // this.authService
    //   .register(this.form.value)
    //   .subscribe((currentUser: CurrentUserInterface) => {
    //     console.log('currentUser', currentUser)
    //   })
  }
}
