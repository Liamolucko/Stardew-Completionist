import { f as _asyncToGenerator, r as regenerator, g as gameInfo, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, h as _createClass, S as SvelteComponentDev, s as safe_not_equal, j as space, k as element, t as text, l as create_component, q as query_selector_all, m as detach_dev, o as claim_space, p as claim_element, u as children, w as claim_text, x as claim_component, y as attr_dev, z as add_location, A as insert_dev, B as append_dev, C as mount_component, D as _slicedToArray, E as transition_in, F as transition_out, G as destroy_component, H as validate_store, I as component_subscribe, v as validate_slots, J as derived, K as globals, L as validate_each_argument, M as save, N as empty, O as group_outros, P as check_outros, Q as destroy_each, R as _toConsumableArray, T as set_data_dev } from './client.0bff87ee.js';
import { _ as _defineProperty } from './defineProperty.b786bad4.js';
import { D as DataTable, H as Head, B as Body, R as Row, C as Cell } from './Cell.512b4509.js';
import { I as ItemButton } from './ItemButton.7b5b6a7e.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;
var file = "src/routes/friendship.svelte";

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
} // (70:6) <Cell>


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
    source: "(70:6) <Cell>",
    ctx: ctx
  });
  return block;
} // (71:6) {#if $save !== null}


function create_if_block_1(ctx) {
  var cell;
  var current;
  cell = new Cell({
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
  var block = {
    c: function create() {
      create_component(cell.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(cell.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell, target, anchor);
      current = true;
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(71:6) {#if $save !== null}",
    ctx: ctx
  });
  return block;
} // (72:8) <Cell>


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
    source: "(72:8) <Cell>",
    ctx: ctx
  });
  return block;
} // (74:6) <Cell>


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
    source: "(74:6) <Cell>",
    ctx: ctx
  });
  return block;
} // (75:6) <Cell>


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
    source: "(75:6) <Cell>",
    ctx: ctx
  });
  return block;
} // (69:4) <Row>


