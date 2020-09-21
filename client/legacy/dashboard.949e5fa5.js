import { r as regenerator, g as gameInfo, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, h as _createClass, S as SvelteComponentDev, j as validate_store, k as component_subscribe, l as derived, v as validate_slots, m as globals, ar as seasonNames, M as validate_each_argument, p as element, q as create_component, o as space, t as text, y as claim_element, z as children, B as claim_component, x as claim_space, A as claim_text, w as detach_dev, C as attr_dev, D as add_location, E as insert_dev, G as mount_component, F as append_dev, T as set_data_dev, I as transition_in, O as group_outros, J as transition_out, P as check_outros, K as destroy_component, Q as destroy_each, N as empty, u as query_selector_all, H as _slicedToArray, L as save, R as _toConsumableArray } from './client.b16d389e.js';
import { _ as _defineProperty } from './defineProperty.b786bad4.js';
import { D as DataTable, H as Head, B as Body, C as Cell, R as Row } from './Cell.77d7a059.js';
import { I as ItemButton } from './ItemButton.fb6b8f7c.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;
var file = "src/routes/dashboard.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  return child_ctx;
} // (432:0) {#if $save !== null}


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
  var each_value =
  /*$seasonalItems*/
  ctx[2];
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
      attr_dev(h2, "class", "svelte-1b8qjfv");
      add_location(h2, file, 468, 6, 12229);
      attr_dev(div0, "class", "seasonal-items svelte-1b8qjfv");
      add_location(div0, file, 469, 6, 12283);
      attr_dev(div1, "class", "mdc-card mdc-card--outlined seasonal svelte-1b8qjfv");
      add_location(div1, file, 467, 4, 12172);
      attr_dev(div2, "class", "container svelte-1b8qjfv");
      add_location(div2, file, 432, 2, 11149);
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
      131074) {
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
      /*$seasonalItems*/
      4) {
        each_value =
        /*$seasonalItems*/
        ctx[2];
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
    source: "(432:0) {#if $save !== null}",
    ctx: ctx
  });
  return block;
} // (437:10) <Cell>


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
    source: "(437:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (438:10) <Cell>


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
    source: "(438:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (439:10) <Cell>


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
    source: "(439:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (440:10) <Cell>


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
    source: "(440:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (436:8) <Row>


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
      131072) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope*/
      131072) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
      var cell2_changes = {};

      if (dirty &
      /*$$scope*/
      131072) {
        cell2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell2.$set(cell2_changes);
      var cell3_changes = {};

      if (dirty &
      /*$$scope*/
      131072) {
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
    source: "(436:8) <Row>",
    ctx: ctx
  });
  return block;
} // (435:6) <Head>


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
      131072) {
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
    source: "(435:6) <Head>",
    ctx: ctx
  });
  return block;
} // (446:12) <Cell>


function create_default_slot_6(ctx) {
  var t_value =
  /*birthday*/
  ctx[9].villager + "";
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
      ctx[9].villager + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(446:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (449:16) {#each [...Array(birthday.maxHearts).keys()] as i}


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
      ctx[9].hearts >=
      /*i*/
      ctx[14] + 1 ? "filled" : "outline") + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "class", "svelte-1b8qjfv");
      add_location(img, file, 449, 18, 11625);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$birthdays*/
      2 && img.src !== (img_src_value = "heart-" + (
      /*birthday*/
      ctx[9].hearts >=
      /*i*/
      ctx[14] + 1 ? "filled" : "outline") + ".png")) {
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
    source: "(449:16) {#each [...Array(birthday.maxHearts).keys()] as i}",
    ctx: ctx
  });
  return block;
} // (447:12) <Cell>


function create_default_slot_5(ctx) {
  var div;

  var each_value_3 = _toConsumableArray(Array(
  /*birthday*/
  ctx[9].maxHearts).keys());

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
      attr_dev(div, "class", "hearts svelte-1b8qjfv");
      add_location(div, file, 447, 14, 11519);
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
        ctx[9].maxHearts).keys());
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
    source: "(447:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (456:12) <Cell>


