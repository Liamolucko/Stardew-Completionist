import { _ as _asyncToGenerator, r as regenerator, g as gameInfo, a as _inherits, b as _getPrototypeOf, c as _possibleConstructorReturn, d as _classCallCheck, i as init, e as _assertThisInitialized, f as dispatch_dev, h as _createClass, S as SvelteComponentDev, L as validate_each_argument, s as safe_not_equal, k as element, t as text, j as space, p as claim_element, u as children, w as claim_text, m as detach_dev, o as claim_space, y as attr_dev, z as add_location, A as insert_dev, B as append_dev, T as set_data_dev, E as transition_in, F as transition_out, P as check_outros, Q as destroy_each, q as query_selector_all, D as _slicedToArray, H as validate_store, I as component_subscribe, v as validate_slots, J as derived, M as save, K as globals, O as group_outros, R as _toConsumableArray, N as empty, aq as set_style, n as noop, l as create_component, x as claim_component, C as mount_component, G as destroy_component } from './client.5bd7d1cd.js';
import { _ as _defineProperty } from './defineProperty.ea367071.js';
import { I as ItemButton } from './ItemButton.97a5595d.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;
var file = "src/routes/bundles.svelte";

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[4] = list[i][0];
  child_ctx[5] = list[i][1];
  return child_ctx;
} // (812:10) {:else}


function create_else_block_1(ctx) {
  var div;
  var t;
  var show_if;
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;

  var each_value_3 = _toConsumableArray(Array(
  /*bundle*/
  ctx[8].slots).keys());

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

  var if_block_creators = [create_if_block_2, create_else_block_2];
  var if_blocks = [];

  function select_block_type_2(ctx, dirty) {
    if (dirty &
    /*$save, $sections*/
    3) show_if = !!(
    /*$save*/
    ctx[1] !== null &&
    /*bundle*/
    ctx[8].items.every(func_1));
    if (show_if) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_2(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t = space();
      if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true
      });
      var div_nodes = children(div);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "slots svelte-o09d7q");
      set_style(div, "--slots",
      /*bundle*/
      ctx[8].slots);
      add_location(div, file, 812, 12, 24440);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }

      insert_dev(target, t, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*Object, $sections, Array, $save*/
      3) {
        each_value_3 = _toConsumableArray(Array(
        /*bundle*/
        ctx[8].slots).keys());
        validate_each_argument(each_value_3);

        var _i4;

        for (_i4 = 0; _i4 < each_value_3.length; _i4 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_3(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(div, null);
          }
        }

        group_outros();

        for (_i4 = each_value_3.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }

      if (!current || dirty &
      /*$sections*/
      1) {
        set_style(div, "--slots",
        /*bundle*/
        ctx[8].slots);
      }

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx, dirty);

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
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_3.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(t);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(812:10) {:else}",
    ctx: ctx
  });
  return block;
} // (804:10) {#if bundle.gold > 0}


function create_if_block(ctx) {
  var show_if;
  var if_block_anchor;

  function select_block_type_1(ctx, dirty) {
    if (show_if == null || dirty &
    /*$save, $sections*/
    3) show_if = !!(
    /*$save*/
    ctx[1] !== null &&
    /*$save*/
    ctx[1].bundleCompletion.get(
    /*bundle*/
    ctx[8].id).some(func));
    if (show_if) return create_if_block_1;
    return create_else_block;
  }

  var current_block_type = select_block_type_1(ctx, -1);
  var if_block = current_block_type(ctx);
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
      if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (current_block_type !== (current_block_type = select_block_type_1(ctx, dirty))) {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(804:10) {#if bundle.gold > 0}",
    ctx: ctx
  });
  return block;
} // (816:18) {#if $save !== null && bundle.completedItems.length > i}


function create_if_block_3(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      scale: 2,
      item:
      /*bundle*/
      ctx[8].completedItems[
      /*i*/
      ctx[14]]
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
      /*$sections*/
      1) itembutton_changes.item =
      /*bundle*/
      ctx[8].completedItems[
      /*i*/
      ctx[14]];
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
    id: create_if_block_3.name,
    type: "if",
    source: "(816:18) {#if $save !== null && bundle.completedItems.length > i}",
    ctx: ctx
  });
  return block;
} // (814:14) {#each [...Array(bundle.slots).keys()] as i}


