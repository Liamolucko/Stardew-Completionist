import { Component, ChangeDetectionStrategy, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router, UrlHandlingStrategy } from '@angular/router';
import { routeAnimations } from './animations';
import { DataService } from './data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'Stardew Completionist';

  constructor(private router: Router, private data: DataService) { }

  lastItem: string
  lastGridItemRect: DOMRect

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.activatedRouteData['animationState'] == "ItemInfo") {
      const item = this.router.url.replace(/%20/g, " ").substr(1)
      console.log(this.router.url)
      this.lastItem = item
      const fromElement = document.getElementById(item)
      if (fromElement != null) {
        this.lastGridItemRect = fromElement.getBoundingClientRect()
      }
      if (fromElement != null && this.lastGridItemRect != null) {
        fromElement.classList.add("animating") // There's no way to pass parameters to query(), so this was the only solution I could think of.
        return {
          value: outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'],
          params: {
            xMovement: 77 - this.lastGridItemRect.x,
            yMovement: 20 - this.lastGridItemRect.y
          }
        }
      }
    } else if (outlet.activatedRouteData['animationState'] == "ItemGrid") {
      if (this.lastGridItemRect && this.data[this.router.url.substr(1)].some((item: { id: string; }) => item.id == this.lastItem)) {
        return {
          value: outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'],
          params: {
            xMovement: this.lastGridItemRect.x - 77,
            yMovement: this.lastGridItemRect.y - 20
          }
        }
      }
    }
    return {
      value: outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'],
      params: {
        xMovement: 0,
        yMovement: 0
      }
    }
  }
}
