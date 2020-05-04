import { Component, ChangeDetectionStrategy, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router, UrlHandlingStrategy } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
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
      const item = decodeURI(this.router.url).substr(1)
      this.lastItem = item
      const fromElement = document.getElementById(item)
      if (fromElement != null) {
        const fromElementRect = fromElement.getBoundingClientRect()
        const scrollElement = document.getElementById("grid-container").parentElement
        this.lastGridItemRect = new DOMRect(fromElementRect.x, fromElementRect.y + scrollElement.scrollTop, fromElementRect.width, fromElementRect.height)
        this.lastGridItemRect.y += scrollElement.scrollTop
        if (this.lastGridItemRect != null) {
          return {
            value: outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'],
            params: {
              fromX: fromElement.getBoundingClientRect().x,
              fromY: fromElement.getBoundingClientRect().y,
              toX: 77,
              toY: 20
            }
          }
        }
      }
    } else if (outlet.activatedRouteData['animationState'] == "ItemGrid") {
      if (this.lastGridItemRect && this.data[this.router.url.substr(1)].some((item: { id: string; }) => item.id == this.lastItem)) {
        return {
          value: outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'],
          params: {
            fromX: 77,
            fromY: 20,
            toX: this.lastGridItemRect.x,
            toY: this.lastGridItemRect.y
          }
        }
      }
    }
    return {
      value: outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'],
      params: {
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0
      }
    }
  }

  async onRoutingStart(event: AnimationEvent) {
    if (this.lastItem && ((event.fromState == "ItemGrid" && event.toState == "ItemInfo") || (event.fromState == "ItemInfo" && event.toState == "ItemGrid" && this.data[this.router.url.substr(1)].some((item: { id: string; }) => item.id == this.lastItem)))) {
      const animationImg = document.getElementById("animation-img")
      const itemButton = document.getElementById(this.lastItem)
      const icon = document.getElementById("icon")

      await this.data.ready
      animationImg.setAttribute("src", this.data.items[this.lastItem].image_url)
      animationImg.style.opacity = "100%"

      console.log(document.getElementById(this.lastItem), document.getElementById("icon"))
      if (itemButton) itemButton.style.opacity = "0%"
      if (icon) icon.style.opacity = "0%"
    }
  }

  onRoutingDone(event: AnimationEvent) {
    if ((event.fromState == "ItemGrid" && event.toState == "ItemInfo") || (event.fromState == "ItemInfo" && event.toState == "ItemGrid" && this.data[this.router.url.substr(1)].some((item: { id: string; }) => item.id == this.lastItem))) {
      const animationImg = document.getElementById("animation-img")
      const itemButton = document.getElementById(this.lastItem)
      const icon = document.getElementById("icon")

      if (itemButton) itemButton.style.opacity = "100%"
      if (icon) icon.style.opacity = "100%"

      animationImg.style.opacity = "0%"
    }
  }
}
