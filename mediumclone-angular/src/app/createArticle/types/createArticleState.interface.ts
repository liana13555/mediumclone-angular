import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

export class CreateArticleStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