function create_each_block_3(ctx) {
  var span;
  var t;
  var current;
  var if_block =
  /*$save*/
  ctx[1] !== null &&
  /*bundle*/
  ctx[8].completedItems.length >
  /*i*/
  ctx[14] && create_if_block_3(ctx);
  var block = {
    c: function create() {
      span = element("span");
      if (if_block) if_block.c();
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (if_block) if_block.l(span_nodes);
      t = claim_space(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "slot svelte-o09d7q");
      add_location(span, file, 814, 16, 24567);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      if (if_block) if_block.m(span, null);
      append_dev(span, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*$save*/
      ctx[1] !== null &&
      /*bundle*/
      ctx[8].completedItems.length >
      /*i*/
      ctx[14]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*$save, $sections*/
          3) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(span, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
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
      if (detaching) detach_dev(span);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(814:14) {#each [...Array(bundle.slots).keys()] as i}",
    ctx: ctx
  });
  return block;
} // (824:12) {:else}


function create_else_block_2(ctx) {
  var div;
  var current;
  var each_value_2 =
  /*bundle*/
  ctx[8].items.filter(func_2);
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
      attr_dev(div, "class", "options svelte-o09d7q");
      add_location(div, file, 824, 14, 25007);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(div, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*Object, $sections*/
      1) {
        each_value_2 =
        /*bundle*/
        ctx[8].items.filter(func_2);
        validate_each_argument(each_value_2);

        var _i10;

        for (_i10 = 0; _i10 < each_value_2.length; _i10 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block_2(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(div, null);
          }
        }

        group_outros();

        for (_i10 = each_value_2.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value_2.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
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
    id: create_else_block_2.name,
    type: "else",
    source: "(824:12) {:else}",
    ctx: ctx
  });
  return block;
} // (822:12) {#if $save !== null && bundle.items.every((item) => item.completed)}


function create_if_block_2(ctx) {
  var div;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      t = text("check");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "check");
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "completed material-icons svelte-o09d7q");
      add_location(div, file, 822, 14, 24923);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(822:12) {#if $save !== null && bundle.items.every((item) => item.completed)}",
    ctx: ctx
  });
  return block;
} // (826:16) {#each bundle.items.filter((item) => !item.completed) as item}


function create_each_block_2(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[11],
      scale: 2,
      quality:
      /*item*/
      ctx[11].quality,
      quantity:
      /*item*/
      ctx[11].amount
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
      /*$sections*/
      1) itembutton_changes.item =
      /*item*/
      ctx[11];
      if (dirty &
      /*$sections*/
      1) itembutton_changes.quality =
      /*item*/
      ctx[11].quality;
      if (dirty &
      /*$sections*/
      1) itembutton_changes.quantity =
      /*item*/
      ctx[11].amount;
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
    source: "(826:16) {#each bundle.items.filter((item) => !item.completed) as item}",
    ctx: ctx
  });
  return block;
} // (809:12) {:else}


function create_else_block(ctx) {
  var div;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      t = text("close");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "close");
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "not-completed material-icons svelte-o09d7q");
      add_location(div, file, 809, 14, 24338);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(809:12) {:else}",
    ctx: ctx
  });
  return block;
} // (805:12) {#if $save !== null && $save.bundleCompletion                 .get(bundle.id)                 .some((e) => e)}


function create_if_block_1(ctx) {
  var div;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      t = text("check");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "check");
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "completed material-icons svelte-o09d7q");
      add_location(div, file, 807, 14, 24254);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(805:12) {#if $save !== null && $save.bundleCompletion                 .get(bundle.id)                 .some((e) => e)}",
    ctx: ctx
  });
  return block;
} // (801:6) {#each bundles as bundle}


