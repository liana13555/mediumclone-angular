import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {environment} from 'src/environments/environment'
import {GetArticleResponseInterface} from '../types/getArticleResponse.interface'
import {ArticleInterface} from '../types/article.interface'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .get<GetArticleResponseInterface>(fullUrl)
      .pipe(map((response: GetArticleResponseInterface) => response.article))
  }
}
