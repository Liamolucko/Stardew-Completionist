import { r as regenerator, as as categoryNames, I as gameInfo, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, a3 as _createClass, S as SvelteComponentDev, K as validate_each_argument, s as safe_not_equal, h as create_component, p as claim_component, z as mount_component, B as transition_in, C as transition_out, D as destroy_component, f as space, g as element, t as text, k as claim_space, l as claim_element, m as children, o as claim_text, j as detach_dev, u as attr_dev, w as add_location, x as insert_dev, y as append_dev, O as destroy_each, at as categories, Q as set_data_dev, q as query_selector_all, ap as toggle_class, A as _slicedToArray, N as check_outros, E as validate_store, F as component_subscribe, v as validate_slots, G as derived, H as save, au as stores$1, J as globals, M as group_outros, L as empty, aq as set_style } from './client.34ba2ad3.js';
import '../../../../../jimp.min.js';
import { D as DataTable, H as Head, B as Body, C as Cell, R as Row } from './Cell.486c523a.js';
import { I as ItemButton } from './ItemButton.0bdbbf48.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Object_1 = globals.Object;
var file = "src/routes/[collection].svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i][0];
  child_ctx[8] = list[i][1];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[17] = list[i];
  return child_ctx;
} // (838:6) {#each items as item}