function create_each_block_1(ctx) {
  var div;
  var h5;
  var t0_value =
  /*bundle*/
  ctx[8].name + "";
  var t0;
  var t1;
  var current_block_type_index;
  var if_block;
  var current;
  var if_block_creators = [create_if_block, create_else_block_1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*bundle*/
    ctx[8].gold > 0) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      div = element("div");
      h5 = element("h5");
      t0 = text(t0_value);
      t1 = space();
      if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h5 = claim_element(div_nodes, "H5", {
        class: true
      });
      var h5_nodes = children(h5);
      t0 = claim_text(h5_nodes, t0_value);
      h5_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h5, "class", "mdc-typography--headline6 svelte-o09d7q");
      add_location(h5, file, 802, 10, 24028);
      attr_dev(div, "class", "bundle mdc-card mdc-card--outlined svelte-o09d7q");
      add_location(div, file, 801, 8, 23969);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h5);
      append_dev(h5, t0);
      append_dev(div, t1);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*$sections*/
      1) && t0_value !== (t0_value =
      /*bundle*/
      ctx[8].name + "")) set_data_dev(t0, t0_value);
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
        }

        transition_in(if_block, 1);
        if_block.m(div, null);
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
      if (detaching) detach_dev(div);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(801:6) {#each bundles as bundle}",
    ctx: ctx
  });
  return block;
} // (798:2) {#each Object.entries($sections) as [name, bundles]}


