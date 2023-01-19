import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BackendErrorMessagesComponent} from './backend-error-messages/backendErrorMessages.component'

@NgModule({
  declarations: [BackendErrorMessagesComponent],
  imports: [CommonModule],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
