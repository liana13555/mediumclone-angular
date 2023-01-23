import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'
import {environment} from 'src/environments/environment'
import {getFeedAction} from '../../store/actions/getFeed.action'
import {
  errorsSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors'
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface'
import queryString from 'query-string'
import {PopularTagType} from 'src/app/shared/types/popularTag.type'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl: string
  queryParamsSubscription: Subscription
  currentPage: number

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    // this.fetchData()
    this.initializeListeners() // метод, где нах-ся все подписки для получ-я query парам-в url
    // console.log('Initialized feed')
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorsSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        // this.currentPage = Number(params.page || '1')
        this.currentPage = Number(params['page'] || '1')
        // console.log('currentPage', this.currentPage)
        this.fetchData()
      }
    )
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue
    // console.log('isApiUrlChanged', isApiUrlChanged)
    // console.log('changes', changes)

    if (isApiUrlChanged) {
      this.fetchData()
    }
  }

  fetchData(): void {
    // this.store.dispatch(getFeedAction({ url: this.apiUrlProps }))
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrlProps)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }
}
