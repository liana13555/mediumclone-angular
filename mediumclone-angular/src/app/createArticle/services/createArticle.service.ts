import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {environment} from 'src/environments/environment'
import {ArticleInputInterface} from 'src/app/shared/types/articleInput.interface'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {SaveArticleInterface} from 'src/app/shared/types/saveArticleResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles'

    return this.http
      .post<SaveArticleInterface>(fullUrl, articleInput)
      .pipe(map((res: SaveArticleInterface) => res.article))
  }
}