function create_each_block(ctx) {
  var h1;
  var t0_value =
  /*name*/
  ctx[4] + "";
  var t0;
  var t1;
  var div;
  var t2;
  var current;
  var each_value_1 =
  /*bundles*/
  ctx[5];
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
      h1 = element("h1");
      t0 = text(t0_value);
      t1 = space();
      div = element("div");

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }

      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, t0_value);
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].l(div_nodes);
      }

      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-o09d7q");
      add_location(h1, file, 798, 4, 23887);
      attr_dev(div, "class", "section svelte-o09d7q");
      add_location(div, file, 799, 4, 23907);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h1, anchor);
      append_dev(h1, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, div, anchor);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].m(div, null);
      }

      append_dev(div, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*$sections*/
      1) && t0_value !== (t0_value =
      /*name*/
      ctx[4] + "")) set_data_dev(t0, t0_value);

      if (dirty &
      /*$save, Object, $sections, Array*/
      3) {
        each_value_1 =
        /*bundles*/
        ctx[5];
        validate_each_argument(each_value_1);

        var _i16;

        for (_i16 = 0; _i16 < each_value_1.length; _i16 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i16);

          if (each_blocks[_i16]) {
            each_blocks[_i16].p(child_ctx, dirty);

            transition_in(each_blocks[_i16], 1);
          } else {
            each_blocks[_i16] = create_each_block_1(child_ctx);

            each_blocks[_i16].c();

            transition_in(each_blocks[_i16], 1);

            each_blocks[_i16].m(div, t2);
          }
        }

        group_outros();

        for (_i16 = each_value_1.length; _i16 < each_blocks.length; _i16 += 1) {
          out(_i16);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i17 = 0; _i17 < each_value_1.length; _i17 += 1) {
        transition_in(each_blocks[_i17]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        transition_out(each_blocks[_i18]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(798:2) {#each Object.entries($sections) as [name, bundles]}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t;
  var div;
  var current;
  var each_value = Object.entries(
  /*$sections*/
  ctx[0]);
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
      t = space();
      div = element("div");

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-kcgu6a\"]", document.head);
      head_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i20 = 0; _i20 < each_blocks.length; _i20 += 1) {
        each_blocks[_i20].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Bundles | Stardew Completionist";
      attr_dev(div, "class", "container svelte-o09d7q");
      add_location(div, file, 796, 0, 23804);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
      insert_dev(target, div, anchor);

      for (var _i21 = 0; _i21 < each_blocks.length; _i21 += 1) {
        each_blocks[_i21].m(div, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*Object, $sections, $save, Array*/
      3) {
        each_value = Object.entries(
        /*$sections*/
        ctx[0]);
        validate_each_argument(each_value);

        var _i22;

        for (_i22 = 0; _i22 < each_value.length; _i22 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i22);

          if (each_blocks[_i22]) {
            each_blocks[_i22].p(child_ctx, dirty);

            transition_in(each_blocks[_i22], 1);
          } else {
            each_blocks[_i22] = create_each_block(child_ctx);

            each_blocks[_i22].c();

            transition_in(each_blocks[_i22], 1);

            each_blocks[_i22].m(div, null);
          }
        }

        group_outros();

        for (_i22 = each_value.length; _i22 < each_blocks.length; _i22 += 1) {
          out(_i22);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i23 = 0; _i23 < each_value.length; _i23 += 1) {
        transition_in(each_blocks[_i23]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i24 = 0; _i24 < each_blocks.length; _i24 += 1) {
        transition_out(each_blocks[_i24]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
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

function preload() {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var gameInfo$1;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return gameInfo.fetch(this.fetch);

          case 2:
            gameInfo$1 = _context.sent;
            return _context.abrupt("return", {
              gameInfo: gameInfo$1
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

var func = function func(e) {
  return e;
};

var func_1 = function func_1(item) {
  return item.completed;
};

var func_2 = function func_2(item) {
  return !item.completed;
};

function instance($$self, $$props, $$invalidate) {
  var $sections;
  var $save;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(1, $save = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Bundles", slots, []);
  var gameInfo$1 = $$props.gameInfo;
  var sections = derived(save, function ($save) {
    return gameInfo$1.bundles.reduce(function (acc, bundle) {
      var _a;

      return Object.assign(Object.assign({}, acc), _defineProperty({}, bundle.section, [].concat(_toConsumableArray((_a = acc[bundle.section]) !== null && _a !== void 0 ? _a : []), [Object.assign(Object.assign({}, bundle), {
        items: bundle.items.filter(function (item) {
          return item.id in gameInfo$1.items;
        }).map(function (item, i) {
          var _a;

          return Object.assign(Object.assign(Object.assign({}, item), gameInfo$1.items[item.id]), {
            completed: $save !== null && $save.bundleCompletion.has(bundle.id) && ((_a = $save.bundleCompletion.get(bundle.id)) === null || _a === void 0 ? void 0 : _a[i])
          });
        }),
        completedItems: bundle.items.filter(function (_ref3, i) {
          var id = _ref3.id;

          var _a, _b;

          return ((_b = (_a = $save === null || $save === void 0 ? void 0 : $save.bundleCompletion.get(bundle.id)) === null || _a === void 0 ? void 0 : _a[i]) !== null && _b !== void 0 ? _b : true) && gameInfo$1.items[id];
        }).map(function (_ref4) {
          var id = _ref4.id;
          return gameInfo$1.items[id];
        })
      })])));
    }, {});
  });
  validate_store(sections, "sections");
  component_subscribe($$self, sections, function (value) {
    return $$invalidate(0, $sections = value);
  });
  var writable_props = ["gameInfo"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Bundles> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(3, gameInfo$1 = $$props.gameInfo);
  };

  $$self.$capture_state = function () {
    return {
      _gameInfo: gameInfo,
      derived: derived,
      save: save,
      preload: preload,
      ItemButton: ItemButton,
      gameInfo: gameInfo$1,
      sections: sections,
      $sections: $sections,
      $save: $save
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(3, gameInfo$1 = $$props.gameInfo);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [$sections, $save, sections, gameInfo$1];
}

var Bundles = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Bundles, _SvelteComponentDev);

  var _super = _createSuper(Bundles);

  function Bundles(options) {
    var _this;

    _classCallCheck(this, Bundles);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      gameInfo: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Bundles",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*gameInfo*/
    ctx[3] === undefined && !("gameInfo" in props)) {
      console.warn("<Bundles> was created without expected prop 'gameInfo'");
    }

    return _this;
  }

  _createClass(Bundles, [{
    key: "gameInfo",
    get: function get() {
      throw new Error("<Bundles>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Bundles>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Bundles;
}(SvelteComponentDev);

export default Bundles;
export { preload };