function create_default_slot_4(ctx) {
  var t_value =
  /*birthday*/
  ctx[9].date + "";
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
      ctx[9].date + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(456:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (459:16) {#each birthday.bestGifts as item}


function create_each_block_2(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[6],
      scale:
      /*item*/
      ctx[6].isCraftable ? 1 : 2
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
      ctx[6];
      if (dirty &
      /*$birthdays*/
      2) itembutton_changes.scale =
      /*item*/
      ctx[6].isCraftable ? 1 : 2;
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
    source: "(459:16) {#each birthday.bestGifts as item}",
    ctx: ctx
  });
  return block;
} // (457:12) <Cell>


function create_default_slot_3(ctx) {
  var div;
  var current;
  var each_value_2 =
  /*birthday*/
  ctx[9].bestGifts;
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
      attr_dev(div, "class", "best-gifts svelte-1b8qjfv");
      add_location(div, file, 457, 14, 11890);
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
        ctx[9].bestGifts;
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
    source: "(457:12) <Cell>",
    ctx: ctx
  });
  return block;
} // (445:10) <Row>


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
      131074) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);
      var cell1_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      131074) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
      var cell2_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      131074) {
        cell2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell2.$set(cell2_changes);
      var cell3_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      131074) {
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
    source: "(445:10) <Row>",
    ctx: ctx
  });
  return block;
} // (444:8) {#each $birthdays as birthday}


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
      131074) {
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
    source: "(444:8) {#each $birthdays as birthday}",
    ctx: ctx
  });
  return block;
} // (443:6) <Body>


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
    source: "(443:6) <Body>",
    ctx: ctx
  });
  return block;
} // (434:4) <DataTable>


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
      131072) {
        head_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      head.$set(head_changes);
      var body_changes = {};

      if (dirty &
      /*$$scope, $birthdays*/
      131074) {
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
    source: "(434:4) <DataTable>",
    ctx: ctx
  });
  return block;
} // (471:8) {#each $seasonalItems as item}


function create_each_block(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[6],
      scale:
      /*item*/
      ctx[6].isCraftable ? 2 : 3
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
      4) itembutton_changes.item =
      /*item*/
      ctx[6];
      if (dirty &
      /*$seasonalItems*/
      4) itembutton_changes.scale =
      /*item*/
      ctx[6].isCraftable ? 2 : 3;
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
    source: "(471:8) {#each $seasonalItems as item}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var h1;
  var t1;
  var t2;
  var if_block_anchor;
  var current;
  var if_block =
  /*$save*/
  ctx[0] !== null && create_if_block(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text("Dashboard");
      t2 = space();
      if (if_block) if_block.c();
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
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      document.title = "Dashboard | Stardew Completionist";
      attr_dev(h1, "class", "title svelte-1b8qjfv");
      add_location(h1, file, 430, 0, 11093);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*$save*/
      ctx[0] !== null) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*$save*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (if_block) if_block.d(detaching);
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

function preload() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return gameInfo.fetch(this.fetch);

          case 2:
            _context.t0 = _context.sent;
            return _context.abrupt("return", {
              gameInfo: _context.t0
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

function instance($$self, $$props, $$invalidate) {
  var $save;
  var $birthdays;
  var $seasonalItems;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(0, $save = $$value);
  });
  var gameInfo = $$props.gameInfo;
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
  var seasonalItems = derived(save, function ($save, set) {
    if ($save !== null) {
      set([].concat(_toConsumableArray(gameInfo.shipping), _toConsumableArray(gameInfo.fish)).filter(function (item) {
        return typeof item.seasons !== "undefined" && item.seasons.includes(["spring", "summer", "fall", "winter"][$save.currentSeason]) && !$save.collectedItems.includes(item.id) && Object.values(item.seasons).filter(function (value) {
          return value;
        }).length < 3;
      }));
    }
  });
  validate_store(seasonalItems, "seasonalItems");
  component_subscribe($$self, seasonalItems, function (value) {
    return $$invalidate(2, $seasonalItems = value);
  });
  var writable_props = ["gameInfo"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Dashboard> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Dashboard", $$slots, []);

  $$self.$$set = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(5, gameInfo = $$props.gameInfo);
  };

  $$self.$capture_state = function () {
    var _ref3;

    return _ref3 = {
      __awaiter: __awaiter,
      gameInfo: gameInfo,
      preload: preload,
      DataTable: DataTable,
      Body: Body,
      Cell: Cell,
      Head: Head,
      Row: Row,
      derived: derived,
      ItemButton: ItemButton,
      seasonNames: seasonNames,
      save: save
    }, _defineProperty(_ref3, "gameInfo", gameInfo), _defineProperty(_ref3, "birthdays", birthdays), _defineProperty(_ref3, "seasonalItems", seasonalItems), _defineProperty(_ref3, "$save", $save), _defineProperty(_ref3, "$birthdays", $birthdays), _defineProperty(_ref3, "$seasonalItems", $seasonalItems), _ref3;
  };

  $$self.$inject_state = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(5, gameInfo = $$props.gameInfo);
    if ("birthdays" in $$props) $$invalidate(3, birthdays = $$props.birthdays);
    if ("seasonalItems" in $$props) $$invalidate(4, seasonalItems = $$props.seasonalItems);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [$save, $birthdays, $seasonalItems, birthdays, seasonalItems, gameInfo];
}

var Dashboard = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Dashboard, _SvelteComponentDev);

  var _super = _createSuper(Dashboard);

  function Dashboard(options) {
    var _this;

    _classCallCheck(this, Dashboard);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      gameInfo: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Dashboard",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*gameInfo*/
    ctx[5] === undefined && !("gameInfo" in props)) {
      console.warn("<Dashboard> was created without expected prop 'gameInfo'");
    }

    return _this;
  }

  _createClass(Dashboard, [{
    key: "gameInfo",
    get: function get() {
      throw new Error("<Dashboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dashboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Dashboard;
}(SvelteComponentDev);

export default Dashboard;
export { preload };
