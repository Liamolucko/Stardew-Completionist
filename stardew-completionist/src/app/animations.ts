import { trigger, transition, query, style, group, animate, animateChild, state } from '@angular/animations';

const state1 = state("1", style({}))
export const routeAnimations =
  trigger('routeAnimations', [
    transition('ItemGrid <=> ItemInfo', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(":enter", [
        style({ opacity: 0 })
      ]),
      query(':leave', animateChild()),
      group([
        query('.animating img, :leave header img', [
          animate("300ms ease", style({ transform: "translate({{xMovement}}px, {{yMovement}}px)", opacity: "100%" }))
        ], { optional: true }),
        query(':leave', [
          animate('300ms linear', style({ opacity: 0 }))
        ]),
        query(':enter', [
          animate('300ms linear', style({ opacity: 1 }))
        ])
      ]),
    ], { params: { item: "/Wild%20Horseradish", xMovement: 200, yMovement: 200 } })
  ]);