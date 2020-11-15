import { _ as _asyncToGenerator, r as regenerator, as as categoryNames, g as gameInfo, a as _inherits, b as _getPrototypeOf, c as _possibleConstructorReturn, d as _classCallCheck, i as init, e as _assertThisInitialized, f as dispatch_dev, h as _createClass, S as SvelteComponentDev, L as validate_each_argument, s as safe_not_equal, l as create_component, x as claim_component, C as mount_component, E as transition_in, F as transition_out, G as destroy_component, j as space, k as element, t as text, o as claim_space, p as claim_element, u as children, w as claim_text, m as detach_dev, y as attr_dev, z as add_location, A as insert_dev, B as append_dev, Q as destroy_each, at as categories, T as set_data_dev, q as query_selector_all, ap as toggle_class, D as _slicedToArray, P as check_outros, H as validate_store, I as component_subscribe, v as validate_slots, J as derived, M as save, au as stores$1, K as globals, O as group_outros, N as empty, aq as set_style } from './client.740179a6.js';
import { D as DataTable, H as Head, B as Body, C as Cell, R as Row } from './Cell.8d1c1d28.js';
import { I as ItemButton } from './ItemButton.27200f84.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Object_1 = globals.Object;
var file = "src/routes/[collection].svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i][0];
  child_ctx[9] = list[i][1];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
} // (831:6) {#each items as item}


function create_each_block_3(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[18],
      scale:
      /*item*/
      ctx[18].isCraftable ? 2 : 3,
      shadow: true,
      grey:
      /*$save*/
      ctx[4] === null ? false : !
      /*$save*/
      ctx[4].collectedItems.includes(
      /*item*/
      ctx[18].id)
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
      4) itembutton_changes.item =
      /*item*/
      ctx[18];
      if (dirty &
      /*items*/
      4) itembutton_changes.scale =
      /*item*/
      ctx[18].isCraftable ? 2 : 3;
      if (dirty &
      /*$save, items*/
      20) itembutton_changes.grey =
      /*$save*/
      ctx[4] === null ? false : !
      /*$save*/
      ctx[4].collectedItems.includes(
      /*item*/
      ctx[18].id);
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
    source: "(831:6) {#each items as item}",
    ctx: ctx
  });
  return block;
} // (841:2) {#if typeof recipes !== 'undefined' && $save !== null}


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
  (_ctx$ = ctx[5]) !== null && _ctx$ !== void 0 ? _ctx$ : {});
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
      add_location(h2, file, 871, 6, 26632);
      attr_dev(ul, "class", "svelte-ep33d7");
      add_location(ul, file, 872, 6, 26702);
      attr_dev(div, "class", "mdc-card mdc-card--outlined ingredients svelte-ep33d7");
      add_location(div, file, 870, 4, 26572);
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
      2097176) {
        datatable_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      datatable.$set(datatable_changes);

      if (dirty &
      /*Object, $requiredIngredients, $save, categories, gameInfo*/
      49) {
        var _ctx$2;

        each_value = Object.entries(
        /*$requiredIngredients*/
        (_ctx$2 = ctx[5]) !== null && _ctx$2 !== void 0 ? _ctx$2 : {});
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
    source: "(841:2) {#if typeof recipes !== 'undefined' && $save !== null}",
    ctx: ctx
  });
  return block;
} // (845:10) <Cell>


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
    source: "(845:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (846:10) <Cell>


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
    source: "(846:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (844:8) <Row>


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
      2097152) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope*/
      2097152) {
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
    source: "(844:8) <Row>",
    ctx: ctx
  });
  return block;
} // (843:6) <Head>


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
      2097152) {
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
    source: "(843:6) <Head>",
    ctx: ctx
  });
  return block;
} // (852:12) <Cell>


function create_default_slot_4(ctx) {
  var itembutton;
  var t0;
  var span;
  var t1_value =
  /*recipe*/
  ctx[12].name + "";
  var t1;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*recipe*/
      ctx[12].result,
      scale:
      /*recipe*/
      ctx[12].result.isCraftable ? 1 : 2
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
      add_location(span, file, 855, 14, 26136);
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
      24) itembutton_changes.item =
      /*recipe*/
      ctx[12].result;
      if (dirty &
      /*recipes, $save*/
      24) itembutton_changes.scale =
      /*recipe*/
      ctx[12].result.isCraftable ? 1 : 2;
      itembutton.$set(itembutton_changes);
      if ((!current || dirty &
      /*recipes, $save*/
      24) && t1_value !== (t1_value =
      /*recipe*/
      ctx[12].name + "")) set_data_dev(t1, t1_value);
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
    source: "(852:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (859:14) {#if typeof recipe.sources !== 'undefined'}


