import { trigger, transition, query, style, group, animate, animateChild, state } from '@angular/animations';

export const routeAnimations =
  trigger('routeAnimations', [
    transition('ItemGrid => ItemInfo', [
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
      query("#animation-img", style({ left: "{{fromX}}px", top: "{{fromY}}px", filter: "drop-shadow(-3px 3px 0px rgba(0, 0, 0, 0.3))" })),
      group([
        query(':leave', animate('300ms linear', style({ opacity: "0%" }))),
        query(':enter', animate('300ms linear', style({ opacity: "100%" }))),
        query('#animation-img', animate("300ms ease", style({ left: "{{toX}}px", top: "{{toY}}px", filter: "none" })), { optional: true })
        ]),
        ]),
    transition('ItemInfo => ItemGrid', [
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
      query("#animation-img", style({ left: "{{fromX}}px", top: "{{fromY}}px", filter: "none" })),
      group([
        query(':leave', [
          animate('300ms linear', style({ opacity: 0 }))
        ]),
        query(':enter', [
          animate('300ms linear', style({ opacity: 1 }))
        ]),
        query('#animation-img', [
          animate("300ms ease", style({ left: "{{toX}}px", top: "{{toY}}px", filter: "drop-shadow(-3px 3px 0px rgba(0, 0, 0, 0.3))" }))
        ], { optional: true }),
        animate("300ms linear")
      ]),
    ])
  ]);