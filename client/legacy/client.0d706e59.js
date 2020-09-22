function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function noop() {}

function assign(tar, src) {
  // @ts-ignore
  for (var k in src) {
    tar[k] = src[k];
  }

  return tar;
}

function is_promise(value) {
  return value && _typeof(value) === 'object' && typeof value.then === 'function';
}

function add_location(element, file, line, column, char) {
  element.__svelte_meta = {
    loc: {
      file: file,
      line: line,
      column: column,
      char: char
    }
  };
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== 'function') {
    throw new Error("'".concat(name, "' is not a store with a 'subscribe' method"));
  }
}

function subscribe(store) {
  if (store == null) {
    return noop;
  }

  for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callbacks[_key - 1] = arguments[_key];
  }

  var unsub = store.subscribe.apply(store, callbacks);
  return unsub.unsubscribe ? function () {
    return unsub.unsubscribe();
  } : unsub;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    var slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    var lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (_typeof(lets) === 'object') {
      var merged = [];
      var len = Math.max($$scope.dirty.length, lets.length);

      for (var i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  var slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    var slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function exclude_internal_props(props) {
  var result = {};

  for (var k in props) {
    if (k[0] !== '$') result[k] = props[k];
  }

  return result;
}

function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (var i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return function () {
    return node.removeEventListener(event, handler, options);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function set_attributes(node, attributes) {
  // @ts-ignore
  var descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

  for (var key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

function children(element) {
  return Array.from(element.childNodes);
}

function claim_element(nodes, name, attributes, svg) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeName === name) {
      var j = 0;
      var remove = [];

      while (j < node.attributes.length) {
        var attribute = node.attributes[j++];

        if (!attributes[attribute.name]) {
          remove.push(attribute.name);
        }
      }

      for (var k = 0; k < remove.length; k++) {
        node.removeAttribute(remove[k]);
      }

      return nodes.splice(i, 1)[0];
    }
  }

  return svg ? svg_element(name) : element(name);
}

function claim_text(nodes, data) {
  for (var i = 0; i < nodes.length; i += 1) {
    var node = nodes[i];

    if (node.nodeType === 3) {
      node.data = '' + data;
      return nodes.splice(i, 1)[0];
    }
  }

  return text(data);
}

function claim_space(nodes) {
  return claim_text(nodes, ' ');
}

function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? 'important' : '');
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

function query_selector_all(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return Array.from(parent.querySelectorAll(selector));
}

var current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  var component = get_current_component();
  return function (type, detail) {
    var callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      var event = custom_event(type, detail);
      callbacks.slice().forEach(function (fn) {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
} // TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  var callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(function (fn) {
      return fn(event);
    });
  }
}

var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

var flushing = false;
var seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (var i = 0; i < dirty_components.length; i += 1) {
      var component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    set_current_component(null);
    dirty_components.length = 0;

    while (binding_callbacks.length) {
      binding_callbacks.pop()();
    } // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (var _i = 0; _i < render_callbacks.length; _i += 1) {
      var callback = render_callbacks[_i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    var dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

var outroing = new Set();
var outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(function () {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

function handle_promise(promise, info) {
  var token = info.token = {};

  function update(type, index, key, value) {
    if (info.token !== token) return;
    info.resolved = value;
    var child_ctx = info.ctx;

    if (key !== undefined) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }

    var block = type && (info.current = type)(child_ctx);
    var needs_flush = false;

    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach(function (block, i) {
          if (i !== index && block) {
            group_outros();
            transition_out(block, 1, 1, function () {
              info.blocks[i] = null;
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }

      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }

    info.block = block;
    if (info.blocks) info.blocks[index] = block;

    if (needs_flush) {
      flush();
    }
  }

  if (is_promise(promise)) {
    var _current_component = get_current_component();

    promise.then(function (value) {
      set_current_component(_current_component);
      update(info.then, 1, info.value, value);
      set_current_component(null);
    }, function (error) {
      set_current_component(_current_component);
      update(info.catch, 2, info.error, error);
      set_current_component(null);

      if (!info.hasCatch) {
        throw error;
      }
    }); // if we previously had a then/catch block, destroy it

    if (info.current !== info.pending) {
      update(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update(info.then, 1, info.value, promise);
      return true;
    }

    info.resolved = promise;
  }
}

var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function get_spread_update(levels, updates) {
  var update = {};
  var to_null_out = {};
  var accounted_for = {
    $$scope: 1
  };
  var i = levels.length;

  while (i--) {
    var o = levels[i];
    var n = updates[i];

    if (n) {
      for (var key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (var _key3 in n) {
        if (!accounted_for[_key3]) {
          update[_key3] = n[_key3];
          accounted_for[_key3] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (var _key4 in o) {
        accounted_for[_key4] = 1;
      }
    }
  }

  for (var _key5 in to_null_out) {
    if (!(_key5 in update)) update[_key5] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
} // source: https://html.spec.whatwg.org/multipage/indices.html

function create_component(block) {
  block && block.c();
}

function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}

function mount_component(component, target, anchor) {
  var _component$$$ = component.$$,
      fragment = _component$$$.fragment,
      on_mount = _component$$$.on_mount,
      on_destroy = _component$$$.on_destroy,
      after_update = _component$$$.after_update;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(function () {
    var new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  var $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props) {
  var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
  var parent_component = current_component;
  set_current_component(component);
  var prop_values = options.props || {};
  var $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props: props,
    update: noop,
    not_equal: not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty: dirty,
    skip_bound: false
  };
  var ready = false;
  $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
    var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

var SvelteComponent = /*#__PURE__*/function () {
  function SvelteComponent() {
    _classCallCheck(this, SvelteComponent);
  }

  _createClass(SvelteComponent, [{
    key: "$destroy",
    value: function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
  }, {
    key: "$on",
    value: function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }
  }, {
    key: "$set",
    value: function $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }]);

  return SvelteComponent;
}();

function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({
    version: '3.25.1'
  }, detail)));
}

function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node
  });
  append(target, node);
}

function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", {
    target: target,
    node: node,
    anchor: anchor
  });
  insert(target, node, anchor);
}

function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", {
    node: node
  });
  detach(node);
}

function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
  var modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
  if (has_prevent_default) modifiers.push('preventDefault');
  if (has_stop_propagation) modifiers.push('stopPropagation');
  dispatch_dev("SvelteDOMAddEventListener", {
    node: node,
    event: event,
    handler: handler,
    modifiers: modifiers
  });
  var dispose = listen(node, event, handler, options);
  return function () {
    dispatch_dev("SvelteDOMRemoveEventListener", {
      node: node,
      event: event,
      handler: handler,
      modifiers: modifiers
    });
    dispose();
  };
}

function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
    node: node,
    attribute: attribute
  });else dispatch_dev("SvelteDOMSetAttribute", {
    node: node,
    attribute: attribute,
    value: value
  });
}

function set_data_dev(text, data) {
  data = '' + data;
  if (text.wholeText === data) return;
  dispatch_dev("SvelteDOMSetData", {
    node: text,
    data: data
  });
  text.data = data;
}

function validate_each_argument(arg) {
  if (typeof arg !== 'string' && !(arg && _typeof(arg) === 'object' && 'length' in arg)) {
    var msg = '{#each} only iterates over array-like objects.';

    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
      msg += ' You can use a spread to convert this iterable into an array.';
    }

    throw new Error(msg);
  }
}

function validate_slots(name, slot, keys) {
  for (var _i2 = 0, _Object$keys = Object.keys(slot); _i2 < _Object$keys.length; _i2++) {
    var slot_key = _Object$keys[_i2];

    if (!~keys.indexOf(slot_key)) {
      console.warn("<".concat(name, "> received an unexpected slot \"").concat(slot_key, "\"."));
    }
  }
}

var SvelteComponentDev = /*#__PURE__*/function (_SvelteComponent) {
  _inherits(SvelteComponentDev, _SvelteComponent);

  var _super2 = _createSuper(SvelteComponentDev);

  function SvelteComponentDev(options) {
    _classCallCheck(this, SvelteComponentDev);

    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }

    return _super2.call(this);
  }

  _createClass(SvelteComponentDev, [{
    key: "$destroy",
    value: function $destroy() {
      _get(_getPrototypeOf(SvelteComponentDev.prototype), "$destroy", this).call(this);

      this.$destroy = function () {
        console.warn("Component was already destroyed"); // eslint-disable-line no-console
      };
    }
  }, {
    key: "$capture_state",
    value: function $capture_state() {}
  }, {
    key: "$inject_state",
    value: function $inject_state() {}
  }]);

  return SvelteComponentDev;
}(SvelteComponent);

var subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */

function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */


function writable(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var stop;
  var subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        var run_queue = !subscriber_queue.length;

        for (var i = 0; i < subscribers.length; i += 1) {
          var s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (var _i = 0; _i < subscriber_queue.length; _i += 2) {
            subscriber_queue[_i][0](subscriber_queue[_i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run) {
    var invalidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return function () {
      var index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set: set,
    update: update,
    subscribe: subscribe
  };
}

function derived(stores, fn, initial_value) {
  var single = !Array.isArray(stores);
  var stores_array = single ? [stores] : stores;
  var auto = fn.length < 2;
  return readable(initial_value, function (set) {
    var inited = false;
    var values = [];
    var pending = 0;
    var cleanup = noop;

    var sync = function sync() {
      if (pending) {
        return;
      }

      cleanup();
      var result = fn(single ? values[0] : values, set);

      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };

    var unsubscribers = stores_array.map(function (store, i) {
      return subscribe(store, function (value) {
        values[i] = value;
        pending &= ~(1 << i);

        if (inited) {
          sync();
        }
      }, function () {
        pending |= 1 << i;
      });
    });
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}

var CONTEXT_KEY = {};

const gameInfo = {
    async fetch(customFetch = globalThis.fetch) {
        if (this.items == null) {
            const json = await customFetch("game-info.json").then((response) => response.json());
            this.items = json.items;
            this.recipes = Object.fromEntries(Object.entries(json.recipes)
                .map(([name, recipe]) => [name, Object.assign(Object.assign({}, recipe), { result: json.items[recipe.result] })]));
            this.shipping = json.shipping.map((id) => this.items[id]);
            this.fish = json.fish.map((id) => this.items[id]);
            this.artifacts = json.artifacts.map((id) => this.items[id]);
            this.minerals = json.minerals.map((id) => this.items[id]);
            this.cooking = json.cooking.map((name) => this.recipes[name]);
            this.crafting = json.crafting.map((name) => this.recipes[name]);
            this.bundles = json.bundles;
            this.villagers = Object.fromEntries(Object.entries(json.villagers)
                .map(([name, villager]) => [name, Object.assign(Object.assign({}, villager), { bestGifts: villager.bestGifts.map((id) => this.items[id]) })]));
        }
        return {
            items: this.items,
            recipes: this.recipes,
            shipping: this.shipping,
            fish: this.fish,
            artifacts: this.artifacts,
            minerals: this.minerals,
            cooking: this.cooking,
            crafting: this.crafting,
            bundles: this.bundles,
            villagers: this.villagers,
        };
    },
    ready() {
        return typeof this.items !== "undefined" &&
            typeof this.recipes !== "undefined" &&
            typeof this.shipping !== "undefined" &&
            typeof this.fish !== "undefined" &&
            typeof this.artifacts !== "undefined" &&
            typeof this.minerals !== "undefined" &&
            typeof this.cooking !== "undefined" &&
            typeof this.crafting !== "undefined" &&
            typeof this.bundles !== "undefined" &&
            typeof this.villagers !== "undefined";
    },
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface,#fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title{border-color:rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media (max-width:592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media (min-width:592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(.8);opacity:0;pointer-events:none}.mdc-dialog__surface{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{line-height:normal;font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title:before{display:inline-block;width:0;height:40px;content:\"\";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.5rem;font-weight:400;letter-spacing:.03125em;text-decoration:inherit;text-transform:inherit;flex-grow:1;box-sizing:border-box;margin:0;padding:20px 24px;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}.mdc-dialog__button[dir=rtl],[dir=rtl] .mdc-dialog__button{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl],[dir=rtl] .mdc-dialog__button:first-child{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--closing,.mdc-dialog--open,.mdc-dialog--opening{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity .15s linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform .15s cubic-bezier(0,0,.2,1) 0ms}.mdc-dialog--closing .mdc-dialog__container,.mdc-dialog--closing .mdc-dialog__scrim{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:scale(1)}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:scale(1);opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}";
styleInject(css_248z);

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
var candidateSelector = candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;

  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];
    if (!isNodeMatchingSelectorTabbable(candidate)) continue;
    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node) {
  if (!isNodeMatchingSelectorFocusable(node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
}

function isTabbable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node);
}

function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node)) {
    return false;
  }

  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

function isFocusable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.

  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
}

function isHidden(node) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return node.offsetParent === null || getComputedStyle(node).visibility === 'hidden';
}

var tabbable_1 = tabbable;

var immutable = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

var activeFocusDelay;

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

function focusTrap(element, userOptions) {
  var doc = document;
  var container = typeof element === 'string' ? doc.querySelector(element) : element;
  var config = immutable({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true
  }, userOptions);
  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    clearTimeout(activeFocusDelay);
    removeListeners();
    state.active = false;
    state.paused = false;
    activeFocusTraps.deactivateTrap(trap);
    var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    updateTabbableNodes();
    addListeners();
  }

  function addListeners() {
    if (!state.active) return; // There can be only one listening focus trap at a time

    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    activeFocusDelay = delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  }

  function removeListeners() {
    if (!state.active) return;
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  }

  function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus');
    return node ? node : previousActiveElement;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable_1.isFocusable(e.target)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }

    e.preventDefault();
  } // In case focus escapes the trap for some strange reason, pull it back in.


  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  } // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;

    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable_1(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

var focusTrap_1 = focusTrap;

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
function createFocusTrapInstance(surfaceEl, focusTrapFactory, initialFocusEl) {
  if (focusTrapFactory === void 0) {
    focusTrapFactory = focusTrap_1;
  }

  return focusTrapFactory(surfaceEl, {
    clickOutsideDeactivates: true,
    escapeDeactivates: false,
    initialFocus: initialFocusEl
  });
}
function isScrollable(el) {
  return el ? el.scrollHeight > el.offsetHeight : false;
}
function areTopsMisaligned(els) {
  var tops = new Set();
  [].forEach.call(els, function (el) {
    return tops.add(el.offsetTop);
  });
  return tops.size > 1;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
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
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
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
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter_ = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

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

var MDCComponent =
/** @class */
function () {
  function MDCComponent(root, foundation) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    this.root_ = root;
    this.initialize.apply(this, __spread(args)); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.attachTo = function (root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new MDCFoundation({}));
  };
  /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */


  MDCComponent.prototype.initialize = function () {
    var _args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    } // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.

  };

  MDCComponent.prototype.getDefaultFoundation = function () {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function () {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function () {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  MDCComponent.prototype.listen = function (evtType, handler, options) {
    this.root_.addEventListener(evtType, handler, options);
  };

  MDCComponent.prototype.unlisten = function (evtType, handler, options) {
    this.root_.removeEventListener(evtType, handler, options);
  };
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
   */


  MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }

    var evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();

/**
 * @license
 * Copyright 2018 Google Inc.
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

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches$1(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}
function matches$1(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
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

/**
 * Stores result from applyPassive to avoid redundant processing to detect
 * passive event listener support.
 */
var supportsPassive_;
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */

function applyPassive(globalObj, forceRefresh) {
  if (globalObj === void 0) {
    globalObj = window;
  }

  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported_1 = false;

    try {
      globalObj.document.addEventListener('test', function () {
        return undefined;
      }, {
        get passive() {
          isSupported_1 = true;
          return isSupported_1;
        }

      });
    } catch (e) {} // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.


    supportsPassive_ = isSupported_1;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
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
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
var strings = {
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top'
};
var numbers = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug'; // Append to head instead of body because this script might be invoked in the
  // head, in which case the body doesn't exist yet. The probe works either way.

  document.head.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';

  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  return hasPseudoVarBug;
}

function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return false;
  }

  var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVars = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVars = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }

  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return {
      x: 0,
      y: 0
    };
  }

  var x = pageOffset.x,
      y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY; // Determine touch point relative to the ripple container.

  if (evt.type === 'touchstart') {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
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

var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

var activatedTargets = [];

var MDCRippleFoundation =
/** @class */
function (_super) {
  __extends(MDCRippleFoundation, _super);

  function MDCRippleFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;

    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = '0';
    _this.frame_ = {
      width: 0,
      height: 0
    };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    _this.activationState_ = _this.defaultActivationState_();

    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;

      _this.runDeactivationUXLogicIfReady_();
    };

    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    _this.deactivateHandler_ = function () {
      return _this.deactivate_();
    };

    _this.focusHandler_ = function () {
      return _this.handleFocus();
    };

    _this.blurHandler_ = function () {
      return _this.handleBlur();
    };

    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCRippleFoundation, "cssClasses", {
    get: function get() {
      return cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "strings", {
    get: function get() {
      return strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "numbers", {
    get: function get() {
      return numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClass: function addClass() {
          return undefined;
        },
        browserSupportsCssVars: function browserSupportsCssVars() {
          return true;
        },
        computeBoundingRect: function computeBoundingRect() {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        containsEventTarget: function containsEventTarget() {
          return true;
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() {
          return undefined;
        },
        deregisterInteractionHandler: function deregisterInteractionHandler() {
          return undefined;
        },
        deregisterResizeHandler: function deregisterResizeHandler() {
          return undefined;
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return {
            x: 0,
            y: 0
          };
        },
        isSurfaceActive: function isSurfaceActive() {
          return true;
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return true;
        },
        isUnbounded: function isUnbounded() {
          return true;
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() {
          return undefined;
        },
        registerInteractionHandler: function registerInteractionHandler() {
          return undefined;
        },
        registerResizeHandler: function registerResizeHandler() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        updateCssVariable: function updateCssVariable() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCRippleFoundation.prototype.init = function () {
    var _this = this;

    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      var _a = MDCRippleFoundation.cssClasses,
          ROOT_1 = _a.ROOT,
          UNBOUNDED_1 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.addClass(ROOT_1);

        if (_this.adapter_.isUnbounded()) {
          _this.adapter_.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


          _this.layoutInternal_();
        }
      });
    }
  };

  MDCRippleFoundation.prototype.destroy = function () {
    var _this = this;

    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _a = MDCRippleFoundation.cssClasses,
          ROOT_2 = _a.ROOT,
          UNBOUNDED_2 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.removeClass(ROOT_2);

        _this.adapter_.removeClass(UNBOUNDED_2);

        _this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  /**
   * @param evt Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function (evt) {
    this.activate_(evt);
  };

  MDCRippleFoundation.prototype.deactivate = function () {
    this.deactivate_();
  };

  MDCRippleFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };

  MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   */


  MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
    return this.adapter_.browserSupportsCssVars();
  };

  MDCRippleFoundation.prototype.defaultActivationState_ = function () {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  /**
   * supportsPressRipple Passed from init to save a redundant function call
   */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
    var _this = this;

    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  };

  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
    var _this = this;

    if (evt.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };

  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
    var _this = this;

    ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
    var _this = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };

  MDCRippleFoundation.prototype.removeCssVars_ = function () {
    var _this = this;

    var rippleStrings = MDCRippleFoundation.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function (key) {
      if (key.indexOf('VAR_') === 0) {
        _this.adapter_.updateCssVariable(rippleStrings[key], null);
      }
    });
  };

  MDCRippleFoundation.prototype.activate_ = function (evt) {
    var _this = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
    var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this.adapter_.containsEventTarget(target);
    });

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);

        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
    return evt !== undefined && evt.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  };

  MDCRippleFoundation.prototype.animateActivation_ = function () {
    var _this = this;

    var _a = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
    var _b = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _b.FG_DEACTIVATION,
        FG_ACTIVATION = _b.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(),
          startPoint = _c.startPoint,
          endPoint = _c.endPoint;

      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
    var _a = this.activationState_,
        activationEvent = _a.activationEvent,
        wasActivatedByPointer = _a.wasActivatedByPointer;
    var startPoint;

    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint: startPoint,
      endPoint: endPoint
    };
  };

  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
    var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.


    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _a = this.activationState_,
        hasDeactivationUXRun = _a.hasDeactivationUXRun,
        isActivated = _a.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers.FG_DEACTIVATION_MS);
    }
  };

  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function () {
    var _this = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(function () {
      return _this.previousActivationEvent_ = undefined;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  MDCRippleFoundation.prototype.deactivate_ = function () {
    var _this = this;

    var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    var state = _assign({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(function () {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this.activationState_.hasDeactivationUXRun = true;

        _this.animateDeactivation_(state);

        _this.resetActivationState_();
      });
    }
  };

  MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
    var wasActivatedByPointer = _a.wasActivatedByPointer,
        wasElementMadeActive = _a.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layoutInternal_ = function () {
    var _this = this;

    this.frame_ = this.adapter_.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    var getBoundedRadius = function getBoundedRadius() {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };

  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
    var _a = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _a.VAR_FG_SIZE,
        VAR_LEFT = _a.VAR_LEFT,
        VAR_TOP = _a.VAR_TOP,
        VAR_FG_SCALE = _a.VAR_FG_SCALE;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };

  return MDCRippleFoundation;
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

var MDCRipple =
/** @class */
function (_super) {
  __extends(MDCRipple, _super);

  function MDCRipple() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.disabled = false;
    return _this;
  }

  MDCRipple.attachTo = function (root, opts) {
    if (opts === void 0) {
      opts = {
        isUnbounded: undefined
      };
    }

    var ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (opts.isUnbounded !== undefined) {
      ripple.unbounded = opts.isUnbounded;
    }

    return ripple;
  };

  MDCRipple.createAdapter = function (instance) {
    return {
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      browserSupportsCssVars: function browserSupportsCssVars() {
        return supportsCssVariables(window);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      containsEventTarget: function containsEventTarget(target) {
        return instance.root_.contains(target);
      },
      deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      isSurfaceActive: function isSurfaceActive() {
        return matches$1(instance.root_, ':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return Boolean(instance.disabled);
      },
      isUnbounded: function isUnbounded() {
        return Boolean(instance.unbounded);
      },
      registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      }
    };
  };

  Object.defineProperty(MDCRipple.prototype, "unbounded", {
    get: function get() {
      return Boolean(this.unbounded_);
    },
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    },
    enumerable: true,
    configurable: true
  });

  MDCRipple.prototype.activate = function () {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function () {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function () {
    this.foundation_.layout();
  };

  MDCRipple.prototype.getDefaultFoundation = function () {
    return new MDCRippleFoundation(MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function () {
    var root = this.root_;
    this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
  };
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   */


  MDCRipple.prototype.setUnbounded_ = function () {
    this.foundation_.setUnbounded(Boolean(this.unbounded_));
  };

  return MDCRipple;
}(MDCComponent);

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
var cssClasses$1 = {
  CLOSING: 'mdc-dialog--closing',
  OPEN: 'mdc-dialog--open',
  OPENING: 'mdc-dialog--opening',
  SCROLLABLE: 'mdc-dialog--scrollable',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  STACKED: 'mdc-dialog--stacked'
};
var strings$1 = {
  ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
  BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
  BUTTON_SELECTOR: '.mdc-dialog__button',
  CLOSED_EVENT: 'MDCDialog:closed',
  CLOSE_ACTION: 'close',
  CLOSING_EVENT: 'MDCDialog:closing',
  CONTAINER_SELECTOR: '.mdc-dialog__container',
  CONTENT_SELECTOR: '.mdc-dialog__content',
  DESTROY_ACTION: 'destroy',
  INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
  OPENED_EVENT: 'MDCDialog:opened',
  OPENING_EVENT: 'MDCDialog:opening',
  SCRIM_SELECTOR: '.mdc-dialog__scrim',
  SUPPRESS_DEFAULT_PRESS_SELECTOR: ['textarea', '.mdc-menu .mdc-list-item'].join(', '),
  SURFACE_SELECTOR: '.mdc-dialog__surface'
};
var numbers$1 = {
  DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
  DIALOG_ANIMATION_OPEN_TIME_MS: 150
};

/**
 * @license
 * Copyright 2017 Google Inc.
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

var MDCDialogFoundation =
/** @class */
function (_super) {
  __extends(MDCDialogFoundation, _super);

  function MDCDialogFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCDialogFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    _this.layoutFrame_ = 0;
    _this.escapeKeyAction_ = strings$1.CLOSE_ACTION;
    _this.scrimClickAction_ = strings$1.CLOSE_ACTION;
    _this.autoStackButtons_ = true;
    _this.areButtonsStacked_ = false;
    return _this;
  }

  Object.defineProperty(MDCDialogFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "strings", {
    get: function get() {
      return strings$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "numbers", {
    get: function get() {
      return numbers$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addBodyClass: function addBodyClass() {
          return undefined;
        },
        addClass: function addClass() {
          return undefined;
        },
        areButtonsStacked: function areButtonsStacked() {
          return false;
        },
        clickDefaultButton: function clickDefaultButton() {
          return undefined;
        },
        eventTargetMatches: function eventTargetMatches() {
          return false;
        },
        getActionFromEvent: function getActionFromEvent() {
          return '';
        },
        getInitialFocusEl: function getInitialFocusEl() {
          return null;
        },
        hasClass: function hasClass() {
          return false;
        },
        isContentScrollable: function isContentScrollable() {
          return false;
        },
        notifyClosed: function notifyClosed() {
          return undefined;
        },
        notifyClosing: function notifyClosing() {
          return undefined;
        },
        notifyOpened: function notifyOpened() {
          return undefined;
        },
        notifyOpening: function notifyOpening() {
          return undefined;
        },
        releaseFocus: function releaseFocus() {
          return undefined;
        },
        removeBodyClass: function removeBodyClass() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        reverseButtons: function reverseButtons() {
          return undefined;
        },
        trapFocus: function trapFocus() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCDialogFoundation.prototype.init = function () {
    if (this.adapter_.hasClass(cssClasses$1.STACKED)) {
      this.setAutoStackButtons(false);
    }
  };

  MDCDialogFoundation.prototype.destroy = function () {
    if (this.isOpen_) {
      this.close(strings$1.DESTROY_ACTION);
    }

    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
      this.handleAnimationTimerEnd_();
    }

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
      this.layoutFrame_ = 0;
    }
  };

  MDCDialogFoundation.prototype.open = function () {
    var _this = this;

    this.isOpen_ = true;
    this.adapter_.notifyOpening();
    this.adapter_.addClass(cssClasses$1.OPENING); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(function () {
      _this.adapter_.addClass(cssClasses$1.OPEN);

      _this.adapter_.addBodyClass(cssClasses$1.SCROLL_LOCK);

      _this.layout();

      _this.animationTimer_ = setTimeout(function () {
        _this.handleAnimationTimerEnd_();

        _this.adapter_.trapFocus(_this.adapter_.getInitialFocusEl());

        _this.adapter_.notifyOpened();
      }, numbers$1.DIALOG_ANIMATION_OPEN_TIME_MS);
    });
  };

  MDCDialogFoundation.prototype.close = function (action) {
    var _this = this;

    if (action === void 0) {
      action = '';
    }

    if (!this.isOpen_) {
      // Avoid redundant close calls (and events), e.g. from keydown on elements that inherently emit click
      return;
    }

    this.isOpen_ = false;
    this.adapter_.notifyClosing(action);
    this.adapter_.addClass(cssClasses$1.CLOSING);
    this.adapter_.removeClass(cssClasses$1.OPEN);
    this.adapter_.removeBodyClass(cssClasses$1.SCROLL_LOCK);
    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = 0;
    clearTimeout(this.animationTimer_);
    this.animationTimer_ = setTimeout(function () {
      _this.adapter_.releaseFocus();

      _this.handleAnimationTimerEnd_();

      _this.adapter_.notifyClosed(action);
    }, numbers$1.DIALOG_ANIMATION_CLOSE_TIME_MS);
  };

  MDCDialogFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };

  MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
    return this.escapeKeyAction_;
  };

  MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
    this.escapeKeyAction_ = action;
  };

  MDCDialogFoundation.prototype.getScrimClickAction = function () {
    return this.scrimClickAction_;
  };

  MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
    this.scrimClickAction_ = action;
  };

  MDCDialogFoundation.prototype.getAutoStackButtons = function () {
    return this.autoStackButtons_;
  };

  MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
    this.autoStackButtons_ = autoStack;
  };

  MDCDialogFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };
  /** Handles click on the dialog root element. */


  MDCDialogFoundation.prototype.handleClick = function (evt) {
    var isScrim = this.adapter_.eventTargetMatches(evt.target, strings$1.SCRIM_SELECTOR); // Check for scrim click first since it doesn't require querying ancestors.

    if (isScrim && this.scrimClickAction_ !== '') {
      this.close(this.scrimClickAction_);
    } else {
      var action = this.adapter_.getActionFromEvent(evt);

      if (action) {
        this.close(action);
      }
    }
  };
  /** Handles keydown on the dialog root element. */


  MDCDialogFoundation.prototype.handleKeydown = function (evt) {
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;

    if (!isEnter) {
      return;
    }

    var action = this.adapter_.getActionFromEvent(evt);

    if (action) {
      // Action button callback is handled in `handleClick`,
      // since space/enter keydowns on buttons trigger click events.
      return;
    }

    var isDefault = !this.adapter_.eventTargetMatches(evt.target, strings$1.SUPPRESS_DEFAULT_PRESS_SELECTOR);

    if (isEnter && isDefault) {
      this.adapter_.clickDefaultButton();
    }
  };
  /** Handles keydown on the document. */


  MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
    var isEscape = evt.key === 'Escape' || evt.keyCode === 27;

    if (isEscape && this.escapeKeyAction_ !== '') {
      this.close(this.escapeKeyAction_);
    }
  };

  MDCDialogFoundation.prototype.layoutInternal_ = function () {
    if (this.autoStackButtons_) {
      this.detectStackedButtons_();
    }

    this.detectScrollableContent_();
  };

  MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function () {
    this.animationTimer_ = 0;
    this.adapter_.removeClass(cssClasses$1.OPENING);
    this.adapter_.removeClass(cssClasses$1.CLOSING);
  };
  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCDialogFoundation.prototype.runNextAnimationFrame_ = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function () {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };

  MDCDialogFoundation.prototype.detectStackedButtons_ = function () {
    // Remove the class first to let us measure the buttons' natural positions.
    this.adapter_.removeClass(cssClasses$1.STACKED);
    var areButtonsStacked = this.adapter_.areButtonsStacked();

    if (areButtonsStacked) {
      this.adapter_.addClass(cssClasses$1.STACKED);
    }

    if (areButtonsStacked !== this.areButtonsStacked_) {
      this.adapter_.reverseButtons();
      this.areButtonsStacked_ = areButtonsStacked;
    }
  };

  MDCDialogFoundation.prototype.detectScrollableContent_ = function () {
    // Remove the class first to let us measure the natural height of the content.
    this.adapter_.removeClass(cssClasses$1.SCROLLABLE);

    if (this.adapter_.isContentScrollable()) {
      this.adapter_.addClass(cssClasses$1.SCROLLABLE);
    }
  };

  return MDCDialogFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2017 Google Inc.
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
var strings$2 = MDCDialogFoundation.strings;

var MDCDialog =
/** @class */
function (_super) {
  __extends(MDCDialog, _super);

  function MDCDialog() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCDialog.prototype, "isOpen", {
    get: function get() {
      return this.foundation_.isOpen();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "escapeKeyAction", {
    get: function get() {
      return this.foundation_.getEscapeKeyAction();
    },
    set: function set(action) {
      this.foundation_.setEscapeKeyAction(action);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "scrimClickAction", {
    get: function get() {
      return this.foundation_.getScrimClickAction();
    },
    set: function set(action) {
      this.foundation_.setScrimClickAction(action);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialog.prototype, "autoStackButtons", {
    get: function get() {
      return this.foundation_.getAutoStackButtons();
    },
    set: function set(autoStack) {
      this.foundation_.setAutoStackButtons(autoStack);
    },
    enumerable: true,
    configurable: true
  });

  MDCDialog.attachTo = function (root) {
    return new MDCDialog(root);
  };

  MDCDialog.prototype.initialize = function (focusTrapFactory) {
    var e_1, _a;

    var container = this.root_.querySelector(strings$2.CONTAINER_SELECTOR);

    if (!container) {
      throw new Error("Dialog component requires a " + strings$2.CONTAINER_SELECTOR + " container element");
    }

    this.container_ = container;
    this.content_ = this.root_.querySelector(strings$2.CONTENT_SELECTOR);
    this.buttons_ = [].slice.call(this.root_.querySelectorAll(strings$2.BUTTON_SELECTOR));
    this.defaultButton_ = this.root_.querySelector("[" + strings$2.BUTTON_DEFAULT_ATTRIBUTE + "]");
    this.focusTrapFactory_ = focusTrapFactory;
    this.buttonRipples_ = [];

    try {
      for (var _b = __values(this.buttons_), _c = _b.next(); !_c.done; _c = _b.next()) {
        var buttonEl = _c.value;
        this.buttonRipples_.push(new MDCRipple(buttonEl));
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  MDCDialog.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.focusTrap_ = createFocusTrapInstance(this.container_, this.focusTrapFactory_, this.getInitialFocusEl_() || undefined);
    this.handleClick_ = this.foundation_.handleClick.bind(this.foundation_);
    this.handleKeydown_ = this.foundation_.handleKeydown.bind(this.foundation_);
    this.handleDocumentKeydown_ = this.foundation_.handleDocumentKeydown.bind(this.foundation_);
    this.handleLayout_ = this.layout.bind(this);
    var LAYOUT_EVENTS = ['resize', 'orientationchange'];

    this.handleOpening_ = function () {
      LAYOUT_EVENTS.forEach(function (evtType) {
        return window.addEventListener(evtType, _this.handleLayout_);
      });
      document.addEventListener('keydown', _this.handleDocumentKeydown_);
    };

    this.handleClosing_ = function () {
      LAYOUT_EVENTS.forEach(function (evtType) {
        return window.removeEventListener(evtType, _this.handleLayout_);
      });
      document.removeEventListener('keydown', _this.handleDocumentKeydown_);
    };

    this.listen('click', this.handleClick_);
    this.listen('keydown', this.handleKeydown_);
    this.listen(strings$2.OPENING_EVENT, this.handleOpening_);
    this.listen(strings$2.CLOSING_EVENT, this.handleClosing_);
  };

  MDCDialog.prototype.destroy = function () {
    this.unlisten('click', this.handleClick_);
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten(strings$2.OPENING_EVENT, this.handleOpening_);
    this.unlisten(strings$2.CLOSING_EVENT, this.handleClosing_);
    this.handleClosing_();
    this.buttonRipples_.forEach(function (ripple) {
      return ripple.destroy();
    });

    _super.prototype.destroy.call(this);
  };

  MDCDialog.prototype.layout = function () {
    this.foundation_.layout();
  };

  MDCDialog.prototype.open = function () {
    this.foundation_.open();
  };

  MDCDialog.prototype.close = function (action) {
    if (action === void 0) {
      action = '';
    }

    this.foundation_.close(action);
  };

  MDCDialog.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      areButtonsStacked: function areButtonsStacked() {
        return areTopsMisaligned(_this.buttons_);
      },
      clickDefaultButton: function clickDefaultButton() {
        return _this.defaultButton_ && _this.defaultButton_.click();
      },
      eventTargetMatches: function eventTargetMatches(target, selector) {
        return target ? matches$1(target, selector) : false;
      },
      getActionFromEvent: function getActionFromEvent(evt) {
        if (!evt.target) {
          return '';
        }

        var element = closest(evt.target, "[" + strings$2.ACTION_ATTRIBUTE + "]");
        return element && element.getAttribute(strings$2.ACTION_ATTRIBUTE);
      },
      getInitialFocusEl: function getInitialFocusEl() {
        return _this.getInitialFocusEl_();
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      isContentScrollable: function isContentScrollable() {
        return isScrollable(_this.content_);
      },
      notifyClosed: function notifyClosed(action) {
        return _this.emit(strings$2.CLOSED_EVENT, action ? {
          action: action
        } : {});
      },
      notifyClosing: function notifyClosing(action) {
        return _this.emit(strings$2.CLOSING_EVENT, action ? {
          action: action
        } : {});
      },
      notifyOpened: function notifyOpened() {
        return _this.emit(strings$2.OPENED_EVENT, {});
      },
      notifyOpening: function notifyOpening() {
        return _this.emit(strings$2.OPENING_EVENT, {});
      },
      releaseFocus: function releaseFocus() {
        return _this.focusTrap_.deactivate();
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      reverseButtons: function reverseButtons() {
        _this.buttons_.reverse();

        _this.buttons_.forEach(function (button) {
          button.parentElement.appendChild(button);
        });
      },
      trapFocus: function trapFocus() {
        return _this.focusTrap_.activate();
      }
    };
    return new MDCDialogFoundation(adapter);
  };

  MDCDialog.prototype.getInitialFocusEl_ = function () {
    return document.querySelector("[" + strings$2.INITIAL_FOCUS_ATTRIBUTE + "]");
  };

  return MDCDialog;
}(MDCComponent);

function forwardEventsBuilder(component) {
  var additionalEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var events = ['focus', 'blur', 'fullscreenchange', 'fullscreenerror', 'scroll', 'cut', 'copy', 'paste', 'keydown', 'keypress', 'keyup', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel', 'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture'].concat(_toConsumableArray(additionalEvents));

  function forward(e) {
    bubble(component, e);
  }

  return function (node) {
    var destructors = [];

    for (var i = 0; i < events.length; i++) {
      destructors.push(listen(node, events[i], forward));
    }

    return {
      destroy: function destroy() {
        for (var _i = 0; _i < destructors.length; _i++) {
          destructors[_i]();
        }
      }
    };
  };
}

function exclude(obj, keys) {
  var names = Object.getOwnPropertyNames(obj);
  var newObj = {};

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var cashIndex = name.indexOf('$');

    if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
      continue;
    }

    if (keys.indexOf(name) !== -1) {
      continue;
    }

    newObj[name] = obj[name];
  }

  return newObj;
}

function useActions(node, actions) {
  var objects = [];

  if (actions) {
    for (var i = 0; i < actions.length; i++) {
      var isArray = Array.isArray(actions[i]);
      var action = isArray ? actions[i][0] : actions[i];

      if (isArray && actions[i].length > 1) {
        objects.push(action(node, actions[i][1]));
      } else {
        objects.push(action(node));
      }
    }
  }

  return {
    update: function update(actions) {
      if ((actions && actions.length || 0) != objects.length) {
        throw new Error('You must not change the length of an actions array.');
      }

      if (actions) {
        for (var _i = 0; _i < actions.length; _i++) {
          if (objects[_i] && 'update' in objects[_i]) {
            var _isArray = Array.isArray(actions[_i]);

            if (_isArray && actions[_i].length > 1) {
              objects[_i].update(actions[_i][1]);
            } else {
              objects[_i].update();
            }
          }
        }
      }
    },
    destroy: function destroy() {
      for (var _i2 = 0; _i2 < objects.length; _i2++) {
        if (objects[_i2] && 'destroy' in objects[_i2]) {
          objects[_i2].destroy();
        }
      }
    }
  };
}

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "node_modules/@smui/dialog/Dialog.svelte";

function create_fragment(ctx) {
  var div3;
  var div1;
  var div0;
  var t;
  var div2;
  var div3_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[14].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[13], null);
  var div3_levels = [{
    class: div3_class_value = "mdc-dialog " +
    /*className*/
    ctx[1]
  }, {
    role: "alertdialog"
  }, {
    "aria-modal": "true"
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class"])];
  var div3_data = {};

  for (var i = 0; i < div3_levels.length; i += 1) {
    div3_data = assign(div3_data, div3_levels[i]);
  }

  var block = {
    c: function create() {
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (default_slot) default_slot.c();
      t = space();
      div2 = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-modal": true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      if (default_slot) default_slot.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      children(div2).forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "mdc-dialog__surface");
      add_location(div0, file, 11, 4, 273);
      attr_dev(div1, "class", "mdc-dialog__container");
      add_location(div1, file, 10, 2, 233);
      attr_dev(div2, "class", "mdc-dialog__scrim");
      add_location(div2, file, 15, 2, 349);
      set_attributes(div3, div3_data);
      add_location(div3, file, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div1);
      append_dev(div1, div0);

      if (default_slot) {
        default_slot.m(div0, null);
      }

      append_dev(div3, t);
      append_dev(div3, div2);
      /*div3_binding*/

      ctx[15](div3);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, div3,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[3].call(null, div3)), listen_dev(div3, "MDCDialog:opened",
        /*handleDialogOpened*/
        ctx[4], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8192) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[13], dirty, null, null);
        }
      }

      set_attributes(div3, div3_data = get_spread_update(div3_levels, [(!current || dirty &
      /*className*/
      2 && div3_class_value !== (div3_class_value = "mdc-dialog " +
      /*className*/
      ctx[1])) && {
        class: div3_class_value
      }, {
        role: "alertdialog"
      }, {
        "aria-modal": "true"
      }, dirty &
      /*$$props*/
      32 && exclude(
      /*$$props*/
      ctx[5], ["use", "class"])]));
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
      if (detaching) detach_dev(div3);
      if (default_slot) default_slot.d(detaching);
      /*div3_binding*/

      ctx[15](null);
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
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Dialog", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCDialog:opening", "MDCDialog:opened", "MDCDialog:closing", "MDCDialog:closed"]);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$escapeKeyAc = _$$props4.escapeKeyAction,
      escapeKeyAction = _$$props4$escapeKeyAc === void 0 ? "close" : _$$props4$escapeKeyAc;
  var _$$props5 = $$props,
      _$$props5$scrimClickA = _$$props5.scrimClickAction,
      scrimClickAction = _$$props5$scrimClickA === void 0 ? "close" : _$$props5$scrimClickA;
  var _$$props6 = $$props,
      _$$props6$autoStackBu = _$$props6.autoStackButtons,
      autoStackButtons = _$$props6$autoStackBu === void 0 ? true : _$$props6$autoStackBu;
  var element;
  var dialog;
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  var layoutListeners = [];

  var addLayoutListenerFn = function addLayoutListenerFn(listener) {
    layoutListeners.push(listener);
    return function () {
      var idx = layoutListeners.indexOf(listener);

      if (idx >= 0) {
        layoutListeners.splice(idx, 1);
      }
    };
  };

  setContext("SMUI:addLayoutListener", addLayoutListenerFn);

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount(function () {
    $$invalidate(16, dialog = new MDCDialog(element));
  });
  onDestroy(function () {
    dialog && dialog.destroy();

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function handleDialogOpened() {
    layoutListeners.forEach(function (listener) {
      return listener();
    });
  }

  function open() {
    var _dialog;

    return (_dialog = dialog).open.apply(_dialog, arguments);
  }

  function close() {
    var _dialog2;

    return (_dialog2 = dialog).close.apply(_dialog2, arguments);
  }

  function isOpen() {
    return dialog.isOpen;
  }

  function layout() {
    var _dialog3;

    return (_dialog3 = dialog).layout.apply(_dialog3, arguments);
  }

  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(2, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("escapeKeyAction" in $$new_props) $$invalidate(6, escapeKeyAction = $$new_props.escapeKeyAction);
    if ("scrimClickAction" in $$new_props) $$invalidate(7, scrimClickAction = $$new_props.scrimClickAction);
    if ("autoStackButtons" in $$new_props) $$invalidate(8, autoStackButtons = $$new_props.autoStackButtons);
    if ("$$scope" in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCDialog: MDCDialog,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      escapeKeyAction: escapeKeyAction,
      scrimClickAction: scrimClickAction,
      autoStackButtons: autoStackButtons,
      element: element,
      dialog: dialog,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      layoutListeners: layoutListeners,
      addLayoutListenerFn: addLayoutListenerFn,
      handleDialogOpened: handleDialogOpened,
      open: open,
      close: close,
      isOpen: isOpen,
      layout: layout
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("escapeKeyAction" in $$props) $$invalidate(6, escapeKeyAction = $$new_props.escapeKeyAction);
    if ("scrimClickAction" in $$props) $$invalidate(7, scrimClickAction = $$new_props.scrimClickAction);
    if ("autoStackButtons" in $$props) $$invalidate(8, autoStackButtons = $$new_props.autoStackButtons);
    if ("element" in $$props) $$invalidate(2, element = $$new_props.element);
    if ("dialog" in $$props) $$invalidate(16, dialog = $$new_props.dialog);
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    if ("layoutListeners" in $$props) layoutListeners = $$new_props.layoutListeners;
    if ("addLayoutListenerFn" in $$props) addLayoutListenerFn = $$new_props.addLayoutListenerFn;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*dialog, escapeKeyAction*/
    65600) {
       dialog && $$invalidate(16, dialog.escapeKeyAction = escapeKeyAction, dialog);
    }

    if ($$self.$$.dirty &
    /*dialog, scrimClickAction*/
    65664) {
       dialog && $$invalidate(16, dialog.scrimClickAction = scrimClickAction, dialog);
    }

    if ($$self.$$.dirty &
    /*dialog, autoStackButtons*/
    65792) {
       dialog && $$invalidate(16, dialog.autoStackButtons = autoStackButtons, dialog);
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, element, forwardEvents, handleDialogOpened, $$props, escapeKeyAction, scrimClickAction, autoStackButtons, open, close, isOpen, layout, $$scope, slots, div3_binding];
}

var Dialog = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Dialog, _SvelteComponentDev);

  var _super = _createSuper$1(Dialog);

  function Dialog(options) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      use: 0,
      class: 1,
      escapeKeyAction: 6,
      scrimClickAction: 7,
      autoStackButtons: 8,
      open: 9,
      close: 10,
      isOpen: 11,
      layout: 12
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Dialog",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(Dialog, [{
    key: "use",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "escapeKeyAction",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "scrimClickAction",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "autoStackButtons",
    get: function get() {
      throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "open",
    get: function get() {
      return this.$$.ctx[9];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "close",
    get: function get() {
      return this.$$.ctx[10];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[12];
    },
    set: function set(value) {
      throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Dialog;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[7].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[8], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        256) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[8], dirty, null, null);
        }
      }
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
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(1:0) <svelte:component   this={component}   use={[forwardEvents, ...use]}   class=\\\"{smuiClass} {className}\\\"   {...exclude($$props, ['use', 'class', 'component', 'forwardEvents'])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [{
    use: [
    /*forwardEvents*/
    ctx[4]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    class: "" + (
    /*smuiClass*/
    ctx[3] + " " +
    /*className*/
    ctx[1])
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class", "component", "forwardEvents"])];
  var switch_value =
  /*component*/
  ctx[2];

  function switch_props(ctx) {
    var switch_instance_props = {
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    };

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = dirty &
      /*forwardEvents, use, smuiClass, className, exclude, $$props*/
      59 ? get_spread_update(switch_instance_spread_levels, [dirty &
      /*forwardEvents, use*/
      17 && {
        use: [
        /*forwardEvents*/
        ctx[4]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty &
      /*smuiClass, className*/
      10 && {
        class: "" + (
        /*smuiClass*/
        ctx[3] + " " +
        /*className*/
        ctx[1])
      }, dirty &
      /*exclude, $$props*/
      32 && get_spread_object(exclude(
      /*$$props*/
      ctx[5], ["use", "class", "component", "forwardEvents"]))]) : {};

      if (dirty &
      /*$$scope*/
      256) {
        switch_instance_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (switch_value !== (switch_value =
      /*component*/
      ctx[2])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
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

var internals = {
  component: null,
  smuiClass: null,
  contexts: {}
};

function instance$1($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("ClassAdder", slots, ['default']);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$component = _$$props4.component,
      component = _$$props4$component === void 0 ? internals.component : _$$props4$component;
  var _$$props5 = $$props,
      _$$props5$forwardEven = _$$props5.forwardEvents,
      smuiForwardEvents = _$$props5$forwardEven === void 0 ? [] : _$$props5$forwardEven;
  var smuiClass = internals.class;
  var contexts = internals.contexts;
  var forwardEvents = forwardEventsBuilder(get_current_component(), smuiForwardEvents);

  for (var context in contexts) {
    if (contexts.hasOwnProperty(context)) {
      setContext(context, contexts[context]);
    }
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("component" in $$new_props) $$invalidate(2, component = $$new_props.component);
    if ("forwardEvents" in $$new_props) $$invalidate(6, smuiForwardEvents = $$new_props.forwardEvents);
    if ("$$scope" in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      internals: internals,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      use: use,
      className: className,
      component: component,
      smuiForwardEvents: smuiForwardEvents,
      smuiClass: smuiClass,
      contexts: contexts,
      forwardEvents: forwardEvents
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("component" in $$props) $$invalidate(2, component = $$new_props.component);
    if ("smuiForwardEvents" in $$props) $$invalidate(6, smuiForwardEvents = $$new_props.smuiForwardEvents);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, component, smuiClass, forwardEvents, $$props, smuiForwardEvents, slots, $$scope];
}

var ClassAdder = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ClassAdder, _SvelteComponentDev);

  var _super = _createSuper$2(ClassAdder);

  function ClassAdder(options) {
    var _this;

    _classCallCheck(this, ClassAdder);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      use: 0,
      class: 1,
      component: 2,
      forwardEvents: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ClassAdder",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(ClassAdder, [{
    key: "use",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "component",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "forwardEvents",
    get: function get() {
      throw new Error("<ClassAdder>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ClassAdder>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ClassAdder;
}(SvelteComponentDev);

function classAdderBuilder(props) {
  function Component() {
    Object.assign(internals, props);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(ClassAdder, args);
  }

  Component.prototype = ClassAdder; // SSR support

  if (ClassAdder.$$render) {
    Component.$$render = function () {
      return Object.assign(internals, props) && ClassAdder.$$render.apply(ClassAdder, arguments);
    };
  }

  if (ClassAdder.render) {
    Component.render = function () {
      return Object.assign(internals, props) && ClassAdder.render.apply(ClassAdder, arguments);
    };
  }

  return Component;
}

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "node_modules/@smui/common/H2.svelte";

function create_fragment$2(ctx) {
  var h2;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var h2_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var h2_data = {};

  for (var i = 0; i < h2_levels.length; i += 1) {
    h2_data = assign(h2_data, h2_levels[i]);
  }

  var block = {
    c: function create() {
      h2 = element("h2");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      if (default_slot) default_slot.l(h2_nodes);
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(h2, h2_data);
      add_location(h2, file$1, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);

      if (default_slot) {
        default_slot.m(h2, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, h2,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, h2))];
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

      set_attributes(h2, h2_data = get_spread_update(h2_levels, [dirty &
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
      if (detaching) detach_dev(h2);
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
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("H2", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
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
  return [use, forwardEvents, $$props, $$scope, slots];
}

var H2 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(H2, _SvelteComponentDev);

  var _super = _createSuper$3(H2);

  function H2(options) {
    var _this;

    _classCallCheck(this, H2);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "H2",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(H2, [{
    key: "use",
    get: function get() {
      throw new Error("<H2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<H2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return H2;
}(SvelteComponentDev);

var Title = classAdderBuilder({
  class: 'mdc-dialog__title',
  component: H2,
  contexts: {}
});

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "node_modules/@smui/common/Div.svelte";

function create_fragment$3(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var div_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$2, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, div,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, div))];
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

      set_attributes(div, div_data = get_spread_update(div_levels, [dirty &
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
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
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
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Div", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
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
  return [use, forwardEvents, $$props, $$scope, slots];
}

var Div = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Div, _SvelteComponentDev);

  var _super = _createSuper$4(Div);

  function Div(options) {
    var _this;

    _classCallCheck(this, Div);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Div",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(Div, [{
    key: "use",
    get: function get() {
      throw new Error("<Div>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Div>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Div;
}(SvelteComponentDev);

var Content = classAdderBuilder({
  class: 'mdc-dialog__content',
  component: Div,
  contexts: {}
});

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "node_modules/@smui/common/Footer.svelte";

function create_fragment$4(ctx) {
  var footer;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var footer_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var footer_data = {};

  for (var i = 0; i < footer_levels.length; i += 1) {
    footer_data = assign(footer_data, footer_levels[i]);
  }

  var block = {
    c: function create() {
      footer = element("footer");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {});
      var footer_nodes = children(footer);
      if (default_slot) default_slot.l(footer_nodes);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(footer, footer_data);
      add_location(footer, file$3, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, footer, anchor);

      if (default_slot) {
        default_slot.m(footer, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, footer,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, footer))];
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

      set_attributes(footer, footer_data = get_spread_update(footer_levels, [dirty &
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
      if (detaching) detach_dev(footer);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
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
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Footer", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
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
  return [use, forwardEvents, $$props, $$scope, slots];
}

var Footer = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Footer, _SvelteComponentDev);

  var _super = _createSuper$5(Footer);

  function Footer(options) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Footer",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  _createClass(Footer, [{
    key: "use",
    get: function get() {
      throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Footer;
}(SvelteComponentDev);

var Actions = classAdderBuilder({
  class: 'mdc-dialog__actions',
  component: Footer,
  contexts: {
    'SMUI:button:context': 'dialog:action'
  }
});

var css_248z$1 = ".mdc-icon-button{width:48px;height:48px;padding:12px;font-size:24px;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button img,.mdc-icon-button svg{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light,rgba(0,0,0,.38));cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button--on .mdc-icon-button__icon,.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-icon-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button:after,.mdc-icon-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-icon-button:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-icon-button.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-icon-button:after,.mdc-icon-button:before{top:0;left:0;width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded:after,.mdc-icon-button.mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-icon-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-icon-button:after,.mdc-icon-button:before{background-color:#000}.mdc-icon-button:hover:before{opacity:.04}.mdc-icon-button.mdc-ripple-upgraded--background-focused:before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-icon-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}";
styleInject(css_248z$1);

/**
 * @license
 * Copyright 2018 Google Inc.
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
var cssClasses$2 = {
  ICON_BUTTON_ON: 'mdc-icon-button--on',
  ROOT: 'mdc-icon-button'
};
var strings$3 = {
  ARIA_PRESSED: 'aria-pressed',
  CHANGE_EVENT: 'MDCIconButtonToggle:change'
};

/**
 * @license
 * Copyright 2018 Google Inc.
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

var MDCIconButtonToggleFoundation =
/** @class */
function (_super) {
  __extends(MDCIconButtonToggleFoundation, _super);

  function MDCIconButtonToggleFoundation(adapter) {
    return _super.call(this, _assign({}, MDCIconButtonToggleFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCIconButtonToggleFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCIconButtonToggleFoundation, "strings", {
    get: function get() {
      return strings$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCIconButtonToggleFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClass: function addClass() {
          return undefined;
        },
        hasClass: function hasClass() {
          return false;
        },
        notifyChange: function notifyChange() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        setAttr: function setAttr() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCIconButtonToggleFoundation.prototype.init = function () {
    this.adapter_.setAttr(strings$3.ARIA_PRESSED, "" + this.isOn());
  };

  MDCIconButtonToggleFoundation.prototype.handleClick = function () {
    this.toggle();
    this.adapter_.notifyChange({
      isOn: this.isOn()
    });
  };

  MDCIconButtonToggleFoundation.prototype.isOn = function () {
    return this.adapter_.hasClass(cssClasses$2.ICON_BUTTON_ON);
  };

  MDCIconButtonToggleFoundation.prototype.toggle = function (isOn) {
    if (isOn === void 0) {
      isOn = !this.isOn();
    }

    if (isOn) {
      this.adapter_.addClass(cssClasses$2.ICON_BUTTON_ON);
    } else {
      this.adapter_.removeClass(cssClasses$2.ICON_BUTTON_ON);
    }

    this.adapter_.setAttr(strings$3.ARIA_PRESSED, "" + isOn);
  };

  return MDCIconButtonToggleFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
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
var strings$4 = MDCIconButtonToggleFoundation.strings;

var MDCIconButtonToggle =
/** @class */
function (_super) {
  __extends(MDCIconButtonToggle, _super);

  function MDCIconButtonToggle() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.ripple_ = _this.createRipple_();
    return _this;
  }

  MDCIconButtonToggle.attachTo = function (root) {
    return new MDCIconButtonToggle(root);
  };

  MDCIconButtonToggle.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.handleClick_ = function () {
      return _this.foundation_.handleClick();
    };

    this.listen('click', this.handleClick_);
  };

  MDCIconButtonToggle.prototype.destroy = function () {
    this.unlisten('click', this.handleClick_);
    this.ripple_.destroy();

    _super.prototype.destroy.call(this);
  };

  MDCIconButtonToggle.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      notifyChange: function notifyChange(evtData) {
        return _this.emit(strings$4.CHANGE_EVENT, evtData);
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      setAttr: function setAttr(attrName, attrValue) {
        return _this.root_.setAttribute(attrName, attrValue);
      }
    };
    return new MDCIconButtonToggleFoundation(adapter);
  };

  Object.defineProperty(MDCIconButtonToggle.prototype, "ripple", {
    get: function get() {
      return this.ripple_;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCIconButtonToggle.prototype, "on", {
    get: function get() {
      return this.foundation_.isOn();
    },
    set: function set(isOn) {
      this.foundation_.toggle(isOn);
    },
    enumerable: true,
    configurable: true
  });

  MDCIconButtonToggle.prototype.createRipple_ = function () {
    var ripple = new MDCRipple(this.root_);
    ripple.unbounded = true;
    return ripple;
  };

  return MDCIconButtonToggle;
}(MDCComponent);

function Ripple(node) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    ripple: false,
    unbounded: false,
    color: null,
    classForward: function classForward() {}
  };
  var instance = null;
  var addLayoutListener = getContext('SMUI:addLayoutListener');
  var removeLayoutListener;
  var classList = [];

  function addClass(className) {
    var idx = classList.indexOf(className);

    if (idx === -1) {
      node.classList.add(className);
      classList.push(className);

      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function removeClass(className) {
    var idx = classList.indexOf(className);

    if (idx !== -1) {
      node.classList.remove(className);
      classList.splice(idx, 1);

      if (props.classForward) {
        props.classForward(classList);
      }
    }
  }

  function handleProps() {
    if (props.ripple && !instance) {
      // Override the Ripple component's adapter, so that we can forward classes
      // to Svelte components that overwrite Ripple's classes.
      var _createAdapter = MDCRipple.createAdapter;

      MDCRipple.createAdapter = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var adapter = _createAdapter.apply(this, args);

        adapter.addClass = function (className) {
          return addClass(className);
        };

        adapter.removeClass = function (className) {
          return removeClass(className);
        };

        return adapter;
      };

      instance = new MDCRipple(node);
      MDCRipple.createAdapter = _createAdapter;
    } else if (instance && !props.ripple) {
      instance.destroy();
      instance = null;
    }

    if (props.ripple) {
      instance.unbounded = !!props.unbounded;

      switch (props.color) {
        case 'surface':
          addClass('mdc-ripple-surface');
          removeClass('mdc-ripple-surface--primary');
          removeClass('mdc-ripple-surface--accent');
          return;

        case 'primary':
          addClass('mdc-ripple-surface');
          addClass('mdc-ripple-surface--primary');
          removeClass('mdc-ripple-surface--accent');
          return;

        case 'secondary':
          addClass('mdc-ripple-surface');
          removeClass('mdc-ripple-surface--primary');
          addClass('mdc-ripple-surface--accent');
          return;
      }
    }

    removeClass('mdc-ripple-surface');
    removeClass('mdc-ripple-surface--primary');
    removeClass('mdc-ripple-surface--accent');
  }

  handleProps();

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  function layout() {
    if (instance) {
      instance.layout();
    }
  }

  return {
    update: function update() {
      var newProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        ripple: false,
        unbounded: false,
        color: null,
        classForward: []
      };
      props = newProps;
      handleProps();
    },
    destroy: function destroy() {
      if (instance) {
        instance.destroy();
        instance = null;
        removeClass('mdc-ripple-surface');
        removeClass('mdc-ripple-surface--primary');
        removeClass('mdc-ripple-surface--accent');
      }

      if (removeLayoutListener) {
        removeLayoutListener();
      }
    }
  };
}

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "node_modules/@smui/icon-button/IconButton.svelte"; // (23:0) {:else}

function create_else_block(ctx) {
  var button;
  var button_class_value;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var button_levels = [{
    class: button_class_value = "\n      mdc-icon-button\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*pressed*/
    ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (
    /*context*/
    ctx[10] === "card:action" ? "mdc-card__action" : "") + "\n      " + (
    /*context*/
    ctx[10] === "card:action" ? "mdc-card__action--icon" : "") + "\n      " + (
    /*context*/
    ctx[10] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n      " + (
    /*context*/
    ctx[10] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n      " + (
    /*context*/
    ctx[10] === "snackbar" ? "mdc-snackbar__dismiss" : "") + "\n    "
  }, {
    "aria-hidden": "true"
  }, {
    "aria-pressed":
    /*pressed*/
    ctx[0]
  },
  /*props*/
  ctx[8]];
  var button_data = {};

  for (var i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }

  var block = {
    c: function create() {
      button = element("button");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {
        class: true,
        "aria-hidden": true,
        "aria-pressed": true
      });
      var button_nodes = children(button);
      if (default_slot) default_slot.l(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(button, button_data);
      add_location(button, file$4, 23, 2, 769);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);

      if (default_slot) {
        default_slot.m(button, null);
      }
      /*button_binding*/


      ctx[15](button);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, button,
        /*use*/
        ctx[1])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[9].call(null, button)), action_destroyer(Ripple_action = Ripple.call(null, button, {
          ripple:
          /*ripple*/
          ctx[3] && !
          /*toggle*/
          ctx[5],
          unbounded: true,
          color:
          /*color*/
          ctx[4]
        })), listen_dev(button, "MDCIconButtonToggle:change",
        /*handleChange*/
        ctx[11], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[12], dirty, null, null);
        }
      }

      set_attributes(button, button_data = get_spread_update(button_levels, [(!current || dirty &
      /*className, pressed*/
      5 && button_class_value !== (button_class_value = "\n      mdc-icon-button\n      " +
      /*className*/
      ctx[2] + "\n      " + (
      /*pressed*/
      ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (
      /*context*/
      ctx[10] === "card:action" ? "mdc-card__action" : "") + "\n      " + (
      /*context*/
      ctx[10] === "card:action" ? "mdc-card__action--icon" : "") + "\n      " + (
      /*context*/
      ctx[10] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n      " + (
      /*context*/
      ctx[10] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n      " + (
      /*context*/
      ctx[10] === "snackbar" ? "mdc-snackbar__dismiss" : "") + "\n    ")) && {
        class: button_class_value
      }, {
        "aria-hidden": "true"
      }, (!current || dirty &
      /*pressed*/
      1) && {
        "aria-pressed":
        /*pressed*/
        ctx[0]
      }, dirty &
      /*props*/
      256 &&
      /*props*/
      ctx[8]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, toggle, color*/
      56) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3] && !
        /*toggle*/
        ctx[5],
        unbounded: true,
        color:
        /*color*/
        ctx[4]
      });
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
      if (detaching) detach_dev(button);
      if (default_slot) default_slot.d(detaching);
      /*button_binding*/

      ctx[15](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(23:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if href}


function create_if_block(ctx) {
  var a;
  var a_class_value;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var a_levels = [{
    class: a_class_value = "\n      mdc-icon-button\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*pressed*/
    ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (
    /*context*/
    ctx[10] === "card:action" ? "mdc-card__action" : "") + "\n      " + (
    /*context*/
    ctx[10] === "card:action" ? "mdc-card__action--icon" : "") + "\n      " + (
    /*context*/
    ctx[10] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n      " + (
    /*context*/
    ctx[10] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n      " + (
    /*context*/
    ctx[10] === "snackbar" ? "mdc-snackbar__dismiss" : "") + "\n    "
  }, {
    "aria-hidden": "true"
  }, {
    "aria-pressed":
    /*pressed*/
    ctx[0]
  }, {
    href:
    /*href*/
    ctx[6]
  },
  /*props*/
  ctx[8]];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        "aria-hidden": true,
        "aria-pressed": true,
        href: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$4, 1, 2, 13);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }
      /*a_binding*/


      ctx[14](a);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, a,
        /*use*/
        ctx[1])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[9].call(null, a)), action_destroyer(Ripple_action = Ripple.call(null, a, {
          ripple:
          /*ripple*/
          ctx[3] && !
          /*toggle*/
          ctx[5],
          unbounded: true,
          color:
          /*color*/
          ctx[4]
        })), listen_dev(a, "MDCIconButtonToggle:change",
        /*handleChange*/
        ctx[11], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[12], dirty, null, null);
        }
      }

      set_attributes(a, a_data = get_spread_update(a_levels, [(!current || dirty &
      /*className, pressed*/
      5 && a_class_value !== (a_class_value = "\n      mdc-icon-button\n      " +
      /*className*/
      ctx[2] + "\n      " + (
      /*pressed*/
      ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (
      /*context*/
      ctx[10] === "card:action" ? "mdc-card__action" : "") + "\n      " + (
      /*context*/
      ctx[10] === "card:action" ? "mdc-card__action--icon" : "") + "\n      " + (
      /*context*/
      ctx[10] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n      " + (
      /*context*/
      ctx[10] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n      " + (
      /*context*/
      ctx[10] === "snackbar" ? "mdc-snackbar__dismiss" : "") + "\n    ")) && {
        class: a_class_value
      }, {
        "aria-hidden": "true"
      }, (!current || dirty &
      /*pressed*/
      1) && {
        "aria-pressed":
        /*pressed*/
        ctx[0]
      }, (!current || dirty &
      /*href*/
      64) && {
        href:
        /*href*/
        ctx[6]
      }, dirty &
      /*props*/
      256 &&
      /*props*/
      ctx[8]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, toggle, color*/
      56) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3] && !
        /*toggle*/
        ctx[5],
        unbounded: true,
        color:
        /*color*/
        ctx[4]
      });
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
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      /*a_binding*/

      ctx[14](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(1:0) {#if href}",
    ctx: ctx
  });
  return block;
}

function create_fragment$5(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*href*/
    ctx[6]) return 0;
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("IconButton", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCIconButtonToggle:change"]);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$ripple = _$$props4.ripple,
      ripple = _$$props4$ripple === void 0 ? true : _$$props4$ripple;
  var _$$props5 = $$props,
      _$$props5$color = _$$props5.color,
      color = _$$props5$color === void 0 ? null : _$$props5$color;
  var _$$props6 = $$props,
      _$$props6$toggle = _$$props6.toggle,
      toggle = _$$props6$toggle === void 0 ? false : _$$props6$toggle;
  var _$$props7 = $$props,
      _$$props7$pressed = _$$props7.pressed,
      pressed = _$$props7$pressed === void 0 ? false : _$$props7$pressed;
  var _$$props8 = $$props,
      _$$props8$href = _$$props8.href,
      href = _$$props8$href === void 0 ? null : _$$props8$href;
  var element;
  var toggleButton;
  var context = getContext("SMUI:icon-button:context");
  setContext("SMUI:icon:context", "icon-button");
  var oldToggle = null;
  onDestroy(function () {
    toggleButton && toggleButton.destroy();
  });

  function handleChange(e) {
    $$invalidate(0, pressed = e.detail.isOn);
  }

  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(7, element);
    });
  }

  function button_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(7, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(4, color = $$new_props.color);
    if ("toggle" in $$new_props) $$invalidate(5, toggle = $$new_props.toggle);
    if ("pressed" in $$new_props) $$invalidate(0, pressed = $$new_props.pressed);
    if ("href" in $$new_props) $$invalidate(6, href = $$new_props.href);
    if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCIconButtonToggle: MDCIconButtonToggle,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      Ripple: Ripple,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      toggle: toggle,
      pressed: pressed,
      href: href,
      element: element,
      toggleButton: toggleButton,
      context: context,
      oldToggle: oldToggle,
      handleChange: handleChange,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(4, color = $$new_props.color);
    if ("toggle" in $$props) $$invalidate(5, toggle = $$new_props.toggle);
    if ("pressed" in $$props) $$invalidate(0, pressed = $$new_props.pressed);
    if ("href" in $$props) $$invalidate(6, href = $$new_props.href);
    if ("element" in $$props) $$invalidate(7, element = $$new_props.element);
    if ("toggleButton" in $$props) $$invalidate(16, toggleButton = $$new_props.toggleButton);
    if ("context" in $$props) $$invalidate(10, context = $$new_props.context);
    if ("oldToggle" in $$props) $$invalidate(17, oldToggle = $$new_props.oldToggle);
    if ("props" in $$props) $$invalidate(8, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(8, props = exclude($$props, ["use", "class", "ripple", "color", "toggle", "pressed", "href"]));

    if ($$self.$$.dirty &
    /*element, toggle, oldToggle, ripple, toggleButton, pressed*/
    196777) {
       if (element && toggle !== oldToggle) {
        if (toggle) {
          $$invalidate(16, toggleButton = new MDCIconButtonToggle(element));

          if (!ripple) {
            toggleButton.ripple.destroy();
          }

          $$invalidate(16, toggleButton.on = pressed, toggleButton);
        } else if (oldToggle) {
          toggleButton && toggleButton.destroy();
          $$invalidate(16, toggleButton = null);
        }

        $$invalidate(17, oldToggle = toggle);
      }
    }

    if ($$self.$$.dirty &
    /*toggleButton, pressed*/
    65537) {
       if (toggleButton && toggleButton.on !== pressed) {
        $$invalidate(16, toggleButton.on = pressed, toggleButton);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [pressed, use, className, ripple, color, toggle, href, element, props, forwardEvents, context, handleChange, $$scope, slots, a_binding, button_binding];
}

var IconButton = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(IconButton, _SvelteComponentDev);

  var _super = _createSuper$6(IconButton);

  function IconButton(options) {
    var _this;

    _classCallCheck(this, IconButton);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      use: 1,
      class: 2,
      ripple: 3,
      color: 4,
      toggle: 5,
      pressed: 0,
      href: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "IconButton",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  _createClass(IconButton, [{
    key: "use",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "toggle",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "pressed",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<IconButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return IconButton;
}(SvelteComponentDev);

var backend = globalThis.backend;

const categories = new Map([
    ["-4", "Any Fish"],
    ["-5", "Egg"],
    ["-6", "Milk"],
    ["-777", "Wild Seeds"],
]);
const locationNames = new Map([
    ["Farm", "Farm"],
    ["UndergroundMine", "Mines"],
    ["Mine", "Mines"],
    ["Desert", "Desert"],
    ["BusStop", "Bus Stop"],
    ["Forest", "Forest"],
    ["Town", "Pelican Town"],
    ["Mountain", "Mountain"],
    ["Backwoods", "Backwoods"],
    ["Railroad", "Railroad"],
    ["Beach", "Beach"],
    ["Woods", "Woods"],
    ["Sewer", "Sewers"],
    ["BugLand", "Bug Land"],
    ["WitchSwamp", "Witch Swamp"],
    ["fishingGame", "Fishing Game"],
    ["Temp", "???"],
]);
const seasonNames = new Map([
    [0, "Spring"],
    [1, "Summer"],
    [2, "Fall"],
    [3, "Winter"],
]);
const weatherNames = new Map([
    ["rainy", "Rain"],
    ["sunny", "Sun"],
]);
const categoryNames = new Map([
    ["shipping", "Items Shipped"],
    ["fish", "Fish"],
    ["artifacts", "Artifacts"],
    ["minerals", "Minerals"],
    ["cooking", "Cooking"],
    ["bundles", "Bundles"],
    ["friendship", "Friendship"],
    ["crafting", "Crafting"],
]);
const qualityNames = new Map([
    [0, "Normal"],
    [1, "Silver"],
    [2, "Gold"],
    [3, "Iridium"],
]);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;
var file$5 = "src/components/ItemInfo.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[7] = list[i][0];
  child_ctx[8] = list[i][1];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[1] = list[i][0];
  child_ctx[11] = list[i][1];
  return child_ctx;
}

function get_each_context_4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[14] = list[i][0];
  child_ctx[11] = list[i][1];
  return child_ctx;
}

function get_each_context_5(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
} // (393:0) {#if typeof item !== 'undefined'}


function create_if_block$1(ctx) {
  var div1;
  var div0;
  var img;
  var img_src_value;
  var img_alt_value;
  var img_height_value;
  var t0;
  var t1_value =
  /*item*/
  ctx[0].name + "";
  var t1;
  var t2;
  var iconbutton;
  var t3;
  var div2;
  var t4;
  var t5;
  var t6;
  var current;
  iconbutton = new IconButton({
    props: {
      class: "material-icons",
      href:
      /*item*/
      ctx[0].url,
      target: "_blank",
      $$slots: {
        default: [create_default_slot$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var if_block0 = typeof
  /*item*/
  ctx[0].seasons !== "undefined" && create_if_block_12(ctx);
  var if_block1 = (typeof
  /*item*/
  ctx[0].sources !== "undefined" || typeof
  /*item*/
  ctx[0].monsterDrops !== "undefined" || typeof
  /*item*/
  ctx[0].artifactSpots !== "undefined") && create_if_block_7(ctx);
  var if_block2 = typeof
  /*item*/
  ctx[0].ingredients !== "undefined" && create_if_block_4(ctx);
  var if_block3 = typeof
  /*item*/
  ctx[0].locations !== "undefined" && create_if_block_1(ctx);
  var block = {
    c: function create() {
      div1 = element("div");
      div0 = element("div");
      img = element("img");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      create_component(iconbutton.$$.fragment);
      t3 = space();
      div2 = element("div");
      if (if_block0) if_block0.c();
      t4 = space();
      if (if_block1) if_block1.c();
      t5 = space();
      if (if_block2) if_block2.c();
      t6 = space();
      if (if_block3) if_block3.c();
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      img = claim_element(div0_nodes, "IMG", {
        class: true,
        src: true,
        alt: true,
        height: true
      });
      t0 = claim_space(div0_nodes);
      t1 = claim_text(div0_nodes, t1_value);
      t2 = claim_space(div0_nodes);
      claim_component(iconbutton.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      div1_nodes.forEach(detach_dev);
      t3 = claim_space(nodes);
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      if (if_block0) if_block0.l(div2_nodes);
      t4 = claim_space(div2_nodes);
      if (if_block1) if_block1.l(div2_nodes);
      t5 = claim_space(div2_nodes);
      if (if_block2) if_block2.l(div2_nodes);
      t6 = claim_space(div2_nodes);
      if (if_block3) if_block3.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "class", "dialog-icon svelte-c4hccs");
      if (img.src !== (img_src_value = "data:image/png;base64," +
      /*item*/
      ctx[0].sprite)) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value =
      /*item*/
      ctx[0].name);
      attr_dev(img, "height", img_height_value =
      /*item*/
      ctx[0].isCraftable ? 64 : 48);
      add_location(img, file$5, 395, 6, 9258);
      attr_dev(div0, "class", "header svelte-c4hccs");
      add_location(div0, file$5, 394, 4, 9231);
      attr_dev(div1, "class", "mdc-dialog__title svelte-c4hccs");
      add_location(div1, file$5, 393, 2, 9195);
      attr_dev(div2, "class", "mdc-dialog__content content svelte-c4hccs");
      add_location(div2, file$5, 406, 2, 9561);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, div0);
      append_dev(div0, img);
      append_dev(div0, t0);
      append_dev(div0, t1);
      append_dev(div0, t2);
      mount_component(iconbutton, div0, null);
      insert_dev(target, t3, anchor);
      insert_dev(target, div2, anchor);
      if (if_block0) if_block0.m(div2, null);
      append_dev(div2, t4);
      if (if_block1) if_block1.m(div2, null);
      append_dev(div2, t5);
      if (if_block2) if_block2.m(div2, null);
      append_dev(div2, t6);
      if (if_block3) if_block3.m(div2, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty &
      /*item*/
      1 && img.src !== (img_src_value = "data:image/png;base64," +
      /*item*/
      ctx[0].sprite)) {
        attr_dev(img, "src", img_src_value);
      }

      if (!current || dirty &
      /*item*/
      1 && img_alt_value !== (img_alt_value =
      /*item*/
      ctx[0].name)) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (!current || dirty &
      /*item*/
      1 && img_height_value !== (img_height_value =
      /*item*/
      ctx[0].isCraftable ? 64 : 48)) {
        attr_dev(img, "height", img_height_value);
      }

      if ((!current || dirty &
      /*item*/
      1) && t1_value !== (t1_value =
      /*item*/
      ctx[0].name + "")) set_data_dev(t1, t1_value);
      var iconbutton_changes = {};
      if (dirty &
      /*item*/
      1) iconbutton_changes.href =
      /*item*/
      ctx[0].url;

      if (dirty &
      /*$$scope*/
      524288) {
        iconbutton_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbutton.$set(iconbutton_changes);

      if (typeof
      /*item*/
      ctx[0].seasons !== "undefined") {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_12(ctx);
          if_block0.c();
          if_block0.m(div2, t4);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (typeof
      /*item*/
      ctx[0].sources !== "undefined" || typeof
      /*item*/
      ctx[0].monsterDrops !== "undefined" || typeof
      /*item*/
      ctx[0].artifactSpots !== "undefined") {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_7(ctx);
          if_block1.c();
          if_block1.m(div2, t5);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (typeof
      /*item*/
      ctx[0].ingredients !== "undefined") {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_4(ctx);
          if_block2.c();
          if_block2.m(div2, t6);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (typeof
      /*item*/
      ctx[0].locations !== "undefined") {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block_1(ctx);
          if_block3.c();
          if_block3.m(div2, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      destroy_component(iconbutton);
      if (detaching) detach_dev(t3);
      if (detaching) detach_dev(div2);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(393:0) {#if typeof item !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (402:6) <IconButton class="material-icons" href={item.url} target="_blank">


function create_default_slot$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("launch");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "launch");
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
    id: create_default_slot$1.name,
    type: "slot",
    source: "(402:6) <IconButton class=\\\"material-icons\\\" href={item.url} target=\\\"_blank\\\">",
    ctx: ctx
  });
  return block;
} // (408:4) {#if typeof item.seasons !== 'undefined'}


function create_if_block_12(ctx) {
  var div;
  var h2;
  var t0;
  var t1;
  var ul;
  var show_if_3 =
  /*item*/
  ctx[0].seasons.includes("spring");
  var t2;
  var show_if_2 =
  /*item*/
  ctx[0].seasons.includes("summer");
  var t3;
  var show_if_1 =
  /*item*/
  ctx[0].seasons.includes("fall");
  var t4;
  var show_if =
  /*item*/
  ctx[0].seasons.includes("winter");
  var if_block0 = show_if_3 && create_if_block_16(ctx);
  var if_block1 = show_if_2 && create_if_block_15(ctx);
  var if_block2 = show_if_1 && create_if_block_14(ctx);
  var if_block3 = show_if && create_if_block_13(ctx);
  var block = {
    c: function create() {
      div = element("div");
      h2 = element("h2");
      t0 = text("Seasons");
      t1 = space();
      ul = element("ul");
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      t4 = space();
      if (if_block3) if_block3.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Seasons");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      ul = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      if (if_block0) if_block0.l(ul_nodes);
      t2 = claim_space(ul_nodes);
      if (if_block1) if_block1.l(ul_nodes);
      t3 = claim_space(ul_nodes);
      if (if_block2) if_block2.l(ul_nodes);
      t4 = claim_space(ul_nodes);
      if (if_block3) if_block3.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-c4hccs");
      add_location(h2, file$5, 409, 8, 9710);
      attr_dev(ul, "class", "svelte-c4hccs");
      add_location(ul, file$5, 410, 8, 9735);
      attr_dev(div, "class", "mdc-card section section seasons svelte-c4hccs");
      add_location(div, file$5, 408, 6, 9655);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t0);
      append_dev(div, t1);
      append_dev(div, ul);
      if (if_block0) if_block0.m(ul, null);
      append_dev(ul, t2);
      if (if_block1) if_block1.m(ul, null);
      append_dev(ul, t3);
      if (if_block2) if_block2.m(ul, null);
      append_dev(ul, t4);
      if (if_block3) if_block3.m(ul, null);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1) show_if_3 =
      /*item*/
      ctx[0].seasons.includes("spring");

      if (show_if_3) {
        if (if_block0) ; else {
          if_block0 = create_if_block_16(ctx);
          if_block0.c();
          if_block0.m(ul, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (dirty &
      /*item*/
      1) show_if_2 =
      /*item*/
      ctx[0].seasons.includes("summer");

      if (show_if_2) {
        if (if_block1) ; else {
          if_block1 = create_if_block_15(ctx);
          if_block1.c();
          if_block1.m(ul, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (dirty &
      /*item*/
      1) show_if_1 =
      /*item*/
      ctx[0].seasons.includes("fall");

      if (show_if_1) {
        if (if_block2) ; else {
          if_block2 = create_if_block_14(ctx);
          if_block2.c();
          if_block2.m(ul, t4);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (dirty &
      /*item*/
      1) show_if =
      /*item*/
      ctx[0].seasons.includes("winter");

      if (show_if) {
        if (if_block3) ; else {
          if_block3 = create_if_block_13(ctx);
          if_block3.c();
          if_block3.m(ul, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_12.name,
    type: "if",
    source: "(408:4) {#if typeof item.seasons !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (412:10) {#if item.seasons.includes('spring')}


function create_if_block_16(ctx) {
  var li;
  var img;
  var img_src_value;
  var t;
  var block = {
    c: function create() {
      li = element("li");
      img = element("img");
      t = text("\n              Spring");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      img = claim_element(li_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t = claim_text(li_nodes, "\n              Spring");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "spring.png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "Spring");
      attr_dev(img, "class", "svelte-c4hccs");
      add_location(img, file$5, 413, 14, 9819);
      add_location(li, file$5, 412, 12, 9800);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, img);
      append_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_16.name,
    type: "if",
    source: "(412:10) {#if item.seasons.includes('spring')}",
    ctx: ctx
  });
  return block;
} // (418:10) {#if item.seasons.includes('summer')}


function create_if_block_15(ctx) {
  var li;
  var img;
  var img_src_value;
  var t;
  var block = {
    c: function create() {
      li = element("li");
      img = element("img");
      t = text("\n              Summer");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      img = claim_element(li_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t = claim_text(li_nodes, "\n              Summer");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "summer.png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "Summer");
      attr_dev(img, "class", "svelte-c4hccs");
      add_location(img, file$5, 419, 14, 9991);
      add_location(li, file$5, 418, 12, 9972);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, img);
      append_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_15.name,
    type: "if",
    source: "(418:10) {#if item.seasons.includes('summer')}",
    ctx: ctx
  });
  return block;
} // (424:10) {#if item.seasons.includes('fall')}


function create_if_block_14(ctx) {
  var li;
  var img;
  var img_src_value;
  var t;
  var block = {
    c: function create() {
      li = element("li");
      img = element("img");
      t = text("\n              Fall");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      img = claim_element(li_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t = claim_text(li_nodes, "\n              Fall");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "fall.png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "Fall");
      attr_dev(img, "class", "svelte-c4hccs");
      add_location(img, file$5, 425, 14, 10161);
      add_location(li, file$5, 424, 12, 10142);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, img);
      append_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_14.name,
    type: "if",
    source: "(424:10) {#if item.seasons.includes('fall')}",
    ctx: ctx
  });
  return block;
} // (430:10) {#if item.seasons.includes('winter')}


function create_if_block_13(ctx) {
  var li;
  var img;
  var img_src_value;
  var t;
  var block = {
    c: function create() {
      li = element("li");
      img = element("img");
      t = text("\n              Winter");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      img = claim_element(li_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t = claim_text(li_nodes, "\n              Winter");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "winter.png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "Winter");
      attr_dev(img, "class", "svelte-c4hccs");
      add_location(img, file$5, 431, 14, 10327);
      add_location(li, file$5, 430, 12, 10308);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, img);
      append_dev(li, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_13.name,
    type: "if",
    source: "(430:10) {#if item.seasons.includes('winter')}",
    ctx: ctx
  });
  return block;
} // (440:4) {#if typeof item.sources !== 'undefined' || typeof item.monsterDrops !== 'undefined' || typeof item.artifactSpots !== 'undefined'}


function create_if_block_7(ctx) {
  var div;
  var t;
  var if_block0 = (typeof
  /*item*/
  ctx[0].sources !== "undefined" || typeof
  /*item*/
  ctx[0].monsterDrops !== "undefined") && create_if_block_9(ctx);
  var if_block1 = typeof
  /*item*/
  ctx[0].artifactSpots !== "undefined" && create_if_block_8(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "mdc-card section svelte-c4hccs");
      add_location(div, file$5, 440, 6, 10599);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      if (if_block1) if_block1.m(div, null);
    },
    p: function update(ctx, dirty) {
      if (typeof
      /*item*/
      ctx[0].sources !== "undefined" || typeof
      /*item*/
      ctx[0].monsterDrops !== "undefined") {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_9(ctx);
          if_block0.c();
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (typeof
      /*item*/
      ctx[0].artifactSpots !== "undefined") {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_8(ctx);
          if_block1.c();
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_7.name,
    type: "if",
    source: "(440:4) {#if typeof item.sources !== 'undefined' || typeof item.monsterDrops !== 'undefined' || typeof item.artifactSpots !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (442:8) {#if typeof item.sources !== 'undefined' || typeof item.monsterDrops !== 'undefined'}


function create_if_block_9(ctx) {
  var h2;
  var t0;
  var t1;
  var ul;
  var t2;
  var if_block0 = typeof
  /*item*/
  ctx[0].sources !== "undefined" && create_if_block_11(ctx);
  var if_block1 = typeof
  /*item*/
  ctx[0].monsterDrops !== "undefined" && create_if_block_10(ctx);
  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("Sources");
      t1 = space();
      ul = element("ul");
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Sources");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);
      if (if_block0) if_block0.l(ul_nodes);
      t2 = claim_space(ul_nodes);
      if (if_block1) if_block1.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-c4hccs");
      add_location(h2, file$5, 442, 10, 10734);
      attr_dev(ul, "class", "svelte-c4hccs");
      add_location(ul, file$5, 443, 10, 10761);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, ul, anchor);
      if (if_block0) if_block0.m(ul, null);
      append_dev(ul, t2);
      if (if_block1) if_block1.m(ul, null);
    },
    p: function update(ctx, dirty) {
      if (typeof
      /*item*/
      ctx[0].sources !== "undefined") {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_11(ctx);
          if_block0.c();
          if_block0.m(ul, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (typeof
      /*item*/
      ctx[0].monsterDrops !== "undefined") {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_10(ctx);
          if_block1.c();
          if_block1.m(ul, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(ul);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_9.name,
    type: "if",
    source: "(442:8) {#if typeof item.sources !== 'undefined' || typeof item.monsterDrops !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (445:12) {#if typeof item.sources !== 'undefined'}


function create_if_block_11(ctx) {
  var each_1_anchor;
  var each_value_5 =
  /*item*/
  ctx[0].sources;
  validate_each_argument(each_value_5);
  var each_blocks = [];

  for (var i = 0; i < each_value_5.length; i += 1) {
    each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
  }

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1) {
        each_value_5 =
        /*item*/
        ctx[0].sources;
        validate_each_argument(each_value_5);

        var _i4;

        for (_i4 = 0; _i4 < each_value_5.length; _i4 += 1) {
          var child_ctx = get_each_context_5(ctx, each_value_5, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_5(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_5.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_11.name,
    type: "if",
    source: "(445:12) {#if typeof item.sources !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (446:14) {#each item.sources as source}


function create_each_block_5(ctx) {
  var li;
  var t_value =
  /*source*/
  ctx[4] + "";
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
      add_location(li, file$5, 446, 16, 10881);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t_value !== (t_value =
      /*source*/
      ctx[4] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_5.name,
    type: "each",
    source: "(446:14) {#each item.sources as source}",
    ctx: ctx
  });
  return block;
} // (450:12) {#if typeof item.monsterDrops !== 'undefined'}


function create_if_block_10(ctx) {
  var each_1_anchor;
  var each_value_4 = Object.entries(
  /*item*/
  ctx[0].monsterDrops);
  validate_each_argument(each_value_4);
  var each_blocks = [];

  for (var i = 0; i < each_value_4.length; i += 1) {
    each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
  }

  var block = {
    c: function create() {
      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*calcProbability, Object, item*/
      1) {
        each_value_4 = Object.entries(
        /*item*/
        ctx[0].monsterDrops);
        validate_each_argument(each_value_4);

        var _i8;

        for (_i8 = 0; _i8 < each_value_4.length; _i8 += 1) {
          var child_ctx = get_each_context_4(ctx, each_value_4, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_4(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_4.length;
      }
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_10.name,
    type: "if",
    source: "(450:12) {#if typeof item.monsterDrops !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (451:14) {#each Object.entries(item.monsterDrops) as [monster, probability]}


function create_each_block_4(ctx) {
  var li;
  var t0_value =
  /*monster*/
  ctx[14] + "";
  var t0;
  var t1;
  var t2_value = calcProbability(
  /*probability*/
  ctx[11]) + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(" (");
      t2 = text(t2_value);
      t3 = text("%)");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_text(li_nodes, " (");
      t2 = claim_text(li_nodes, t2_value);
      t3 = claim_text(li_nodes, "%)");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$5, 451, 16, 11096);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t0);
      append_dev(li, t1);
      append_dev(li, t2);
      append_dev(li, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t0_value !== (t0_value =
      /*monster*/
      ctx[14] + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*item*/
      1 && t2_value !== (t2_value = calcProbability(
      /*probability*/
      ctx[11]) + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_4.name,
    type: "each",
    source: "(451:14) {#each Object.entries(item.monsterDrops) as [monster, probability]}",
    ctx: ctx
  });
  return block;
} // (458:8) {#if typeof item.artifactSpots !== 'undefined'}


function create_if_block_8(ctx) {
  var h2;
  var t0;
  var t1;
  var ul;
  var each_value_3 = Object.entries(
  /*item*/
  ctx[0].artifactSpots);
  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("Artifact Spots");
      t1 = space();
      ul = element("ul");

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Artifact Spots");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-c4hccs");
      add_location(h2, file$5, 458, 10, 11286);
      attr_dev(ul, "class", "svelte-c4hccs");
      add_location(ul, file$5, 459, 10, 11320);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, ul, anchor);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*calcProbability, Object, item, locationNames*/
      1) {
        each_value_3 = Object.entries(
        /*item*/
        ctx[0].artifactSpots);
        validate_each_argument(each_value_3);

        var _i12;

        for (_i12 = 0; _i12 < each_value_3.length; _i12 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block_3(child_ctx);

            each_blocks[_i12].c();

            each_blocks[_i12].m(ul, null);
          }
        }

        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }

        each_blocks.length = each_value_3.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_8.name,
    type: "if",
    source: "(458:8) {#if typeof item.artifactSpots !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (461:12) {#each Object.entries(item.artifactSpots) as [location, probability]}


function create_each_block_3(ctx) {
  var li;
  var t0_value = locationNames.get(
  /*location*/
  ctx[1]) + "";
  var t0;
  var t1;
  var t2_value = calcProbability(
  /*probability*/
  ctx[11]) + "";
  var t2;
  var t3;
  var block = {
    c: function create() {
      li = element("li");
      t0 = text(t0_value);
      t1 = text(" (");
      t2 = text(t2_value);
      t3 = text("%)\n              ");
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_text(li_nodes, " (");
      t2 = claim_text(li_nodes, t2_value);
      t3 = claim_text(li_nodes, "%)\n              ");
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$5, 461, 14, 11421);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t0);
      append_dev(li, t1);
      append_dev(li, t2);
      append_dev(li, t3);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t0_value !== (t0_value = locationNames.get(
      /*location*/
      ctx[1]) + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*item*/
      1 && t2_value !== (t2_value = calcProbability(
      /*probability*/
      ctx[11]) + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(461:12) {#each Object.entries(item.artifactSpots) as [location, probability]}",
    ctx: ctx
  });
  return block;
} // (471:4) {#if typeof item.ingredients !== 'undefined'}


function create_if_block_4(ctx) {
  var div;
  var h2;
  var t0;
  var t1;
  var ul;
  var t2;
  var each_value_2 = Object.entries(
  /*item*/
  ctx[0].ingredients);
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var if_block = typeof
  /*item*/
  ctx[0].recipeSources !== "undefined" && create_if_block_5(ctx);
  var block = {
    c: function create() {
      div = element("div");
      h2 = element("h2");
      t0 = text("Ingredients");
      t1 = space();
      ul = element("ul");

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }

      t2 = space();
      if (if_block) if_block.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Ingredients");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      ul = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      if (if_block) if_block.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-c4hccs");
      add_location(h2, file$5, 472, 8, 11695);
      attr_dev(ul, "class", "svelte-c4hccs");
      add_location(ul, file$5, 473, 8, 11724);
      attr_dev(div, "class", "mdc-card section svelte-c4hccs");
      add_location(div, file$5, 471, 6, 11656);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t0);
      append_dev(div, t1);
      append_dev(div, ul);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].m(ul, null);
      }

      append_dev(div, t2);
      if (if_block) if_block.m(div, null);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*Object, item, categories, gameInfo*/
      1) {
        each_value_2 = Object.entries(
        /*item*/
        ctx[0].ingredients);
        validate_each_argument(each_value_2);

        var _i16;

        for (_i16 = 0; _i16 < each_value_2.length; _i16 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i16);

          if (each_blocks[_i16]) {
            each_blocks[_i16].p(child_ctx, dirty);
          } else {
            each_blocks[_i16] = create_each_block_2(child_ctx);

            each_blocks[_i16].c();

            each_blocks[_i16].m(ul, null);
          }
        }

        for (; _i16 < each_blocks.length; _i16 += 1) {
          each_blocks[_i16].d(1);
        }

        each_blocks.length = each_value_2.length;
      }

      if (typeof
      /*item*/
      ctx[0].recipeSources !== "undefined") {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_5(ctx);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(471:4) {#if typeof item.ingredients !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (478:14) {#if quantity > 1}


function create_if_block_6(ctx) {
  var t0;
  var t1_value =
  /*quantity*/
  ctx[8] + "";
  var t1;
  var block = {
    c: function create() {
      t0 = text("× ");
      t1 = text(t1_value);
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, "× ");
      t1 = claim_text(nodes, t1_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t1_value !== (t1_value =
      /*quantity*/
      ctx[8] + "")) set_data_dev(t1, t1_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(478:14) {#if quantity > 1}",
    ctx: ctx
  });
  return block;
} // (475:10) {#each Object.entries(item.ingredients) as [id, quantity]}


function create_each_block_2(ctx) {
  var li;
  var t0_value = (categories.get(
  /*id*/
  ctx[7]) || gameInfo.items[
  /*id*/
  ctx[7]].name) + "";
  var t0;
  var t1;
  var t2;
  var if_block =
  /*quantity*/
  ctx[8] > 1 && create_if_block_6(ctx);
  var block = {
    c: function create() {
      li = element("li");
      t0 = text(t0_value);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      t0 = claim_text(li_nodes, t0_value);
      t1 = claim_space(li_nodes);
      if (if_block) if_block.l(li_nodes);
      t2 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$5, 475, 12, 11810);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t0);
      append_dev(li, t1);
      if (if_block) if_block.m(li, null);
      append_dev(li, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t0_value !== (t0_value = (categories.get(
      /*id*/
      ctx[7]) || gameInfo.items[
      /*id*/
      ctx[7]].name) + "")) set_data_dev(t0, t0_value);

      if (
      /*quantity*/
      ctx[8] > 1) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_6(ctx);
          if_block.c();
          if_block.m(li, t2);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(475:10) {#each Object.entries(item.ingredients) as [id, quantity]}",
    ctx: ctx
  });
  return block;
} // (483:8) {#if typeof item.recipeSources !== 'undefined'}


function create_if_block_5(ctx) {
  var h2;
  var t0;
  var t1;
  var ul;
  var each_value_1 =
  /*item*/
  ctx[0].recipeSources;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("Recipe Sources");
      t1 = space();
      ul = element("ul");

      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Recipe Sources");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        each_blocks[_i18].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-c4hccs");
      add_location(h2, file$5, 483, 10, 12044);
      attr_dev(ul, "class", "svelte-c4hccs");
      add_location(ul, file$5, 484, 10, 12078);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      insert_dev(target, t1, anchor);
      insert_dev(target, ul, anchor);

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(ul, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1) {
        each_value_1 =
        /*item*/
        ctx[0].recipeSources;
        validate_each_argument(each_value_1);

        var _i20;

        for (_i20 = 0; _i20 < each_value_1.length; _i20 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i20);

          if (each_blocks[_i20]) {
            each_blocks[_i20].p(child_ctx, dirty);
          } else {
            each_blocks[_i20] = create_each_block_1(child_ctx);

            each_blocks[_i20].c();

            each_blocks[_i20].m(ul, null);
          }
        }

        for (; _i20 < each_blocks.length; _i20 += 1) {
          each_blocks[_i20].d(1);
        }

        each_blocks.length = each_value_1.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(483:8) {#if typeof item.recipeSources !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (486:12) {#each item.recipeSources as source}


function create_each_block_1(ctx) {
  var li;
  var t_value =
  /*source*/
  ctx[4] + "";
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
      add_location(li, file$5, 486, 14, 12146);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t_value !== (t_value =
      /*source*/
      ctx[4] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(486:12) {#each item.recipeSources as source}",
    ctx: ctx
  });
  return block;
} // (494:4) {#if typeof item.locations !== 'undefined'}


function create_if_block_1(ctx) {
  var div;
  var h2;
  var t0;
  var t1;
  var ul;
  var t2;
  var t3;
  var each_value =
  /*item*/
  ctx[0].locations;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var if_block0 = typeof
  /*item*/
  ctx[0].time !== "undefined" &&
  /*item*/
  ctx[0].time !== "6AM – 2AM" && create_if_block_3(ctx);
  var if_block1 = typeof
  /*item*/
  ctx[0].weather !== "undefined" &&
  /*item*/
  ctx[0].weather !== "both" && create_if_block_2(ctx);
  var block = {
    c: function create() {
      div = element("div");
      h2 = element("h2");
      t0 = text("Found in");
      t1 = space();
      ul = element("ul");

      for (var _i21 = 0; _i21 < each_blocks.length; _i21 += 1) {
        each_blocks[_i21].c();
      }

      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      h2 = claim_element(div_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Found in");
      h2_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      ul = claim_element(div_nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i22 = 0; _i22 < each_blocks.length; _i22 += 1) {
        each_blocks[_i22].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      if (if_block0) if_block0.l(div_nodes);
      t3 = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h2, "class", "svelte-c4hccs");
      add_location(h2, file$5, 495, 8, 12331);
      attr_dev(ul, "class", "svelte-c4hccs");
      add_location(ul, file$5, 496, 8, 12357);
      attr_dev(div, "class", "mdc-card section svelte-c4hccs");
      add_location(div, file$5, 494, 6, 12292);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h2);
      append_dev(h2, t0);
      append_dev(div, t1);
      append_dev(div, ul);

      for (var _i23 = 0; _i23 < each_blocks.length; _i23 += 1) {
        each_blocks[_i23].m(ul, null);
      }

      append_dev(div, t2);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t3);
      if (if_block1) if_block1.m(div, null);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1) {
        each_value =
        /*item*/
        ctx[0].locations;
        validate_each_argument(each_value);

        var _i24;

        for (_i24 = 0; _i24 < each_value.length; _i24 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i24);

          if (each_blocks[_i24]) {
            each_blocks[_i24].p(child_ctx, dirty);
          } else {
            each_blocks[_i24] = create_each_block(child_ctx);

            each_blocks[_i24].c();

            each_blocks[_i24].m(ul, null);
          }
        }

        for (; _i24 < each_blocks.length; _i24 += 1) {
          each_blocks[_i24].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (typeof
      /*item*/
      ctx[0].time !== "undefined" &&
      /*item*/
      ctx[0].time !== "6AM – 2AM") {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          if_block0.m(div, t3);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (typeof
      /*item*/
      ctx[0].weather !== "undefined" &&
      /*item*/
      ctx[0].weather !== "both") {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2(ctx);
          if_block1.c();
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(494:4) {#if typeof item.locations !== 'undefined'}",
    ctx: ctx
  });
  return block;
} // (498:10) {#each item.locations as location}


function create_each_block(ctx) {
  var li;
  var t_value =
  /*location*/
  ctx[1] + "";
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
      add_location(li, file$5, 498, 12, 12419);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t_value !== (t_value =
      /*location*/
      ctx[1] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(498:10) {#each item.locations as location}",
    ctx: ctx
  });
  return block;
} // (502:8) {#if typeof item.time !== 'undefined' && item.time !== '6AM – 2AM'}


function create_if_block_3(ctx) {
  var p;
  var t_value =
  /*item*/
  ctx[0].time + "";
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "svelte-c4hccs");
      add_location(p, file$5, 502, 10, 12557);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && t_value !== (t_value =
      /*item*/
      ctx[0].time + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(502:8) {#if typeof item.time !== 'undefined' && item.time !== '6AM – 2AM'}",
    ctx: ctx
  });
  return block;
} // (505:8) {#if typeof item.weather !== 'undefined' && item.weather !== 'both'}


function create_if_block_2(ctx) {
  var p;
  var img;
  var img_src_value;
  var img_alt_value;
  var t0;
  var t1_value = weatherNames.get(
  /*item*/
  ctx[0].weather) + "";
  var t1;
  var block = {
    c: function create() {
      p = element("p");
      img = element("img");
      t0 = space();
      t1 = text(t1_value);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      img = claim_element(p_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      t0 = claim_space(p_nodes);
      t1 = claim_text(p_nodes, t1_value);
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "" + (
      /*item*/
      ctx[0].weather + ".png"))) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value = weatherNames.get(
      /*item*/
      ctx[0].weather));
      attr_dev(img, "class", "svelte-c4hccs");
      add_location(img, file$5, 506, 12, 12693);
      attr_dev(p, "class", "svelte-c4hccs");
      add_location(p, file$5, 505, 10, 12677);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, img);
      append_dev(p, t0);
      append_dev(p, t1);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*item*/
      1 && img.src !== (img_src_value = "" + (
      /*item*/
      ctx[0].weather + ".png"))) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*item*/
      1 && img_alt_value !== (img_alt_value = weatherNames.get(
      /*item*/
      ctx[0].weather))) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*item*/
      1 && t1_value !== (t1_value = weatherNames.get(
      /*item*/
      ctx[0].weather) + "")) set_data_dev(t1, t1_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(505:8) {#if typeof item.weather !== 'undefined' && item.weather !== 'both'}",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var if_block_anchor;
  var current;
  var if_block = typeof
  /*item*/
  ctx[0] !== "undefined" && create_if_block$1(ctx);
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
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (typeof
      /*item*/
      ctx[0] !== "undefined") {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*item*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx);
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
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function calcProbability(probability) {
  return Math.round((probability + Number.EPSILON) * 10000000) / 100000;
}

function instance$6($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ItemInfo", slots, []);
  var item = $$props.item;
  var writable_props = ["item"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ItemInfo> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("item" in $$props) $$invalidate(0, item = $$props.item);
  };

  $$self.$capture_state = function () {
    return {
      IconButton: IconButton,
      gameInfo: gameInfo,
      categories: categories,
      locationNames: locationNames,
      weatherNames: weatherNames,
      item: item,
      calcProbability: calcProbability
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("item" in $$props) $$invalidate(0, item = $$props.item);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [item];
}

var ItemInfo = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ItemInfo, _SvelteComponentDev);

  var _super = _createSuper$7(ItemInfo);

  function ItemInfo(options) {
    var _this;

    _classCallCheck(this, ItemInfo);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      item: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ItemInfo",
      options: options,
      id: create_fragment$6.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*item*/
    ctx[0] === undefined && !("item" in props)) {
      console.warn("<ItemInfo> was created without expected prop 'item'");
    }

    return _this;
  }

  _createClass(ItemInfo, [{
    key: "item",
    get: function get() {
      throw new Error("<ItemInfo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ItemInfo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ItemInfo;
}(SvelteComponentDev);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var css_248z$2 = ".mdc-button{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.0892857143em;text-decoration:none;text-transform:uppercase;padding:0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;height:36px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:hidden;vertical-align:middle;border-radius:4px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{background-color:transparent;color:rgba(0,0,0,.37);cursor:default;pointer-events:none}.mdc-button.mdc-button--dense{border-radius:4px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}.mdc-button .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button .mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button__label+.mdc-button__icon{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--outlined .mdc-button__icon,.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--outlined .mdc-button__icon[dir=rtl],.mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--outlined .mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12);color:rgba(0,0,0,.37)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary,#fff)}.mdc-button--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow .28s cubic-bezier(.4,0,.2,1)}.mdc-button--raised:focus,.mdc-button--raised:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mdc-button--outlined{border-style:solid;padding:0 15px;border-width:1px}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.37)}.mdc-button--outlined:not(:disabled){border-color:#6200ee;border-color:var(--mdc-theme-primary,#6200ee)}.mdc-button--dense{height:32px;font-size:.8125rem}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-button:after,.mdc-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-button:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-button.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-button.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-button.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button:after,.mdc-button:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-button:after,.mdc-button:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-button:after,.mdc-button:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-button:hover:before{opacity:.04}.mdc-button.mdc-ripple-upgraded--background-focused:before,.mdc-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-button--raised:after,.mdc-button--raised:before,.mdc-button--unelevated:after,.mdc-button--unelevated:before{background-color:#fff}@supports not (-ms-ime-align:auto){.mdc-button--raised:after,.mdc-button--raised:before,.mdc-button--unelevated:after,.mdc-button--unelevated:before{background-color:var(--mdc-theme-on-primary,#fff)}}.mdc-button--raised:hover:before,.mdc-button--unelevated:hover:before{opacity:.08}.mdc-button--raised.mdc-ripple-upgraded--background-focused:before,.mdc-button--raised:not(.mdc-ripple-upgraded):focus:before,.mdc-button--unelevated.mdc-ripple-upgraded--background-focused:before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-button--raised:not(.mdc-ripple-upgraded):after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active:after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-button--raised.mdc-ripple-upgraded,.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-button--color-secondary:not(:disabled){color:#018786;color:var(--mdc-theme-secondary,#018786)}.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){background-color:#018786}@supports not (-ms-ime-align:auto){.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-secondary,#018786)}}.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-secondary,#fff)}.smui-button--color-secondary.mdc-button--outlined:not(:disabled){border-color:#018786;border-color:var(--mdc-theme-secondary,#018786)}.smui-button--color-secondary:after,.smui-button--color-secondary:before{background-color:#018786}@supports not (-ms-ime-align:auto){.smui-button--color-secondary:after,.smui-button--color-secondary:before{background-color:var(--mdc-theme-secondary,#018786)}}.smui-button--color-secondary:hover:before{opacity:.04}.smui-button--color-secondary.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.smui-button--color-secondary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-button--color-secondary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.smui-button--color-secondary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-button--color-secondary.mdc-button--raised:after,.smui-button--color-secondary.mdc-button--raised:before,.smui-button--color-secondary.mdc-button--unelevated:after,.smui-button--color-secondary.mdc-button--unelevated:before{background-color:#fff}@supports not (-ms-ime-align:auto){.smui-button--color-secondary.mdc-button--raised:after,.smui-button--color-secondary.mdc-button--raised:before,.smui-button--color-secondary.mdc-button--unelevated:after,.smui-button--color-secondary.mdc-button--unelevated:before{background-color:var(--mdc-theme-on-secondary,#fff)}}.smui-button--color-secondary.mdc-button--raised:hover:before,.smui-button--color-secondary.mdc-button--unelevated:hover:before{opacity:.08}.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):focus:before,.smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):after,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):active:after,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded,.smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-button__group{display:inline-flex}.smui-button__group>.mdc-button,.smui-button__group>.smui-button__group-item>.mdc-button{margin-left:0;margin-right:0}.smui-button__group>.mdc-button:not(:last-child),.smui-button__group>.smui-button__group-item:not(:last-child)>.mdc-button{border-top-right-radius:0;border-bottom-right-radius:0}.smui-button__group>.mdc-button:not(:first-child),.smui-button__group>.smui-button__group-item:not(:first-child)>.mdc-button{border-top-left-radius:0;border-bottom-left-radius:0}.smui-button__group.smui-button__group--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--raised,.smui-button__group>.smui-button__group-item>.mdc-button--raised{border-radius:4px;box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--raised.mdc-button--dense,.smui-button__group>.smui-button__group-item>.mdc-button--raised.mdc-button--dense{border-radius:4px}.smui-button__group>.mdc-button--raised:active,.smui-button__group>.mdc-button--raised:disabled,.smui-button__group>.mdc-button--raised:focus,.smui-button__group>.mdc-button--raised:hover,.smui-button__group>.smui-button__group-item>.mdc-button--raised:active,.smui-button__group>.smui-button__group-item>.mdc-button--raised:disabled,.smui-button__group>.smui-button__group-item>.mdc-button--raised:focus,.smui-button__group>.smui-button__group-item>.mdc-button--raised:hover{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--outlined:not(:last-child),.smui-button__group>.smui-button__group-item:not(:last-child)>.mdc-button--outlined{border-right-width:0}";
styleInject(css_248z$2);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "node_modules/@smui/common/A.svelte";

function create_fragment$7(ctx) {
  var a;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[5].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[4], null);
  var a_levels = [{
    href:
    /*href*/
    ctx[1]
  }, exclude(
  /*$$props*/
  ctx[3], ["use", "href"])];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$6, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, a,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[2].call(null, a))];
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

      set_attributes(a, a_data = get_spread_update(a_levels, [(!current || dirty &
      /*href*/
      2) && {
        href:
        /*href*/
        ctx[1]
      }, dirty &
      /*$$props*/
      8 && exclude(
      /*$$props*/
      ctx[3], ["use", "href"])]));
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
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("A", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$href = _$$props3.href,
      href = _$$props3$href === void 0 ? "javascript:void(0);" : _$$props3$href;

  $$self.$$set = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
    if ("$$scope" in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      href: href
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, href, forwardEvents, $$props, $$scope, slots];
}

var A = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(A, _SvelteComponentDev);

  var _super = _createSuper$8(A);

  function A(options) {
    var _this;

    _classCallCheck(this, A);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {
      use: 0,
      href: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "A",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }

  _createClass(A, [{
    key: "use",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<A>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<A>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return A;
}(SvelteComponentDev);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "node_modules/@smui/common/Button.svelte";

function create_fragment$8(ctx) {
  var button;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var button_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var button_data = {};

  for (var i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }

  var block = {
    c: function create() {
      button = element("button");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      button = claim_element(nodes, "BUTTON", {});
      var button_nodes = children(button);
      if (default_slot) default_slot.l(button_nodes);
      button_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(button, button_data);
      add_location(button, file$7, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, button, anchor);

      if (default_slot) {
        default_slot.m(button, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, button,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, button))];
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

      set_attributes(button, button_data = get_spread_update(button_levels, [dirty &
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
      if (detaching) detach_dev(button);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Button", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
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
  return [use, forwardEvents, $$props, $$scope, slots];
}

var Button = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Button, _SvelteComponentDev);

  var _super = _createSuper$9(Button);

  function Button(options) {
    var _this;

    _classCallCheck(this, Button);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Button",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }

  _createClass(Button, [{
    key: "use",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Button;
}(SvelteComponentDev);

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function create_default_slot$2(ctx) {
  var current;
  var default_slot_template =
  /*#slots*/
  ctx[17].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[19], null);
  var block = {
    c: function create() {
      if (default_slot) default_slot.c();
    },
    l: function claim(nodes) {
      if (default_slot) default_slot.l(nodes);
    },
    m: function mount(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        524288) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[19], dirty, null, null);
        }
      }
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
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$2.name,
    type: "slot",
    source: "(1:0) <svelte:component   this={component}   use={[[Ripple, {ripple, unbounded: false, classForward: classes => rippleClasses = classes}], forwardEvents, ...use]}   class=\\\"     mdc-button     {className}     {rippleClasses.join(' ')}     {variant === 'raised' ? 'mdc-button--raised' : ''}     {variant === 'unelevated' ? 'mdc-button--unelevated' : ''}     {variant === 'outlined' ? 'mdc-button--outlined' : ''}     {dense ? 'mdc-button--dense' : ''}     {color === 'secondary' ? 'smui-button--color-secondary' : ''}     {context === 'card:action' ? 'mdc-card__action' : ''}     {context === 'card:action' ? 'mdc-card__action--button' : ''}     {context === 'dialog:action' ? 'mdc-dialog__button' : ''}     {context === 'top-app-bar:navigation' ? 'mdc-top-app-bar__navigation-icon' : ''}     {context === 'top-app-bar:action' ? 'mdc-top-app-bar__action-item' : ''}     {context === 'snackbar' ? 'mdc-snackbar__action' : ''}   \\\"   {...actionProp}   {...defaultProp}   {...exclude($$props, ['use', 'class', 'ripple', 'color', 'variant', 'dense', ...dialogExcludes])} >",
    ctx: ctx
  });
  return block;
}

function create_fragment$9(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [{
    use: [[Ripple, {
      ripple:
      /*ripple*/
      ctx[2],
      unbounded: false,
      classForward:
      /*func*/
      ctx[18]
    }],
    /*forwardEvents*/
    ctx[11]].concat(_toConsumableArray(
    /*use*/
    ctx[0]))
  }, {
    class: "\n    mdc-button\n    " +
    /*className*/
    ctx[1] + "\n    " +
    /*rippleClasses*/
    ctx[7].join(" ") + "\n    " + (
    /*variant*/
    ctx[4] === "raised" ? "mdc-button--raised" : "") + "\n    " + (
    /*variant*/
    ctx[4] === "unelevated" ? "mdc-button--unelevated" : "") + "\n    " + (
    /*variant*/
    ctx[4] === "outlined" ? "mdc-button--outlined" : "") + "\n    " + (
    /*dense*/
    ctx[5] ? "mdc-button--dense" : "") + "\n    " + (
    /*color*/
    ctx[3] === "secondary" ? "smui-button--color-secondary" : "") + "\n    " + (
    /*context*/
    ctx[12] === "card:action" ? "mdc-card__action" : "") + "\n    " + (
    /*context*/
    ctx[12] === "card:action" ? "mdc-card__action--button" : "") + "\n    " + (
    /*context*/
    ctx[12] === "dialog:action" ? "mdc-dialog__button" : "") + "\n    " + (
    /*context*/
    ctx[12] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n    " + (
    /*context*/
    ctx[12] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n    " + (
    /*context*/
    ctx[12] === "snackbar" ? "mdc-snackbar__action" : "") + "\n  "
  },
  /*actionProp*/
  ctx[9],
  /*defaultProp*/
  ctx[10], exclude(
  /*$$props*/
  ctx[13], ["use", "class", "ripple", "color", "variant", "dense"].concat(_toConsumableArray(
  /*dialogExcludes*/
  ctx[8])))];
  var switch_value =
  /*component*/
  ctx[6];

  function switch_props(ctx) {
    var switch_instance_props = {
      $$slots: {
        default: [create_default_slot$2]
      },
      $$scope: {
        ctx: ctx
      }
    };

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var switch_instance_changes = dirty &
      /*Ripple, ripple, rippleClasses, forwardEvents, use, className, variant, dense, color, context, actionProp, defaultProp, exclude, $$props, dialogExcludes*/
      16319 ? get_spread_update(switch_instance_spread_levels, [dirty &
      /*Ripple, ripple, rippleClasses, forwardEvents, use*/
      2181 && {
        use: [[Ripple, {
          ripple:
          /*ripple*/
          ctx[2],
          unbounded: false,
          classForward:
          /*func*/
          ctx[18]
        }],
        /*forwardEvents*/
        ctx[11]].concat(_toConsumableArray(
        /*use*/
        ctx[0]))
      }, dirty &
      /*className, rippleClasses, variant, dense, color, context*/
      4282 && {
        class: "\n    mdc-button\n    " +
        /*className*/
        ctx[1] + "\n    " +
        /*rippleClasses*/
        ctx[7].join(" ") + "\n    " + (
        /*variant*/
        ctx[4] === "raised" ? "mdc-button--raised" : "") + "\n    " + (
        /*variant*/
        ctx[4] === "unelevated" ? "mdc-button--unelevated" : "") + "\n    " + (
        /*variant*/
        ctx[4] === "outlined" ? "mdc-button--outlined" : "") + "\n    " + (
        /*dense*/
        ctx[5] ? "mdc-button--dense" : "") + "\n    " + (
        /*color*/
        ctx[3] === "secondary" ? "smui-button--color-secondary" : "") + "\n    " + (
        /*context*/
        ctx[12] === "card:action" ? "mdc-card__action" : "") + "\n    " + (
        /*context*/
        ctx[12] === "card:action" ? "mdc-card__action--button" : "") + "\n    " + (
        /*context*/
        ctx[12] === "dialog:action" ? "mdc-dialog__button" : "") + "\n    " + (
        /*context*/
        ctx[12] === "top-app-bar:navigation" ? "mdc-top-app-bar__navigation-icon" : "") + "\n    " + (
        /*context*/
        ctx[12] === "top-app-bar:action" ? "mdc-top-app-bar__action-item" : "") + "\n    " + (
        /*context*/
        ctx[12] === "snackbar" ? "mdc-snackbar__action" : "") + "\n  "
      }, dirty &
      /*actionProp*/
      512 && get_spread_object(
      /*actionProp*/
      ctx[9]), dirty &
      /*defaultProp*/
      1024 && get_spread_object(
      /*defaultProp*/
      ctx[10]), dirty &
      /*exclude, $$props, dialogExcludes*/
      8448 && get_spread_object(exclude(
      /*$$props*/
      ctx[13], ["use", "class", "ripple", "color", "variant", "dense"].concat(_toConsumableArray(
      /*dialogExcludes*/
      ctx[8]))))]) : {};

      if (dirty &
      /*$$scope*/
      524288) {
        switch_instance_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      if (switch_value !== (switch_value =
      /*component*/
      ctx[6])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$9($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Button", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$ripple = _$$props4.ripple,
      ripple = _$$props4$ripple === void 0 ? true : _$$props4$ripple;
  var _$$props5 = $$props,
      _$$props5$color = _$$props5.color,
      color = _$$props5$color === void 0 ? "primary" : _$$props5$color;
  var _$$props6 = $$props,
      _$$props6$variant = _$$props6.variant,
      variant = _$$props6$variant === void 0 ? "text" : _$$props6$variant;
  var _$$props7 = $$props,
      _$$props7$dense = _$$props7.dense,
      dense = _$$props7$dense === void 0 ? false : _$$props7$dense;
  var _$$props8 = $$props,
      _$$props8$href = _$$props8.href,
      href = _$$props8$href === void 0 ? null : _$$props8$href;
  var _$$props9 = $$props,
      _$$props9$action = _$$props9.action,
      action = _$$props9$action === void 0 ? "close" : _$$props9$action;
  var _$$props10 = $$props,
      _$$props10$default = _$$props10.default,
      defaultAction = _$$props10$default === void 0 ? false : _$$props10$default;
  var _$$props11 = $$props,
      _$$props11$component = _$$props11.component,
      component = _$$props11$component === void 0 ? href == null ? Button : A : _$$props11$component;
  var context = getContext("SMUI:button:context");
  var rippleClasses = [];
  setContext("SMUI:label:context", "button");
  setContext("SMUI:icon:context", "button");

  var func = function func(classes) {
    return $$invalidate(7, rippleClasses = classes);
  };

  $$self.$$set = function ($$new_props) {
    $$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(3, color = $$new_props.color);
    if ("variant" in $$new_props) $$invalidate(4, variant = $$new_props.variant);
    if ("dense" in $$new_props) $$invalidate(5, dense = $$new_props.dense);
    if ("href" in $$new_props) $$invalidate(14, href = $$new_props.href);
    if ("action" in $$new_props) $$invalidate(15, action = $$new_props.action);
    if ("default" in $$new_props) $$invalidate(16, defaultAction = $$new_props.default);
    if ("component" in $$new_props) $$invalidate(6, component = $$new_props.component);
    if ("$$scope" in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      getContext: getContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      A: A,
      Button: Button,
      Ripple: Ripple,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      variant: variant,
      dense: dense,
      href: href,
      action: action,
      defaultAction: defaultAction,
      component: component,
      context: context,
      rippleClasses: rippleClasses,
      dialogExcludes: dialogExcludes,
      actionProp: actionProp,
      defaultProp: defaultProp
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(3, color = $$new_props.color);
    if ("variant" in $$props) $$invalidate(4, variant = $$new_props.variant);
    if ("dense" in $$props) $$invalidate(5, dense = $$new_props.dense);
    if ("href" in $$props) $$invalidate(14, href = $$new_props.href);
    if ("action" in $$props) $$invalidate(15, action = $$new_props.action);
    if ("defaultAction" in $$props) $$invalidate(16, defaultAction = $$new_props.defaultAction);
    if ("component" in $$props) $$invalidate(6, component = $$new_props.component);
    if ("context" in $$props) $$invalidate(12, context = $$new_props.context);
    if ("rippleClasses" in $$props) $$invalidate(7, rippleClasses = $$new_props.rippleClasses);
    if ("dialogExcludes" in $$props) $$invalidate(8, dialogExcludes = $$new_props.dialogExcludes);
    if ("actionProp" in $$props) $$invalidate(9, actionProp = $$new_props.actionProp);
    if ("defaultProp" in $$props) $$invalidate(10, defaultProp = $$new_props.defaultProp);
  };

  var dialogExcludes;
  var actionProp;
  var defaultProp;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*action*/
    32768) {
       $$invalidate(9, actionProp = context === "dialog:action" && action !== null ? {
        "data-mdc-dialog-action": action
      } : {});
    }

    if ($$self.$$.dirty &
    /*defaultAction*/
    65536) {
       $$invalidate(10, defaultProp = context === "dialog:action" && defaultAction ? {
        "data-mdc-dialog-button-default": ""
      } : {});
    }
  };

   $$invalidate(8, dialogExcludes = context === "dialog:action" ? ["action", "default"] : []);

  $$props = exclude_internal_props($$props);
  return [use, className, ripple, color, variant, dense, component, rippleClasses, dialogExcludes, actionProp, defaultProp, forwardEvents, context, $$props, href, action, defaultAction, slots, func, $$scope];
}

var Button_1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Button_1, _SvelteComponentDev);

  var _super = _createSuper$a(Button_1);

  function Button_1(options) {
    var _this;

    _classCallCheck(this, Button_1);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {
      use: 0,
      class: 1,
      ripple: 2,
      color: 3,
      variant: 4,
      dense: 5,
      href: 14,
      action: 15,
      default: 16,
      component: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Button_1",
      options: options,
      id: create_fragment$9.name
    });
    return _this;
  }

  _createClass(Button_1, [{
    key: "use",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "variant",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "dense",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "action",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "default",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "component",
    get: function get() {
      throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Button_1;
}(SvelteComponentDev);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "node_modules/@smui/common/Label.svelte";

function create_fragment$a(ctx) {
  var span;
  var span_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[5], null);
  var span_levels = [{
    class: span_class_value = "\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*context*/
    ctx[3] === "button" ? "mdc-button__label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "fab" ? "mdc-fab__label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "chip" ? "mdc-chip__text" : "") + "\n    " + (
    /*context*/
    ctx[3] === "tab" ? "mdc-tab__text-label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "image-list" ? "mdc-image-list__label" : "") + "\n    " + (
    /*context*/
    ctx[3] === "snackbar" ? "mdc-snackbar__label" : "") + "\n  "
  },
  /*context*/
  ctx[3] === "snackbar" ? {
    role: "status",
    "aria-live": "polite"
  } : {}, exclude(
  /*$$props*/
  ctx[4], ["use", "class"])];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$8, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, span,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[2].call(null, span))];
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[5], dirty, null, null);
        }
      }

      set_attributes(span, span_data = get_spread_update(span_levels, [(!current || dirty &
      /*className*/
      2 && span_class_value !== (span_class_value = "\n    " +
      /*className*/
      ctx[1] + "\n    " + (
      /*context*/
      ctx[3] === "button" ? "mdc-button__label" : "") + "\n    " + (
      /*context*/
      ctx[3] === "fab" ? "mdc-fab__label" : "") + "\n    " + (
      /*context*/
      ctx[3] === "chip" ? "mdc-chip__text" : "") + "\n    " + (
      /*context*/
      ctx[3] === "tab" ? "mdc-tab__text-label" : "") + "\n    " + (
      /*context*/
      ctx[3] === "image-list" ? "mdc-image-list__label" : "") + "\n    " + (
      /*context*/
      ctx[3] === "snackbar" ? "mdc-snackbar__label" : "") + "\n  ")) && {
        class: span_class_value
      },
      /*context*/
      ctx[3] === "snackbar" ? {
        role: "status",
        "aria-live": "polite"
      } : {}, dirty &
      /*$$props*/
      16 && exclude(
      /*$$props*/
      ctx[4], ["use", "class"])]));
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
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$a($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Label", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var context = getContext("SMUI:label:context");

  $$self.$$set = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      getContext: getContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      context: context
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, forwardEvents, context, $$props, $$scope, slots];
}

var Label = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Label, _SvelteComponentDev);

  var _super = _createSuper$b(Label);

  function Label(options) {
    var _this;

    _classCallCheck(this, Label);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {
      use: 0,
      class: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Label",
      options: options,
      id: create_fragment$a.name
    });
    return _this;
  }

  _createClass(Label, [{
    key: "use",
    get: function get() {
      throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Label;
}(SvelteComponentDev);

var css_248z$3 = ".mdc-list{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.009375em;text-decoration:inherit;text-transform:inherit;line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background,rgba(0,0,0,.87))}.mdc-list:focus{outline:none}.mdc-list-item__secondary-text{color:rgba(0,0,0,.54);color:var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54))}.mdc-list-item__graphic{background-color:transparent;color:rgba(0,0,0,.38);color:var(--mdc-theme-text-icon-on-background,rgba(0,0,0,.38))}.mdc-list-item__meta{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-hint-on-background,rgba(0,0,0,.38))}.mdc-list-group__subheader{color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background,rgba(0,0,0,.87))}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;height:48px;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item--activated,.mdc-list-item--activated .mdc-list-item__graphic,.mdc-list-item--selected,.mdc-list-item--selected .mdc-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary,#6200ee)}.mdc-list-item--disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-background,rgba(0,0,0,.38))}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor}.mdc-list-item[dir=rtl] .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item__meta:not(.material-icons){font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.0333333333em;text-decoration:inherit;text-transform:inherit}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-list-item__primary-text:before{display:inline-block;width:0;height:32px;content:\"\";vertical-align:0}.mdc-list-item__primary-text:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text:before{display:inline-block;width:0;height:24px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text:after{display:inline-block;width:0;height:20px;content:\"\";vertical-align:-20px}.mdc-list-item__secondary-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:0;line-height:normal;display:block}.mdc-list-item__secondary-text:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{display:block;margin-top:0;line-height:normal;font-size:inherit}.mdc-list--dense .mdc-list-item__secondary-text:before{display:inline-block;width:0;height:20px;content:\"\";vertical-align:0}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item,.mdc-list--two-line.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom:1px solid;border-bottom-color:rgba(0,0,0,.12)}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir=rtl] .mdc-list-divider--inset,[dir=rtl] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 88px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.009375em;text-decoration:inherit;text-transform:inherit;margin:.75rem 16px}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{top:-50%;left:-50%;width:200%;height:200%}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:before{background-color:#000}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:hover:before{opacity:.04}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:before{background-color:var(--mdc-theme-primary,#6200ee)}}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:hover:before{opacity:.16}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{opacity:.08}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:after,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:before{background-color:var(--mdc-theme-primary,#6200ee)}}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:hover:before{opacity:.12}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.2}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.2}:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.2}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{top:-50%;left:-50%;width:200%;height:200%}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:after,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:before{background-color:#000}:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused:before,:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-list--three-line .mdc-list-item__text{align-self:flex-start}.smui-list--three-line .mdc-list-item{height:88px}.smui-list--three-line.mdc-list--dense .mdc-list-item{height:76px}";
styleInject(css_248z$3);

/**
 * @license
 * Copyright 2018 Google Inc.
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
var cssClasses$3 = {
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  ROOT: 'mdc-list'
};
var strings$5 = {
  ACTION_EVENT: 'MDCList:action',
  ARIA_CHECKED: 'aria-checked',
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: 'aria-current',
  ARIA_DISABLED: 'aria-disabled',
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: 'aria-selected',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$3.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$3.LIST_ITEM_CLASS + " a\n  ",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$3.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$3.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$3.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses$3.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
  RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)'
};
var numbers$2 = {
  UNSET_INDEX: -1
};

/**
 * @license
 * Copyright 2018 Google Inc.
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
var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}

var MDCListFoundation =
/** @class */
function (_super) {
  __extends(MDCListFoundation, _super);

  function MDCListFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCListFoundation.defaultAdapter, adapter)) || this;

    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = numbers$2.UNSET_INDEX;
    _this.focusedItemIndex_ = numbers$2.UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    return _this;
  }

  Object.defineProperty(MDCListFoundation, "strings", {
    get: function get() {
      return strings$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "numbers", {
    get: function get() {
      return numbers$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClassForElementIndex: function addClassForElementIndex() {
          return undefined;
        },
        focusItemAtIndex: function focusItemAtIndex() {
          return undefined;
        },
        getAttributeForElementIndex: function getAttributeForElementIndex() {
          return null;
        },
        getFocusedElementIndex: function getFocusedElementIndex() {
          return 0;
        },
        getListItemCount: function getListItemCount() {
          return 0;
        },
        hasCheckboxAtIndex: function hasCheckboxAtIndex() {
          return false;
        },
        hasRadioAtIndex: function hasRadioAtIndex() {
          return false;
        },
        isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex() {
          return false;
        },
        isFocusInsideList: function isFocusInsideList() {
          return false;
        },
        isRootFocused: function isRootFocused() {
          return false;
        },
        notifyAction: function notifyAction() {
          return undefined;
        },
        removeClassForElementIndex: function removeClassForElementIndex() {
          return undefined;
        },
        setAttributeForElementIndex: function setAttributeForElementIndex() {
          return undefined;
        },
        setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex() {
          return undefined;
        },
        setTabIndexForListItemChildren: function setTabIndexForListItemChildren() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCListFoundation.prototype.layout = function () {
    if (this.adapter_.getListItemCount() === 0) {
      return;
    }

    if (this.adapter_.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter_.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    }
  };
  /**
   * Sets the private wrapFocus_ variable.
   */


  MDCListFoundation.prototype.setWrapFocus = function (value) {
    this.wrapFocus_ = value;
  };
  /**
   * Sets the isVertical_ private variable.
   */


  MDCListFoundation.prototype.setVerticalOrientation = function (value) {
    this.isVertical_ = value;
  };
  /**
   * Sets the isSingleSelectionList_ private variable.
   */


  MDCListFoundation.prototype.setSingleSelection = function (value) {
    this.isSingleSelectionList_ = value;
  };
  /**
   * Sets the useActivatedClass_ private variable.
   */


  MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
    this.useActivatedClass_ = useActivated;
  };

  MDCListFoundation.prototype.getSelectedIndex = function () {
    return this.selectedIndex_;
  };

  MDCListFoundation.prototype.setSelectedIndex = function (index) {
    if (!this.isIndexValid_(index)) {
      return;
    }

    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  /**
   * Focus in handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
    }
  };
  /**
   * Focus out handler for the list items.
   */


  MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
    var _this = this;

    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
    }
    /**
     * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
     * is moved to next element.
     */


    setTimeout(function () {
      if (!_this.adapter_.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedItem_();
      }
    }, 0);
  };
  /**
   * Key handler for the list.
   */


  MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
    var isArrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    var isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    var isArrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    var isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    var isHome = evt.key === 'Home' || evt.keyCode === 36;
    var isEnd = evt.key === 'End' || evt.keyCode === 35;
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    var isSpace = evt.key === 'Space' || evt.keyCode === 32;

    if (this.adapter_.isRootFocused()) {
      if (isArrowUp || isEnd) {
        evt.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        evt.preventDefault();
        this.focusFirstElement();
      }

      return;
    }

    var currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    var nextIndex;

    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      nextIndex = this.focusLastElement();
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
        var target = evt.target;

        if (target && target.tagName === 'A' && isEnter) {
          return;
        }

        this.preventDefaultEvent_(evt);

        if (this.isSelectableList_()) {
          this.setSelectedIndexOnAction_(currentIndex);
        }

        this.adapter_.notifyAction(currentIndex);
      }
    }

    this.focusedItemIndex_ = currentIndex;

    if (nextIndex !== undefined) {
      this.setTabindexAtIndex_(nextIndex);
      this.focusedItemIndex_ = nextIndex;
    }
  };
  /**
   * Click handler for the list.
   */


  MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
    if (index === numbers$2.UNSET_INDEX) {
      return;
    }

    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }

    this.adapter_.notifyAction(index);
    this.setTabindexAtIndex_(index);
    this.focusedItemIndex_ = index;
  };
  /**
   * Focuses the next element on the list.
   */


  MDCListFoundation.prototype.focusNextElement = function (index) {
    var count = this.adapter_.getListItemCount();
    var nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  /**
   * Focuses the previous element on the list.
   */


  MDCListFoundation.prototype.focusPrevElement = function (index) {
    var prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return index;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
    return prevIndex;
  };

  MDCListFoundation.prototype.focusFirstElement = function () {
    this.adapter_.focusItemAtIndex(0);
    return 0;
  };

  MDCListFoundation.prototype.focusLastElement = function () {
    var lastIndex = this.adapter_.getListItemCount() - 1;
    this.adapter_.focusItemAtIndex(lastIndex);
    return lastIndex;
  };
  /**
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCListFoundation.prototype.setEnabled = function (itemIndex, isEnabled) {
    if (!this.isIndexValid_(itemIndex)) {
      return;
    }

    if (isEnabled) {
      this.adapter_.removeClassForElementIndex(itemIndex, cssClasses$3.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.setAttributeForElementIndex(itemIndex, strings$5.ARIA_DISABLED, 'false');
    } else {
      this.adapter_.addClassForElementIndex(itemIndex, cssClasses$3.LIST_ITEM_DISABLED_CLASS);
      this.adapter_.setAttributeForElementIndex(itemIndex, strings$5.ARIA_DISABLED, 'true');
    }
  };
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   */


  MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
    var target = evt.target;
    var tagName = ("" + target.tagName).toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  };

  MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
    if (this.selectedIndex_ === index) {
      return;
    }

    var selectedClassName = cssClasses$3.LIST_ITEM_SELECTED_CLASS;

    if (this.useActivatedClass_) {
      selectedClassName = cssClasses$3.LIST_ITEM_ACTIVATED_CLASS;
    }

    if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }

    this.adapter_.addClassForElementIndex(index, selectedClassName);
    this.setAriaForSingleSelectionAtIndex_(index);
    this.selectedIndex_ = index;
  };
  /**
   * Sets aria attribute for single selection at given index.
   */


  MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
    // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
    if (this.selectedIndex_ === numbers$2.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter_.getAttributeForElementIndex(index, strings$5.ARIA_CURRENT);
    }

    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? strings$5.ARIA_CURRENT : strings$5.ARIA_SELECTED;

    if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
    }

    var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
    this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
  };
  /**
   * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
   */


  MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
    this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);

    if (this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, strings$5.ARIA_CHECKED, 'false');
    }

    this.adapter_.setAttributeForElementIndex(index, strings$5.ARIA_CHECKED, 'true');
    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
    for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
      var isChecked = false;

      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }

      this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter_.setAttributeForElementIndex(i, strings$5.ARIA_CHECKED, isChecked ? 'true' : 'false');
    }

    this.selectedIndex_ = index;
  };

  MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
    if (this.focusedItemIndex_ === numbers$2.UNSET_INDEX && index !== 0) {
      // If no list item was selected set first list item's tabindex to -1.
      // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
      this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
    } else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
      this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
    }

    this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
  };
  /**
   * @return Return true if it is single selectin list, checkbox list or radio list.
   */


  MDCListFoundation.prototype.isSelectableList_ = function () {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };

  MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
    var targetIndex = 0;

    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== numbers$2.UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }

    this.setTabindexAtIndex_(targetIndex);
  };

  MDCListFoundation.prototype.isIndexValid_ = function (index) {
    var _this = this;

    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
      }

      if (index.length === 0) {
        return true;
      } else {
        return index.some(function (i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === 'number') {
      if (this.isCheckboxList_) {
        throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
      }

      return this.isIndexInRange_(index);
    } else {
      return false;
    }
  };

  MDCListFoundation.prototype.isIndexInRange_ = function (index) {
    var listSize = this.adapter_.getListItemCount();
    return index >= 0 && index < listSize;
  };

  MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }

    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };

  MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
    var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);

    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }

    this.adapter_.setAttributeForElementIndex(index, strings$5.ARIA_CHECKED, isChecked ? 'true' : 'false'); // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.

    var selectedIndexes = this.selectedIndex_ === numbers$2.UNSET_INDEX ? [] : this.selectedIndex_.slice();

    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function (i) {
        return i !== index;
      });
    }

    this.selectedIndex_ = selectedIndexes;
  };

  return MDCListFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
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

var MDCList =
/** @class */
function (_super) {
  __extends(MDCList, _super);

  function MDCList() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCList.prototype, "vertical", {
    set: function set(value) {
      this.foundation_.setVerticalOrientation(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "listElements", {
    get: function get() {
      return [].slice.call(this.root_.querySelectorAll("." + cssClasses$3.LIST_ITEM_CLASS));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "wrapFocus", {
    set: function set(value) {
      this.foundation_.setWrapFocus(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "singleSelection", {
    set: function set(isSingleSelectionList) {
      this.foundation_.setSingleSelection(isSingleSelectionList);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCList.prototype, "selectedIndex", {
    get: function get() {
      return this.foundation_.getSelectedIndex();
    },
    set: function set(index) {
      this.foundation_.setSelectedIndex(index);
    },
    enumerable: true,
    configurable: true
  });

  MDCList.attachTo = function (root) {
    return new MDCList(root);
  };

  MDCList.prototype.initialSyncWithDOM = function () {
    this.handleClick_ = this.handleClickEvent_.bind(this);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.listen('keydown', this.handleKeydown_);
    this.listen('click', this.handleClick_);
    this.listen('focusin', this.focusInEventListener_);
    this.listen('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  };

  MDCList.prototype.destroy = function () {
    this.unlisten('keydown', this.handleKeydown_);
    this.unlisten('click', this.handleClick_);
    this.unlisten('focusin', this.focusInEventListener_);
    this.unlisten('focusout', this.focusOutEventListener_);
  };

  MDCList.prototype.layout = function () {
    var direction = this.root_.getAttribute(strings$5.ARIA_ORIENTATION);
    this.vertical = direction !== strings$5.ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(function (el) {
      el.setAttribute('tabindex', '-1');
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(strings$5.FOCUSABLE_CHILD_ELEMENTS)).forEach(function (el) {
      return el.setAttribute('tabindex', '-1');
    });
    this.foundation_.layout();
  };
  /**
   * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
   */


  MDCList.prototype.initializeListType = function () {
    var _this = this;

    var checkboxListItems = this.root_.querySelectorAll(strings$5.ARIA_ROLE_CHECKBOX_SELECTOR);
    var singleSelectedListItem = this.root_.querySelector("\n      ." + cssClasses$3.LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + cssClasses$3.LIST_ITEM_SELECTED_CLASS + "\n    ");
    var radioSelectedListItem = this.root_.querySelector(strings$5.ARIA_CHECKED_RADIO_SELECTOR);

    if (checkboxListItems.length) {
      var preselectedItems = this.root_.querySelectorAll(strings$5.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = [].map.call(preselectedItems, function (listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (singleSelectedListItem) {
      if (singleSelectedListItem.classList.contains(cssClasses$3.LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };
  /**
   * Updates the list item at itemIndex to the desired isEnabled state.
   * @param itemIndex Index of the list item
   * @param isEnabled Sets the list item to enabled or disabled.
   */


  MDCList.prototype.setEnabled = function (itemIndex, isEnabled) {
    this.foundation_.setEnabled(itemIndex, isEnabled);
  };

  MDCList.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClassForElementIndex: function addClassForElementIndex(index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      focusItemAtIndex: function focusItemAtIndex(index) {
        var element = _this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      getAttributeForElementIndex: function getAttributeForElementIndex(index, attr) {
        return _this.listElements[index].getAttribute(attr);
      },
      getFocusedElementIndex: function getFocusedElementIndex() {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function getListItemCount() {
        return _this.listElements.length;
      },
      hasCheckboxAtIndex: function hasCheckboxAtIndex(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings$5.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function hasRadioAtIndex(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings$5.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function isCheckboxCheckedAtIndex(index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings$5.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function isFocusInsideList() {
        return _this.root_.contains(document.activeElement);
      },
      isRootFocused: function isRootFocused() {
        return document.activeElement === _this.root_;
      },
      notifyAction: function notifyAction(index) {
        _this.emit(strings$5.ACTION_EVENT, {
          index: index
        },
        /** shouldBubble */
        true);
      },
      removeClassForElementIndex: function removeClassForElementIndex(index, className) {
        var element = _this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      setAttributeForElementIndex: function setAttributeForElementIndex(index, attr, value) {
        var element = _this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function setCheckedCheckboxOrRadioAtIndex(index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings$5.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
        var element = _this.listElements[listItemIndex];
        var listItemChildren = [].slice.call(element.querySelectorAll(strings$5.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach(function (el) {
          return el.setAttribute('tabindex', tabIndexValue);
        });
      }
    };
    return new MDCListFoundation(adapter);
  };
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */


  MDCList.prototype.getListItemIndex_ = function (evt) {
    var eventTarget = evt.target;
    var nearestParent = closest(eventTarget, "." + cssClasses$3.LIST_ITEM_CLASS + ", ." + cssClasses$3.ROOT); // Get the index of the element if it is a list item.

    if (nearestParent && matches$1(nearestParent, "." + cssClasses$3.LIST_ITEM_CLASS)) {
      return this.listElements.indexOf(nearestParent);
    }

    return -1;
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusInEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleFocusOutEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  };
  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   */


  MDCList.prototype.handleKeydownEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target;
    this.foundation_.handleKeydown(evt, target.classList.contains(cssClasses$3.LIST_ITEM_CLASS), index);
  };
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */


  MDCList.prototype.handleClickEvent_ = function (evt) {
    var index = this.getListItemIndex_(evt);
    var target = evt.target; // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.

    var toggleCheckbox = !matches$1(target, strings$5.CHECKBOX_RADIO_SELECTOR);
    this.foundation_.handleClick(index, toggleCheckbox);
  };

  return MDCList;
}(MDCComponent);

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "node_modules/@smui/list/List.svelte"; // (18:0) {:else}

function create_else_block$1(ctx) {
  var ul;
  var ul_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[23].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[22], null);
  var ul_levels = [{
    class: ul_class_value = "\n      mdc-list\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*nonInteractive*/
    ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
    /*dense*/
    ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
    /*avatarList*/
    ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
    /*twoLine*/
    ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
    /*threeLine*/
    ctx[6] && !
    /*twoLine*/
    ctx[5] ? "smui-list--three-line" : "") + "\n    "
  }, {
    role:
    /*role*/
    ctx[8]
  },
  /*props*/
  ctx[9]];
  var ul_data = {};

  for (var i = 0; i < ul_levels.length; i += 1) {
    ul_data = assign(ul_data, ul_levels[i]);
  }

  var block = {
    c: function create() {
      ul = element("ul");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true,
        role: true
      });
      var ul_nodes = children(ul);
      if (default_slot) default_slot.l(ul_nodes);
      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(ul, ul_data);
      add_location(ul, file$9, 18, 2, 478);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      if (default_slot) {
        default_slot.m(ul, null);
      }
      /*ul_binding*/


      ctx[25](ul);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, ul,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[10].call(null, ul)), listen_dev(ul, "MDCList:action",
        /*handleAction*/
        ctx[12], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        4194304) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[22], dirty, null, null);
        }
      }

      set_attributes(ul, ul_data = get_spread_update(ul_levels, [(!current || dirty[0] &
      /*className, nonInteractive, dense, avatarList, twoLine, threeLine*/
      126 && ul_class_value !== (ul_class_value = "\n      mdc-list\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*nonInteractive*/
      ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
      /*dense*/
      ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
      /*avatarList*/
      ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
      /*twoLine*/
      ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
      /*threeLine*/
      ctx[6] && !
      /*twoLine*/
      ctx[5] ? "smui-list--three-line" : "") + "\n    ")) && {
        class: ul_class_value
      }, (!current || dirty[0] &
      /*role*/
      256) && {
        role:
        /*role*/
        ctx[8]
      }, dirty[0] &
      /*props*/
      512 &&
      /*props*/
      ctx[9]]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
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
      if (detaching) detach_dev(ul);
      if (default_slot) default_slot.d(detaching);
      /*ul_binding*/

      ctx[25](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(18:0) {:else}",
    ctx: ctx
  });
  return block;
} // (1:0) {#if nav}


function create_if_block$2(ctx) {
  var nav_1;
  var nav_1_class_value;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[23].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[22], null);
  var nav_1_levels = [{
    class: nav_1_class_value = "\n      mdc-list\n      " +
    /*className*/
    ctx[1] + "\n      " + (
    /*nonInteractive*/
    ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
    /*dense*/
    ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
    /*avatarList*/
    ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
    /*twoLine*/
    ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
    /*threeLine*/
    ctx[6] && !
    /*twoLine*/
    ctx[5] ? "smui-list--three-line" : "") + "\n    "
  },
  /*props*/
  ctx[9]];
  var nav_1_data = {};

  for (var i = 0; i < nav_1_levels.length; i += 1) {
    nav_1_data = assign(nav_1_data, nav_1_levels[i]);
  }

  var block = {
    c: function create() {
      nav_1 = element("nav");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      nav_1 = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_1_nodes = children(nav_1);
      if (default_slot) default_slot.l(nav_1_nodes);
      nav_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(nav_1, nav_1_data);
      add_location(nav_1, file$9, 1, 2, 12);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav_1, anchor);

      if (default_slot) {
        default_slot.m(nav_1, null);
      }
      /*nav_1_binding*/


      ctx[24](nav_1);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, nav_1,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[10].call(null, nav_1)), listen_dev(nav_1, "MDCList:action",
        /*handleAction*/
        ctx[12], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty[0] &
        /*$$scope*/
        4194304) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[22], dirty, null, null);
        }
      }

      set_attributes(nav_1, nav_1_data = get_spread_update(nav_1_levels, [(!current || dirty[0] &
      /*className, nonInteractive, dense, avatarList, twoLine, threeLine*/
      126 && nav_1_class_value !== (nav_1_class_value = "\n      mdc-list\n      " +
      /*className*/
      ctx[1] + "\n      " + (
      /*nonInteractive*/
      ctx[2] ? "mdc-list--non-interactive" : "") + "\n      " + (
      /*dense*/
      ctx[3] ? "mdc-list--dense" : "") + "\n      " + (
      /*avatarList*/
      ctx[4] ? "mdc-list--avatar-list" : "") + "\n      " + (
      /*twoLine*/
      ctx[5] ? "mdc-list--two-line" : "") + "\n      " + (
      /*threeLine*/
      ctx[6] && !
      /*twoLine*/
      ctx[5] ? "smui-list--three-line" : "") + "\n    ")) && {
        class: nav_1_class_value
      }, dirty[0] &
      /*props*/
      512 &&
      /*props*/
      ctx[9]]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] &
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
      if (detaching) detach_dev(nav_1);
      if (default_slot) default_slot.d(detaching);
      /*nav_1_binding*/

      ctx[24](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(1:0) {#if nav}",
    ctx: ctx
  });
  return block;
}

function create_fragment$b(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$2, create_else_block$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*nav*/
    ctx[11]) return 0;
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
    p: function update(ctx, dirty) {
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
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$b($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("List", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCList:action"]);
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$nonInteract = _$$props4.nonInteractive,
      nonInteractive = _$$props4$nonInteract === void 0 ? false : _$$props4$nonInteract;
  var _$$props5 = $$props,
      _$$props5$dense = _$$props5.dense,
      dense = _$$props5$dense === void 0 ? false : _$$props5$dense;
  var _$$props6 = $$props,
      _$$props6$avatarList = _$$props6.avatarList,
      avatarList = _$$props6$avatarList === void 0 ? false : _$$props6$avatarList;
  var _$$props7 = $$props,
      _$$props7$twoLine = _$$props7.twoLine,
      twoLine = _$$props7$twoLine === void 0 ? false : _$$props7$twoLine;
  var _$$props8 = $$props,
      _$$props8$threeLine = _$$props8.threeLine,
      threeLine = _$$props8$threeLine === void 0 ? false : _$$props8$threeLine;
  var _$$props9 = $$props,
      _$$props9$vertical = _$$props9.vertical,
      vertical = _$$props9$vertical === void 0 ? true : _$$props9$vertical;
  var _$$props10 = $$props,
      _$$props10$wrapFocus = _$$props10.wrapFocus,
      wrapFocus = _$$props10$wrapFocus === void 0 ? false : _$$props10$wrapFocus;
  var _$$props11 = $$props,
      _$$props11$singleSele = _$$props11.singleSelection,
      singleSelection = _$$props11$singleSele === void 0 ? false : _$$props11$singleSele;
  var _$$props12 = $$props,
      _$$props12$selectedIn = _$$props12.selectedIndex,
      selectedIndex = _$$props12$selectedIn === void 0 ? null : _$$props12$selectedIn;
  var _$$props13 = $$props,
      _$$props13$radiolist = _$$props13.radiolist,
      radiolist = _$$props13$radiolist === void 0 ? false : _$$props13$radiolist;
  var _$$props14 = $$props,
      _$$props14$checklist = _$$props14.checklist,
      checklist = _$$props14$checklist === void 0 ? false : _$$props14$checklist;
  var element;
  var list;
  var role = getContext("SMUI:list:role");
  var nav = getContext("SMUI:list:nav");
  var instantiate = getContext("SMUI:list:instantiate");
  var getInstance = getContext("SMUI:list:getInstance");
  var addLayoutListener = getContext("SMUI:addLayoutListener");
  var removeLayoutListener;
  setContext("SMUI:list:nonInteractive", nonInteractive);

  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radiolist) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checklist) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", undefined);
    }
  }

  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }

  onMount( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(instantiate !== false)) {
              _context.next = 4;
              break;
            }

            $$invalidate(26, list = new MDCList(element));
            _context.next = 9;
            break;

          case 4:
            _context.t0 = $$invalidate;
            _context.next = 7;
            return getInstance();

          case 7:
            _context.t1 = list = _context.sent;
            (0, _context.t0)(26, _context.t1);

          case 9:
            if (singleSelection) {
              list.initializeListType();
              $$invalidate(13, selectedIndex = list.selectedIndex);
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  onDestroy(function () {
    if (instantiate !== false) {
      list && list.destroy();
    }

    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });

  function handleAction(e) {
    if (list && list.listElements[e.detail.index].classList.contains("mdc-list-item--disabled")) {
      e.preventDefault();
      $$invalidate(26, list.selectedIndex = selectedIndex, list);
    } else if (list && list.selectedIndex === e.detail.index) {
      $$invalidate(13, selectedIndex = e.detail.index);
    }
  }

  function layout() {
    var _list;

    return (_list = list).layout.apply(_list, arguments);
  }

  function setEnabled() {
    var _list2;

    return (_list2 = list).setEnabled.apply(_list2, arguments);
  }

  function getDefaultFoundation() {
    var _list3;

    return (_list3 = list).getDefaultFoundation.apply(_list3, arguments);
  }

  function nav_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(7, element);
    });
  }

  function ul_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(7, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(31, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("nonInteractive" in $$new_props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$new_props) $$invalidate(3, dense = $$new_props.dense);
    if ("avatarList" in $$new_props) $$invalidate(4, avatarList = $$new_props.avatarList);
    if ("twoLine" in $$new_props) $$invalidate(5, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$new_props) $$invalidate(6, threeLine = $$new_props.threeLine);
    if ("vertical" in $$new_props) $$invalidate(14, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$new_props) $$invalidate(15, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$new_props) $$invalidate(16, singleSelection = $$new_props.singleSelection);
    if ("selectedIndex" in $$new_props) $$invalidate(13, selectedIndex = $$new_props.selectedIndex);
    if ("radiolist" in $$new_props) $$invalidate(17, radiolist = $$new_props.radiolist);
    if ("checklist" in $$new_props) $$invalidate(18, checklist = $$new_props.checklist);
    if ("$$scope" in $$new_props) $$invalidate(22, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCList: MDCList,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      nonInteractive: nonInteractive,
      dense: dense,
      avatarList: avatarList,
      twoLine: twoLine,
      threeLine: threeLine,
      vertical: vertical,
      wrapFocus: wrapFocus,
      singleSelection: singleSelection,
      selectedIndex: selectedIndex,
      radiolist: radiolist,
      checklist: checklist,
      element: element,
      list: list,
      role: role,
      nav: nav,
      instantiate: instantiate,
      getInstance: getInstance,
      addLayoutListener: addLayoutListener,
      removeLayoutListener: removeLayoutListener,
      handleAction: handleAction,
      layout: layout,
      setEnabled: setEnabled,
      getDefaultFoundation: getDefaultFoundation,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(31, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("nonInteractive" in $$props) $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$props) $$invalidate(3, dense = $$new_props.dense);
    if ("avatarList" in $$props) $$invalidate(4, avatarList = $$new_props.avatarList);
    if ("twoLine" in $$props) $$invalidate(5, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$props) $$invalidate(6, threeLine = $$new_props.threeLine);
    if ("vertical" in $$props) $$invalidate(14, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$props) $$invalidate(15, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$props) $$invalidate(16, singleSelection = $$new_props.singleSelection);
    if ("selectedIndex" in $$props) $$invalidate(13, selectedIndex = $$new_props.selectedIndex);
    if ("radiolist" in $$props) $$invalidate(17, radiolist = $$new_props.radiolist);
    if ("checklist" in $$props) $$invalidate(18, checklist = $$new_props.checklist);
    if ("element" in $$props) $$invalidate(7, element = $$new_props.element);
    if ("list" in $$props) $$invalidate(26, list = $$new_props.list);
    if ("role" in $$props) $$invalidate(8, role = $$new_props.role);
    if ("nav" in $$props) $$invalidate(11, nav = $$new_props.nav);
    if ("instantiate" in $$props) instantiate = $$new_props.instantiate;
    if ("getInstance" in $$props) getInstance = $$new_props.getInstance;
    if ("addLayoutListener" in $$props) addLayoutListener = $$new_props.addLayoutListener;
    if ("removeLayoutListener" in $$props) removeLayoutListener = $$new_props.removeLayoutListener;
    if ("props" in $$props) $$invalidate(9, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(9, props = exclude($$props, ["use", "class", "nonInteractive", "dense", "avatarList", "twoLine", "threeLine", "vertical", "wrapFocus", "singleSelection", "selectedIndex", "radiolist", "checklist"]));

    if ($$self.$$.dirty[0] &
    /*list, vertical*/
    67125248) {
       if (list && list.vertical !== vertical) {
        $$invalidate(26, list.vertical = vertical, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, wrapFocus*/
    67141632) {
       if (list && list.wrapFocus !== wrapFocus) {
        $$invalidate(26, list.wrapFocus = wrapFocus, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, singleSelection*/
    67174400) {
       if (list && list.singleSelection !== singleSelection) {
        $$invalidate(26, list.singleSelection = singleSelection, list);
      }
    }

    if ($$self.$$.dirty[0] &
    /*list, singleSelection, selectedIndex*/
    67182592) {
       if (list && singleSelection && list.selectedIndex !== selectedIndex) {
        $$invalidate(26, list.selectedIndex = selectedIndex, list);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [use, className, nonInteractive, dense, avatarList, twoLine, threeLine, element, role, props, forwardEvents, nav, handleAction, selectedIndex, vertical, wrapFocus, singleSelection, radiolist, checklist, layout, setEnabled, getDefaultFoundation, $$scope, slots, nav_1_binding, ul_binding];
}

var List = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(List, _SvelteComponentDev);

  var _super = _createSuper$c(List);

  function List(options) {
    var _this;

    _classCallCheck(this, List);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      use: 0,
      class: 1,
      nonInteractive: 2,
      dense: 3,
      avatarList: 4,
      twoLine: 5,
      threeLine: 6,
      vertical: 14,
      wrapFocus: 15,
      singleSelection: 16,
      selectedIndex: 13,
      radiolist: 17,
      checklist: 18,
      layout: 19,
      setEnabled: 20,
      getDefaultFoundation: 21
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "List",
      options: options,
      id: create_fragment$b.name
    });
    return _this;
  }

  _createClass(List, [{
    key: "use",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nonInteractive",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "dense",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "avatarList",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "twoLine",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "threeLine",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "vertical",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "wrapFocus",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "singleSelection",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "radiolist",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "checklist",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "layout",
    get: function get() {
      return this.$$.ctx[19];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "setEnabled",
    get: function get() {
      return this.$$.ctx[20];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "getDefaultFoundation",
    get: function get() {
      return this.$$.ctx[21];
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return List;
}(SvelteComponentDev);

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$a = "node_modules/@smui/list/Item.svelte"; // (40:0) {:else}

function create_else_block$2(ctx) {
  var li;
  var li_class_value;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[20].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[19], null);
  var li_levels = [{
    class: li_class_value = "\n      mdc-list-item\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n      " + (
    /*role*/
    ctx[6] === "menuitem" &&
    /*selected*/
    ctx[7] ? "mdc-menu-item--selected" : "") + "\n    "
  }, {
    role:
    /*role*/
    ctx[6]
  },
  /*role*/
  ctx[6] === "option" ? {
    "aria-selected":
    /*selected*/
    ctx[7] ? "true" : "false"
  } : {},
  /*role*/
  ctx[6] === "radio" ||
  /*role*/
  ctx[6] === "checkbox" ? {
    "aria-checked":
    /*checked*/
    ctx[10] ? "true" : "false"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  },
  /*props*/
  ctx[12]];
  var li_data = {};

  for (var i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }

  var block = {
    c: function create() {
      li = element("li");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true,
        role: true,
        tabindex: true
      });
      var li_nodes = children(li);
      if (default_slot) default_slot.l(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(li, li_data);
      add_location(li, file$a, 40, 2, 1053);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);

      if (default_slot) {
        default_slot.m(li, null);
      }
      /*li_binding*/


      ctx[23](li);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, li,
        /*use*/
        ctx[1])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[13].call(null, li)), action_destroyer(Ripple_action = Ripple.call(null, li, {
          ripple:
          /*ripple*/
          ctx[3],
          unbounded: false,
          color:
          /*color*/
          ctx[4]
        })), listen_dev(li, "click",
        /*action*/
        ctx[15], false, false, false), listen_dev(li, "keydown",
        /*handleKeydown*/
        ctx[16], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        524288) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[19], dirty, null, null);
        }
      }

      set_attributes(li, li_data = get_spread_update(li_levels, [(!current || dirty &
      /*className, activated, selected, disabled, role*/
      484 && li_class_value !== (li_class_value = "\n      mdc-list-item\n      " +
      /*className*/
      ctx[2] + "\n      " + (
      /*activated*/
      ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
      /*selected*/
      ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
      /*disabled*/
      ctx[8] ? "mdc-list-item--disabled" : "") + "\n      " + (
      /*role*/
      ctx[6] === "menuitem" &&
      /*selected*/
      ctx[7] ? "mdc-menu-item--selected" : "") + "\n    ")) && {
        class: li_class_value
      }, (!current || dirty &
      /*role*/
      64) && {
        role:
        /*role*/
        ctx[6]
      }, dirty &
      /*role, selected*/
      192 && (
      /*role*/
      ctx[6] === "option" ? {
        "aria-selected":
        /*selected*/
        ctx[7] ? "true" : "false"
      } : {}), dirty &
      /*role, checked*/
      1088 && (
      /*role*/
      ctx[6] === "radio" ||
      /*role*/
      ctx[6] === "checkbox" ? {
        "aria-checked":
        /*checked*/
        ctx[10] ? "true" : "false"
      } : {}), (!current || dirty &
      /*tabindex*/
      1) && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*props*/
      4096 &&
      /*props*/
      ctx[12]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      24) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      });
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
      if (detaching) detach_dev(li);
      if (default_slot) default_slot.d(detaching);
      /*li_binding*/

      ctx[23](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(40:0) {:else}",
    ctx: ctx
  });
  return block;
} // (21:23) 


function create_if_block_1$1(ctx) {
  var span;
  var span_class_value;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[20].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[19], null);
  var span_levels = [{
    class: span_class_value = "\n      mdc-list-item\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n    "
  },
  /*activated*/
  ctx[5] ? {
    "aria-current": "page"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  },
  /*props*/
  ctx[12]];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true,
        tabindex: true
      });
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$a, 21, 2, 547);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }
      /*span_binding*/


      ctx[22](span);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, span,
        /*use*/
        ctx[1])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[13].call(null, span)), action_destroyer(Ripple_action = Ripple.call(null, span, {
          ripple:
          /*ripple*/
          ctx[3],
          unbounded: false,
          color:
          /*color*/
          ctx[4]
        })), listen_dev(span, "click",
        /*action*/
        ctx[15], false, false, false), listen_dev(span, "keydown",
        /*handleKeydown*/
        ctx[16], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        524288) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[19], dirty, null, null);
        }
      }

      set_attributes(span, span_data = get_spread_update(span_levels, [(!current || dirty &
      /*className, activated, selected, disabled*/
      420 && span_class_value !== (span_class_value = "\n      mdc-list-item\n      " +
      /*className*/
      ctx[2] + "\n      " + (
      /*activated*/
      ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
      /*selected*/
      ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
      /*disabled*/
      ctx[8] ? "mdc-list-item--disabled" : "") + "\n    ")) && {
        class: span_class_value
      }, dirty &
      /*activated*/
      32 && (
      /*activated*/
      ctx[5] ? {
        "aria-current": "page"
      } : {}), (!current || dirty &
      /*tabindex*/
      1) && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*props*/
      4096 &&
      /*props*/
      ctx[12]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      24) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      });
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
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      /*span_binding*/

      ctx[22](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(21:23) ",
    ctx: ctx
  });
  return block;
} // (1:0) {#if nav && href}


function create_if_block$3(ctx) {
  var a;
  var a_class_value;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[20].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[19], null);
  var a_levels = [{
    class: a_class_value = "\n      mdc-list-item\n      " +
    /*className*/
    ctx[2] + "\n      " + (
    /*activated*/
    ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
    /*selected*/
    ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
    /*disabled*/
    ctx[8] ? "mdc-list-item--disabled" : "") + "\n    "
  }, {
    href:
    /*href*/
    ctx[9]
  },
  /*activated*/
  ctx[5] ? {
    "aria-current": "page"
  } : {}, {
    tabindex:
    /*tabindex*/
    ctx[0]
  },
  /*props*/
  ctx[12]];
  var a_data = {};

  for (var i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }

  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        href: true,
        tabindex: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(a, a_data);
      add_location(a, file$a, 1, 2, 20);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }
      /*a_binding*/


      ctx[21](a);
      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, a,
        /*use*/
        ctx[1])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[13].call(null, a)), action_destroyer(Ripple_action = Ripple.call(null, a, {
          ripple:
          /*ripple*/
          ctx[3],
          unbounded: false,
          color:
          /*color*/
          ctx[4]
        })), listen_dev(a, "click",
        /*action*/
        ctx[15], false, false, false), listen_dev(a, "keydown",
        /*handleKeydown*/
        ctx[16], false, false, false)];
        mounted = true;
      }
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        524288) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[19], dirty, null, null);
        }
      }

      set_attributes(a, a_data = get_spread_update(a_levels, [(!current || dirty &
      /*className, activated, selected, disabled*/
      420 && a_class_value !== (a_class_value = "\n      mdc-list-item\n      " +
      /*className*/
      ctx[2] + "\n      " + (
      /*activated*/
      ctx[5] ? "mdc-list-item--activated" : "") + "\n      " + (
      /*selected*/
      ctx[7] ? "mdc-list-item--selected" : "") + "\n      " + (
      /*disabled*/
      ctx[8] ? "mdc-list-item--disabled" : "") + "\n    ")) && {
        class: a_class_value
      }, (!current || dirty &
      /*href*/
      512) && {
        href:
        /*href*/
        ctx[9]
      }, dirty &
      /*activated*/
      32 && (
      /*activated*/
      ctx[5] ? {
        "aria-current": "page"
      } : {}), (!current || dirty &
      /*tabindex*/
      1) && {
        tabindex:
        /*tabindex*/
        ctx[0]
      }, dirty &
      /*props*/
      4096 &&
      /*props*/
      ctx[12]]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      24) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[3],
        unbounded: false,
        color:
        /*color*/
        ctx[4]
      });
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
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      /*a_binding*/

      ctx[21](null);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(1:0) {#if nav && href}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$3, create_if_block_1$1, create_else_block$2];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*nav*/
    ctx[14] &&
    /*href*/
    ctx[9]) return 0;
    if (
    /*nav*/
    ctx[14] && !
    /*href*/
    ctx[9]) return 1;
    return 2;
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var counter = 0;

function instance$c($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Item", slots, ['default']);
  var dispatch = createEventDispatcher();
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var checked = false;
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;
  var _$$props3 = $$props,
      _$$props3$class = _$$props3.class,
      className = _$$props3$class === void 0 ? "" : _$$props3$class;
  var _$$props4 = $$props,
      _$$props4$ripple = _$$props4.ripple,
      ripple = _$$props4$ripple === void 0 ? true : _$$props4$ripple;
  var _$$props5 = $$props,
      _$$props5$color = _$$props5.color,
      color = _$$props5$color === void 0 ? null : _$$props5$color;
  var _$$props6 = $$props,
      _$$props6$nonInteract = _$$props6.nonInteractive,
      nonInteractive = _$$props6$nonInteract === void 0 ? getContext("SMUI:list:nonInteractive") : _$$props6$nonInteract;
  var _$$props7 = $$props,
      _$$props7$activated = _$$props7.activated,
      activated = _$$props7$activated === void 0 ? false : _$$props7$activated;
  var _$$props8 = $$props,
      _$$props8$role = _$$props8.role,
      role = _$$props8$role === void 0 ? getContext("SMUI:list:item:role") : _$$props8$role;
  var _$$props9 = $$props,
      _$$props9$selected = _$$props9.selected,
      selected = _$$props9$selected === void 0 ? false : _$$props9$selected;
  var _$$props10 = $$props,
      _$$props10$disabled = _$$props10.disabled,
      disabled = _$$props10$disabled === void 0 ? false : _$$props10$disabled;
  var _$$props11 = $$props,
      _$$props11$tabindex = _$$props11.tabindex,
      tabindex = _$$props11$tabindex === void 0 ? !nonInteractive && !disabled && (selected || checked) && "0" || "-1" : _$$props11$tabindex;
  var _$$props12 = $$props,
      _$$props12$href = _$$props12.href,
      href = _$$props12$href === void 0 ? false : _$$props12$href;
  var _$$props13 = $$props,
      _$$props13$inputId = _$$props13.inputId,
      inputId = _$$props13$inputId === void 0 ? "SMUI-form-field-list-" + counter++ : _$$props13$inputId;
  var element;
  var addTabindexIfNoItemsSelectedRaf;
  var nav = getContext("SMUI:list:item:nav");
  setContext("SMUI:generic:input:props", {
    id: inputId
  });
  setContext("SMUI:generic:input:setChecked", setChecked);
  onMount(function () {
    // Tabindex needs to be '0' if this is the first non-disabled list item, and
    // no other item is selected.
    if (!selected && !nonInteractive) {
      var first = true;
      var el = element;

      while (el.previousSibling) {
        el = el.previousSibling;

        if (el.nodeType === 1 && el.classList.contains("mdc-list-item") && !el.classList.contains("mdc-list-item--disabled")) {
          first = false;
          break;
        }
      }

      if (first) {
        // This is first, so now set up a check that no other items are
        // selected.
        addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(addTabindexIfNoItemsSelected);
      }
    }
  });
  onDestroy(function () {
    if (addTabindexIfNoItemsSelectedRaf) {
      window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    }
  });

  function addTabindexIfNoItemsSelected() {
    // Look through next siblings to see if none of them are selected.
    var noneSelected = true;
    var el = element;

    while (el.nextSibling) {
      el = el.nextSibling;

      if (el.nodeType === 1 && el.classList.contains("mdc-list-item") && el.attributes["tabindex"] && el.attributes["tabindex"].value === "0") {
        noneSelected = false;
        break;
      }
    }

    if (noneSelected) {
      // This is the first element, and no other element is selected, so the
      // tabindex should be '0'.
      $$invalidate(0, tabindex = "0");
    }
  }

  function action(e) {
    if (disabled) {
      e.preventDefault();
    } else {
      dispatch("SMUI:action", e);
    }
  }

  function handleKeydown(e) {
    var isEnter = e.key === "Enter" || e.keyCode === 13;
    var isSpace = e.key === "Space" || e.keyCode === 32;

    if (isEnter || isSpace) {
      action(e);
    }
  }

  function setChecked(isChecked) {
    $$invalidate(10, checked = isChecked);
    $$invalidate(0, tabindex = !nonInteractive && !disabled && (selected || checked) && "0" || "-1");
  }

  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(11, element);
    });
  }

  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(11, element);
    });
  }

  function li_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      element = $$value;
      $$invalidate(11, element);
    });
  }

  $$self.$$set = function ($$new_props) {
    $$invalidate(28, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(4, color = $$new_props.color);
    if ("nonInteractive" in $$new_props) $$invalidate(17, nonInteractive = $$new_props.nonInteractive);
    if ("activated" in $$new_props) $$invalidate(5, activated = $$new_props.activated);
    if ("role" in $$new_props) $$invalidate(6, role = $$new_props.role);
    if ("selected" in $$new_props) $$invalidate(7, selected = $$new_props.selected);
    if ("disabled" in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    if ("tabindex" in $$new_props) $$invalidate(0, tabindex = $$new_props.tabindex);
    if ("href" in $$new_props) $$invalidate(9, href = $$new_props.href);
    if ("inputId" in $$new_props) $$invalidate(18, inputId = $$new_props.inputId);
    if ("$$scope" in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      counter: counter,
      onMount: onMount,
      onDestroy: onDestroy,
      getContext: getContext,
      setContext: setContext,
      createEventDispatcher: createEventDispatcher,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      Ripple: Ripple,
      dispatch: dispatch,
      forwardEvents: forwardEvents,
      checked: checked,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      nonInteractive: nonInteractive,
      activated: activated,
      role: role,
      selected: selected,
      disabled: disabled,
      tabindex: tabindex,
      href: href,
      inputId: inputId,
      element: element,
      addTabindexIfNoItemsSelectedRaf: addTabindexIfNoItemsSelectedRaf,
      nav: nav,
      addTabindexIfNoItemsSelected: addTabindexIfNoItemsSelected,
      action: action,
      handleKeydown: handleKeydown,
      setChecked: setChecked,
      props: props
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(28, $$props = assign(assign({}, $$props), $$new_props));
    if ("checked" in $$props) $$invalidate(10, checked = $$new_props.checked);
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(4, color = $$new_props.color);
    if ("nonInteractive" in $$props) $$invalidate(17, nonInteractive = $$new_props.nonInteractive);
    if ("activated" in $$props) $$invalidate(5, activated = $$new_props.activated);
    if ("role" in $$props) $$invalidate(6, role = $$new_props.role);
    if ("selected" in $$props) $$invalidate(7, selected = $$new_props.selected);
    if ("disabled" in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    if ("tabindex" in $$props) $$invalidate(0, tabindex = $$new_props.tabindex);
    if ("href" in $$props) $$invalidate(9, href = $$new_props.href);
    if ("inputId" in $$props) $$invalidate(18, inputId = $$new_props.inputId);
    if ("element" in $$props) $$invalidate(11, element = $$new_props.element);
    if ("addTabindexIfNoItemsSelectedRaf" in $$props) addTabindexIfNoItemsSelectedRaf = $$new_props.addTabindexIfNoItemsSelectedRaf;
    if ("nav" in $$props) $$invalidate(14, nav = $$new_props.nav);
    if ("props" in $$props) $$invalidate(12, props = $$new_props.props);
  };

  var props;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
     $$invalidate(12, props = exclude($$props, ["use", "class", "ripple", "color", "nonInteractive", "activated", "selected", "disabled", "tabindex", "href", "inputId"]));
  };

  $$props = exclude_internal_props($$props);
  return [tabindex, use, className, ripple, color, activated, role, selected, disabled, href, checked, element, props, forwardEvents, nav, action, handleKeydown, nonInteractive, inputId, $$scope, slots, a_binding, span_binding, li_binding];
}

var Item = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Item, _SvelteComponentDev);

  var _super = _createSuper$d(Item);

  function Item(options) {
    var _this;

    _classCallCheck(this, Item);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      use: 1,
      class: 2,
      ripple: 3,
      color: 4,
      nonInteractive: 17,
      activated: 5,
      role: 6,
      selected: 7,
      disabled: 8,
      tabindex: 0,
      href: 9,
      inputId: 18
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Item",
      options: options,
      id: create_fragment$c.name
    });
    return _this;
  }

  _createClass(Item, [{
    key: "use",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "nonInteractive",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "activated",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "role",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selected",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "disabled",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "tabindex",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "href",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inputId",
    get: function get() {
      throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Item;
}(SvelteComponentDev);

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$b = "node_modules/@smui/common/Span.svelte";

function create_fragment$d(ctx) {
  var span;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var span_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var span_data = {};

  for (var i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }

  var block = {
    c: function create() {
      span = element("span");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      if (default_slot) default_slot.l(span_nodes);
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(span, span_data);
      add_location(span, file$b, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);

      if (default_slot) {
        default_slot.m(span, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, span,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, span))];
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

      set_attributes(span, span_data = get_spread_update(span_levels, [dirty &
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
      if (detaching) detach_dev(span);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$d($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("Span", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
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
  return [use, forwardEvents, $$props, $$scope, slots];
}

var Span = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Span, _SvelteComponentDev);

  var _super = _createSuper$e(Span);

  function Span(options) {
    var _this;

    _classCallCheck(this, Span);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Span",
      options: options,
      id: create_fragment$d.name
    });
    return _this;
  }

  _createClass(Span, [{
    key: "use",
    get: function get() {
      throw new Error("<Span>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Span>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Span;
}(SvelteComponentDev);

var Text = classAdderBuilder({
  class: 'mdc-list-item__text',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__primary-text',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__secondary-text',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__graphic',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-item__meta',
  component: Span,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-list-group',
  component: Div,
  contexts: {}
});

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$c = "node_modules/@smui/common/H3.svelte";

function create_fragment$e(ctx) {
  var h3;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var h3_levels = [exclude(
  /*$$props*/
  ctx[2], ["use"])];
  var h3_data = {};

  for (var i = 0; i < h3_levels.length; i += 1) {
    h3_data = assign(h3_data, h3_levels[i]);
  }

  var block = {
    c: function create() {
      h3 = element("h3");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      h3 = claim_element(nodes, "H3", {});
      var h3_nodes = children(h3);
      if (default_slot) default_slot.l(h3_nodes);
      h3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(h3, h3_data);
      add_location(h3, file$c, 0, 0, 0);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h3, anchor);

      if (default_slot) {
        default_slot.m(h3, null);
      }

      current = true;

      if (!mounted) {
        dispose = [action_destroyer(useActions_action = useActions.call(null, h3,
        /*use*/
        ctx[0])), action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[1].call(null, h3))];
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

      set_attributes(h3, h3_data = get_spread_update(h3_levels, [dirty &
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
      if (detaching) detach_dev(h3);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$e.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$e($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("H3", slots, ['default']);
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props2 = $$props,
      _$$props2$use = _$$props2.use,
      use = _$$props2$use === void 0 ? [] : _$$props2$use;

  $$self.$$set = function ($$new_props) {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
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
  return [use, forwardEvents, $$props, $$scope, slots];
}

var H3 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(H3, _SvelteComponentDev);

  var _super = _createSuper$f(H3);

  function H3(options) {
    var _this;

    _classCallCheck(this, H3);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$e, create_fragment$e, safe_not_equal, {
      use: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "H3",
      options: options,
      id: create_fragment$e.name
    });
    return _this;
  }

  _createClass(H3, [{
    key: "use",
    get: function get() {
      throw new Error("<H3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<H3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return H3;
}(SvelteComponentDev);

classAdderBuilder({
  class: 'mdc-list-group__subheader',
  component: H3,
  contexts: {}
});

var Blob_1 = createCommonjsModule(function (module, exports) {
  /* Blob.js
   * A Blob, File, FileReader & URL implementation.
   * 2019-04-30
   *
   * By Eli Grey, http://eligrey.com
   * By Jimmy Wärting, https://github.com/jimmywarting
   * License: MIT
   *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
   */
  (function (global) {
    (function (factory) {
      if ( typeof exports.nodeName !== "string") {
        // CommonJS
        factory(exports);
      } else {
        // Browser globals
        factory(global);
      }
    })(function (exports) {

      var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

      var URL = global.URL || global.webkitURL || function (href, a) {
        a = document.createElement("a");
        a.href = href;
        return a;
      };

      var origBlob = global.Blob;
      var createObjectURL = URL.createObjectURL;
      var revokeObjectURL = URL.revokeObjectURL;
      var strTag = global.Symbol && global.Symbol.toStringTag;
      var blobSupported = false;
      var blobSupportsArrayBufferView = false;
      var arrayBufferSupported = !!global.ArrayBuffer;
      var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

      try {
        // Check if Blob constructor is supported
        blobSupported = new Blob(["ä"]).size === 2; // Check if Blob constructor supports ArrayBufferViews
        // Fails in Safari 6, so we need to map to ArrayBuffers there.

        blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
      } catch (e) {
        /**/
      } // Helper function that maps ArrayBufferViews to ArrayBuffers
      // Used by BlobBuilder constructor and old browsers that didn't
      // support it in the Blob constructor.


      function mapArrayBufferViews(ary) {
        return ary.map(function (chunk) {
          if (chunk.buffer instanceof ArrayBuffer) {
            var buf = chunk.buffer; // if this is a subarray, make a copy so we only
            // include the subarray region from the underlying buffer

            if (chunk.byteLength !== buf.byteLength) {
              var copy = new Uint8Array(chunk.byteLength);
              copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
              buf = copy.buffer;
            }

            return buf;
          }

          return chunk;
        });
      }

      function BlobBuilderConstructor(ary, options) {
        options = options || {};
        var bb = new BlobBuilder();
        mapArrayBufferViews(ary).forEach(function (part) {
          bb.append(part);
        });
        return options.type ? bb.getBlob(options.type) : bb.getBlob();
      }

      function BlobConstructor(ary, options) {
        return new origBlob(mapArrayBufferViews(ary), options || {});
      }

      if (global.Blob) {
        BlobBuilderConstructor.prototype = Blob.prototype;
        BlobConstructor.prototype = Blob.prototype;
      }
      /********************************************************/

      /*               String Encoder fallback                */

      /********************************************************/


      function stringEncode(string) {
        var pos = 0;
        var len = string.length;
        var Arr = global.Uint8Array || Array; // Use byte array when possible

        var at = 0; // output position

        var tlen = Math.max(32, len + (len >> 1) + 7); // 1.5x size

        var target = new Arr(tlen >> 3 << 3); // ... but at 8 byte offset

        while (pos < len) {
          var value = string.charCodeAt(pos++);

          if (value >= 0xd800 && value <= 0xdbff) {
            // high surrogate
            if (pos < len) {
              var extra = string.charCodeAt(pos);

              if ((extra & 0xfc00) === 0xdc00) {
                ++pos;
                value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
              }
            }

            if (value >= 0xd800 && value <= 0xdbff) {
              continue; // drop lone surrogate
            }
          } // expand the buffer if we couldn't write 4 bytes


          if (at + 4 > target.length) {
            tlen += 8; // minimum extra

            tlen *= 1.0 + pos / string.length * 2; // take 2x the remaining

            tlen = tlen >> 3 << 3; // 8 byte offset

            var update = new Uint8Array(tlen);
            update.set(target);
            target = update;
          }

          if ((value & 0xffffff80) === 0) {
            // 1-byte
            target[at++] = value; // ASCII

            continue;
          } else if ((value & 0xfffff800) === 0) {
            // 2-byte
            target[at++] = value >> 6 & 0x1f | 0xc0;
          } else if ((value & 0xffff0000) === 0) {
            // 3-byte
            target[at++] = value >> 12 & 0x0f | 0xe0;
            target[at++] = value >> 6 & 0x3f | 0x80;
          } else if ((value & 0xffe00000) === 0) {
            // 4-byte
            target[at++] = value >> 18 & 0x07 | 0xf0;
            target[at++] = value >> 12 & 0x3f | 0x80;
            target[at++] = value >> 6 & 0x3f | 0x80;
          } else {
            // FIXME: do we care
            continue;
          }

          target[at++] = value & 0x3f | 0x80;
        }

        return target.slice(0, at);
      }
      /********************************************************/

      /*               String Decoder fallback                */

      /********************************************************/


      function stringDecode(buf) {
        var end = buf.length;
        var res = [];
        var i = 0;

        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;

            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 0x80) {
                  codePoint = firstByte;
                }

                break;

              case 2:
                secondByte = buf[i + 1];

                if ((secondByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

                  if (tempCodePoint > 0x7F) {
                    codePoint = tempCodePoint;
                  }
                }

                break;

              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];

                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

                  if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                    codePoint = tempCodePoint;
                  }
                }

                break;

              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];

                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

                  if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                    codePoint = tempCodePoint;
                  }
                }

            }
          }

          if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
          } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
          }

          res.push(codePoint);
          i += bytesPerSequence;
        }

        var len = res.length;
        var str = "";
        var j = 0;

        while (j < len) {
          str += String.fromCharCode.apply(String, res.slice(j, j += 0x1000));
        }

        return str;
      } // string -> buffer


      var textEncode = typeof TextEncoder === "function" ? TextEncoder.prototype.encode.bind(new TextEncoder()) : stringEncode; // buffer -> string

      var textDecode = typeof TextDecoder === "function" ? TextDecoder.prototype.decode.bind(new TextDecoder()) : stringDecode;

      function FakeBlobBuilder() {
        function isDataView(obj) {
          return obj && Object.prototype.isPrototypeOf.call(DataView, obj);
        }

        function bufferClone(buf) {
          var view = new Array(buf.byteLength);
          var array = new Uint8Array(buf);
          var i = view.length;

          while (i--) {
            view[i] = array[i];
          }

          return view;
        }

        function array2base64(input) {
          var byteToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = [];

          for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;
            var outByte1 = byte1 >> 2;
            var outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
            var outByte3 = (byte2 & 0x0F) << 2 | byte3 >> 6;
            var outByte4 = byte3 & 0x3F;

            if (!haveByte3) {
              outByte4 = 64;

              if (!haveByte2) {
                outByte3 = 64;
              }
            }

            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
          }

          return output.join("");
        }

        var create = Object.create || function (a) {
          function c() {}

          c.prototype = a;
          return new c();
        };

        if (arrayBufferSupported) {
          var viewClasses = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"];

          var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }

        function concatTypedarrays(chunks) {
          var size = 0;
          var j = chunks.length;

          while (j--) {
            size += chunks[j].length;
          }

          var b = new Uint8Array(size);
          var offset = 0;

          for (var i = 0; i < chunks.length; i++) {
            var chunk = chunks[i];
            b.set(chunk, offset);
            offset += chunk.byteLength || chunk.length;
          }

          return b;
        }
        /********************************************************/

        /*                   Blob constructor                   */

        /********************************************************/


        function Blob(chunks, opts) {
          chunks = chunks || [];
          opts = opts == null ? {} : opts;

          for (var i = 0, len = chunks.length; i < len; i++) {
            var chunk = chunks[i];

            if (chunk instanceof Blob) {
              chunks[i] = chunk._buffer;
            } else if (typeof chunk === "string") {
              chunks[i] = textEncode(chunk);
            } else if (arrayBufferSupported && (Object.prototype.isPrototypeOf.call(ArrayBuffer, chunk) || isArrayBufferView(chunk))) {
              chunks[i] = bufferClone(chunk);
            } else if (arrayBufferSupported && isDataView(chunk)) {
              chunks[i] = bufferClone(chunk.buffer);
            } else {
              chunks[i] = textEncode(String(chunk));
            }
          }

          this._buffer = global.Uint8Array ? concatTypedarrays(chunks) : [].concat.apply([], chunks);
          this.size = this._buffer.length;
          this.type = opts.type || "";

          if (/[^\u0020-\u007E]/.test(this.type)) {
            this.type = "";
          } else {
            this.type = this.type.toLowerCase();
          }
        }

        Blob.prototype.arrayBuffer = function () {
          return Promise.resolve(this._buffer);
        };

        Blob.prototype.text = function () {
          return Promise.resolve(textDecode(this._buffer));
        };

        Blob.prototype.slice = function (start, end, type) {
          var slice = this._buffer.slice(start || 0, end || this._buffer.length);

          return new Blob([slice], {
            type: type
          });
        };

        Blob.prototype.toString = function () {
          return "[object Blob]";
        };
        /********************************************************/

        /*                   File constructor                   */

        /********************************************************/


        function File(chunks, name, opts) {
          opts = opts || {};
          var a = Blob.call(this, chunks, opts) || this;
          a.name = name.replace(/\//g, ":");
          a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
          a.lastModified = +a.lastModifiedDate;
          return a;
        }

        File.prototype = create(Blob.prototype);
        File.prototype.constructor = File;

        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(File, Blob);
        } else {
          try {
            File.__proto__ = Blob;
          } catch (e) {
            /**/
          }
        }

        File.prototype.toString = function () {
          return "[object File]";
        };
        /********************************************************/

        /*                FileReader constructor                */

        /********************************************************/


        function FileReader() {
          if (!(this instanceof FileReader)) {
            throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
          }

          var delegate = document.createDocumentFragment();
          this.addEventListener = delegate.addEventListener;

          this.dispatchEvent = function (evt) {
            var local = this["on" + evt.type];
            if (typeof local === "function") local(evt);
            delegate.dispatchEvent(evt);
          };

          this.removeEventListener = delegate.removeEventListener;
        }

        function _read(fr, blob, kind) {
          if (!(blob instanceof Blob)) {
            throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
          }

          fr.result = "";
          setTimeout(function () {
            this.readyState = FileReader.LOADING;
            fr.dispatchEvent(new Event("load"));
            fr.dispatchEvent(new Event("loadend"));
          });
        }

        FileReader.EMPTY = 0;
        FileReader.LOADING = 1;
        FileReader.DONE = 2;
        FileReader.prototype.error = null;
        FileReader.prototype.onabort = null;
        FileReader.prototype.onerror = null;
        FileReader.prototype.onload = null;
        FileReader.prototype.onloadend = null;
        FileReader.prototype.onloadstart = null;
        FileReader.prototype.onprogress = null;

        FileReader.prototype.readAsDataURL = function (blob) {
          _read(this, blob, "readAsDataURL");

          this.result = "data:" + blob.type + ";base64," + array2base64(blob._buffer);
        };

        FileReader.prototype.readAsText = function (blob) {
          _read(this, blob, "readAsText");

          this.result = textDecode(blob._buffer);
        };

        FileReader.prototype.readAsArrayBuffer = function (blob) {
          _read(this, blob, "readAsText"); // return ArrayBuffer when possible


          this.result = (blob._buffer.buffer || blob._buffer).slice();
        };

        FileReader.prototype.abort = function () {};
        /********************************************************/

        /*                         URL                          */

        /********************************************************/


        URL.createObjectURL = function (blob) {
          return blob instanceof Blob ? "data:" + blob.type + ";base64," + array2base64(blob._buffer) : createObjectURL.call(URL, blob);
        };

        URL.revokeObjectURL = function (url) {
          revokeObjectURL && revokeObjectURL.call(URL, url);
        };
        /********************************************************/

        /*                         XHR                          */

        /********************************************************/


        var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;

        if (_send) {
          XMLHttpRequest.prototype.send = function (data) {
            if (data instanceof Blob) {
              this.setRequestHeader("Content-Type", data.type);

              _send.call(this, textDecode(data._buffer));
            } else {
              _send.call(this, data);
            }
          };
        }

        exports.Blob = Blob;
        exports.File = File;
        exports.FileReader = FileReader;
        exports.URL = URL;
      }

      function fixFileAndXHR() {
        var isIE = !!global.ActiveXObject || "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style; // Monkey patched
        // IE doesn't set Content-Type header on XHR whose body is a typed Blob
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6047383

        var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;

        if (isIE && _send) {
          XMLHttpRequest.prototype.send = function (data) {
            if (data instanceof Blob) {
              this.setRequestHeader("Content-Type", data.type);

              _send.call(this, data);
            } else {
              _send.call(this, data);
            }
          };
        }

        try {
          new File([], "");
          exports.File = global.File;
          exports.FileReader = global.FileReader;
        } catch (e) {
          try {
            exports.File = new Function("class File extends Blob {" + "constructor(chunks, name, opts) {" + "opts = opts || {};" + "super(chunks, opts || {});" + "this.name = name.replace(/\\//g, \":\");" + "this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();" + "this.lastModified = +this.lastModifiedDate;" + "}};" + "return new File([], \"\"), File")();
          } catch (e) {
            exports.File = function (b, d, c) {
              var blob = new Blob(b, c);
              var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();
              blob.name = d.replace(/\//g, ":");
              blob.lastModifiedDate = t;
              blob.lastModified = +t;

              blob.toString = function () {
                return "[object File]";
              };

              if (strTag) {
                blob[strTag] = "File";
              }

              return blob;
            };
          }
        }
      }

      if (blobSupported) {
        fixFileAndXHR();
        exports.Blob = blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
      } else if (blobBuilderSupported) {
        fixFileAndXHR();
        exports.Blob = BlobBuilderConstructor;
      } else {
        FakeBlobBuilder();
      }

      if (strTag) {
        if (!exports.File.prototype[strTag]) exports.File.prototype[strTag] = "File";
        if (!exports.Blob.prototype[strTag]) exports.Blob.prototype[strTag] = "Blob";
        if (!exports.FileReader.prototype[strTag]) exports.FileReader.prototype[strTag] = "FileReader";
      }

      var blob = exports.Blob.prototype;
      var stream;

      try {
        new ReadableStream({
          type: "bytes"
        });

        stream = function stream() {
          var position = 0;
          var blob = this;
          return new ReadableStream({
            type: "bytes",
            autoAllocateChunkSize: 524288,
            pull: function pull(controller) {
              var v = controller.byobRequest.view;
              var chunk = blob.slice(position, position + v.byteLength);
              return chunk.arrayBuffer().then(function (buffer) {
                var uint8array = new Uint8Array(buffer);
                var bytesRead = uint8array.byteLength;
                position += bytesRead;
                v.set(uint8array);
                controller.byobRequest.respond(bytesRead);
                if (position >= blob.size) controller.close();
              });
            }
          });
        };
      } catch (e) {
        try {
          new ReadableStream({});

          stream = function stream(blob) {
            var position = 0;
            return new ReadableStream({
              pull: function pull(controller) {
                var chunk = blob.slice(position, position + 524288);
                return chunk.arrayBuffer().then(function (buffer) {
                  position += buffer.byteLength;
                  var uint8array = new Uint8Array(buffer);
                  controller.enqueue(uint8array);
                  if (position == blob.size) controller.close();
                });
              }
            });
          };
        } catch (e) {
          try {
            new Response("").body.getReader().read();

            stream = function stream() {
              return new Response(this).body;
            };
          } catch (e) {
            stream = function stream() {
              throw new Error("Include https://github.com/MattiasBuelens/web-streams-polyfill");
            };
          }
        }
      }

      function promisify(obj) {
        return new Promise(function (resolve, reject) {
          obj.onload = obj.onerror = function (evt) {
            obj.onload = obj.onerror = null;
            evt.type === "load" ? resolve(obj.result || obj) : reject(new Error("Failed to read the blob/file"));
          };
        });
      }

      if (!blob.arrayBuffer) {
        blob.arrayBuffer = function arrayBuffer() {
          var fr = new FileReader();
          fr.readAsArrayBuffer(this);
          return promisify(fr);
        };
      }

      if (!blob.text) {
        blob.text = function text() {
          var fr = new FileReader();
          fr.readAsText(this);
          return promisify(fr);
        };
      }

      if (!blob.stream) {
        blob.stream = stream;
      }
    });
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof commonjsGlobal !== "undefined" && commonjsGlobal || commonjsGlobal);
});

var localforage = createCommonjsModule(function (module, exports) {
  /*!
      localForage -- Offline Storage, Improved
      Version 1.9.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  */
  (function (f) {
    {
      module.exports = f();
    }
  })(function () {
    return function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof commonjsRequire == "function" && commonjsRequire;
            if (!u && a) return a(o, !0);
            if (i) return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }

          var l = n[o] = {
            exports: {}
          };
          t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }

        return n[o].exports;
      }

      var i = typeof commonjsRequire == "function" && commonjsRequire;

      for (var o = 0; o < r.length; o++) {
        s(r[o]);
      }

      return s;
    }({
      1: [function (_dereq_, module, exports) {
        (function (global) {

          var Mutation = global.MutationObserver || global.WebKitMutationObserver;
          var scheduleDrain;
          {
            if (Mutation) {
              var called = 0;
              var observer = new Mutation(nextTick);
              var element = global.document.createTextNode('');
              observer.observe(element, {
                characterData: true
              });

              scheduleDrain = function scheduleDrain() {
                element.data = called = ++called % 2;
              };
            } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
              var channel = new global.MessageChannel();
              channel.port1.onmessage = nextTick;

              scheduleDrain = function scheduleDrain() {
                channel.port2.postMessage(0);
              };
            } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
              scheduleDrain = function scheduleDrain() {
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var scriptEl = global.document.createElement('script');

                scriptEl.onreadystatechange = function () {
                  nextTick();
                  scriptEl.onreadystatechange = null;
                  scriptEl.parentNode.removeChild(scriptEl);
                  scriptEl = null;
                };

                global.document.documentElement.appendChild(scriptEl);
              };
            } else {
              scheduleDrain = function scheduleDrain() {
                setTimeout(nextTick, 0);
              };
            }
          }
          var draining;
          var queue = []; //named nextTick for less confusing stack traces

          function nextTick() {
            draining = true;
            var i, oldQueue;
            var len = queue.length;

            while (len) {
              oldQueue = queue;
              queue = [];
              i = -1;

              while (++i < len) {
                oldQueue[i]();
              }

              len = queue.length;
            }

            draining = false;
          }

          module.exports = immediate;

          function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
              scheduleDrain();
            }
          }
        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      2: [function (_dereq_, module, exports) {

        var immediate = _dereq_(1);
        /* istanbul ignore next */


        function INTERNAL() {}

        var handlers = {};
        var REJECTED = ['REJECTED'];
        var FULFILLED = ['FULFILLED'];
        var PENDING = ['PENDING'];
        module.exports = Promise;

        function Promise(resolver) {
          if (typeof resolver !== 'function') {
            throw new TypeError('resolver must be a function');
          }

          this.state = PENDING;
          this.queue = [];
          this.outcome = void 0;

          if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver);
          }
        }

        Promise.prototype["catch"] = function (onRejected) {
          return this.then(null, onRejected);
        };

        Promise.prototype.then = function (onFulfilled, onRejected) {
          if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
            return this;
          }

          var promise = new this.constructor(INTERNAL);

          if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
            unwrap(promise, resolver, this.outcome);
          } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
          }

          return promise;
        };

        function QueueItem(promise, onFulfilled, onRejected) {
          this.promise = promise;

          if (typeof onFulfilled === 'function') {
            this.onFulfilled = onFulfilled;
            this.callFulfilled = this.otherCallFulfilled;
          }

          if (typeof onRejected === 'function') {
            this.onRejected = onRejected;
            this.callRejected = this.otherCallRejected;
          }
        }

        QueueItem.prototype.callFulfilled = function (value) {
          handlers.resolve(this.promise, value);
        };

        QueueItem.prototype.otherCallFulfilled = function (value) {
          unwrap(this.promise, this.onFulfilled, value);
        };

        QueueItem.prototype.callRejected = function (value) {
          handlers.reject(this.promise, value);
        };

        QueueItem.prototype.otherCallRejected = function (value) {
          unwrap(this.promise, this.onRejected, value);
        };

        function unwrap(promise, func, value) {
          immediate(function () {
            var returnValue;

            try {
              returnValue = func(value);
            } catch (e) {
              return handlers.reject(promise, e);
            }

            if (returnValue === promise) {
              handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
            } else {
              handlers.resolve(promise, returnValue);
            }
          });
        }

        handlers.resolve = function (self, value) {
          var result = tryCatch(getThen, value);

          if (result.status === 'error') {
            return handlers.reject(self, result.value);
          }

          var thenable = result.value;

          if (thenable) {
            safelyResolveThenable(self, thenable);
          } else {
            self.state = FULFILLED;
            self.outcome = value;
            var i = -1;
            var len = self.queue.length;

            while (++i < len) {
              self.queue[i].callFulfilled(value);
            }
          }

          return self;
        };

        handlers.reject = function (self, error) {
          self.state = REJECTED;
          self.outcome = error;
          var i = -1;
          var len = self.queue.length;

          while (++i < len) {
            self.queue[i].callRejected(error);
          }

          return self;
        };

        function getThen(obj) {
          // Make sure we only access the accessor once as required by the spec
          var then = obj && obj.then;

          if (obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof then === 'function') {
            return function appyThen() {
              then.apply(obj, arguments);
            };
          }
        }

        function safelyResolveThenable(self, thenable) {
          // Either fulfill, reject or reject with error
          var called = false;

          function onError(value) {
            if (called) {
              return;
            }

            called = true;
            handlers.reject(self, value);
          }

          function onSuccess(value) {
            if (called) {
              return;
            }

            called = true;
            handlers.resolve(self, value);
          }

          function tryToUnwrap() {
            thenable(onSuccess, onError);
          }

          var result = tryCatch(tryToUnwrap);

          if (result.status === 'error') {
            onError(result.value);
          }
        }

        function tryCatch(func, value) {
          var out = {};

          try {
            out.value = func(value);
            out.status = 'success';
          } catch (e) {
            out.status = 'error';
            out.value = e;
          }

          return out;
        }

        Promise.resolve = resolve;

        function resolve(value) {
          if (value instanceof this) {
            return value;
          }

          return handlers.resolve(new this(INTERNAL), value);
        }

        Promise.reject = reject;

        function reject(reason) {
          var promise = new this(INTERNAL);
          return handlers.reject(promise, reason);
        }

        Promise.all = all;

        function all(iterable) {
          var self = this;

          if (Object.prototype.toString.call(iterable) !== '[object Array]') {
            return this.reject(new TypeError('must be an array'));
          }

          var len = iterable.length;
          var called = false;

          if (!len) {
            return this.resolve([]);
          }

          var values = new Array(len);
          var resolved = 0;
          var i = -1;
          var promise = new this(INTERNAL);

          while (++i < len) {
            allResolver(iterable[i], i);
          }

          return promise;

          function allResolver(value, i) {
            self.resolve(value).then(resolveFromAll, function (error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });

            function resolveFromAll(outValue) {
              values[i] = outValue;

              if (++resolved === len && !called) {
                called = true;
                handlers.resolve(promise, values);
              }
            }
          }
        }

        Promise.race = race;

        function race(iterable) {
          var self = this;

          if (Object.prototype.toString.call(iterable) !== '[object Array]') {
            return this.reject(new TypeError('must be an array'));
          }

          var len = iterable.length;
          var called = false;

          if (!len) {
            return this.resolve([]);
          }

          var i = -1;
          var promise = new this(INTERNAL);

          while (++i < len) {
            resolver(iterable[i]);
          }

          return promise;

          function resolver(value) {
            self.resolve(value).then(function (response) {
              if (!called) {
                called = true;
                handlers.resolve(promise, response);
              }
            }, function (error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
          }
        }
      }, {
        "1": 1
      }],
      3: [function (_dereq_, module, exports) {
        (function (global) {

          if (typeof global.Promise !== 'function') {
            global.Promise = _dereq_(2);
          }
        }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "2": 2
      }],
      4: [function (_dereq_, module, exports) {

        var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
        };

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function getIDB() {
          /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
          try {
            if (typeof indexedDB !== 'undefined') {
              return indexedDB;
            }

            if (typeof webkitIndexedDB !== 'undefined') {
              return webkitIndexedDB;
            }

            if (typeof mozIndexedDB !== 'undefined') {
              return mozIndexedDB;
            }

            if (typeof OIndexedDB !== 'undefined') {
              return OIndexedDB;
            }

            if (typeof msIndexedDB !== 'undefined') {
              return msIndexedDB;
            }
          } catch (e) {
            return;
          }
        }

        var idb = getIDB();

        function isIndexedDBValid() {
          try {
            // Initialize IndexedDB; fall back to vendor-prefixed versions
            // if needed.
            if (!idb || !idb.open) {
              return false;
            } // We mimic PouchDB here;
            //
            // We test for openDatabase because IE Mobile identifies itself
            // as Safari. Oh the lulz...


            var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
            var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1; // Safari <10.1 does not meet our requirements for IDB support
            // (see: https://github.com/pouchdb/pouchdb/issues/5572).
            // Safari 10.1 shipped with fetch, we can use that to detect it.
            // Note: this creates issues with `window.fetch` polyfills and
            // overrides; see:
            // https://github.com/localForage/localForage/issues/856

            return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && // some outdated implementations of IDB that appear on Samsung
            // and HTC Android devices <4.4 are missing IDBKeyRange
            // See: https://github.com/mozilla/localForage/issues/128
            // See: https://github.com/mozilla/localForage/issues/272
            typeof IDBKeyRange !== 'undefined';
          } catch (e) {
            return false;
          }
        } // Abstracts constructing a Blob object, so it also works in older
        // browsers that don't support the native Blob constructor. (i.e.
        // old QtWebKit versions, at least).
        // Abstracts constructing a Blob object, so it also works in older
        // browsers that don't support the native Blob constructor. (i.e.
        // old QtWebKit versions, at least).


        function createBlob(parts, properties) {
          /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
          parts = parts || [];
          properties = properties || {};

          try {
            return new Blob(parts, properties);
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }

            var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
            var builder = new Builder();

            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }

            return builder.getBlob(properties.type);
          }
        } // This is CommonJS because lie is an external dependency, so Rollup
        // can just ignore it.


        if (typeof Promise === 'undefined') {
          // In the "nopromises" build this will just throw if you don't have
          // a global promise object, but it would throw anyway later.
          _dereq_(3);
        }

        var Promise$1 = Promise;

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function (result) {
              callback(null, result);
            }, function (error) {
              callback(error);
            });
          }
        }

        function executeTwoCallbacks(promise, callback, errorCallback) {
          if (typeof callback === 'function') {
            promise.then(callback);
          }

          if (typeof errorCallback === 'function') {
            promise["catch"](errorCallback);
          }
        }

        function normalizeKey(key) {
          // Cast the key to a string, as that's all we can set as a key.
          if (typeof key !== 'string') {
            console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          return key;
        }

        function getCallback() {
          if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
            return arguments[arguments.length - 1];
          }
        } // Some code originally from async_storage.js in
        // [Gaia](https://github.com/mozilla-b2g/gaia).


        var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
        var supportsBlobs = void 0;
        var dbContexts = {};
        var toString = Object.prototype.toString; // Transaction Modes

        var READ_ONLY = 'readonly';
        var READ_WRITE = 'readwrite'; // Transform a binary string to an array buffer, because otherwise
        // weird stuff happens when you try to work with the binary string directly.
        // It is known.
        // From http://stackoverflow.com/questions/14967647/ (continues on next line)
        // encode-decode-image-with-base64-breaks-image (2013-04-21)

        function _binStringToArrayBuffer(bin) {
          var length = bin.length;
          var buf = new ArrayBuffer(length);
          var arr = new Uint8Array(buf);

          for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i);
          }

          return buf;
        } //
        // Blobs are not supported in all versions of IndexedDB, notably
        // Chrome <37 and Android <5. In those versions, storing a blob will throw.
        //
        // Various other blob bugs exist in Chrome v37-42 (inclusive).
        // Detecting them is expensive and confusing to users, and Chrome 37-42
        // is at very low usage worldwide, so we do a hacky userAgent check instead.
        //
        // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
        // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
        // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
        //
        // Code borrowed from PouchDB. See:
        // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
        //


        function _checkBlobSupportWithoutCaching(idb) {
          return new Promise$1(function (resolve) {
            var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
            var blob = createBlob(['']);
            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

            txn.onabort = function (e) {
              // If the transaction aborts now its due to not being able to
              // write to the database, likely due to the disk being full
              e.preventDefault();
              e.stopPropagation();
              resolve(false);
            };

            txn.oncomplete = function () {
              var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
              var matchedEdge = navigator.userAgent.match(/Edge\//); // MS Edge pretends to be Chrome 42:
              // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx

              resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
          })["catch"](function () {
            return false; // error, so assume unsupported
          });
        }

        function _checkBlobSupport(idb) {
          if (typeof supportsBlobs === 'boolean') {
            return Promise$1.resolve(supportsBlobs);
          }

          return _checkBlobSupportWithoutCaching(idb).then(function (value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }

        function _deferReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name]; // Create a deferred object representing the current database operation.

          var deferredOperation = {};
          deferredOperation.promise = new Promise$1(function (resolve, reject) {
            deferredOperation.resolve = resolve;
            deferredOperation.reject = reject;
          }); // Enqueue the deferred operation.

          dbContext.deferredOperations.push(deferredOperation); // Chain its promise to the database readiness.

          if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
          } else {
            dbContext.dbReady = dbContext.dbReady.then(function () {
              return deferredOperation.promise;
            });
          }
        }

        function _advanceReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

          var deferredOperation = dbContext.deferredOperations.pop(); // Resolve its promise (which is part of the database readiness
          // chain of promises).

          if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
          }
        }

        function _rejectReadiness(dbInfo, err) {
          var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

          var deferredOperation = dbContext.deferredOperations.pop(); // Reject its promise (which is part of the database readiness
          // chain of promises).

          if (deferredOperation) {
            deferredOperation.reject(err);
            return deferredOperation.promise;
          }
        }

        function _getConnection(dbInfo, upgradeNeeded) {
          return new Promise$1(function (resolve, reject) {
            dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

            if (dbInfo.db) {
              if (upgradeNeeded) {
                _deferReadiness(dbInfo);

                dbInfo.db.close();
              } else {
                return resolve(dbInfo.db);
              }
            }

            var dbArgs = [dbInfo.name];

            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }

            var openreq = idb.open.apply(idb, dbArgs);

            if (upgradeNeeded) {
              openreq.onupgradeneeded = function (e) {
                var db = openreq.result;

                try {
                  db.createObjectStore(dbInfo.storeName);

                  if (e.oldVersion <= 1) {
                    // Added when support for blob shims was added
                    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                  }
                } catch (ex) {
                  if (ex.name === 'ConstraintError') {
                    console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }

            openreq.onerror = function (e) {
              e.preventDefault();
              reject(openreq.error);
            };

            openreq.onsuccess = function () {
              resolve(openreq.result);

              _advanceReadiness(dbInfo);
            };
          });
        }

        function _getOriginalConnection(dbInfo) {
          return _getConnection(dbInfo, false);
        }

        function _getUpgradedConnection(dbInfo) {
          return _getConnection(dbInfo, true);
        }

        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }

          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;

          if (isDowngrade) {
            // If the version is not the default one
            // then warn for impossible downgrade.
            if (dbInfo.version !== defaultVersion) {
              console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
            } // Align the versions to prevent errors.


            dbInfo.version = dbInfo.db.version;
          }

          if (isUpgrade || isNewStore) {
            // If the store is new then increment the version (if needed).
            // This will trigger an "upgradeneeded" event which is required
            // for creating a store.
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;

              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }

            return true;
          }

          return false;
        } // encode a blob for indexeddb engines that don't support blobs


        function _encodeBlob(blob) {
          return new Promise$1(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;

            reader.onloadend = function (e) {
              var base64 = btoa(e.target.result || '');
              resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };

            reader.readAsBinaryString(blob);
          });
        } // decode an encoded blob


        function _decodeBlob(encodedBlob) {
          var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));

          return createBlob([arrayBuff], {
            type: encodedBlob.type
          });
        } // is this one of our fancy encoded blobs?


        function _isEncodedBlob(value) {
          return value && value.__local_forage_encoded_blob;
        } // Specialize the default `ready()` function by making it dependent
        // on the current database operations. Thus, the driver will be actually
        // ready when it's been initialized (default) *and* there are no pending
        // operations on the database (initiated by some other instances).


        function _fullyReady(callback) {
          var self = this;

          var promise = self._initReady().then(function () {
            var dbContext = dbContexts[self._dbInfo.name];

            if (dbContext && dbContext.dbReady) {
              return dbContext.dbReady;
            }
          });

          executeTwoCallbacks(promise, callback, callback);
          return promise;
        } // Try to establish a new db connection to replace the
        // current one which is broken (i.e. experiencing
        // InvalidStateError while creating a transaction).


        function _tryReconnect(dbInfo) {
          _deferReadiness(dbInfo);

          var dbContext = dbContexts[dbInfo.name];
          var forages = dbContext.forages;

          for (var i = 0; i < forages.length; i++) {
            var forage = forages[i];

            if (forage._dbInfo.db) {
              forage._dbInfo.db.close();

              forage._dbInfo.db = null;
            }
          }

          dbInfo.db = null;
          return _getOriginalConnection(dbInfo).then(function (db) {
            dbInfo.db = db;

            if (_isUpgradeNeeded(dbInfo)) {
              // Reopen the database for upgrading.
              return _getUpgradedConnection(dbInfo);
            }

            return db;
          }).then(function (db) {
            // store the latest db reference
            // in case the db was upgraded
            dbInfo.db = dbContext.db = db;

            for (var i = 0; i < forages.length; i++) {
              forages[i]._dbInfo.db = db;
            }
          })["catch"](function (err) {
            _rejectReadiness(dbInfo, err);

            throw err;
          });
        } // FF doesn't like Promises (micro-tasks) and IDDB store operations,
        // so we have to do it with callbacks


        function createTransaction(dbInfo, mode, callback, retries) {
          if (retries === undefined) {
            retries = 1;
          }

          try {
            var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
            callback(null, tx);
          } catch (err) {
            if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
              return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                  // increase the db version, to create the new ObjectStore
                  if (dbInfo.db) {
                    dbInfo.version = dbInfo.db.version + 1;
                  } // Reopen the database for upgrading.


                  return _getUpgradedConnection(dbInfo);
                }
              }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                  createTransaction(dbInfo, mode, callback, retries - 1);
                });
              })["catch"](callback);
            }

            callback(err);
          }
        }

        function createDbContext() {
          return {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
          };
        } // Open the IndexedDB database (automatically creates one if one didn't
        // previously exist), using any options set in the config.


        function _initStorage(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          } // Get the current context of the database;


          var dbContext = dbContexts[dbInfo.name]; // ...or create a new context.

          if (!dbContext) {
            dbContext = createDbContext(); // Register the new context in the global container.

            dbContexts[dbInfo.name] = dbContext;
          } // Register itself as a running localForage in the current context.


          dbContext.forages.push(self); // Replace the default `ready()` function with the specialized one.

          if (!self._initReady) {
            self._initReady = self.ready;
            self.ready = _fullyReady;
          } // Create an array of initialization states of the related localForages.


          var initPromises = [];

          function ignoreErrors() {
            // Don't handle errors here,
            // just makes sure related localForages aren't pending.
            return Promise$1.resolve();
          }

          for (var j = 0; j < dbContext.forages.length; j++) {
            var forage = dbContext.forages[j];

            if (forage !== self) {
              // Don't wait for itself...
              initPromises.push(forage._initReady()["catch"](ignoreErrors));
            }
          } // Take a snapshot of the related localForages.


          var forages = dbContext.forages.slice(0); // Initialize the connection process only when
          // all the related localForages aren't pending.

          return Promise$1.all(initPromises).then(function () {
            dbInfo.db = dbContext.db; // Get the connection or open a new one without upgrade.

            return _getOriginalConnection(dbInfo);
          }).then(function (db) {
            dbInfo.db = db;

            if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
              // Reopen the database for upgrading.
              return _getUpgradedConnection(dbInfo);
            }

            return db;
          }).then(function (db) {
            dbInfo.db = dbContext.db = db;
            self._dbInfo = dbInfo; // Share the final connection amongst related localForages.

            for (var k = 0; k < forages.length; k++) {
              var forage = forages[k];

              if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
              }
            }
          });
        }

        function getItem(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.get(key);

                  req.onsuccess = function () {
                    var value = req.result;

                    if (value === undefined) {
                      value = null;
                    }

                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }

                    resolve(value);
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Iterate over all items stored in database.


        function iterate(iterator, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.openCursor();
                  var iterationNumber = 1;

                  req.onsuccess = function () {
                    var cursor = req.result;

                    if (cursor) {
                      var value = cursor.value;

                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }

                      var result = iterator(value, cursor.key, iterationNumber++); // when the iterator callback returns any
                      // (non-`undefined`) value, then we stop
                      // the iteration immediately

                      if (result !== void 0) {
                        resolve(result);
                      } else {
                        cursor["continue"]();
                      }
                    } else {
                      resolve();
                    }
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function setItem(key, value, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            var dbInfo;
            self.ready().then(function () {
              dbInfo = self._dbInfo;

              if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                  if (blobSupport) {
                    return value;
                  }

                  return _encodeBlob(value);
                });
              }

              return value;
            }).then(function (value) {
              createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName); // The reason we don't _save_ null is because IE 10 does
                  // not support saving the `null` type in IndexedDB. How
                  // ironic, given the bug below!
                  // See: https://github.com/mozilla/localForage/issues/161

                  if (value === null) {
                    value = undefined;
                  }

                  var req = store.put(value, key);

                  transaction.oncomplete = function () {
                    // Cast to undefined so the value passed to
                    // callback/promise is the same as what one would get out
                    // of `getItem()` later. This leads to some weirdness
                    // (setItem('foo', undefined) will return `null`), but
                    // it's not my fault localStorage is our baseline and that
                    // it's weird.
                    if (value === undefined) {
                      value = null;
                    }

                    resolve(value);
                  };

                  transaction.onabort = transaction.onerror = function () {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function removeItem(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName); // We use a Grunt task to make this safe for IE and some
                  // versions of Android (including those used by Cordova).
                  // Normally IE won't like `.delete()` and will insist on
                  // using `['delete']()`, but we have a build step that
                  // fixes this for us now.

                  var req = store["delete"](key);

                  transaction.oncomplete = function () {
                    resolve();
                  };

                  transaction.onerror = function () {
                    reject(req.error);
                  }; // The request will be also be aborted if we've exceeded our storage
                  // space.


                  transaction.onabort = function () {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function clear(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.clear();

                  transaction.oncomplete = function () {
                    resolve();
                  };

                  transaction.onabort = transaction.onerror = function () {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function length(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.count();

                  req.onsuccess = function () {
                    resolve(req.result);
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            if (n < 0) {
              resolve(null);
              return;
            }

            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var advanced = false;
                  var req = store.openKeyCursor();

                  req.onsuccess = function () {
                    var cursor = req.result;

                    if (!cursor) {
                      // this means there weren't enough keys
                      resolve(null);
                      return;
                    }

                    if (n === 0) {
                      // We have the first key, return it if that's what they
                      // wanted.
                      resolve(cursor.key);
                    } else {
                      if (!advanced) {
                        // Otherwise, ask the cursor to skip ahead n
                        // records.
                        advanced = true;
                        cursor.advance(n);
                      } else {
                        // When we get here, we've got the nth key.
                        resolve(cursor.key);
                      }
                    }
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.openKeyCursor();
                  var keys = [];

                  req.onsuccess = function () {
                    var cursor = req.result;

                    if (!cursor) {
                      resolve(keys);
                      return;
                    }

                    keys.push(cursor.key);
                    cursor["continue"]();
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function dropInstance(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== 'function' && options || {};

          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }

          var self = this;
          var promise;

          if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
          } else {
            var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
            var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              dbContext.db = db;

              for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
              }

              return db;
            });

            if (!options.storeName) {
              promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();

                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                  var req = idb.deleteDatabase(options.name);

                  req.onerror = req.onblocked = function (err) {
                    var db = req.result;

                    if (db) {
                      db.close();
                    }

                    reject(err);
                  };

                  req.onsuccess = function () {
                    var db = req.result;

                    if (db) {
                      db.close();
                    }

                    resolve(db);
                  };
                });
                return dropDBPromise.then(function (db) {
                  dbContext.db = db;

                  for (var i = 0; i < forages.length; i++) {
                    var _forage = forages[i];

                    _advanceReadiness(_forage._dbInfo);
                  }
                })["catch"](function (err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                  throw err;
                });
              });
            } else {
              promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                  return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();

                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                  forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                  var req = idb.open(options.name, newVersion);

                  req.onerror = function (err) {
                    var db = req.result;
                    db.close();
                    reject(err);
                  };

                  req.onupgradeneeded = function () {
                    var db = req.result;
                    db.deleteObjectStore(options.storeName);
                  };

                  req.onsuccess = function () {
                    var db = req.result;
                    db.close();
                    resolve(db);
                  };
                });
                return dropObjectPromise.then(function (db) {
                  dbContext.db = db;

                  for (var j = 0; j < forages.length; j++) {
                    var _forage2 = forages[j];
                    _forage2._dbInfo.db = db;

                    _advanceReadiness(_forage2._dbInfo);
                  }
                })["catch"](function (err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                  throw err;
                });
              });
            }
          }

          executeCallback(promise, callback);
          return promise;
        }

        var asyncStorage = {
          _driver: 'asyncStorage',
          _initStorage: _initStorage,
          _support: isIndexedDBValid(),
          iterate: iterate,
          getItem: getItem,
          setItem: setItem,
          removeItem: removeItem,
          clear: clear,
          length: length,
          key: key,
          keys: keys,
          dropInstance: dropInstance
        };

        function isWebSQLValid() {
          return typeof openDatabase === 'function';
        } // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
        // it to Base64, so this is how we store it to prevent very strange errors with less
        // verbose ways of binary <-> string data storage.


        var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var BLOB_TYPE_PREFIX = '~~local_forage_type~';
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
        var SERIALIZED_MARKER = '__lfsc__:';
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length; // OMG the serializations!

        var TYPE_ARRAYBUFFER = 'arbf';
        var TYPE_BLOB = 'blob';
        var TYPE_INT8ARRAY = 'si08';
        var TYPE_UINT8ARRAY = 'ui08';
        var TYPE_UINT8CLAMPEDARRAY = 'uic8';
        var TYPE_INT16ARRAY = 'si16';
        var TYPE_INT32ARRAY = 'si32';
        var TYPE_UINT16ARRAY = 'ur16';
        var TYPE_UINT32ARRAY = 'ui32';
        var TYPE_FLOAT32ARRAY = 'fl32';
        var TYPE_FLOAT64ARRAY = 'fl64';
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var toString$1 = Object.prototype.toString;

        function stringToBuffer(serializedString) {
          // Fill the string into a ArrayBuffer.
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i;
          var p = 0;
          var encoded1, encoded2, encoded3, encoded4;

          if (serializedString[serializedString.length - 1] === '=') {
            bufferLength--;

            if (serializedString[serializedString.length - 2] === '=') {
              bufferLength--;
            }
          }

          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);

          for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
            /*jslint bitwise: true */

            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }

          return buffer;
        } // Converts a buffer to a string to store, serialized, in the backend
        // storage library.


        function bufferToString(buffer) {
          // base64-arraybuffer
          var bytes = new Uint8Array(buffer);
          var base64String = '';
          var i;

          for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
          }

          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + '=';
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + '==';
          }

          return base64String;
        } // Serialize a value, afterwards executing a callback (which usually
        // instructs the `setItem()` callback/promise to be executed). This is how
        // we store binary data with localStorage.


        function serialize(value, callback) {
          var valueType = '';

          if (value) {
            valueType = toString$1.call(value);
          } // Cannot use `value instanceof ArrayBuffer` or such here, as these
          // checks fail when running the tests using casper.js...
          //
          // TODO: See why those tests fail and use a better solution.


          if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
            // Convert binary arrays to a string and prefix the string with
            // a special marker.
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;

              if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
              } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
              } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
              } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
              } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
              } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
              } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error('Failed to get type for BinaryArray'));
              }
            }

            callback(marker + bufferToString(buffer));
          } else if (valueType === '[object Blob]') {
            // Conver the blob to a binaryArray and then to a string.
            var fileReader = new FileReader();

            fileReader.onload = function () {
              // Backwards-compatible prefix for the blob type.
              var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e) {
              console.error("Couldn't convert value into a JSON string: ", value);
              callback(null, e);
            }
          }
        } // Deserialize data we've inserted into a value column/field. We place
        // special markers into our strings to mark them as encoded; this isn't
        // as nice as a meta field, but it's the only sane thing we can do whilst
        // keeping localStorage support intact.
        //
        // Oftentimes this will just deserialize JSON content, but if we have a
        // special marker (SERIALIZED_MARKER, defined above), we will extract
        // some kind of arraybuffer/binary data/typed array out of the string.


        function deserialize(value) {
          // If we haven't marked this string as being specially serialized (i.e.
          // something other than serialized JSON), we can just return it and be
          // done with it.
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          } // The following code deals with deserializing some kind of Blob or
          // TypedArray. First we separate out the type of data we're dealing
          // with from the data itself.


          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType; // Backwards-compatible blob type serialization strategy.
          // DBs created with older versions of localForage will simply not have the blob type.

          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }

          var buffer = stringToBuffer(serializedString); // Return the right type based on the code/type set during
          // serialization.

          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;

            case TYPE_BLOB:
              return createBlob([buffer], {
                type: blobType
              });

            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);

            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);

            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);

            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);

            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);

            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);

            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);

            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);

            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);

            default:
              throw new Error('Unkown type: ' + type);
          }
        }

        var localforageSerializer = {
          serialize: serialize,
          deserialize: deserialize,
          stringToBuffer: stringToBuffer,
          bufferToString: bufferToString
        };
        /*
         * Includes code from:
         *
         * base64-arraybuffer
         * https://github.com/niklasvh/base64-arraybuffer
         *
         * Copyright (c) 2012 Niklas von Hertzen
         * Licensed under the MIT license.
         */

        function createDbTable(t, dbInfo, callback, errorCallback) {
          t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
        } // Open the WebSQL database (automatically creates one if one didn't
        // previously exist), using any options set in the config.


        function _initStorage$1(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
            }
          }

          var dbInfoPromise = new Promise$1(function (resolve, reject) {
            // Open the database; the openDatabase API will automatically
            // create it for us if it doesn't exist.
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e) {
              return reject(e);
            } // Create our key/value table if it doesn't exist.


            dbInfo.db.transaction(function (t) {
              createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
              }, function (t, error) {
                reject(error);
              });
            }, reject);
          });
          dbInfo.serializer = localforageSerializer;
          return dbInfoPromise;
        }

        function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
          t.executeSql(sqlStatement, args, callback, function (t, error) {
            if (error.code === error.SYNTAX_ERR) {
              t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                  // if the table is missing (was deleted)
                  // re-create it table and retry
                  createDbTable(t, dbInfo, function () {
                    t.executeSql(sqlStatement, args, callback, errorCallback);
                  }, errorCallback);
                } else {
                  errorCallback(t, error);
                }
              }, errorCallback);
            } else {
              errorCallback(t, error);
            }
          }, errorCallback);
        }

        function getItem$1(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null; // Check to see if this is serialized content we need to
                  // unpack.

                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }

                  resolve(result);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function iterate$1(iterator, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                  var rows = results.rows;
                  var length = rows.length;

                  for (var i = 0; i < length; i++) {
                    var item = rows.item(i);
                    var result = item.value; // Check to see if this is serialized content
                    // we need to unpack.

                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }

                    result = iterator(result, item.key, i + 1); // void(0) prevents problems with redefinition
                    // of `undefined`.

                    if (result !== void 0) {
                      resolve(result);
                      return;
                    }
                  }

                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function _setItem(key, value, callback, retriesLeft) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              // The localStorage API doesn't return undefined values in an
              // "expected" way, so undefined is always cast to null in all
              // drivers. See: https://github.com/mozilla/localForage/pull/42
              if (value === undefined) {
                value = null;
              } // Save the original value to pass to the callback.


              var originalValue = value;
              var dbInfo = self._dbInfo;
              dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                      resolve(originalValue);
                    }, function (t, error) {
                      reject(error);
                    });
                  }, function (sqlError) {
                    // The transaction failed; check
                    // to see if it's a quota error.
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      // We reject the callback outright for now, but
                      // it's worth trying to re-run the transaction.
                      // Even if the user accepts the prompt to use
                      // more storage on Safari, this error will
                      // be called.
                      //
                      // Try to re-run the transaction.
                      if (retriesLeft > 0) {
                        resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                        return;
                      }

                      reject(sqlError);
                    }
                  });
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function setItem$1(key, value, callback) {
          return _setItem.apply(this, [key, value, callback, 1]);
        }

        function removeItem$1(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Deletes every item in the table.
        // TODO: Find out if this resets the AUTO_INCREMENT number.


        function clear$1(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Does a simple `COUNT(key)` to get the number of items stored in
        // localForage.


        function length$1(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                  var result = results.rows.item(0).c;
                  resolve(result);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Return the key located at key index X; essentially gets the key from a
        // `WHERE id = ?`. This is the most efficient way I can think to implement
        // this rarely-used (in my experience) part of the API, but it can seem
        // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
        // the ID of each key will change every time it's updated. Perhaps a stored
        // procedure for the `setItem()` SQL would solve this problem?
        // TODO: Don't change ID on `setItem()`.


        function key$1(n, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve(result);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function keys$1(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                  var keys = [];

                  for (var i = 0; i < results.rows.length; i++) {
                    keys.push(results.rows.item(i).key);
                  }

                  resolve(keys);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // https://www.w3.org/TR/webdatabase/#databases
        // > There is no way to enumerate or delete the databases available for an origin from this API.


        function getAllStoreNames(db) {
          return new Promise$1(function (resolve, reject) {
            db.transaction(function (t) {
              t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                  storeNames.push(results.rows.item(i).name);
                }

                resolve({
                  db: db,
                  storeNames: storeNames
                });
              }, function (t, error) {
                reject(error);
              });
            }, function (sqlError) {
              reject(sqlError);
            });
          });
        }

        function dropInstance$1(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== 'function' && options || {};

          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }

          var self = this;
          var promise;

          if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
          } else {
            promise = new Promise$1(function (resolve) {
              var db;

              if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
              } else {
                db = openDatabase(options.name, '', '', 0);
              }

              if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
              } else {
                resolve({
                  db: db,
                  storeNames: [options.storeName]
                });
              }
            }).then(function (operationInfo) {
              return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                  function dropTable(storeName) {
                    return new Promise$1(function (resolve, reject) {
                      t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                        resolve();
                      }, function (t, error) {
                        reject(error);
                      });
                    });
                  }

                  var operations = [];

                  for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                    operations.push(dropTable(operationInfo.storeNames[i]));
                  }

                  Promise$1.all(operations).then(function () {
                    resolve();
                  })["catch"](function (e) {
                    reject(e);
                  });
                }, function (sqlError) {
                  reject(sqlError);
                });
              });
            });
          }

          executeCallback(promise, callback);
          return promise;
        }

        var webSQLStorage = {
          _driver: 'webSQLStorage',
          _initStorage: _initStorage$1,
          _support: isWebSQLValid(),
          iterate: iterate$1,
          getItem: getItem$1,
          setItem: setItem$1,
          removeItem: removeItem$1,
          clear: clear$1,
          length: length$1,
          key: key$1,
          keys: keys$1,
          dropInstance: dropInstance$1
        };

        function isLocalStorageValid() {
          try {
            return typeof localStorage !== 'undefined' && 'setItem' in localStorage && // in IE8 typeof localStorage.setItem === 'object'
            !!localStorage.setItem;
          } catch (e) {
            return false;
          }
        }

        function _getKeyPrefix(options, defaultConfig) {
          var keyPrefix = options.name + '/';

          if (options.storeName !== defaultConfig.storeName) {
            keyPrefix += options.storeName + '/';
          }

          return keyPrefix;
        } // Check if localStorage throws when saving an item


        function checkIfLocalStorageThrows() {
          var localStorageTestKey = '_localforage_support_test';

          try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);
            return false;
          } catch (e) {
            return true;
          }
        } // Check if localStorage is usable and allows to save an item
        // This method checks if localStorage is usable in Safari Private Browsing
        // mode, or in any other case where the available quota for localStorage
        // is 0 and there wasn't any saved items yet.


        function _isLocalStorageUsable() {
          return !checkIfLocalStorageThrows() || localStorage.length > 0;
        } // Config the localStorage backend, using options set in the config.


        function _initStorage$2(options) {
          var self = this;
          var dbInfo = {};

          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }

          dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

          if (!_isLocalStorageUsable()) {
            return Promise$1.reject();
          }

          self._dbInfo = dbInfo;
          dbInfo.serializer = localforageSerializer;
          return Promise$1.resolve();
        } // Remove all keys from the datastore, effectively destroying all data in
        // the app's key/value store!


        function clear$2(callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var keyPrefix = self._dbInfo.keyPrefix;

            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        } // Retrieve an item from the store. Unlike the original async_storage
        // library in Gaia, we don't modify return values at all. If a key's value
        // is `undefined`, we pass that value to the callback function.


        function getItem$2(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key); // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the key
            // is likely undefined and we'll pass it straight to the
            // callback.

            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }

            return result;
          });
          executeCallback(promise, callback);
          return promise;
        } // Iterate over all items in the store.


        function iterate$2(iterator, callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length; // We use a dedicated iterator instead of the `i` variable below
            // so other keys we fetch in localStorage aren't counted in
            // the `iterationNumber` argument passed to the `iterate()`
            // callback.
            //
            // See: github.com/mozilla/localForage/pull/435#discussion_r38061530

            var iterationNumber = 1;

            for (var i = 0; i < length; i++) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) !== 0) {
                continue;
              }

              var value = localStorage.getItem(key); // If a result was found, parse it from the serialized
              // string into a JS object. If result isn't truthy, the
              // key is likely undefined and we'll pass it straight
              // to the iterator.

              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }

              value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

              if (value !== void 0) {
                return value;
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        } // Same as localStorage's key() method, except takes a callback.


        function key$2(n, callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result;

            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            } // Remove the prefix from the key, if a key is found.


            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }

            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }

        function keys$2(callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var length = localStorage.length;
            var keys = [];

            for (var i = 0; i < length; i++) {
              var itemKey = localStorage.key(i);

              if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
              }
            }

            return keys;
          });
          executeCallback(promise, callback);
          return promise;
        } // Supply the number of keys in the datastore to the callback function.


        function length$2(callback) {
          var self = this;
          var promise = self.keys().then(function (keys) {
            return keys.length;
          });
          executeCallback(promise, callback);
          return promise;
        } // Remove an item from the store, nice and simple.


        function removeItem$2(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
          });
          executeCallback(promise, callback);
          return promise;
        } // Set a key's value and run an optional callback once the value is set.
        // Unlike Gaia's implementation, the callback function is passed the value,
        // in case you want to operate on that value only after you're sure it
        // saved, or something like that.


        function setItem$2(key, value, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            // Convert undefined values to null.
            // https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
              value = null;
            } // Save the original value to pass to the callback.


            var originalValue = value;
            return new Promise$1(function (resolve, reject) {
              var dbInfo = self._dbInfo;
              dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                    resolve(originalValue);
                  } catch (e) {
                    // localStorage capacity exceeded.
                    // TODO: Make this a specific error/event.
                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                      reject(e);
                    }

                    reject(e);
                  }
                }
              });
            });
          });
          executeCallback(promise, callback);
          return promise;
        }

        function dropInstance$2(options, callback) {
          callback = getCallback.apply(this, arguments);
          options = typeof options !== 'function' && options || {};

          if (!options.name) {
            var currentConfig = this.config();
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }

          var self = this;
          var promise;

          if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
          } else {
            promise = new Promise$1(function (resolve) {
              if (!options.storeName) {
                resolve(options.name + '/');
              } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
              }
            }).then(function (keyPrefix) {
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key);
                }
              }
            });
          }

          executeCallback(promise, callback);
          return promise;
        }

        var localStorageWrapper = {
          _driver: 'localStorageWrapper',
          _initStorage: _initStorage$2,
          _support: isLocalStorageValid(),
          iterate: iterate$2,
          getItem: getItem$2,
          setItem: setItem$2,
          removeItem: removeItem$2,
          clear: clear$2,
          length: length$2,
          key: key$2,
          keys: keys$2,
          dropInstance: dropInstance$2
        };

        var sameValue = function sameValue(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        };

        var includes = function includes(array, searchElement) {
          var len = array.length;
          var i = 0;

          while (i < len) {
            if (sameValue(array[i], searchElement)) {
              return true;
            }

            i++;
          }

          return false;
        };

        var isArray = Array.isArray || function (arg) {
          return Object.prototype.toString.call(arg) === '[object Array]';
        }; // Drivers are stored here when `defineDriver()` is called.
        // They are shared across all instances of localForage.


        var DefinedDrivers = {};
        var DriverSupport = {};
        var DefaultDrivers = {
          INDEXEDDB: asyncStorage,
          WEBSQL: webSQLStorage,
          LOCALSTORAGE: localStorageWrapper
        };
        var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
        var OptionalDriverMethods = ['dropInstance'];
        var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
        var DefaultConfig = {
          description: '',
          driver: DefaultDriverOrder.slice(),
          name: 'localforage',
          // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
          // we can use without a prompt.
          size: 4980736,
          storeName: 'keyvaluepairs',
          version: 1.0
        };

        function callWhenReady(localForageInstance, libraryMethod) {
          localForageInstance[libraryMethod] = function () {
            var _args = arguments;
            return localForageInstance.ready().then(function () {
              return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
          };
        }

        function extend() {
          for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];

            if (arg) {
              for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                  if (isArray(arg[_key])) {
                    arguments[0][_key] = arg[_key].slice();
                  } else {
                    arguments[0][_key] = arg[_key];
                  }
                }
              }
            }
          }

          return arguments[0];
        }

        var LocalForage = function () {
          function LocalForage(options) {
            _classCallCheck(this, LocalForage);

            for (var driverTypeKey in DefaultDrivers) {
              if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                  // we don't need to wait for the promise,
                  // since the default drivers can be defined
                  // in a blocking manner
                  this.defineDriver(driver);
                }
              }
            }

            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;

            this._wrapLibraryMethodsWithReady();

            this.setDriver(this._config.driver)["catch"](function () {});
          } // Set any config values for localForage; can be called anytime before
          // the first API call (e.g. `getItem`, `setItem`).
          // We loop through options so we don't overwrite existing config
          // values.


          LocalForage.prototype.config = function config(options) {
            // If the options argument is an object, we use it to set values.
            // Otherwise, we return either a specified config value or all
            // config values.
            if ((typeof options === 'undefined' ? 'undefined' : _typeof$1(options)) === 'object') {
              // If localforage is ready and fully initialized, we can't set
              // any new configuration values. Instead, we return an error.
              if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
              }

              for (var i in options) {
                if (i === 'storeName') {
                  options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                  return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
              } // after all config options are set and
              // the driver option is used, try setting it


              if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
              }

              return true;
            } else if (typeof options === 'string') {
              return this._config[options];
            } else {
              return this._config;
            }
          }; // Used to define a custom driver, shared across all instances of
          // localForage.


          LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$1(function (resolve, reject) {
              try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver'); // A driver name should be defined and not overlap with the
                // library-defined, default drivers.

                if (!driverObject._driver) {
                  reject(complianceError);
                  return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');

                for (var i = 0, len = driverMethods.length; i < len; i++) {
                  var driverMethodName = driverMethods[i]; // when the property is there,
                  // it should be a method even when optional

                  var isRequired = !includes(OptionalDriverMethods, driverMethodName);

                  if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                    reject(complianceError);
                    return;
                  }
                }

                var configureMissingMethods = function configureMissingMethods() {
                  var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                    return function () {
                      var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                      var promise = Promise$1.reject(error);
                      executeCallback(promise, arguments[arguments.length - 1]);
                      return promise;
                    };
                  };

                  for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                    var optionalDriverMethod = OptionalDriverMethods[_i];

                    if (!driverObject[optionalDriverMethod]) {
                      driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                    }
                  }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                  if (DefinedDrivers[driverName]) {
                    console.info('Redefining LocalForage driver: ' + driverName);
                  }

                  DefinedDrivers[driverName] = driverObject;
                  DriverSupport[driverName] = support; // don't use a then, so that we can define
                  // drivers that have simple _support methods
                  // in a blocking manner

                  resolve();
                };

                if ('_support' in driverObject) {
                  if (driverObject._support && typeof driverObject._support === 'function') {
                    driverObject._support().then(setDriverSupport, reject);
                  } else {
                    setDriverSupport(!!driverObject._support);
                  }
                } else {
                  setDriverSupport(true);
                }
              } catch (e) {
                reject(e);
              }
            });
            executeTwoCallbacks(promise, callback, errorCallback);
            return promise;
          };

          LocalForage.prototype.driver = function driver() {
            return this._driver || null;
          };

          LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
            executeTwoCallbacks(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
          };

          LocalForage.prototype.getSerializer = function getSerializer(callback) {
            var serializerPromise = Promise$1.resolve(localforageSerializer);
            executeTwoCallbacks(serializerPromise, callback);
            return serializerPromise;
          };

          LocalForage.prototype.ready = function ready(callback) {
            var self = this;

            var promise = self._driverSet.then(function () {
              if (self._ready === null) {
                self._ready = self._initDriver();
              }

              return self._ready;
            });

            executeTwoCallbacks(promise, callback, callback);
            return promise;
          };

          LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
            var self = this;

            if (!isArray(drivers)) {
              drivers = [drivers];
            }

            var supportedDrivers = this._getSupportedDrivers(drivers);

            function setDriverToConfig() {
              self._config.driver = self.driver();
            }

            function extendSelfWithDriver(driver) {
              self._extend(driver);

              setDriverToConfig();
              self._ready = self._initStorage(self._config);
              return self._ready;
            }

            function initDriver(supportedDrivers) {
              return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                  while (currentDriverIndex < supportedDrivers.length) {
                    var driverName = supportedDrivers[currentDriverIndex];
                    currentDriverIndex++;
                    self._dbInfo = null;
                    self._ready = null;
                    return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                  }

                  setDriverToConfig();
                  var error = new Error('No available storage method found.');
                  self._driverSet = Promise$1.reject(error);
                  return self._driverSet;
                }

                return driverPromiseLoop();
              };
            } // There might be a driver initialization in progress
            // so wait for it to finish in order to avoid a possible
            // race condition to set _dbInfo


            var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
              return Promise$1.resolve();
            }) : Promise$1.resolve();
            this._driverSet = oldDriverSetDone.then(function () {
              var driverName = supportedDrivers[0];
              self._dbInfo = null;
              self._ready = null;
              return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();

                self._wrapLibraryMethodsWithReady();

                self._initDriver = initDriver(supportedDrivers);
              });
            })["catch"](function () {
              setDriverToConfig();
              var error = new Error('No available storage method found.');
              self._driverSet = Promise$1.reject(error);
              return self._driverSet;
            });
            executeTwoCallbacks(this._driverSet, callback, errorCallback);
            return this._driverSet;
          };

          LocalForage.prototype.supports = function supports(driverName) {
            return !!DriverSupport[driverName];
          };

          LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
          };

          LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];

            for (var i = 0, len = drivers.length; i < len; i++) {
              var driverName = drivers[i];

              if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
              }
            }

            return supportedDrivers;
          };

          LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
            // Add a stub for each driver API method that delays the call to the
            // corresponding driver method until localForage is ready. These stubs
            // will be replaced by the driver methods as soon as the driver is
            // loaded, so there is no performance impact.
            for (var i = 0, len = LibraryMethods.length; i < len; i++) {
              callWhenReady(this, LibraryMethods[i]);
            }
          };

          LocalForage.prototype.createInstance = function createInstance(options) {
            return new LocalForage(options);
          };

          return LocalForage;
        }(); // The actual localForage object that we expose as a module or via a
        // global. It's extended by pulling in one of our other libraries.


        var localforage_js = new LocalForage();
        module.exports = localforage_js;
      }, {
        "3": 3
      }]
    }, {}, [4])(4);
  });
});

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$d = "node_modules/svelte-spinner/src/index.svelte";

function create_fragment$f(ctx) {
  var svg;
  var circle;
  var circle_stroke_dasharray_value;
  var block = {
    c: function create() {
      svg = svg_element("svg");
      circle = svg_element("circle");
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_element(nodes, "svg", {
        height: true,
        width: true,
        style: true,
        class: true,
        viewbox: true
      }, 1);
      var svg_nodes = children(svg);
      circle = claim_element(svg_nodes, "circle", {
        role: true,
        cx: true,
        cy: true,
        r: true,
        stroke: true,
        fill: true,
        "stroke-width": true,
        "stroke-dasharray": true,
        "stroke-linecap": true
      }, 1);
      children(circle).forEach(detach_dev);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(circle, "role", "presentation");
      attr_dev(circle, "cx", "16");
      attr_dev(circle, "cy", "16");
      attr_dev(circle, "r",
      /*radius*/
      ctx[4]);
      attr_dev(circle, "stroke",
      /*color*/
      ctx[2]);
      attr_dev(circle, "fill", "none");
      attr_dev(circle, "stroke-width",
      /*thickness*/
      ctx[3]);
      attr_dev(circle, "stroke-dasharray", circle_stroke_dasharray_value = "" + (
      /*dash*/
      ctx[5] + ",100"));
      attr_dev(circle, "stroke-linecap", "round");
      add_location(circle, file$d, 19, 2, 384);
      attr_dev(svg, "height",
      /*size*/
      ctx[0]);
      attr_dev(svg, "width",
      /*size*/
      ctx[0]);
      set_style(svg, "animation-duration",
      /*speed*/
      ctx[1] + "ms");
      attr_dev(svg, "class", "svelte-spinner svelte-mowlun");
      attr_dev(svg, "viewBox", "0 0 32 32");
      add_location(svg, file$d, 12, 0, 253);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg, anchor);
      append_dev(svg, circle);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*radius*/
      16) {
        attr_dev(circle, "r",
        /*radius*/
        ctx[4]);
      }

      if (dirty &
      /*color*/
      4) {
        attr_dev(circle, "stroke",
        /*color*/
        ctx[2]);
      }

      if (dirty &
      /*thickness*/
      8) {
        attr_dev(circle, "stroke-width",
        /*thickness*/
        ctx[3]);
      }

      if (dirty &
      /*dash*/
      32 && circle_stroke_dasharray_value !== (circle_stroke_dasharray_value = "" + (
      /*dash*/
      ctx[5] + ",100"))) {
        attr_dev(circle, "stroke-dasharray", circle_stroke_dasharray_value);
      }

      if (dirty &
      /*size*/
      1) {
        attr_dev(svg, "height",
        /*size*/
        ctx[0]);
      }

      if (dirty &
      /*size*/
      1) {
        attr_dev(svg, "width",
        /*size*/
        ctx[0]);
      }

      if (dirty &
      /*speed*/
      2) {
        set_style(svg, "animation-duration",
        /*speed*/
        ctx[1] + "ms");
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$f.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$f($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Src", slots, []);
  var _$$props$size = $$props.size,
      size = _$$props$size === void 0 ? 25 : _$$props$size;
  var _$$props$speed = $$props.speed,
      speed = _$$props$speed === void 0 ? 750 : _$$props$speed;
  var _$$props$color = $$props.color,
      color = _$$props$color === void 0 ? "rgba(0,0,0,0.4)" : _$$props$color;
  var _$$props$thickness = $$props.thickness,
      thickness = _$$props$thickness === void 0 ? 2 : _$$props$thickness;
  var _$$props$gap = $$props.gap,
      gap = _$$props$gap === void 0 ? 40 : _$$props$gap;
  var _$$props$radius = $$props.radius,
      radius = _$$props$radius === void 0 ? 10 : _$$props$radius;
  var dash;
  var writable_props = ["size", "speed", "color", "thickness", "gap", "radius"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Src> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("size" in $$props) $$invalidate(0, size = $$props.size);
    if ("speed" in $$props) $$invalidate(1, speed = $$props.speed);
    if ("color" in $$props) $$invalidate(2, color = $$props.color);
    if ("thickness" in $$props) $$invalidate(3, thickness = $$props.thickness);
    if ("gap" in $$props) $$invalidate(6, gap = $$props.gap);
    if ("radius" in $$props) $$invalidate(4, radius = $$props.radius);
  };

  $$self.$capture_state = function () {
    return {
      size: size,
      speed: speed,
      color: color,
      thickness: thickness,
      gap: gap,
      radius: radius,
      dash: dash
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("size" in $$props) $$invalidate(0, size = $$props.size);
    if ("speed" in $$props) $$invalidate(1, speed = $$props.speed);
    if ("color" in $$props) $$invalidate(2, color = $$props.color);
    if ("thickness" in $$props) $$invalidate(3, thickness = $$props.thickness);
    if ("gap" in $$props) $$invalidate(6, gap = $$props.gap);
    if ("radius" in $$props) $$invalidate(4, radius = $$props.radius);
    if ("dash" in $$props) $$invalidate(5, dash = $$props.dash);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*radius, gap*/
    80) {
       $$invalidate(5, dash = 2 * Math.PI * radius * (100 - gap) / 100);
    }
  };

  return [size, speed, color, thickness, radius, dash, gap];
}

var Src = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Src, _SvelteComponentDev);

  var _super = _createSuper$g(Src);

  function Src(options) {
    var _this;

    _classCallCheck(this, Src);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$f, create_fragment$f, safe_not_equal, {
      size: 0,
      speed: 1,
      color: 2,
      thickness: 3,
      gap: 6,
      radius: 4
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Src",
      options: options,
      id: create_fragment$f.name
    });
    return _this;
  }

  _createClass(Src, [{
    key: "size",
    get: function get() {
      throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "speed",
    get: function get() {
      throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "thickness",
    get: function get() {
      throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "gap",
    get: function get() {
      throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "radius",
    get: function get() {
      throw new Error("<Src>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Src>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Src;
}(SvelteComponentDev);

function assert(condition, message) {
    if (!condition)
        throw Error(message);
}

const _save = writable(null);
let unsubscribeFromLast;
const save = {
    subscribe: _save.subscribe,
    set(save) {
        if (typeof save.handle === "string" && typeof backend !== "undefined") {
            unsubscribeFromLast === null || unsubscribeFromLast === void 0 ? void 0 : unsubscribeFromLast();
            backend.watchSaveFile(save.handle).then((store) => store.subscribe(async (file) => {
                const data = new DOMParser().parseFromString(file.trim(), "text/xml");
                if (isValidSaveFile(data)) {
                    const newSave = await processSaveFile({ handle: save.handle, data });
                    localforage.setItem("lastSaveFile", newSave);
                    _save.set(newSave);
                }
            })).then((unsubscriber) => unsubscribeFromLast = unsubscriber);
        }
        else {
            localforage.setItem("lastSaveFile", save);
            _save.set(save);
        }
    },
};
function isValidSaveFile(file) {
    var _a;
    const farmer = (_a = file.querySelector("Farmer")) !== null && _a !== void 0 ? _a : file.querySelector("SaveGame > player");
    if (farmer === null)
        return false;
    return farmer.querySelector("name") !== null &&
        farmer.querySelector("cookingRecipes") !== null &&
        farmer.querySelector("craftingRecipes") !== null &&
        farmer.querySelector("basicShipped") !== null &&
        farmer.querySelector("mineralsFound") !== null &&
        farmer.querySelector("recipesCooked") !== null &&
        farmer.querySelector("archaeologyFound") !== null &&
        farmer.querySelector("fishCaught") !== null &&
        farmer.querySelector("friendshipData") !== null &&
        farmer.querySelector("dayOfMonthForSaveGame") !== null &&
        farmer.querySelector("seasonForSaveGame") !== null &&
        farmer.querySelector("yearForSaveGame") !== null &&
        farmer.querySelector("saveTime") !== null;
}
function getSaveFileData(file) {
    var _a, _b, _c, _d;
    const save = (file instanceof XMLDocument ? file : file.data)
        .querySelector("SaveGame");
    if (save === null)
        throw Error("Invalid save file");
    const data = {
        name: save.querySelector("player > name"),
        cookingRecipes: save.querySelector("player > cookingRecipes"),
        craftingRecipes: save.querySelector("player > craftingRecipes"),
        itemsShipped: save.querySelector("player > basicShipped"),
        mineralsFound: save.querySelector("player > mineralsFound"),
        recipesCooked: save.querySelector("player > recipesCooked"),
        artifactsFound: save.querySelector("player > archaeologyFound"),
        fishCaught: save.querySelector("player > fishCaught"),
        friendships: save.querySelector("player > friendshipData"),
        currentDay: save.querySelector("dayOfMonth"),
        currentSeason: save.querySelector("player > seasonForSaveGame"),
        currentYear: save.querySelector("year"),
        lastSaved: save.querySelector("player > saveTime"),
        bundles: Array.from((_b = (_a = Array.from(save.querySelectorAll("locations > GameLocation"))
            .find((el) => el.getAttribute("xsi:type") == "CommunityCenter")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("bundles > item")) !== null && _b !== void 0 ? _b : []),
    };
    if (Object.values(data).some((item) => item === null)) {
        throw Error(`Invalid save file ${file instanceof XMLDocument
            ? (_d = (_c = save.querySelector("name")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim() : typeof file.handle === "string"
            ? file.handle
            : file.handle.name}`);
    }
    return data;
}
/**
 * Gets `element.querySelector(selectors)`, but throws error of your choice if it does not exist.
 */
function assertQuerySelector(element, selectors, message) {
    const child = element.querySelector(selectors);
    assert(child !== null, message);
    return child;
}
async function processSaveFile(file) {
    var _a;
    const data = getSaveFileData(file);
    const currentDay = parseInt(data.currentDay.textContent, 10);
    const currentSeason = parseInt(data.currentSeason.textContent, 10);
    const gameInfo$1 = await gameInfo.fetch();
    const errorMessage = `Invalid save file ${file instanceof XMLDocument
        ? (_a = data.name.textContent) === null || _a === void 0 ? void 0 : _a.trim() : typeof file.handle === "string"
        ? file.handle
        : file.handle.name}`;
    return {
        handle: file instanceof XMLDocument ? null : file.handle,
        name: data.name.textContent.trim(),
        lastSaved: parseInt(data.lastSaved.textContent, 10),
        currentDay,
        currentSeason,
        currentYear: parseInt(data.currentYear.textContent, 10),
        currentDate: currentSeason * 28 + currentDay,
        collectedItems: [
            ...Array.from(data.itemsShipped.querySelectorAll("item")),
            ...Array.from(data.mineralsFound.querySelectorAll("item")),
            ...Array.from(data.recipesCooked.querySelectorAll("item")),
            ...Array.from(data.artifactsFound.querySelectorAll("item")),
            ...Array.from(data.fishCaught.querySelectorAll("item")),
        ].map((item) => assertQuerySelector(item, "key", errorMessage).textContent.trim())
            .concat(Array.from(data.craftingRecipes.querySelectorAll("item"))
            .filter((item) => {
            var _a, _b, _c;
            return parseInt((_c = (_b = (_a = item.querySelector("value")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "-1", 10) > 0 &&
                assertQuerySelector(item, "key", errorMessage).textContent in
                    gameInfo$1.recipes;
        })
            .map((item) => gameInfo$1
            .recipes[assertQuerySelector(item, "key", errorMessage).textContent].result.id)),
        knownRecipes: [
            ...Array.from(data.cookingRecipes.querySelectorAll("item")),
            ...Array.from(data.craftingRecipes.querySelectorAll("item")),
        ]
            .map((item) => assertQuerySelector(item, "key", errorMessage).textContent.trim()),
        relationships: new Map(Array.from(data.friendships.querySelectorAll("item")).map((relationship) => {
            const friendship = assertQuerySelector(relationship, "value > Friendship", errorMessage);
            const name = assertQuerySelector(relationship, "key", errorMessage)
                .textContent.trim();
            const villager = gameInfo$1.villagers[name];
            if (typeof villager !== "undefined") {
                return [name, {
                        hearts: parseInt(assertQuerySelector(friendship, "Points", errorMessage)
                            .textContent, 10) / 250,
                        maxHearts: assertQuerySelector(friendship, "Status", errorMessage)
                            .textContent.trim() === "Married"
                            ? 14
                            : villager.datable
                                ? 8
                                : 10,
                        giftsThisWeek: parseInt(assertQuerySelector(friendship, "GiftsThisWeek", errorMessage)
                            .textContent.trim(), 10),
                    }];
            }
        }).filter((item) => typeof item !== "undefined")),
        bundleCompletion: new Map(data.bundles
            .map((el) => {
            var _a;
            return [
                parseInt((_a = el.querySelector("key")) === null || _a === void 0 ? void 0 : _a.textContent),
                Array.from(el.querySelectorAll("value > ArrayOfBoolean > boolean")).map((el) => el.textContent == "true"),
            ];
        })),
    };
}
async function getSaveInfo(handle) {
    const file = new DOMParser().parseFromString(await (typeof handle === "string"
        ? backend.getSaveInfo(handle)
        : handle.getFileHandle("SaveGameInfo")
            .then((handle) => handle.getFile())
            .then((file) => file.text()))
        .then((doc) => doc.trim()), "text/xml");
    return {
        handle,
        name: file.querySelector("Farmer > name").textContent.trim(),
        lastSaved: parseInt(file.querySelector("Farmer > saveTime").textContent.trim()),
        valid: isValidSaveFile(file),
    };
}
async function getSaveFile(handle) {
    return processSaveFile({
        handle,
        data: new DOMParser().parseFromString(await (typeof handle === "string"
            ? backend.getSaveFile(handle)
            : handle.getFileHandle(handle.name)
                .then((handle) => handle.getFile())
                .then((file) => file.text()))
            .then((doc) => doc.trim()), "text/xml"),
    });
}
function isDirectory(handle) {
    return handle.kind === "directory";
}
async function getSaveFiles(dir) {
    var e_1, _a;
    let saves = [];
    if (typeof backend !== "undefined" &&
        (typeof dir === "string" || typeof dir === "undefined")) {
        if (typeof dir !== "undefined")
            backend.setSavesDir(dir);
        saves = await backend.listSaveFiles().then((saves) => Promise.all(saves.map(getSaveInfo)));
    }
    else if (typeof globalThis.showDirectoryPicker !== "undefined" &&
        typeof dir !== "string" && typeof dir !== "undefined") {
        try {
            for (var _b = __asyncValues(dir.values()), _c; _c = await _b.next(), !_c.done;) {
                const save = _c.value;
                if (isDirectory(save)) {
                    try {
                        saves.push(await getSaveInfo(save));
                    }
                    catch (_d) { }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        throw new Error("Neither Electron backend nor Native Filesystem API available");
    }
    return saves.filter((save) => save.valid);
}
{
    localforage.getItem("lastSaveFile").then((saveGame) => {
        if (saveGame !== null)
            save.set(saveGame);
    });
}

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$e = "src/components/SaveSelect.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  return child_ctx;
} // (96:2) <Title>


function create_default_slot_16(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Select Save File");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Select Save File");
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
    id: create_default_slot_16.name,
    type: "slot",
    source: "(96:2) <Title>",
    ctx: ctx
  });
  return block;
} // (1:0) <script lang="ts">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }


function create_catch_block(ctx) {
  var block = {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_catch_block.name,
    type: "catch",
    source: "(1:0) <script lang=\\\"ts\\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }",
    ctx: ctx
  });
  return block;
} // (103:2) {:then options}


function create_then_block(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$4, create_else_block_4];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*options*/
    ctx[5] === null) return 0;
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
    p: function update(ctx, dirty) {
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_then_block.name,
    type: "then",
    source: "(103:2) {:then options}",
    ctx: ctx
  });
  return block;
} // (170:4) {:else}


function create_else_block_4(ctx) {
  var content;
  var t;
  var actions;
  var current;
  content = new Content({
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
  actions = new Actions({
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
      create_component(content.$$.fragment);
      t = space();
      create_component(actions.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(content.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(actions.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(content, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(actions, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var content_changes = {};

      if (dirty &
      /*$$scope, options, $save*/
      8388656) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
      var actions_changes = {};

      if (dirty &
      /*$$scope, savesDir, options*/
      8388648) {
        actions_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      actions.$set(actions_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(content.$$.fragment, local);
      transition_in(actions.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(content.$$.fragment, local);
      transition_out(actions.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(content, detaching);
      if (detaching) detach_dev(t);
      destroy_component(actions, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_4.name,
    type: "else",
    source: "(170:4) {:else}",
    ctx: ctx
  });
  return block;
} // (104:4) {#if options === null}


function create_if_block$4(ctx) {
  var content;
  var t;
  var actions;
  var current;
  content = new Content({
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
  actions = new Actions({
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
      create_component(content.$$.fragment);
      t = space();
      create_component(actions.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(content.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(actions.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(content, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(actions, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var content_changes = {};

      if (dirty &
      /*$$scope, savesDir*/
      8388616) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
      var actions_changes = {};

      if (dirty &
      /*$$scope, fileInput*/
      8388612) {
        actions_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      actions.$set(actions_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(content.$$.fragment, local);
      transition_in(actions.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(content.$$.fragment, local);
      transition_out(actions.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(content, detaching);
      if (detaching) detach_dev(t);
      destroy_component(actions, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(104:4) {#if options === null}",
    ctx: ctx
  });
  return block;
} // (180:14) <Text>


function create_default_slot_15(ctx) {
  var t_value =
  /*option*/
  ctx[20].name + "";
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
      /*options*/
      32 && t_value !== (t_value =
      /*option*/
      ctx[20].name + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_15.name,
    type: "slot",
    source: "(180:14) <Text>",
    ctx: ctx
  });
  return block;
} // (174:12) <ListItem               selected={$save !== null && option.handle === $save.handle}               on:click={async () => {                 save.set(await getSaveFile(option.handle));                 close();               }}>


function create_default_slot_14(ctx) {
  var text_1;
  var t;
  var current;
  text_1 = new Text({
    props: {
      $$slots: {
        default: [create_default_slot_15]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
      t = space();
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
      t = claim_space(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      insert_dev(target, t, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope, options*/
      8388640) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_14.name,
    type: "slot",
    source: "(174:12) <ListItem               selected={$save !== null && option.handle === $save.handle}               on:click={async () => {                 save.set(await getSaveFile(option.handle));                 close();               }}>",
    ctx: ctx
  });
  return block;
} // (173:10) {#each options as option}


function create_each_block$1(ctx) {
  var listitem;
  var current;

  function click_handler_2() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler_2*/
      (_ctx = ctx)[16].apply(_ctx, [
      /*option*/
      ctx[20]].concat(args))
    );
  }

  listitem = new Item({
    props: {
      selected:
      /*$save*/
      ctx[4] !== null &&
      /*option*/
      ctx[20].handle ===
      /*$save*/
      ctx[4].handle,
      $$slots: {
        default: [create_default_slot_14]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  listitem.$on("click", click_handler_2);
  var block = {
    c: function create() {
      create_component(listitem.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(listitem.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(listitem, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var listitem_changes = {};
      if (dirty &
      /*$save, options*/
      48) listitem_changes.selected =
      /*$save*/
      ctx[4] !== null &&
      /*option*/
      ctx[20].handle ===
      /*$save*/
      ctx[4].handle;

      if (dirty &
      /*$$scope, options*/
      8388640) {
        listitem_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      listitem.$set(listitem_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(listitem.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(listitem.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(listitem, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(173:10) {#each options as option}",
    ctx: ctx
  });
  return block;
} // (172:8) <List>


function create_default_slot_13(ctx) {
  var each_1_anchor;
  var current;
  var each_value =
  /*options*/
  ctx[5];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*$save, options, save, getSaveFile, close*/
      49) {
        each_value =
        /*options*/
        ctx[5];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
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

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
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
    id: create_default_slot_13.name,
    type: "slot",
    source: "(172:8) <List>",
    ctx: ctx
  });
  return block;
} // (171:6) <Content>


function create_default_slot_12(ctx) {
  var list;
  var current;
  list = new List({
    props: {
      $$slots: {
        default: [create_default_slot_13]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(list.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(list.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(list, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var list_changes = {};

      if (dirty &
      /*$$scope, options, $save*/
      8388656) {
        list_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      list.$set(list_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(list, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_12.name,
    type: "slot",
    source: "(171:6) <Content>",
    ctx: ctx
  });
  return block;
} // (191:10) <Label>


function create_default_slot_11(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Change directory");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Change directory");
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
    source: "(191:10) <Label>",
    ctx: ctx
  });
  return block;
} // (186:8) <Button           on:click={() => {             savesDir = null;             options = null;           }}>


function create_default_slot_10(ctx) {
  var label;
  var current;
  label = new Label({
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
      create_component(label.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var label_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        label_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      label.$set(label_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(label, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_10.name,
    type: "slot",
    source: "(186:8) <Button           on:click={() => {             savesDir = null;             options = null;           }}>",
    ctx: ctx
  });
  return block;
} // (185:6) <Actions>


function create_default_slot_9(ctx) {
  var button;
  var current;

  function click_handler_3() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*click_handler_3*/
      (_ctx2 = ctx)[17].apply(_ctx2, [
      /*options*/
      ctx[5]].concat(args))
    );
  }

  button = new Button_1({
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
  button.$on("click", click_handler_3);
  var block = {
    c: function create() {
      create_component(button.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var button_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(button, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_9.name,
    type: "slot",
    source: "(185:6) <Actions>",
    ctx: ctx
  });
  return block;
} // (139:8) {:else}


function create_else_block_3(ctx) {
  var p;
  var t;
  var block = {
    c: function create() {
      p = element("p");
      t = text("Please select your save file.");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t = claim_text(p_nodes, "Please select your save file.");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(p, file$e, 139, 10, 5555);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_3.name,
    type: "else",
    source: "(139:8) {:else}",
    ctx: ctx
  });
  return block;
} // (106:8) {#if platformName !== null}


function create_if_block_3$1(ctx) {
  var t0;
  var t1;
  var if_block2_anchor;

  function select_block_type_2(ctx, dirty) {
    if (
    /*hasBackend*/
    ctx[9]) return create_if_block_7$1;
    return create_else_block_2;
  }

  var current_block_type = select_block_type_2(ctx);
  var if_block0 = current_block_type(ctx);

  function select_block_type_4(ctx, dirty) {
    if (
    /*platformName*/
    ctx[6] === "Windows") return create_if_block_5$1;
    if (
    /*platformName*/
    ctx[6] === "macOS") return create_if_block_6$1;
  }

  var current_block_type_1 = select_block_type_4(ctx);
  var if_block1 = current_block_type_1 && current_block_type_1(ctx);
  var if_block2 = !
  /*hasBackend*/
  ctx[9] && (
  /*platformName*/
  ctx[6] === "Windows" ||
  /*platformName*/
  ctx[6] === "macOS") && create_if_block_4$1(ctx);
  var block = {
    c: function create() {
      if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      if_block2_anchor = empty();
    },
    l: function claim(nodes) {
      if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1) if_block1.l(nodes);
      t1 = claim_space(nodes);
      if (if_block2) if_block2.l(nodes);
      if_block2_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_block0.m(target, anchor);
      insert_dev(target, t0, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, t1, anchor);
      if (if_block2) if_block2.m(target, anchor);
      insert_dev(target, if_block2_anchor, anchor);
    },
    p: function update(ctx, dirty) {
      if_block0.p(ctx, dirty);
      if (if_block1) if_block1.p(ctx, dirty);
    },
    d: function destroy(detaching) {
      if_block0.d(detaching);
      if (detaching) detach_dev(t0);

      if (if_block1) {
        if_block1.d(detaching);
      }

      if (detaching) detach_dev(t1);
      if (if_block2) if_block2.d(detaching);
      if (detaching) detach_dev(if_block2_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(106:8) {#if platformName !== null}",
    ctx: ctx
  });
  return block;
} // (116:10) {:else}


function create_else_block_2(ctx) {
  var p;
  var t0;
  var t1;
  var t2;
  var code;
  var t3;
  var t4;
  var block = {
    c: function create() {
      p = element("p");
      t0 = text("Please select your save file. On ");
      t1 = text(
      /*platformName*/
      ctx[6]);
      t2 = text(", this is typically\n              located at ");
      code = element("code");
      t3 = text(
      /*savePath*/
      ctx[8]);
      t4 = text(" .");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Please select your save file. On ");
      t1 = claim_text(p_nodes,
      /*platformName*/
      ctx[6]);
      t2 = claim_text(p_nodes, ", this is typically\n              located at ");
      code = claim_element(p_nodes, "CODE", {});
      var code_nodes = children(code);
      t3 = claim_text(code_nodes,
      /*savePath*/
      ctx[8]);
      code_nodes.forEach(detach_dev);
      t4 = claim_text(p_nodes, " .");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(code, file$e, 118, 25, 4662);
      add_location(p, file$e, 116, 12, 4552);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t0);
      append_dev(p, t1);
      append_dev(p, t2);
      append_dev(p, code);
      append_dev(code, t3);
      append_dev(p, t4);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_2.name,
    type: "else",
    source: "(116:10) {:else}",
    ctx: ctx
  });
  return block;
} // (107:10) {#if hasBackend}


function create_if_block_7$1(ctx) {
  var if_block_anchor;

  function select_block_type_3(ctx, dirty) {
    if (
    /*savesDir*/
    ctx[3] === null) return create_if_block_8$1;
    return create_else_block_1;
  }

  var current_block_type = select_block_type_3(ctx);
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
      if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_7$1.name,
    type: "if",
    source: "(107:10) {#if hasBackend}",
    ctx: ctx
  });
  return block;
} // (113:12) {:else}


function create_else_block_1(ctx) {
  var t0;
  var t1;
  var block = {
    c: function create() {
      t0 = text(
      /*savesDir*/
      ctx[3]);
      t1 = text(" is an invalid save file path. Please choose another.");
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes,
      /*savesDir*/
      ctx[3]);
      t1 = claim_text(nodes, " is an invalid save file path. Please choose another.");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*savesDir*/
      8) set_data_dev(t0,
      /*savesDir*/
      ctx[3]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(113:12) {:else}",
    ctx: ctx
  });
  return block;
} // (108:12) {#if savesDir === null}


function create_if_block_8$1(ctx) {
  var p;
  var t0;
  var t1;
  var t2;
  var code;
  var t3;
  var t4;
  var block = {
    c: function create() {
      p = element("p");
      t0 = text("Please select your saves directory. On ");
      t1 = text(
      /*platformName*/
      ctx[6]);
      t2 = text(", this is\n                typically located at ");
      code = element("code");
      t3 = text(
      /*savesDirPath*/
      ctx[7]);
      t4 = text(" .");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Please select your saves directory. On ");
      t1 = claim_text(p_nodes,
      /*platformName*/
      ctx[6]);
      t2 = claim_text(p_nodes, ", this is\n                typically located at ");
      code = claim_element(p_nodes, "CODE", {});
      var code_nodes = children(code);
      t3 = claim_text(code_nodes,
      /*savesDirPath*/
      ctx[7]);
      code_nodes.forEach(detach_dev);
      t4 = claim_text(p_nodes, " .");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(code, file$e, 110, 37, 4357);
      add_location(p, file$e, 108, 14, 4237);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t0);
      append_dev(p, t1);
      append_dev(p, t2);
      append_dev(p, code);
      append_dev(code, t3);
      append_dev(p, t4);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_8$1.name,
    type: "if",
    source: "(108:12) {#if savesDir === null}",
    ctx: ctx
  });
  return block;
} // (128:45) 


function create_if_block_6$1(ctx) {
  var p;
  var t0;
  var kbd0;
  var t1;
  var t2;
  var kbd1;
  var t3;
  var t4;
  var kbd2;
  var t5;
  var t6;
  var code0;
  var t7;
  var t8;
  var kbd3;
  var t9;
  var t10;
  var code1;
  var t11;
  var t12;
  var block = {
    c: function create() {
      p = element("p");
      t0 = text("Press ");
      kbd0 = element("kbd");
      t1 = text("⇧");
      t2 = text(" + ");
      kbd1 = element("kbd");
      t3 = text("⌘");
      t4 = text(" + ");
      kbd2 = element("kbd");
      t5 = text("G");
      t6 = text(" to open Go To Folder\n              and paste ");
      code0 = element("code");
      t7 = text(
      /*savesDirPath*/
      ctx[7]);
      t8 = text(" into it, then press ");
      kbd3 = element("kbd");
      t9 = text("Enter");
      t10 = text("\n              to navigate to ");
      code1 = element("code");
      t11 = text("Saves");
      t12 = text(" .");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Press ");
      kbd0 = claim_element(p_nodes, "KBD", {});
      var kbd0_nodes = children(kbd0);
      t1 = claim_text(kbd0_nodes, "⇧");
      kbd0_nodes.forEach(detach_dev);
      t2 = claim_text(p_nodes, " + ");
      kbd1 = claim_element(p_nodes, "KBD", {});
      var kbd1_nodes = children(kbd1);
      t3 = claim_text(kbd1_nodes, "⌘");
      kbd1_nodes.forEach(detach_dev);
      t4 = claim_text(p_nodes, " + ");
      kbd2 = claim_element(p_nodes, "KBD", {});
      var kbd2_nodes = children(kbd2);
      t5 = claim_text(kbd2_nodes, "G");
      kbd2_nodes.forEach(detach_dev);
      t6 = claim_text(p_nodes, " to open Go To Folder\n              and paste ");
      code0 = claim_element(p_nodes, "CODE", {});
      var code0_nodes = children(code0);
      t7 = claim_text(code0_nodes,
      /*savesDirPath*/
      ctx[7]);
      code0_nodes.forEach(detach_dev);
      t8 = claim_text(p_nodes, " into it, then press ");
      kbd3 = claim_element(p_nodes, "KBD", {});
      var kbd3_nodes = children(kbd3);
      t9 = claim_text(kbd3_nodes, "Enter");
      kbd3_nodes.forEach(detach_dev);
      t10 = claim_text(p_nodes, "\n              to navigate to ");
      code1 = claim_element(p_nodes, "CODE", {});
      var code1_nodes = children(code1);
      t11 = claim_text(code1_nodes, "Saves");
      code1_nodes.forEach(detach_dev);
      t12 = claim_text(p_nodes, " .");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(kbd0, file$e, 129, 20, 5062);
      add_location(kbd1, file$e, 129, 35, 5077);
      add_location(kbd2, file$e, 129, 50, 5092);
      add_location(code0, file$e, 130, 24, 5150);
      add_location(kbd3, file$e, 130, 72, 5198);
      add_location(code1, file$e, 131, 29, 5244);
      add_location(p, file$e, 128, 12, 5038);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t0);
      append_dev(p, kbd0);
      append_dev(kbd0, t1);
      append_dev(p, t2);
      append_dev(p, kbd1);
      append_dev(kbd1, t3);
      append_dev(p, t4);
      append_dev(p, kbd2);
      append_dev(kbd2, t5);
      append_dev(p, t6);
      append_dev(p, code0);
      append_dev(code0, t7);
      append_dev(p, t8);
      append_dev(p, kbd3);
      append_dev(kbd3, t9);
      append_dev(p, t10);
      append_dev(p, code1);
      append_dev(code1, t11);
      append_dev(p, t12);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6$1.name,
    type: "if",
    source: "(128:45) ",
    ctx: ctx
  });
  return block;
} // (122:10) {#if platformName === 'Windows'}


function create_if_block_5$1(ctx) {
  var p;
  var t0;
  var code0;
  var t1;
  var t2;
  var kbd;
  var t3;
  var t4;
  var code1;
  var t5;
  var t6;
  var block = {
    c: function create() {
      p = element("p");
      t0 = text("Paste ");
      code0 = element("code");
      t1 = text(
      /*savesDirPath*/
      ctx[7]);
      t2 = text(" into the address bar at the top of\n              Explorer and press ");
      kbd = element("kbd");
      t3 = text("Enter");
      t4 = text(" to navigate to ");
      code1 = element("code");
      t5 = text("Saves");
      t6 = text("\n              .");
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "Paste ");
      code0 = claim_element(p_nodes, "CODE", {});
      var code0_nodes = children(code0);
      t1 = claim_text(code0_nodes,
      /*savesDirPath*/
      ctx[7]);
      code0_nodes.forEach(detach_dev);
      t2 = claim_text(p_nodes, " into the address bar at the top of\n              Explorer and press ");
      kbd = claim_element(p_nodes, "KBD", {});
      var kbd_nodes = children(kbd);
      t3 = claim_text(kbd_nodes, "Enter");
      kbd_nodes.forEach(detach_dev);
      t4 = claim_text(p_nodes, " to navigate to ");
      code1 = claim_element(p_nodes, "CODE", {});
      var code1_nodes = children(code1);
      t5 = claim_text(code1_nodes, "Saves");
      code1_nodes.forEach(detach_dev);
      t6 = claim_text(p_nodes, "\n              .");
      p_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(code0, file$e, 123, 20, 4800);
      add_location(kbd, file$e, 124, 33, 4896);
      add_location(code1, file$e, 124, 65, 4928);
      add_location(p, file$e, 122, 12, 4776);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t0);
      append_dev(p, code0);
      append_dev(code0, t1);
      append_dev(p, t2);
      append_dev(p, kbd);
      append_dev(kbd, t3);
      append_dev(p, t4);
      append_dev(p, code1);
      append_dev(code1, t5);
      append_dev(p, t6);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5$1.name,
    type: "if",
    source: "(122:10) {#if platformName === 'Windows'}",
    ctx: ctx
  });
  return block;
} // (135:10) {#if !hasBackend && (platformName === 'Windows' || platformName === 'macOS')}


function create_if_block_4$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Then navigate to your chosen save file and choose the file with the\n            same name as the enclosing folder.");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Then navigate to your chosen save file and choose the file with the\n            same name as the enclosing folder.");
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
    id: create_if_block_4$1.name,
    type: "if",
    source: "(135:10) {#if !hasBackend && (platformName === 'Windows' || platformName === 'macOS')}",
    ctx: ctx
  });
  return block;
} // (105:6) <Content>


function create_default_slot_8(ctx) {
  var if_block_anchor;

  function select_block_type_1(ctx, dirty) {
    if (
    /*platformName*/
    ctx[6] !== null) return create_if_block_3$1;
    return create_else_block_3;
  }

  var current_block_type = select_block_type_1(ctx);
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
      if_block.p(ctx, dirty);
    },
    d: function destroy(detaching) {
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_8.name,
    type: "slot",
    source: "(105:6) <Content>",
    ctx: ctx
  });
  return block;
} // (145:10) <Label>


function create_default_slot_7(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Cancel");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Cancel");
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
    source: "(145:10) <Label>",
    ctx: ctx
  });
  return block;
} // (144:8) <Button>


function create_default_slot_6(ctx) {
  var label;
  var current;
  label = new Label({
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
      create_component(label.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var label_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        label_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      label.$set(label_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(label, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(144:8) <Button>",
    ctx: ctx
  });
  return block;
} // (147:8) {#if savesDirPath !== null}


function create_if_block_1$2(ctx) {
  var button0;
  var t;
  var button1;
  var current;
  button0 = new Button_1({
    props: {
      action: null,
      $$slots: {
        default: [create_default_slot_4]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  button0.$on("click",
  /*click_handler*/
  ctx[14]);
  button1 = new Button_1({
    props: {
      action: null,
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  button1.$on("click",
  /*click_handler_1*/
  ctx[15]);
  var block = {
    c: function create() {
      create_component(button0.$$.fragment);
      t = space();
      create_component(button1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(button0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(button1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(button0, target, anchor);
      insert_dev(target, t, anchor);
      mount_component(button1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var button0_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        button0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button0.$set(button0_changes);
      var button1_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        button1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button1.$set(button1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(button0, detaching);
      if (detaching) detach_dev(t);
      destroy_component(button1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(147:8) {#if savesDirPath !== null}",
    ctx: ctx
  });
  return block;
} // (151:12) <Label>


function create_default_slot_5(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Copy path");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Copy path");
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
    id: create_default_slot_5.name,
    type: "slot",
    source: "(151:12) <Label>",
    ctx: ctx
  });
  return block;
} // (148:10) <Button             action={null}             on:click={() => navigator.clipboard.writeText(savesDirPath)}>


function create_default_slot_4(ctx) {
  var label;
  var current;
  label = new Label({
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
      create_component(label.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var label_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        label_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      label.$set(label_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(label, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(148:10) <Button             action={null}             on:click={() => navigator.clipboard.writeText(savesDirPath)}>",
    ctx: ctx
  });
  return block;
} // (165:46) {:else}


function create_else_block$3(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("file");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "file");
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
    id: create_else_block$3.name,
    type: "else",
    source: "(165:46) {:else}",
    ctx: ctx
  });
  return block;
} // (165:21) {#if hasBackend}


function create_if_block_2$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("directory");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "directory");
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
    id: create_if_block_2$1.name,
    type: "if",
    source: "(165:21) {#if hasBackend}",
    ctx: ctx
  });
  return block;
} // (164:12) <Label>


function create_default_slot_3(ctx) {
  var t;
  var if_block_anchor;

  function select_block_type_5(ctx, dirty) {
    if (
    /*hasBackend*/
    ctx[9]) return create_if_block_2$1;
    return create_else_block$3;
  }

  var current_block_type = select_block_type_5(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      t = text("Choose ");
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Choose ");
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
      if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
      if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(164:12) <Label>",
    ctx: ctx
  });
  return block;
} // (153:10) <Button             action={null}             on:click={async () => {               if (typeof backend !== 'undefined') {                 setSavesDir(await backend.chooseFolder());               } else if (typeof globalThis.showDirectoryPicker !== 'undefined' && platformName !== 'Windows') {                 setSavesDir(await globalThis.showDirectoryPicker());               } else {                 fileInput.click();               }             }}>


function create_default_slot_2(ctx) {
  var label;
  var current;
  label = new Label({
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
      create_component(label.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var label_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        label_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      label.$set(label_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(label, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(153:10) <Button             action={null}             on:click={async () => {               if (typeof backend !== 'undefined') {                 setSavesDir(await backend.chooseFolder());               } else if (typeof globalThis.showDirectoryPicker !== 'undefined' && platformName !== 'Windows') {                 setSavesDir(await globalThis.showDirectoryPicker());               } else {                 fileInput.click();               }             }}>",
    ctx: ctx
  });
  return block;
} // (143:6) <Actions>


function create_default_slot_1(ctx) {
  var button;
  var t;
  var if_block_anchor;
  var current;
  button = new Button_1({
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
  /*savesDirPath*/
  ctx[7] !== null && create_if_block_1$2(ctx);
  var block = {
    c: function create() {
      create_component(button.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      claim_component(button.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      mount_component(button, target, anchor);
      insert_dev(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var button_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
      if (
      /*savesDirPath*/
      ctx[7] !== null) if_block.p(ctx, dirty);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(button, detaching);
      if (detaching) detach_dev(t);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(143:6) <Actions>",
    ctx: ctx
  });
  return block;
} // (97:18)      <div       style="outline: none; margin: auto; width: 100px; height: 100px; overflow: hidden"       tabindex="0">       <Spinner size={100}


function create_pending_block(ctx) {
  var div;
  var spinner;
  var current;
  spinner = new Src({
    props: {
      size: 100
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(spinner.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true,
        tabindex: true
      });
      var div_nodes = children(div);
      claim_component(spinner.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_style(div, "outline", "none");
      set_style(div, "margin", "auto");
      set_style(div, "width", "100px");
      set_style(div, "height", "100px");
      set_style(div, "overflow", "hidden");
      attr_dev(div, "tabindex", "0");
      add_location(div, file$e, 97, 4, 3909);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(spinner, div, null);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(spinner.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(spinner.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(spinner);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_pending_block.name,
    type: "pending",
    source: "(97:18)      <div       style=\\\"outline: none; margin: auto; width: 100px; height: 100px; overflow: hidden\\\"       tabindex=\\\"0\\\">       <Spinner size={100}",
    ctx: ctx
  });
  return block;
} // (95:0) <Dialog bind:this={dialog}>


function create_default_slot$3(ctx) {
  var title;
  var t;
  var await_block_anchor;
  var promise;
  var current;
  title = new Title({
    props: {
      $$slots: {
        default: [create_default_slot_16]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var info = {
    ctx: ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    value: 5,
    blocks: [,,,]
  };
  handle_promise(promise =
  /*options*/
  ctx[5], info);
  var block = {
    c: function create() {
      create_component(title.$$.fragment);
      t = space();
      await_block_anchor = empty();
      info.block.c();
    },
    l: function claim(nodes) {
      claim_component(title.$$.fragment, nodes);
      t = claim_space(nodes);
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(title, target, anchor);
      insert_dev(target, t, anchor);
      insert_dev(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);

      info.mount = function () {
        return await_block_anchor.parentNode;
      };

      info.anchor = await_block_anchor;
      current = true;
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      var title_changes = {};

      if (dirty &
      /*$$scope*/
      8388608) {
        title_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      title.$set(title_changes);
      info.ctx = ctx;

      if (dirty &
      /*options*/
      32 && promise !== (promise =
      /*options*/
      ctx[5]) && handle_promise(promise, info)) ; else {
        var child_ctx = ctx.slice();
        child_ctx[5] = info.resolved;
        info.block.p(child_ctx, dirty);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(title.$$.fragment, local);
      transition_in(info.block);
      current = true;
    },
    o: function outro(local) {
      transition_out(title.$$.fragment, local);

      for (var i = 0; i < 3; i += 1) {
        var _block = info.blocks[i];
        transition_out(_block);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(title, detaching);
      if (detaching) detach_dev(t);
      if (detaching) detach_dev(await_block_anchor);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$3.name,
    type: "slot",
    source: "(95:0) <Dialog bind:this={dialog}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$g(ctx) {
  var input;
  var t;
  var dialog_1;
  var current;
  var mounted;
  var dispose;
  var dialog_1_props = {
    $$slots: {
      default: [create_default_slot$3]
    },
    $$scope: {
      ctx: ctx
    }
  };
  dialog_1 = new Dialog({
    props: dialog_1_props,
    $$inline: true
  });
  /*dialog_1_binding*/

  ctx[18](dialog_1);
  var block = {
    c: function create() {
      input = element("input");
      t = space();
      create_component(dialog_1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      input = claim_element(nodes, "INPUT", {
        type: true,
        style: true,
        class: true
      });
      t = claim_space(nodes);
      claim_component(dialog_1.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(input, "type", "file");
      set_style(input, "display", "none");
      attr_dev(input, "class", "svelte-1breaf8");
      add_location(input, file$e, 81, 0, 3427);
    },
    m: function mount(target, anchor) {
      insert_dev(target, input, anchor);
      /*input_binding*/

      ctx[13](input);
      insert_dev(target, t, anchor);
      mount_component(dialog_1, target, anchor);
      current = true;

      if (!mounted) {
        dispose = listen_dev(input, "change",
        /*change_handler*/
        ctx[12], false, false, false);
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var dialog_1_changes = {};

      if (dirty &
      /*$$scope, options, fileInput, savesDir, $save*/
      8388668) {
        dialog_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      dialog_1.$set(dialog_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(dialog_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(dialog_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(input);
      /*input_binding*/

      ctx[13](null);
      if (detaching) detach_dev(t);
      /*dialog_1_binding*/

      ctx[18](null);
      destroy_component(dialog_1, detaching);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$g.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$g($$self, $$props, $$invalidate) {
  var $save;
  validate_store(save, "save");
  component_subscribe($$self, save, function ($$value) {
    return $$invalidate(4, $save = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("SaveSelect", slots, []);

  var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

  var dialog;
  var platformName = typeof navigator === "undefined" ? null : navigator.platform.startsWith("Win") ? "Windows" : navigator.platform.startsWith("Mac") ? "macOS" : navigator.platform.startsWith("Linux") ? "Linux" : null;
  var savesDirPath = typeof navigator === "undefined" ? null : navigator.platform.startsWith("Win") ? "%APPDATA%\\StardewValley\\Saves" : "~/.config/StardewValley/Saves";
  var savePath = typeof navigator === "undefined" ? null : navigator.platform.startsWith("Win") ? "%APPDATA%\\StardewValley\\Saves\\<save>\\SaveGameInfo" : "~/.config/StardewValley/Saves/<save>/SaveGameInfo";
  var hasBackend = typeof globalThis.showDirectoryPicker !== "undefined" && platformName !== "Windows" || typeof backend !== "undefined";
  var fileInput;
  var options = Promise.resolve(null);
  var savesDir = null;

  function setSavesDir(dir) {
    $$invalidate(3, savesDir = dir);
    localforage.setItem("savesDir", dir);
    $$invalidate(5, options = getSaveFiles(dir).then(function (saves) {
      return saves.sort(function (a, b) {
        return b.lastSaved - a.lastSaved;
      });
    }).catch(function () {
      return null;
    }));
  }

  function open() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
      var dir;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(savesDir === null)) {
                _context.next = 14;
                break;
              }

              _context.next = 3;
              return localforage.getItem("savesDir");

            case 3:
              dir = _context.sent;

              if (!(dir !== null)) {
                _context.next = 14;
                break;
              }

              if (!(typeof dir === "string")) {
                _context.next = 9;
                break;
              }

              setSavesDir(dir);
              _context.next = 14;
              break;

            case 9:
              _context.next = 11;
              return dir.requestPermission({
                mode: "read"
              });

            case 11:
              _context.t0 = _context.sent;

              if (!(_context.t0 === "granted")) {
                _context.next = 14;
                break;
              }

              setSavesDir(dir);

            case 14:
              dialog.open();

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }

  function close() {
    dialog.close();
  }

  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<SaveSelect> was created with unknown prop '".concat(key, "'"));
  });

  var change_handler = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(event) {
      var contents;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(event.target.files === null)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _context2.t0 = new DOMParser();
              _context2.next = 5;
              return event.target.files[0].text();

            case 5:
              _context2.t1 = _context2.sent;
              contents = _context2.t0.parseFromString.call(_context2.t0, _context2.t1, "text/xml");

              if (isValidSaveFile(contents)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return");

            case 9:
              _context2.t2 = save;
              _context2.next = 12;
              return processSaveFile(contents);

            case 12:
              _context2.t3 = _context2.sent;

              _context2.t2.set.call(_context2.t2, _context2.t3);

              event.target.value = "";
              dialog.close();

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function change_handler(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      fileInput = $$value;
      $$invalidate(2, fileInput);
    });
  }

  var click_handler = function click_handler() {
    return navigator.clipboard.writeText(savesDirPath);
  };

  var click_handler_1 = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(typeof backend !== "undefined")) {
                _context3.next = 8;
                break;
              }

              _context3.t0 = setSavesDir;
              _context3.next = 4;
              return backend.chooseFolder();

            case 4:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1);
              _context3.next = 17;
              break;

            case 8:
              if (!(typeof globalThis.showDirectoryPicker !== "undefined" && platformName !== "Windows")) {
                _context3.next = 16;
                break;
              }

              _context3.t2 = setSavesDir;
              _context3.next = 12;
              return globalThis.showDirectoryPicker();

            case 12:
              _context3.t3 = _context3.sent;
              (0, _context3.t2)(_context3.t3);
              _context3.next = 17;
              break;

            case 16:
              fileInput.click();

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function click_handler_1() {
      return _ref4.apply(this, arguments);
    };
  }();

  var click_handler_2 = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(option) {
      return regenerator.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = save;
              _context4.next = 3;
              return getSaveFile(option.handle);

            case 3:
              _context4.t1 = _context4.sent;

              _context4.t0.set.call(_context4.t0, _context4.t1);

              close();

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function click_handler_2(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();

  var click_handler_3 = function click_handler_3(options) {
    $$invalidate(3, savesDir = null);
    $$invalidate(5, options = null);
  };

  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      dialog = $$value;
      $$invalidate(1, dialog);
    });
  }

  $$self.$capture_state = function () {
    return {
      __awaiter: __awaiter,
      Button: Button_1,
      Label: Label,
      Dialog: Dialog,
      Actions: Actions,
      Content: Content,
      Title: Title,
      List: List,
      ListItem: Item,
      Text: Text,
      localForage: localforage,
      Spinner: Src,
      backend: backend,
      save: save,
      getSaveFile: getSaveFile,
      getSaveFiles: getSaveFiles,
      isValidSaveFile: isValidSaveFile,
      processSaveFile: processSaveFile,
      dialog: dialog,
      platformName: platformName,
      savesDirPath: savesDirPath,
      savePath: savePath,
      hasBackend: hasBackend,
      fileInput: fileInput,
      options: options,
      savesDir: savesDir,
      setSavesDir: setSavesDir,
      open: open,
      close: close,
      $save: $save
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("__awaiter" in $$props) __awaiter = $$props.__awaiter;
    if ("dialog" in $$props) $$invalidate(1, dialog = $$props.dialog);
    if ("fileInput" in $$props) $$invalidate(2, fileInput = $$props.fileInput);
    if ("options" in $$props) $$invalidate(5, options = $$props.options);
    if ("savesDir" in $$props) $$invalidate(3, savesDir = $$props.savesDir);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [close, dialog, fileInput, savesDir, $save, options, platformName, savesDirPath, savePath, hasBackend, setSavesDir, open, change_handler, input_binding, click_handler, click_handler_1, click_handler_2, click_handler_3, dialog_1_binding];
}

var SaveSelect = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(SaveSelect, _SvelteComponentDev);

  var _super = _createSuper$h(SaveSelect);

  function SaveSelect(options) {
    var _this;

    _classCallCheck(this, SaveSelect);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$g, create_fragment$g, safe_not_equal, {
      open: 11,
      close: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "SaveSelect",
      options: options,
      id: create_fragment$g.name
    });
    return _this;
  }

  _createClass(SaveSelect, [{
    key: "open",
    get: function get() {
      return this.$$.ctx[11];
    },
    set: function set(value) {
      throw new Error("<SaveSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "close",
    get: function get() {
      return this.$$.ctx[0];
    },
    set: function set(value) {
      throw new Error("<SaveSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return SaveSelect;
}(SvelteComponentDev);

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$f = "src/routes/_layout.svelte";

function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  return child_ctx;
} // (93:6) <IconButton class="material-icons rail-button" href="dashboard">


function create_default_slot_3$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("dashboard");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "dashboard");
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
    id: create_default_slot_3$1.name,
    type: "slot",
    source: "(93:6) <IconButton class=\\\"material-icons rail-button\\\" href=\\\"dashboard\\\">",
    ctx: ctx
  });
  return block;
} // (97:8) <IconButton class="rail-button" href={page}>


function create_default_slot_2$1(ctx) {
  var img;
  var img_src_value;
  var img_alt_value;
  var t;
  var block = {
    c: function create() {
      img = element("img");
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      img = claim_element(nodes, "IMG", {
        width: true,
        height: true,
        src: true,
        alt: true,
        class: true
      });
      t = claim_space(nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(img, "width", "24");
      attr_dev(img, "height", "24");
      if (img.src !== (img_src_value = "" + (
      /*page*/
      ctx[9] + ".png"))) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value = "" + (
      /*page*/
      ctx[9] + " icon"));
      attr_dev(img, "class", "svelte-ummorl");
      add_location(img, file$f, 97, 10, 2828);
    },
    m: function mount(target, anchor) {
      insert_dev(target, img, anchor);
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(img);
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2$1.name,
    type: "slot",
    source: "(97:8) <IconButton class=\\\"rail-button\\\" href={page}>",
    ctx: ctx
  });
  return block;
} // (96:6) {#each ['shipping', 'fish', 'artifacts', 'minerals', 'cooking', 'crafting', 'bundles', 'friendship'] as page}


function create_each_block$2(ctx) {
  var iconbutton;
  var current;
  iconbutton = new IconButton({
    props: {
      class: "rail-button",
      href:
      /*page*/
      ctx[9],
      $$slots: {
        default: [create_default_slot_2$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iconbutton.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var iconbutton_changes = {};

      if (dirty &
      /*$$scope*/
      256) {
        iconbutton_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbutton.$set(iconbutton_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(96:6) {#each ['shipping', 'fish', 'artifacts', 'minerals', 'cooking', 'crafting', 'bundles', 'friendship'] as page}",
    ctx: ctx
  });
  return block;
} // (103:6) <IconButton         class="material-icons rail-button"         on:click={() => saveSelect.open()}>


function create_default_slot_1$1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("folder");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "folder");
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
    id: create_default_slot_1$1.name,
    type: "slot",
    source: "(103:6) <IconButton         class=\\\"material-icons rail-button\\\"         on:click={() => saveSelect.open()}>",
    ctx: ctx
  });
  return block;
} // (117:0) <Dialog bind:this={itemInfoDialog}>


function create_default_slot$4(ctx) {
  var iteminfo;
  var current;
  iteminfo = new ItemInfo({
    props: {
      item:
      /*selectedItem*/
      ctx[2]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iteminfo.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iteminfo.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iteminfo, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var iteminfo_changes = {};
      if (dirty &
      /*selectedItem*/
      4) iteminfo_changes.item =
      /*selectedItem*/
      ctx[2];
      iteminfo.$set(iteminfo_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iteminfo.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iteminfo.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iteminfo, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$4.name,
    type: "slot",
    source: "(117:0) <Dialog bind:this={itemInfoDialog}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$h(ctx) {
  var div2;
  var nav;
  var div0;
  var iconbutton0;
  var t0;
  var t1;
  var div1;
  var iconbutton1;
  var t2;
  var main;
  var t3;
  var dialog;
  var t4;
  var saveselect;
  var current;
  iconbutton0 = new IconButton({
    props: {
      class: "material-icons rail-button",
      href: "dashboard",
      $$slots: {
        default: [create_default_slot_3$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var each_value = ["shipping", "fish", "artifacts", "minerals", "cooking", "crafting", "bundles", "friendship"];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < 8; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }

  iconbutton1 = new IconButton({
    props: {
      class: "material-icons rail-button",
      $$slots: {
        default: [create_default_slot_1$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  iconbutton1.$on("click",
  /*click_handler*/
  ctx[5]);
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[8], null);
  var dialog_props = {
    $$slots: {
      default: [create_default_slot$4]
    },
    $$scope: {
      ctx: ctx
    }
  };
  dialog = new Dialog({
    props: dialog_props,
    $$inline: true
  });
  /*dialog_binding*/

  ctx[6](dialog);
  var saveselect_props = {};
  saveselect = new SaveSelect({
    props: saveselect_props,
    $$inline: true
  });
  /*saveselect_binding*/

  ctx[7](saveselect);
  var block = {
    c: function create() {
      div2 = element("div");
      nav = element("nav");
      div0 = element("div");
      create_component(iconbutton0.$$.fragment);
      t0 = space();

      for (var _i = 0; _i < 8; _i += 1) {
        each_blocks[_i].c();
      }

      t1 = space();
      div1 = element("div");
      create_component(iconbutton1.$$.fragment);
      t2 = space();
      main = element("main");
      if (default_slot) default_slot.c();
      t3 = space();
      create_component(dialog.$$.fragment);
      t4 = space();
      create_component(saveselect.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      nav = claim_element(div2_nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      div0 = claim_element(nav_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(iconbutton0.$$.fragment, div0_nodes);
      t0 = claim_space(div0_nodes);

      for (var _i2 = 0; _i2 < 8; _i2 += 1) {
        each_blocks[_i2].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      t1 = claim_space(nav_nodes);
      div1 = claim_element(nav_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(iconbutton1.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      t2 = claim_space(div2_nodes);
      main = claim_element(div2_nodes, "MAIN", {
        class: true
      });
      var main_nodes = children(main);
      if (default_slot) default_slot.l(main_nodes);
      main_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      t3 = claim_space(nodes);
      claim_component(dialog.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(saveselect.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "nav-section top-section svelte-ummorl");
      add_location(div0, file$f, 91, 4, 2502);
      attr_dev(div1, "class", "nav-section bottom-section svelte-ummorl");
      add_location(div1, file$f, 101, 4, 2945);
      attr_dev(nav, "class", "nav-rail svelte-ummorl");
      add_location(nav, file$f, 90, 2, 2475);
      attr_dev(main, "class", "svelte-ummorl");
      toggle_class(main, "border", typeof backend !== "undefined" && /Windows(?: NT)? 10\.0/.test(navigator.userAgent));
      add_location(main, file$f, 110, 2, 3149);
      attr_dev(div2, "class", "container svelte-ummorl");
      add_location(div2, file$f, 89, 0, 2449);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, nav);
      append_dev(nav, div0);
      mount_component(iconbutton0, div0, null);
      append_dev(div0, t0);

      for (var _i3 = 0; _i3 < 8; _i3 += 1) {
        each_blocks[_i3].m(div0, null);
      }

      append_dev(nav, t1);
      append_dev(nav, div1);
      mount_component(iconbutton1, div1, null);
      append_dev(div2, t2);
      append_dev(div2, main);

      if (default_slot) {
        default_slot.m(main, null);
      }

      insert_dev(target, t3, anchor);
      mount_component(dialog, target, anchor);
      insert_dev(target, t4, anchor);
      mount_component(saveselect, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var iconbutton0_changes = {};

      if (dirty &
      /*$$scope*/
      256) {
        iconbutton0_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbutton0.$set(iconbutton0_changes);
      var iconbutton1_changes = {};

      if (dirty &
      /*$$scope*/
      256) {
        iconbutton1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbutton1.$set(iconbutton1_changes);

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        256) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[8], dirty, null, null);
        }
      }

      if (dirty &
      /*backend, navigator*/
      0) {
        toggle_class(main, "border", typeof backend !== "undefined" && /Windows(?: NT)? 10\.0/.test(navigator.userAgent));
      }

      var dialog_changes = {};

      if (dirty &
      /*$$scope, selectedItem*/
      260) {
        dialog_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      dialog.$set(dialog_changes);
      var saveselect_changes = {};
      saveselect.$set(saveselect_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbutton0.$$.fragment, local);

      for (var _i4 = 0; _i4 < 8; _i4 += 1) {
        transition_in(each_blocks[_i4]);
      }

      transition_in(iconbutton1.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(dialog.$$.fragment, local);
      transition_in(saveselect.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbutton0.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (var _i5 = 0; _i5 < 8; _i5 += 1) {
        transition_out(each_blocks[_i5]);
      }

      transition_out(iconbutton1.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(dialog.$$.fragment, local);
      transition_out(saveselect.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
      destroy_component(iconbutton0);
      destroy_each(each_blocks, detaching);
      destroy_component(iconbutton1);
      if (default_slot) default_slot.d(detaching);
      if (detaching) detach_dev(t3);
      /*dialog_binding*/

      ctx[6](null);
      destroy_component(dialog, detaching);
      if (detaching) detach_dev(t4);
      /*saveselect_binding*/

      ctx[7](null);
      destroy_component(saveselect, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$h.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var __awaiter$1 = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
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
  return __awaiter$1(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return gameInfo.fetch(this.fetch);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

function instance$h($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Layout", slots, ['default']);
  var segment = $$props.segment;
  var saveSelect;
  var itemInfoDialog;
  var selectedItem;
  setContext("item-info-dialog", {
    open: function open(item) {
      $$invalidate(2, selectedItem = item);
      itemInfoDialog.open();
    }
  });
  var writable_props = ["segment"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Layout> was created with unknown prop '".concat(key, "'"));
  });

  var click_handler = function click_handler() {
    return saveSelect.open();
  };

  function dialog_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      itemInfoDialog = $$value;
      $$invalidate(1, itemInfoDialog);
    });
  }

  function saveselect_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      saveSelect = $$value;
      $$invalidate(0, saveSelect);
    });
  }

  $$self.$$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(3, segment = $$props.segment);
    if ("$$scope" in $$props) $$invalidate(8, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      __awaiter: __awaiter$1,
      gameInfo: gameInfo,
      preload: preload,
      Dialog: Dialog,
      IconButton: IconButton,
      setContext: setContext,
      backend: backend,
      ItemInfo: ItemInfo,
      SaveSelect: SaveSelect,
      segment: segment,
      saveSelect: saveSelect,
      itemInfoDialog: itemInfoDialog,
      selectedItem: selectedItem
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(3, segment = $$props.segment);
    if ("saveSelect" in $$props) $$invalidate(0, saveSelect = $$props.saveSelect);
    if ("itemInfoDialog" in $$props) $$invalidate(1, itemInfoDialog = $$props.itemInfoDialog);
    if ("selectedItem" in $$props) $$invalidate(2, selectedItem = $$props.selectedItem);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [saveSelect, itemInfoDialog, selectedItem, segment, slots, click_handler, dialog_binding, saveselect_binding, $$scope];
}

var Layout = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Layout, _SvelteComponentDev);

  var _super = _createSuper$i(Layout);

  function Layout(options) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$h, create_fragment$h, safe_not_equal, {
      segment: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Layout",
      options: options,
      id: create_fragment$h.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[3] === undefined && !("segment" in props)) {
      console.warn("<Layout> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(Layout, [{
    key: "segment",
    get: function get() {
      throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Layout;
}(SvelteComponentDev);

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1 = globals.Error;
var file$g = "src/routes/_error.svelte"; // (42:0) {#if dev && error.stack}

function create_if_block$5(ctx) {
  var pre;
  var t_value =
  /*error*/
  ctx[1].stack + "";
  var t;
  var block = {
    c: function create() {
      pre = element("pre");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      pre = claim_element(nodes, "PRE", {
        class: true
      });
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(pre, "class", "svelte-11njitc");
      add_location(pre, file$g, 42, 2, 1350);
    },
    m: function mount(target, anchor) {
      insert_dev(target, pre, anchor);
      append_dev(pre, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*error*/
      2 && t_value !== (t_value =
      /*error*/
      ctx[1].stack + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(pre);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(42:0) {#if dev && error.stack}",
    ctx: ctx
  });
  return block;
}

function create_fragment$i(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1;
  var t2;
  var p;
  var t3_value =
  /*error*/
  ctx[1].message + "";
  var t3;
  var t4;
  var if_block_anchor;
  document.title = title_value = "" + (
  /*status*/
  ctx[0] + " | Stardew Completionist");
  var if_block =
  /*dev*/
  ctx[2] &&
  /*error*/
  ctx[1].stack && create_if_block$5(ctx);
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(
      /*status*/
      ctx[0]);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-1r15vul\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes,
      /*status*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-11njitc");
      add_location(h1, file$g, 37, 0, 1280);
      attr_dev(p, "class", "svelte-11njitc");
      add_location(p, file$g, 39, 0, 1299);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*status*/
      1 && title_value !== (title_value = "" + (
      /*status*/
      ctx[0] + " | Stardew Completionist"))) {
        document.title = title_value;
      }

      if (dirty &
      /*status*/
      1) set_data_dev(t1,
      /*status*/
      ctx[0]);
      if (dirty &
      /*error*/
      2 && t3_value !== (t3_value =
      /*error*/
      ctx[1].message + "")) set_data_dev(t3, t3_value);

      if (
      /*dev*/
      ctx[2] &&
      /*error*/
      ctx[1].stack) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$i.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$i($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Error", slots, []);
  var status = $$props.status;
  var error = $$props.error;
  var dev = "development" === "development";
  var writable_props = ["status", "error"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Error> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  $$self.$capture_state = function () {
    return {
      status: status,
      error: error,
      dev: dev
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("status" in $$props) $$invalidate(0, status = $$props.status);
    if ("error" in $$props) $$invalidate(1, error = $$props.error);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [status, error, dev];
}

var Error$1 = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Error, _SvelteComponentDev);

  var _super = _createSuper$j(Error);

  function Error(options) {
    var _this;

    _classCallCheck(this, Error);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$i, create_fragment$i, safe_not_equal, {
      status: 0,
      error: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Error",
      options: options,
      id: create_fragment$i.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*status*/
    ctx[0] === undefined && !("status" in props)) {
      console.warn("<Error> was created without expected prop 'status'");
    }

    if (
    /*error*/
    ctx[1] === undefined && !("error" in props)) {
      console.warn("<Error> was created without expected prop 'error'");
    }

    return _this;
  }

  _createClass(Error, [{
    key: "status",
    get: function get() {
      throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Error;
}(SvelteComponentDev);

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Error_1$1 = globals.Error;

function create_else_block$4(ctx) {
  var switch_instance;
  var switch_instance_anchor;
  var current;
  var switch_instance_spread_levels = [
  /*level1*/
  ctx[4].props];
  var switch_value =
  /*level1*/
  ctx[4].component;

  function switch_props(ctx) {
    var switch_instance_props = {};

    for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }

    return {
      props: switch_instance_props,
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l: function claim(nodes) {
      if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert_dev(target, switch_instance_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var switch_instance_changes = dirty &
      /*level1*/
      16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
      /*level1*/
      ctx[4].props)]) : {};

      if (switch_value !== (switch_value =
      /*level1*/
      ctx[4].component)) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$4.name,
    type: "else",
    source: "(23:1) {:else}",
    ctx: ctx
  });
  return block;
} // (21:1) {#if error}


function create_if_block$6(ctx) {
  var error_1;
  var current;
  error_1 = new Error$1({
    props: {
      error:
      /*error*/
      ctx[0],
      status:
      /*status*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(error_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(error_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(error_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var error_1_changes = {};
      if (dirty &
      /*error*/
      1) error_1_changes.error =
      /*error*/
      ctx[0];
      if (dirty &
      /*status*/
      2) error_1_changes.status =
      /*status*/
      ctx[1];
      error_1.$set(error_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(error_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(error_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(error_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(21:1) {#if error}",
    ctx: ctx
  });
  return block;
} // (20:0) <Layout segment="{segments[0]}" {...level0.props}>


function create_default_slot$5(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$6, create_else_block$4];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*error*/
    ctx[0]) return 0;
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
    p: function update(ctx, dirty) {
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
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$5.name,
    type: "slot",
    source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$j(ctx) {
  var layout;
  var current;
  var layout_spread_levels = [{
    segment:
    /*segments*/
    ctx[2][0]
  },
  /*level0*/
  ctx[3].props];
  var layout_props = {
    $$slots: {
      default: [create_default_slot$5]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < layout_spread_levels.length; i += 1) {
    layout_props = assign(layout_props, layout_spread_levels[i]);
  }

  layout = new Layout({
    props: layout_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(layout.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(layout.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(layout, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var layout_changes = dirty &
      /*segments, level0*/
      12 ? get_spread_update(layout_spread_levels, [dirty &
      /*segments*/
      4 && {
        segment:
        /*segments*/
        ctx[2][0]
      }, dirty &
      /*level0*/
      8 && get_spread_object(
      /*level0*/
      ctx[3].props)]) : {};

      if (dirty &
      /*$$scope, error, status, level1*/
      147) {
        layout_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      layout.$set(layout_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(layout, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$j.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$j($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("App", slots, []);
  var stores = $$props.stores;
  var error = $$props.error;
  var status = $$props.status;
  var segments = $$props.segments;
  var level0 = $$props.level0;
  var _$$props$level = $$props.level1,
      level1 = _$$props$level === void 0 ? null : _$$props$level;
  var notify = $$props.notify;
  afterUpdate(notify);
  setContext(CONTEXT_KEY, stores);
  var writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<App> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  $$self.$capture_state = function () {
    return {
      setContext: setContext,
      afterUpdate: afterUpdate,
      CONTEXT_KEY: CONTEXT_KEY,
      Layout: Layout,
      Error: Error$1,
      stores: stores,
      error: error,
      status: status,
      segments: segments,
      level0: level0,
      level1: level1,
      notify: notify
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
    if ("error" in $$props) $$invalidate(0, error = $$props.error);
    if ("status" in $$props) $$invalidate(1, status = $$props.status);
    if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
    if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
    if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
    if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [error, status, segments, level0, level1, stores, notify];
}

var App = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(App, _SvelteComponentDev);

  var _super = _createSuper$k(App);

  function App(options) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$j, create_fragment$j, safe_not_equal, {
      stores: 5,
      error: 0,
      status: 1,
      segments: 2,
      level0: 3,
      level1: 4,
      notify: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "App",
      options: options,
      id: create_fragment$j.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*stores*/
    ctx[5] === undefined && !("stores" in props)) {
      console.warn("<App> was created without expected prop 'stores'");
    }

    if (
    /*error*/
    ctx[0] === undefined && !("error" in props)) {
      console.warn("<App> was created without expected prop 'error'");
    }

    if (
    /*status*/
    ctx[1] === undefined && !("status" in props)) {
      console.warn("<App> was created without expected prop 'status'");
    }

    if (
    /*segments*/
    ctx[2] === undefined && !("segments" in props)) {
      console.warn("<App> was created without expected prop 'segments'");
    }

    if (
    /*level0*/
    ctx[3] === undefined && !("level0" in props)) {
      console.warn("<App> was created without expected prop 'level0'");
    }

    if (
    /*notify*/
    ctx[6] === undefined && !("notify" in props)) {
      console.warn("<App> was created without expected prop 'notify'");
    }

    return _this;
  }

  _createClass(App, [{
    key: "stores",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "error",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "status",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segments",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level0",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "level1",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "notify",
    get: function get() {
      throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return App;
}(SvelteComponentDev);

// This file is generated by Sapper — do not edit it!
var ignore = [];
var components = [{
  js: function js() {
    return Promise.all([import('./index.67e05008.js'), __inject_styles(["client-86beaaa9.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./friendship.6d51aed1.js'), __inject_styles(["client-86beaaa9.css","ItemButton-cb104a32.css","friendship-3e2e68dc.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./dashboard.736685e1.js'), __inject_styles(["client-86beaaa9.css","ItemButton-cb104a32.css","dashboard-f5ec6bc4.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./bundles.7c275313.js'), __inject_styles(["client-86beaaa9.css","ItemButton-cb104a32.css","bundles-79c3cfce.css"])]).then(function(x) { return x[0]; });
  }
}, {
  js: function js() {
    return Promise.all([import('./[collection].6fb98bad.js'), __inject_styles(["client-86beaaa9.css","ItemButton-cb104a32.css","[collection]-35c7d02a.css"])]).then(function(x) { return x[0]; });
  }
}];
var routes = function (d) {
  return [{
    // index.svelte
    pattern: /^\/$/,
    parts: [{
      i: 0
    }]
  }, {
    // friendship.svelte
    pattern: /^\/friendship\/?$/,
    parts: [{
      i: 1
    }]
  }, {
    // dashboard.svelte
    pattern: /^\/dashboard\/?$/,
    parts: [{
      i: 2
    }]
  }, {
    // bundles.svelte
    pattern: /^\/bundles\/?$/,
    parts: [{
      i: 3
    }]
  }, {
    // [collection].svelte
    pattern: /^\/([^/]+?)\/?$/,
    parts: [{
      i: 4,
      params: function params(match) {
        return {
          collection: d(match[1])
        };
      }
    }]
  }];
}(decodeURIComponent);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$2(thisArg, _arguments, P, generator) {
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
}

function prefetch(href) {
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    if (!prefetching || href !== prefetching.href) {
      set_prefetching(href, hydrate_target(target));
    }

    return prefetching.promise;
  }
}

var uid = 1;

function set_uid(n) {
  uid = n;
}

var cid;

function set_cid(n) {
  cid = n;
}

var _history = typeof history !== 'undefined' ? history : {
  pushState: function pushState(state, title, href) {},
  replaceState: function replaceState(state, title, href) {},
  scrollRestoration: ''
};

var scroll_history = {};

function load_current_page() {
  return Promise.resolve().then(function () {
    var _location = location,
        hash = _location.hash,
        href = _location.href;

    _history.replaceState({
      id: uid
    }, '', href);

    var target = select_target(new URL(location.href));
    if (target) return navigate(target, uid, true, hash);
  });
}

var base_url;
var handle_target;

function init$1(base, handler) {
  base_url = base;
  handle_target = handler;

  if ('scrollRestoration' in _history) {
    _history.scrollRestoration = 'manual';
  } // Adopted from Nuxt.js
  // Reset scrollRestoration to auto when leaving page, allowing page reload
  // and back-navigation from other pages to use the browser to restore the
  // scrolling position.


  addEventListener('beforeunload', function () {
    _history.scrollRestoration = 'auto';
  }); // Setting scrollRestoration to manual again when returning to this page.

  addEventListener('load', function () {
    _history.scrollRestoration = 'manual';
  });
  addEventListener('click', handle_click);
  addEventListener('popstate', handle_popstate); // prefetch

  addEventListener('touchstart', trigger_prefetch);
  addEventListener('mousemove', handle_mousemove);
}

function extract_query(search) {
  var query = Object.create(null);

  if (search.length > 0) {
    search.slice(1).split('&').forEach(function (searchParam) {
      var _$exec = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' '))),
          _$exec2 = _slicedToArray(_$exec, 3),
          key = _$exec2[1],
          _$exec2$ = _$exec2[2],
          value = _$exec2$ === void 0 ? '' : _$exec2$;

      if (typeof query[key] === 'string') query[key] = [query[key]];
      if (_typeof(query[key]) === 'object') query[key].push(value);else query[key] = value;
    });
  }

  return query;
}

function select_target(url) {
  if (url.origin !== location.origin) return null;
  if (!url.pathname.startsWith(base_url)) return null;
  var path = url.pathname.slice(base_url.length);

  if (path === '') {
    path = '/';
  } // avoid accidental clashes between server routes and page routes


  if (ignore.some(function (pattern) {
    return pattern.test(path);
  })) return;

  for (var i = 0; i < routes.length; i += 1) {
    var route = routes[i];
    var match = route.pattern.exec(path);

    if (match) {
      var query = extract_query(url.search);
      var part = route.parts[route.parts.length - 1];
      var params = part.params ? part.params(match) : {};
      var page = {
        host: location.host,
        path: path,
        query: query,
        params: params
      };
      return {
        href: url.href,
        route: route,
        match: match,
        page: page
      };
    }
  }
}

var mousemove_timeout;

function handle_mousemove(event) {
  clearTimeout(mousemove_timeout);
  mousemove_timeout = setTimeout(function () {
    trigger_prefetch(event);
  }, 20);
}

function trigger_prefetch(event) {
  var a = find_anchor(event.target);
  if (!a || a.rel !== 'prefetch') return;
  prefetch(a.href);
}

function handle_click(event) {
  // Adapted from https://github.com/visionmedia/page.js
  // MIT license https://github.com/visionmedia/page.js#license
  if (which(event) !== 1) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.defaultPrevented) return;
  var a = find_anchor(event.target);
  if (!a) return;
  if (!a.href) return; // check if link is inside an svg
  // in this case, both href and target are always inside an object

  var svg = _typeof(a.href) === 'object' && a.href.constructor.name === 'SVGAnimatedString';
  var href = String(svg ? a.href.baseVal : a.href);

  if (href === location.href) {
    if (!location.hash) event.preventDefault();
    return;
  } // Ignore if tag has
  // 1. 'download' attribute
  // 2. rel='external' attribute


  if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return; // Ignore if <a> has a target

  if (svg ? a.target.baseVal : a.target) return;
  var url = new URL(href); // Don't handle hash changes

  if (url.pathname === location.pathname && url.search === location.search) return;
  var target = select_target(url);

  if (target) {
    var noscroll = a.hasAttribute('sapper:noscroll');
    navigate(target, null, noscroll, url.hash);
    event.preventDefault();

    _history.pushState({
      id: cid
    }, '', url.href);
  }
}

function which(event) {
  return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== 'A') {
    node = node.parentNode;
  } // SVG <a> elements have a lowercase name


  return node;
}

function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}

function handle_popstate(event) {
  scroll_history[cid] = scroll_state();

  if (event.state) {
    var url = new URL(location.href);

    var _target = select_target(url);

    if (_target) {
      navigate(_target, event.state.id);
    } else {
      // eslint-disable-next-line
      location.href = location.href; // nosonar
    }
  } else {
    // hashchange
    set_uid(uid + 1);
    set_cid(uid);

    _history.replaceState({
      id: cid
    }, '', location.href);
  }
}

function navigate(dest, id, noscroll, hash) {
  return __awaiter$2(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
    var popstate, current_scroll, scroll, deep_linked;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            popstate = !!id;

            if (popstate) {
              cid = id;
            } else {
              current_scroll = scroll_state(); // clicked on a link. preserve scroll state

              scroll_history[cid] = current_scroll;
              cid = id = ++uid;
              scroll_history[cid] = noscroll ? current_scroll : {
                x: 0,
                y: 0
              };
            }

            _context.next = 4;
            return handle_target(dest);

          case 4:
            if (document.activeElement && document.activeElement instanceof HTMLElement) document.activeElement.blur();

            if (!noscroll) {
              scroll = scroll_history[id];

              if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));

                if (deep_linked) {
                  scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top + scrollY
                  };
                }
              }

              scroll_history[cid] = scroll;

              if (popstate || deep_linked) {
                scrollTo(scroll.x, scroll.y);
              } else {
                scrollTo(0, 0);
              }
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

function goto(href) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    noscroll: false,
    replaceState: false
  };
  var target = select_target(new URL(href, document.baseURI));

  if (target) {
    _history[opts.replaceState ? 'replaceState' : 'pushState']({
      id: cid
    }, '', href);

    return navigate(target, null, opts.noscroll).then(function () {});
  }

  location.href = href;
  return new Promise(function (f) {}); // never resolves
}

function page_store(value) {
  var store = writable(value);
  var ready = true;

  function notify() {
    ready = true;
    store.update(function (val) {
      return val;
    });
  }

  function set(new_value) {
    ready = false;
    store.set(new_value);
  }

  function subscribe(run) {
    var old_value;
    return store.subscribe(function (new_value) {
      if (old_value === undefined || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }

  return {
    notify: notify,
    set: set,
    subscribe: subscribe
  };
}

var initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
var ready = false;
var root_component;
var current_token;
var root_preloaded;
var current_branch = [];
var current_query = '{}';
var stores = {
  page: page_store({}),
  preloading: writable(null),
  session: writable(initial_data && initial_data.session)
};
var $session;
var session_dirty;
stores.session.subscribe(function (value) {
  return __awaiter$2(void 0, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee2() {
    var dest, token, _yield$hydrate_target, redirect, props, branch;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            $session = value;

            if (ready) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            session_dirty = true;
            dest = select_target(new URL(location.href));
            token = current_token = {};
            _context2.next = 8;
            return hydrate_target(dest);

          case 8:
            _yield$hydrate_target = _context2.sent;
            redirect = _yield$hydrate_target.redirect;
            props = _yield$hydrate_target.props;
            branch = _yield$hydrate_target.branch;

            if (!(token !== current_token)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return");

          case 14:
            if (!redirect) {
              _context2.next = 19;
              break;
            }

            _context2.next = 17;
            return goto(redirect.location, {
              replaceState: true
            });

          case 17:
            _context2.next = 21;
            break;

          case 19:
            _context2.next = 21;
            return render(branch, props, dest.page);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
});
var prefetching = null;

function set_prefetching(href, promise) {
  prefetching = {
    href: href,
    promise: promise
  };
}

var target;

function set_target(element) {
  target = element;
}

function start(opts) {
  set_target(opts.target);
  init$1(initial_data.baseUrl, handle_target$1);

  if (initial_data.error) {
    return Promise.resolve().then(function () {
      return handle_error(new URL(location.href));
    });
  }

  return load_current_page();
}

function handle_error(url) {
  var _location2 = location,
      host = _location2.host,
      pathname = _location2.pathname,
      search = _location2.search;
  var session = initial_data.session,
      preloaded = initial_data.preloaded,
      status = initial_data.status,
      error = initial_data.error;

  if (!root_preloaded) {
    root_preloaded = preloaded && preloaded[0];
  }

  var props = {
    error: error,
    status: status,
    session: session,
    level0: {
      props: root_preloaded
    },
    level1: {
      props: {
        status: status,
        error: error
      },
      component: Error$1
    },
    segments: preloaded
  };
  var query = extract_query(search);
  render([], props, {
    host: host,
    path: pathname,
    query: query,
    params: {}
  });
}

function handle_target$1(dest) {
  return __awaiter$2(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee3() {
    var loaded, token, loaded_result, redirect, props, branch;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (root_component) stores.preloading.set(true);
            loaded = prefetching && prefetching.href === dest.href ? prefetching.promise : hydrate_target(dest);
            prefetching = null;
            token = current_token = {};
            _context3.next = 6;
            return loaded;

          case 6:
            loaded_result = _context3.sent;
            redirect = loaded_result.redirect;

            if (!(token !== current_token)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return");

          case 10:
            if (!redirect) {
              _context3.next = 15;
              break;
            }

            _context3.next = 13;
            return goto(redirect.location, {
              replaceState: true
            });

          case 13:
            _context3.next = 18;
            break;

          case 15:
            props = loaded_result.props, branch = loaded_result.branch;
            _context3.next = 18;
            return render(branch, props, dest.page);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
}

function render(branch, props, page) {
  return __awaiter$2(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee4() {
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            stores.page.set(page);
            stores.preloading.set(false);

            if (!root_component) {
              _context4.next = 6;
              break;
            }

            root_component.$set(props);
            _context4.next = 13;
            break;

          case 6:
            props.stores = {
              page: {
                subscribe: stores.page.subscribe
              },
              preloading: {
                subscribe: stores.preloading.subscribe
              },
              session: stores.session
            };
            _context4.next = 9;
            return root_preloaded;

          case 9:
            _context4.t0 = _context4.sent;
            props.level0 = {
              props: _context4.t0
            };
            props.notify = stores.page.notify;
            root_component = new App({
              target: target,
              props: props,
              hydrate: true
            });

          case 13:
            current_branch = branch;
            current_query = JSON.stringify(page.query);
            ready = true;
            session_dirty = false;

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
}

function part_changed(i, segment, match, stringified_query) {
  // TODO only check query string changes for preload functions
  // that do in fact depend on it (using static analysis or
  // runtime instrumentation)
  if (stringified_query !== current_query) return true;
  var previous = current_branch[i];
  if (!previous) return false;
  if (segment !== previous.segment) return true;

  if (previous.match) {
    if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
      return true;
    }
  }
}

function hydrate_target(dest) {
  return __awaiter$2(this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee6() {
    var _this = this;

    var route, page, segments, _redirect, props, preload_context, root_preload, branch, l, stringified_query, match, segment_dirty;

    return regenerator.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            route = dest.route, page = dest.page;
            segments = page.path.split('/').filter(Boolean);
            _redirect = null;
            props = {
              error: null,
              status: 200,
              segments: [segments[0]]
            };
            preload_context = {
              fetch: function (_fetch) {
                function fetch(_x, _x2) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              }(function (url, opts) {
                return fetch(url, opts);
              }),
              redirect: function redirect(statusCode, location) {
                if (_redirect && (_redirect.statusCode !== statusCode || _redirect.location !== location)) {
                  throw new Error("Conflicting redirects");
                }

                _redirect = {
                  statusCode: statusCode,
                  location: location
                };
              },
              error: function error(status, _error) {
                props.error = typeof _error === 'string' ? new Error(_error) : _error;
                props.status = status;
              }
            };

            if (!root_preloaded) {
              root_preload = preload || function () {};

              root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
              }, $session);
            }

            l = 1;
            _context6.prev = 7;
            stringified_query = JSON.stringify(page.query);
            match = route.pattern.exec(page.path);
            segment_dirty = false;
            _context6.next = 13;
            return Promise.all(route.parts.map(function (part, i) {
              return __awaiter$2(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee5() {
                var segment, j, _yield$load_component, component, preload, preloaded;

                return regenerator.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        segment = segments[i];
                        if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;
                        props.segments[l] = segments[i + 1]; // TODO make this less confusing

                        if (part) {
                          _context5.next = 5;
                          break;
                        }

                        return _context5.abrupt("return", {
                          segment: segment
                        });

                      case 5:
                        j = l++;

                        if (!(!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i)) {
                          _context5.next = 8;
                          break;
                        }

                        return _context5.abrupt("return", current_branch[i]);

                      case 8:
                        segment_dirty = false;
                        _context5.next = 11;
                        return load_component(components[part.i]);

                      case 11:
                        _yield$load_component = _context5.sent;
                        component = _yield$load_component.default;
                        preload = _yield$load_component.preload;

                        if (!(ready || !initial_data.preloaded[i + 1])) {
                          _context5.next = 25;
                          break;
                        }

                        if (!preload) {
                          _context5.next = 21;
                          break;
                        }

                        _context5.next = 18;
                        return preload.call(preload_context, {
                          host: page.host,
                          path: page.path,
                          query: page.query,
                          params: part.params ? part.params(dest.match) : {}
                        }, $session);

                      case 18:
                        _context5.t0 = _context5.sent;
                        _context5.next = 22;
                        break;

                      case 21:
                        _context5.t0 = {};

                      case 22:
                        preloaded = _context5.t0;
                        _context5.next = 26;
                        break;

                      case 25:
                        preloaded = initial_data.preloaded[i + 1];

                      case 26:
                        return _context5.abrupt("return", props["level".concat(j)] = {
                          component: component,
                          props: preloaded,
                          segment: segment,
                          match: match,
                          part: part.i
                        });

                      case 27:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));
            }));

          case 13:
            branch = _context6.sent;
            _context6.next = 21;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](7);
            props.error = _context6.t0;
            props.status = 500;
            branch = [];

          case 21:
            return _context6.abrupt("return", {
              redirect: _redirect,
              props: props,
              branch: branch
            });

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[7, 16]]);
  }));
}

function load_component(component) {
  var promises = [component.js()];
  return Promise.all(promises).then(function (values) {
    return values[0];
  });
}

start({
    target: document.querySelector('#sapper')
});

export { matches$1 as $, insert_dev as A, append_dev as B, mount_component as C, _slicedToArray as D, transition_in as E, transition_out as F, destroy_component as G, validate_store as H, component_subscribe as I, derived as J, globals as K, validate_each_argument as L, save as M, empty as N, group_outros as O, check_outros as P, destroy_each as Q, _toConsumableArray as R, SvelteComponentDev as S, set_data_dev as T, styleInject as U, __extends as V, _assign as W, MDCFoundation as X, MDCRipple as Y, applyPassive as Z, _inherits as _, _getPrototypeOf as a, MDCRippleFoundation as a0, MDCComponent as a1, __awaiter as a2, __generator as a3, closest as a4, create_slot as a5, assign as a6, exclude as a7, forwardEventsBuilder as a8, get_current_component as a9, getContext as aa, setContext as ab, onMount as ac, onDestroy as ad, exclude_internal_props as ae, useActions as af, set_attributes as ag, action_destroyer as ah, listen_dev as ai, update_slot as aj, get_spread_update as ak, is_function as al, run_all as am, binding_callbacks as an, qualityNames as ao, toggle_class as ap, set_style as aq, seasonNames as ar, categoryNames as as, _possibleConstructorReturn as b, _classCallCheck as c, _assertThisInitialized as d, dispatch_dev as e, _asyncToGenerator as f, gameInfo as g, _createClass as h, init as i, space as j, element as k, create_component as l, detach_dev as m, noop as n, claim_space as o, claim_element as p, query_selector_all as q, regenerator as r, safe_not_equal as s, text as t, children as u, validate_slots as v, claim_text as w, claim_component as x, attr_dev as y, add_location as z };

import __inject_styles from './inject_styles.80d72f7e.js';