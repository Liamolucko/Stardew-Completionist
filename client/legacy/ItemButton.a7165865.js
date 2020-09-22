import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, h as _createClass, S as SvelteComponentDev, v as validate_slots, aa as getContext, ao as qualityNames, L as validate_each_argument, k as element, p as claim_element, u as children, m as detach_dev, y as attr_dev, z as add_location, A as insert_dev, Q as destroy_each, j as space, o as claim_space, ap as toggle_class, aq as set_style, B as append_dev, ai as listen_dev, D as _slicedToArray, n as noop } from './client.9bec2125.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/components/ItemButton.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  return child_ctx;
} // (87:2) {#if quantity > 1}


function create_if_block(ctx) {
  var div;
  var each_value =
  /*quantity*/
  ctx[5].toString();
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
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
      attr_dev(div, "class", "quantity svelte-9u963z");
      add_location(div, file, 87, 4, 2138);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*quantity*/
      32) {
        each_value =
        /*quantity*/
        ctx[5].toString();
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(87:2) {#if quantity > 1}",
    ctx: ctx
  });
  return block;
} // (89:6) {#each quantity.toString() as char}


function create_each_block(ctx) {
  var img;
  var img_src_value;
  var img_alt_value;
  var block = {
    c: function create() {
      img = element("img");
      this.h();
    },
    l: function claim(nodes) {
      img = claim_element(nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "numbers/" +
      /*char*/
      ctx[9] + ".png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*char*/
      ctx[9]);
      attr_dev(img, "class", "svelte-9u963z");
      add_location(img, file, 89, 8, 2211);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*quantity*/
      32 && img.src !== (img_src_value = "numbers/" +
      /*char*/
      ctx[9] + ".png")) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*quantity*/
      32 && img_alt_value !== (img_alt_value =
      /*char*/
      ctx[9])) {
        attr_dev(img, "alt", img_alt_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(img);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(89:6) {#each quantity.toString() as char}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var button;
  var img0;
  var img0_src_value;
  var img0_alt_value;
  var img0_width_value;
  var t0;
  var img1;
  var img1_src_value;
  var img1_alt_value;
  var t1;
  var mounted;
  var dispose;
  var if_block =
  /*quantity*/
  ctx[5] > 1 && create_if_block(ctx);
  var block = {
    c: function create() {
      button = element("button");
      img0 = element("img");
      t0 = space();
      img1 = element("img");
      t1 = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        style: true,
        width: true,
        height: true,
        class: true
      });
      var button_nodes = children(button);
      img0 = claim_element(button_nodes, "IMG", {
        class: true,
        src: true,
        alt: true,
        width: true,
        height: true
      });
      t0 = claim_space(button_nodes);
      img1 = claim_element(button_nodes, "IMG", {
        class: true,
        src: true,
        alt: true
      });
      t1 = claim_space(button_nodes);
      if (if_block) if_block.l(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img0, "class", "sprite svelte-9u963z");
      if (img0.src !== (img0_src_value = "data:image/png;base64," +
      /*item*/
      ctx[0].sprite)) attr_dev(img0, "src", img0_src_value);
      attr_dev(img0, "alt", img0_alt_value =
      /*item*/
      ctx[0].name);
      attr_dev(img0, "width", img0_width_value = 16 *
      /*scale*/
      ctx[1]);
      attr_dev(img0, "height",
      /*size*/
      ctx[6]);
      toggle_class(img0, "grey",
      /*grey*/
      ctx[3]);
      toggle_class(img0, "shadow",
      /*shadow*/
      ctx[2]);
      add_location(img0, file, 74, 2, 1839);
      attr_dev(img1, "class", "quality svelte-9u963z");
      if (img1.src !== (img1_src_value = "quality-" +
      /*quality*/
      ctx[4] + ".png")) attr_dev(img1, "src", img1_src_value);
      attr_dev(img1, "alt", img1_alt_value = "" + (qualityNames.get(
      /*quality*/
      ctx[4]) + " quality"));
      add_location(img1, file, 82, 2, 2007);
      set_style(button, "--scale",
      /*scale*/
      ctx[1]);
      attr_dev(button, "width",
      /*size*/
      ctx[6]);
      attr_dev(button, "height",
      /*size*/
      ctx[6]);
      attr_dev(button, "class", "svelte-9u963z");
      add_location(button, file, 67, 0, 1722);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);
      append_dev(button, img0);
      append_dev(button, t0);
      append_dev(button, img1);
      append_dev(button, t1);
      if (if_block) if_block.m(button, null);

      if (!mounted) {
        dispose = listen_dev(button, "click",
        /*click_handler*/
        ctx[8], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*item*/
      1 && img0.src !== (img0_src_value = "data:image/png;base64," +
      /*item*/
      ctx[0].sprite)) {
        attr_dev(img0, "src", img0_src_value);
      }

      if (dirty &
      /*item*/
      1 && img0_alt_value !== (img0_alt_value =
      /*item*/
      ctx[0].name)) {
        attr_dev(img0, "alt", img0_alt_value);
      }

      if (dirty &
      /*scale*/
      2 && img0_width_value !== (img0_width_value = 16 *
      /*scale*/
      ctx[1])) {
        attr_dev(img0, "width", img0_width_value);
      }

      if (dirty &
      /*size*/
      64) {
        attr_dev(img0, "height",
        /*size*/
        ctx[6]);
      }

      if (dirty &
      /*grey*/
      8) {
        toggle_class(img0, "grey",
        /*grey*/
        ctx[3]);
      }

      if (dirty &
      /*shadow*/
      4) {
        toggle_class(img0, "shadow",
        /*shadow*/
        ctx[2]);
      }

      if (dirty &
      /*quality*/
      16 && img1.src !== (img1_src_value = "quality-" +
      /*quality*/
      ctx[4] + ".png")) {
        attr_dev(img1, "src", img1_src_value);
      }

      if (dirty &
      /*quality*/
      16 && img1_alt_value !== (img1_alt_value = "" + (qualityNames.get(
      /*quality*/
      ctx[4]) + " quality"))) {
        attr_dev(img1, "alt", img1_alt_value);
      }

      if (
      /*quantity*/
      ctx[5] > 1) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(button, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*scale*/
      2) {
        set_style(button, "--scale",
        /*scale*/
        ctx[1]);
      }

      if (dirty &
      /*size*/
      64) {
        attr_dev(button, "width",
        /*size*/
        ctx[6]);
      }

      if (dirty &
      /*size*/
      64) {
        attr_dev(button, "height",
        /*size*/
        ctx[6]);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(button);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
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
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ItemButton", slots, []);
  var item = $$props.item;
  var _$$props$scale = $$props.scale,
      scale = _$$props$scale === void 0 ? 2 : _$$props$scale;
  var _$$props$shadow = $$props.shadow,
      shadow = _$$props$shadow === void 0 ? false : _$$props$shadow;
  var _$$props$grey = $$props.grey,
      grey = _$$props$grey === void 0 ? false : _$$props$grey;
  var _$$props$quality = $$props.quality,
      quality = _$$props$quality === void 0 ? 0 : _$$props$quality;
  var _$$props$quantity = $$props.quantity,
      quantity = _$$props$quantity === void 0 ? 1 : _$$props$quantity;
  var dialog = getContext("item-info-dialog");
  var writable_props = ["item", "scale", "shadow", "grey", "quality", "quantity"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ItemButton> was created with unknown prop '".concat(key, "'"));
  });

  var click_handler = function click_handler() {
    dialog.open(item);
  };

  $$self.$$set = function ($$props) {
    if ("item" in $$props) $$invalidate(0, item = $$props.item);
    if ("scale" in $$props) $$invalidate(1, scale = $$props.scale);
    if ("shadow" in $$props) $$invalidate(2, shadow = $$props.shadow);
    if ("grey" in $$props) $$invalidate(3, grey = $$props.grey);
    if ("quality" in $$props) $$invalidate(4, quality = $$props.quality);
    if ("quantity" in $$props) $$invalidate(5, quantity = $$props.quantity);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      qualityNames: qualityNames,
      item: item,
      scale: scale,
      shadow: shadow,
      grey: grey,
      quality: quality,
      quantity: quantity,
      dialog: dialog,
      size: size
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("item" in $$props) $$invalidate(0, item = $$props.item);
    if ("scale" in $$props) $$invalidate(1, scale = $$props.scale);
    if ("shadow" in $$props) $$invalidate(2, shadow = $$props.shadow);
    if ("grey" in $$props) $$invalidate(3, grey = $$props.grey);
    if ("quality" in $$props) $$invalidate(4, quality = $$props.quality);
    if ("quantity" in $$props) $$invalidate(5, quantity = $$props.quantity);
    if ("dialog" in $$props) $$invalidate(7, dialog = $$props.dialog);
    if ("size" in $$props) $$invalidate(6, size = $$props.size);
  };

  var size;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*item, scale*/
    3) {
       $$invalidate(6, size = (item.isCraftable ? 32 : 16) * scale);
    }
  };

  return [item, scale, shadow, grey, quality, quantity, size, dialog, click_handler];
}

var ItemButton = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ItemButton, _SvelteComponentDev);

  var _super = _createSuper(ItemButton);

  function ItemButton(options) {
    var _this;

    _classCallCheck(this, ItemButton);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      item: 0,
      scale: 1,
      shadow: 2,
      grey: 3,
      quality: 4,
      quantity: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ItemButton",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*item*/
    ctx[0] === undefined && !("item" in props)) {
      console.warn("<ItemButton> was created without expected prop 'item'");
    }

    return _this;
  }

  _createClass(ItemButton, [{
    key: "item",
    get: function get() {
      throw new Error("<ItemButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "scale",
    get: function get() {
      throw new Error("<ItemButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "shadow",
    get: function get() {
      throw new Error("<ItemButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "grey",
    get: function get() {
      throw new Error("<ItemButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "quality",
    get: function get() {
      throw new Error("<ItemButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "quantity",
    get: function get() {
      throw new Error("<ItemButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ItemButton;
}(SvelteComponentDev);

export { ItemButton as I };
