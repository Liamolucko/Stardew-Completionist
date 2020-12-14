import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, f as space, g as element, t as text, L as empty, q as query_selector_all, j as detach_dev, k as claim_space, l as claim_element, m as children, o as claim_text, u as attr_dev, w as add_location, x as insert_dev, y as append_dev, A as _slicedToArray, C as transition_out, N as check_outros, B as transition_in, E as validate_store, F as component_subscribe, v as validate_slots, G as derived, ar as seasonNames, H as save, I as gameInfo, J as globals, K as validate_each_argument, h as create_component, p as claim_component, z as mount_component, D as destroy_component, M as group_outros, n as noop, Q as set_data_dev, O as destroy_each, P as _toConsumableArray } from './client.34ba2ad3.js';
import '../../../../../jimp.min.js';
import { D as DataTable, B as Body, C as Cell, H as Head, R as Row } from './Cell.486c523a.js';
import { I as ItemButton } from './ItemButton.0bdbbf48.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Object_1 = globals.Object;
var file = "src/routes/dashboard.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i][0];
  child_ctx[7] = list[i][1];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  return child_ctx;
} // (908:0) {:else}


function create_else_block(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text("When you select a save file, this section shows information about what you\n    should do next.");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, "When you select a save file, this section shows information about what you\n    should do next.");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "no-save svelte-13t98ij");
      add_location(p, file, 908, 2, 28173);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(908:0) {:else}",
    ctx: ctx
  });
  return block;
} // (858:0) {#if $save !== null}