function create_default_slot_8(ctx) {
  var cell0;
  var t0;
  var t1;
  var cell1;
  var t2;
  var cell2;
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
  var if_block =
  /*$save*/
  ctx[0] !== null && create_if_block_1(ctx);
  cell1 = new Cell({
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
  cell2 = new Cell({
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
      if (if_block) if_block.c();
      t1 = space();
      create_component(cell1.$$.fragment);
      t2 = space();
      create_component(cell2.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      t1 = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(cell2.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_dev(target, t0, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(cell1, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(cell2, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell0_changes = {};

      if (dirty &
      /*$$scope*/
      8192) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);

      if (
      /*$save*/
      ctx[0] !== null) {
        if (if_block) {
          if (dirty &
          /*$save*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t1.parentNode, t1);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      var cell1_changes = {};

      if (dirty &
      /*$$scope*/
      8192) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
      var cell2_changes = {};

      if (dirty &
      /*$$scope*/
      8192) {
        cell2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell2.$set(cell2_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell0.$$.fragment, local);
      transition_in(if_block);
      transition_in(cell1.$$.fragment, local);
      transition_in(cell2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(if_block);
      transition_out(cell1.$$.fragment, local);
      transition_out(cell2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell0, detaching);
      if (detaching) detach_dev(t0);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(t1);
      destroy_component(cell1, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(cell2, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_8.name,
    type: "slot",
    source: "(69:4) <Row>",
    ctx: ctx
  });
  return block;
} // (68:2) <Head>


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
      /*$$scope, $save*/
      8193) {
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
    source: "(68:2) <Head>",
    ctx: ctx
  });
  return block;
} // (81:8) <Cell>


function create_default_slot_6(ctx) {
  var t_value =
  /*villager*/
  ctx[4].name + "";
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
      /*$villagers*/
      2 && t_value !== (t_value =
      /*villager*/
      ctx[4].name + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(81:8) <Cell>",
    ctx: ctx
  });
  return block;
} // (82:8) {#if $save !== null}


function create_if_block(ctx) {
  var cell;
  var current;
  cell = new Cell({
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
  var block = {
    c: function create() {
      create_component(cell.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(cell.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell_changes = {};

      if (dirty &
      /*$$scope, $villagers*/
      8194) {
        cell_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell.$set(cell_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(82:8) {#if $save !== null}",
    ctx: ctx
  });
  return block;
} // (85:14) {#each [...Array(villager.maxHearts).keys()] as i}


function create_each_block_2(ctx) {
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
      /*villager*/
      ctx[4].hearts >=
      /*i*/
      ctx[10] + 1 ? "filled" : "outline") + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "class", "svelte-10raf2y");
      add_location(img, file, 85, 16, 2306);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$villagers*/
      2 && img.src !== (img_src_value = "heart-" + (
      /*villager*/
      ctx[4].hearts >=
      /*i*/
      ctx[10] + 1 ? "filled" : "outline") + ".png")) {
        attr_dev(img, "src", img_src_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(img);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(85:14) {#each [...Array(villager.maxHearts).keys()] as i}",
    ctx: ctx
  });
  return block;
} // (83:10) <Cell>


function create_default_slot_5(ctx) {
  var div;

  var each_value_2 = _toConsumableArray(Array(
  /*villager*/
  ctx[4].maxHearts).keys());

  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "hearts svelte-10raf2y");
      add_location(div, file, 83, 12, 2204);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$villagers, Array*/
      2) {
        each_value_2 = _toConsumableArray(Array(
        /*villager*/
        ctx[4].maxHearts).keys());
        validate_each_argument(each_value_2);

        var _i4;

        for (_i4 = 0; _i4 < each_value_2.length; _i4 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_2(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_2.length;
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
    source: "(83:10) <Cell>",
    ctx: ctx
  });
  return block;
} // (93:8) <Cell>


function create_default_slot_4(ctx) {
  var t_value =
  /*villager*/
  ctx[4].birthday + "";
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
      /*$villagers*/
      2 && t_value !== (t_value =
      /*villager*/
      ctx[4].birthday + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(93:8) <Cell>",
    ctx: ctx
  });
  return block;
} // (96:12) {#each villager.bestGifts as item}


function create_each_block_1(ctx) {
  var itembutton;
  var current;
  itembutton = new ItemButton({
    props: {
      item:
      /*item*/
      ctx[7],
      scale:
      /*item*/
      ctx[7].isCraftable ? 1 : 2
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
      /*$villagers*/
      2) itembutton_changes.item =
      /*item*/
      ctx[7];
      if (dirty &
      /*$villagers*/
      2) itembutton_changes.scale =
      /*item*/
      ctx[7].isCraftable ? 1 : 2;
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
    id: create_each_block_1.name,
    type: "each",
    source: "(96:12) {#each villager.bestGifts as item}",
    ctx: ctx
  });
  return block;
} // (94:8) <Cell>


function create_default_slot_3(ctx) {
  var div;
  var current;
  var each_value_1 =
  /*villager*/
  ctx[4].bestGifts;
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
      div = element("div");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "best-gifts svelte-10raf2y");
      add_location(div, file, 94, 10, 2567);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$villagers*/
      2) {
        each_value_1 =
        /*villager*/
        ctx[4].bestGifts;
        validate_each_argument(each_value_1);

        var _i8;

        for (_i8 = 0; _i8 < each_value_1.length; _i8 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);

            transition_in(each_blocks[_i8], 1);
          } else {
            each_blocks[_i8] = create_each_block_1(child_ctx);

            each_blocks[_i8].c();

            transition_in(each_blocks[_i8], 1);

            each_blocks[_i8].m(div, null);
          }
        }

        group_outros();

        for (_i8 = each_value_1.length; _i8 < each_blocks.length; _i8 += 1) {
          out(_i8);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i9 = 0; _i9 < each_value_1.length; _i9 += 1) {
        transition_in(each_blocks[_i9]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        transition_out(each_blocks[_i10]);
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
    source: "(94:8) <Cell>",
    ctx: ctx
  });
  return block;
} // (80:6) <Row>


function create_default_slot_2(ctx) {
  var cell0;
  var t0;
  var t1;
  var cell1;
  var t2;
  var cell2;
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
  var if_block =
  /*$save*/
  ctx[0] !== null && create_if_block(ctx);
  cell1 = new Cell({
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
  cell2 = new Cell({
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
      if (if_block) if_block.c();
      t1 = space();
      create_component(cell1.$$.fragment);
      t2 = space();
      create_component(cell2.$$.fragment);
      t3 = space();
    },
    l: function claim(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      t1 = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(cell2.$$.fragment, nodes);
      t3 = claim_space(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_dev(target, t0, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, t1, anchor);
      mount_component(cell1, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(cell2, target, anchor);
      insert_dev(target, t3, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var cell0_changes = {};

      if (dirty &
      /*$$scope, $villagers*/
      8194) {
        cell0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell0.$set(cell0_changes);

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
          if_block.m(t1.parentNode, t1);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      var cell1_changes = {};

      if (dirty &
      /*$$scope, $villagers*/
      8194) {
        cell1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell1.$set(cell1_changes);
      var cell2_changes = {};

      if (dirty &
      /*$$scope, $villagers*/
      8194) {
        cell2_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      cell2.$set(cell2_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(cell0.$$.fragment, local);
      transition_in(if_block);
      transition_in(cell1.$$.fragment, local);
      transition_in(cell2.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(if_block);
      transition_out(cell1.$$.fragment, local);
      transition_out(cell2.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(cell0, detaching);
      if (detaching) detach_dev(t0);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(t1);
      destroy_component(cell1, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(cell2, detaching);
      if (detaching) detach_dev(t3);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(80:6) <Row>",
    ctx: ctx
  });
  return block;
} // (79:4) {#each $villagers.filter((villager) => typeof villager.hearts === 'undefined' || villager.hearts < villager.maxHearts) as villager}


function create_each_block(ctx) {
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
      /*$$scope, $villagers, $save*/
      8195) {
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
    id: create_each_block.name,
    type: "each",
    source: "(79:4) {#each $villagers.filter((villager) => typeof villager.hearts === 'undefined' || villager.hearts < villager.maxHearts) as villager}",
    ctx: ctx
  });
  return block;
} // (78:2) <Body>


function create_default_slot_1(ctx) {
  var each_1_anchor;
  var current;
  var each_value =
  /*$villagers*/
  ctx[1].filter(func);
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
      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        each_blocks[_i12].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$villagers, Array, $save*/
      3) {
        each_value =
        /*$villagers*/
        ctx[1].filter(func);
        validate_each_argument(each_value);

        var _i14;

        for (_i14 = 0; _i14 < each_value.length; _i14 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i14);

          if (each_blocks[_i14]) {
            each_blocks[_i14].p(child_ctx, dirty);

            transition_in(each_blocks[_i14], 1);
          } else {
            each_blocks[_i14] = create_each_block(child_ctx);

            each_blocks[_i14].c();

            transition_in(each_blocks[_i14], 1);

            each_blocks[_i14].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i14 = each_value.length; _i14 < each_blocks.length; _i14 += 1) {
          out(_i14);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i15 = 0; _i15 < each_value.length; _i15 += 1) {
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
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(78:2) <Body>",
    ctx: ctx
  });
  return block;
} // (67:0) <DataTable class="friendship-table">


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
      /*$$scope, $save*/
      8193) {
        head_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      head.$set(head_changes);
      var body_changes = {};

      if (dirty &
      /*$$scope, $villagers, $save*/
      8195) {
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
    source: "(67:0) <DataTable class=\\\"friendship-table\\\">",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var h1;
  var t1;
  var t2;
  var datatable;
  var current;
  datatable = new DataTable({
    props: {
      class: "friendship-table",
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text("Friendship");
      t2 = space();
      create_component(datatable.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-17bgxrt\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Friendship");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      claim_component(datatable.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      document.title = "Friendship | Stardew Completionist";
      attr_dev(h1, "class", "svelte-10raf2y");
      add_location(h1, file, 65, 0, 1702);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      mount_component(datatable, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var datatable_changes = {};

      if (dirty &
      /*$$scope, $villagers, $save*/
      8195) {
        datatable_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      datatable.$set(datatable_changes);
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
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      destroy_component(datatable, detaching);
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
  return _preload.apply(this, arguments);
}

var func = function func(villager) {
  return typeof villager.hearts === "undefined" || villager.hearts < villager.maxHearts;
};

function instance($$self, $$props, $$invalidate) {
  var $save;
  var $villagers;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(0, $save = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Friendship", slots, []);
  var gameInfo = $$props.gameInfo;
  var villagers = derived(save, function ($save) {
    return Object.values(gameInfo.villagers).map(function (villager) {
      return Object.assign(Object.assign(Object.assign({}, villager), {
        // These will be overriden by relationship, but will serve as backup if they haven't yet been met
        hearts: 0,
        maxHearts: villager.datable ? 8 : 10,
        giftsThisWeek: 0
      }), $save === null || $save === void 0 ? void 0 : $save.relationships.get(villager.name));
    }).sort(function (a, b) {
      return a.hearts - b.hearts;
    });
  });
  validate_store(villagers, "villagers");
  component_subscribe($$self, villagers, function (value) {
    return $$invalidate(1, $villagers = value);
  });
  var writable_props = ["gameInfo"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Friendship> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(3, gameInfo = $$props.gameInfo);
  };

  $$self.$capture_state = function () {
    var _ref3;

    return _ref3 = {
      gameInfo: gameInfo,
      preload: preload,
      DataTable: DataTable,
      Body: Body,
      Cell: Cell,
      Head: Head,
      Row: Row,
      derived: derived,
      ItemButton: ItemButton,
      save: save
    }, _defineProperty(_ref3, "gameInfo", gameInfo), _defineProperty(_ref3, "villagers", villagers), _defineProperty(_ref3, "$save", $save), _defineProperty(_ref3, "$villagers", $villagers), _ref3;
  };

  $$self.$inject_state = function ($$props) {
    if ("gameInfo" in $$props) $$invalidate(3, gameInfo = $$props.gameInfo);
    if ("villagers" in $$props) $$invalidate(2, villagers = $$props.villagers);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [$save, $villagers, villagers, gameInfo];
}

var Friendship = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Friendship, _SvelteComponentDev);

  var _super = _createSuper(Friendship);

  function Friendship(options) {
    var _this;

    _classCallCheck(this, Friendship);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      gameInfo: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Friendship",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*gameInfo*/
    ctx[3] === undefined && !("gameInfo" in props)) {
      console.warn("<Friendship> was created without expected prop 'gameInfo'");
    }

    return _this;
  }

  _createClass(Friendship, [{
    key: "gameInfo",
    get: function get() {
      throw new Error("<Friendship>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Friendship>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Friendship;
}(SvelteComponentDev);

export default Friendship;
export { preload };
