import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

export class EditArticleStateInterface {
  isLoading: boolean
  article: ArticleInterface | null
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