function create_if_block(ctx) {
  var div2;
  var datatable;
  var t0;
  var div1;
  var h2;
  var t1_value = seasonNames.get(
  /*$save*/
  ctx[0].currentSeason) + "";
  var t1;
  var t2;
  var div0;
  var current;
  datatable = new DataTable({
    props: {
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
  /*$seasonalItems*/
  ctx[2]);
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      div2 = element("div");
      create_component(datatable.$$.fragment);
      t0 = space();
      div1 = element("div");
      h2 = element("h2");
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      claim_component(datatable.$$.fragment, div2_nodes);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h2 = claim_element(div1_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t1 = claim_text(h2_nodes, t1_value);
      h2_nodes.forEach(detach_dev);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "mdc-typography--headline6 svelte-13t98ij");
      add_location(h2, file, 894, 6, 27771);
      attr_dev(div0, "class", "seasonal-items svelte-13t98ij");
      add_location(div0, file, 897, 6, 27875);
      attr_dev(div1, "class", "mdc-card mdc-card--outlined seasonal svelte-13t98ij");
      add_location(div1, file, 893, 4, 27714);
      attr_dev(div2, "class", "container svelte-13t98ij");
      add_location(div2, file, 858, 2, 26691);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      mount_component(datatable, div2, null);
      append_dev(div2, t0);
      append_dev(div2, div1);
      append_dev(div1, h2);
      append_dev(h2, t1);
      append_dev(div1, t2);
      append_dev(div1, div0);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div0, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      var datatable_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      524290) {
        datatable_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      datatable.$set(datatable_changes);
      if ((!current || dirty &
      /*$save*/
      1) && t1_value !== (t1_value = seasonNames.get(
      /*$save*/
      ctx[0].currentSeason) + "")) set_data_dev(t1, t1_value);

      if (dirty &
      /*gameInfo, Object, $seasonalItems*/
      4) {
        each_value = Object.entries(
        /*$seasonalItems*/
        ctx[2]);
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(div0, null);
          }
        }

        group_outros();

        for (_i4 = each_value.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(datatable.$$.fragment, local);

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      transition_out(datatable.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
      destroy_component(datatable);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(858:0) {#if $save !== null}",
    ctx: ctx
  });
  return block;
} // (863:10) <Cell>


function create_default_slot_12(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Villager");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Villager");
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
    id: create_default_slot_12.name,
    type: "slot",
    source: "(863:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (864:10) <Cell>


function create_default_slot_11(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Hearts");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Hearts");
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
    id: create_default_slot_11.name,
    type: "slot",
    source: "(864:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (865:10) <Cell>


function create_default_slot_10(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Birthday");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Birthday");
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
    id: create_default_slot_10.name,
    type: "slot",
    source: "(865:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (866:10) <Cell>


function create_default_slot_9(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Best Gifts");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Best Gifts");
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
    id: create_default_slot_9.name,
    type: "slot",
    source: "(866:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (862:8) <Row>


function create_default_slot_8(ctx) {
  var cell0;
  var t0;
  var cell1;
  var t1;
  var cell2;
  var t2;
  var cell3;
  var current;
  cell0 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_12]
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
        default: [create_default_slot_11]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  cell2 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_10]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  cell3 = new Cell({
    props: {
      $$slots: {
        default: [create_default_slot_9]
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
      create_component(cell2.$$.fragment);
      t2 = space();
      create_component(cell3.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(cell2.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(cell3.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(cell1, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(cell2, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(cell3, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell0_changes = {};

      if (dirty &
      /*$$scope*/
      524288) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope*/
      524288) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
      var cell2_changes = {};

      if (dirty &
      /*$$scope*/
      524288) {
        cell2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell2.$set(cell2_changes);
      var cell3_changes = {};

      if (dirty &
      /*$$scope*/
      524288) {
        cell3_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell3.$set(cell3_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell0.$$.fragment, local);
      transition_in(cell1.$$.fragment, local);
      transition_in(cell2.$$.fragment, local);
      transition_in(cell3.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(cell1.$$.fragment, local);
      transition_out(cell2.$$.fragment, local);
      transition_out(cell3.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell0, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(cell1, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(cell2, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(cell3, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_8.name,
    type: "slot",
    source: "(862:8) <Row>",
    ctx: ctx
  });
  return block;
} // (861:6) <Head>


function create_default_slot_7(ctx) {
  var row;
  var current;
  row = new Row({
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
      524288) {
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
    id: create_default_slot_7.name,
    type: "slot",
    source: "(861:6) <Head>",
    ctx: ctx
  });
  return block;
} // (872:12) <Cell>


function create_default_slot_6(ctx) {
  var t_value =
  /*birthday*/
  ctx[10].villager + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays*/
      2 && t_value !== (t_value =
      /*birthday*/
      ctx[10].villager + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(872:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (875:16) {#each [...Array(birthday.maxHearts).keys()] as i}


function create_each_block_3(ctx) {
  var img;
  var img_src_value;
  var block = {
    c: function create() {
      img = element("img");
      this.h();
    },
    l: function claim(nodes) {
      img = claim_element(nodes, "IMG", {
        alt: true,
        src: true,
        class: true
      });
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "alt", "heart");
      if (img.src !== (img_src_value = "heart-" + (
      /*birthday*/
      ctx[10].hearts >=
      /*i*/
      ctx[16] + 1 ? "filled" : "outline") + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "class", "svelte-13t98ij");
      add_location(img, file, 875, 18, 27167);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays*/
      2 && img.src !== (img_src_value = "heart-" + (
      /*birthday*/
      ctx[10].hearts >=
      /*i*/
      ctx[16] + 1 ? "filled" : "outline") + ".png")) {
        attr_dev(img, "src", img_src_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(img);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(875:16) {#each [...Array(birthday.maxHearts).keys()] as i}",
    ctx: ctx
  });
  return block;
} // (873:12) <Cell>


function create_default_slot_5(ctx) {
  var div;

  var each_value_3 = _toConsumableArray(Array(
  /*birthday*/
  ctx[10].maxHearts).keys());

  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "hearts svelte-13t98ij");
      add_location(div, file, 873, 14, 27061);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays, Array*/
      2) {
        each_value_3 = _toConsumableArray(Array(
        /*birthday*/
        ctx[10].maxHearts).keys());
        validate_each_argument(each_value_3);

        var _i10;

        for (_i10 = 0; _i10 < each_value_3.length; _i10 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);
          } else {
            each_blocks[_i10] = create_each_block_3(child_ctx);

            each_blocks[_i10].c();

            each_blocks[_i10].m(div, null);
          }
        }

        for (; _i10 < each_blocks.length; _i10 += 1) {
          each_blocks[_i10].d(1);
        }

        each_blocks.length = each_value_3.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_5.name,
    type: "slot",
    source: "(873:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (882:12) <Cell>


function create_default_slot_4(ctx) {
  var t_value =
  /*birthday*/
  ctx[10].date + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays*/
      2 && t_value !== (t_value =
      /*birthday*/
      ctx[10].date + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(882:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (885:16) {#each birthday.bestGifts as item}


function create_each_block_2(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[13],
      scale:
      /*item*/
      ctx[13].isCraftable ? 1 : 2
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
      /*$birthdays*/
      2) itembutton_changes.item =
      /*item*/
      ctx[13];
      if (dirty &
      /*$birthdays*/
      2) itembutton_changes.scale =
      /*item*/
      ctx[13].isCraftable ? 1 : 2;
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
    id: create_each_block_2.name,
    type: "each",
    source: "(885:16) {#each birthday.bestGifts as item}",
    ctx: ctx
  });
  return block;
} // (883:12) <Cell>


function create_default_slot_3(ctx) {
  var div;
  var current;
  var each_value_2 =
  /*birthday*/
  ctx[10].bestGifts;
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      div = element("div");

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        each_blocks[_i12].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "best-gifts svelte-13t98ij");
      add_location(div, file, 883, 14, 27432);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].m(div, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays*/
      2) {
        each_value_2 =
        /*birthday*/
        ctx[10].bestGifts;
        validate_each_argument(each_value_2);

        var _i14;

        for (_i14 = 0; _i14 < each_value_2.length; _i14 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i14);

          if (each_blocks[_i14]) {
            each_blocks[_i14].p(child_ctx, dirty);

            transition_in(each_blocks[_i14], 1);
          } else {
            each_blocks[_i14] = create_each_block_2(child_ctx);

            each_blocks[_i14].c();

            transition_in(each_blocks[_i14], 1);

            each_blocks[_i14].m(div, null);
          }
        }

        group_outros();

        for (_i14 = each_value_2.length; _i14 < each_blocks.length; _i14 += 1) {
          out(_i14);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i15 = 0; _i15 < each_value_2.length; _i15 += 1) {
        transition_in(each_blocks[_i15]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i16 = 0; _i16 < each_blocks.length; _i16 += 1) {
        transition_out(each_blocks[_i16]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(883:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (871:10) <Row>


function create_default_slot_2(ctx) {
  var cell0;
  var t0;
  var cell1;
  var t1;
  var cell2;
  var t2;
  var cell3;
  var t3;
  var current;
  cell0 = new Cell({
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
  cell1 = new Cell({
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
  cell2 = new Cell({
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
  cell3 = new Cell({
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
      create_component(cell2.$$.fragment);
      t2 = space();
      create_component(cell3.$$.fragment);
      t3 = space();
    },
    l: function claim(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(cell2.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(cell3.$$.fragment, nodes);
      t3 = claim_space(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_dev(target, t0, anchor);
      mount_component(cell1, target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(cell2, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(cell3, target, anchor);
      insert_dev(target, t3, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell0_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      524290) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      524290) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
      var cell2_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      524290) {
        cell2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell2.$set(cell2_changes);
      var cell3_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      524290) {
        cell3_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell3.$set(cell3_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell0.$$.fragment, local);
      transition_in(cell1.$$.fragment, local);
      transition_in(cell2.$$.fragment, local);
      transition_in(cell3.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(cell1.$$.fragment, local);
      transition_out(cell2.$$.fragment, local);
      transition_out(cell3.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell0, detaching);
      if (detaching) detach_dev(t0);
      destroy_component(cell1, detaching);
      if (detaching) detach_dev(t1);
      destroy_component(cell2, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(cell3, detaching);
      if (detaching) detach_dev(t3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(871:10) <Row>",
    ctx: ctx
  });
  return block;
} // (870:8) {#each $birthdays as birthday}


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
      /*$$scope, $birthdays*/
      524290) {
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
    source: "(870:8) {#each $birthdays as birthday}",
    ctx: ctx
  });
  return block;
} // (869:6) <Body>


function create_default_slot_1(ctx) {
  var each_1_anchor;
  var current;
  var each_value_1 =
  /*$birthdays*/
  ctx[1];
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
      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        each_blocks[_i18].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays, Array*/
      2) {
        each_value_1 =
        /*$birthdays*/
        ctx[1];
        validate_each_argument(each_value_1);

        var _i20;

        for (_i20 = 0; _i20 < each_value_1.length; _i20 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i20);

          if (each_blocks[_i20]) {
            each_blocks[_i20].p(child_ctx, dirty);

            transition_in(each_blocks[_i20], 1);
          } else {
            each_blocks[_i20] = create_each_block_1(child_ctx);

            each_blocks[_i20].c();

            transition_in(each_blocks[_i20], 1);

            each_blocks[_i20].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i20 = each_value_1.length; _i20 < each_blocks.length; _i20 += 1) {
          out(_i20);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i21 = 0; _i21 < each_value_1.length; _i21 += 1) {
        transition_in(each_blocks[_i21]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i22 = 0; _i22 < each_blocks.length; _i22 += 1) {
        transition_out(each_blocks[_i22]);
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
    source: "(869:6) <Body>",
    ctx: ctx
  });
  return block;
} // (860:4) <DataTable>


function create_default_slot(ctx) {
  var head;
  var t;
  var body;
  var current;
  head = new Head({
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
      524288) {
        head_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      head.$set(head_changes);
      var body_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      524290) {
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
    source: "(860:4) <DataTable>",
    ctx: ctx
  });
  return block;
} // (899:8) {#each Object.entries($seasonalItems) as [id, quantity]}


function create_each_block(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item: gameInfo.items[
      /*id*/
      ctx[6]],
      scale: gameInfo.items[
      /*id*/
      ctx[6]].isCraftable ? 2 : 3,
      quantity:
      /*quantity*/
      ctx[7]
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
      /*$seasonalItems*/
      4) itembutton_changes.item = gameInfo.items[
      /*id*/
      ctx[6]];
      if (dirty &
      /*$seasonalItems*/
      4) itembutton_changes.scale = gameInfo.items[
      /*id*/
      ctx[6]].isCraftable ? 2 : 3;
      if (dirty &
      /*$seasonalItems*/
      4) itembutton_changes.quantity =
      /*quantity*/
      ctx[7];
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
    id: create_each_block.name,
    type: "each",
    source: "(899:8) {#each Object.entries($seasonalItems) as [id, quantity]}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var h1;
  var t1;
  var t2;
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*$save*/
    ctx[0] !== null) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text("Dashboard");
      t2 = space();
      if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-qmib3v\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Dashboard");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      document.title = "Dashboard | Stardew Completionist";
      attr_dev(h1, "class", "title mdc-typography--headline4 svelte-13t98ij");
      add_location(h1, file, 856, 0, 26609);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
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
  var $save;
  var $birthdays;
  var $seasonalItems;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(0, $save = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Dashboard", slots, []);
  var birthdays = derived(save, function ($save, set) {
    if ($save !== null) {
      set(Object.values(gameInfo.villagers).sort(function (a, b) {
        return (a.birthDate - $save.currentDate + 112) % 112 - (b.birthDate - $save.currentDate + 112) % 112;
      }).map(function (villager) {
        var _a, _b, _c, _d;

        return {
          villager: villager.name,
          date: villager.birthday,
          hearts: (_b = (_a = $save.relationships.get(villager.name)) === null || _a === void 0 ? void 0 : _a.hearts) !== null && _b !== void 0 ? _b : 0,
          maxHearts: (_d = (_c = $save.relationships.get(villager.name)) === null || _c === void 0 ? void 0 : _c.maxHearts) !== null && _d !== void 0 ? _d : villager.datable ? 8 : 10,
          bestGifts: villager.bestGifts
        };
      }));
    }
  });
  validate_store(birthdays, "birthdays");
  component_subscribe($$self, birthdays, function (value) {
    return $$invalidate(1, $birthdays = value);
  });
  var requiredItems = derived(save, function ($save) {
    var _a, _b, _c, _d, _e, _f;

    var _g, _h;

    if ($save === null) {
      return null;
    } else {
      var output = {};
      var recipes = {};

      var processRecipe = function processRecipe(recipe) {
        var _a;

        var _b;

        var _loop = function _loop() {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i23], 2),
              ingredient = _Object$entries$_i[0],
              amount = _Object$entries$_i[1];

          var recipe = Object.values(gameInfo.recipes).find(function (recipe) {
            return recipe.result.id === ingredient;
          });

          if (recipe) {
            (_a = recipes[_b = recipe.name]) !== null && _a !== void 0 ? _a : recipes[_b] = 0; // If a recipe makes two of an item, you only need to craft it once to satisfy the need for two of the item.

            recipes[recipe.name] += amount / recipe.amount;
            processRecipe(recipe);
          }
        };

        for (var _i23 = 0, _Object$entries = Object.entries(recipe.ingredients); _i23 < _Object$entries.length; _i23++) {
          _loop();
        }
      };

      var rootRecipes = Object.values(gameInfo.recipes).filter(function (recipe) {
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

      for (var recipe in recipes) {
        recipes[recipe] = Math.ceil(recipes[recipe]);
      } // Only if you won't be making the recipe anyway should the root recipes be added


      var _iterator2 = _createForOfIteratorHelper(rootRecipes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _recipe3 = _step2.value;
          (_a = recipes[_g = _recipe3.name]) !== null && _a !== void 0 ? _a : recipes[_g] = 1;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      for (var _i24 = 0, _Object$entries2 = Object.entries(recipes); _i24 < _Object$entries2.length; _i24++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i24], 2),
            name = _Object$entries2$_i[0],
            recipeAmount = _Object$entries2$_i[1];

        var _recipe = gameInfo.recipes[name];

        var _loop2 = function _loop2() {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i25], 2),
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

        for (var _i25 = 0, _Object$entries3 = Object.entries(_recipe.ingredients); _i25 < _Object$entries3.length; _i25++) {
          var _ret = _loop2();

          if (_ret === "continue") continue;
        }
      }

      var _iterator3 = _createForOfIteratorHelper(gameInfo.shipping),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _id = _step3.value.id;

          if (!$save.collectedItems.includes(_id)) {
            (_c = output[_id]) !== null && _c !== void 0 ? _c : output[_id] = 0;
            output[_id] += 1;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(gameInfo.fish),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _id2 = _step4.value.id;

          if (!$save.collectedItems.includes(_id2)) {
            (_d = output[_id2]) !== null && _d !== void 0 ? _d : output[_id2] = 1;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      for (var _i26 = 0, _Object$values = Object.values(gameInfo.bundles); _i26 < _Object$values.length; _i26++) {
        var bundle = _Object$values[_i26];

        for (var _i27 = 0, _Object$entries4 = Object.entries(bundle.items); _i27 < _Object$entries4.length; _i27++) {
          var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i27], 2),
              index = _Object$entries4$_i[0],
              item = _Object$entries4$_i[1];

          if (!$save.bundleCompletion.get(bundle.id)[index]) {
            (_e = output[_h = item.id]) !== null && _e !== void 0 ? _e : output[_h] = 0;
            output[item.id] += item.amount;
          }
        }
      }

      for (var id in output) {
        output[id] -= (_f = $save.items[id]) !== null && _f !== void 0 ? _f : 0;
        if (output[id] <= 0) delete output[id];
      }

      return output;
    }
  });
  var seasonalItems = derived(requiredItems, function ($requiredItems, set) {
    if ($requiredItems !== null) {
      set(Object.fromEntries(Object.entries($requiredItems).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            id = _ref4[0],
            _ = _ref4[1];

        var item = gameInfo.items[id];
        return item && typeof item.seasons !== "undefined" && item.seasons.includes(["spring", "summer", "fall", "winter"][$save.currentSeason]) && Object.values(item.seasons).filter(function (value) {
          return value;
        }).length < 3;
      })));
    }
  });
  validate_store(seasonalItems, "seasonalItems");
  component_subscribe($$self, seasonalItems, function (value) {
    return $$invalidate(2, $seasonalItems = value);
  });
  var writable_props = [];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Dashboard> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      DataTable: DataTable,
      Body: Body,
      Cell: Cell,
      Head: Head,
      Row: Row,
      derived: derived,
      ItemButton: ItemButton,
      seasonNames: seasonNames,
      save: save,
      gameInfo: gameInfo,
      birthdays: birthdays,
      requiredItems: requiredItems,
      seasonalItems: seasonalItems,
      $save: $save,
      $birthdays: $birthdays,
      $seasonalItems: $seasonalItems
    };
  };

  return [$save, $birthdays, $seasonalItems, birthdays, seasonalItems];
}

var Dashboard = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Dashboard, _SvelteComponentDev);

  var _super = _createSuper(Dashboard);

  function Dashboard(options) {
    var _this;

    _classCallCheck(this, Dashboard);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Dashboard",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Dashboard;
}(SvelteComponentDev);

export default Dashboard;
