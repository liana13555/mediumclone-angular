import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {filter, map} from 'rxjs/operators'
import {combineLatest, Observable, Subscription} from 'rxjs'
import {currentUserSelector} from 'src/app/auth/store/selectors'
import {ProfileInterface} from 'src/app/shared/types/profile.interface'
import {getUserProfileAction} from '../../store/actions/getUserProfile.action'
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../../store/selectors'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  userProfileSubscription: Subscription
  slug: string
  apiUrl: string
  isCurrentUserProfile$: Observable<boolean>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe()
  }

  initializeValues(): void {
    // const isFavorites = this.router.url.includes('favorites')
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    // this.apiUrl = isFavorites
    //   ? `/articles?favorited=${this.slug}`
    //   : `/articles?author=${this.slug}`
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => {
          return currentUser.username === userProfile.username
        }
      )
    )
  }

  //combineLatest - возможность комбинировать неск-ко стримов чтобы получить какой-то ответ

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile
      })

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}))
  }
  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`)
  }
}
