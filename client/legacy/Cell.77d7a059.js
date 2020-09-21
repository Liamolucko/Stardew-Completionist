import { U as styleInject, V as __extends, W as _assign, X as MDCFoundation, Y as MDCRipple, Z as applyPassive, $ as matches, a0 as MDCRippleFoundation, a1 as MDCComponent, a2 as __awaiter, a3 as __generator, a4 as closest, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, h as _createClass, S as SvelteComponentDev, m as globals, a5 as create_slot, a6 as assign, a7 as exclude, a8 as forwardEventsBuilder, a9 as get_current_component, aa as getContext, ab as setContext, ac as onMount, ad as onDestroy, v as validate_slots, ae as exclude_internal_props, af as useActions, p as element, y as claim_element, z as children, w as detach_dev, ag as set_attributes, D as add_location, E as insert_dev, F as append_dev, ah as action_destroyer, ai as listen_dev, H as _slicedToArray, aj as update_slot, ak as get_spread_update, al as is_function, I as transition_in, J as transition_out, am as run_all, f as _asyncToGenerator, r as regenerator, an as binding_callbacks, N as empty } from './client.b16d389e.js';

var css_248z = ".mdc-data-table__content{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit}.mdc-data-table{background-color:#fff;background-color:var(--mdc-theme-surface,#fff);border-radius:4px;border:1px solid rgba(0,0,0,.12);display:inline-flex;flex-direction:column;box-sizing:border-box;overflow-x:auto}.mdc-data-table__header-row,.mdc-data-table__row{background-color:inherit}.mdc-data-table__row--selected{background-color:rgba(98,0,238,.04)}.mdc-data-table__row{border-top-color:rgba(0,0,0,.12);border-top-width:1px;border-top-style:solid}.mdc-data-table__row:not(.mdc-data-table__row--selected):hover{background-color:rgba(0,0,0,.04)}.mdc-data-table__cell,.mdc-data-table__header-cell{color:rgba(0,0,0,.87)}.mdc-data-table__header-row{height:56px}.mdc-data-table__row{height:52px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__cell--checkbox,.mdc-data-table__header-cell--checkbox{padding-left:16px;padding-right:0}.mdc-data-table__cell--checkbox[dir=rtl],.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,[dir=rtl] .mdc-data-table__header-cell--checkbox{padding-left:0;padding-right:16px}.mdc-data-table__table{width:100%;border:0;white-space:nowrap;border-collapse:collapse}.mdc-data-table__cell{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit}.mdc-data-table__cell--numeric{text-align:right}.mdc-data-table__cell--numeric[dir=rtl],[dir=rtl] .mdc-data-table__cell--numeric{text-align:left}.mdc-data-table__header-cell{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.375rem;font-weight:500;letter-spacing:.0071428571em;text-decoration:inherit;text-transform:inherit;text-align:left}.mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell[dir=rtl],[dir=rtl] .mdc-data-table__header-cell{text-align:right}.mdc-data-table__header-cell--numeric[dir=rtl],[dir=rtl] .mdc-data-table__header-cell--numeric{text-align:left}.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background:before,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background:before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background:before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background:before,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background:before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background:before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:after,.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:before,.mdc-data-table__row-checkbox.mdc-checkbox--selected:after,.mdc-data-table__row-checkbox.mdc-checkbox--selected:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:after,.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:before,.mdc-data-table__row-checkbox.mdc-checkbox--selected:after,.mdc-data-table__row-checkbox.mdc-checkbox--selected:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:hover:before,.mdc-data-table__row-checkbox.mdc-checkbox--selected:hover:before{opacity:.04}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused:before,.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus:before,.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused:before,.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):after,.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active:after,.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded,.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:after,.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:before,.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:after,.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:after,.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:before,.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:after,.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(0,0,0,.54);background-color:transparent}.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}@keyframes mdc-checkbox-fade-in-background-uy33756{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}}@keyframes mdc-checkbox-fade-out-background-uy33756{0%,80%{border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee)}to{border-color:rgba(0,0,0,.54);background-color:transparent}}.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-uy33756}.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-uy33756}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0,0,.2,1)}to{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0,0,0,1)}to{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{0%{animation-timing-function:cubic-bezier(.4,0,1,1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{0%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{0%{animation-timing-function:cubic-bezier(.14,0,0,1);transform:rotate(45deg);opacity:0}to{transform:rotate(1turn);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{0%{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{0%{animation-timing-function:cubic-bezier(.14,0,0,1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,to{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background:before,.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background:before,.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-checkbox.mdc-checkbox--selected:after,.mdc-checkbox.mdc-checkbox--selected:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-checkbox.mdc-checkbox--selected:after,.mdc-checkbox.mdc-checkbox--selected:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-checkbox.mdc-checkbox--selected:hover:before{opacity:.04}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused:before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:after,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:after,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(0,0,0,.54);background-color:transparent}.mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:#018786;border-color:var(--mdc-theme-secondary,#018786);background-color:#018786;background-color:var(--mdc-theme-secondary,#018786)}@keyframes mdc-checkbox-fade-in-background-uy3375d{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-theme-secondary,#018786);background-color:#018786;background-color:var(--mdc-theme-secondary,#018786)}}@keyframes mdc-checkbox-fade-out-background-uy3375d{0%,80%{border-color:#018786;border-color:var(--mdc-theme-secondary,#018786);background-color:#018786;background-color:var(--mdc-theme-secondary,#018786)}to{border-color:rgba(0,0,0,.54);background-color:transparent}}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-uy3375d}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-uy3375d}.mdc-checkbox__checkmark{color:#fff}.mdc-checkbox__mixedmark{border-color:#fff}.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(0,0,0,.26)}.mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0,0,0,.26)}@media screen and (-ms-high-contrast:active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms cubic-bezier(.4,0,.6,1) 0ms,border-color 90ms cubic-bezier(.4,0,.6,1) 0ms}.mdc-checkbox__background .mdc-checkbox__background:before{background-color:#000}@supports not (-ms-ime-align:auto){.mdc-checkbox__background .mdc-checkbox__background:before{background-color:var(--mdc-theme-on-surface,#000)}}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity .18s cubic-bezier(.4,0,.6,1) 0ms}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset .18s cubic-bezier(.4,0,.6,1) 0ms;stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms cubic-bezier(.4,0,.6,1) 0ms,transform 90ms cubic-bezier(.4,0,.6,1) 0ms}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none!important}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background{animation-duration:.18s;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path .18s linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark .5s linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark .5s linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark .3s linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms cubic-bezier(0,0,.2,1) 0ms,background-color 90ms cubic-bezier(0,0,.2,1) 0ms}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background:before{position:absolute;transform:scale(0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms cubic-bezier(.4,0,.6,1) 0ms,transform 90ms cubic-bezier(.4,0,.6,1) 0ms}.mdc-checkbox__native-control:focus~.mdc-checkbox__background:before{transform:scale(1);opacity:.12;transition:opacity 80ms cubic-bezier(0,0,.2,1) 0ms,transform 80ms cubic-bezier(0,0,.2,1) 0ms}.mdc-checkbox__native-control{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity .18s cubic-bezier(0,0,.2,1) 0ms,transform .18s cubic-bezier(0,0,.2,1) 0ms;opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms cubic-bezier(.4,0,.6,1) 0ms,transform 90ms cubic-bezier(.4,0,.6,1) 0ms}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-checkbox{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);padding:11px}.mdc-checkbox:after,.mdc-checkbox:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-checkbox:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-checkbox.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-checkbox.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-checkbox.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-checkbox.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-checkbox:after,.mdc-checkbox:before{background-color:#000}@supports not (-ms-ime-align:auto){.mdc-checkbox:after,.mdc-checkbox:before{background-color:var(--mdc-theme-on-surface,#000)}}.mdc-checkbox:hover:before{opacity:.04}.mdc-checkbox.mdc-ripple-upgraded--background-focused:before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-checkbox:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-checkbox:after,.mdc-checkbox:before{top:0;left:0;width:100%;height:100%}.mdc-checkbox.mdc-ripple-upgraded:after,.mdc-checkbox.mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-checkbox.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-checkbox .mdc-checkbox__background{left:11px;right:auto;top:11px}.mdc-checkbox[dir=rtl] .mdc-checkbox .mdc-checkbox__background,[dir=rtl] .mdc-checkbox .mdc-checkbox .mdc-checkbox__background{left:auto;right:11px}.mdc-checkbox .mdc-checkbox__background:before{top:-13px;left:-13px;width:40px;height:40px}.mdc-ripple-upgraded--background-focused .mdc-checkbox__background:before{content:none}";
styleInject(css_248z);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var jsEventTypeMap = {
  animationend: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationEnd',
    standard: 'animationend'
  },
  animationiteration: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationIteration',
    standard: 'animationiteration'
  },
  animationstart: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationStart',
    standard: 'animationstart'
  },
  transitionend: {
    cssProperty: 'transition',
    prefixed: 'webkitTransitionEnd',
    standard: 'transitionend'
  }
};

