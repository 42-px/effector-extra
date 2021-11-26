var EffectorExtra = (function (exports, effector) {
  'use strict';

  function attachWrapper(args) {
    var handler = function handler(params) {
      var promise = args.effect(args.mapParams(params), {
        name: "promise",
        sid: "-9qez7q"
      });

      if (args.mapResult) {
        promise = promise.then(function (result) {
          return args.mapResult({
            params: params,
            result: result
          });
        });
      }

      if (args.mapError) {
        promise = promise["catch"](function (error) {
          throw args.mapError({
            params: params,
            error: error
          });
        });
      }

      return promise;
    };

    var effect = args.domain ? args.domain.effect({
      name: "effect",
      sid: "-xn2rd6"
    }) : effector.createEffect({
      name: "effect",
      sid: "-x614yz"
    });
    effect.use(handler);
    return effect;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function batchEvents(trigger, timeout) {
    var event = effector.createEvent({
      name: "event",
      sid: "-qsq21n"
    });
    var pushStore = effector.createEvent({
      name: "pushStore",
      sid: "-99i15u"
    });
    var resetStore = effector.createEvent({
      name: "resetStore",
      sid: "-ka34j3"
    });
    var timeoutEnd = effector.createEvent({
      name: "timeoutEnd",
      sid: "-8qf3eg"
    });
    var $storedEvents = effector.createStore([], {
      name: "$storedEvents",
      sid: "tj0mgu"
    });
    $storedEvents.on(pushStore, function (prevValue, value) {
      return [].concat(_toConsumableArray(prevValue), [value]);
    }).reset(resetStore);
    var timeoutId;
    trigger.watch(function (payload) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        pushStore(payload);
      } else {
        event([payload]);
      }

      timeoutId = setTimeout(function () {
        timeoutId = undefined;
        timeoutEnd();
      }, timeout);
    });
    effector.guard({
      ɔ: [{
        source: effector.sample({
          ɔ: [$storedEvents, timeoutEnd, function (store) {
            return store;
          }],
          config: {
            name: "source",
            sid: "4pit6z"
          }
        }),
        filter: $storedEvents.map(function (store) {
          return Boolean(store.length);
        })
      }],
      config: {
        sid: "c06kr4"
      }
    }).watch(function (payload) {
      event(payload);
      resetStore();
    });
    return event;
  }

  var mockEffects = function mockEffects() {
    return new Map();
  };
  var mockStores = function mockStores() {
    return new Map();
  };

  function createService(_ref) {
    var domain = _ref.domain,
        effect = _ref.effect;

    function createMethod(args) {
      return attachWrapper(_objectSpread2({
        domain: domain,
        effect: effect
      }, args));
    }

    return {
      createMethod: createMethod
    };
  }

  exports.attachWrapper = attachWrapper;
  exports.batchEvents = batchEvents;
  exports.createService = createService;
  exports.mockEffects = mockEffects;
  exports.mockStores = mockStores;

  return exports;

}({}, effector));
//# sourceMappingURL=effector-extra.iife.js.map