function create_each_block_3(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[17],
      scale:
      /*item*/
      ctx[17].isCraftable ? 2 : 3,
      shadow: true,
      grey:
      /*$save*/
      ctx[3] === null ? false : !
      /*$save*/
      ctx[3].collectedItems.includes(
      /*item*/
      ctx[17].id)
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(itembutton.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(itembutton.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(itembutton, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var itembutton_changes = {};
      if (dirty &
      /*items*/
      2) itembutton_changes.item =
      /*item*/
      ctx[17];
      if (dirty &
      /*items*/
      2) itembutton_changes.scale =
      /*item*/
      ctx[17].isCraftable ? 2 : 3;
      if (dirty &
      /*$save, items*/
      10) itembutton_changes.grey =
      /*$save*/
      ctx[3] === null ? false : !
      /*$save*/
      ctx[3].collectedItems.includes(
      /*item*/
      ctx[17].id);
      itembutton.$set(itembutton_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(itembutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(itembutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(itembutton, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(838:6) {#each items as item}",
    ctx: ctx
  });
  return block;
} // (848:2) {#if typeof recipes !== 'undefined' && $save !== null}


function create_if_block(ctx) {
  var _ctx$;

  var datatable;
  var t0;
  var div;
  var h2;
  var t1;
  var t2;
  var ul;
  var current;
  datatable = new DataTable({
    props: {
      style: "grid-area: r",
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var each_value = Object.entries(
  /*$requiredIngredients*/
  (_ctx$ = ctx[4]) !== null && _ctx$ !== void 0 ? _ctx$ : {});
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      create_component(datatable.$$.fragment);
      t0 = space();
      div = element("div");
      h2 = element("h2");
      t1 = text("Required Ingredients");
      t2 = space();
      ul = element("ul");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      claim_component(datatable.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t1 = claim_text(h2_nodes, "Required Ingredients");
      h2_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      ul = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "mdc-typography--headline6 svelte-ep33d7");
      add_location(h2, file, 878, 6, 27351);
      attr_dev(ul, "class", "svelte-ep33d7");
      add_location(ul, file, 879, 6, 27421);
      attr_dev(div, "class", "mdc-card mdc-card--outlined ingredients svelte-ep33d7");
      add_location(div, file, 877, 4, 27291);
    },
    m: function mount(target, anchor) {
      mount_component(datatable, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t1);
      append_dev(div, t2);
      append_dev(div, ul);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      var datatable_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      1048588) {
        datatable_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      datatable.$set(datatable_changes);

      if (dirty &
      /*Object, $requiredIngredients, $save, categories, gameInfo*/
      24) {
        var _ctx$2;

        each_value = Object.entries(
        /*$requiredIngredients*/
        (_ctx$2 = ctx[4]) !== null && _ctx$2 !== void 0 ? _ctx$2 : {});
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(ul, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(datatable.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(datatable.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(datatable, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(848:2) {#if typeof recipes !== 'undefined' && $save !== null}",
    ctx: ctx
  });
  return block;
} // (852:10) <Cell>


function create_default_slot_8(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Recipe");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Recipe");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_8.name,
    type: "slot",
    source: "(852:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (853:10) <Cell>


function create_default_slot_7(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Sources");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Sources");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_7.name,
    type: "slot",
    source: "(853:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (851:8) <Row>


function create_default_slot_6(ctx) {
  var cell0;
  var t;
  var cell1;
  var current;
  cell0 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_8]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  cell1 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_7]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(cell0.$$.fragment);
      t = space();
      create_component(cell1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(cell1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell0_changes = {};

      if (dirty &
      /*$$scope*/
      1048576) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope*/
      1048576) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell0.$$.fragment, local);
      transition_in(cell1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(cell1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell0, detaching);
      if (detaching) detach_dev(t);
      destroy_component(cell1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(851:8) <Row>",
    ctx: ctx
  });
  return block;
} // (850:6) <Head>


function create_default_slot_5(ctx) {
  var row;
  var current;
  row = new Row({
    props: {
      $$slots: {
        default: [create_default_slot_6]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(row.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(row.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(row, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var row_changes = {};

      if (dirty &
      /*$$scope*/
      1048576) {
        row_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      row.$set(row_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(row, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_5.name,
    type: "slot",
    source: "(850:6) <Head>",
    ctx: ctx
  });
  return block;
} // (859:12) <Cell>


function create_default_slot_4(ctx) {
  var itembutton;
  var t0;
  var span;
  var t1_value =
  /*recipe*/
  ctx[11].name + "";
  var t1;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*recipe*/
      ctx[11].result,
      scale:
      /*recipe*/
      ctx[11].result.isCraftable ? 1 : 2
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(itembutton.$$.fragment);
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      claim_component(itembutton.$$.fragment, nodes);
      t0 = claim_space(nodes);
      span = claim_element(nodes, "SPAN", {
        style: true
      });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, t1_value);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_style(span, "padding-left", "8px");
      add_location(span, file, 862, 14, 26855);
    },
    m: function mount(target, anchor) {
      mount_component(itembutton, target, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, span, anchor);
      append_dev(span, t1);
      current = true;
    },
    p: function update(ctx, dirty) {
      var itembutton_changes = {};
      if (dirty &
      /*recipes, $save*/
      12) itembutton_changes.item =
      /*recipe*/
      ctx[11].result;
      if (dirty &
      /*recipes, $save*/
      12) itembutton_changes.scale =
      /*recipe*/
      ctx[11].result.isCraftable ? 1 : 2;
      itembutton.$set(itembutton_changes);
      if ((!current || dirty &
      /*recipes, $save*/
      12) && t1_value !== (t1_value =
      /*recipe*/
      ctx[11].name + "")) set_data_dev(t1, t1_value);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(itembutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(itembutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(itembutton, detaching);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(859:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (866:14) {#if typeof recipe.sources !== 'undefined'}


function create_if_block_1(ctx) {
  var ul;
  var each_value_2 =
  /*recipe*/
  ctx[11].sources;
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "source-list svelte-ep33d7");
      add_location(ul, file, 866, 16, 27021);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*recipes, $save*/
      12) {
        each_value_2 =
        /*recipe*/
        ctx[11].sources;
        validate_each_argument(each_value_2);

        var _i8;

        for (_i8 = 0; _i8 < each_value_2.length; _i8 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_2(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(ul, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(866:14) {#if typeof recipe.sources !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (868:18) {#each recipe.sources as source}


function create_each_block_2(ctx) {
  var li;
  var t_value =
  /*source*/
  ctx[14] + "";
  var t;
  var block = {
    c: function create() {
      li = element("li");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t = claim_text(li_nodes, t_value);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file, 868, 20, 27117);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*recipes, $save*/
      12 && t_value !== (t_value =
      /*source*/
      ctx[14] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(868:18) {#each recipe.sources as source}",
    ctx: ctx
  });
  return block;
} // (865:12) <Cell>


function create_default_slot_3(ctx) {
  var if_block_anchor;
  var if_block = typeof
  /*recipe*/
  ctx[11].sources !== "undefined" && create_if_block_1(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (typeof
      /*recipe*/
      ctx[11].sources !== "undefined") {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(865:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (858:10) <Row>


function create_default_slot_2(ctx) {
  var cell0;
  var t0;
  var cell1;
  var t1;
  var current;
  cell0 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_4]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  cell1 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(cell0.$$.fragment);
      t0 = space();
      create_component(cell1.$$.fragment);
      t1 = space();
    },
    l: function claim(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
      t1 = claim_space(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(cell1, target, anchor);
      insert_dev(target, t1, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell0_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      1048588) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      1048588) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell0.$$.fragment, local);
      transition_in(cell1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(cell1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell0, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(cell1, detaching);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(858:10) <Row>",
    ctx: ctx
  });
  return block;
} // (857:8) {#each recipes.filter((recipe) => !$save.knownRecipes.includes(recipe.name)) as recipe}


function create_each_block_1(ctx) {
  var row;
  var current;
  row = new Row({
    props: {
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(row.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(row.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(row, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var row_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      1048588) {
        row_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      row.$set(row_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(row, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(857:8) {#each recipes.filter((recipe) => !$save.knownRecipes.includes(recipe.name)) as recipe}",
    ctx: ctx
  });
  return block;
} // (856:6) <Body>


function create_default_slot_1(ctx) {
  var each_1_anchor;
  var current;
  var each_value_1 =
  /*recipes*/
  ctx[2].filter(
  /*func*/
  ctx[6]);
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*recipes, $save*/
      12) {
        each_value_1 =
        /*recipes*/
        ctx[2].filter(
        /*func*/
        ctx[6]);
        validate_each_argument(each_value_1);

        var _i12;

        for (_i12 = 0; _i12 < each_value_1.length; _i12 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);

            transition_in(each_blocks[_i12], 1);
          } else {
            each_blocks[_i12] = create_each_block_1(child_ctx);

            each_blocks[_i12].c();

            transition_in(each_blocks[_i12], 1);

            each_blocks[_i12].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i12 = each_value_1.length; _i12 < each_blocks.length; _i12 += 1) {
          out(_i12);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i13 = 0; _i13 < each_value_1.length; _i13 += 1) {
        transition_in(each_blocks[_i13]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        transition_out(each_blocks[_i14]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(856:6) <Body>",
    ctx: ctx
  });
  return block;
} // (849:4) <DataTable style="grid-area: r">


function create_default_slot(ctx) {
  var head;
  var t;
  var body;
  var current;
  head = new Head({
    props: {
      $$slots: {
        default: [create_default_slot_5]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  body = new Body({
    props: {
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(head.$$.fragment);
      t = space();
      create_component(body.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(head.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(body.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(head, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(body, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var head_changes = {};

      if (dirty &
      /*$$scope*/
      1048576) {
        head_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      head.$set(head_changes);
      var body_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      1048588) {
        body_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      body.$set(body_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(head.$$.fragment, local);
      transition_in(body.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(head.$$.fragment, local);
      transition_out(body.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(head, detaching);
      if (detaching) detach_dev(t);
      destroy_component(body, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(849:4) <DataTable style=\\\"grid-area: r\\\">",
    ctx: ctx
  });
  return block;
} // (881:8) {#each Object.entries($requiredIngredients ?? {}) as [id, amount]}


function create_each_block(ctx) {
  var _ctx$3$items$ctx$;

  var li;
  var t0_value = (categories.get(
  /*id*/
  ctx[7]) || gameInfo.items[
  /*id*/
  ctx[7]].name) + "";
  var t0;
  var t1;
  var t2_value = (
  /*$save*/
  (_ctx$3$items$ctx$ = ctx[3].items[
  /*id*/
  ctx[7]]) !== null && _ctx$3$items$ctx$ !== void 0 ? _ctx$3$items$ctx$ : 0) + "";
  var t2;
  var t3;
  var t4_value =
  /*amount*/
  ctx[8] + "";
  var t4;
  var t5;
  var block = {
    c: function create() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(":\n            ");
      t2 = text(t2_value);
      t3 = text("/");
      t4 = text(t4_value);
      t5 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_text(li_nodes, ":\n            ");
      t2 = claim_text(li_nodes, t2_value);
      t3 = claim_text(li_nodes, "/");
      t4 = claim_text(li_nodes, t4_value);
      t5 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file, 881, 10, 27511);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t0);
      append_dev(li, t1);
      append_dev(li, t2);
      append_dev(li, t3);
      append_dev(li, t4);
      append_dev(li, t5);
    },
    p: function update(ctx, dirty) {
      var _ctx$3$items$ctx$2;

      if (dirty &
      /*$requiredIngredients*/
      16 && t0_value !== (t0_value = (categories.get(
      /*id*/
      ctx[7]) || gameInfo.items[
      /*id*/
      ctx[7]].name) + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*$save, $requiredIngredients*/
      24 && t2_value !== (t2_value = (
      /*$save*/
      (_ctx$3$items$ctx$2 = ctx[3].items[
      /*id*/
      ctx[7]]) !== null && _ctx$3$items$ctx$2 !== void 0 ? _ctx$3$items$ctx$2 : 0) + "")) set_data_dev(t2, t2_value);
      if (dirty &
      /*$requiredIngredients*/
      16 && t4_value !== (t4_value =
      /*amount*/
      ctx[8] + "")) set_data_dev(t4, t4_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(881:8) {#each Object.entries($requiredIngredients ?? {}) as [id, amount]}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var title_value;
  var t0;
  var div2;
  var div1;
  var h2;
  var t1;
  var t2;
  var div0;
  var t3;
  var current;
  document.title = title_value = "" + (
  /*title*/
  ctx[0] + " | Stardew Completionist");
  var each_value_3 =
  /*items*/
  ctx[1];
  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block = typeof
  /*recipes*/
  ctx[2] !== "undefined" &&
  /*$save*/
  ctx[3] !== null && create_if_block(ctx);
  var block = {
    c: function create() {
      t0 = space();
      div2 = element("div");
      div1 = element("div");
      h2 = element("h2");
      t1 = text(
      /*title*/
      ctx[0]);
      t2 = space();
      div0 = element("div");

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].c();
      }

      t3 = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-19v14rz\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h2 = claim_element(div1_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t1 = claim_text(h2_nodes,
      /*title*/
      ctx[0]);
      h2_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);

      for (var _i16 = 0; _i16 < each_blocks.length; _i16 += 1) {
        each_blocks[_i16].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(div2_nodes);
      if (if_block) if_block.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "mdc-typography--headline6 svelte-ep33d7");
      add_location(h2, file, 835, 4, 26038);
      attr_dev(div0, "class", "item-grid svelte-ep33d7");
      add_location(div0, file, 836, 4, 26093);
      attr_dev(div1, "class", "mdc-card mdc-card--outlined grid-card svelte-ep33d7");
      add_location(div1, file, 834, 2, 25982);
      attr_dev(div2, "class", "container svelte-ep33d7");
      toggle_class(div2, "has-unknown-recipes", typeof
      /*recipes*/
      ctx[2] !== "undefined" &&
      /*$save*/
      ctx[3] !== null);
      add_location(div2, file, 831, 0, 25875);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div2, anchor);
      append_dev(div2, div1);
      append_dev(div1, h2);
      append_dev(h2, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);

      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].m(div0, null);
      }

      append_dev(div2, t3);
      if (if_block) if_block.m(div2, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*title*/
      1) && title_value !== (title_value = "" + (
      /*title*/
      ctx[0] + " | Stardew Completionist"))) {
        document.title = title_value;
      }

      if (!current || dirty &
      /*title*/
      1) set_data_dev(t1,
      /*title*/
      ctx[0]);

      if (dirty &
      /*items, $save*/
      10) {
        each_value_3 =
        /*items*/
        ctx[1];
        validate_each_argument(each_value_3);

        var _i18;

        for (_i18 = 0; _i18 < each_value_3.length; _i18 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i18);

          if (each_blocks[_i18]) {
            each_blocks[_i18].p(child_ctx, dirty);

            transition_in(each_blocks[_i18], 1);
          } else {
            each_blocks[_i18] = create_each_block_3(child_ctx);

            each_blocks[_i18].c();

            transition_in(each_blocks[_i18], 1);

            each_blocks[_i18].m(div0, null);
          }
        }

        group_outros();

        for (_i18 = each_value_3.length; _i18 < each_blocks.length; _i18 += 1) {
          out(_i18);
        }

        check_outros();
      }

      if (typeof
      /*recipes*/
      ctx[2] !== "undefined" &&
      /*$save*/
      ctx[3] !== null) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*recipes, $save*/
          12) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div2, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if (dirty &
      /*recipes, $save*/
      12) {
        toggle_class(div2, "has-unknown-recipes", typeof
        /*recipes*/
        ctx[2] !== "undefined" &&
        /*$save*/
        ctx[3] !== null);
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i19 = 0; _i19 < each_value_3.length; _i19 += 1) {
        transition_in(each_blocks[_i19]);
      }

      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i20 = 0; _i20 < each_blocks.length; _i20 += 1) {
        transition_out(each_blocks[_i20]);
      }

      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div2);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
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

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function preload(page) {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (["shipping", "fish", "artifacts", "minerals", "cooking", "crafting"].includes(page.params.collection)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", this.error(404, "Not found"));

          case 2:
            if (!(page.params.collection === "cooking" || page.params.collection === "crafting")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              title: categoryNames.get(page.params.collection),
              recipes: gameInfo[page.params.collection],
              items: gameInfo[page.params.collection].map(function (recipe) {
                return recipe.result;
              })
            });

          case 6:
            return _context.abrupt("return", {
              title: categoryNames.get(page.params.collection),
              items: gameInfo[page.params.collection],
              recipes: undefined
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

function instance($$self, $$props, $$invalidate) {
  var $save;
  var $requiredIngredients;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(3, $save = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bcollectionu5D", slots, []);
  var title = $$props.title;
  var items = $$props.items;
  var recipes = $$props.recipes;
  var requiredIngredients = derived([save, stores$1().page], function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        $save = _ref4[0];

    var _a, _b;

    var _c;

    if (!recipes || $save === null) {
      return null;
    } else {
      var recipesNeeded = {};

      var processRecipe = function processRecipe(recipe) {
        var _a;

        var _b;

        var _loop = function _loop() {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i21], 2),
              ingredient = _Object$entries$_i[0],
              amount = _Object$entries$_i[1];

          var recipe = Object.values(gameInfo.recipes).find(function (recipe) {
            return recipe.result.id === ingredient;
          });

          if (recipe) {
            (_a = recipesNeeded[_b = recipe.name]) !== null && _a !== void 0 ? _a : recipesNeeded[_b] = 0; // If a recipe makes two of an item, you only need to craft it once to satisfy the need for two of the item.

            recipesNeeded[recipe.name] += amount / recipe.amount;
            processRecipe(recipe);
          }
        };

        for (var _i21 = 0, _Object$entries = Object.entries(recipe.ingredients); _i21 < _Object$entries.length; _i21++) {
          _loop();
        }
      };

      var rootRecipes = recipes.filter(function (recipe) {
        return !$save.collectedItems.includes(recipe.result.id);
      }); // Figure out all the recipes needed to craft other recipes

      var _iterator = _createForOfIteratorHelper(rootRecipes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _recipe2 = _step.value;
          processRecipe(_recipe2);
        } // You can't make half a recipe

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      for (var recipe in recipesNeeded) {
        recipesNeeded[recipe] = Math.ceil(recipesNeeded[recipe]);
      } // Only if you won't be making the recipe anyway should the root recipes be added


      var _iterator2 = _createForOfIteratorHelper(rootRecipes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _recipe3 = _step2.value;
          (_a = recipesNeeded[_c = _recipe3.name]) !== null && _a !== void 0 ? _a : recipesNeeded[_c] = 1;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var output = {};

      for (var _i22 = 0, _Object$entries2 = Object.entries(recipesNeeded); _i22 < _Object$entries2.length; _i22++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i22], 2),
            name = _Object$entries2$_i[0],
            recipeAmount = _Object$entries2$_i[1];

        var _recipe = gameInfo.recipes[name];

        var _loop2 = function _loop2() {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i23], 2),
              ingredient = _Object$entries3$_i[0],
              amount = _Object$entries3$_i[1];

          if (Object.values(gameInfo.recipes).some(function (recipe) {
            return recipe.result.id === ingredient;
          })) {
            return "continue";
          }

          (_b = output[ingredient]) !== null && _b !== void 0 ? _b : output[ingredient] = 0;
          output[ingredient] += amount * recipeAmount;
        };

        for (var _i23 = 0, _Object$entries3 = Object.entries(_recipe.ingredients); _i23 < _Object$entries3.length; _i23++) {
          var _ret = _loop2();

          if (_ret === "continue") continue;
        }
      }

      return output;
    }
  });
  validate_store(requiredIngredients, "requiredIngredients");
  component_subscribe($$self, requiredIngredients, function (value) {
    return $$invalidate(4, $requiredIngredients = value);
  });
  var writable_props = ["title", "items", "recipes"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Bcollectionu5D> was created with unknown prop '".concat(key, "'"));
  });

  var func = function func(recipe) {
    return !$save.knownRecipes.includes(recipe.name);
  };

  $$self.$$set = function ($$props) {
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("items" in $$props) $$invalidate(1, items = $$props.items);
    if ("recipes" in $$props) $$invalidate(2, recipes = $$props.recipes);
  };

  $$self.$capture_state = function () {
    return {
      __awaiter: __awaiter,
      gameInfo: gameInfo,
      categoryNames: categoryNames,
      preload: preload,
      DataTable: DataTable,
      Body: Body,
      Cell: Cell,
      Head: Head,
      Row: Row,
      ItemButton: ItemButton,
      save: save,
      derived: derived,
      categories: categories,
      stores: stores$1,
      title: title,
      items: items,
      recipes: recipes,
      requiredIngredients: requiredIngredients,
      $save: $save,
      $requiredIngredients: $requiredIngredients
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("items" in $$props) $$invalidate(1, items = $$props.items);
    if ("recipes" in $$props) $$invalidate(2, recipes = $$props.recipes);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [title, items, recipes, $save, $requiredIngredients, requiredIngredients, func];
}

var U5Bcollectionu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bcollectionu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Bcollectionu5D);

  function U5Bcollectionu5D(options) {
    var _this;

    _classCallCheck(this, U5Bcollectionu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      title: 0,
      items: 1,
      recipes: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bcollectionu5D",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*title*/
    ctx[0] === undefined && !("title" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'title'");
    }

    if (
    /*items*/
    ctx[1] === undefined && !("items" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'items'");
    }

    if (
    /*recipes*/
    ctx[2] === undefined && !("recipes" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'recipes'");
    }

    return _this;
  }

  _createClass(U5Bcollectionu5D, [{
    key: "title",
    get: function get() {
      throw new Error("<U5Bcollectionu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bcollectionu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "items",
    get: function get() {
      throw new Error("<U5Bcollectionu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bcollectionu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "recipes",
    get: function get() {
      throw new Error("<U5Bcollectionu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bcollectionu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bcollectionu5D;
}(SvelteComponentDev);

export default U5Bcollectionu5D;
export { preload };