function create_if_block_1(ctx) {
  var ul;
  var each_value_2 =
  /*recipe*/
  ctx[12].sources;
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
      add_location(ul, file, 859, 16, 26302);
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
      24) {
        each_value_2 =
        /*recipe*/
        ctx[12].sources;
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
    source: "(859:14) {#if typeof recipe.sources !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (861:18) {#each recipe.sources as source}


function create_each_block_2(ctx) {
  var li;
  var t_value =
  /*source*/
  ctx[15] + "";
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
      add_location(li, file, 861, 20, 26398);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*recipes, $save*/
      24 && t_value !== (t_value =
      /*source*/
      ctx[15] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(861:18) {#each recipe.sources as source}",
    ctx: ctx
  });
  return block;
} // (858:12) <Cell>


function create_default_slot_3(ctx) {
  var if_block_anchor;
  var if_block = typeof
  /*recipe*/
  ctx[12].sources !== "undefined" && create_if_block_1(ctx);
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
      ctx[12].sources !== "undefined") {
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
    source: "(858:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (851:10) <Row>


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
      2097176) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      2097176) {
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
    source: "(851:10) <Row>",
    ctx: ctx
  });
  return block;
} // (850:8) {#each recipes.filter((recipe) => !$save.knownRecipes.includes(recipe.name)) as recipe}


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
      2097176) {
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
    source: "(850:8) {#each recipes.filter((recipe) => !$save.knownRecipes.includes(recipe.name)) as recipe}",
    ctx: ctx
  });
  return block;
} // (849:6) <Body>


function create_default_slot_1(ctx) {
  var each_1_anchor;
  var current;
  var each_value_1 =
  /*recipes*/
  ctx[3].filter(
  /*func*/
  ctx[7]);
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
      24) {
        each_value_1 =
        /*recipes*/
        ctx[3].filter(
        /*func*/
        ctx[7]);
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
    source: "(849:6) <Body>",
    ctx: ctx
  });
  return block;
} // (842:4) <DataTable style="grid-area: r">


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
      2097152) {
        head_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      head.$set(head_changes);
      var body_changes = {};

      if (dirty &
      /*$$scope, recipes, $save*/
      2097176) {
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
    source: "(842:4) <DataTable style=\\\"grid-area: r\\\">",
    ctx: ctx
  });
  return block;
} // (874:8) {#each Object.entries($requiredIngredients ?? {}) as [id, amount]}


