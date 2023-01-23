import {Component} from '@angular/core'

@Component({
  selector: 'app-your-feed',
  templateUrl: './yourFeed.component.html',
})
export class YourFeedComponent {
  apiUrl = '/articles/feed'
}