function isWindow(windowObj) {
  return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}
function getCorrectEventName(windowObj, eventType) {
  if (isWindow(windowObj) && eventType in jsEventTypeMap) {
    var el = windowObj.document.createElement('div');
    var _a = jsEventTypeMap[eventType],
        standard = _a.standard,
        prefixed = _a.prefixed,
        cssProperty = _a.cssProperty;
    var isStandard = (cssProperty in el.style);
    return isStandard ? standard : prefixed;
  }

  return eventType;
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  BACKGROUND: 'mdc-checkbox__background',
  CHECKED: 'mdc-checkbox--checked',
  CHECKMARK: 'mdc-checkbox__checkmark',
  CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
  DISABLED: 'mdc-checkbox--disabled',
  INDETERMINATE: 'mdc-checkbox--indeterminate',
  MIXEDMARK: 'mdc-checkbox__mixedmark',
  NATIVE_CONTROL: 'mdc-checkbox__native-control',
  ROOT: 'mdc-checkbox',
  SELECTED: 'mdc-checkbox--selected',
  UPGRADED: 'mdc-checkbox--upgraded'
};
var strings = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
  NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_UNCHECKED: 'unchecked'
};
var numbers = {
  ANIM_END_LATCH_MS: 250
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCCheckboxFoundation =
/** @class */
function (_super) {
  __extends(MDCCheckboxFoundation, _super);

  function MDCCheckboxFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCCheckboxFoundation.defaultAdapter, adapter)) || this;

    _this.currentCheckState_ = strings.TRANSITION_STATE_INIT;
    _this.currentAnimationClass_ = '';
    _this.animEndLatchTimer_ = 0;
    _this.enableAnimationEndHandler_ = false;
    return _this;
  }

  Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
    get: function get() {
      return cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "strings", {
    get: function get() {
      return strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "numbers", {
    get: function get() {
      return numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClass: function addClass() {
          return undefined;
        },
        forceLayout: function forceLayout() {
          return undefined;
        },
        hasNativeControl: function hasNativeControl() {
          return false;
        },
        isAttachedToDOM: function isAttachedToDOM() {
          return false;
        },
        isChecked: function isChecked() {
          return false;
        },
        isIndeterminate: function isIndeterminate() {
          return false;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        removeNativeControlAttr: function removeNativeControlAttr() {
          return undefined;
        },
        setNativeControlAttr: function setNativeControlAttr() {
          return undefined;
        },
        setNativeControlDisabled: function setNativeControlDisabled() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCCheckboxFoundation.prototype.init = function () {
    this.currentCheckState_ = this.determineCheckState_();
    this.updateAriaChecked_();
    this.adapter_.addClass(cssClasses.UPGRADED);
  };

  MDCCheckboxFoundation.prototype.destroy = function () {
    clearTimeout(this.animEndLatchTimer_);
  };

  MDCCheckboxFoundation.prototype.setDisabled = function (disabled) {
    this.adapter_.setNativeControlDisabled(disabled);

    if (disabled) {
      this.adapter_.addClass(cssClasses.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses.DISABLED);
    }
  };
  /**
   * Handles the animationend event for the checkbox
   */


  MDCCheckboxFoundation.prototype.handleAnimationEnd = function () {
    var _this = this;

    if (!this.enableAnimationEndHandler_) {
      return;
    }

    clearTimeout(this.animEndLatchTimer_);
    this.animEndLatchTimer_ = setTimeout(function () {
      _this.adapter_.removeClass(_this.currentAnimationClass_);

      _this.enableAnimationEndHandler_ = false;
    }, numbers.ANIM_END_LATCH_MS);
  };
  /**
   * Handles the change event for the checkbox
   */


  MDCCheckboxFoundation.prototype.handleChange = function () {
    this.transitionCheckState_();
  };

  MDCCheckboxFoundation.prototype.transitionCheckState_ = function () {
    if (!this.adapter_.hasNativeControl()) {
      return;
    }

    var oldState = this.currentCheckState_;
    var newState = this.determineCheckState_();

    if (oldState === newState) {
      return;
    }

    this.updateAriaChecked_();
    var TRANSITION_STATE_UNCHECKED = strings.TRANSITION_STATE_UNCHECKED;
    var SELECTED = cssClasses.SELECTED;

    if (newState === TRANSITION_STATE_UNCHECKED) {
      this.adapter_.removeClass(SELECTED);
    } else {
      this.adapter_.addClass(SELECTED);
    } // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.


    if (this.currentAnimationClass_.length > 0) {
      clearTimeout(this.animEndLatchTimer_);
      this.adapter_.forceLayout();
      this.adapter_.removeClass(this.currentAnimationClass_);
    }

    this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
    this.currentCheckState_ = newState; // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.

    if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
      this.adapter_.addClass(this.currentAnimationClass_);
      this.enableAnimationEndHandler_ = true;
    }
  };

  MDCCheckboxFoundation.prototype.determineCheckState_ = function () {
    var TRANSITION_STATE_INDETERMINATE = strings.TRANSITION_STATE_INDETERMINATE,
        TRANSITION_STATE_CHECKED = strings.TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED = strings.TRANSITION_STATE_UNCHECKED;

    if (this.adapter_.isIndeterminate()) {
      return TRANSITION_STATE_INDETERMINATE;
    }

    return this.adapter_.isChecked() ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  };

  MDCCheckboxFoundation.prototype.getTransitionAnimationClass_ = function (oldState, newState) {
    var TRANSITION_STATE_INIT = strings.TRANSITION_STATE_INIT,
        TRANSITION_STATE_CHECKED = strings.TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED = strings.TRANSITION_STATE_UNCHECKED;
    var _a = MDCCheckboxFoundation.cssClasses,
        ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED,
        ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE,
        ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED,
        ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE,
        ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED,
        ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;

    switch (oldState) {
      case TRANSITION_STATE_INIT:
        if (newState === TRANSITION_STATE_UNCHECKED) {
          return '';
        }

        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;

      case TRANSITION_STATE_UNCHECKED:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;

      case TRANSITION_STATE_CHECKED:
        return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;

      default:
        // TRANSITION_STATE_INDETERMINATE
        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  };

  MDCCheckboxFoundation.prototype.updateAriaChecked_ = function () {
    // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
    if (this.adapter_.isIndeterminate()) {
      this.adapter_.setNativeControlAttr(strings.ARIA_CHECKED_ATTR, strings.ARIA_CHECKED_INDETERMINATE_VALUE);
    } else {
      // The on/off state does not need to keep track of aria-checked, since
      // the screenreader uses the checked property on the checkbox element.
      this.adapter_.removeNativeControlAttr(strings.ARIA_CHECKED_ATTR);
    }
  };

  return MDCCheckboxFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var CB_PROTO_PROPS = ['checked', 'indeterminate'];

var MDCCheckbox =
/** @class */
function (_super) {
  __extends(MDCCheckbox, _super);

  function MDCCheckbox() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.ripple_ = _this.createRipple_();
    return _this;
  }

  MDCCheckbox.attachTo = function (root) {
    return new MDCCheckbox(root);
  };

  Object.defineProperty(MDCCheckbox.prototype, "ripple", {
    get: function get() {
      return this.ripple_;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "checked", {
    get: function get() {
      return this.nativeControl_.checked;
    },
    set: function set(checked) {
      this.nativeControl_.checked = checked;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "indeterminate", {
    get: function get() {
      return this.nativeControl_.indeterminate;
    },
    set: function set(indeterminate) {
      this.nativeControl_.indeterminate = indeterminate;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "disabled", {
    get: function get() {
      return this.nativeControl_.disabled;
    },
    set: function set(disabled) {
      this.foundation_.setDisabled(disabled);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckbox.prototype, "value", {
    get: function get() {
      return this.nativeControl_.value;
    },
    set: function set(value) {
      this.nativeControl_.value = value;
    },
    enumerable: true,
    configurable: true
  });

  MDCCheckbox.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.handleChange_ = function () {
      return _this.foundation_.handleChange();
    };

    this.handleAnimationEnd_ = function () {
      return _this.foundation_.handleAnimationEnd();
    };

    this.nativeControl_.addEventListener('change', this.handleChange_);
    this.listen(getCorrectEventName(window, 'animationend'), this.handleAnimationEnd_);
    this.installPropertyChangeHooks_();
  };

  MDCCheckbox.prototype.destroy = function () {
    this.ripple_.destroy();
    this.nativeControl_.removeEventListener('change', this.handleChange_);
    this.unlisten(getCorrectEventName(window, 'animationend'), this.handleAnimationEnd_);
    this.uninstallPropertyChangeHooks_();

    _super.prototype.destroy.call(this);
  };

  MDCCheckbox.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      forceLayout: function forceLayout() {
        return _this.root_.offsetWidth;
      },
      hasNativeControl: function hasNativeControl() {
        return !!_this.nativeControl_;
      },
      isAttachedToDOM: function isAttachedToDOM() {
        return Boolean(_this.root_.parentNode);
      },
      isChecked: function isChecked() {
        return _this.checked;
      },
      isIndeterminate: function isIndeterminate() {
        return _this.indeterminate;
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      removeNativeControlAttr: function removeNativeControlAttr(attr) {
        return _this.nativeControl_.removeAttribute(attr);
      },
      setNativeControlAttr: function setNativeControlAttr(attr, value) {
        return _this.nativeControl_.setAttribute(attr, value);
      },
      setNativeControlDisabled: function setNativeControlDisabled(disabled) {
        return _this.nativeControl_.disabled = disabled;
      }
    };
    return new MDCCheckboxFoundation(adapter);
  };

  MDCCheckbox.prototype.createRipple_ = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = _assign({}, MDCRipple.createAdapter(this), {
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return _this.nativeControl_.removeEventListener(evtType, handler, applyPassive());
      },
      isSurfaceActive: function isSurfaceActive() {
        return matches(_this.nativeControl_, ':active');
      },
      isUnbounded: function isUnbounded() {
        return true;
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return _this.nativeControl_.addEventListener(evtType, handler, applyPassive());
      }
    });

    return new MDCRipple(this.root_, new MDCRippleFoundation(adapter));
  };

  MDCCheckbox.prototype.installPropertyChangeHooks_ = function () {
    var _this = this;

    var nativeCb = this.nativeControl_;
    var cbProto = Object.getPrototypeOf(nativeCb);
    CB_PROTO_PROPS.forEach(function (controlState) {
      var desc = Object.getOwnPropertyDescriptor(cbProto, controlState); // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739

      if (!validDescriptor(desc)) {
        return;
      } // Type cast is needed for compatibility with Closure Compiler.


      var nativeGetter = desc.get;
      var nativeCbDesc = {
        configurable: desc.configurable,
        enumerable: desc.enumerable,
        get: nativeGetter,
        set: function set(state) {
          desc.set.call(nativeCb, state);

          _this.foundation_.handleChange();
        }
      };
      Object.defineProperty(nativeCb, controlState, nativeCbDesc);
    });
  };

  MDCCheckbox.prototype.uninstallPropertyChangeHooks_ = function () {
    var nativeCb = this.nativeControl_;
    var cbProto = Object.getPrototypeOf(nativeCb);
    CB_PROTO_PROPS.forEach(function (controlState) {
      var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);

      if (!validDescriptor(desc)) {
        return;
      }

      Object.defineProperty(nativeCb, controlState, desc);
    });
  };

  Object.defineProperty(MDCCheckbox.prototype, "nativeControl_", {
    get: function get() {
      var NATIVE_CONTROL_SELECTOR = MDCCheckboxFoundation.strings.NATIVE_CONTROL_SELECTOR;
      var el = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);

      if (!el) {
        throw new Error("Checkbox component requires a " + NATIVE_CONTROL_SELECTOR + " element");
      }

      return el;
    },
    enumerable: true,
    configurable: true
  });
  return MDCCheckbox;
}(MDCComponent);

function validDescriptor(inputPropDesc) {
  return !!inputPropDesc && typeof inputPropDesc.set === 'function';
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
  CELL: 'mdc-data-table__cell',
  CELL_NUMERIC: 'mdc-data-table__cell--numeric',
  CONTENT: 'mdc-data-table__content',
  HEADER_ROW: 'mdc-data-table__header-row',
  HEADER_ROW_CHECKBOX: 'mdc-data-table__header-row-checkbox',
  ROOT: 'mdc-data-table',
  ROW: 'mdc-data-table__row',
  ROW_CHECKBOX: 'mdc-data-table__row-checkbox',
  ROW_SELECTED: 'mdc-data-table__row--selected'
};
var strings$1 = {
  ARIA_SELECTED: 'aria-selected',
  DATA_ROW_ID_ATTR: 'data-row-id',
  HEADER_ROW_CHECKBOX_SELECTOR: "." + cssClasses$1.HEADER_ROW_CHECKBOX,
  ROW_CHECKBOX_SELECTOR: "." + cssClasses$1.ROW_CHECKBOX,
  ROW_SELECTED_SELECTOR: "." + cssClasses$1.ROW_SELECTED,
  ROW_SELECTOR: "." + cssClasses$1.ROW
};
var events = {
  ROW_SELECTION_CHANGED: 'MDCDataTable:rowSelectionChanged',
  SELECTED_ALL: 'MDCDataTable:selectedAll',
  UNSELECTED_ALL: 'MDCDataTable:unselectedAll'
};

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCDataTableFoundation =
/** @class */
function (_super) {
  __extends(MDCDataTableFoundation, _super);

  function MDCDataTableFoundation(adapter) {
    return _super.call(this, _assign({}, MDCDataTableFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCDataTableFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClassAtRowIndex: function addClassAtRowIndex() {
          return undefined;
        },
        getRowCount: function getRowCount() {
          return 0;
        },
        getRowElements: function getRowElements() {
          return [];
        },
        getRowIdAtIndex: function getRowIdAtIndex() {
          return '';
        },
        getRowIndexByChildElement: function getRowIndexByChildElement() {
          return 0;
        },
        getSelectedRowCount: function getSelectedRowCount() {
          return 0;
        },
        isCheckboxAtRowIndexChecked: function isCheckboxAtRowIndexChecked() {
          return false;
        },
        isHeaderRowCheckboxChecked: function isHeaderRowCheckboxChecked() {
          return false;
        },
        isRowsSelectable: function isRowsSelectable() {
          return false;
        },
        notifyRowSelectionChanged: function notifyRowSelectionChanged() {
          return undefined;
        },
        notifySelectedAll: function notifySelectedAll() {
          return undefined;
        },
        notifyUnselectedAll: function notifyUnselectedAll() {
          return undefined;
        },
        registerHeaderRowCheckbox: function registerHeaderRowCheckbox() {
          return undefined;
        },
        registerRowCheckboxes: function registerRowCheckboxes() {
          return undefined;
        },
        removeClassAtRowIndex: function removeClassAtRowIndex() {
          return undefined;
        },
        setAttributeAtRowIndex: function setAttributeAtRowIndex() {
          return undefined;
        },
        setHeaderRowCheckboxChecked: function setHeaderRowCheckboxChecked() {
          return undefined;
        },
        setHeaderRowCheckboxIndeterminate: function setHeaderRowCheckboxIndeterminate() {
          return undefined;
        },
        setRowCheckboxCheckedAtIndex: function setRowCheckboxCheckedAtIndex() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
   * Use this if registering checkbox is synchronous.
   */

  MDCDataTableFoundation.prototype.layout = function () {
    if (this.adapter_.isRowsSelectable()) {
      this.adapter_.registerHeaderRowCheckbox();
      this.adapter_.registerRowCheckboxes();
      this.setHeaderRowCheckboxState_();
    }
  };
  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
   * Use this if registering checkbox is asynchronous.
   */


  MDCDataTableFoundation.prototype.layoutAsync = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.adapter_.isRowsSelectable()) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , this.adapter_.registerHeaderRowCheckbox()];

          case 1:
            _a.sent();

            return [4
            /*yield*/
            , this.adapter_.registerRowCheckboxes()];

          case 2:
            _a.sent();

            this.setHeaderRowCheckboxState_();
            _a.label = 3;

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * @return Returns array of row elements.
   */


  MDCDataTableFoundation.prototype.getRows = function () {
    return this.adapter_.getRowElements();
  };
  /**
   * Sets selected row ids. Overwrites previously selected rows.
   * @param rowIds Array of row ids that needs to be selected.
   */


  MDCDataTableFoundation.prototype.setSelectedRowIds = function (rowIds) {
    for (var rowIndex = 0; rowIndex < this.adapter_.getRowCount(); rowIndex++) {
      var rowId = this.adapter_.getRowIdAtIndex(rowIndex);
      var isSelected = false;

      if (rowId && rowIds.indexOf(rowId) >= 0) {
        isSelected = true;
      }

      this.adapter_.setRowCheckboxCheckedAtIndex(rowIndex, isSelected);
      this.selectRowAtIndex_(rowIndex, isSelected);
    }

    this.setHeaderRowCheckboxState_();
  };
  /**
   * @return Returns array of selected row ids.
   */


  MDCDataTableFoundation.prototype.getSelectedRowIds = function () {
    var selectedRowIds = [];

    for (var rowIndex = 0; rowIndex < this.adapter_.getRowCount(); rowIndex++) {
      if (this.adapter_.isCheckboxAtRowIndexChecked(rowIndex)) {
        selectedRowIds.push(this.adapter_.getRowIdAtIndex(rowIndex));
      }
    }

    return selectedRowIds;
  };
  /**
   * Handles header row checkbox change event.
   */


  MDCDataTableFoundation.prototype.handleHeaderRowCheckboxChange = function () {
    var isHeaderChecked = this.adapter_.isHeaderRowCheckboxChecked();

    for (var rowIndex = 0; rowIndex < this.adapter_.getRowCount(); rowIndex++) {
      this.adapter_.setRowCheckboxCheckedAtIndex(rowIndex, isHeaderChecked);
      this.selectRowAtIndex_(rowIndex, isHeaderChecked);
    }

    if (isHeaderChecked) {
      this.adapter_.notifySelectedAll();
    } else {
      this.adapter_.notifyUnselectedAll();
    }
  };
  /**
   * Handles change event originated from row checkboxes.
   */


  MDCDataTableFoundation.prototype.handleRowCheckboxChange = function (event) {
    var rowIndex = this.adapter_.getRowIndexByChildElement(event.target);

    if (rowIndex === -1) {
      return;
    }

    var selected = this.adapter_.isCheckboxAtRowIndexChecked(rowIndex);
    this.selectRowAtIndex_(rowIndex, selected);
    this.setHeaderRowCheckboxState_();
    var rowId = this.adapter_.getRowIdAtIndex(rowIndex);
    this.adapter_.notifyRowSelectionChanged({
      rowId: rowId,
      rowIndex: rowIndex,
      selected: selected
    });
  };
  /**
   * Updates header row checkbox state based on number of rows selected.
   */


  MDCDataTableFoundation.prototype.setHeaderRowCheckboxState_ = function () {
    if (this.adapter_.getSelectedRowCount() === this.adapter_.getRowCount()) {
      this.adapter_.setHeaderRowCheckboxChecked(true);
      this.adapter_.setHeaderRowCheckboxIndeterminate(false);
    } else if (this.adapter_.getSelectedRowCount() === 0) {
      this.adapter_.setHeaderRowCheckboxIndeterminate(false);
      this.adapter_.setHeaderRowCheckboxChecked(false);
    } else {
      this.adapter_.setHeaderRowCheckboxIndeterminate(true);
      this.adapter_.setHeaderRowCheckboxChecked(false);
    }
  };
  /**
   * Sets the attributes of row element based on selection state.
   */


  MDCDataTableFoundation.prototype.selectRowAtIndex_ = function (rowIndex, selected) {
    if (selected) {
      this.adapter_.addClassAtRowIndex(rowIndex, cssClasses$1.ROW_SELECTED);
      this.adapter_.setAttributeAtRowIndex(rowIndex, strings$1.ARIA_SELECTED, 'true');
    } else {
      this.adapter_.removeClassAtRowIndex(rowIndex, cssClasses$1.ROW_SELECTED);
      this.adapter_.setAttributeAtRowIndex(rowIndex, strings$1.ARIA_SELECTED, 'false');
    }
  };

  return MDCDataTableFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCDataTable =
/** @class */
function (_super) {
  __extends(MDCDataTable, _super);

  function MDCDataTable() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCDataTable.attachTo = function (root) {
    return new MDCDataTable(root);
  };

  MDCDataTable.prototype.initialize = function (checkboxFactory) {
    if (checkboxFactory === void 0) {
      checkboxFactory = function checkboxFactory(el) {
        return new MDCCheckbox(el);
      };
    }

    this.checkboxFactory_ = checkboxFactory;
  };

  MDCDataTable.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.headerRow_ = this.root_.querySelector("." + cssClasses$1.HEADER_ROW);

    this.handleHeaderRowCheckboxChange_ = function () {
      return _this.foundation_.handleHeaderRowCheckboxChange();
    };

    this.headerRow_.addEventListener('change', this.handleHeaderRowCheckboxChange_);
    this.content_ = this.root_.querySelector("." + cssClasses$1.CONTENT);

    this.handleRowCheckboxChange_ = function (event) {
      return _this.foundation_.handleRowCheckboxChange(event);
    };

    this.content_.addEventListener('change', this.handleRowCheckboxChange_);
    this.layout();
  };
  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
   */


  MDCDataTable.prototype.layout = function () {
    this.foundation_.layout();
  };
  /**
   * @return Returns array of row elements.
   */


  MDCDataTable.prototype.getRows = function () {
    return this.foundation_.getRows();
  };
  /**
   * @return Returns array of selected row ids.
   */


  MDCDataTable.prototype.getSelectedRowIds = function () {
    return this.foundation_.getSelectedRowIds();
  };
  /**
   * Sets selected row ids. Overwrites previously selected rows.
   * @param rowIds Array of row ids that needs to be selected.
   */


  MDCDataTable.prototype.setSelectedRowIds = function (rowIds) {
    this.foundation_.setSelectedRowIds(rowIds);
  };

  MDCDataTable.prototype.destroy = function () {
    this.headerRow_.removeEventListener('change', this.handleHeaderRowCheckboxChange_);
    this.content_.removeEventListener('change', this.handleRowCheckboxChange_);
    this.headerRowCheckbox_.destroy();
    this.rowCheckboxList_.forEach(function (checkbox) {
      return checkbox.destroy();
    });
  };

  MDCDataTable.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.


    var adapter = {
      addClassAtRowIndex: function addClassAtRowIndex(rowIndex, className) {
        return _this.getRows()[rowIndex].classList.add(className);
      },
      getRowCount: function getRowCount() {
        return _this.getRows().length;
      },
      getRowElements: function getRowElements() {
        return [].slice.call(_this.root_.querySelectorAll(strings$1.ROW_SELECTOR));
      },
      getRowIdAtIndex: function getRowIdAtIndex(rowIndex) {
        return _this.getRows()[rowIndex].getAttribute(strings$1.DATA_ROW_ID_ATTR);
      },
      getRowIndexByChildElement: function getRowIndexByChildElement(el) {
        return _this.getRows().indexOf(closest(el, strings$1.ROW_SELECTOR));
      },
      getSelectedRowCount: function getSelectedRowCount() {
        return _this.root_.querySelectorAll(strings$1.ROW_SELECTED_SELECTOR).length;
      },
      isCheckboxAtRowIndexChecked: function isCheckboxAtRowIndexChecked(rowIndex) {
        return _this.rowCheckboxList_[rowIndex].checked;
      },
      isHeaderRowCheckboxChecked: function isHeaderRowCheckboxChecked() {
        return _this.headerRowCheckbox_.checked;
      },
      isRowsSelectable: function isRowsSelectable() {
        return !!_this.root_.querySelector(strings$1.ROW_CHECKBOX_SELECTOR);
      },
      notifyRowSelectionChanged: function notifyRowSelectionChanged(data) {
        _this.emit(events.ROW_SELECTION_CHANGED, {
          row: _this.getRowByIndex_(data.rowIndex),
          rowId: _this.getRowIdByIndex_(data.rowIndex),
          rowIndex: data.rowIndex,
          selected: data.selected
        },
        /** shouldBubble */
        true);
      },
      notifySelectedAll: function notifySelectedAll() {
        return _this.emit(events.SELECTED_ALL, {},
        /** shouldBubble */
        true);
      },
      notifyUnselectedAll: function notifyUnselectedAll() {
        return _this.emit(events.UNSELECTED_ALL, {},
        /** shouldBubble */
        true);
      },
      registerHeaderRowCheckbox: function registerHeaderRowCheckbox() {
        if (_this.headerRowCheckbox_) {
          _this.headerRowCheckbox_.destroy();
        }

        var checkboxEl = _this.root_.querySelector(strings$1.HEADER_ROW_CHECKBOX_SELECTOR);

        _this.headerRowCheckbox_ = _this.checkboxFactory_(checkboxEl);
      },
      registerRowCheckboxes: function registerRowCheckboxes() {
        if (_this.rowCheckboxList_) {
          _this.rowCheckboxList_.forEach(function (checkbox) {
            return checkbox.destroy();
          });
        }

        _this.rowCheckboxList_ = [];

        _this.getRows().forEach(function (rowEl) {
          var checkbox = _this.checkboxFactory_(rowEl.querySelector(strings$1.ROW_CHECKBOX_SELECTOR));

          _this.rowCheckboxList_.push(checkbox);
        });
      },
      removeClassAtRowIndex: function removeClassAtRowIndex(rowIndex, className) {
        _this.getRows()[rowIndex].classList.remove(className);
      },
      setAttributeAtRowIndex: function setAttributeAtRowIndex(rowIndex, attr, value) {
        _this.getRows()[rowIndex].setAttribute(attr, value);
      },
      setHeaderRowCheckboxChecked: function setHeaderRowCheckboxChecked(checked) {
        _this.headerRowCheckbox_.checked = checked;
      },
      setHeaderRowCheckboxIndeterminate: function setHeaderRowCheckboxIndeterminate(indeterminate) {
        _this.headerRowCheckbox_.indeterminate = indeterminate;
      },
      setRowCheckboxCheckedAtIndex: function setRowCheckboxCheckedAtIndex(rowIndex, checked) {
        _this.rowCheckboxList_[rowIndex].checked = checked;
      }
    };
    return new MDCDataTableFoundation(adapter);
  };

  MDCDataTable.prototype.getRowByIndex_ = function (index) {
    return this.getRows()[index];
  };

  MDCDataTable.prototype.getRowIdByIndex_ = function (index) {
    return this.getRowByIndex_(index).getAttribute(strings$1.DATA_ROW_ID_ATTR);
  };

  return MDCDataTable;
}(MDCComponent);

function prefixFilter(obj, prefix) {
  var names = Object.getOwnPropertyNames(obj);
  var newObj = {};

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    if (name.substring(0, prefix.length) === prefix) {
      newObj[name.substring(prefix.length)] = obj[name];
    }
  }

  return newObj;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error;
var file = "node_modules/@smui/data-table/DataTable.svelte";

function create_fragment(ctx) {
  var div;
  var table;
  var table_class_value;
  var useActions_action;
  var div_class_value;
  var useActions_action_1;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var table_levels = [{
    class: table_class_value = "mdc-data-table__table " +
    /*table$class*/
    ctx[3]
  }, prefixFilter(
  /*$$props*/
  ctx[7], "table$")];
  var table_data = {};

  for (var i = 0; i < table_levels.length; i += 1) {
    table_data = assign(table_data, table_levels[i]);
  }

  var div_levels = [{
    class: div_class_value = "mdc-data-table " +
    /*className*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[7], ["use", "class", "table$"])];
  var div_data = {};

  for (var _i = 0; _i < div_levels.length; _i += 1) {
    div_data = assign(div_data, div_levels[_i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      table = element("table");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      table = claim_element(div_nodes, "TABLE", {
        class: true
      });
      var table_nodes = children(table);
      if (default_slot) default_slot.l(table_nodes);
      table_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(table, table_data);
      add_location(table, file, 10, 2, 308);
      set_attributes(div, div_data);
      add_location(div, file, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, table);

      if (default_slot) {
        default_slot.m(table, null);
      }
      /*div_binding*/


      ctx[14](div);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, table,
        /*table$use*/
        ctx[2])), action_destroyer(useActions_action_1 = useActions.call(null, div,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[5].call(null, div)), listen_dev(div, "MDCDataTable:rowSelectionChanged",
        /*handleChange*/
        ctx[6], false, false, false), listen_dev(div, "MDCDataTable:selectedAll",
        /*handleChange*/
        ctx[6], false, false, false), listen_dev(div, "MDCDataTable:unselectedAll",
        /*handleChange*/
        ctx[6], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[12], dirty, null, null);
        }
      }

      set_attributes(table, table_data = get_spread_update(table_levels, [(!current || dirty &
      /*table$class*/
      8 && table_class_value !== (table_class_value = "mdc-data-table__table " +
      /*table$class*/
      ctx[3])) && {
        class: table_class_value
      }, dirty &
      /*$$props*/
      128 && prefixFilter(
      /*$$props*/
      ctx[7], "table$")]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*table$use*/
      4) useActions_action.update.call(null,
      /*table$use*/
      ctx[2]);
      set_attributes(div, div_data = get_spread_update(div_levels, [(!current || dirty &
      /*className*/
      2 && div_class_value !== (div_class_value = "mdc-data-table " +
      /*className*/
      ctx[1])) && {
        class: div_class_value
      }, dirty &
      /*$$props*/
      128 && exclude(
      /*$$props*/
      ctx[7], ["use", "class", "table$"])]));
      if (useActions_action_1 && is_function(useActions_action_1.update) && dirty &
      /*use*/
      1) useActions_action_1.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      /*div_binding*/

      ctx[14](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  if (events.ROW_SELECTION_CHANGED !== "MDCDataTable:rowSelectionChanged" || events.SELECTED_ALL !== "MDCDataTable:selectedAll" || events.UNSELECTED_ALL !== "MDCDataTable:unselectedAll") {
    throw new Error("MDC API has changed!");
  }

  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCDataTable:rowSelectionChanged", "MDCDataTable:selectedAll", "MDCDataTable:unselectedAll"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$table$use = _$$props3.table$use,
      table$use = _$$props3$table$use === void 0 ? [] : _$$props3$table$use;
  var _$$props4 = $$props,
      _$$props4$table$class = _$$props4.table$class,
      table$class = _$$props4$table$class === void 0 ? "" : _$$props4$table$class;
  var element;
  var dataTable;
  var changeHandlers = [];
  var checkBoxHeaderPromiseResolve;
  var checkBoxHeaderPromise = new Promise(function (resolve) {
    return checkBoxHeaderPromiseResolve = resolve;
  });
  var checkBoxListPromiseResolve;
  var checkBoxListPromise = new Promise(function (resolve) {
    return checkBoxListPromiseResolve = resolve;
  });
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  setContext("SMUI:generic:input:addChangeHandler", addChangeHandler);
  setContext("SMUI:checkbox:context", "data-table");
  setContext("SMUI:checkbox:instantiate", false);
  setContext("SMUI:checkbox:getInstance", getCheckboxInstancePromise);

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataTable = new MDCDataTable(element);
            checkBoxHeaderPromiseResolve(dataTable.headerRowCheckbox_);
            checkBoxListPromiseResolve(dataTable.rowCheckboxList_); // Workaround for a bug in MDC DataTable where a table with no checkboxes
            // calls destroy on them anyway.

            if (!dataTable.headerRowCheckbox_) {
              dataTable.headerRowCheckbox_ = {
                destroy: function destroy() {}
              };
            }

            if (!dataTable.rowCheckboxList_) {
              dataTable.rowCheckboxList_ = [];
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    dataTable && dataTable.destroy();

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function getCheckboxInstancePromise(header) {
    return header ? checkBoxHeaderPromise : checkBoxListPromise;
  }

  function handleChange() {
    for (var i = 0; i < changeHandlers.length; i++) {
      changeHandlers[i]();
    }
  }

  function addChangeHandler(handler) {
    changeHandlers.push(handler);
  }

  function layout() {
    var _dataTable;

    return (_dataTable = dataTable).layout.apply(_dataTable, arguments);
  }

  function getRows() {
    var _dataTable2;

    return (_dataTable2 = dataTable).getRows.apply(_dataTable2, arguments);
  }

  function getSelectedRowIds() {
    var _dataTable3;

    return (_dataTable3 = dataTable).getSelectedRowIds.apply(_dataTable3, arguments);
  }

  function setSelectedRowIds() {
    var _dataTable4;

    return (_dataTable4 = dataTable).setSelectedRowIds.apply(_dataTable4, arguments);
  }

  var _$$props5 = $$props,
      _$$props5$$$slots = _$$props5.$$slots,
      $$slots = _$$props5$$$slots === void 0 ? {} : _$$props5$$$slots,
      $$scope = _$$props5.$$scope;
  validate_slots("DataTable", $$slots, ['default']);

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(4, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("table$use" in $$new_props) $$invalidate(2, table$use = $$new_props.table$use);
    if ("table$class" in $$new_props) $$invalidate(3, table$class = $$new_props.table$class);
    if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCDataTable: MDCDataTable,
      events: events,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      prefixFilter: prefixFilter,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      table$use: table$use,
      table$class: table$class,
      element: element,
      dataTable: dataTable,
      changeHandlers: changeHandlers,
      checkBoxHeaderPromiseResolve: checkBoxHeaderPromiseResolve,
      checkBoxHeaderPromise: checkBoxHeaderPromise,
      checkBoxListPromiseResolve: checkBoxListPromiseResolve,
      checkBoxListPromise: checkBoxListPromise,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      getCheckboxInstancePromise: getCheckboxInstancePromise,
      handleChange: handleChange,
      addChangeHandler: addChangeHandler,
      layout: layout,
      getRows: getRows,
      getSelectedRowIds: getSelectedRowIds,
      setSelectedRowIds: setSelectedRowIds
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("table$use" in $$props) $$invalidate(2, table$use = $$new_props.table$use);
    if ("table$class" in $$props) $$invalidate(3, table$class = $$new_props.table$class);
    if ("element" in $$props) $$invalidate(4, element = $$new_props.element);
    if ("dataTable" in $$props) dataTable = $$new_props.dataTable;
    if ("changeHandlers" in $$props) changeHandlers = $$new_props.changeHandlers;
    if ("checkBoxHeaderPromiseResolve" in $$props) checkBoxHeaderPromiseResolve = $$new_props.checkBoxHeaderPromiseResolve;
    if ("checkBoxHeaderPromise" in $$props) checkBoxHeaderPromise = $$new_props.checkBoxHeaderPromise;
    if ("checkBoxListPromiseResolve" in $$props) checkBoxListPromiseResolve = $$new_props.checkBoxListPromiseResolve;
    if ("checkBoxListPromise" in $$props) checkBoxListPromise = $$new_props.checkBoxListPromise;
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, table$use, table$class, element, forwardEvents, handleChange, $$props, layout, getRows, getSelectedRowIds, setSelectedRowIds, $$scope, $$slots, div_binding];
}

var DataTable = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(DataTable, _SvelteComponentDev);

  var _super = _createSuper(DataTable);

  function DataTable(options) {
    var _this;

    _classCallCheck(this, DataTable);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      use: 0,
      class: 1,
      table$use: 2,
      table$class: 3,
      layout: 8,
      getRows: 9,
      getSelectedRowIds: 10,
      setSelectedRowIds: 11
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "DataTable",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(DataTable, [{
    key: "use",
    get: function get() {
      throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "table$use",
    get: function get() {
      throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "table$class",
    get: function get() {
      throw new Error_1("<DataTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[8];
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getRows",
    get: function get() {
      return this.$$.ctx[9];
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getSelectedRowIds",
    get: function get() {
      return this.$$.ctx[10];
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setSelectedRowIds",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error_1("<DataTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return DataTable;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "node_modules/@smui/data-table/Head.svelte";

function create_fragment$1(ctx) {
  var thead;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var thead_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var thead_data = {};

  for (var i = 0; i < thead_levels.length; i += 1) {
    thead_data = assign(thead_data, thead_levels[i]);
  }

  var block = {
    c: function create() {
      thead = element("thead");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      thead = claim_element(nodes, "THEAD", {});
      var thead_nodes = children(thead);
      if (default_slot) default_slot.l(thead_nodes);
      thead_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(thead, thead_data);
      add_location(thead, file$1, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, thead, anchor);

      if (default_slot) {
        default_slot.m(thead, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, thead,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, thead))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[3], dirty, null, null);
        }
      }

      set_attributes(thead, thead_data = get_spread_update(thead_levels, [dirty &
      /*$$props*/
      4 && exclude(
      /*$$props*/
      ctx[2], ["use"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(thead);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  setContext("SMUI:data-table:row:header", true);
  var _$$props2 = $$props,
      _$$props2$$$slots = _$$props2.$$slots,
      $$slots = _$$props2$$$slots === void 0 ? {} : _$$props2$$$slots,
      $$scope = _$$props2.$$scope;
  validate_slots("Head", $$slots, ['default']);

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, $$slots];
}

var Head = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Head, _SvelteComponentDev);

  var _super = _createSuper$1(Head);

  function Head(options) {
    var _this;

    _classCallCheck(this, Head);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Head",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(Head, [{
    key: "use",
    get: function get() {
      throw new Error("<Head>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Head>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Head;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "node_modules/@smui/data-table/Body.svelte";

function create_fragment$2(ctx) {
  var tbody;
  var tbody_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[5].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[4], null);
  var tbody_levels = [{
    class: tbody_class_value = "mdc-data-table__content " +
    /*className*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[3], ["use", "class"])];
  var tbody_data = {};

  for (var i = 0; i < tbody_levels.length; i += 1) {
    tbody_data = assign(tbody_data, tbody_levels[i]);
  }

  var block = {
    c: function create() {
      tbody = element("tbody");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      tbody = claim_element(nodes, "TBODY", {
        class: true
      });
      var tbody_nodes = children(tbody);
      if (default_slot) default_slot.l(tbody_nodes);
      tbody_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(tbody, tbody_data);
      add_location(tbody, file$2, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, tbody, anchor);

      if (default_slot) {
        default_slot.m(tbody, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, tbody,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[2].call(null, tbody))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        16) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[4], dirty, null, null);
        }
      }

      set_attributes(tbody, tbody_data = get_spread_update(tbody_levels, [(!current || dirty &
      /*className*/
      2 && tbody_class_value !== (tbody_class_value = "mdc-data-table__content " +
      /*className*/
      ctx[1])) && {
        class: tbody_class_value
      }, dirty &
      /*$$props*/
      8 && exclude(
      /*$$props*/
      ctx[3], ["use", "class"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(tbody);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  setContext("SMUI:data-table:row:header", false);
  var _$$props3 = $$props,
      _$$props3$$$slots = _$$props3.$$slots,
      $$slots = _$$props3$$$slots === void 0 ? {} : _$$props3$$$slots,
      $$scope = _$$props3.$$scope;
  validate_slots("Body", $$slots, ['default']);

  $$self.$$set = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("$$scope" in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, forwardEvents, $$props, $$scope, $$slots];
}

var Body = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Body, _SvelteComponentDev);

  var _super = _createSuper$2(Body);

  function Body(options) {
    var _this;

    _classCallCheck(this, Body);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      use: 0,
      class: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Body",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(Body, [{
    key: "use",
    get: function get() {
      throw new Error("<Body>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Body>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Body>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Body>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Body;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "node_modules/@smui/data-table/Row.svelte";

function create_fragment$3(ctx) {
  var tr;
  var tr_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[8].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[7], null);
  var tr_levels = [{
    class: tr_class_value = "\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*header*/
    ctx[5] ? "mdc-data-table__header-row" : "") + "\n    " + (!
    /*header*/
    ctx[5] ? "mdc-data-table__row" : "") + "\n    " + (!
    /*header*/
    ctx[5] &&
    /*selected*/
    ctx[3] ? "mdc-data-table__row--selected" : "") + "\n  "
  },
  /*selected*/
  ctx[3] !== undefined ? {
    "aria-selected":
    /*selected*/
    ctx[3] ? "true" : "false"
  } : {}, exclude(
  /*$$props*/
  ctx[6], ["use", "class"])];
  var tr_data = {};

  for (var i = 0; i < tr_levels.length; i += 1) {
    tr_data = assign(tr_data, tr_levels[i]);
  }

  var block = {
    c: function create() {
      tr = element("tr");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      tr = claim_element(nodes, "TR", {
        class: true
      });
      var tr_nodes = children(tr);
      if (default_slot) default_slot.l(tr_nodes);
      tr_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(tr, tr_data);
      add_location(tr, file$3, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, tr, anchor);

      if (default_slot) {
        default_slot.m(tr, null);
      }
      /*tr_binding*/


      ctx[9](tr);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, tr,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[4].call(null, tr))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        128) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[7], dirty, null, null);
        }
      }

      set_attributes(tr, tr_data = get_spread_update(tr_levels, [(!current || dirty &
      /*className, selected*/
      10 && tr_class_value !== (tr_class_value = "\n    " +
      /*className*/
      ctx[1] + "\n    " + (
      /*header*/
      ctx[5] ? "mdc-data-table__header-row" : "") + "\n    " + (!
      /*header*/
      ctx[5] ? "mdc-data-table__row" : "") + "\n    " + (!
      /*header*/
      ctx[5] &&
      /*selected*/
      ctx[3] ? "mdc-data-table__row--selected" : "") + "\n  ")) && {
        class: tr_class_value
      }, dirty &
      /*selected*/
      8 && (
      /*selected*/
      ctx[3] !== undefined ? {
        "aria-selected":
        /*selected*/
        ctx[3] ? "true" : "false"
      } : {}), dirty &
      /*$$props*/
      64 && exclude(
      /*$$props*/
      ctx[6], ["use", "class"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(tr);
      if (default_slot) default_slot.d(detaching);
      /*tr_binding*/

      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var element;
  var header = getContext("SMUI:data-table:row:header");
  var selected = undefined;
  setContext("SMUI:data-table:row:getIndex", getIndex);
  setContext("SMUI:generic:input:setChecked", setChecked);

  function setChecked(checked) {
    $$invalidate(3, selected = checked);
  }

  function getIndex() {
    var i = 0;

    if (element) {
      var el = element;

      while (el.previousSibling) {
        el = el.previousSibling;

        if (el.nodeType === 1) {
          i++;
        }
      }
    }

    return i;
  }

  var _$$props3 = $$props,
      _$$props3$$$slots = _$$props3.$$slots,
      $$slots = _$$props3$$$slots === void 0 ? {} : _$$props3$$$slots,
      $$scope = _$$props3.$$scope;
  validate_slots("Row", $$slots, ['default']);

  function tr_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(2, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("$$scope" in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      element: element,
      header: header,
      selected: selected,
      setChecked: setChecked,
      getIndex: getIndex
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    if ("header" in $$props) $$invalidate(5, header = $$new_props.header);
    if ("selected" in $$props) $$invalidate(3, selected = $$new_props.selected);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, element, selected, forwardEvents, header, $$props, $$scope, $$slots, tr_binding];
}

var Row = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Row, _SvelteComponentDev);

  var _super = _createSuper$3(Row);

  function Row(options) {
    var _this;

    _classCallCheck(this, Row);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      use: 0,
      class: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Row",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(Row, [{
    key: "use",
    get: function get() {
      throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Row;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "node_modules/@smui/data-table/Cell.svelte"; // (14:0) {:else}

function create_else_block(ctx) {
  var td;
  var td_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[12].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[11], null);
  var td_levels = [{
    class: td_class_value = "\n      mdc-data-table__cell\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*numeric*/
    ctx[2] ? "mdc-data-table__cell--numeric" : "") + "\n      " + (
    /*checkbox*/
    ctx[3] ? "mdc-data-table__cell--checkbox" : "") + "\n    "
  },
  /*roleProp*/
  ctx[5],
  /*scopeProp*/
  ctx[6],
  /*props*/
  ctx[4]];
  var td_data = {};

  for (var i = 0; i < td_levels.length; i += 1) {
    td_data = assign(td_data, td_levels[i]);
  }

  var block = {
    c: function create() {
      td = element("td");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      td = claim_element(nodes, "TD", {
        class: true
      });
      var td_nodes = children(td);
      if (default_slot) default_slot.l(td_nodes);
      td_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(td, td_data);
      add_location(td, file$4, 14, 2, 284);
    },
    m: function mount(target, anchor) {
      insert_dev(target, td, anchor);

      if (default_slot) {
        default_slot.m(td, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, td,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[7].call(null, td))];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        2048) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[11], dirty, null, null);
        }
      }

      set_attributes(td, td_data = get_spread_update(td_levels, [(!current || dirty &
      /*className, numeric, checkbox*/
      14 && td_class_value !== (td_class_value = "\n      mdc-data-table__cell\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*numeric*/
      ctx[2] ? "mdc-data-table__cell--numeric" : "") + "\n      " + (
      /*checkbox*/
      ctx[3] ? "mdc-data-table__cell--checkbox" : "") + "\n    ")) && {
        class: td_class_value
      }, dirty &
      /*roleProp*/
      32 &&
      /*roleProp*/
      ctx[5], dirty &
      /*scopeProp*/
      64 &&
      /*scopeProp*/
      ctx[6], dirty &
      /*props*/
      16 &&
      /*props*/
      ctx[4]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(td);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(14:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if header}


function create_if_block(ctx) {
  var th;
  var th_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[12].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[11], null);
  var th_levels = [{
    class: th_class_value = "\n      mdc-data-table__header-cell\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*checkbox*/
    ctx[3] ? "mdc-data-table__header-cell--checkbox" : "") + "\n    "
  },
  /*roleProp*/
  ctx[5],
  /*scopeProp*/
  ctx[6],
  /*props*/
  ctx[4]];
  var th_data = {};

  for (var i = 0; i < th_levels.length; i += 1) {
    th_data = assign(th_data, th_levels[i]);
  }

  var block = {
    c: function create() {
      th = element("th");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      th = claim_element(nodes, "TH", {
        class: true
      });
      var th_nodes = children(th);
      if (default_slot) default_slot.l(th_nodes);
      th_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(th, th_data);
      add_location(th, file$4, 1, 2, 15);
    },
    m: function mount(target, anchor) {
      insert_dev(target, th, anchor);

      if (default_slot) {
        default_slot.m(th, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, th,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[7].call(null, th))];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        2048) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[11], dirty, null, null);
        }
      }

      set_attributes(th, th_data = get_spread_update(th_levels, [(!current || dirty &
      /*className, checkbox*/
      10 && th_class_value !== (th_class_value = "\n      mdc-data-table__header-cell\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*checkbox*/
      ctx[3] ? "mdc-data-table__header-cell--checkbox" : "") + "\n    ")) && {
        class: th_class_value
      }, dirty &
      /*roleProp*/
      32 &&
      /*roleProp*/
      ctx[5], dirty &
      /*scopeProp*/
      64 &&
      /*scopeProp*/
      ctx[6], dirty &
      /*props*/
      16 &&
      /*props*/
      ctx[4]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(th);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(1:0) {#if header}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*header*/
    ctx[8]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if_block.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var header = getContext("SMUI:data-table:row:header");
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$role = _$$props3.role,
      role = _$$props3$role === void 0 ? header ? "columnheader" : undefined : _$$props3$role;
  var _$$props4 = $$props,
      _$$props4$scope = _$$props4.scope,
      scope = _$$props4$scope === void 0 ? header ? "col" : undefined : _$$props4$scope;
  var _$$props5 = $$props,
      _$$props5$numeric = _$$props5.numeric,
      numeric = _$$props5$numeric === void 0 ? false : _$$props5$numeric;
  var _$$props6 = $$props,
      _$$props6$checkbox = _$$props6.checkbox,
      checkbox = _$$props6$checkbox === void 0 ? false : _$$props6$checkbox;
  var _$$props7 = $$props,
      _$$props7$$$slots = _$$props7.$$slots,
      $$slots = _$$props7$$$slots === void 0 ? {} : _$$props7$$$slots,
      $$scope = _$$props7.$$scope;
  validate_slots("Cell", $$slots, ['default']);

  $$self.$$set = function ($$new_props) {
    $$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("role" in $$new_props) $$invalidate(9, role = $$new_props.role);
    if ("scope" in $$new_props) $$invalidate(10, scope = $$new_props.scope);
    if ("numeric" in $$new_props) $$invalidate(2, numeric = $$new_props.numeric);
    if ("checkbox" in $$new_props) $$invalidate(3, checkbox = $$new_props.checkbox);
    if ("$$scope" in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      header: header,
      use: use,
      className: className,
      role: role,
      scope: scope,
      numeric: numeric,
      checkbox: checkbox,
      props: props,
      roleProp: roleProp,
      scopeProp: scopeProp
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    if ("header" in $$props) $$invalidate(8, header = $$new_props.header);
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("role" in $$props) $$invalidate(9, role = $$new_props.role);
    if ("scope" in $$props) $$invalidate(10, scope = $$new_props.scope);
    if ("numeric" in $$props) $$invalidate(2, numeric = $$new_props.numeric);
    if ("checkbox" in $$props) $$invalidate(3, checkbox = $$new_props.checkbox);
    if ("props" in $$props) $$invalidate(4, props = $$new_props.props);
    if ("roleProp" in $$props) $$invalidate(5, roleProp = $$new_props.roleProp);
    if ("scopeProp" in $$props) $$invalidate(6, scopeProp = $$new_props.scopeProp);
  };

  var props;
  var roleProp;
  var scopeProp;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(4, props = exclude($$props, ["use", "class", "numeric", "checkbox"]));

    if ($$self.$$.dirty &
    /*role*/
    512) {
       $$invalidate(5, roleProp = role ? {
        role: role
      } : {});
    }

    if ($$self.$$.dirty &
    /*scope*/
    1024) {
       $$invalidate(6, scopeProp = scope ? {
        scope: scope
      } : {});
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, numeric, checkbox, props, roleProp, scopeProp, forwardEvents, header, role, scope, $$scope, $$slots];
}

var Cell = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Cell, _SvelteComponentDev);

  var _super = _createSuper$4(Cell);

  function Cell(options) {
    var _this;

    _classCallCheck(this, Cell);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      use: 0,
      class: 1,
      role: 9,
      scope: 10,
      numeric: 2,
      checkbox: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Cell",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  _createClass(Cell, [{
    key: "use",
    get: function get() {
      throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "role",
    get: function get() {
      throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "scope",
    get: function get() {
      throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "numeric",
    get: function get() {
      throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "checkbox",
    get: function get() {
      throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Cell;
}(SvelteComponentDev);

export { Body as B, Cell as C, DataTable as D, Head as H, Row as R };