function create_each_block(ctx) {
  var _ctx$4$items$ctx$;

  var li;
  var t0_value = (categories.get(
  /*id*/
  ctx[8]) ||
  /*gameInfo*/
  ctx[0].items[
  /*id*/
  ctx[8]].name) + "";
  var t0;
  var t1;
  var t2_value = (
  /*$save*/
  (_ctx$4$items$ctx$ = ctx[4].items[
  /*id*/
  ctx[8]]) !== null && _ctx$4$items$ctx$ !== void 0 ? _ctx$4$items$ctx$ : 0) + "";
  var t2;
  var t3;
  var t4_value =
  /*amount*/
  ctx[9] + "";
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
      add_location(li, file, 874, 10, 26792);
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
      var _ctx$4$items$ctx$2;

      if (dirty &
      /*$requiredIngredients, gameInfo*/
      33 && t0_value !== (t0_value = (categories.get(
      /*id*/
      ctx[8]) ||
      /*gameInfo*/
      ctx[0].items[
      /*id*/
      ctx[8]].name) + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*$save, $requiredIngredients*/
      48 && t2_value !== (t2_value = (
      /*$save*/
      (_ctx$4$items$ctx$2 = ctx[4].items[
      /*id*/
      ctx[8]]) !== null && _ctx$4$items$ctx$2 !== void 0 ? _ctx$4$items$ctx$2 : 0) + "")) set_data_dev(t2, t2_value);
      if (dirty &
      /*$requiredIngredients*/
      32 && t4_value !== (t4_value =
      /*amount*/
      ctx[9] + "")) set_data_dev(t4, t4_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(874:8) {#each Object.entries($requiredIngredients ?? {}) as [id, amount]}",
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
  ctx[1] + " | Stardew Completionist");
  var each_value_3 =
  /*items*/
  ctx[2];
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
  ctx[3] !== "undefined" &&
  /*$save*/
  ctx[4] !== null && create_if_block(ctx);
  var block = {
    c: function create() {
      t0 = space();
      div2 = element("div");
      div1 = element("div");
      h2 = element("h2");
      t1 = text(
      /*title*/
      ctx[1]);
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
      ctx[1]);
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
      add_location(h2, file, 828, 4, 25319);
      attr_dev(div0, "class", "item-grid svelte-ep33d7");
      add_location(div0, file, 829, 4, 25374);
      attr_dev(div1, "class", "mdc-card mdc-card--outlined grid-card svelte-ep33d7");
      add_location(div1, file, 827, 2, 25263);
      attr_dev(div2, "class", "container svelte-ep33d7");
      toggle_class(div2, "has-unknown-recipes", typeof
      /*recipes*/
      ctx[3] !== "undefined" &&
      /*$save*/
      ctx[4] !== null);
      add_location(div2, file, 824, 0, 25156);
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
      2) && title_value !== (title_value = "" + (
      /*title*/
      ctx[1] + " | Stardew Completionist"))) {
        document.title = title_value;
      }

      if (!current || dirty &
      /*title*/
      2) set_data_dev(t1,
      /*title*/
      ctx[1]);

      if (dirty &
      /*items, $save*/
      20) {
        each_value_3 =
        /*items*/
        ctx[2];
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
      ctx[3] !== "undefined" &&
      /*$save*/
      ctx[4] !== null) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*recipes, $save*/
          24) {
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
      24) {
        toggle_class(div2, "has-unknown-recipes", typeof
        /*recipes*/
        ctx[3] !== "undefined" &&
        /*$save*/
        ctx[4] !== null);
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

function preload(_x) {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(page) {
    var gameInfo$1;
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
            _context.next = 4;
            return gameInfo.fetch(this.fetch);

          case 4:
            gameInfo$1 = _context.sent;

            if (!(page.params.collection === "cooking" || page.params.collection === "crafting")) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", {
              gameInfo: gameInfo$1,
              title: categoryNames.get(page.params.collection),
              recipes: gameInfo$1[page.params.collection],
              items: gameInfo$1[page.params.collection].map(function (recipe) {
                return recipe.result;
              })
            });

          case 9:
            return _context.abrupt("return", {
              gameInfo: gameInfo$1,
              title: categoryNames.get(page.params.collection),
              items: gameInfo$1[page.params.collection],
              recipes: undefined
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var $save;
  var $requiredIngredients;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(4, $save = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bcollectionu5D", slots, []);
  var gameInfo$1 = $$props.gameInfo;
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

          var recipe = Object.values(gameInfo$1.recipes).find(function (recipe) {
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

        var _recipe = gameInfo$1.recipes[name];

        var _loop2 = function _loop2() {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i23], 2),
              ingredient = _Object$entries3$_i[0],
              amount = _Object$entries3$_i[1];

          if (Object.values(gameInfo$1.recipes).some(function (recipe) {
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
    return $$invalidate(5, $requiredIngredients = value);
  });
  var writable_props = ["gameInfo", "title", "items", "recipes"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<U5Bcollectionu5D> was created with unknown prop '".concat(key, "'"));
  });

  var func = function func(recipe) {
    return !$save.knownRecipes.includes(recipe.name);
  };

  $$self.$$set = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(0, gameInfo$1 = $$props.gameInfo);
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("items" in $$props) $$invalidate(2, items = $$props.items);
    if ("recipes" in $$props) $$invalidate(3, recipes = $$props.recipes);
  };

  $$self.$capture_state = function () {
    return {
      _gameInfo: gameInfo,
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
      gameInfo: gameInfo$1,
      title: title,
      items: items,
      recipes: recipes,
      requiredIngredients: requiredIngredients,
      $save: $save,
      $requiredIngredients: $requiredIngredients
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(0, gameInfo$1 = $$props.gameInfo);
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("items" in $$props) $$invalidate(2, items = $$props.items);
    if ("recipes" in $$props) $$invalidate(3, recipes = $$props.recipes);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [gameInfo$1, title, items, recipes, $save, $requiredIngredients, requiredIngredients, func];
}

var U5Bcollectionu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bcollectionu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Bcollectionu5D);

  function U5Bcollectionu5D(options) {
    var _this;

    _classCallCheck(this, U5Bcollectionu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      gameInfo: 0,
      title: 1,
      items: 2,
      recipes: 3
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
    /*gameInfo*/
    ctx[0] === undefined && !("gameInfo" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'gameInfo'");
    }

    if (
    /*title*/
    ctx[1] === undefined && !("title" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'title'");
    }

    if (
    /*items*/
    ctx[2] === undefined && !("items" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'items'");
    }

    if (
    /*recipes*/
    ctx[3] === undefined && !("recipes" in props)) {
      console.warn("<U5Bcollectionu5D> was created without expected prop 'recipes'");
    }

    return _this;
  }

  _createClass(U5Bcollectionu5D, [{
    key: "gameInfo",
    get: function get() {
      throw new Error("<U5Bcollectionu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bcollectionu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
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
