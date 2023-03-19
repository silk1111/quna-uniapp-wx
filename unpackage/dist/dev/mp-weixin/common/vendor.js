(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 17));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 21);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true
  });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__095131E",
    appName: "quna-uni",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.13",
    uniRuntimeVersion: "3.6.13",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__095131E",
      appName: "quna-uni",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"quna-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
var eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (typeof wx[name] !== 'function' && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 4 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
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
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 18);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 19);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 20);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 22));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 23));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 22 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 23 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"quna-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"quna-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"quna-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"quna-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 25 */
/*!*****************************************!*\
  !*** D:/项目/uni-app/quna-uni/pages.json ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 26 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@vue/composition-api/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./dist/vue-composition-api.common.js */ 27)
}


/***/ }),
/* 27 */
/*!********************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@vue/composition-api/dist/vue-composition-api.common.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Displays a warning message (using console.error) with a stack trace if the
 * function is called inside of active component.
 *
 * @param message warning message to be displayed
 */
function warn$1(message) {
    var _a;
    warn(message, (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
}

var activeEffectScope;
var effectScopeStack = [];
var EffectScopeImpl = /** @class */ (function () {
    function EffectScopeImpl(vm) {
        this.active = true;
        this.effects = [];
        this.cleanups = [];
        this.vm = vm;
    }
    EffectScopeImpl.prototype.run = function (fn) {
        if (this.active) {
            try {
                this.on();
                return fn();
            }
            finally {
                this.off();
            }
        }
        else {
            warn$1("cannot run an inactive effect scope.");
        }
        return;
    };
    EffectScopeImpl.prototype.on = function () {
        if (this.active) {
            effectScopeStack.push(this);
            activeEffectScope = this;
        }
    };
    EffectScopeImpl.prototype.off = function () {
        if (this.active) {
            effectScopeStack.pop();
            activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
        }
    };
    EffectScopeImpl.prototype.stop = function () {
        if (this.active) {
            this.vm.$destroy();
            this.effects.forEach(function (e) { return e.stop(); });
            this.cleanups.forEach(function (cleanup) { return cleanup(); });
            this.active = false;
        }
    };
    return EffectScopeImpl;
}());
var EffectScope = /** @class */ (function (_super) {
    __extends(EffectScope, _super);
    function EffectScope(detached) {
        if (detached === void 0) { detached = false; }
        var _this = this;
        var vm = undefined;
        withCurrentInstanceTrackingDisabled(function () {
            vm = defineComponentInstance(getVueConstructor());
        });
        _this = _super.call(this, vm) || this;
        if (!detached) {
            recordEffectScope(_this);
        }
        return _this;
    }
    return EffectScope;
}(EffectScopeImpl));
function recordEffectScope(effect, scope) {
    var _a;
    scope = scope || activeEffectScope;
    if (scope && scope.active) {
        scope.effects.push(effect);
        return;
    }
    // destroy on parent component unmounted
    var vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
    vm && vm.$on('hook:destroyed', function () { return effect.stop(); });
}
function effectScope(detached) {
    return new EffectScope(detached);
}
function getCurrentScope() {
    return activeEffectScope;
}
function onScopeDispose(fn) {
    if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
    }
    else {
        warn$1("onScopeDispose() is called when there is no active effect scope" +
            " to be associated with.");
    }
}
/**
 * @internal
 **/
function getCurrentScopeVM() {
    var _a, _b;
    return ((_a = getCurrentScope()) === null || _a === void 0 ? void 0 : _a.vm) || ((_b = getCurrentInstance()) === null || _b === void 0 ? void 0 : _b.proxy);
}
/**
 * @internal
 **/
function bindCurrentScopeToVM(vm) {
    if (!vm.scope) {
        var scope_1 = new EffectScopeImpl(vm.proxy);
        vm.scope = scope_1;
        vm.proxy.$on('hook:destroyed', function () { return scope_1.stop(); });
    }
    return vm.scope;
}

var vueDependency = undefined;
try {
    var requiredVue = __webpack_require__(/*! vue */ 24);
    if (requiredVue && isVue(requiredVue)) {
        vueDependency = requiredVue;
    }
    else if (requiredVue &&
        'default' in requiredVue &&
        isVue(requiredVue.default)) {
        vueDependency = requiredVue.default;
    }
}
catch (_a) {
    // not available
}
var vueConstructor = null;
var currentInstance = null;
var currentInstanceTracking = true;
var PluginInstalledFlag = '__composition_api_installed__';
function isVue(obj) {
    return obj && isFunction(obj) && obj.name === 'Vue';
}
function isVueRegistered(Vue) {
    // resolve issue: https://github.com/vuejs/composition-api/issues/876#issue-1087619365
    return vueConstructor && hasOwn(Vue, PluginInstalledFlag);
}
function getVueConstructor() {
    {
        assert(vueConstructor, "must call Vue.use(VueCompositionAPI) before using any function.");
    }
    return vueConstructor;
}
// returns registered vue or `vue` dependency
function getRegisteredVueOrDefault() {
    var constructor = vueConstructor || vueDependency;
    {
        assert(constructor, "No vue dependency found.");
    }
    return constructor;
}
function setVueConstructor(Vue) {
    // @ts-ignore
    if (vueConstructor && Vue.__proto__ !== vueConstructor.__proto__) {
        warn('[vue-composition-api] another instance of Vue installed');
    }
    vueConstructor = Vue;
    Object.defineProperty(Vue, PluginInstalledFlag, {
        configurable: true,
        writable: true,
        value: true,
    });
}
/**
 * For `effectScope` to create instance without populate the current instance
 * @internal
 **/
function withCurrentInstanceTrackingDisabled(fn) {
    var prev = currentInstanceTracking;
    currentInstanceTracking = false;
    try {
        fn();
    }
    finally {
        currentInstanceTracking = prev;
    }
}
function setCurrentInstance(instance) {
    if (!currentInstanceTracking)
        return;
    var prev = currentInstance;
    prev === null || prev === void 0 ? void 0 : prev.scope.off();
    currentInstance = instance;
    currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope.on();
}
function getCurrentInstance() {
    return currentInstance;
}
var instanceMapCache = new WeakMap();
function toVue3ComponentInstance(vm) {
    if (instanceMapCache.has(vm)) {
        return instanceMapCache.get(vm);
    }
    var instance = {
        proxy: vm,
        update: vm.$forceUpdate,
        type: vm.$options,
        uid: vm._uid,
        // $emit is defined on prototype and it expected to be bound
        emit: vm.$emit.bind(vm),
        parent: null,
        root: null, // to be immediately set
    };
    bindCurrentScopeToVM(instance);
    // map vm.$props =
    var instanceProps = [
        'data',
        'props',
        'attrs',
        'refs',
        'vnode',
        'slots',
    ];
    instanceProps.forEach(function (prop) {
        proxy(instance, prop, {
            get: function () {
                return vm["$".concat(prop)];
            },
        });
    });
    proxy(instance, 'isMounted', {
        get: function () {
            // @ts-expect-error private api
            return vm._isMounted;
        },
    });
    proxy(instance, 'isUnmounted', {
        get: function () {
            // @ts-expect-error private api
            return vm._isDestroyed;
        },
    });
    proxy(instance, 'isDeactivated', {
        get: function () {
            // @ts-expect-error private api
            return vm._inactive;
        },
    });
    proxy(instance, 'emitted', {
        get: function () {
            // @ts-expect-error private api
            return vm._events;
        },
    });
    instanceMapCache.set(vm, instance);
    if (vm.$parent) {
        instance.parent = toVue3ComponentInstance(vm.$parent);
    }
    if (vm.$root) {
        instance.root = toVue3ComponentInstance(vm.$root);
    }
    return instance;
}

var toString = function (x) { return Object.prototype.toString.call(x); };
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== 'undefined' &&
    isNative(Symbol) &&
    typeof Reflect !== 'undefined' &&
    isNative(Reflect.ownKeys);
var noopFn = function (_) { return _; };
function proxy(target, key, _a) {
    var get = _a.get, set = _a.set;
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: get || noopFn,
        set: set || noopFn,
    });
}
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}
function hasOwn(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}
function assert(condition, msg) {
    if (!condition) {
        throw new Error("[vue-composition-api] ".concat(msg));
    }
}
function isPrimitive(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean');
}
function isArray(x) {
    return Array.isArray(x);
}
var objectToString = Object.prototype.toString;
var toTypeString = function (value) {
    return objectToString.call(value);
};
var isMap = function (val) {
    return toTypeString(val) === '[object Map]';
};
var isSet = function (val) {
    return toTypeString(val) === '[object Set]';
};
var MAX_VALID_ARRAY_LENGTH = 4294967295; // Math.pow(2, 32) - 1
function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return (n >= 0 &&
        Math.floor(n) === n &&
        isFinite(val) &&
        n <= MAX_VALID_ARRAY_LENGTH);
}
function isObject(val) {
    return val !== null && typeof val === 'object';
}
function isPlainObject(x) {
    return toString(x) === '[object Object]';
}
function isFunction(x) {
    return typeof x === 'function';
}
function isUndef(v) {
    return v === undefined || v === null;
}
function warn(msg, vm) {
    var Vue = getRegisteredVueOrDefault();
    if (!Vue || !Vue.util)
        console.warn("[vue-composition-api] ".concat(msg));
    else
        Vue.util.warn(msg, vm);
}
function logError(err, vm, info) {
    {
        warn("Error in ".concat(info, ": \"").concat(err.toString(), "\""), vm);
    }
    if (typeof window !== 'undefined' && typeof console !== 'undefined') {
        console.error(err);
    }
    else {
        throw err;
    }
}
/**
 * Object.is polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * */
function isSame(value1, value2) {
    if (value1 === value2) {
        return value1 !== 0 || 1 / value1 === 1 / value2;
    }
    else {
        return value1 !== value1 && value2 !== value2;
    }
}

function getCurrentInstanceForFn(hook, target) {
    target = target || getCurrentInstance();
    if (!target) {
        warn("".concat(hook, " is called when there is no active component instance to be ") +
            "associated with. " +
            "Lifecycle injection APIs can only be used during execution of setup().");
    }
    return target;
}
function defineComponentInstance(Ctor, options) {
    if (options === void 0) { options = {}; }
    var silent = Ctor.config.silent;
    Ctor.config.silent = true;
    var vm = new Ctor(options);
    Ctor.config.silent = silent;
    return vm;
}
function isComponentInstance(obj) {
    var Vue = getVueConstructor();
    return Vue && obj instanceof Vue;
}
function createSlotProxy(vm, slotName) {
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!vm.$scopedSlots[slotName]) {
            return warn("slots.".concat(slotName, "() got called outside of the \"render()\" scope"), vm);
        }
        return vm.$scopedSlots[slotName].apply(vm, args);
    });
}
function resolveSlots(slots, normalSlots) {
    var res;
    if (!slots) {
        res = {};
    }
    else if (slots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return slots._normalized;
    }
    else {
        res = {};
        for (var key in slots) {
            if (slots[key] && key[0] !== '$') {
                res[key] = true;
            }
        }
    }
    // expose normal slots on scopedSlots
    for (var key in normalSlots) {
        if (!(key in res)) {
            res[key] = true;
        }
    }
    return res;
}
var vueInternalClasses;
var getVueInternalClasses = function () {
    if (!vueInternalClasses) {
        var vm = defineComponentInstance(getVueConstructor(), {
            computed: {
                value: function () {
                    return 0;
                },
            },
        });
        // to get Watcher class
        var Watcher = vm._computedWatchers.value.constructor;
        // to get Dep class
        var Dep = vm._data.__ob__.dep.constructor;
        vueInternalClasses = {
            Watcher: Watcher,
            Dep: Dep,
        };
        vm.$destroy();
    }
    return vueInternalClasses;
};

function createSymbol(name) {
    return hasSymbol ? Symbol.for(name) : name;
}
var WatcherPreFlushQueueKey = createSymbol('composition-api.preFlushQueue');
var WatcherPostFlushQueueKey = createSymbol('composition-api.postFlushQueue');
// must be a string, symbol key is ignored in reactive
var RefKey = 'composition-api.refKey';

var accessModifiedSet = new WeakMap();
var rawSet = new WeakMap();
var readonlySet = new WeakMap();

/**
 * Set a property on an object. Adds the new property, triggers change
 * notification and intercept it's subsequent access if the property doesn't
 * already exist.
 */
function set$1(target, key, val) {
    var Vue = getVueConstructor();
    // @ts-expect-error https://github.com/vuejs/vue/pull/12132
    var _a = Vue.util, warn = _a.warn, defineReactive = _a.defineReactive;
    if ((isUndef(target) || isPrimitive(target))) {
        warn("Cannot set reactive property on undefined, null, or primitive value: ".concat(target));
    }
    var ob = target.__ob__;
    function ssrMockReactivity() {
        // in SSR, there is no __ob__. Mock for reactivity check
        if (ob && isObject(val) && !hasOwn(val, '__ob__')) {
            mockReactivityDeep(val);
        }
    }
    if (isArray(target)) {
        if (isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key);
            target.splice(key, 1, val);
            ssrMockReactivity();
            return val;
        }
        else if (key === 'length' && val !== target.length) {
            target.length = val;
            ob === null || ob === void 0 ? void 0 : ob.dep.notify();
            return val;
        }
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        ssrMockReactivity();
        return val;
    }
    if (target._isVue || (ob && ob.vmCount)) {
        warn('Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.');
        return val;
    }
    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReactive(ob.value, key, val);
    // IMPORTANT: define access control before trigger watcher
    defineAccessControl(target, key, val);
    ssrMockReactivity();
    ob.dep.notify();
    return val;
}

var _isForceTrigger = false;
function isForceTrigger() {
    return _isForceTrigger;
}
function setForceTrigger(v) {
    _isForceTrigger = v;
}

var RefImpl = /** @class */ (function () {
    function RefImpl(_a) {
        var get = _a.get, set = _a.set;
        proxy(this, 'value', {
            get: get,
            set: set,
        });
    }
    return RefImpl;
}());
function createRef(options, isReadonly, isComputed) {
    if (isReadonly === void 0) { isReadonly = false; }
    if (isComputed === void 0) { isComputed = false; }
    var r = new RefImpl(options);
    // add effect to differentiate refs from computed
    if (isComputed)
        r.effect = true;
    // seal the ref, this could prevent ref from being observed
    // It's safe to seal the ref, since we really shouldn't extend it.
    // related issues: #79
    var sealed = Object.seal(r);
    if (isReadonly)
        readonlySet.set(sealed, true);
    return sealed;
}
function ref(raw) {
    var _a;
    if (isRef(raw)) {
        return raw;
    }
    var value = reactive((_a = {}, _a[RefKey] = raw, _a));
    return createRef({
        get: function () { return value[RefKey]; },
        set: function (v) { return (value[RefKey] = v); },
    });
}
function isRef(value) {
    return value instanceof RefImpl;
}
function unref(ref) {
    return isRef(ref) ? ref.value : ref;
}
function toRefs(obj) {
    if (!isReactive(obj)) {
        warn("toRefs() expects a reactive object but received a plain one.");
    }
    if (!isPlainObject(obj))
        return obj;
    var ret = {};
    for (var key in obj) {
        ret[key] = toRef(obj, key);
    }
    return ret;
}
function customRef(factory) {
    var version = ref(0);
    return createRef(factory(function () { return void version.value; }, function () {
        ++version.value;
    }));
}
function toRef(object, key) {
    if (!(key in object))
        set$1(object, key, undefined);
    var v = object[key];
    if (isRef(v))
        return v;
    return createRef({
        get: function () { return object[key]; },
        set: function (v) { return (object[key] = v); },
    });
}
function shallowRef(raw) {
    var _a;
    if (isRef(raw)) {
        return raw;
    }
    var value = shallowReactive((_a = {}, _a[RefKey] = raw, _a));
    return createRef({
        get: function () { return value[RefKey]; },
        set: function (v) { return (value[RefKey] = v); },
    });
}
function triggerRef(value) {
    if (!isRef(value))
        return;
    setForceTrigger(true);
    value.value = value.value;
    setForceTrigger(false);
}
function proxyRefs(objectWithRefs) {
    var _a, e_1, _b;
    if (isReactive(objectWithRefs)) {
        return objectWithRefs;
    }
    var value = reactive((_a = {}, _a[RefKey] = objectWithRefs, _a));
    def(value, RefKey, value[RefKey], false);
    var _loop_1 = function (key) {
        proxy(value, key, {
            get: function () {
                if (isRef(value[RefKey][key])) {
                    return value[RefKey][key].value;
                }
                return value[RefKey][key];
            },
            set: function (v) {
                if (isRef(value[RefKey][key])) {
                    return (value[RefKey][key].value = unref(v));
                }
                value[RefKey][key] = unref(v);
            },
        });
    };
    try {
        for (var _c = __values(Object.keys(objectWithRefs)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;
            _loop_1(key);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return value;
}

var SKIPFLAG = '__v_skip';
function isRaw(obj) {
    var _a;
    return Boolean(obj &&
        hasOwn(obj, '__ob__') &&
        typeof obj.__ob__ === 'object' &&
        ((_a = obj.__ob__) === null || _a === void 0 ? void 0 : _a[SKIPFLAG]));
}
function isReactive(obj) {
    var _a;
    return Boolean(obj &&
        hasOwn(obj, '__ob__') &&
        typeof obj.__ob__ === 'object' &&
        !((_a = obj.__ob__) === null || _a === void 0 ? void 0 : _a[SKIPFLAG]));
}
/**
 * Proxing property access of target.
 * We can do unwrapping and other things here.
 */
function setupAccessControl(target) {
    if (!isPlainObject(target) ||
        isRaw(target) ||
        isArray(target) ||
        isRef(target) ||
        isComponentInstance(target) ||
        accessModifiedSet.has(target))
        return;
    accessModifiedSet.set(target, true);
    var keys = Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        defineAccessControl(target, keys[i]);
    }
}
/**
 * Auto unwrapping when access property
 */
function defineAccessControl(target, key, val) {
    if (key === '__ob__')
        return;
    if (isRaw(target[key]))
        return;
    var getter;
    var setter;
    var property = Object.getOwnPropertyDescriptor(target, key);
    if (property) {
        if (property.configurable === false) {
            return;
        }
        getter = property.get;
        setter = property.set;
        if ((!getter || setter) /* not only have getter */ &&
            arguments.length === 2) {
            val = target[key];
        }
    }
    setupAccessControl(val);
    proxy(target, key, {
        get: function getterHandler() {
            var value = getter ? getter.call(target) : val;
            // if the key is equal to RefKey, skip the unwrap logic
            if (key !== RefKey && isRef(value)) {
                return value.value;
            }
            else {
                return value;
            }
        },
        set: function setterHandler(newVal) {
            if (getter && !setter)
                return;
            // If the key is equal to RefKey, skip the unwrap logic
            // If and only if "value" is ref and "newVal" is not a ref,
            // the assignment should be proxied to "value" ref.
            if (key !== RefKey && isRef(val) && !isRef(newVal)) {
                val.value = newVal;
            }
            else if (setter) {
                setter.call(target, newVal);
                val = newVal;
            }
            else {
                val = newVal;
            }
            setupAccessControl(newVal);
        },
    });
}
function observe(obj) {
    var Vue = getRegisteredVueOrDefault();
    var observed;
    if (Vue.observable) {
        observed = Vue.observable(obj);
    }
    else {
        var vm = defineComponentInstance(Vue, {
            data: {
                $$state: obj,
            },
        });
        observed = vm._data.$$state;
    }
    // in SSR, there is no __ob__. Mock for reactivity check
    if (!hasOwn(observed, '__ob__')) {
        mockReactivityDeep(observed);
    }
    return observed;
}
/**
 * Mock __ob__ for object recursively
 */
function mockReactivityDeep(obj, seen) {
    var e_1, _a;
    if (seen === void 0) { seen = new Set(); }
    if (seen.has(obj) || hasOwn(obj, '__ob__') || !Object.isExtensible(obj))
        return;
    def(obj, '__ob__', mockObserver(obj));
    seen.add(obj);
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = obj[key];
            if (!(isPlainObject(value) || isArray(value)) ||
                isRaw(value) ||
                !Object.isExtensible(value)) {
                continue;
            }
            mockReactivityDeep(value, seen);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function mockObserver(value) {
    if (value === void 0) { value = {}; }
    return {
        value: value,
        dep: {
            notify: noopFn,
            depend: noopFn,
            addSub: noopFn,
            removeSub: noopFn,
        },
    };
}
function createObserver() {
    return observe({}).__ob__;
}
function shallowReactive(obj) {
    var e_2, _a;
    if (!isObject(obj)) {
        {
            warn('"shallowReactive()" must be called on an object.');
        }
        return obj;
    }
    if (!(isPlainObject(obj) || isArray(obj)) ||
        isRaw(obj) ||
        !Object.isExtensible(obj)) {
        return obj;
    }
    var observed = observe(isArray(obj) ? [] : {});
    var ob = observed.__ob__;
    var _loop_1 = function (key) {
        var val = obj[key];
        var getter;
        var setter;
        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property) {
            if (property.configurable === false) {
                return "continue";
            }
            getter = property.get;
            setter = property.set;
        }
        proxy(observed, key, {
            get: function getterHandler() {
                var _a;
                (_a = ob.dep) === null || _a === void 0 ? void 0 : _a.depend();
                return val;
            },
            set: function setterHandler(newVal) {
                var _a;
                if (getter && !setter)
                    return;
                if (!isForceTrigger() && val === newVal)
                    return;
                if (setter) {
                    setter.call(obj, newVal);
                }
                else {
                    val = newVal;
                }
                (_a = ob.dep) === null || _a === void 0 ? void 0 : _a.notify();
            },
        });
    };
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            _loop_1(key);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return observed;
}
/**
 * Make obj reactivity
 */
function reactive(obj) {
    if (!isObject(obj)) {
        {
            warn('"reactive()" must be called on an object.');
        }
        return obj;
    }
    if (!(isPlainObject(obj) || isArray(obj)) ||
        isRaw(obj) ||
        !Object.isExtensible(obj)) {
        return obj;
    }
    var observed = observe(obj);
    setupAccessControl(observed);
    return observed;
}
/**
 * Make sure obj can't be a reactive
 */
function markRaw(obj) {
    if (!(isPlainObject(obj) || isArray(obj)) || !Object.isExtensible(obj)) {
        return obj;
    }
    // set the vue observable flag at obj
    var ob = createObserver();
    ob[SKIPFLAG] = true;
    def(obj, '__ob__', ob);
    // mark as Raw
    rawSet.set(obj, true);
    return obj;
}
function toRaw(observed) {
    var _a;
    if (isRaw(observed) || !Object.isExtensible(observed)) {
        return observed;
    }
    return ((_a = observed === null || observed === void 0 ? void 0 : observed.__ob__) === null || _a === void 0 ? void 0 : _a.value) || observed;
}

function isReadonly(obj) {
    return readonlySet.has(obj);
}
/**
 * **In @vue/composition-api, `reactive` only provides type-level readonly check**
 *
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
function readonly(target) {
    if (!isObject(target)) {
        warn("value cannot be made reactive: ".concat(String(target)));
    }
    else {
        readonlySet.set(target, true);
    }
    return target;
}
function shallowReadonly(obj) {
    var e_1, _a;
    if (!isObject(obj)) {
        {
            warn("value cannot be made reactive: ".concat(String(obj)));
        }
        return obj;
    }
    if (!(isPlainObject(obj) || isArray(obj)) ||
        (!Object.isExtensible(obj) && !isRef(obj))) {
        return obj;
    }
    var readonlyObj = isRef(obj)
        ? new RefImpl({})
        : isReactive(obj)
            ? observe({})
            : {};
    var source = reactive({});
    var ob = source.__ob__;
    var _loop_1 = function (key) {
        var val = obj[key];
        var getter;
        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property) {
            if (property.configurable === false && !isRef(obj)) {
                return "continue";
            }
            getter = property.get;
        }
        proxy(readonlyObj, key, {
            get: function getterHandler() {
                var value = getter ? getter.call(obj) : val;
                ob.dep.depend();
                return value;
            },
            set: function (v) {
                {
                    warn("Set operation on key \"".concat(key, "\" failed: target is readonly."));
                }
            },
        });
    };
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            _loop_1(key);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    readonlySet.set(readonlyObj, true);
    return readonlyObj;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
    var Vue = getVueConstructor();
    var warn = Vue.util.warn;
    if ((isUndef(target) || isPrimitive(target))) {
        warn("Cannot delete reactive property on undefined, null, or primitive value: ".concat(target));
    }
    if (isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return;
    }
    var ob = target.__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        warn('Avoid deleting properties on a Vue instance or its root $data ' +
                '- just set it to null.');
        return;
    }
    if (!hasOwn(target, key)) {
        return;
    }
    delete target[key];
    if (!ob) {
        return;
    }
    ob.dep.notify();
}

var genName = function (name) { return "on".concat(name[0].toUpperCase() + name.slice(1)); };
function createLifeCycle(lifeCyclehook) {
    return function (callback, target) {
        var instance = getCurrentInstanceForFn(genName(lifeCyclehook), target);
        return (instance &&
            injectHookOption(getVueConstructor(), instance, lifeCyclehook, callback));
    };
}
function injectHookOption(Vue, instance, hook, val) {
    var options = instance.proxy.$options;
    var mergeFn = Vue.config.optionMergeStrategies[hook];
    var wrappedHook = wrapHookCall(instance, val);
    options[hook] = mergeFn(options[hook], wrappedHook);
    return wrappedHook;
}
function wrapHookCall(instance, fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var prev = getCurrentInstance();
        setCurrentInstance(instance);
        try {
            return fn.apply(void 0, __spreadArray([], __read(args), false));
        }
        finally {
            setCurrentInstance(prev);
        }
    };
}
var onBeforeMount = createLifeCycle('beforeMount');
var onMounted = createLifeCycle('mounted');
var onBeforeUpdate = createLifeCycle('beforeUpdate');
var onUpdated = createLifeCycle('updated');
var onBeforeUnmount = createLifeCycle('beforeDestroy');
var onUnmounted = createLifeCycle('destroyed');
var onErrorCaptured = createLifeCycle('errorCaptured');
var onActivated = createLifeCycle('activated');
var onDeactivated = createLifeCycle('deactivated');
var onServerPrefetch = createLifeCycle('serverPrefetch');

var fallbackVM;
function flushPreQueue() {
    flushQueue(this, WatcherPreFlushQueueKey);
}
function flushPostQueue() {
    flushQueue(this, WatcherPostFlushQueueKey);
}
function hasWatchEnv(vm) {
    return vm[WatcherPreFlushQueueKey] !== undefined;
}
function installWatchEnv(vm) {
    vm[WatcherPreFlushQueueKey] = [];
    vm[WatcherPostFlushQueueKey] = [];
    vm.$on('hook:beforeUpdate', flushPreQueue);
    vm.$on('hook:updated', flushPostQueue);
}
function getWatcherOption(options) {
    return __assign({
        immediate: false,
        deep: false,
        flush: 'pre',
    }, options);
}
function getWatchEffectOption(options) {
    return __assign({
        flush: 'pre',
    }, options);
}
function getWatcherVM() {
    var vm = getCurrentScopeVM();
    if (!vm) {
        if (!fallbackVM) {
            fallbackVM = defineComponentInstance(getVueConstructor());
        }
        vm = fallbackVM;
    }
    else if (!hasWatchEnv(vm)) {
        installWatchEnv(vm);
    }
    return vm;
}
function flushQueue(vm, key) {
    var queue = vm[key];
    for (var index = 0; index < queue.length; index++) {
        queue[index]();
    }
    queue.length = 0;
}
function queueFlushJob(vm, fn, mode) {
    // flush all when beforeUpdate and updated are not fired
    var fallbackFlush = function () {
        vm.$nextTick(function () {
            if (vm[WatcherPreFlushQueueKey].length) {
                flushQueue(vm, WatcherPreFlushQueueKey);
            }
            if (vm[WatcherPostFlushQueueKey].length) {
                flushQueue(vm, WatcherPostFlushQueueKey);
            }
        });
    };
    switch (mode) {
        case 'pre':
            fallbackFlush();
            vm[WatcherPreFlushQueueKey].push(fn);
            break;
        case 'post':
            fallbackFlush();
            vm[WatcherPostFlushQueueKey].push(fn);
            break;
        default:
            assert(false, "flush must be one of [\"post\", \"pre\", \"sync\"], but got ".concat(mode));
            break;
    }
}
function createVueWatcher(vm, getter, callback, options) {
    var index = vm._watchers.length;
    // @ts-ignore: use undocumented options
    vm.$watch(getter, callback, {
        immediate: options.immediateInvokeCallback,
        deep: options.deep,
        lazy: options.noRun,
        sync: options.sync,
        before: options.before,
    });
    return vm._watchers[index];
}
// We have to monkeypatch the teardown function so Vue will run
// runCleanup() when it tears down the watcher on unmounted.
function patchWatcherTeardown(watcher, runCleanup) {
    var _teardown = watcher.teardown;
    watcher.teardown = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _teardown.apply(watcher, args);
        runCleanup();
    };
}
function createWatcher(vm, source, cb, options) {
    var _a;
    if (!cb) {
        if (options.immediate !== undefined) {
            warn("watch() \"immediate\" option is only respected when using the " +
                "watch(source, callback, options?) signature.");
        }
        if (options.deep !== undefined) {
            warn("watch() \"deep\" option is only respected when using the " +
                "watch(source, callback, options?) signature.");
        }
    }
    var flushMode = options.flush;
    var isSync = flushMode === 'sync';
    var cleanup;
    var registerCleanup = function (fn) {
        cleanup = function () {
            try {
                fn();
            }
            catch (
            // FIXME: remove any
            error) {
                logError(error, vm, 'onCleanup()');
            }
        };
    };
    // cleanup before running getter again
    var runCleanup = function () {
        if (cleanup) {
            cleanup();
            cleanup = null;
        }
    };
    var createScheduler = function (fn) {
        if (isSync ||
            /* without a current active instance, ignore pre|post mode */ vm ===
                fallbackVM) {
            return fn;
        }
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return queueFlushJob(vm, function () {
                fn.apply(void 0, __spreadArray([], __read(args), false));
            }, flushMode);
        });
    };
    // effect watch
    if (cb === null) {
        var running_1 = false;
        var getter_1 = function () {
            // preventing the watch callback being call in the same execution
            if (running_1) {
                return;
            }
            try {
                running_1 = true;
                source(registerCleanup);
            }
            finally {
                running_1 = false;
            }
        };
        var watcher_1 = createVueWatcher(vm, getter_1, noopFn, {
            deep: options.deep || false,
            sync: isSync,
            before: runCleanup,
        });
        patchWatcherTeardown(watcher_1, runCleanup);
        // enable the watcher update
        watcher_1.lazy = false;
        var originGet = watcher_1.get.bind(watcher_1);
        // always run watchEffect
        watcher_1.get = createScheduler(originGet);
        return function () {
            watcher_1.teardown();
        };
    }
    var deep = options.deep;
    var isMultiSource = false;
    var getter;
    if (isRef(source)) {
        getter = function () { return source.value; };
    }
    else if (isReactive(source)) {
        getter = function () { return source; };
        deep = true;
    }
    else if (isArray(source)) {
        isMultiSource = true;
        getter = function () {
            return source.map(function (s) {
                if (isRef(s)) {
                    return s.value;
                }
                else if (isReactive(s)) {
                    return traverse(s);
                }
                else if (isFunction(s)) {
                    return s();
                }
                else {
                    warn("Invalid watch source: ".concat(JSON.stringify(s), ".\n          A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."), vm);
                    return noopFn;
                }
            });
        };
    }
    else if (isFunction(source)) {
        getter = source;
    }
    else {
        getter = noopFn;
        warn("Invalid watch source: ".concat(JSON.stringify(source), ".\n      A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."), vm);
    }
    if (deep) {
        var baseGetter_1 = getter;
        getter = function () { return traverse(baseGetter_1()); };
    }
    var applyCb = function (n, o) {
        if (!deep &&
            isMultiSource &&
            n.every(function (v, i) { return isSame(v, o[i]); }))
            return;
        // cleanup before running cb again
        runCleanup();
        return cb(n, o, registerCleanup);
    };
    var callback = createScheduler(applyCb);
    if (options.immediate) {
        var originalCallback_1 = callback;
        // `shiftCallback` is used to handle the first sync effect run.
        // The subsequent callbacks will redirect to `callback`.
        var shiftCallback_1 = function (n, o) {
            shiftCallback_1 = originalCallback_1;
            // o is undefined on the first call
            return applyCb(n, isArray(n) ? [] : o);
        };
        callback = function (n, o) {
            return shiftCallback_1(n, o);
        };
    }
    // @ts-ignore: use undocumented option "sync"
    var stop = vm.$watch(getter, callback, {
        immediate: options.immediate,
        deep: deep,
        sync: isSync,
    });
    // Once again, we have to hack the watcher for proper teardown
    var watcher = vm._watchers[vm._watchers.length - 1];
    // if the return value is reactive and deep:true
    // watch for changes, this might happen when new key is added
    if (isReactive(watcher.value) && ((_a = watcher.value.__ob__) === null || _a === void 0 ? void 0 : _a.dep) && deep) {
        watcher.value.__ob__.dep.addSub({
            update: function () {
                // this will force the source to be revaluated and the callback
                // executed if needed
                watcher.run();
            },
        });
    }
    patchWatcherTeardown(watcher, runCleanup);
    return function () {
        stop();
    };
}
function watchEffect(effect, options) {
    var opts = getWatchEffectOption(options);
    var vm = getWatcherVM();
    return createWatcher(vm, effect, null, opts);
}
function watchPostEffect(effect) {
    return watchEffect(effect, { flush: 'post' });
}
function watchSyncEffect(effect) {
    return watchEffect(effect, { flush: 'sync' });
}
// implementation
function watch(source, cb, options) {
    var callback = null;
    if (isFunction(cb)) {
        // source watch
        callback = cb;
    }
    else {
        // effect watch
        {
            warn("`watch(fn, options?)` signature has been moved to a separate API. " +
                "Use `watchEffect(fn, options?)` instead. `watch` now only " +
                "supports `watch(source, cb, options?) signature.");
        }
        options = cb;
        callback = null;
    }
    var opts = getWatcherOption(options);
    var vm = getWatcherVM();
    return createWatcher(vm, source, callback, opts);
}
function traverse(value, seen) {
    if (seen === void 0) { seen = new Set(); }
    if (!isObject(value) || seen.has(value) || rawSet.has(value)) {
        return value;
    }
    seen.add(value);
    if (isRef(value)) {
        traverse(value.value, seen);
    }
    else if (isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    }
    else if (isSet(value) || isMap(value)) {
        value.forEach(function (v) {
            traverse(v, seen);
        });
    }
    else if (isPlainObject(value)) {
        for (var key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}

// implement
function computed(getterOrOptions) {
    var vm = getCurrentScopeVM();
    var getter;
    var setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    var computedSetter;
    var computedGetter;
    if (vm && !vm.$isServer) {
        var _a = getVueInternalClasses(), Watcher_1 = _a.Watcher, Dep_1 = _a.Dep;
        var watcher_1;
        computedGetter = function () {
            if (!watcher_1) {
                watcher_1 = new Watcher_1(vm, getter, noopFn, { lazy: true });
            }
            if (watcher_1.dirty) {
                watcher_1.evaluate();
            }
            if (Dep_1.target) {
                watcher_1.depend();
            }
            return watcher_1.value;
        };
        computedSetter = function (v) {
            if (!setter) {
                warn('Write operation failed: computed value is readonly.', vm);
                return;
            }
            if (setter) {
                setter(v);
            }
        };
    }
    else {
        // fallback
        var computedHost_1 = defineComponentInstance(getVueConstructor(), {
            computed: {
                $$state: {
                    get: getter,
                    set: setter,
                },
            },
        });
        vm && vm.$on('hook:destroyed', function () { return computedHost_1.$destroy(); });
        computedGetter = function () { return computedHost_1.$$state; };
        computedSetter = function (v) {
            if (!setter) {
                warn('Write operation failed: computed value is readonly.', vm);
                return;
            }
            computedHost_1.$$state = v;
        };
    }
    return createRef({
        get: computedGetter,
        set: computedSetter,
    }, !setter, true);
}

var NOT_FOUND = {};
function resolveInject(provideKey, vm) {
    var source = vm;
    while (source) {
        // @ts-ignore
        if (source._provided && hasOwn(source._provided, provideKey)) {
            //@ts-ignore
            return source._provided[provideKey];
        }
        source = source.$parent;
    }
    return NOT_FOUND;
}
function provide(key, value) {
    var _a;
    var vm = (_a = getCurrentInstanceForFn('provide')) === null || _a === void 0 ? void 0 : _a.proxy;
    if (!vm)
        return;
    if (!vm._provided) {
        var provideCache_1 = {};
        proxy(vm, '_provided', {
            get: function () { return provideCache_1; },
            set: function (v) { return Object.assign(provideCache_1, v); },
        });
    }
    vm._provided[key] = value;
}
function inject(key, defaultValue, treatDefaultAsFactory) {
    var _a;
    if (treatDefaultAsFactory === void 0) { treatDefaultAsFactory = false; }
    var vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
    if (!vm) {
        warn("inject() can only be used inside setup() or functional components.");
        return;
    }
    if (!key) {
        warn("injection \"".concat(String(key), "\" not found."), vm);
        return defaultValue;
    }
    var val = resolveInject(key, vm);
    if (val !== NOT_FOUND) {
        return val;
    }
    else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue)
            ? defaultValue()
            : defaultValue;
    }
    else {
        warn("Injection \"".concat(String(key), "\" not found."), vm);
    }
}

var EMPTY_OBJ = Object.freeze({})
    ;
var useCssModule = function (name) {
    var _a;
    if (name === void 0) { name = '$style'; }
    var instance = getCurrentInstance();
    if (!instance) {
        warn("useCssModule must be called inside setup()");
        return EMPTY_OBJ;
    }
    var mod = (_a = instance.proxy) === null || _a === void 0 ? void 0 : _a[name];
    if (!mod) {
        warn("Current instance does not have CSS module named \"".concat(name, "\"."));
        return EMPTY_OBJ;
    }
    return mod;
};
/**
 * @deprecated use `useCssModule` instead.
 */
var useCSSModule = useCssModule;

function createApp(rootComponent, rootProps) {
    if (rootProps === void 0) { rootProps = undefined; }
    var V = getVueConstructor();
    var mountedVM = undefined;
    var provide = {};
    var app = {
        config: V.config,
        use: V.use.bind(V),
        mixin: V.mixin.bind(V),
        component: V.component.bind(V),
        provide: function (key, value) {
            provide[key] = value;
            return this;
        },
        directive: function (name, dir) {
            if (dir) {
                V.directive(name, dir);
                return app;
            }
            else {
                return V.directive(name);
            }
        },
        mount: function (el, hydrating) {
            if (!mountedVM) {
                mountedVM = new V(__assign(__assign({ propsData: rootProps }, rootComponent), { provide: __assign(__assign({}, provide), rootComponent.provide) }));
                mountedVM.$mount(el, hydrating);
                return mountedVM;
            }
            else {
                {
                    warn("App has already been mounted.\n" +
                        "If you want to remount the same app, move your app creation logic " +
                        "into a factory function and create fresh app instances for each " +
                        "mount - e.g. `const createMyApp = () => createApp(App)`");
                }
                return mountedVM;
            }
        },
        unmount: function () {
            if (mountedVM) {
                mountedVM.$destroy();
                mountedVM = undefined;
            }
            else {
                warn("Cannot unmount an app that is not mounted.");
            }
        },
    };
    return app;
}

var nextTick = function nextTick() {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getVueConstructor()) === null || _a === void 0 ? void 0 : _a.nextTick.apply(this, args);
};

var fallbackCreateElement;
var createElement = function createElement() {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var instance = (this === null || this === void 0 ? void 0 : this.proxy) || ((_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
    if (!instance) {
        warn('`createElement()` has been called outside of render function.');
        if (!fallbackCreateElement) {
            fallbackCreateElement = defineComponentInstance(getVueConstructor()).$createElement;
        }
        return fallbackCreateElement.apply(fallbackCreateElement, args);
    }
    return instance.$createElement.apply(instance, args);
};

function useSlots() {
    return getContext().slots;
}
function useAttrs() {
    return getContext().attrs;
}
function getContext() {
    var i = getCurrentInstance();
    if (!i) {
        warn("useContext() called without active instance.");
    }
    return i.setupContext;
}

function set(vm, key, value) {
    var state = (vm.__composition_api_state__ =
        vm.__composition_api_state__ || {});
    state[key] = value;
}
function get(vm, key) {
    return (vm.__composition_api_state__ || {})[key];
}
var vmStateManager = {
    set: set,
    get: get,
};

function asVmProperty(vm, propName, propValue) {
    var props = vm.$options.props;
    if (!(propName in vm) && !(props && hasOwn(props, propName))) {
        if (isRef(propValue)) {
            proxy(vm, propName, {
                get: function () { return propValue.value; },
                set: function (val) {
                    propValue.value = val;
                },
            });
        }
        else {
            proxy(vm, propName, {
                get: function () {
                    if (isReactive(propValue)) {
                        propValue.__ob__.dep.depend();
                    }
                    return propValue;
                },
                set: function (val) {
                    propValue = val;
                },
            });
        }
        {
            // expose binding to Vue Devtool as a data property
            // delay this until state has been resolved to prevent repeated works
            vm.$nextTick(function () {
                if (Object.keys(vm._data).indexOf(propName) !== -1) {
                    return;
                }
                if (isRef(propValue)) {
                    proxy(vm._data, propName, {
                        get: function () { return propValue.value; },
                        set: function (val) {
                            propValue.value = val;
                        },
                    });
                }
                else {
                    proxy(vm._data, propName, {
                        get: function () { return propValue; },
                        set: function (val) {
                            propValue = val;
                        },
                    });
                }
            });
        }
    }
    else {
        if (props && hasOwn(props, propName)) {
            warn("The setup binding property \"".concat(propName, "\" is already declared as a prop."), vm);
        }
        else {
            warn("The setup binding property \"".concat(propName, "\" is already declared."), vm);
        }
    }
}
function updateTemplateRef(vm) {
    var rawBindings = vmStateManager.get(vm, 'rawBindings') || {};
    if (!rawBindings || !Object.keys(rawBindings).length)
        return;
    var refs = vm.$refs;
    var oldRefKeys = vmStateManager.get(vm, 'refs') || [];
    for (var index = 0; index < oldRefKeys.length; index++) {
        var key = oldRefKeys[index];
        var setupValue = rawBindings[key];
        if (!refs[key] && setupValue && isRef(setupValue)) {
            setupValue.value = null;
        }
    }
    var newKeys = Object.keys(refs);
    var validNewKeys = [];
    for (var index = 0; index < newKeys.length; index++) {
        var key = newKeys[index];
        var setupValue = rawBindings[key];
        if (refs[key] && setupValue && isRef(setupValue)) {
            setupValue.value = refs[key];
            validNewKeys.push(key);
        }
    }
    vmStateManager.set(vm, 'refs', validNewKeys);
}
function afterRender(vm) {
    var stack = [vm._vnode];
    var updated;
    while (stack.length) {
        var vnode = stack.pop();
        if (vnode) {
            if (vnode.context) {
                updateTemplateRef(vnode.context);
                updated = true;
            }
            if (vnode.children) {
                for (var i = 0; i < vnode.children.length; ++i) {
                    stack.push(vnode.children[i]);
                }
            }
        }
    }
    if (!updated) {
        updateTemplateRef(vm);
    }
}
function updateVmAttrs(vm, ctx) {
    var e_1, _a;
    if (!vm) {
        return;
    }
    var attrBindings = vmStateManager.get(vm, 'attrBindings');
    if (!attrBindings && !ctx) {
        // fix 840
        return;
    }
    if (!attrBindings) {
        var observedData = reactive({});
        attrBindings = { ctx: ctx, data: observedData };
        vmStateManager.set(vm, 'attrBindings', attrBindings);
        proxy(ctx, 'attrs', {
            get: function () {
                return attrBindings === null || attrBindings === void 0 ? void 0 : attrBindings.data;
            },
            set: function () {
                warn("Cannot assign to '$attrs' because it is a read-only property", vm);
            },
        });
    }
    var source = vm.$attrs;
    var _loop_1 = function (attr) {
        if (!hasOwn(attrBindings.data, attr)) {
            proxy(attrBindings.data, attr, {
                get: function () {
                    // to ensure it always return the latest value
                    return vm.$attrs[attr];
                },
            });
        }
    };
    try {
        for (var _b = __values(Object.keys(source)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var attr = _c.value;
            _loop_1(attr);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function resolveScopedSlots(vm, slotsProxy) {
    var parentVNode = vm.$options._parentVnode;
    if (!parentVNode)
        return;
    var prevSlots = vmStateManager.get(vm, 'slots') || [];
    var curSlots = resolveSlots(parentVNode.data.scopedSlots, vm.$slots);
    // remove staled slots
    for (var index = 0; index < prevSlots.length; index++) {
        var key = prevSlots[index];
        if (!curSlots[key]) {
            delete slotsProxy[key];
        }
    }
    // proxy fresh slots
    var slotNames = Object.keys(curSlots);
    for (var index = 0; index < slotNames.length; index++) {
        var key = slotNames[index];
        if (!slotsProxy[key]) {
            slotsProxy[key] = createSlotProxy(vm, key);
        }
    }
    vmStateManager.set(vm, 'slots', slotNames);
}
function activateCurrentInstance(instance, fn, onError) {
    var preVm = getCurrentInstance();
    setCurrentInstance(instance);
    try {
        return fn(instance);
    }
    catch (
    // FIXME: remove any
    err) {
        if (onError) {
            onError(err);
        }
        else {
            throw err;
        }
    }
    finally {
        setCurrentInstance(preVm);
    }
}

function mixin(Vue) {
    Vue.mixin({
        beforeCreate: functionApiInit,
        mounted: function () {
            afterRender(this);
        },
        beforeUpdate: function () {
            updateVmAttrs(this);
        },
        updated: function () {
            afterRender(this);
        },
    });
    /**
     * Vuex init hook, injected into each instances init hooks list.
     */
    function functionApiInit() {
        var vm = this;
        var $options = vm.$options;
        var setup = $options.setup, render = $options.render;
        if (render) {
            // keep currentInstance accessible for createElement
            $options.render = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return activateCurrentInstance(toVue3ComponentInstance(vm), function () {
                    return render.apply(_this, args);
                });
            };
        }
        if (!setup) {
            return;
        }
        if (!isFunction(setup)) {
            {
                warn('The "setup" option should be a function that returns a object in component definitions.', vm);
            }
            return;
        }
        var data = $options.data;
        // wrapper the data option, so we can invoke setup before data get resolved
        $options.data = function wrappedData() {
            initSetup(vm, vm.$props);
            return isFunction(data)
                ? data.call(vm, vm)
                : data || {};
        };
    }
    function initSetup(vm, props) {
        if (props === void 0) { props = {}; }
        var setup = vm.$options.setup;
        var ctx = createSetupContext(vm);
        var instance = toVue3ComponentInstance(vm);
        instance.setupContext = ctx;
        // fake reactive for `toRefs(props)`
        def(props, '__ob__', createObserver());
        // resolve scopedSlots and slots to functions
        resolveScopedSlots(vm, ctx.slots);
        var binding;
        activateCurrentInstance(instance, function () {
            // make props to be fake reactive, this is for `toRefs(props)`
            binding = setup(props, ctx);
        });
        if (!binding)
            return;
        if (isFunction(binding)) {
            // keep typescript happy with the binding type.
            var bindingFunc_1 = binding;
            // keep currentInstance accessible for createElement
            vm.$options.render = function () {
                resolveScopedSlots(vm, ctx.slots);
                return activateCurrentInstance(instance, function () { return bindingFunc_1(); });
            };
            return;
        }
        else if (isObject(binding)) {
            if (isReactive(binding)) {
                binding = toRefs(binding);
            }
            vmStateManager.set(vm, 'rawBindings', binding);
            var bindingObj_1 = binding;
            Object.keys(bindingObj_1).forEach(function (name) {
                var bindingValue = bindingObj_1[name];
                if (!isRef(bindingValue)) {
                    if (!isReactive(bindingValue)) {
                        if (isFunction(bindingValue)) {
                            var copy_1 = bindingValue;
                            bindingValue = bindingValue.bind(vm);
                            Object.keys(copy_1).forEach(function (ele) {
                                bindingValue[ele] = copy_1[ele];
                            });
                        }
                        else if (!isObject(bindingValue)) {
                            bindingValue = ref(bindingValue);
                        }
                        else if (hasReactiveArrayChild(bindingValue)) {
                            // creates a custom reactive properties without make the object explicitly reactive
                            // NOTE we should try to avoid this, better implementation needed
                            customReactive(bindingValue);
                        }
                    }
                    else if (isArray(bindingValue)) {
                        bindingValue = ref(bindingValue);
                    }
                }
                asVmProperty(vm, name, bindingValue);
            });
            return;
        }
        {
            assert(false, "\"setup\" must return a \"Object\" or a \"Function\", got \"".concat(Object.prototype.toString
                .call(binding)
                .slice(8, -1), "\""));
        }
    }
    function customReactive(target, seen) {
        if (seen === void 0) { seen = new Set(); }
        if (seen.has(target))
            return;
        if (!isPlainObject(target) ||
            isRef(target) ||
            isReactive(target) ||
            isRaw(target))
            return;
        var Vue = getVueConstructor();
        // @ts-expect-error https://github.com/vuejs/vue/pull/12132
        var defineReactive = Vue.util.defineReactive;
        Object.keys(target).forEach(function (k) {
            var val = target[k];
            defineReactive(target, k, val);
            if (val) {
                seen.add(val);
                customReactive(val, seen);
            }
            return;
        });
    }
    function hasReactiveArrayChild(target, visited) {
        if (visited === void 0) { visited = new Map(); }
        if (visited.has(target)) {
            return visited.get(target);
        }
        visited.set(target, false);
        if (isArray(target) && isReactive(target)) {
            visited.set(target, true);
            return true;
        }
        if (!isPlainObject(target) || isRaw(target) || isRef(target)) {
            return false;
        }
        return Object.keys(target).some(function (x) {
            return hasReactiveArrayChild(target[x], visited);
        });
    }
    function createSetupContext(vm) {
        var ctx = { slots: {} };
        var propsPlain = [
            'root',
            'parent',
            'refs',
            'listeners',
            'isServer',
            'ssrContext',
        ];
        var methodReturnVoid = ['emit'];
        propsPlain.forEach(function (key) {
            var srcKey = "$".concat(key);
            proxy(ctx, key, {
                get: function () { return vm[srcKey]; },
                set: function () {
                    warn("Cannot assign to '".concat(key, "' because it is a read-only property"), vm);
                },
            });
        });
        updateVmAttrs(vm, ctx);
        methodReturnVoid.forEach(function (key) {
            var srcKey = "$".concat(key);
            proxy(ctx, key, {
                get: function () {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var fn = vm[srcKey];
                        fn.apply(vm, args);
                    };
                },
            });
        });
        return ctx;
    }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(from, to) {
    if (!from)
        return to;
    if (!to)
        return from;
    var key;
    var toVal;
    var fromVal;
    var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__')
            continue;
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            to[key] = fromVal;
        }
        else if (toVal !== fromVal &&
            isPlainObject(toVal) &&
            !isRef(toVal) &&
            isPlainObject(fromVal) &&
            !isRef(fromVal)) {
            mergeData(fromVal, toVal);
        }
    }
    return to;
}
function install(Vue) {
    if (isVueRegistered(Vue)) {
        {
            warn('[vue-composition-api] already installed. Vue.use(VueCompositionAPI) should be called only once.');
        }
        return;
    }
    {
        if (Vue.version) {
            if (Vue.version[0] !== '2' || Vue.version[1] !== '.') {
                warn("[vue-composition-api] only works with Vue 2, v".concat(Vue.version, " found."));
            }
        }
        else {
            warn('[vue-composition-api] no Vue version found');
        }
    }
    Vue.config.optionMergeStrategies.setup = function (parent, child) {
        return function mergedSetupFn(props, context) {
            return mergeData(isFunction(parent) ? parent(props, context) || {} : undefined, isFunction(child) ? child(props, context) || {} : undefined);
        };
    };
    setVueConstructor(Vue);
    mixin(Vue);
}
var Plugin = {
    install: function (Vue) { return install(Vue); },
};

// implementation, close to no-op
function defineComponent(options) {
    return options;
}

function defineAsyncComponent(source) {
    if (isFunction(source)) {
        source = { loader: source };
    }
    var loader = source.loader, loadingComponent = source.loadingComponent, errorComponent = source.errorComponent, _a = source.delay, delay = _a === void 0 ? 200 : _a, timeout = source.timeout, // undefined = never times out
    _b = source.suspensible, // undefined = never times out
    suspensible = _b === void 0 ? false : _b, // in Vue 3 default is true
    userOnError = source.onError;
    if (suspensible) {
        warn("The suspensiblbe option for async components is not supported in Vue2. It is ignored.");
    }
    var pendingRequest = null;
    var retries = 0;
    var retry = function () {
        retries++;
        pendingRequest = null;
        return load();
    };
    var load = function () {
        var thisRequest;
        return (pendingRequest ||
            (thisRequest = pendingRequest =
                loader()
                    .catch(function (err) {
                    err = err instanceof Error ? err : new Error(String(err));
                    if (userOnError) {
                        return new Promise(function (resolve, reject) {
                            var userRetry = function () { return resolve(retry()); };
                            var userFail = function () { return reject(err); };
                            userOnError(err, userRetry, userFail, retries + 1);
                        });
                    }
                    else {
                        throw err;
                    }
                })
                    .then(function (comp) {
                    if (thisRequest !== pendingRequest && pendingRequest) {
                        return pendingRequest;
                    }
                    if (!comp) {
                        warn("Async component loader resolved to undefined. " +
                            "If you are using retry(), make sure to return its return value.");
                    }
                    // interop module default
                    if (comp &&
                        (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
                        comp = comp.default;
                    }
                    if (comp && !isObject(comp) && !isFunction(comp)) {
                        throw new Error("Invalid async component load result: ".concat(comp));
                    }
                    return comp;
                })));
    };
    return function () {
        var component = load();
        return {
            component: component,
            delay: delay,
            timeout: timeout,
            error: errorComponent,
            loading: loadingComponent,
        };
    };
}

var version = "1.7.0";
// auto install when using CDN
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}

exports.EffectScope = EffectScope;
exports.computed = computed;
exports.createApp = createApp;
exports.createLifeCycle = createLifeCycle;
exports.createRef = createRef;
exports.customRef = customRef;
exports["default"] = Plugin;
exports.defineAsyncComponent = defineAsyncComponent;
exports.defineComponent = defineComponent;
exports.del = del;
exports.effectScope = effectScope;
exports.getCurrentInstance = getCurrentInstance;
exports.getCurrentScope = getCurrentScope;
exports.h = createElement;
exports.inject = inject;
exports.isRaw = isRaw;
exports.isReactive = isReactive;
exports.isReadonly = isReadonly;
exports.isRef = isRef;
exports.markRaw = markRaw;
exports.nextTick = nextTick;
exports.onActivated = onActivated;
exports.onBeforeMount = onBeforeMount;
exports.onBeforeUnmount = onBeforeUnmount;
exports.onBeforeUpdate = onBeforeUpdate;
exports.onDeactivated = onDeactivated;
exports.onErrorCaptured = onErrorCaptured;
exports.onMounted = onMounted;
exports.onScopeDispose = onScopeDispose;
exports.onServerPrefetch = onServerPrefetch;
exports.onUnmounted = onUnmounted;
exports.onUpdated = onUpdated;
exports.provide = provide;
exports.proxyRefs = proxyRefs;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref;
exports.set = set$1;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
exports.shallowRef = shallowRef;
exports.toRaw = toRaw;
exports.toRef = toRef;
exports.toRefs = toRefs;
exports.triggerRef = triggerRef;
exports.unref = unref;
exports.useAttrs = useAttrs;
exports.useCSSModule = useCSSModule;
exports.useCssModule = useCssModule;
exports.useSlots = useSlots;
exports.version = version;
exports.warn = warn$1;
exports.watch = watch;
exports.watchEffect = watchEffect;
exports.watchPostEffect = watchPostEffect;
exports.watchSyncEffect = watchSyncEffect;


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 36 */
/*!*********************************************!*\
  !*** D:/项目/uni-app/quna-uni/store/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 37));
var _state = _interopRequireDefault(__webpack_require__(/*! ./state */ 38));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations */ 39));
_vue.default.use(_vuex.default);
var _default = new _vuex.default.Store({
  state: _state.default,
  //对state进行拆分，将与默认值相关的代码均放入state中
  // actions:{
  //     changeCity(ctx, city){
  //         // console.log(ctx,city);
  //         ctx.commit('changeCity', city)

  //     }
  // },
  mutations: _mutations.default
});
exports.default = _default;

/***/ }),
/* 37 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 38 */
/*!*********************************************!*\
  !*** D:/项目/uni-app/quna-uni/store/state.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultCity = '上海';
try {
  uni.getStorage({
    key: 'city',
    success: function success(res) {
      //console.log('成功读取city',res.data)
      defaultCity = res.data;
    }
  });
} catch (error) {
  console.log(error);
}
var _default = {
  city: defaultCity
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 39 */
/*!*************************************************!*\
  !*** D:/项目/uni-app/quna-uni/store/mutations.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  changeCity: function changeCity(state, city) {
    state.city = city;
    try {
      uni.setStorage({
        key: 'city',
        data: city
      });
    } catch (error) {
      console.log(error);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 40 */
/*!****************************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/node_modules/vue-lazyload/vue-lazyload.esm.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
/*!
 * Vue-Lazyload.js v1.3.3
 * (c) 2019 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
var _typeof = typeof Symbol === "function" && (0, _typeof3.default)(Symbol.iterator) === "symbol" ? function (obj) {
  return (0, _typeof3.default)(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : (0, _typeof3.default)(obj);
};
var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

// see http://jsperf.com/testing-value-is-primitive/7

var isPrimitive = function isPrimitive(value) {
  return value == null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
};

/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var assignSymbols = function assignSymbols(receiver, objects) {
  if (receiver === null || typeof receiver === 'undefined') {
    throw new TypeError('expected first argument to be an object.');
  }
  if (typeof objects === 'undefined' || typeof Symbol === 'undefined') {
    return receiver;
  }
  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return receiver;
  }
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var target = Object(receiver);
  var len = arguments.length,
    i = 0;
  while (++i < len) {
    var provider = Object(arguments[i]);
    var names = Object.getOwnPropertySymbols(provider);
    for (var j = 0; j < names.length; j++) {
      var key = names[j];
      if (isEnumerable.call(provider, key)) {
        target[key] = provider[key];
      }
    }
  }
  return target;
};
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);

  // primitivies
  if (type === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (type === 'string' || val instanceof String) {
    return 'string';
  }
  if (type === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (type === 'function' || val instanceof Function) {
    if (typeof val.constructor.name !== 'undefined' && val.constructor.name.slice(0, 9) === 'Generator') {
      return 'generatorfunction';
    }
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  type = toString.call(val);
  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  if (type === '[object Promise]') {
    return 'promise';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }
  if (type === '[object Map Iterator]') {
    return 'mapiterator';
  }
  if (type === '[object Set Iterator]') {
    return 'setiterator';
  }
  if (type === '[object String Iterator]') {
    return 'stringiterator';
  }
  if (type === '[object Array Iterator]') {
    return 'arrayiterator';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  return val.constructor && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
function assign(target /*, objects*/) {
  target = target || {};
  var len = arguments.length,
    i = 0;
  if (len === 1) {
    return target;
  }
  while (++i < len) {
    var val = arguments[i];
    if (isPrimitive(target)) {
      target = val;
    }
    if (isObject$1(val)) {
      extend(target, val);
    }
  }
  return target;
}

/**
 * Shallow extend
 */

function extend(target, obj) {
  assignSymbols(target, obj);
  for (var key in obj) {
    if (key !== '__proto__' && hasOwn(obj, key)) {
      var val = obj[key];
      if (isObject$1(val)) {
        if (kindOf(target[key]) === 'undefined' && kindOf(val) === 'function') {
          target[key] = val;
        }
        target[key] = assign(target[key] || {}, val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
}

/**
 * Returns true if the object is a plain object or a function.
 */

function isObject$1(obj) {
  return kindOf(obj) === 'object' || kindOf(obj) === 'function';
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Expose `assign`
 */

var assignDeep = assign;
var inBrowser = typeof window !== 'undefined';
var hasIntersectionObserver = checkIntersectionObserver();
function checkIntersectionObserver() {
  if (inBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get$$1() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return true;
  }
  return false;
}
var modeType = {
  event: 'event',
  observer: 'observer'

  // CustomEvent polyfill
};
var CustomEvent = function () {
  if (!inBrowser) return;
  if (typeof window.CustomEvent === 'function') return window.CustomEvent;
  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  return CustomEvent;
}();
function remove(arr, item) {
  if (!arr.length) return;
  var index = arr.indexOf(item);
  if (index > -1) return arr.splice(index, 1);
}
function some(arr, fn) {
  var has = false;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      has = true;
      break;
    }
  }
  return has;
}
function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return;
  var options = el.getAttribute('data-srcset');
  var result = [];
  var container = el.parentNode;
  var containerWidth = container.offsetWidth * scale;
  var spaceIndex = void 0;
  var tmpSrc = void 0;
  var tmpWidth = void 0;
  options = options.trim().split(',');
  options.map(function (item) {
    item = item.trim();
    spaceIndex = item.lastIndexOf(' ');
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10);
    }
    result.push([tmpWidth, tmpSrc]);
  });
  result.sort(function (a, b) {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf('.webp', b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf('.webp', a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  var bestSelectedSrc = '';
  var tmpOption = void 0;
  for (var i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    var next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }
  return bestSelectedSrc;
}
function find(arr, fn) {
  var item = void 0;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (fn(arr[i])) {
      item = arr[i];
      break;
    }
  }
  return item;
}
var getDPR = function getDPR() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return inBrowser ? window.devicePixelRatio || scale : scale;
};
function supportWebp() {
  if (!inBrowser) return false;
  var support = true;
  var d = document;
  try {
    var el = d.createElement('object');
    el.type = 'image/webp';
    el.style.visibility = 'hidden';
    el.innerHTML = '!';
    d.body.appendChild(el);
    support = !el.offsetWidth;
    d.body.removeChild(el);
  } catch (err) {
    support = false;
  }
  return support;
}
function throttle(action, delay) {
  var timeout = null;
  var lastRun = 0;
  return function () {
    if (timeout) {
      return;
    }
    var elapsed = Date.now() - lastRun;
    var context = this;
    var args = arguments;
    var runCallback = function runCallback() {
      lastRun = Date.now();
      timeout = false;
      action.apply(context, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}
function testSupportsPassive() {
  if (!inBrowser) return;
  var support = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get$$1() {
        support = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
  return support;
}
var supportsPassive = testSupportsPassive();
var _ = {
  on: function on(el, type, func) {
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (supportsPassive) {
      el.addEventListener(type, func, {
        capture: capture,
        passive: true
      });
    } else {
      el.addEventListener(type, func, capture);
    }
  },
  off: function off(el, type, func) {
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    el.removeEventListener(type, func, capture);
  }
};
var loadImageAsync = function loadImageAsync(item, resolve, reject) {
  var image = new Image();
  if (!item || !item.src) {
    var err = new Error('image src is required');
    return reject(err);
  }
  image.src = item.src;
  image.onload = function () {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    });
  };
  image.onerror = function (e) {
    reject(e);
  };
};
var style = function style(el, prop) {
  return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
};
var overflow = function overflow(el) {
  return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');
};
var scrollParent = function scrollParent(el) {
  if (!inBrowser) return;
  if (!(el instanceof HTMLElement)) {
    return window;
  }
  var parent = el;
  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }
    if (!parent.parentNode) {
      break;
    }
    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return window;
};
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}
function ObjectKeys(obj) {
  if (!(obj instanceof Object)) return [];
  if (Object.keys) {
    return Object.keys(obj);
  } else {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }
}
function ArrayFrom(arrLike) {
  var len = arrLike.length;
  var list = [];
  for (var i = 0; i < len; i++) {
    list.push(arrLike[i]);
  }
  return list;
}
function noop() {}
var ImageCache = function () {
  function ImageCache(_ref) {
    var max = _ref.max;
    classCallCheck(this, ImageCache);
    this.options = {
      max: max || 100
    };
    this._caches = [];
  }
  createClass(ImageCache, [{
    key: 'has',
    value: function has(key) {
      return this._caches.indexOf(key) > -1;
    }
  }, {
    key: 'add',
    value: function add(key) {
      if (this.has(key)) return;
      this._caches.push(key);
      if (this._caches.length > this.options.max) {
        this.free();
      }
    }
  }, {
    key: 'free',
    value: function free() {
      this._caches.shift();
    }
  }]);
  return ImageCache;
}();

// el: {
//     state,
//     src,
//     error,
//     loading
// }

var ReactiveListener = function () {
  function ReactiveListener(_ref) {
    var el = _ref.el,
      src = _ref.src,
      error = _ref.error,
      loading = _ref.loading,
      bindType = _ref.bindType,
      $parent = _ref.$parent,
      options = _ref.options,
      elRenderer = _ref.elRenderer,
      imageCache = _ref.imageCache;
    classCallCheck(this, ReactiveListener);
    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.options = options;
    this.rect = null;
    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this._imageCache = imageCache;
    this.performanceData = {
      init: Date.now(),
      loadStart: 0,
      loadEnd: 0
    };
    this.filter();
    this.initState();
    this.render('loading', false);
  }

  /*
   * init listener state
   * @return
   */

  createClass(ReactiveListener, [{
    key: 'initState',
    value: function initState() {
      if ('dataset' in this.el) {
        this.el.dataset.src = this.src;
      } else {
        this.el.setAttribute('data-src', this.src);
      }
      this.state = {
        loading: false,
        error: false,
        loaded: false,
        rendered: false
      };
    }

    /*
     * record performance
     * @return
     */
  }, {
    key: 'record',
    value: function record(event) {
      this.performanceData[event] = Date.now();
    }

    /*
     * update image listener data
     * @param  {String} image uri
     * @param  {String} loading image uri
     * @param  {String} error image uri
     * @return
     */
  }, {
    key: 'update',
    value: function update(_ref2) {
      var src = _ref2.src,
        loading = _ref2.loading,
        error = _ref2.error;
      var oldSrc = this.src;
      this.src = src;
      this.loading = loading;
      this.error = error;
      this.filter();
      if (oldSrc !== this.src) {
        this.attempt = 0;
        this.initState();
      }
    }

    /*
     * get el node rect
     * @return
     */
  }, {
    key: 'getRect',
    value: function getRect() {
      this.rect = this.el.getBoundingClientRect();
    }

    /*
     *  check el is in view
     * @return {Boolean} el is in view
     */
  }, {
    key: 'checkInView',
    value: function checkInView() {
      this.getRect();
      return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
    }

    /*
     * listener filter
     */
  }, {
    key: 'filter',
    value: function filter() {
      var _this = this;
      ObjectKeys(this.options.filter).map(function (key) {
        _this.options.filter[key](_this, _this.options);
      });
    }

    /*
     * render loading first
     * @params cb:Function
     * @return
     */
  }, {
    key: 'renderLoading',
    value: function renderLoading(cb) {
      var _this2 = this;
      this.state.loading = true;
      loadImageAsync({
        src: this.loading
      }, function (data) {
        _this2.render('loading', false);
        _this2.state.loading = false;
        cb();
      }, function () {
        // handler `loading image` load failed
        cb();
        _this2.state.loading = false;
        if (!_this2.options.silent) console.warn('VueLazyload log: load failed with loading image(' + _this2.loading + ')');
      });
    }

    /*
     * try load image and  render it
     * @return
     */
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;
      var onFinish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
      if (this.attempt > this.options.attempt - 1 && this.state.error) {
        if (!this.options.silent) console.log('VueLazyload log: ' + this.src + ' tried too more than ' + this.options.attempt + ' times');
        onFinish();
        return;
      }
      if (this.state.rendered && this.state.loaded) return;
      if (this._imageCache.has(this.src)) {
        this.state.loaded = true;
        this.render('loaded', true);
        this.state.rendered = true;
        return onFinish();
      }
      this.renderLoading(function () {
        _this3.attempt++;
        _this3.options.adapter['beforeLoad'] && _this3.options.adapter['beforeLoad'](_this3, _this3.options);
        _this3.record('loadStart');
        loadImageAsync({
          src: _this3.src
        }, function (data) {
          _this3.naturalHeight = data.naturalHeight;
          _this3.naturalWidth = data.naturalWidth;
          _this3.state.loaded = true;
          _this3.state.error = false;
          _this3.record('loadEnd');
          _this3.render('loaded', false);
          _this3.state.rendered = true;
          _this3._imageCache.add(_this3.src);
          onFinish();
        }, function (err) {
          !_this3.options.silent && console.error(err);
          _this3.state.error = true;
          _this3.state.loaded = false;
          _this3.render('error', false);
        });
      });
    }

    /*
     * render image
     * @param  {String} state to render // ['loading', 'src', 'error']
     * @param  {String} is form cache
     * @return
     */
  }, {
    key: 'render',
    value: function render(state, cache) {
      this.elRenderer(this, state, cache);
    }

    /*
     * output performance data
     * @return {Object} performance data
     */
  }, {
    key: 'performance',
    value: function performance() {
      var state = 'loading';
      var time = 0;
      if (this.state.loaded) {
        state = 'loaded';
        time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000;
      }
      if (this.state.error) state = 'error';
      return {
        src: this.src,
        state: state,
        time: time
      };
    }

    /*
     * $destroy
     * @return
     */
  }, {
    key: '$destroy',
    value: function $destroy() {
      this.el = null;
      this.src = null;
      this.error = null;
      this.loading = null;
      this.bindType = null;
      this.attempt = 0;
    }
  }]);
  return ReactiveListener;
}();
var DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: '0px',
  threshold: 0
};
var Lazy = function Lazy(Vue) {
  return function () {
    function Lazy(_ref) {
      var preLoad = _ref.preLoad,
        error = _ref.error,
        throttleWait = _ref.throttleWait,
        preLoadTop = _ref.preLoadTop,
        dispatchEvent = _ref.dispatchEvent,
        loading = _ref.loading,
        attempt = _ref.attempt,
        _ref$silent = _ref.silent,
        silent = _ref$silent === undefined ? true : _ref$silent,
        scale = _ref.scale,
        listenEvents = _ref.listenEvents,
        hasbind = _ref.hasbind,
        filter = _ref.filter,
        adapter = _ref.adapter,
        observer = _ref.observer,
        observerOptions = _ref.observerOptions;
      classCallCheck(this, Lazy);
      this.version = '1.3.3';
      this.mode = modeType.event;
      this.ListenerQueue = [];
      this.TargetIndex = 0;
      this.TargetQueue = [];
      this.options = {
        silent: silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        hasbind: false,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
      };
      this._initEvent();
      this._imageCache = new ImageCache({
        max: 200
      });
      this.lazyLoadHandler = throttle(this._lazyLoadHandler.bind(this), this.options.throttleWait);
      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }

    /**
     * update config
     * @param  {Object} config params
     * @return
     */

    createClass(Lazy, [{
      key: 'config',
      value: function config() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        assignDeep(this.options, options);
      }

      /**
       * output listener's load performance
       * @return {Array}
       */
    }, {
      key: 'performance',
      value: function performance() {
        var list = [];
        this.ListenerQueue.map(function (item) {
          list.push(item.performance());
        });
        return list;
      }

      /*
       * add lazy component to queue
       * @param  {Vue} vm lazy component instance
       * @return
       */
    }, {
      key: 'addLazyBox',
      value: function addLazyBox(vm) {
        this.ListenerQueue.push(vm);
        if (inBrowser) {
          this._addListenerTarget(window);
          this._observer && this._observer.observe(vm.el);
          if (vm.$el && vm.$el.parentNode) {
            this._addListenerTarget(vm.$el.parentNode);
          }
        }
      }

      /*
       * add image listener to queue
       * @param  {DOM} el
       * @param  {object} binding vue directive binding
       * @param  {vnode} vnode vue directive vnode
       * @return
       */
    }, {
      key: 'add',
      value: function add(el, binding, vnode) {
        var _this = this;
        if (some(this.ListenerQueue, function (item) {
          return item.el === el;
        })) {
          this.update(el, binding);
          return Vue.nextTick(this.lazyLoadHandler);
        }
        var _valueFormatter2 = this._valueFormatter(binding.value),
          src = _valueFormatter2.src,
          loading = _valueFormatter2.loading,
          error = _valueFormatter2.error;
        Vue.nextTick(function () {
          src = getBestSelectionFromSrcset(el, _this.options.scale) || src;
          _this._observer && _this._observer.observe(el);
          var container = Object.keys(binding.modifiers)[0];
          var $parent = void 0;
          if (container) {
            $parent = vnode.context.$refs[container];
            // if there is container passed in, try ref first, then fallback to getElementById to support the original usage
            $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
          }
          if (!$parent) {
            $parent = scrollParent(el);
          }
          var newListener = new ReactiveListener({
            bindType: binding.arg,
            $parent: $parent,
            el: el,
            loading: loading,
            error: error,
            src: src,
            elRenderer: _this._elRenderer.bind(_this),
            options: _this.options,
            imageCache: _this._imageCache
          });
          _this.ListenerQueue.push(newListener);
          if (inBrowser) {
            _this._addListenerTarget(window);
            _this._addListenerTarget($parent);
          }
          _this.lazyLoadHandler();
          Vue.nextTick(function () {
            return _this.lazyLoadHandler();
          });
        });
      }

      /**
      * update image src
      * @param  {DOM} el
      * @param  {object} vue directive binding
      * @return
      */
    }, {
      key: 'update',
      value: function update(el, binding, vnode) {
        var _this2 = this;
        var _valueFormatter3 = this._valueFormatter(binding.value),
          src = _valueFormatter3.src,
          loading = _valueFormatter3.loading,
          error = _valueFormatter3.error;
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        var exist = find(this.ListenerQueue, function (item) {
          return item.el === el;
        });
        if (!exist) {
          this.add(el, binding, vnode);
        } else {
          exist.update({
            src: src,
            loading: loading,
            error: error
          });
        }
        if (this._observer) {
          this._observer.unobserve(el);
          this._observer.observe(el);
        }
        this.lazyLoadHandler();
        Vue.nextTick(function () {
          return _this2.lazyLoadHandler();
        });
      }

      /**
      * remove listener form list
      * @param  {DOM} el
      * @return
      */
    }, {
      key: 'remove',
      value: function remove$$1(el) {
        if (!el) return;
        this._observer && this._observer.unobserve(el);
        var existItem = find(this.ListenerQueue, function (item) {
          return item.el === el;
        });
        if (existItem) {
          this._removeListenerTarget(existItem.$parent);
          this._removeListenerTarget(window);
          remove(this.ListenerQueue, existItem);
          existItem.$destroy();
        }
      }

      /*
       * remove lazy components form list
       * @param  {Vue} vm Vue instance
       * @return
       */
    }, {
      key: 'removeComponent',
      value: function removeComponent(vm) {
        if (!vm) return;
        remove(this.ListenerQueue, vm);
        this._observer && this._observer.unobserve(vm.el);
        if (vm.$parent && vm.$el.parentNode) {
          this._removeListenerTarget(vm.$el.parentNode);
        }
        this._removeListenerTarget(window);
      }
    }, {
      key: 'setMode',
      value: function setMode(mode) {
        var _this3 = this;
        if (!hasIntersectionObserver && mode === modeType.observer) {
          mode = modeType.event;
        }
        this.mode = mode; // event or observer

        if (mode === modeType.event) {
          if (this._observer) {
            this.ListenerQueue.forEach(function (listener) {
              _this3._observer.unobserve(listener.el);
            });
            this._observer = null;
          }
          this.TargetQueue.forEach(function (target) {
            _this3._initListen(target.el, true);
          });
        } else {
          this.TargetQueue.forEach(function (target) {
            _this3._initListen(target.el, false);
          });
          this._initIntersectionObserver();
        }
      }

      /*
      *** Private functions ***
      */

      /*
       * add listener target
       * @param  {DOM} el listener target
       * @return
       */
    }, {
      key: '_addListenerTarget',
      value: function _addListenerTarget(el) {
        if (!el) return;
        var target = find(this.TargetQueue, function (target) {
          return target.el === el;
        });
        if (!target) {
          target = {
            el: el,
            id: ++this.TargetIndex,
            childrenCount: 1,
            listened: true
          };
          this.mode === modeType.event && this._initListen(target.el, true);
          this.TargetQueue.push(target);
        } else {
          target.childrenCount++;
        }
        return this.TargetIndex;
      }

      /*
       * remove listener target or reduce target childrenCount
       * @param  {DOM} el or window
       * @return
       */
    }, {
      key: '_removeListenerTarget',
      value: function _removeListenerTarget(el) {
        var _this4 = this;
        this.TargetQueue.forEach(function (target, index) {
          if (target.el === el) {
            target.childrenCount--;
            if (!target.childrenCount) {
              _this4._initListen(target.el, false);
              _this4.TargetQueue.splice(index, 1);
              target = null;
            }
          }
        });
      }

      /*
       * add or remove eventlistener
       * @param  {DOM} el DOM or Window
       * @param  {boolean} start flag
       * @return
       */
    }, {
      key: '_initListen',
      value: function _initListen(el, start) {
        var _this5 = this;
        this.options.ListenEvents.forEach(function (evt) {
          return _[start ? 'on' : 'off'](el, evt, _this5.lazyLoadHandler);
        });
      }
    }, {
      key: '_initEvent',
      value: function _initEvent() {
        var _this6 = this;
        this.Event = {
          listeners: {
            loading: [],
            loaded: [],
            error: []
          }
        };
        this.$on = function (event, func) {
          if (!_this6.Event.listeners[event]) _this6.Event.listeners[event] = [];
          _this6.Event.listeners[event].push(func);
        };
        this.$once = function (event, func) {
          var vm = _this6;
          function on() {
            vm.$off(event, on);
            func.apply(vm, arguments);
          }
          _this6.$on(event, on);
        };
        this.$off = function (event, func) {
          if (!func) {
            if (!_this6.Event.listeners[event]) return;
            _this6.Event.listeners[event].length = 0;
            return;
          }
          remove(_this6.Event.listeners[event], func);
        };
        this.$emit = function (event, context, inCache) {
          if (!_this6.Event.listeners[event]) return;
          _this6.Event.listeners[event].forEach(function (func) {
            return func(context, inCache);
          });
        };
      }

      /**
       * find nodes which in viewport and trigger load
       * @return
       */
    }, {
      key: '_lazyLoadHandler',
      value: function _lazyLoadHandler() {
        var _this7 = this;
        var freeList = [];
        this.ListenerQueue.forEach(function (listener, index) {
          if (!listener.el || !listener.el.parentNode) {
            freeList.push(listener);
          }
          var catIn = listener.checkInView();
          if (!catIn) return;
          listener.load();
        });
        freeList.forEach(function (item) {
          remove(_this7.ListenerQueue, item);
          item.$destroy();
        });
      }
      /**
      * init IntersectionObserver
      * set mode to observer
      * @return
      */
    }, {
      key: '_initIntersectionObserver',
      value: function _initIntersectionObserver() {
        var _this8 = this;
        if (!hasIntersectionObserver) return;
        this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions);
        if (this.ListenerQueue.length) {
          this.ListenerQueue.forEach(function (listener) {
            _this8._observer.observe(listener.el);
          });
        }
      }

      /**
      * init IntersectionObserver
      * @return
      */
    }, {
      key: '_observerHandler',
      value: function _observerHandler(entries, observer) {
        var _this9 = this;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            _this9.ListenerQueue.forEach(function (listener) {
              if (listener.el === entry.target) {
                if (listener.state.loaded) return _this9._observer.unobserve(listener.el);
                listener.load();
              }
            });
          }
        });
      }

      /**
      * set element attribute with image'url and state
      * @param  {object} lazyload listener object
      * @param  {string} state will be rendered
      * @param  {bool} inCache  is rendered from cache
      * @return
      */
    }, {
      key: '_elRenderer',
      value: function _elRenderer(listener, state, cache) {
        if (!listener.el) return;
        var el = listener.el,
          bindType = listener.bindType;
        var src = void 0;
        switch (state) {
          case 'loading':
            src = listener.loading;
            break;
          case 'error':
            src = listener.error;
            break;
          default:
            src = listener.src;
            break;
        }
        if (bindType) {
          el.style[bindType] = 'url("' + src + '")';
        } else if (el.getAttribute('src') !== src) {
          el.setAttribute('src', src);
        }
        el.setAttribute('lazy', state);
        this.$emit(state, listener, cache);
        this.options.adapter[state] && this.options.adapter[state](listener, this.options);
        if (this.options.dispatchEvent) {
          var event = new CustomEvent(state, {
            detail: listener
          });
          el.dispatchEvent(event);
        }
      }

      /**
      * generate loading loaded error image url
      * @param {string} image's src
      * @return {object} image's loading, loaded, error url
      */
    }, {
      key: '_valueFormatter',
      value: function _valueFormatter(value) {
        var src = value;
        var loading = this.options.loading;
        var error = this.options.error;

        // value is object
        if (isObject(value)) {
          if (!value.src && !this.options.silent) console.error('Vue Lazyload warning: miss src with ' + value);
          src = value.src;
          loading = value.loading || this.options.loading;
          error = value.error || this.options.error;
        }
        return {
          src: src,
          loading: loading,
          error: error
        };
      }
    }]);
    return Lazy;
  }();
};
var LazyComponent = function LazyComponent(lazy) {
  return {
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },
    render: function render(h) {
      if (this.show === false) {
        return h(this.tag);
      }
      return h(this.tag, null, this.$slots.default);
    },
    data: function data() {
      return {
        el: null,
        state: {
          loaded: false
        },
        rect: {},
        show: false
      };
    },
    mounted: function mounted() {
      this.el = this.$el;
      lazy.addLazyBox(this);
      lazy.lazyLoadHandler();
    },
    beforeDestroy: function beforeDestroy() {
      lazy.removeComponent(this);
    },
    methods: {
      getRect: function getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView: function checkInView() {
        this.getRect();
        return inBrowser && this.rect.top < window.innerHeight * lazy.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazy.options.preLoad && this.rect.right > 0;
      },
      load: function load() {
        this.show = true;
        this.state.loaded = true;
        this.$emit('show', this);
      },
      destroy: function destroy() {
        return this.$destroy;
      }
    }
  };
};
var LazyContainerMananger = function () {
  function LazyContainerMananger(_ref) {
    var lazy = _ref.lazy;
    classCallCheck(this, LazyContainerMananger);
    this.lazy = lazy;
    lazy.lazyContainerMananger = this;
    this._queue = [];
  }
  createClass(LazyContainerMananger, [{
    key: 'bind',
    value: function bind(el, binding, vnode) {
      var container = new LazyContainer$1({
        el: el,
        binding: binding,
        vnode: vnode,
        lazy: this.lazy
      });
      this._queue.push(container);
    }
  }, {
    key: 'update',
    value: function update(el, binding, vnode) {
      var container = find(this._queue, function (item) {
        return item.el === el;
      });
      if (!container) return;
      container.update({
        el: el,
        binding: binding,
        vnode: vnode
      });
    }
  }, {
    key: 'unbind',
    value: function unbind(el, binding, vnode) {
      var container = find(this._queue, function (item) {
        return item.el === el;
      });
      if (!container) return;
      container.clear();
      remove(this._queue, container);
    }
  }]);
  return LazyContainerMananger;
}();
var defaultOptions = {
  selector: 'img'
};
var LazyContainer$1 = function () {
  function LazyContainer(_ref2) {
    var el = _ref2.el,
      binding = _ref2.binding,
      vnode = _ref2.vnode,
      lazy = _ref2.lazy;
    classCallCheck(this, LazyContainer);
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this._queue = [];
    this.update({
      el: el,
      binding: binding
    });
  }
  createClass(LazyContainer, [{
    key: 'update',
    value: function update(_ref3) {
      var _this = this;
      var el = _ref3.el,
        binding = _ref3.binding;
      this.el = el;
      this.options = assignDeep({}, defaultOptions, binding.value);
      var imgs = this.getImgs();
      imgs.forEach(function (el) {
        _this.lazy.add(el, assignDeep({}, _this.binding, {
          value: {
            src: 'dataset' in el ? el.dataset.src : el.getAttribute('data-src'),
            error: ('dataset' in el ? el.dataset.error : el.getAttribute('data-error')) || _this.options.error,
            loading: ('dataset' in el ? el.dataset.loading : el.getAttribute('data-loading')) || _this.options.loading
          }
        }), _this.vnode);
      });
    }
  }, {
    key: 'getImgs',
    value: function getImgs() {
      return ArrayFrom(this.el.querySelectorAll(this.options.selector));
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;
      var imgs = this.getImgs();
      imgs.forEach(function (el) {
        return _this2.lazy.remove(el);
      });
      this.vnode = null;
      this.binding = null;
      this.lazy = null;
    }
  }]);
  return LazyContainer;
}();
var LazyImage = function LazyImage(lazyManager) {
  return {
    props: {
      src: [String, Object],
      tag: {
        type: String,
        default: 'img'
      }
    },
    render: function render(h) {
      return h(this.tag, {
        attrs: {
          src: this.renderSrc
        }
      }, this.$slots.default);
    },
    data: function data() {
      return {
        el: null,
        options: {
          src: '',
          error: '',
          loading: '',
          attempt: lazyManager.options.attempt
        },
        state: {
          loaded: false,
          error: false,
          attempt: 0
        },
        rect: {},
        renderSrc: ''
      };
    },
    watch: {
      src: function src() {
        this.init();
        lazyManager.addLazyBox(this);
        lazyManager.lazyLoadHandler();
      }
    },
    created: function created() {
      this.init();
      this.renderSrc = this.options.loading;
    },
    mounted: function mounted() {
      this.el = this.$el;
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    },
    beforeDestroy: function beforeDestroy() {
      lazyManager.removeComponent(this);
    },
    methods: {
      init: function init() {
        var _lazyManager$_valueFo = lazyManager._valueFormatter(this.src),
          src = _lazyManager$_valueFo.src,
          loading = _lazyManager$_valueFo.loading,
          error = _lazyManager$_valueFo.error;
        this.state.loaded = false;
        this.options.src = src;
        this.options.error = error;
        this.options.loading = loading;
        this.renderSrc = this.options.loading;
      },
      getRect: function getRect() {
        this.rect = this.$el.getBoundingClientRect();
      },
      checkInView: function checkInView() {
        this.getRect();
        return inBrowser && this.rect.top < window.innerHeight * lazyManager.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * lazyManager.options.preLoad && this.rect.right > 0;
      },
      load: function load() {
        var _this = this;
        var onFinish = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
        if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
          if (!lazyManager.options.silent) console.log('VueLazyload log: ' + this.options.src + ' tried too more than ' + this.options.attempt + ' times');
          onFinish();
          return;
        }
        var src = this.options.src;
        loadImageAsync({
          src: src
        }, function (_ref) {
          var src = _ref.src;
          _this.renderSrc = src;
          _this.state.loaded = true;
        }, function (e) {
          _this.state.attempt++;
          _this.renderSrc = _this.options.error;
          _this.state.error = true;
        });
      }
    }
  };
};
var index = {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options  lazyload options
  */
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var LazyClass = Lazy(Vue);
    var lazy = new LazyClass(options);
    var lazyContainer = new LazyContainerMananger({
      lazy: lazy
    });
    var isVue2 = Vue.version.split('.')[0] === '2';
    Vue.prototype.$Lazyload = lazy;
    if (options.lazyComponent) {
      Vue.component('lazy-component', LazyComponent(lazy));
    }
    if (options.lazyImage) {
      Vue.component('lazy-image', LazyImage(lazy));
    }
    if (isVue2) {
      Vue.directive('lazy', {
        bind: lazy.add.bind(lazy),
        update: lazy.update.bind(lazy),
        componentUpdated: lazy.lazyLoadHandler.bind(lazy),
        unbind: lazy.remove.bind(lazy)
      });
      Vue.directive('lazy-container', {
        bind: lazyContainer.bind.bind(lazyContainer),
        componentUpdated: lazyContainer.update.bind(lazyContainer),
        unbind: lazyContainer.unbind.bind(lazyContainer)
      });
    } else {
      Vue.directive('lazy', {
        bind: lazy.lazyLoadHandler.bind(lazy),
        update: function update(newValue, oldValue) {
          assignDeep(this.vm.$refs, this.vm.$els);
          lazy.add(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: newValue,
            oldValue: oldValue
          }, {
            context: this.vm
          });
        },
        unbind: function unbind() {
          lazy.remove(this.el);
        }
      });
      Vue.directive('lazy-container', {
        update: function update(newValue, oldValue) {
          lazyContainer.update(this.el, {
            modifiers: this.modifiers || {},
            arg: this.arg,
            value: newValue,
            oldValue: oldValue
          }, {
            context: this.vm
          });
        },
        unbind: function unbind() {
          lazyContainer.unbind(this.el);
        }
      });
    }
  }
};
var _default = index;
exports.default = _default;

/***/ }),
/* 41 */
/*!******************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/assets/styles/iconfont/iconfont.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 42 */
/*!******************************************************!*\
  !*** D:/项目/uni-app/quna-uni/assets/styles/reset.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 43 */
/*!*************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/assets/lazy-load-img/error.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/lazy-load-img/error.png";

/***/ }),
/* 44 */
/*!***************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/assets/lazy-load-img/loading.gif ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhAAQABKIFAKqqqoiIiO7u7szMzGZmZgAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAAFACwAAAAAAAQABAAD/1i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsf+jx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+/////AAYo4IAEFmjggQgmqOCCDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkER+R8CRSBbpG5JMNunkkUrO9uSUVEIZpWpVZqnllaVp6aWXXIL25ZhZhskZmWiWaaZlabap5pqQuSlnlXA+NuedVNa5GJ58PqknYn0G2uSfhQlqaJKEBnboogQk+hejjDrKF6SQSpoXpZRaahemmGo6F6ecehoXqJ2K6hapoZrKFqqlqpoWq6m6ahasoMo6K62t2hoWrrXquiuvufrKFbC9CjssscEaixWy/8kqWxWzsTprFbTNShsVtZlaOy22kWpLFbfZenstuN2KCxW55ZrrFLqLqnsuu4a6+xS88crLFL2H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TeowkapUpbavqU1VH1Sjer6pUjV8VnUqVrOaVPJxVavb+2pXvSdWo261rEElK1qFqta1+rStbtUpXONq07nStaZhvatcsafXvVavrznNK2BjatfBmrSwhhUpYhPr0bMytqSOfWxIIyvZjlK2shm9LGYlWtXNarSznrUoaEMb0aeStrRSPa1DTavahM6vta5lKmwP+trZLhSotn0oTnM70d3ydp4s/a08gyvcjyKwuOyMIHLRCdLl/660uc7lZgejK12MUteaEL1uPhmq3Z8itLvXJCh4jxrE8Q70iOYNQD21K0bqrrO45cztHFWbx8pC063AzK9+98vf/vr3vwAOsIAHTOACG/jACE6wghfM4AY7+MEQjrCEJ0zhClv4whjOsIY3zOEOe/jDIA6xiEdM4hKb+MQoTrGKV8ziFrv4xTCOsYxnTOMa2/jGOM6xjne8YwBgGABADrKQhyxkBhP5yEgucoGTzOQm+/i/To6yk/cr5So3Ob9WzjKTe6nlLm8Zl14O85dpKeYyI5nMZk7zkGWp5jYruZVujnOQ4SznOj8ZlXbOcyrzrGdT8pnPpfzzn0cpaEGHsv/QhQYlohPdyUUjutGOZnQmI73oSVO60pe8tKMtqelIV7LTnp4kqEMNyVFTOpKmPvUjU61qRrL60o18NawXKetZI7LWmk4krnN9yF3zupC+/vUggy3sQBK72H88NrL7qOxl77HZzsYjtDsNyGlH247WvjYds61tOXK723D8NrjdKO5xs7Hc5lYjutNdxnWzW4zutvW2493qOdJb3t6+N6nzre9N27vf+w43wP0dx4EHvI0GP/i5E45pgTNc0iMZgMQnTnGJE+PhDadIxTfOcYrrAuOPfkjHR07yAdAC5CEnSMlXXnJZoBzi9mC5zFvOipfDnB0zzznNT2FzQ8ND50D/37koej7ocwT96EIHBdEBLQ6kO33kPF+6ncPx9KpzPOpSlzM3rM71ipsi61OXRtfH7vVQgF3rziC72ic+9LO7uRlrj7vJze72NiND7nH/et3VTAy8573tezfzL/wud70Hvsy6IDzeDX94L+dC8X5nfOO1TAvIE17yk69y5S2/eMxnPsqy4PzlPf/5MbNC9JHHeulBf3rUp570qz9y611feFTEnvWmoP3oVX972Z9C96/nfe/XLArg7174wwdy7o3f+Zonn/ihYH7znf/8OYNC+sG3ffWVf33s194V27+zJrz/ffBvfxPkn34rzj/+9P99FtVHv/vXnovny3/+ZP/4//Dvj/+u+2L/7dd//vd/txeAAjiA+rd6BniAVjcMsbeADPh0F6eAlBCBCPgLFDgJFsh1yfB5ELiBQdcMmfeBIKhzzjB5JFiCMycNjZeCKshy03B4LviCSdeBezeDNAh113CDmZCDIYgNdYeDPrhx3XB2/DeEMFiEWXeESFiDMSh1TNiEOhgOS9d9Urhy50B0VniFJLcOPbeFXNhx7GBzYBiGRDiGIBd9ZjiFXohxariGVxcPD1d8cBiHcphwdFiHZVcPBrd8euhx+jBwfviHFrcP/fZ7hMh2/6BviJiIc7eI8YYKjliIAOFus5eICYFurTCJj0gQ4uYKnOgQ3BZ6k//4ENlGio44EdM2C6FIEcq2eamIEcH2eKWYEbuWeLVoi7LmC63YEa82eLnoEaPWd8EoEu/2hpjYEgRHjLGojD4Hd8XojGgndtFYE2lGddXYE11mdNnYFeJXD734SOHoSOPYSOXISOe4SOmoSOuYSO2ISO94SPFoSPNYSPVISPc4SPkoSPsYSP0ISP/4RwHpRwPZRwXJRwe5RwmpRwuZRw2JRw95RxFpRxNZRxVJRxc5RxkpRxsZRx0JRx/5RiHpRiPZRiXJRie5RimpRiuJRi1ZRi8pRjH5RTPJRTWZRTdpRTk5RTsJRT3ZRD+pREEplMkoSc0YSUcJSUkpjkWJlE1q6ZR6aEmEKJV/SJVRaZVriElXiZVmmElwqElfCZZhyEldSZZX+ElSCEppqZZDKEptOUo+WEo0eEoqmEoguEoW2EoM+EoCGEv4N0vuZ0vYl0vMx0u0B0yct1+Q91/vJ2AcqGBHZ2GAqEsJAAAh+QQFCAAFACz6APoAZgJmAgAD/1i63P4wykmrvTjrzbv/YCiOZGlagnCubOu+cCzPdG3fOJvufN/nwKBwSCwaj8jkycds8pTQqHRKrVqvMKd2m8J6v+CweEz+cM/csnrNbrvfWbRcC6/b7/i8eM7f6v+AgYKDS32GdISJiouMf4ePiI2Sk5SVUpCYTZabnJ2eLpmhPp+kpaanEKKqT6itrq+Mq7I7sLW2t22zul24vb6/UbvCwMTFxjXCw8fLzM0gycnO0tPUD9DQ1dnax9fX29/gtd3d4eXmnuPk5+vsi+nj7fHyee/p8/f4avX2+f3+Vvve/RtI8EhAgQUTKrRxsN7ChxB1NEQYsaLFDhP3XdzIkf9CRo0dQ4os8BHkyJMVS5pEyTKhyoAtYw58CVOmzXs0a97cuS7nQZ5Aw/n8GbRotaFEjSplhjTp0qfAmjqFStWW1KlVs6K6ilWrV3RcdX4dyylsV7Jo3Zk9m7YtoLVs3cq9Azfu3Lu56orFy9eNXrt9A3v5C1iw4SmECx9ejCSxYsaQhTh+HLkyw8l7LWsOgjnz5s+XOzsETTq0aIqlU784vVK160KsUb+eLSJ2a9q4Odgenbv3ht28fQuvADz48OPWivNDzryB8uXNoz+HHh35dHjVm1/Hnv34dnXdh38HH773eG/lfZ/Hlt78emXtcb+HH3/2/F315d/XlZ/2/ln//dn33yoBvjYggQWqdqAqCSq4YCgNpvYghBGWNiEmFVp44SMZarhhHx2S9qEhIYo44hwlgnYiiilutqIcLX724hkxyjhjJDVWdiOOOUa2oyY9avbjKEFaNuQPRRp5JC9J6rhkk0oeCWWUP05J5Y1WXvlillqeyGWXH34J5oVijvlgmWYeiKaTXq7J5oZupnlfnHK+R2ed592J53d67nldn34+B2igxQ1K6G6GCrlfoorOx2ij6z3qYqSSQrpdpZPyiWmm021qY6eeclpoqJ8CR6qKo55aKmuqenhaq652BquEos1KK2a2OuhYrq7tymuvf/0qIFzCDmtWsf4di2yy/1Itqx5Szgo3VLTi0UStdypdy1xG2lbnWbfWcQdud+iNGx9/5hZIYboVkshukSq8K++89NZr77345qvvvvz26++/AAcs8MAEF2zwwQgnrPDCDDfs8MMQRyzxxBRXbPHFGGes8cYcd+zxxyCHLPLIJJds8skop6zyyiy37PLLMMcs88w012zzzTjnrPPOPPfs889ABy300EQXbfTRSCet9NJMN+3001BHLfXUVFdt9dVYZ6311ly/TMDXYIct9thkl2322WinrfbYXZOx9ttwxy333Ge3XQXdeOet995s230E34AHLjjcfgsx+OGIJx524Tco7vjjgjMuA+SUV5635P8uWK755nFjfgLnoIeOtucjiG766YuT/gHqrJ+uOgetx2766xnIbnvotFtw++6c5z4B78Br7nsEwRdP+fAOGK/848gvsPzzijcP/fSHI0/99ZH7jv32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9tpke40G23DHLffcdKPtdhZ156333ny3fTcTfQcu+OBx/y0E4YgnrrjYhvew+OOQD954DpFXbrne/5O3cPnmnMudOQqdhy562p+XMPrpqDNeegipt4766h+4LvvpsG8w++2i124B7rx3rvsEvQe/+e8QCG985cQ7cPzykCe/APPQL+589NQnnnz12Euue/bc9/179+BjDnv45NNde/noF156+uyvvX778Nudefz0lz1//firbnj+/AMwef/5+x8A8be/ARLwbwY84N0SqMCuMbCBXHtg/RYowfhRsILtuyAG2ee2DcKvgx7koANDKMIIkjB9XjshCkeoQvKlsIUuZCEMuwfCGXKvhjbEHg5zSL0d8pB5GvwhEH0oROMFsYhGPCISe4fAJSZRiU6cXeOiGLwpUhF3AryiFP+zqMXW3a+LqfscGL0oxjGObnxmDB0a0zi887Hxctt7I/K+J8fmEa+O0rseHhHnPAXsUXt9LMAfvRfI5w1SfIX04yHNl0gGLNJzjWzAI9kWyQdMUn6VtOQl/ZbJ4m0ybJ2kwCdDubtFkhIDgzxlB+qoShCksZUkuCIsVSDEWVJug7bMpS53ycte+vKXwAymMIdJzGIa85jITKYyl8nMZjrzmdCMpjSnSc1qWvOa2MymNrfJzW5685vgDKc4x0nOcprznOhMpzrXyc52uvOd8IynPOdJz3ra8574zKc+98nPfvrznwANqEAHStCCGvSgCN1XAGglgEAF4KEQjahEI+r/JwFY9KIYzShGuzTRjnqUomnSqEhHutEiffSkKF3olUjK0pY2tEUpjWlKi+TSmro0RDLNKUprZNOetrRCOg3qSVvk06KytEBCTepQM2TUph41PkqN6lIL5NSqPjU8Us2qR6lq1a6KFKtaDatE++PVsmo0O2JNK0jbY9a2lvQ5ao0rRMvj1rpedDlyzetDu2PXvlq0OHoNbHX8SljgBFaw1CFsYW9z2MNCR7GKtU1jG7scyEI2NpOdrHEsa1nWZDazweEsZ0/zWdACR7Sj9UxpP8sb1Iq2M6tl7W5c+1rKxLa0t6EtaidzW9zKRreudUxvV/tb4O62MMONbWuMS1vC/yRXuaxhbnP38lzooka6061LdW97Xexmly3b5e5pvKtbuIRXvKMhb3nPct7eple96w1Le90rGvgCV77zRW9n7HtfrOR3uJ7hr3Gv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"

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/*!********************************************!*\
  !*** D:/项目/uni-app/quna-uni/api/city.json ***!
  \********************************************/
/*! exports provided: ret, code, message, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"ret\":true,\"code\":200,\"message\":\"成功\",\"data\":{\"hotCities\":[{\"id\":216,\"spell\":\"beijing\",\"name\":\"北京\"},{\"id\":1910,\"spell\":\"shanghai\",\"name\":\"上海\"},{\"id\":1904,\"spell\":\"sanya\",\"name\":\"三亚\"},{\"id\":2410,\"spell\":\"xianggang\",\"name\":\"香港\"},{\"id\":810,\"spell\":\"hangzhou\",\"name\":\"杭州\"},{\"id\":708,\"spell\":\"guangzhou\",\"name\":\"广州\"},{\"id\":310,\"spell\":\"chengdu\",\"name\":\"成都\"},{\"id\":1915,\"spell\":\"shenzhen\",\"name\":\"深圳\"},{\"id\":1926,\"spell\":\"suzhou\",\"name\":\"苏州\"},{\"id\":711,\"spell\":\"guilin\",\"name\":\"桂林\"},{\"id\":2402,\"spell\":\"xian\",\"name\":\"西安\"},{\"id\":2401,\"spell\":\"xiamen\",\"name\":\"厦门                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           \"}],\"cities\":{\"A\":[{\"id\":101,\"spell\":\"abazangzuqiangzuzizhizhou\",\"name\":\"阿坝藏族羌族自治州\"},{\"id\":102,\"spell\":\"akesudiqu\",\"name\":\"阿克苏地区\"},{\"id\":103,\"spell\":\"alaer\",\"name\":\"阿拉尔\"},{\"id\":104,\"spell\":\"alashanmeng\",\"name\":\"阿拉善盟\"},{\"id\":105,\"spell\":\"aletai\",\"name\":\"阿勒泰\"},{\"id\":106,\"spell\":\"ali\",\"name\":\"阿里\"},{\"id\":107,\"spell\":\"ankang\",\"name\":\"安康\"},{\"id\":108,\"spell\":\"anqing\",\"name\":\"安庆\"},{\"id\":109,\"spell\":\"anshun\",\"name\":\"安顺\"},{\"id\":110,\"spell\":\"anyang\",\"name\":\"安阳\"},{\"id\":111,\"spell\":\"anshan\",\"name\":\"鞍山\"},{\"id\":112,\"spell\":\"aomen\",\"name\":\"澳门\"}],\"B\":[{\"id\":201,\"spell\":\"bayanzhuoer\",\"name\":\"巴彦卓尔\"},{\"id\":202,\"spell\":\"bayinguole\",\"name\":\"巴音郭勒\"},{\"id\":203,\"spell\":\"bazhong\",\"name\":\"巴中\"},{\"id\":204,\"spell\":\"baicheng\",\"name\":\"白城\"},{\"id\":205,\"spell\":\"baisha\",\"name\":\"白沙\"},{\"id\":206,\"spell\":\"baishan\",\"name\":\"白山\"},{\"id\":207,\"spell\":\"baiyin\",\"name\":\"白银\"},{\"id\":208,\"spell\":\"baise\",\"name\":\"百色\"},{\"id\":209,\"spell\":\"bengbu\",\"name\":\"蚌埠\"},{\"id\":210,\"spell\":\"baotou\",\"name\":\"包头\"},{\"id\":211,\"spell\":\"baoji\",\"name\":\"宝鸡\"},{\"id\":212,\"spell\":\"baoding\",\"name\":\"保定\"},{\"id\":213,\"spell\":\"baoshan\",\"name\":\"保山\"},{\"id\":214,\"spell\":\"baoting\",\"name\":\"保亭\"},{\"id\":215,\"spell\":\"beihai\",\"name\":\"北海\"},{\"id\":216,\"spell\":\"beijing\",\"name\":\"北京\"},{\"id\":271,\"spell\":\"benxi\",\"name\":\"本溪\"},{\"id\":218,\"spell\":\"bijie\",\"name\":\"毕节\"},{\"id\":219,\"spell\":\"binzhou\",\"name\":\"滨州\"},{\"id\":220,\"spell\":\"bozhou\",\"name\":\"亳州\"},{\"id\":221,\"spell\":\"boertala\",\"name\":\"博尔塔拉\"}],\"C\":[{\"id\":301,\"spell\":\"cangzhou\",\"name\":\"沧州\"},{\"id\":302,\"spell\":\"changdu\",\"name\":\"昌都\"},{\"id\":303,\"spell\":\"changji\",\"name\":\"昌吉\"},{\"id\":304,\"spell\":\"changde\",\"name\":\"常德\"},{\"id\":305,\"spell\":\"changzhou\",\"name\":\"常州\"},{\"id\":306,\"spell\":\"chaohu\",\"name\":\"巢湖\"},{\"id\":307,\"spell\":\"chaoyang\",\"name\":\"朝阳\"},{\"id\":308,\"spell\":\"chaozhou\",\"name\":\"潮州\"},{\"id\":309,\"spell\":\"chenzhou\",\"name\":\"郴州\"},{\"id\":310,\"spell\":\"chengdu\",\"name\":\"成都\"},{\"id\":311,\"spell\":\"chengde\",\"name\":\"承德\"},{\"id\":312,\"spell\":\"chengmai\",\"name\":\"澄迈\"},{\"id\":313,\"spell\":\"chizhou\",\"name\":\"池州\"},{\"id\":314,\"spell\":\"chifeng\",\"name\":\"赤峰\"},{\"id\":315,\"spell\":\"chongzuo\",\"name\":\"崇左\"},{\"id\":316,\"spell\":\"chuzhou\",\"name\":\"滁州\"},{\"id\":317,\"spell\":\"chuxiong\",\"name\":\"楚雄\"},{\"id\":318,\"spell\":\"changchun\",\"name\":\"长春\"},{\"id\":319,\"spell\":\"changgeshi\",\"name\":\"长葛市\"},{\"id\":320,\"spell\":\"changsha\",\"name\":\"长沙\"},{\"id\":321,\"spell\":\"changzhi\",\"name\":\"长治\"},{\"id\":322,\"spell\":\"chongqing\",\"name\":\"重庆\"}],\"D\":[{\"id\":401,\"spell\":\"dazhou\",\"name\":\"达州\"},{\"id\":402,\"spell\":\"dali\",\"name\":\"大理\"},{\"id\":403,\"spell\":\"dalian\",\"name\":\"大连\"},{\"id\":404,\"spell\":\"daqing\",\"name\":\"大庆\"},{\"id\":405,\"spell\":\"datong\",\"name\":\"大同\"},{\"id\":406,\"spell\":\"daxinganling\",\"name\":\"大兴安岭\"},{\"id\":407,\"spell\":\"dandong\",\"name\":\"丹东\"},{\"id\":408,\"spell\":\"danzhou\",\"name\":\"儋州\"},{\"id\":409,\"spell\":\"danshui\",\"name\":\"淡水\"},{\"id\":410,\"spell\":\"dehong\",\"name\":\"德宏\"},{\"id\":411,\"spell\":\"deyang\",\"name\":\"德阳\"},{\"id\":412,\"spell\":\"dezhoushi\",\"name\":\"德州市\"},{\"id\":413,\"spell\":\"deqing\",\"name\":\"德庆\"},{\"id\":414,\"spell\":\"dingan\",\"name\":\"定安\"},{\"id\":415,\"spell\":\"dingxi\",\"name\":\"定西\"},{\"id\":416,\"spell\":\"dongfang\",\"name\":\"东方\"},{\"id\":417,\"spell\":\"dongguan\",\"name\":\"东莞\"},{\"id\":418,\"spell\":\"dongying\",\"name\":\"东营\"},{\"id\":419,\"spell\":\"dunhuangshi\",\"name\":\"敦煌市\"}],\"E\":[{\"id\":501,\"spell\":\"eerduosi\",\"name\":\"鄂尔多斯\"},{\"id\":502,\"spell\":\"ezhou\",\"name\":\"鄂州\"},{\"id\":503,\"spell\":\"enshi\",\"name\":\"恩施\"}],\"F\":[{\"id\":601,\"spell\":\"fangchenggang\",\"name\":\"防城港\"},{\"id\":602,\"spell\":\"foshan\",\"name\":\"佛山\"},{\"id\":603,\"spell\":\"fuzhou\",\"name\":\"福州\"},{\"id\":604,\"spell\":\"fushun\",\"name\":\"抚顺\"},{\"id\":605,\"spell\":\"fuzhou\",\"name\":\"抚州\"},{\"id\":606,\"spell\":\"fuxin\",\"name\":\"阜新\"},{\"id\":607,\"spell\":\"fuyang\",\"name\":\"阜阳\"}],\"G\":[{\"id\":701,\"spell\":\"gannan\",\"name\":\"甘南\"},{\"id\":702,\"spell\":\"ganzizhou\",\"name\":\"甘孜州\"},{\"id\":703,\"spell\":\"ganzhou\",\"name\":\"赣州\"},{\"id\":704,\"spell\":\"gaoxiong\",\"name\":\"高雄\"},{\"id\":705,\"spell\":\"guyuan\",\"name\":\"固原\"},{\"id\":706,\"spell\":\"guangan\",\"name\":\"广安\"},{\"id\":707,\"spell\":\"guangyuan\",\"name\":\"广元\"},{\"id\":708,\"spell\":\"guangzhou\",\"name\":\"广州\"},{\"id\":709,\"spell\":\"guigang\",\"name\":\"贵港\"},{\"id\":710,\"spell\":\"guiyang\",\"name\":\"贵阳\"},{\"id\":711,\"spell\":\"guilin\",\"name\":\"桂林\"},{\"id\":712,\"spell\":\"guoluozangzuzizhizhou\",\"name\":\"果洛藏族自治州\"}],\"H\":[{\"id\":801,\"spell\":\"haerbin\",\"name\":\"哈尔滨\"},{\"id\":802,\"spell\":\"hami\",\"name\":\"哈密\"},{\"id\":803,\"spell\":\"haibeizangzuzizhizhou\",\"name\":\"海北藏族自治州\"},{\"id\":804,\"spell\":\"haidongdiqu\",\"name\":\"海东地区\"},{\"id\":805,\"spell\":\"haikou\",\"name\":\"海口\"},{\"id\":806,\"spell\":\"hainanzangzuzizhizhou\",\"name\":\"海南藏族自治州\"},{\"id\":807,\"spell\":\"haiximengguzuzangzuzizhizhou\",\"name\":\"海西蒙古族藏族自治州\"},{\"id\":808,\"spell\":\"handan\",\"name\":\"邯郸\"},{\"id\":809,\"spell\":\"hanzhong\",\"name\":\"汉中\"},{\"id\":810,\"spell\":\"hangzhou\",\"name\":\"杭州\"},{\"id\":811,\"spell\":\"hefei\",\"name\":\"合肥\"},{\"id\":812,\"spell\":\"hetian\",\"name\":\"和田\"},{\"id\":813,\"spell\":\"hechi\",\"name\":\"河池\"},{\"id\":814,\"spell\":\"heyuan\",\"name\":\"河源\"},{\"id\":815,\"spell\":\"heze\",\"name\":\"菏泽\"},{\"id\":816,\"spell\":\"hezhou\",\"name\":\"贺州\"},{\"id\":817,\"spell\":\"hebi\",\"name\":\"鹤壁\"},{\"id\":818,\"spell\":\"hegang\",\"name\":\"鹤岗\"},{\"id\":819,\"spell\":\"heihe\",\"name\":\"黑河\"},{\"id\":820,\"spell\":\"hengshui\",\"name\":\"衡水\"},{\"id\":821,\"spell\":\"hengyang\",\"name\":\"衡阳\"},{\"id\":822,\"spell\":\"honghe\",\"name\":\"红河\"},{\"id\":823,\"spell\":\"huhehaote\",\"name\":\"呼和浩特\"},{\"id\":824,\"spell\":\"hulunbeier\",\"name\":\"呼伦贝尔\"},{\"id\":825,\"spell\":\"huludao\",\"name\":\"葫芦岛\"},{\"id\":826,\"spell\":\"huzhou\",\"name\":\"湖州\"},{\"id\":827,\"spell\":\"hualian\",\"name\":\"花莲\"},{\"id\":828,\"spell\":\"huaihua\",\"name\":\"怀化\"},{\"id\":829,\"spell\":\"huaian\",\"name\":\"淮安\"},{\"id\":830,\"spell\":\"huaibei\",\"name\":\"淮北\"},{\"id\":831,\"spell\":\"huainan\",\"name\":\"淮南\"},{\"id\":832,\"spell\":\"huanggang\",\"name\":\"黄冈\"},{\"id\":833,\"spell\":\"huangnanzangzuzizhizhou\",\"name\":\"黄南藏族自治州\"},{\"id\":834,\"spell\":\"huangshanshi\",\"name\":\"黄山市\"},{\"id\":835,\"spell\":\"huangshi\",\"name\":\"黄石\"},{\"id\":836,\"spell\":\"huizhou\",\"name\":\"惠州\"}],\"J\":[{\"id\":1001,\"spell\":\"jixi\",\"name\":\"鸡西\"},{\"id\":1002,\"spell\":\"jilong\",\"name\":\"基隆\"},{\"id\":1003,\"spell\":\"jian\",\"name\":\"吉安\"},{\"id\":1004,\"spell\":\"jilin\",\"name\":\"吉林\"},{\"id\":1005,\"spell\":\"jinan\",\"name\":\"济南\"},{\"id\":1006,\"spell\":\"jining\",\"name\":\"济宁\"},{\"id\":1007,\"spell\":\"jiyuan\",\"name\":\"济源\"},{\"id\":1008,\"spell\":\"jiamusi\",\"name\":\"佳木斯\"},{\"id\":1009,\"spell\":\"jiaxing\",\"name\":\"嘉兴\"},{\"id\":1010,\"spell\":\"jiayi\",\"name\":\"嘉义\"},{\"id\":1011,\"spell\":\"jiayuguan\",\"name\":\"嘉峪关\"},{\"id\":1012,\"spell\":\"jiangmen\",\"name\":\"江门\"},{\"id\":1013,\"spell\":\"jiaozuo\",\"name\":\"焦作\"},{\"id\":1014,\"spell\":\"jieyang\",\"name\":\"揭阳\"},{\"id\":1015,\"spell\":\"jinchang\",\"name\":\"金昌\"},{\"id\":1016,\"spell\":\"jinhua\",\"name\":\"金华\"},{\"id\":1017,\"spell\":\"jinzhou\",\"name\":\"锦州\"},{\"id\":1018,\"spell\":\"jincheng\",\"name\":\"晋城\"},{\"id\":1019,\"spell\":\"jinzhong\",\"name\":\"晋中\"},{\"id\":1020,\"spell\":\"jingmen\",\"name\":\"荆门\"},{\"id\":1021,\"spell\":\"jingzhou\",\"name\":\"荆州\"},{\"id\":1022,\"spell\":\"jingdezhen\",\"name\":\"景德镇\"},{\"id\":1023,\"spell\":\"jiujiang\",\"name\":\"九江\"},{\"id\":1024,\"spell\":\"jiuquan\",\"name\":\"酒泉\"}],\"K\":[{\"id\":1101,\"spell\":\"kashi\",\"name\":\"喀什\"},{\"id\":1102,\"spell\":\"kaifeng\",\"name\":\"开封\"},{\"id\":1103,\"spell\":\"kelamayi\",\"name\":\"克拉玛依\"},{\"id\":1104,\"spell\":\"kezilesu\",\"name\":\"克孜勒苏\"},{\"id\":1105,\"spell\":\"kezilesukeerke\",\"name\":\"克孜勒苏柯尔克\"},{\"id\":1106,\"spell\":\"kunming\",\"name\":\"昆明\"}],\"L\":[{\"id\":1201,\"spell\":\"lasa\",\"name\":\"拉萨\"},{\"id\":1202,\"spell\":\"laibin\",\"name\":\"来宾\"},{\"id\":1203,\"spell\":\"laiwu\",\"name\":\"莱芜\"},{\"id\":1204,\"spell\":\"laizhoushi\",\"name\":\"莱州市\"},{\"id\":1205,\"spell\":\"lanzhou\",\"name\":\"兰州\"},{\"id\":1206,\"spell\":\"langfang\",\"name\":\"廊坊\"},{\"id\":1207,\"spell\":\"ledong\",\"name\":\"乐东\"},{\"id\":1208,\"spell\":\"leshan\",\"name\":\"乐山\"},{\"id\":1209,\"spell\":\"lijiang\",\"name\":\"丽江\"},{\"id\":1210,\"spell\":\"lishui\",\"name\":\"丽水\"},{\"id\":1211,\"spell\":\"lianyungang\",\"name\":\"连云港\"},{\"id\":1212,\"spell\":\"liangshanzhou\",\"name\":\"凉山州\"},{\"id\":1213,\"spell\":\"liaoyang\",\"name\":\"辽阳\"},{\"id\":1214,\"spell\":\"liaoyuan\",\"name\":\"辽源\"},{\"id\":1215,\"spell\":\"liaocheng\",\"name\":\"聊城\"},{\"id\":1216,\"spell\":\"linzhi\",\"name\":\"林芝\"},{\"id\":1217,\"spell\":\"lincang\",\"name\":\"临沧\"},{\"id\":1218,\"spell\":\"linfen\",\"name\":\"临汾\"},{\"id\":1219,\"spell\":\"lingao\",\"name\":\"临高\"},{\"id\":1220,\"spell\":\"linxia\",\"name\":\"临夏\"},{\"id\":1221,\"spell\":\"linyi\",\"name\":\"临沂\"},{\"id\":1222,\"spell\":\"lingshui\",\"name\":\"陵水\"},{\"id\":1223,\"spell\":\"liuzhou\",\"name\":\"柳州\"},{\"id\":1224,\"spell\":\"liuan\",\"name\":\"六安\"},{\"id\":1225,\"spell\":\"liupanshui\",\"name\":\"六盘水\"},{\"id\":1226,\"spell\":\"longyan\",\"name\":\"龙岩\"},{\"id\":1227,\"spell\":\"longnan\",\"name\":\"陇南\"},{\"id\":1228,\"spell\":\"loudi\",\"name\":\"娄底\"},{\"id\":1229,\"spell\":\"luzhou\",\"name\":\"泸州\"},{\"id\":1230,\"spell\":\"luoyang\",\"name\":\"洛阳\"},{\"id\":1231,\"spell\":\"luohe\",\"name\":\"漯河\"},{\"id\":1232,\"spell\":\"lvliang\",\"name\":\"吕梁\"}],\"M\":[{\"id\":1301,\"spell\":\"maanshan\",\"name\":\"马鞍山\"},{\"id\":1302,\"spell\":\"maoming\",\"name\":\"茂名\"},{\"id\":1303,\"spell\":\"meishan\",\"name\":\"眉山\"},{\"id\":1304,\"spell\":\"meizhou\",\"name\":\"梅州\"},{\"id\":1305,\"spell\":\"mianyang\",\"name\":\"绵阳\"},{\"id\":1306,\"spell\":\"miaoli\",\"name\":\"苗栗\"},{\"id\":1307,\"spell\":\"mudanjiang\",\"name\":\"牡丹江\"}],\"N\":[{\"id\":1401,\"spell\":\"naqu\",\"name\":\"那曲\"},{\"id\":1402,\"spell\":\"nanchang\",\"name\":\"南昌\"},{\"id\":1403,\"spell\":\"nanchong\",\"name\":\"南充\"},{\"id\":1404,\"spell\":\"nanjing\",\"name\":\"南京\"},{\"id\":1405,\"spell\":\"nanning\",\"name\":\"南宁\"},{\"id\":1406,\"spell\":\"nanping\",\"name\":\"南平\"},{\"id\":1407,\"spell\":\"nantong\",\"name\":\"南通\"},{\"id\":1408,\"spell\":\"nantou\",\"name\":\"南投\"},{\"id\":1409,\"spell\":\"nanyang\",\"name\":\"南阳\"},{\"id\":1410,\"spell\":\"neijiang\",\"name\":\"内江\"},{\"id\":1411,\"spell\":\"ningbo\",\"name\":\"宁波\"},{\"id\":1412,\"spell\":\"ningde\",\"name\":\"宁德\"},{\"id\":1413,\"spell\":\"nujiang\",\"name\":\"怒江\"}],\"P\":[{\"id\":1601,\"spell\":\"panzhihua\",\"name\":\"攀枝花\"},{\"id\":1602,\"spell\":\"panjin\",\"name\":\"盘锦\"},{\"id\":1603,\"spell\":\"pingdingshan\",\"name\":\"平顶山\"},{\"id\":1604,\"spell\":\"pinghu\",\"name\":\"平湖\"},{\"id\":1605,\"spell\":\"pingliang\",\"name\":\"平凉\"},{\"id\":1606,\"spell\":\"pingdong\",\"name\":\"屏东\"},{\"id\":1607,\"spell\":\"pingxiang\",\"name\":\"萍乡\"},{\"id\":1608,\"spell\":\"putian\",\"name\":\"莆田\"},{\"id\":1609,\"spell\":\"puyang\",\"name\":\"濮阳\"},{\"id\":1610,\"spell\":\"puning\",\"name\":\"普宁\"},{\"id\":1003,\"spell\":\"puer\",\"name\":\"普洱\"}],\"Q\":[{\"id\":1701,\"spell\":\"qitaihe\",\"name\":\"七台河\"},{\"id\":1702,\"spell\":\"qiqihaer\",\"name\":\"齐齐哈尔\"},{\"id\":1703,\"spell\":\"qianjiang\",\"name\":\"潜江\"},{\"id\":1704,\"spell\":\"qiandongnan\",\"name\":\"黔东南\"},{\"id\":1705,\"spell\":\"qiannan\",\"name\":\"黔南\"},{\"id\":1706,\"spell\":\"qianxinan\",\"name\":\"黔西南\"},{\"id\":1707,\"spell\":\"qinzhou\",\"name\":\"钦州\"},{\"id\":1708,\"spell\":\"qinhuangdao\",\"name\":\"秦皇岛\"},{\"id\":1709,\"spell\":\"qingdao\",\"name\":\"青岛\"},{\"id\":1710,\"spell\":\"qingyuan\",\"name\":\"清远\"},{\"id\":1711,\"spell\":\"qingyang\",\"name\":\"庆阳\"},{\"id\":1712,\"spell\":\"qionghai\",\"name\":\"琼海\"},{\"id\":1713,\"spell\":\"qiongzhong\",\"name\":\"琼中\"},{\"id\":1714,\"spell\":\"quzhou\",\"name\":\"衢州\"},{\"id\":1715,\"spell\":\"qujing\",\"name\":\"曲靖\"},{\"id\":1716,\"spell\":\"quanzhou\",\"name\":\"泉州\"}],\"R\":[{\"id\":1801,\"spell\":\"rikaze\",\"name\":\"日喀则\"},{\"id\":1802,\"spell\":\"rizhao\",\"name\":\"日照\"},{\"id\":1803,\"spell\":\"ruijinshi\",\"name\":\"瑞金市\"}],\"S\":[{\"id\":1901,\"spell\":\"sanmenxia\",\"name\":\"三门峡\"},{\"id\":1902,\"spell\":\"sanming\",\"name\":\"三明\"},{\"id\":1903,\"spell\":\"sansha\",\"name\":\"三沙\"},{\"id\":1904,\"spell\":\"sanya\",\"name\":\"三亚\"},{\"id\":1905,\"spell\":\"shannan\",\"name\":\"山南\"},{\"id\":1906,\"spell\":\"shantou\",\"name\":\"汕头\"},{\"id\":1907,\"spell\":\"shanwei\",\"name\":\"汕尾\"},{\"id\":1908,\"spell\":\"shangluo\",\"name\":\"商洛\"},{\"id\":1909,\"spell\":\"shangqiu\",\"name\":\"商丘\"},{\"id\":1910,\"spell\":\"shanghai\",\"name\":\"上海\"},{\"id\":1911,\"spell\":\"shangrao\",\"name\":\"上饶\"},{\"id\":1912,\"spell\":\"shaoguan\",\"name\":\"韶关\"},{\"id\":1913,\"spell\":\"shaoyang\",\"name\":\"邵阳\"},{\"id\":1914,\"spell\":\"shaoxing\",\"name\":\"绍兴\"},{\"id\":1915,\"spell\":\"shenzhen\",\"name\":\"深圳\"},{\"id\":1916,\"spell\":\"shennongjia\",\"name\":\"神农架\"},{\"id\":1917,\"spell\":\"shenyang\",\"name\":\"沈阳\"},{\"id\":1918,\"spell\":\"shiyan\",\"name\":\"十堰\"},{\"id\":1919,\"spell\":\"shihezi\",\"name\":\"石河子\"},{\"id\":1920,\"spell\":\"shijiazhuang\",\"name\":\"石家庄\"},{\"id\":1921,\"spell\":\"shizuishan\",\"name\":\"石嘴山\"},{\"id\":1922,\"spell\":\"shuangyashan\",\"name\":\"双鸭山\"},{\"id\":1923,\"spell\":\"shuozhou\",\"name\":\"朔州\"},{\"id\":1924,\"spell\":\"siping\",\"name\":\"四平\"},{\"id\":1925,\"spell\":\"songyuan\",\"name\":\"松原\"},{\"id\":1926,\"spell\":\"suzhou\",\"name\":\"苏州\"},{\"id\":1927,\"spell\":\"suihua\",\"name\":\"绥化\"},{\"id\":1928,\"spell\":\"suizhou\",\"name\":\"随州\"},{\"id\":1929,\"spell\":\"suining\",\"name\":\"遂宁\"},{\"id\":1930,\"spell\":\"suqian\",\"name\":\"宿迁\"},{\"id\":1931,\"spell\":\"suzhou\",\"name\":\"宿州\"}],\"T\":[{\"id\":2001,\"spell\":\"tachengdiqu\",\"name\":\"塔城地区\"},{\"id\":2002,\"spell\":\"taibei\",\"name\":\"台北\"},{\"id\":2003,\"spell\":\"taidong\",\"name\":\"台东\"},{\"id\":2004,\"spell\":\"tainan\",\"name\":\"台南\"},{\"id\":2005,\"spell\":\"taishanshi\",\"name\":\"台山市\"},{\"id\":2006,\"spell\":\"taizhong\",\"name\":\"台中\"},{\"id\":2007,\"spell\":\"taizhou\",\"name\":\"台州\"},{\"id\":2008,\"spell\":\"taiyuan\",\"name\":\"太原\"},{\"id\":2009,\"spell\":\"taian\",\"name\":\"泰安\"},{\"id\":2010,\"spell\":\"taizhou\",\"name\":\"泰州\"},{\"id\":2011,\"spell\":\"tangshan\",\"name\":\"唐山\"},{\"id\":2012,\"spell\":\"taoyuan\",\"name\":\"桃园\"},{\"id\":2013,\"spell\":\"tianjin\",\"name\":\"天津\"},{\"id\":2014,\"spell\":\"tianmen\",\"name\":\"天门\"},{\"id\":2015,\"spell\":\"tianshui\",\"name\":\"天水\"},{\"id\":2016,\"spell\":\"tieling\",\"name\":\"铁岭\"},{\"id\":2017,\"spell\":\"tonghua\",\"name\":\"通化\"},{\"id\":2018,\"spell\":\"tongliao\",\"name\":\"通辽\"},{\"id\":2019,\"spell\":\"tongchuan\",\"name\":\"铜川\"},{\"id\":2020,\"spell\":\"tongling\",\"name\":\"铜陵\"},{\"id\":2021,\"spell\":\"tongren\",\"name\":\"铜仁\"},{\"id\":2022,\"spell\":\"tumushuke\",\"name\":\"图木舒克\"},{\"id\":2023,\"spell\":\"tulufan\",\"name\":\"吐鲁番\"},{\"id\":2024,\"spell\":\"tunchang\",\"name\":\"屯昌\"}],\"W\":[{\"id\":2301,\"spell\":\"wanning\",\"name\":\"万宁\"},{\"id\":2302,\"spell\":\"weihai\",\"name\":\"威海\"},{\"id\":2303,\"spell\":\"weifang\",\"name\":\"潍坊\"},{\"id\":2304,\"spell\":\"weinan\",\"name\":\"渭南\"},{\"id\":2305,\"spell\":\"wenzhou\",\"name\":\"温州\"},{\"id\":2306,\"spell\":\"wenchang\",\"name\":\"文昌\"},{\"id\":2307,\"spell\":\"wenshan\",\"name\":\"文山\"},{\"id\":2308,\"spell\":\"wuhai\",\"name\":\"乌海\"},{\"id\":2309,\"spell\":\"wulanchabu\",\"name\":\"乌兰察布\"},{\"id\":2310,\"spell\":\"wulumuqi\",\"name\":\"乌鲁木齐\"},{\"id\":2311,\"spell\":\"wuxi\",\"name\":\"无锡\"},{\"id\":2312,\"spell\":\"wuhu\",\"name\":\"芜湖\"},{\"id\":2313,\"spell\":\"wuzhong\",\"name\":\"吴忠\"},{\"id\":2314,\"spell\":\"wuzhou\",\"name\":\"梧州\"},{\"id\":2315,\"spell\":\"wujiaqushi\",\"name\":\"五家渠市\"},{\"id\":2316,\"spell\":\"wuzhishan\",\"name\":\"五指山\"},{\"id\":2317,\"spell\":\"wuhan\",\"name\":\"武汉\"},{\"id\":2318,\"spell\":\"wuwei\",\"name\":\"武威\"}],\"X\":[{\"id\":2401,\"spell\":\"xiamen\",\"name\":\"厦门\"},{\"id\":2402,\"spell\":\"xian\",\"name\":\"西安\"},{\"id\":2403,\"spell\":\"xinanzhongshaqundao\",\"name\":\"西南中沙群岛\"},{\"id\":2404,\"spell\":\"xining\",\"name\":\"西宁\"},{\"id\":2405,\"spell\":\"xishuangbanna\",\"name\":\"西双版纳\"},{\"id\":2406,\"spell\":\"xilinguolemeng\",\"name\":\"锡林郭勒盟\"},{\"id\":2407,\"spell\":\"xiantao\",\"name\":\"仙桃\"},{\"id\":2408,\"spell\":\"xianning\",\"name\":\"咸宁\"},{\"id\":2409,\"spell\":\"xianyang\",\"name\":\"咸阳\"},{\"id\":2410,\"spell\":\"xianggang\",\"name\":\"香港\"},{\"id\":2411,\"spell\":\"xiangtan\",\"name\":\"湘潭\"},{\"id\":2412,\"spell\":\"xiangxi\",\"name\":\"湘西\"},{\"id\":2413,\"spell\":\"xiangfan\",\"name\":\"襄樊\"},{\"id\":2414,\"spell\":\"xiangyang\",\"name\":\"襄阳\"},{\"id\":2415,\"spell\":\"xiaogan\",\"name\":\"孝感\"},{\"id\":2416,\"spell\":\"xinzhou\",\"name\":\"忻州\"},{\"id\":2417,\"spell\":\"xinbei\",\"name\":\"新北\"},{\"id\":2418,\"spell\":\"xinxiang\",\"name\":\"新乡\"},{\"id\":2419,\"spell\":\"xinyu\",\"name\":\"新余\"},{\"id\":2420,\"spell\":\"xinzhu\",\"name\":\"新竹\"},{\"id\":2421,\"spell\":\"xinyang\",\"name\":\"信阳\"},{\"id\":2422,\"spell\":\"xingtai\",\"name\":\"邢台\"},{\"id\":2423,\"spell\":\"xinganmeng\",\"name\":\"兴安盟\"},{\"id\":2424,\"spell\":\"xuzhou\",\"name\":\"徐州\"},{\"id\":2425,\"spell\":\"xuchang\",\"name\":\"许昌\"},{\"id\":2426,\"spell\":\"xuancheng\",\"name\":\"宣城\"}],\"Y\":[{\"id\":2501,\"spell\":\"yaan\",\"name\":\"雅安\"},{\"id\":2502,\"spell\":\"yantai\",\"name\":\"烟台\"},{\"id\":2503,\"spell\":\"yanan\",\"name\":\"延安\"},{\"id\":2504,\"spell\":\"yanbian\",\"name\":\"延边\"},{\"id\":2505,\"spell\":\"yancheng\",\"name\":\"盐城\"},{\"id\":2506,\"spell\":\"yangzhou\",\"name\":\"扬州\"},{\"id\":2507,\"spell\":\"yangjiang\",\"name\":\"阳江\"},{\"id\":2508,\"spell\":\"yangquan\",\"name\":\"阳泉\"},{\"id\":2509,\"spell\":\"yichun\",\"name\":\"伊春\"},{\"id\":2510,\"spell\":\"yili\",\"name\":\"伊犁\"},{\"id\":2511,\"spell\":\"yilihasakezizhizhou\",\"name\":\"伊犁哈萨克自治州\"},{\"id\":2512,\"spell\":\"yibin\",\"name\":\"宜宾\"},{\"id\":2513,\"spell\":\"yichang\",\"name\":\"宜昌\"},{\"id\":2514,\"spell\":\"yichun\",\"name\":\"宜春\"},{\"id\":2515,\"spell\":\"yilan\",\"name\":\"宜兰\"},{\"id\":2516,\"spell\":\"yiyang\",\"name\":\"益阳\"},{\"id\":2517,\"spell\":\"yinchuan\",\"name\":\"银川\"},{\"id\":2518,\"spell\":\"yingtan\",\"name\":\"鹰潭\"},{\"id\":2519,\"spell\":\"yingkou\",\"name\":\"营口\"},{\"id\":2520,\"spell\":\"yongzhou\",\"name\":\"永州\"},{\"id\":2521,\"spell\":\"yulin\",\"name\":\"榆林\"},{\"id\":2522,\"spell\":\"yulin\",\"name\":\"玉林\"},{\"id\":2523,\"spell\":\"yushuzangzuzizhizhou\",\"name\":\"玉树藏族自治州\"},{\"id\":2534,\"spell\":\"yuxi\",\"name\":\"玉溪\"},{\"id\":2525,\"spell\":\"yueyang\",\"name\":\"岳阳\"},{\"id\":2526,\"spell\":\"yunfu\",\"name\":\"云浮\"},{\"id\":2527,\"spell\":\"yunlin\",\"name\":\"云林\"},{\"id\":2528,\"spell\":\"yuncheng\",\"name\":\"运城\"}],\"Z\":[{\"id\":2601,\"spell\":\"zaozhuang\",\"name\":\"枣庄\"},{\"id\":2602,\"spell\":\"zhanjiang\",\"name\":\"湛江\"},{\"id\":2603,\"spell\":\"zhangjiajie\",\"name\":\"张家界\"},{\"id\":2604,\"spell\":\"zhangjiakou\",\"name\":\"张家口\"},{\"id\":2605,\"spell\":\"zhangye\",\"name\":\"张掖\"},{\"id\":2606,\"spell\":\"zhanghua\",\"name\":\"彰化\"},{\"id\":2607,\"spell\":\"zhangzhou\",\"name\":\"漳州\"},{\"id\":2608,\"spell\":\"zhaotong\",\"name\":\"昭通\"},{\"id\":2609,\"spell\":\"zhaoqing\",\"name\":\"肇庆\"},{\"id\":2610,\"spell\":\"zhenjiang\",\"name\":\"镇江\"},{\"id\":2611,\"spell\":\"zhengzhou\",\"name\":\"郑州\"},{\"id\":2612,\"spell\":\"zhongshan\",\"name\":\"中山\"},{\"id\":2613,\"spell\":\"zhongwei\",\"name\":\"中卫\"},{\"id\":2614,\"spell\":\"zhoushan\",\"name\":\"舟山\"},{\"id\":2615,\"spell\":\"zhoukou\",\"name\":\"周口\"},{\"id\":2616,\"spell\":\"zhuhai\",\"name\":\"珠海\"},{\"id\":2617,\"spell\":\"zhuzhou\",\"name\":\"株洲\"},{\"id\":2618,\"spell\":\"zhumadian\",\"name\":\"驻马店\"},{\"id\":2619,\"spell\":\"ziyang\",\"name\":\"资阳\"},{\"id\":2620,\"spell\":\"zibo\",\"name\":\"淄博\"},{\"id\":2621,\"spell\":\"zigong\",\"name\":\"自贡\"},{\"id\":2622,\"spell\":\"zunyi\",\"name\":\"遵义\"}]}}}");

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */
/*!*********************************************!*\
  !*** D:/项目/uni-app/quna-uni/api/icons.json ***!
  \*********************************************/
/*! exports provided: code, message, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"code\":200,\"message\":\"成功\",\"data\":[{\"id\":\"001\",\"type\":\"up\",\"imgUrl\":\"https://s.qunarzz.com/homenode/images/touchheader/hotel.png\",\"name\":\"酒店\"},{\"id\":\"002\",\"type\":\"up\",\"imgUrl\":\"https://s.qunarzz.com/homenode/images/touchheader/flight.png\",\"name\":\"机票\"},{\"id\":\"003\",\"type\":\"up\",\"imgUrl\":\"https://s.qunarzz.com/homenode/images/touchheader/train.png\",\"name\":\"火车票\"},{\"id\":\"004\",\"type\":\"up\",\"imgUrl\":\"https://s.qunarzz.com/homenode/images/touchheader/package.png\",\"name\":\"度假\"},{\"id\":\"005\",\"type\":\"up\",\"imgUrl\":\"https://s.qunarzz.com/homenode/images/touchheader/piao.png\",\"name\":\"周边游\"},{\"id\":\"006\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/f5e5770393d759578962e53ee67798c8.png\",\"name\":\"海外酒店\"},{\"id\":\"007\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/a36d2288f19e54562338f4d8ef986288.png\",\"name\":\"低价机票\"},{\"id\":\"008\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/377db8cb2143aebf01869c9baad3d325.png\",\"name\":\"汽车票船票\"},{\"id\":\"009\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/ae617a31e0bd5803d76918b817f6d942.png\",\"name\":\"自由行\"},{\"id\":\"010\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/1316dc82d1ce6259686d5a68880e5a9d.png\",\"name\":\"攻略\"},{\"id\":\"011\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/01d2f57f920666364197a850dab859a8.png\",\"name\":\"民宿客栈\"},{\"id\":\"012\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/83af731055e121a3251690b225327b56.png\",\"name\":\"专车自驾\"},{\"id\":\"013\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/5b6737be49ca243072ca614f07803b83.png\",\"name\":\"赚钱 信用卡\"},{\"id\":\"014\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/1e107321f5396ea4994cd832232ecf8a.png\",\"name\":\"旅游团购\"},{\"id\":\"015\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/c65b3bb7571a6bd62df669213e44b84d.png\",\"name\":\"一日游\"},{\"id\":\"016\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/f6bb08a239ce1b038204120a8d1e4669.png\",\"name\":\"特惠酒店\"},{\"id\":\"017\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/3a08f360e958ccb2b947049387873ace.png\",\"name\":\"借钱\"},{\"id\":\"018\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/19b4f6d2fabd617789fa5aad65b249da.png\",\"name\":\"白金卡\"},{\"id\":\"019\",\"type\":\"down\",\"imgUrl\":\"https://img1.qunarzz.com/order/comp/2007/23/734c3c62d2adce02.png\",\"name\":\"行程设计\"},{\"id\":\"020\",\"type\":\"down\",\"imgUrl\":\"https://picbed.qunarzz.com/25e3b9f17a21a6e0113c57a23ffccde4.png\",\"name\":\"周末游\"}]}");

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/*!*******************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/node_modules/pubsub-js/src/pubsub.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
/**
 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
 * License: MIT - http://mrgnrdrck.mit-license.org
 *
 * https://github.com/mroderick/PubSubJS
 */

(function (root, factory) {
  'use strict';

  var PubSub = {};
  if (root.PubSub) {
    PubSub = root.PubSub;
    console.warn("PubSub already loaded, using existing version");
  } else {
    root.PubSub = PubSub;
    factory(PubSub);
  }
  // CommonJS and Node.js module support
  if (( false ? undefined : _typeof(exports)) === 'object') {
    if (module !== undefined && module.exports) {
      exports = module.exports = PubSub; // Node.js specific `module.exports`
    }

    exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
    module.exports = exports = PubSub; // CommonJS
  }
  // AMD support
  /* eslint-disable no-undef */else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return PubSub;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* eslint-enable no-undef */
  }
})((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window || this, function (PubSub) {
  'use strict';

  var messages = {},
    lastUid = -1,
    ALL_SUBSCRIBING_MSG = '*';
  function hasKeys(obj) {
    var key;
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns a function that throws the passed exception, for use as argument for setTimeout
   * @alias throwException
   * @function
   * @param { Object } ex An Error object
   */
  function throwException(ex) {
    return function reThrowException() {
      throw ex;
    };
  }
  function callSubscriberWithDelayedExceptions(subscriber, message, data) {
    try {
      subscriber(message, data);
    } catch (ex) {
      setTimeout(throwException(ex), 0);
    }
  }
  function callSubscriberWithImmediateExceptions(subscriber, message, data) {
    subscriber(message, data);
  }
  function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
    var subscribers = messages[matchedMessage],
      callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
      s;
    if (!Object.prototype.hasOwnProperty.call(messages, matchedMessage)) {
      return;
    }
    for (s in subscribers) {
      if (Object.prototype.hasOwnProperty.call(subscribers, s)) {
        callSubscriber(subscribers[s], originalMessage, data);
      }
    }
  }
  function createDeliveryFunction(message, data, immediateExceptions) {
    return function deliverNamespaced() {
      var topic = String(message),
        position = topic.lastIndexOf('.');

      // deliver the message as it is now
      deliverMessage(message, message, data, immediateExceptions);

      // trim the hierarchy and deliver message to each level
      while (position !== -1) {
        topic = topic.substr(0, position);
        position = topic.lastIndexOf('.');
        deliverMessage(message, topic, data, immediateExceptions);
      }
      deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);
    };
  }
  function hasDirectSubscribersFor(message) {
    var topic = String(message),
      found = Boolean(Object.prototype.hasOwnProperty.call(messages, topic) && hasKeys(messages[topic]));
    return found;
  }
  function messageHasSubscribers(message) {
    var topic = String(message),
      found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),
      position = topic.lastIndexOf('.');
    while (!found && position !== -1) {
      topic = topic.substr(0, position);
      position = topic.lastIndexOf('.');
      found = hasDirectSubscribersFor(topic);
    }
    return found;
  }
  function publish(message, data, sync, immediateExceptions) {
    message = _typeof(message) === 'symbol' ? message.toString() : message;
    var deliver = createDeliveryFunction(message, data, immediateExceptions),
      hasSubscribers = messageHasSubscribers(message);
    if (!hasSubscribers) {
      return false;
    }
    if (sync === true) {
      deliver();
    } else {
      setTimeout(deliver, 0);
    }
    return true;
  }

  /**
   * Publishes the message, passing the data to it's subscribers
   * @function
   * @alias publish
   * @param { String } message The message to publish
   * @param {} data The data to pass to subscribers
   * @return { Boolean }
   */
  PubSub.publish = function (message, data) {
    return publish(message, data, false, PubSub.immediateExceptions);
  };

  /**
   * Publishes the message synchronously, passing the data to it's subscribers
   * @function
   * @alias publishSync
   * @param { String } message The message to publish
   * @param {} data The data to pass to subscribers
   * @return { Boolean }
   */
  PubSub.publishSync = function (message, data) {
    return publish(message, data, true, PubSub.immediateExceptions);
  };

  /**
   * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe
   * @function
   * @alias subscribe
   * @param { String } message The message to subscribe to
   * @param { Function } func The function to call when a new message is published
   * @return { String }
   */
  PubSub.subscribe = function (message, func) {
    if (typeof func !== 'function') {
      return false;
    }
    message = _typeof(message) === 'symbol' ? message.toString() : message;

    // message is not registered yet
    if (!Object.prototype.hasOwnProperty.call(messages, message)) {
      messages[message] = {};
    }

    // forcing token as String, to allow for future expansions without breaking usage
    // and allow for easy use as key names for the 'messages' object
    var token = 'uid_' + String(++lastUid);
    messages[message][token] = func;

    // return token for unsubscribing
    return token;
  };
  PubSub.subscribeAll = function (func) {
    return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);
  };

  /**
   * Subscribes the passed function to the passed message once
   * @function
   * @alias subscribeOnce
   * @param { String } message The message to subscribe to
   * @param { Function } func The function to call when a new message is published
   * @return { PubSub }
   */
  PubSub.subscribeOnce = function (message, func) {
    var token = PubSub.subscribe(message, function () {
      // before func apply, unsubscribe message
      PubSub.unsubscribe(token);
      func.apply(this, arguments);
    });
    return PubSub;
  };

  /**
   * Clears all subscriptions
   * @function
   * @public
   * @alias clearAllSubscriptions
   */
  PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
    messages = {};
  };

  /**
   * Clear subscriptions by the topic
   * @function
   * @public
   * @alias clearAllSubscriptions
   * @return { int }
   */
  PubSub.clearSubscriptions = function clearSubscriptions(topic) {
    var m;
    for (m in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
        delete messages[m];
      }
    }
  };

  /**
     Count subscriptions by the topic
   * @function
   * @public
   * @alias countSubscriptions
   * @return { Array }
  */
  PubSub.countSubscriptions = function countSubscriptions(topic) {
    var m;
    // eslint-disable-next-line no-unused-vars
    var token;
    var count = 0;
    for (m in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
        for (token in messages[m]) {
          count++;
        }
        break;
      }
    }
    return count;
  };

  /**
     Gets subscriptions by the topic
   * @function
   * @public
   * @alias getSubscriptions
  */
  PubSub.getSubscriptions = function getSubscriptions(topic) {
    var m;
    var list = [];
    for (m in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
        list.push(m);
      }
    }
    return list;
  };

  /**
   * Removes subscriptions
   *
   * - When passed a token, removes a specific subscription.
   *
  * - When passed a function, removes all subscriptions for that function
   *
  * - When passed a topic, removes all subscriptions for that topic (hierarchy)
   * @function
   * @public
   * @alias subscribeOnce
   * @param { String | Function } value A token, function or topic to unsubscribe from
   * @example // Unsubscribing with a token
   * var token = PubSub.subscribe('mytopic', myFunc);
   * PubSub.unsubscribe(token);
   * @example // Unsubscribing with a function
   * PubSub.unsubscribe(myFunc);
   * @example // Unsubscribing from a topic
   * PubSub.unsubscribe('mytopic');
   */
  PubSub.unsubscribe = function (value) {
    var descendantTopicExists = function descendantTopicExists(topic) {
        var m;
        for (m in messages) {
          if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
            // a descendant of the topic exists:
            return true;
          }
        }
        return false;
      },
      isTopic = typeof value === 'string' && (Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value)),
      isToken = !isTopic && typeof value === 'string',
      isFunction = typeof value === 'function',
      result = false,
      m,
      message,
      t;
    if (isTopic) {
      PubSub.clearSubscriptions(value);
      return;
    }
    for (m in messages) {
      if (Object.prototype.hasOwnProperty.call(messages, m)) {
        message = messages[m];
        if (isToken && message[value]) {
          delete message[value];
          result = value;
          // tokens are unique, so we can just stop here
          break;
        }
        if (isFunction) {
          for (t in message) {
            if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value) {
              delete message[t];
              result = true;
            }
          }
        }
      }
    }
    return result;
  };
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../应用/HBuilderX.3.6.13.20221209/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 103)(module)))

/***/ }),
/* 103 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 104 */
/*!***********************************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/node_modules/better-scroll/dist/better-scroll.esm.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zoom = exports.Wheel = exports.Slide = exports.ScrollBar = exports.PullUpLoad = exports.PullDownRefresh = exports.ObserveImage = exports.ObserveDom = exports.NestedScroll = exports.Movable = exports.MouseWheel = exports.InfinityScroll = exports.Indicators = exports.CustomOptions = exports.Behavior = void 0;
exports.createBScroll = createBScroll;
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
/*!
 * better-scroll / better-scroll
 * (c) 2016-2022 ustbhuangyi
 * Released under the MIT License.
 */
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
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
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
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }
  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }
  return r;
}
var propertiesConfig$7 = [{
  sourceKey: 'scroller.scrollBehaviorX.currentPos',
  key: 'x'
}, {
  sourceKey: 'scroller.scrollBehaviorY.currentPos',
  key: 'y'
}, {
  sourceKey: 'scroller.scrollBehaviorX.hasScroll',
  key: 'hasHorizontalScroll'
}, {
  sourceKey: 'scroller.scrollBehaviorY.hasScroll',
  key: 'hasVerticalScroll'
}, {
  sourceKey: 'scroller.scrollBehaviorX.contentSize',
  key: 'scrollerWidth'
}, {
  sourceKey: 'scroller.scrollBehaviorY.contentSize',
  key: 'scrollerHeight'
}, {
  sourceKey: 'scroller.scrollBehaviorX.maxScrollPos',
  key: 'maxScrollX'
}, {
  sourceKey: 'scroller.scrollBehaviorY.maxScrollPos',
  key: 'maxScrollY'
}, {
  sourceKey: 'scroller.scrollBehaviorX.minScrollPos',
  key: 'minScrollX'
}, {
  sourceKey: 'scroller.scrollBehaviorY.minScrollPos',
  key: 'minScrollY'
}, {
  sourceKey: 'scroller.scrollBehaviorX.movingDirection',
  key: 'movingDirectionX'
}, {
  sourceKey: 'scroller.scrollBehaviorY.movingDirection',
  key: 'movingDirectionY'
}, {
  sourceKey: 'scroller.scrollBehaviorX.direction',
  key: 'directionX'
}, {
  sourceKey: 'scroller.scrollBehaviorY.direction',
  key: 'directionY'
}, {
  sourceKey: 'scroller.actions.enabled',
  key: 'enabled'
}, {
  sourceKey: 'scroller.animater.pending',
  key: 'pending'
}, {
  sourceKey: 'scroller.animater.stop',
  key: 'stop'
}, {
  sourceKey: 'scroller.scrollTo',
  key: 'scrollTo'
}, {
  sourceKey: 'scroller.scrollBy',
  key: 'scrollBy'
}, {
  sourceKey: 'scroller.scrollToElement',
  key: 'scrollToElement'
}, {
  sourceKey: 'scroller.resetPosition',
  key: 'resetPosition'
}];
function warn(msg) {
  console.error("[BScroll warn]: " + msg);
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error('[BScroll] ' + msg);
  }
}

// ssr support
var inBrowser = typeof window !== 'undefined';
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = !!(ua && /wechatdevtools/.test(ua));
var isAndroid = ua && ua.indexOf('android') > 0;
/* istanbul ignore next */
var isIOSBadVersion = function () {
  if (typeof ua === 'string') {
    var regex = /os (\d\d?_\d(_\d)?)/;
    var matches = regex.exec(ua);
    if (!matches) return false;
    var parts = matches[1].split('_').map(function (item) {
      return parseInt(item, 10);
    });
    // ios version >= 13.4 issue 982
    return !!(parts[0] === 13 && parts[1] >= 4);
  }
  return false;
}();
/* istanbul ignore next */
var supportsPassive = false;
/* istanbul ignore next */
if (inBrowser) {
  var EventName = 'test-passive';
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener(EventName, function () {}, opts);
  } catch (e) {}
}
function getNow() {
  return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}
var extend = function extend(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
  return target;
};
function isUndef(v) {
  return v === undefined || v === null;
}
function getDistance(x, y) {
  return Math.sqrt(x * x + y * y);
}
function between(x, min, max) {
  if (x < min) {
    return min;
  }
  if (x > max) {
    return max;
  }
  return x;
}
function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn);
  }
  var index = -1;
  ary.some(function (item, i, ary) {
    var ret = fn(item, i, ary);
    if (ret) {
      index = i;
      return ret;
    }
  });
  return index;
}
var elementStyle = inBrowser && document.createElement('div').style;
var vendor = function () {
  /* istanbul ignore if  */
  if (!inBrowser) {
    return false;
  }
  var transformNames = [{
    key: 'standard',
    value: 'transform'
  }, {
    key: 'webkit',
    value: 'webkitTransform'
  }, {
    key: 'Moz',
    value: 'MozTransform'
  }, {
    key: 'O',
    value: 'OTransform'
  }, {
    key: 'ms',
    value: 'msTransform'
  }];
  for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
    var obj = transformNames_1[_i];
    if (elementStyle[obj.value] !== undefined) {
      return obj.key;
    }
  }
  /* istanbul ignore next  */
  return false;
}();
/* istanbul ignore next  */
function prefixStyle(style) {
  if (vendor === false) {
    return style;
  }
  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend';
    }
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
function getElement(el) {
  return typeof el === 'string' ? document.querySelector(el) : el;
}
function addEvent(el, type, fn, capture) {
  var useCapture = supportsPassive ? {
    passive: false,
    capture: !!capture
  } : !!capture;
  el.addEventListener(type, fn, useCapture);
}
function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {
    capture: !!capture
  });
}
function maybePrevent(e) {
  if (e.cancelable) {
    e.preventDefault();
  }
}
function offset(el) {
  var left = 0;
  var top = 0;
  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }
  return {
    left: left,
    top: top
  };
}
function offsetToBody(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: -(rect.left + window.pageXOffset),
    top: -(rect.top + window.pageYOffset)
  };
}
var cssVendor = vendor && vendor !== 'standard' ? '-' + vendor.toLowerCase() + '-' : '';
var transform = prefixStyle('transform');
var transition = prefixStyle('transition');
var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
// fix issue #361
var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
var hasTransition = inBrowser && transition in elementStyle;
var style = {
  transform: transform,
  transition: transition,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd'),
  transitionProperty: prefixStyle('transitionProperty')
};
var eventTypeMap = {
  touchstart: 1,
  touchmove: 1,
  touchend: 1,
  touchcancel: 1,
  mousedown: 2,
  mousemove: 2,
  mouseup: 2
};
function getRect(el) {
  /* istanbul ignore if  */
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}
function preventDefaultExceptionFn(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}
var tagExceptionFn = preventDefaultExceptionFn;
function tap(e, eventName) {
  var ev = document.createEvent('Event');
  ev.initEvent(eventName, true, true);
  ev.pageX = e.pageX;
  ev.pageY = e.pageY;
  e.target.dispatchEvent(ev);
}
function click(e, event) {
  if (event === void 0) {
    event = 'click';
  }
  var eventSource;
  if (e.type === 'mouseup') {
    eventSource = e;
  } else if (e.type === 'touchend' || e.type === 'touchcancel') {
    eventSource = e.changedTouches[0];
  }
  var posSrc = {};
  if (eventSource) {
    posSrc.screenX = eventSource.screenX || 0;
    posSrc.screenY = eventSource.screenY || 0;
    posSrc.clientX = eventSource.clientX || 0;
    posSrc.clientY = eventSource.clientY || 0;
  }
  var ev;
  var bubbles = true;
  var cancelable = true;
  var ctrlKey = e.ctrlKey,
    shiftKey = e.shiftKey,
    altKey = e.altKey,
    metaKey = e.metaKey;
  var pressedKeysMap = {
    ctrlKey: ctrlKey,
    shiftKey: shiftKey,
    altKey: altKey,
    metaKey: metaKey
  };
  if (typeof MouseEvent !== 'undefined') {
    try {
      ev = new MouseEvent(event, extend(_assign({
        bubbles: bubbles,
        cancelable: cancelable
      }, pressedKeysMap), posSrc));
    } catch (e) {
      /* istanbul ignore next */
      createEvent();
    }
  } else {
    createEvent();
  }
  function createEvent() {
    ev = document.createEvent('Event');
    ev.initEvent(event, bubbles, cancelable);
    extend(ev, posSrc);
  }
  // forwardedTouchEvent set to true in case of the conflict with fastclick
  ev.forwardedTouchEvent = true;
  ev._constructed = true;
  e.target.dispatchEvent(ev);
}
function dblclick(e) {
  click(e, 'dblclick');
}
function prepend(el, target) {
  var firstChild = target.firstChild;
  if (firstChild) {
    before(el, firstChild);
  } else {
    target.appendChild(el);
  }
}
function before(el, target) {
  var parentNode = target.parentNode;
  parentNode.insertBefore(el, target);
}
function removeChild(el, child) {
  el.removeChild(child);
}
function hasClass(el, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}
function HTMLCollectionToArray(el) {
  return Array.prototype.slice.call(el, 0);
}
function getClientSize(el) {
  return {
    width: el.clientWidth,
    height: el.clientHeight
  };
}
var ease = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function fn(t) {
      return 1 + --t * t * t * t * t;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function fn(t) {
      return t * (2 - t);
    }
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function fn(t) {
      return 1 - --t * t * t * t;
    }
  }
};
var DEFAULT_INTERVAL = 1000 / 60;
var windowCompat = inBrowser && window;
/* istanbul ignore next */
function noop$1() {}
var requestAnimationFrame = function () {
  /* istanbul ignore if  */
  if (!inBrowser) {
    return noop$1;
  }
  return windowCompat.requestAnimationFrame || windowCompat.webkitRequestAnimationFrame || windowCompat.mozRequestAnimationFrame || windowCompat.oRequestAnimationFrame ||
  // if all else fails, use setTimeout
  function (callback) {
    return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL); // make interval as precise as possible.
  };
}();

var cancelAnimationFrame = function () {
  /* istanbul ignore if  */
  if (!inBrowser) {
    return noop$1;
  }
  return windowCompat.cancelAnimationFrame || windowCompat.webkitCancelAnimationFrame || windowCompat.mozCancelAnimationFrame || windowCompat.oCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

/* istanbul ignore next */
var noop = function noop(val) {};
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
var getProperty = function getProperty(obj, key) {
  var keys = key.split('.');
  for (var i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
    if ((0, _typeof2.default)(obj) !== 'object' || !obj) return;
  }
  var lastKey = keys.pop();
  if (typeof obj[lastKey] === 'function') {
    return function () {
      return obj[lastKey].apply(obj, arguments);
    };
  } else {
    return obj[lastKey];
  }
};
var setProperty = function setProperty(obj, key, value) {
  var keys = key.split('.');
  var temp;
  for (var i = 0; i < keys.length - 1; i++) {
    temp = keys[i];
    if (!obj[temp]) obj[temp] = {};
    obj = obj[temp];
  }
  obj[keys.pop()] = value;
};
function propertiesProxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return getProperty(this, sourceKey);
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    setProperty(this, sourceKey, val);
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
var EventEmitter = /** @class */function () {
  function EventEmitter(names) {
    this.events = {};
    this.eventTypes = {};
    this.registerType(names);
  }
  EventEmitter.prototype.on = function (type, fn, context) {
    if (context === void 0) {
      context = this;
    }
    this.hasType(type);
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push([fn, context]);
    return this;
  };
  EventEmitter.prototype.once = function (type, fn, context) {
    var _this = this;
    if (context === void 0) {
      context = this;
    }
    this.hasType(type);
    var magic = function magic() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      _this.off(type, magic);
      var ret = fn.apply(context, args);
      if (ret === true) {
        return ret;
      }
    };
    magic.fn = fn;
    this.on(type, magic);
    return this;
  };
  EventEmitter.prototype.off = function (type, fn) {
    if (!type && !fn) {
      this.events = {};
      return this;
    }
    if (type) {
      this.hasType(type);
      if (!fn) {
        this.events[type] = [];
        return this;
      }
      var events = this.events[type];
      if (!events) {
        return this;
      }
      var count = events.length;
      while (count--) {
        if (events[count][0] === fn || events[count][0] && events[count][0].fn === fn) {
          events.splice(count, 1);
        }
      }
      return this;
    }
  };
  EventEmitter.prototype.trigger = function (type) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    this.hasType(type);
    var events = this.events[type];
    if (!events) {
      return;
    }
    var len = events.length;
    var eventsCopy = __spreadArrays(events);
    var ret;
    for (var i = 0; i < len; i++) {
      var event_1 = eventsCopy[i];
      var fn = event_1[0],
        context = event_1[1];
      if (fn) {
        ret = fn.apply(context, args);
        if (ret === true) {
          return ret;
        }
      }
    }
  };
  EventEmitter.prototype.registerType = function (names) {
    var _this = this;
    names.forEach(function (type) {
      _this.eventTypes[type] = type;
    });
  };
  EventEmitter.prototype.destroy = function () {
    this.events = {};
    this.eventTypes = {};
  };
  EventEmitter.prototype.hasType = function (type) {
    var types = this.eventTypes;
    var isType = types[type] === type;
    if (!isType) {
      warn("EventEmitter has used unknown event type: \"" + type + "\", should be oneof [" + ("" + Object.keys(types).map(function (_) {
        return JSON.stringify(_);
      })) + "]");
    }
  };
  return EventEmitter;
}();
var EventRegister = /** @class */function () {
  function EventRegister(wrapper, events) {
    this.wrapper = wrapper;
    this.events = events;
    this.addDOMEvents();
  }
  EventRegister.prototype.destroy = function () {
    this.removeDOMEvents();
    this.events = [];
  };
  EventRegister.prototype.addDOMEvents = function () {
    this.handleDOMEvents(addEvent);
  };
  EventRegister.prototype.removeDOMEvents = function () {
    this.handleDOMEvents(removeEvent);
  };
  EventRegister.prototype.handleDOMEvents = function (eventOperation) {
    var _this = this;
    var wrapper = this.wrapper;
    this.events.forEach(function (event) {
      eventOperation(wrapper, event.name, _this, !!event.capture);
    });
  };
  EventRegister.prototype.handleEvent = function (e) {
    var eventType = e.type;
    this.events.some(function (event) {
      if (event.name === eventType) {
        event.handler(e);
        return true;
      }
      return false;
    });
  };
  return EventRegister;
}();
var CustomOptions = /** @class */function () {
  function CustomOptions() {}
  return CustomOptions;
}();
exports.CustomOptions = CustomOptions;
var OptionsConstructor = /** @class */function (_super) {
  __extends(OptionsConstructor, _super);
  function OptionsConstructor() {
    var _this = _super.call(this) || this;
    _this.startX = 0;
    _this.startY = 0;
    _this.scrollX = false;
    _this.scrollY = true;
    _this.freeScroll = false;
    _this.directionLockThreshold = 0;
    _this.eventPassthrough = "" /* None */;
    _this.click = false;
    _this.dblclick = false;
    _this.tap = '';
    _this.bounce = {
      top: true,
      bottom: true,
      left: true,
      right: true
    };
    _this.bounceTime = 800;
    _this.momentum = true;
    _this.momentumLimitTime = 300;
    _this.momentumLimitDistance = 15;
    _this.swipeTime = 2500;
    _this.swipeBounceTime = 500;
    _this.deceleration = 0.0015;
    _this.flickLimitTime = 200;
    _this.flickLimitDistance = 100;
    _this.resizePolling = 60;
    _this.probeType = 0 /* Default */;
    _this.stopPropagation = false;
    _this.preventDefault = true;
    _this.preventDefaultException = {
      tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
    };
    _this.tagException = {
      tagName: /^TEXTAREA$/
    };
    _this.HWCompositing = true;
    _this.useTransition = true;
    _this.bindToWrapper = false;
    _this.bindToTarget = false;
    _this.disableMouse = hasTouch;
    _this.disableTouch = !hasTouch;
    _this.autoBlur = true;
    _this.autoEndDistance = 5;
    _this.outOfBoundaryDampingFactor = 1 / 3;
    _this.specifiedIndexAsContent = 0;
    _this.quadrant = 1 /* First */;
    return _this;
  }
  OptionsConstructor.prototype.merge = function (options) {
    if (!options) return this;
    for (var key in options) {
      if (key === 'bounce') {
        this.bounce = this.resolveBounce(options[key]);
        continue;
      }
      this[key] = options[key];
    }
    return this;
  };
  OptionsConstructor.prototype.process = function () {
    this.translateZ = this.HWCompositing && hasPerspective ? ' translateZ(1px)' : '';
    this.useTransition = this.useTransition && hasTransition;
    this.preventDefault = !this.eventPassthrough && this.preventDefault;
    // If you want eventPassthrough I have to lock one of the axes
    this.scrollX = this.eventPassthrough === "horizontal" /* Horizontal */ ? false : this.scrollX;
    this.scrollY = this.eventPassthrough === "vertical" /* Vertical */ ? false : this.scrollY;
    // With eventPassthrough we also need lockDirection mechanism
    this.freeScroll = this.freeScroll && !this.eventPassthrough;
    // force true when freeScroll is true
    this.scrollX = this.freeScroll ? true : this.scrollX;
    this.scrollY = this.freeScroll ? true : this.scrollY;
    this.directionLockThreshold = this.eventPassthrough ? 0 : this.directionLockThreshold;
    return this;
  };
  OptionsConstructor.prototype.resolveBounce = function (bounceOptions) {
    var DEFAULT_BOUNCE = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    var NEGATED_BOUNCE = {
      top: false,
      right: false,
      bottom: false,
      left: false
    };
    var ret;
    if ((0, _typeof2.default)(bounceOptions) === 'object') {
      ret = extend(DEFAULT_BOUNCE, bounceOptions);
    } else {
      ret = bounceOptions ? DEFAULT_BOUNCE : NEGATED_BOUNCE;
    }
    return ret;
  };
  return OptionsConstructor;
}(CustomOptions);
var ActionsHandler = /** @class */function () {
  function ActionsHandler(wrapper, options) {
    this.wrapper = wrapper;
    this.options = options;
    this.hooks = new EventEmitter(['beforeStart', 'start', 'move', 'end', 'click']);
    this.handleDOMEvents();
  }
  ActionsHandler.prototype.handleDOMEvents = function () {
    var _a = this.options,
      bindToWrapper = _a.bindToWrapper,
      disableMouse = _a.disableMouse,
      disableTouch = _a.disableTouch,
      click = _a.click;
    var wrapper = this.wrapper;
    var target = bindToWrapper ? wrapper : window;
    var wrapperEvents = [];
    var targetEvents = [];
    var shouldRegisterTouch = !disableTouch;
    var shouldRegisterMouse = !disableMouse;
    if (click) {
      wrapperEvents.push({
        name: 'click',
        handler: this.click.bind(this),
        capture: true
      });
    }
    if (shouldRegisterTouch) {
      wrapperEvents.push({
        name: 'touchstart',
        handler: this.start.bind(this)
      });
      targetEvents.push({
        name: 'touchmove',
        handler: this.move.bind(this)
      }, {
        name: 'touchend',
        handler: this.end.bind(this)
      }, {
        name: 'touchcancel',
        handler: this.end.bind(this)
      });
    }
    if (shouldRegisterMouse) {
      wrapperEvents.push({
        name: 'mousedown',
        handler: this.start.bind(this)
      });
      targetEvents.push({
        name: 'mousemove',
        handler: this.move.bind(this)
      }, {
        name: 'mouseup',
        handler: this.end.bind(this)
      });
    }
    this.wrapperEventRegister = new EventRegister(wrapper, wrapperEvents);
    this.targetEventRegister = new EventRegister(target, targetEvents);
  };
  ActionsHandler.prototype.beforeHandler = function (e, type) {
    var _a = this.options,
      preventDefault = _a.preventDefault,
      stopPropagation = _a.stopPropagation,
      preventDefaultException = _a.preventDefaultException;
    var preventDefaultConditions = {
      start: function start() {
        return preventDefault && !preventDefaultExceptionFn(e.target, preventDefaultException);
      },
      end: function end() {
        return preventDefault && !preventDefaultExceptionFn(e.target, preventDefaultException);
      },
      move: function move() {
        return preventDefault;
      }
    };
    if (preventDefaultConditions[type]()) {
      e.preventDefault();
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
  };
  ActionsHandler.prototype.setInitiated = function (type) {
    if (type === void 0) {
      type = 0;
    }
    this.initiated = type;
  };
  ActionsHandler.prototype.start = function (e) {
    var _eventType = eventTypeMap[e.type];
    if (this.initiated && this.initiated !== _eventType) {
      return;
    }
    this.setInitiated(_eventType);
    // if textarea or other html tags in options.tagException is manipulated
    // do not make bs scroll
    if (tagExceptionFn(e.target, this.options.tagException)) {
      this.setInitiated();
      return;
    }
    // only allow mouse left button
    if (_eventType === 2 /* Mouse */ && e.button !== 0 /* Left */) return;
    if (this.hooks.trigger(this.hooks.eventTypes.beforeStart, e)) {
      return;
    }
    this.beforeHandler(e, 'start');
    var point = e.touches ? e.touches[0] : e;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    this.hooks.trigger(this.hooks.eventTypes.start, e);
  };
  ActionsHandler.prototype.move = function (e) {
    if (eventTypeMap[e.type] !== this.initiated) {
      return;
    }
    this.beforeHandler(e, 'move');
    var point = e.touches ? e.touches[0] : e;
    var deltaX = point.pageX - this.pointX;
    var deltaY = point.pageY - this.pointY;
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    if (this.hooks.trigger(this.hooks.eventTypes.move, {
      deltaX: deltaX,
      deltaY: deltaY,
      e: e
    })) {
      return;
    }
    // auto end when out of viewport
    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var pX = this.pointX - scrollLeft;
    var pY = this.pointY - scrollTop;
    var autoEndDistance = this.options.autoEndDistance;
    if (pX > document.documentElement.clientWidth - autoEndDistance || pY > document.documentElement.clientHeight - autoEndDistance || pX < autoEndDistance || pY < autoEndDistance) {
      this.end(e);
    }
  };
  ActionsHandler.prototype.end = function (e) {
    if (eventTypeMap[e.type] !== this.initiated) {
      return;
    }
    this.setInitiated();
    this.beforeHandler(e, 'end');
    this.hooks.trigger(this.hooks.eventTypes.end, e);
  };
  ActionsHandler.prototype.click = function (e) {
    this.hooks.trigger(this.hooks.eventTypes.click, e);
  };
  ActionsHandler.prototype.setContent = function (content) {
    if (content !== this.wrapper) {
      this.wrapper = content;
      this.rebindDOMEvents();
    }
  };
  ActionsHandler.prototype.rebindDOMEvents = function () {
    this.wrapperEventRegister.destroy();
    this.targetEventRegister.destroy();
    this.handleDOMEvents();
  };
  ActionsHandler.prototype.destroy = function () {
    this.wrapperEventRegister.destroy();
    this.targetEventRegister.destroy();
    this.hooks.destroy();
  };
  return ActionsHandler;
}();
var translaterMetaData = {
  x: ['translateX', 'px'],
  y: ['translateY', 'px']
};
var Translater = /** @class */function () {
  function Translater(content) {
    this.setContent(content);
    this.hooks = new EventEmitter(['beforeTranslate', 'translate']);
  }
  Translater.prototype.getComputedPosition = function () {
    var cssStyle = window.getComputedStyle(this.content, null);
    var matrix = cssStyle[style.transform].split(')')[0].split(', ');
    var x = +(matrix[12] || matrix[4]) || 0;
    var y = +(matrix[13] || matrix[5]) || 0;
    return {
      x: x,
      y: y
    };
  };
  Translater.prototype.translate = function (point) {
    var transformStyle = [];
    Object.keys(point).forEach(function (key) {
      if (!translaterMetaData[key]) {
        return;
      }
      var transformFnName = translaterMetaData[key][0];
      if (transformFnName) {
        var transformFnArgUnit = translaterMetaData[key][1];
        var transformFnArg = point[key];
        transformStyle.push(transformFnName + "(" + transformFnArg + transformFnArgUnit + ")");
      }
    });
    this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, transformStyle, point);
    this.style[style.transform] = transformStyle.join(' ');
    this.hooks.trigger(this.hooks.eventTypes.translate, point);
  };
  Translater.prototype.setContent = function (content) {
    if (this.content !== content) {
      this.content = content;
      this.style = content.style;
    }
  };
  Translater.prototype.destroy = function () {
    this.hooks.destroy();
  };
  return Translater;
}();
var Base = /** @class */function () {
  function Base(content, translater, options) {
    this.translater = translater;
    this.options = options;
    this.timer = 0;
    this.hooks = new EventEmitter(['move', 'end', 'beforeForceStop', 'forceStop', 'callStop', 'time', 'timeFunction']);
    this.setContent(content);
  }
  Base.prototype.translate = function (endPoint) {
    this.translater.translate(endPoint);
  };
  Base.prototype.setPending = function (pending) {
    this.pending = pending;
  };
  Base.prototype.setForceStopped = function (forceStopped) {
    this.forceStopped = forceStopped;
  };
  Base.prototype.setCallStop = function (called) {
    this.callStopWhenPending = called;
  };
  Base.prototype.setContent = function (content) {
    if (this.content !== content) {
      this.content = content;
      this.style = content.style;
      this.stop();
    }
  };
  Base.prototype.clearTimer = function () {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = 0;
    }
  };
  Base.prototype.destroy = function () {
    this.hooks.destroy();
    cancelAnimationFrame(this.timer);
  };
  return Base;
}();

// iOS 13.6 - 14.x, window.getComputedStyle sometimes will get wrong transform value
// when bs use transition mode
// eg: translateY -100px -> -200px, when the last frame which is about to scroll to -200px
// window.getComputedStyle(this.content) will calculate transformY to be -100px(startPoint)
// it is weird
// so we should validate position caculated by 'window.getComputedStyle'
var isValidPostion = function isValidPostion(startPoint, endPoint, currentPos, prePos) {
  var computeDirection = function computeDirection(endValue, startValue) {
    var delta = endValue - startValue;
    var direction = delta > 0 ? -1 /* Negative */ : delta < 0 ? 1 /* Positive */ : 0 /* Default */;
    return direction;
  };
  var directionX = computeDirection(endPoint.x, startPoint.x);
  var directionY = computeDirection(endPoint.y, startPoint.y);
  var deltaX = currentPos.x - prePos.x;
  var deltaY = currentPos.y - prePos.y;
  return directionX * deltaX <= 0 && directionY * deltaY <= 0;
};
var Transition = /** @class */function (_super) {
  __extends(Transition, _super);
  function Transition() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Transition.prototype.startProbe = function (startPoint, endPoint) {
    var _this = this;
    var prePos = startPoint;
    var probe = function probe() {
      var pos = _this.translater.getComputedPosition();
      if (isValidPostion(startPoint, endPoint, pos, prePos)) {
        _this.hooks.trigger(_this.hooks.eventTypes.move, pos);
      }
      // call bs.stop() should not dispatch end hook again.
      // forceStop hook will do this.
      /* istanbul ignore if  */
      if (!_this.pending) {
        if (_this.callStopWhenPending) {
          _this.callStopWhenPending = false;
        } else {
          // transition ends should dispatch end hook.
          _this.hooks.trigger(_this.hooks.eventTypes.end, pos);
        }
      }
      prePos = pos;
      if (_this.pending) {
        _this.timer = requestAnimationFrame(probe);
      }
    };
    // when manually call bs.stop(), then bs.scrollTo()
    // we should reset callStopWhenPending to dispatch end hook
    if (this.callStopWhenPending) {
      this.setCallStop(false);
    }
    cancelAnimationFrame(this.timer);
    probe();
  };
  Transition.prototype.transitionTime = function (time) {
    if (time === void 0) {
      time = 0;
    }
    this.style[style.transitionDuration] = time + 'ms';
    this.hooks.trigger(this.hooks.eventTypes.time, time);
  };
  Transition.prototype.transitionTimingFunction = function (easing) {
    this.style[style.transitionTimingFunction] = easing;
    this.hooks.trigger(this.hooks.eventTypes.timeFunction, easing);
  };
  Transition.prototype.transitionProperty = function () {
    this.style[style.transitionProperty] = style.transform;
  };
  Transition.prototype.move = function (startPoint, endPoint, time, easingFn) {
    this.setPending(time > 0);
    this.transitionTimingFunction(easingFn);
    this.transitionProperty();
    this.transitionTime(time);
    this.translate(endPoint);
    var isRealtimeProbeType = this.options.probeType === 3 /* Realtime */;
    if (time && isRealtimeProbeType) {
      this.startProbe(startPoint, endPoint);
    }
    // if we change content's transformY in a tick
    // such as: 0 -> 50px -> 0
    // transitionend will not be triggered
    // so we forceupdate by reflow
    if (!time) {
      this._reflow = this.content.offsetHeight;
      if (isRealtimeProbeType) {
        this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
      }
      this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
    }
  };
  Transition.prototype.doStop = function () {
    var pending = this.pending;
    this.setForceStopped(false);
    this.setCallStop(false);
    // still in transition
    if (pending) {
      this.setPending(false);
      cancelAnimationFrame(this.timer);
      var _a = this.translater.getComputedPosition(),
        x = _a.x,
        y = _a.y;
      this.transitionTime();
      this.translate({
        x: x,
        y: y
      });
      this.setForceStopped(true);
      this.setCallStop(true);
      this.hooks.trigger(this.hooks.eventTypes.forceStop, {
        x: x,
        y: y
      });
    }
    return pending;
  };
  Transition.prototype.stop = function () {
    var stopFromTransition = this.doStop();
    if (stopFromTransition) {
      this.hooks.trigger(this.hooks.eventTypes.callStop);
    }
  };
  return Transition;
}(Base);
var Animation = /** @class */function (_super) {
  __extends(Animation, _super);
  function Animation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Animation.prototype.move = function (startPoint, endPoint, time, easingFn) {
    // time is 0
    if (!time) {
      this.translate(endPoint);
      if (this.options.probeType === 3 /* Realtime */) {
        this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
      }
      this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
      return;
    }
    this.animate(startPoint, endPoint, time, easingFn);
  };
  Animation.prototype.animate = function (startPoint, endPoint, duration, easingFn) {
    var _this = this;
    var startTime = getNow();
    var destTime = startTime + duration;
    var isRealtimeProbeType = this.options.probeType === 3 /* Realtime */;
    var step = function step() {
      var now = getNow();
      // js animation end
      if (now >= destTime) {
        _this.translate(endPoint);
        if (isRealtimeProbeType) {
          _this.hooks.trigger(_this.hooks.eventTypes.move, endPoint);
        }
        _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
        return;
      }
      now = (now - startTime) / duration;
      var easing = easingFn(now);
      var newPoint = {};
      Object.keys(endPoint).forEach(function (key) {
        var startValue = startPoint[key];
        var endValue = endPoint[key];
        newPoint[key] = (endValue - startValue) * easing + startValue;
      });
      _this.translate(newPoint);
      if (isRealtimeProbeType) {
        _this.hooks.trigger(_this.hooks.eventTypes.move, newPoint);
      }
      if (_this.pending) {
        _this.timer = requestAnimationFrame(step);
      }
      // call bs.stop() should not dispatch end hook again.
      // forceStop hook will do this.
      /* istanbul ignore if  */
      if (!_this.pending) {
        if (_this.callStopWhenPending) {
          _this.callStopWhenPending = false;
        } else {
          // raf ends should dispatch end hook.
          _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
        }
      }
    };
    this.setPending(true);
    // when manually call bs.stop(), then bs.scrollTo()
    // we should reset callStopWhenPending to dispatch end hook
    if (this.callStopWhenPending) {
      this.setCallStop(false);
    }
    cancelAnimationFrame(this.timer);
    step();
  };
  Animation.prototype.doStop = function () {
    var pending = this.pending;
    this.setForceStopped(false);
    this.setCallStop(false);
    // still in requestFrameAnimation
    if (pending) {
      this.setPending(false);
      cancelAnimationFrame(this.timer);
      var pos = this.translater.getComputedPosition();
      this.setForceStopped(true);
      this.setCallStop(true);
      this.hooks.trigger(this.hooks.eventTypes.forceStop, pos);
    }
    return pending;
  };
  Animation.prototype.stop = function () {
    var stopFromAnimation = this.doStop();
    if (stopFromAnimation) {
      this.hooks.trigger(this.hooks.eventTypes.callStop);
    }
  };
  return Animation;
}(Base);
function createAnimater(element, translater, options) {
  var useTransition = options.useTransition;
  var animaterOptions = {};
  Object.defineProperty(animaterOptions, 'probeType', {
    enumerable: true,
    configurable: false,
    get: function get() {
      return options.probeType;
    }
  });
  if (useTransition) {
    return new Transition(element, translater, animaterOptions);
  } else {
    return new Animation(element, translater, animaterOptions);
  }
}
var Behavior = /** @class */function () {
  function Behavior(wrapper, content, options) {
    this.wrapper = wrapper;
    this.options = options;
    this.hooks = new EventEmitter(['beforeComputeBoundary', 'computeBoundary', 'momentum', 'end', 'ignoreHasScroll']);
    this.refresh(content);
  }
  Behavior.prototype.start = function () {
    this.dist = 0;
    this.setMovingDirection(0 /* Default */);
    this.setDirection(0 /* Default */);
  };

  Behavior.prototype.move = function (delta) {
    delta = this.hasScroll ? delta : 0;
    this.setMovingDirection(delta);
    return this.performDampingAlgorithm(delta, this.options.outOfBoundaryDampingFactor);
  };
  Behavior.prototype.setMovingDirection = function (delta) {
    this.movingDirection = delta > 0 ? -1 /* Negative */ : delta < 0 ? 1 /* Positive */ : 0 /* Default */;
  };

  Behavior.prototype.setDirection = function (delta) {
    this.direction = delta > 0 ? -1 /* Negative */ : delta < 0 ? 1 /* Positive */ : 0 /* Default */;
  };

  Behavior.prototype.performDampingAlgorithm = function (delta, dampingFactor) {
    var newPos = this.currentPos + delta;
    // Slow down or stop if outside of the boundaries
    if (newPos > this.minScrollPos || newPos < this.maxScrollPos) {
      if (newPos > this.minScrollPos && this.options.bounces[0] || newPos < this.maxScrollPos && this.options.bounces[1]) {
        newPos = this.currentPos + delta * dampingFactor;
      } else {
        newPos = newPos > this.minScrollPos ? this.minScrollPos : this.maxScrollPos;
      }
    }
    return newPos;
  };
  Behavior.prototype.end = function (duration) {
    var momentumInfo = {
      duration: 0
    };
    var absDist = Math.abs(this.currentPos - this.startPos);
    // start momentum animation if needed
    if (this.options.momentum && duration < this.options.momentumLimitTime && absDist > this.options.momentumLimitDistance) {
      var wrapperSize = this.direction === -1 /* Negative */ && this.options.bounces[0] || this.direction === 1 /* Positive */ && this.options.bounces[1] ? this.wrapperSize : 0;
      momentumInfo = this.hasScroll ? this.momentum(this.currentPos, this.startPos, duration, this.maxScrollPos, this.minScrollPos, wrapperSize, this.options) : {
        destination: this.currentPos,
        duration: 0
      };
    } else {
      this.hooks.trigger(this.hooks.eventTypes.end, momentumInfo);
    }
    return momentumInfo;
  };
  Behavior.prototype.momentum = function (current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
    if (options === void 0) {
      options = this.options;
    }
    var distance = current - start;
    var speed = Math.abs(distance) / time;
    var deceleration = options.deceleration,
      swipeBounceTime = options.swipeBounceTime,
      swipeTime = options.swipeTime;
    var duration = Math.min(swipeTime, speed * 2 / deceleration);
    var momentumData = {
      destination: current + speed * speed / deceleration * (distance < 0 ? -1 : 1),
      duration: duration,
      rate: 15
    };
    this.hooks.trigger(this.hooks.eventTypes.momentum, momentumData, distance);
    if (momentumData.destination < lowerMargin) {
      momentumData.destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / momentumData.rate * speed) : lowerMargin;
      momentumData.duration = swipeBounceTime;
    } else if (momentumData.destination > upperMargin) {
      momentumData.destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / momentumData.rate * speed) : upperMargin;
      momentumData.duration = swipeBounceTime;
    }
    momentumData.destination = Math.round(momentumData.destination);
    return momentumData;
  };
  Behavior.prototype.updateDirection = function () {
    var absDist = this.currentPos - this.absStartPos;
    this.setDirection(absDist);
  };
  Behavior.prototype.refresh = function (content) {
    var _a = this.options.rect,
      size = _a.size,
      position = _a.position;
    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
    // Force reflow
    var wrapperRect = getRect(this.wrapper);
    // use client is more fair than offset
    this.wrapperSize = this.wrapper[size === 'width' ? 'clientWidth' : 'clientHeight'];
    this.setContent(content);
    var contentRect = getRect(this.content);
    this.contentSize = contentRect[size];
    this.relativeOffset = contentRect[position];
    /* istanbul ignore if  */
    if (isWrapperStatic) {
      this.relativeOffset -= wrapperRect[position];
    }
    this.computeBoundary();
    this.setDirection(0 /* Default */);
  };

  Behavior.prototype.setContent = function (content) {
    if (content !== this.content) {
      this.content = content;
      this.resetState();
    }
  };
  Behavior.prototype.resetState = function () {
    this.currentPos = 0;
    this.startPos = 0;
    this.dist = 0;
    this.setDirection(0 /* Default */);
    this.setMovingDirection(0 /* Default */);
    this.resetStartPos();
  };
  Behavior.prototype.computeBoundary = function () {
    this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
    var boundary = {
      minScrollPos: 0,
      maxScrollPos: this.wrapperSize - this.contentSize
    };
    if (boundary.maxScrollPos < 0) {
      boundary.maxScrollPos -= this.relativeOffset;
      if (this.options.specifiedIndexAsContent === 0) {
        boundary.minScrollPos = -this.relativeOffset;
      }
    }
    this.hooks.trigger(this.hooks.eventTypes.computeBoundary, boundary);
    this.minScrollPos = boundary.minScrollPos;
    this.maxScrollPos = boundary.maxScrollPos;
    this.hasScroll = this.options.scrollable && this.maxScrollPos < this.minScrollPos;
    if (!this.hasScroll && this.minScrollPos < this.maxScrollPos) {
      this.maxScrollPos = this.minScrollPos;
      this.contentSize = this.wrapperSize;
    }
  };
  Behavior.prototype.updatePosition = function (pos) {
    this.currentPos = pos;
  };
  Behavior.prototype.getCurrentPos = function () {
    return this.currentPos;
  };
  Behavior.prototype.checkInBoundary = function () {
    var position = this.adjustPosition(this.currentPos);
    var inBoundary = position === this.getCurrentPos();
    return {
      position: position,
      inBoundary: inBoundary
    };
  };
  // adjust position when out of boundary
  Behavior.prototype.adjustPosition = function (pos) {
    if (!this.hasScroll && !this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll)) {
      pos = this.minScrollPos;
    } else if (pos > this.minScrollPos) {
      pos = this.minScrollPos;
    } else if (pos < this.maxScrollPos) {
      pos = this.maxScrollPos;
    }
    return pos;
  };
  Behavior.prototype.updateStartPos = function () {
    this.startPos = this.currentPos;
  };
  Behavior.prototype.updateAbsStartPos = function () {
    this.absStartPos = this.currentPos;
  };
  Behavior.prototype.resetStartPos = function () {
    this.updateStartPos();
    this.updateAbsStartPos();
  };
  Behavior.prototype.getAbsDist = function (delta) {
    this.dist += delta;
    return Math.abs(this.dist);
  };
  Behavior.prototype.destroy = function () {
    this.hooks.destroy();
  };
  return Behavior;
}();
exports.Behavior = Behavior;
var _a, _b, _c, _d;
var PassthroughHandlers = (_a = {}, _a["yes" /* Yes */] = function (e) {
  return true;
}, _a["no" /* No */] = function (e) {
  maybePrevent(e);
  return false;
}, _a);
var DirectionMap = (_b = {}, _b["horizontal" /* Horizontal */] = (_c = {}, _c["yes" /* Yes */] = "horizontal" /* Horizontal */, _c["no" /* No */] = "vertical" /* Vertical */, _c), _b["vertical" /* Vertical */] = (_d = {}, _d["yes" /* Yes */] = "vertical" /* Vertical */, _d["no" /* No */] = "horizontal" /* Horizontal */, _d), _b);
var DirectionLockAction = /** @class */function () {
  function DirectionLockAction(directionLockThreshold, freeScroll, eventPassthrough) {
    this.directionLockThreshold = directionLockThreshold;
    this.freeScroll = freeScroll;
    this.eventPassthrough = eventPassthrough;
    this.reset();
  }
  DirectionLockAction.prototype.reset = function () {
    this.directionLocked = "" /* Default */;
  };

  DirectionLockAction.prototype.checkMovingDirection = function (absDistX, absDistY, e) {
    this.computeDirectionLock(absDistX, absDistY);
    return this.handleEventPassthrough(e);
  };
  DirectionLockAction.prototype.adjustDelta = function (deltaX, deltaY) {
    if (this.directionLocked === "horizontal" /* Horizontal */) {
      deltaY = 0;
    } else if (this.directionLocked === "vertical" /* Vertical */) {
      deltaX = 0;
    }
    return {
      deltaX: deltaX,
      deltaY: deltaY
    };
  };
  DirectionLockAction.prototype.computeDirectionLock = function (absDistX, absDistY) {
    // If you are scrolling in one direction, lock it
    if (this.directionLocked === "" /* Default */ && !this.freeScroll) {
      if (absDistX > absDistY + this.directionLockThreshold) {
        this.directionLocked = "horizontal" /* Horizontal */; // lock horizontally
      } else if (absDistY >= absDistX + this.directionLockThreshold) {
        this.directionLocked = "vertical" /* Vertical */; // lock vertically
      } else {
        this.directionLocked = "none" /* None */; // no lock
      }
    }
  };

  DirectionLockAction.prototype.handleEventPassthrough = function (e) {
    var handleMap = DirectionMap[this.directionLocked];
    if (handleMap) {
      if (this.eventPassthrough === handleMap["yes" /* Yes */]) {
        return PassthroughHandlers["yes" /* Yes */](e);
      } else if (this.eventPassthrough === handleMap["no" /* No */]) {
        return PassthroughHandlers["no" /* No */](e);
      }
    }
    return false;
  };
  return DirectionLockAction;
}();
var applyQuadrantTransformation = function applyQuadrantTransformation(deltaX, deltaY, quadrant) {
  if (quadrant === 2 /* Second */) {
    return [deltaY, -deltaX];
  } else if (quadrant === 3 /* Third */) {
    return [-deltaX, -deltaY];
  } else if (quadrant === 4 /* Forth */) {
    return [-deltaY, deltaX];
  } else {
    return [deltaX, deltaY];
  }
};
var ScrollerActions = /** @class */function () {
  function ScrollerActions(scrollBehaviorX, scrollBehaviorY, actionsHandler, animater, options) {
    this.hooks = new EventEmitter(['start', 'beforeMove', 'scrollStart', 'scroll', 'beforeEnd', 'end', 'scrollEnd', 'contentNotMoved', 'detectMovingDirection', 'coordinateTransformation']);
    this.scrollBehaviorX = scrollBehaviorX;
    this.scrollBehaviorY = scrollBehaviorY;
    this.actionsHandler = actionsHandler;
    this.animater = animater;
    this.options = options;
    this.directionLockAction = new DirectionLockAction(options.directionLockThreshold, options.freeScroll, options.eventPassthrough);
    this.enabled = true;
    this.bindActionsHandler();
  }
  ScrollerActions.prototype.bindActionsHandler = function () {
    var _this = this;
    // [mouse|touch]start event
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function (e) {
      if (!_this.enabled) return true;
      return _this.handleStart(e);
    });
    // [mouse|touch]move event
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function (_a) {
      var deltaX = _a.deltaX,
        deltaY = _a.deltaY,
        e = _a.e;
      if (!_this.enabled) return true;
      var _b = applyQuadrantTransformation(deltaX, deltaY, _this.options.quadrant),
        transformateDeltaX = _b[0],
        transformateDeltaY = _b[1];
      var transformateDeltaData = {
        deltaX: transformateDeltaX,
        deltaY: transformateDeltaY
      };
      _this.hooks.trigger(_this.hooks.eventTypes.coordinateTransformation, transformateDeltaData);
      return _this.handleMove(transformateDeltaData.deltaX, transformateDeltaData.deltaY, e);
    });
    // [mouse|touch]end event
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function (e) {
      if (!_this.enabled) return true;
      return _this.handleEnd(e);
    });
    // click
    this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function (e) {
      // handle native click event
      if (_this.enabled && !e._constructed) {
        _this.handleClick(e);
      }
    });
  };
  ScrollerActions.prototype.handleStart = function (e) {
    var timestamp = getNow();
    this.fingerMoved = false;
    this.contentMoved = false;
    this.startTime = timestamp;
    this.directionLockAction.reset();
    this.scrollBehaviorX.start();
    this.scrollBehaviorY.start();
    // force stopping last transition or animation
    this.animater.doStop();
    this.scrollBehaviorX.resetStartPos();
    this.scrollBehaviorY.resetStartPos();
    this.hooks.trigger(this.hooks.eventTypes.start, e);
  };
  ScrollerActions.prototype.handleMove = function (deltaX, deltaY, e) {
    if (this.hooks.trigger(this.hooks.eventTypes.beforeMove, e)) {
      return;
    }
    var absDistX = this.scrollBehaviorX.getAbsDist(deltaX);
    var absDistY = this.scrollBehaviorY.getAbsDist(deltaY);
    var timestamp = getNow();
    // We need to move at least momentumLimitDistance pixels
    // for the scrolling to initiate
    if (this.checkMomentum(absDistX, absDistY, timestamp)) {
      return true;
    }
    if (this.directionLockAction.checkMovingDirection(absDistX, absDistY, e)) {
      this.actionsHandler.setInitiated();
      return true;
    }
    var delta = this.directionLockAction.adjustDelta(deltaX, deltaY);
    var prevX = this.scrollBehaviorX.getCurrentPos();
    var newX = this.scrollBehaviorX.move(delta.deltaX);
    var prevY = this.scrollBehaviorY.getCurrentPos();
    var newY = this.scrollBehaviorY.move(delta.deltaY);
    if (this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
      return;
    }
    if (!this.fingerMoved) {
      this.fingerMoved = true;
    }
    var positionChanged = newX !== prevX || newY !== prevY;
    if (!this.contentMoved && !positionChanged) {
      this.hooks.trigger(this.hooks.eventTypes.contentNotMoved);
    }
    if (!this.contentMoved && positionChanged) {
      this.contentMoved = true;
      this.hooks.trigger(this.hooks.eventTypes.scrollStart);
    }
    if (this.contentMoved && positionChanged) {
      this.animater.translate({
        x: newX,
        y: newY
      });
      this.dispatchScroll(timestamp);
    }
  };
  ScrollerActions.prototype.dispatchScroll = function (timestamp) {
    // dispatch scroll in interval time
    if (timestamp - this.startTime > this.options.momentumLimitTime) {
      // refresh time and starting position to initiate a momentum
      this.startTime = timestamp;
      this.scrollBehaviorX.updateStartPos();
      this.scrollBehaviorY.updateStartPos();
      if (this.options.probeType === 1 /* Throttle */) {
        this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
      }
    }
    // dispatch scroll all the time
    if (this.options.probeType > 1 /* Throttle */) {
      this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
    }
  };
  ScrollerActions.prototype.checkMomentum = function (absDistX, absDistY, timestamp) {
    return timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance;
  };
  ScrollerActions.prototype.handleEnd = function (e) {
    if (this.hooks.trigger(this.hooks.eventTypes.beforeEnd, e)) {
      return;
    }
    var currentPos = this.getCurrentPos();
    this.scrollBehaviorX.updateDirection();
    this.scrollBehaviorY.updateDirection();
    if (this.hooks.trigger(this.hooks.eventTypes.end, e, currentPos)) {
      return true;
    }
    currentPos = this.ensureIntegerPos(currentPos);
    this.animater.translate(currentPos);
    this.endTime = getNow();
    var duration = this.endTime - this.startTime;
    this.hooks.trigger(this.hooks.eventTypes.scrollEnd, currentPos, duration);
  };
  ScrollerActions.prototype.ensureIntegerPos = function (currentPos) {
    this.ensuringInteger = true;
    var x = currentPos.x,
      y = currentPos.y;
    var _a = this.scrollBehaviorX,
      minScrollPosX = _a.minScrollPos,
      maxScrollPosX = _a.maxScrollPos;
    var _b = this.scrollBehaviorY,
      minScrollPosY = _b.minScrollPos,
      maxScrollPosY = _b.maxScrollPos;
    x = x > 0 ? Math.ceil(x) : Math.floor(x);
    y = y > 0 ? Math.ceil(y) : Math.floor(y);
    x = between(x, maxScrollPosX, minScrollPosX);
    y = between(y, maxScrollPosY, minScrollPosY);
    return {
      x: x,
      y: y
    };
  };
  ScrollerActions.prototype.handleClick = function (e) {
    if (!preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
      maybePrevent(e);
      e.stopPropagation();
    }
  };
  ScrollerActions.prototype.getCurrentPos = function () {
    return {
      x: this.scrollBehaviorX.getCurrentPos(),
      y: this.scrollBehaviorY.getCurrentPos()
    };
  };
  ScrollerActions.prototype.refresh = function () {
    this.endTime = 0;
  };
  ScrollerActions.prototype.destroy = function () {
    this.hooks.destroy();
  };
  return ScrollerActions;
}();
function createActionsHandlerOptions(bsOptions) {
  var options = ['click', 'bindToWrapper', 'disableMouse', 'disableTouch', 'preventDefault', 'stopPropagation', 'tagException', 'preventDefaultException', 'autoEndDistance'].reduce(function (prev, cur) {
    prev[cur] = bsOptions[cur];
    return prev;
  }, {});
  return options;
}
function createBehaviorOptions(bsOptions, extraProp, bounces, rect) {
  var options = ['momentum', 'momentumLimitTime', 'momentumLimitDistance', 'deceleration', 'swipeBounceTime', 'swipeTime', 'outOfBoundaryDampingFactor', 'specifiedIndexAsContent'].reduce(function (prev, cur) {
    prev[cur] = bsOptions[cur];
    return prev;
  }, {});
  // add extra property
  options.scrollable = !!bsOptions[extraProp];
  options.bounces = bounces;
  options.rect = rect;
  return options;
}
function bubbling(source, target, events) {
  events.forEach(function (event) {
    var sourceEvent;
    var targetEvent;
    if (typeof event === 'string') {
      sourceEvent = targetEvent = event;
    } else {
      sourceEvent = event.source;
      targetEvent = event.target;
    }
    source.on(sourceEvent, function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return target.trigger.apply(target, __spreadArrays([targetEvent], args));
    });
  });
}
function isSamePoint(startPoint, endPoint) {
  // keys of startPoint and endPoint should be equal
  var keys = Object.keys(startPoint);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    if (startPoint[key] !== endPoint[key]) return false;
  }
  return true;
}
var MIN_SCROLL_DISTANCE = 1;
var Scroller = /** @class */function () {
  function Scroller(wrapper, content, options) {
    this.wrapper = wrapper;
    this.content = content;
    this.resizeTimeout = 0;
    this.hooks = new EventEmitter(['beforeStart', 'beforeMove', 'beforeScrollStart', 'scrollStart', 'scroll', 'beforeEnd', 'scrollEnd', 'resize', 'touchEnd', 'end', 'flick', 'scrollCancel', 'momentum', 'scrollTo', 'minDistanceScroll', 'scrollToElement', 'beforeRefresh']);
    this.options = options;
    var _a = this.options.bounce,
      left = _a.left,
      right = _a.right,
      top = _a.top,
      bottom = _a.bottom;
    // direction X
    this.scrollBehaviorX = new Behavior(wrapper, content, createBehaviorOptions(options, 'scrollX', [left, right], {
      size: 'width',
      position: 'left'
    }));
    // direction Y
    this.scrollBehaviorY = new Behavior(wrapper, content, createBehaviorOptions(options, 'scrollY', [top, bottom], {
      size: 'height',
      position: 'top'
    }));
    this.translater = new Translater(this.content);
    this.animater = createAnimater(this.content, this.translater, this.options);
    this.actionsHandler = new ActionsHandler(this.options.bindToTarget ? this.content : wrapper, createActionsHandlerOptions(this.options));
    this.actions = new ScrollerActions(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
    var resizeHandler = this.resize.bind(this);
    this.resizeRegister = new EventRegister(window, [{
      name: 'orientationchange',
      handler: resizeHandler
    }, {
      name: 'resize',
      handler: resizeHandler
    }]);
    this.registerTransitionEnd();
    this.init();
  }
  Scroller.prototype.init = function () {
    var _this = this;
    this.bindTranslater();
    this.bindAnimater();
    this.bindActions();
    // enable pointer events when scrolling ends
    this.hooks.on(this.hooks.eventTypes.scrollEnd, function () {
      _this.togglePointerEvents(true);
    });
  };
  Scroller.prototype.registerTransitionEnd = function () {
    this.transitionEndRegister = new EventRegister(this.content, [{
      name: style.transitionEnd,
      handler: this.transitionEnd.bind(this)
    }]);
  };
  Scroller.prototype.bindTranslater = function () {
    var _this = this;
    var hooks = this.translater.hooks;
    hooks.on(hooks.eventTypes.beforeTranslate, function (transformStyle) {
      if (_this.options.translateZ) {
        transformStyle.push(_this.options.translateZ);
      }
    });
    // disable pointer events when scrolling
    hooks.on(hooks.eventTypes.translate, function (pos) {
      var prevPos = _this.getCurrentPos();
      _this.updatePositions(pos);
      // scrollEnd will dispatch when scroll is force stopping in touchstart handler
      // so in touchend handler, don't toggle pointer-events
      if (_this.actions.ensuringInteger === true) {
        _this.actions.ensuringInteger = false;
        return;
      }
      // a valid translate
      if (pos.x !== prevPos.x || pos.y !== prevPos.y) {
        _this.togglePointerEvents(false);
      }
    });
  };
  Scroller.prototype.bindAnimater = function () {
    var _this = this;
    // reset position
    this.animater.hooks.on(this.animater.hooks.eventTypes.end, function (pos) {
      if (!_this.resetPosition(_this.options.bounceTime)) {
        _this.animater.setPending(false);
        _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
      }
    });
    bubbling(this.animater.hooks, this.hooks, [{
      source: this.animater.hooks.eventTypes.move,
      target: this.hooks.eventTypes.scroll
    }, {
      source: this.animater.hooks.eventTypes.forceStop,
      target: this.hooks.eventTypes.scrollEnd
    }]);
  };
  Scroller.prototype.bindActions = function () {
    var _this = this;
    var actions = this.actions;
    bubbling(actions.hooks, this.hooks, [{
      source: actions.hooks.eventTypes.start,
      target: this.hooks.eventTypes.beforeStart
    }, {
      source: actions.hooks.eventTypes.start,
      target: this.hooks.eventTypes.beforeScrollStart
    }, {
      source: actions.hooks.eventTypes.beforeMove,
      target: this.hooks.eventTypes.beforeMove
    }, {
      source: actions.hooks.eventTypes.scrollStart,
      target: this.hooks.eventTypes.scrollStart
    }, {
      source: actions.hooks.eventTypes.scroll,
      target: this.hooks.eventTypes.scroll
    }, {
      source: actions.hooks.eventTypes.beforeEnd,
      target: this.hooks.eventTypes.beforeEnd
    }]);
    actions.hooks.on(actions.hooks.eventTypes.end, function (e, pos) {
      _this.hooks.trigger(_this.hooks.eventTypes.touchEnd, pos);
      if (_this.hooks.trigger(_this.hooks.eventTypes.end, pos)) {
        return true;
      }
      // check if it is a click operation
      if (!actions.fingerMoved) {
        _this.hooks.trigger(_this.hooks.eventTypes.scrollCancel);
        if (_this.checkClick(e)) {
          return true;
        }
      }
      // reset if we are outside of the boundaries
      if (_this.resetPosition(_this.options.bounceTime, ease.bounce)) {
        _this.animater.setForceStopped(false);
        return true;
      }
    });
    actions.hooks.on(actions.hooks.eventTypes.scrollEnd, function (pos, duration) {
      var deltaX = Math.abs(pos.x - _this.scrollBehaviorX.startPos);
      var deltaY = Math.abs(pos.y - _this.scrollBehaviorY.startPos);
      if (_this.checkFlick(duration, deltaX, deltaY)) {
        _this.animater.setForceStopped(false);
        _this.hooks.trigger(_this.hooks.eventTypes.flick);
        return;
      }
      if (_this.momentum(pos, duration)) {
        _this.animater.setForceStopped(false);
        return;
      }
      if (actions.contentMoved) {
        _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
      }
      if (_this.animater.forceStopped) {
        _this.animater.setForceStopped(false);
      }
    });
  };
  Scroller.prototype.checkFlick = function (duration, deltaX, deltaY) {
    var flickMinMovingDistance = 1; // distinguish flick from click
    if (this.hooks.events.flick.length > 1 && duration < this.options.flickLimitTime && deltaX < this.options.flickLimitDistance && deltaY < this.options.flickLimitDistance && (deltaY > flickMinMovingDistance || deltaX > flickMinMovingDistance)) {
      return true;
    }
  };
  Scroller.prototype.momentum = function (pos, duration) {
    var meta = {
      time: 0,
      easing: ease.swiper,
      newX: pos.x,
      newY: pos.y
    };
    // start momentum animation if needed
    var momentumX = this.scrollBehaviorX.end(duration);
    var momentumY = this.scrollBehaviorY.end(duration);
    meta.newX = isUndef(momentumX.destination) ? meta.newX : momentumX.destination;
    meta.newY = isUndef(momentumY.destination) ? meta.newY : momentumY.destination;
    meta.time = Math.max(momentumX.duration, momentumY.duration);
    this.hooks.trigger(this.hooks.eventTypes.momentum, meta, this);
    // when x or y changed, do momentum animation now!
    if (meta.newX !== pos.x || meta.newY !== pos.y) {
      // change easing function when scroller goes out of the boundaries
      if (meta.newX > this.scrollBehaviorX.minScrollPos || meta.newX < this.scrollBehaviorX.maxScrollPos || meta.newY > this.scrollBehaviorY.minScrollPos || meta.newY < this.scrollBehaviorY.maxScrollPos) {
        meta.easing = ease.swipeBounce;
      }
      this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing);
      return true;
    }
  };
  Scroller.prototype.checkClick = function (e) {
    var cancelable = {
      preventClick: this.animater.forceStopped
    };
    // we scrolled less than momentumLimitDistance pixels
    if (this.hooks.trigger(this.hooks.eventTypes.checkClick)) {
      this.animater.setForceStopped(false);
      return true;
    }
    if (!cancelable.preventClick) {
      var _dblclick = this.options.dblclick;
      var dblclickTrigged = false;
      if (_dblclick && this.lastClickTime) {
        var _a = _dblclick.delay,
          delay = _a === void 0 ? 300 : _a;
        if (getNow() - this.lastClickTime < delay) {
          dblclickTrigged = true;
          dblclick(e);
        }
      }
      if (this.options.tap) {
        tap(e, this.options.tap);
      }
      if (this.options.click && !preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
        click(e);
      }
      this.lastClickTime = dblclickTrigged ? null : getNow();
      return true;
    }
    return false;
  };
  Scroller.prototype.resize = function () {
    var _this = this;
    if (!this.actions.enabled) {
      return;
    }
    // fix a scroll problem under Android condition
    /* istanbul ignore if  */
    if (isAndroid) {
      this.wrapper.scrollTop = 0;
    }
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(function () {
      _this.hooks.trigger(_this.hooks.eventTypes.resize);
    }, this.options.resizePolling);
  };
  /* istanbul ignore next */
  Scroller.prototype.transitionEnd = function (e) {
    if (e.target !== this.content || !this.animater.pending) {
      return;
    }
    var animater = this.animater;
    animater.transitionTime();
    if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
      this.animater.setPending(false);
      if (this.options.probeType !== 3 /* Realtime */) {
        this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos());
      }
    }
  };
  Scroller.prototype.togglePointerEvents = function (enabled) {
    if (enabled === void 0) {
      enabled = true;
    }
    var el = this.content.children.length ? this.content.children : [this.content];
    var pointerEvents = enabled ? 'auto' : 'none';
    for (var i = 0; i < el.length; i++) {
      var node = el[i];
      // ignore BetterScroll instance's wrapper DOM
      /* istanbul ignore if  */
      if (node.isBScrollContainer) {
        continue;
      }
      node.style.pointerEvents = pointerEvents;
    }
  };
  Scroller.prototype.refresh = function (content) {
    var contentChanged = this.setContent(content);
    this.hooks.trigger(this.hooks.eventTypes.beforeRefresh);
    this.scrollBehaviorX.refresh(content);
    this.scrollBehaviorY.refresh(content);
    if (contentChanged) {
      this.translater.setContent(content);
      this.animater.setContent(content);
      this.transitionEndRegister.destroy();
      this.registerTransitionEnd();
      if (this.options.bindToTarget) {
        this.actionsHandler.setContent(content);
      }
    }
    this.actions.refresh();
    this.wrapperOffset = offset(this.wrapper);
  };
  Scroller.prototype.setContent = function (content) {
    var contentChanged = content !== this.content;
    if (contentChanged) {
      this.content = content;
    }
    return contentChanged;
  };
  Scroller.prototype.scrollBy = function (deltaX, deltaY, time, easing) {
    if (time === void 0) {
      time = 0;
    }
    var _a = this.getCurrentPos(),
      x = _a.x,
      y = _a.y;
    easing = !easing ? ease.bounce : easing;
    deltaX += x;
    deltaY += y;
    this.scrollTo(deltaX, deltaY, time, easing);
  };
  Scroller.prototype.scrollTo = function (x, y, time, easing, extraTransform) {
    if (time === void 0) {
      time = 0;
    }
    if (easing === void 0) {
      easing = ease.bounce;
    }
    if (extraTransform === void 0) {
      extraTransform = {
        start: {},
        end: {}
      };
    }
    var easingFn = this.options.useTransition ? easing.style : easing.fn;
    var currentPos = this.getCurrentPos();
    var startPoint = _assign({
      x: currentPos.x,
      y: currentPos.y
    }, extraTransform.start);
    var endPoint = _assign({
      x: x,
      y: y
    }, extraTransform.end);
    this.hooks.trigger(this.hooks.eventTypes.scrollTo, endPoint);
    // it is an useless move
    if (isSamePoint(startPoint, endPoint)) return;
    var deltaX = Math.abs(endPoint.x - startPoint.x);
    var deltaY = Math.abs(endPoint.y - startPoint.y);
    // considering of browser compatibility for decimal transform value
    // force translating immediately
    if (deltaX < MIN_SCROLL_DISTANCE && deltaY < MIN_SCROLL_DISTANCE) {
      time = 0;
      this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll);
    }
    this.animater.move(startPoint, endPoint, time, easingFn);
  };
  Scroller.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
    var targetEle = getElement(el);
    var pos = offset(targetEle);
    var getOffset = function getOffset(offset, size, wrapperSize) {
      if (typeof offset === 'number') {
        return offset;
      }
      // if offsetX/Y are true we center the element to the screen
      return offset ? Math.round(size / 2 - wrapperSize / 2) : 0;
    };
    offsetX = getOffset(offsetX, targetEle.offsetWidth, this.wrapper.offsetWidth);
    offsetY = getOffset(offsetY, targetEle.offsetHeight, this.wrapper.offsetHeight);
    var getPos = function getPos(pos, wrapperPos, offset, scrollBehavior) {
      pos -= wrapperPos;
      pos = scrollBehavior.adjustPosition(pos - offset);
      return pos;
    };
    pos.left = getPos(pos.left, this.wrapperOffset.left, offsetX, this.scrollBehaviorX);
    pos.top = getPos(pos.top, this.wrapperOffset.top, offsetY, this.scrollBehaviorY);
    if (this.hooks.trigger(this.hooks.eventTypes.scrollToElement, targetEle, pos)) {
      return;
    }
    this.scrollTo(pos.left, pos.top, time, easing);
  };
  Scroller.prototype.resetPosition = function (time, easing) {
    if (time === void 0) {
      time = 0;
    }
    if (easing === void 0) {
      easing = ease.bounce;
    }
    var _a = this.scrollBehaviorX.checkInBoundary(),
      x = _a.position,
      xInBoundary = _a.inBoundary;
    var _b = this.scrollBehaviorY.checkInBoundary(),
      y = _b.position,
      yInBoundary = _b.inBoundary;
    if (xInBoundary && yInBoundary) {
      return false;
    }
    /* istanbul ignore if  */
    if (isIOSBadVersion) {
      // fix ios 13.4 bouncing
      // see it in issues 982
      this.reflow();
    }
    // out of boundary
    this.scrollTo(x, y, time, easing);
    return true;
  };
  /* istanbul ignore next */
  Scroller.prototype.reflow = function () {
    this._reflow = this.content.offsetHeight;
  };
  Scroller.prototype.updatePositions = function (pos) {
    this.scrollBehaviorX.updatePosition(pos.x);
    this.scrollBehaviorY.updatePosition(pos.y);
  };
  Scroller.prototype.getCurrentPos = function () {
    return this.actions.getCurrentPos();
  };
  Scroller.prototype.enable = function () {
    this.actions.enabled = true;
  };
  Scroller.prototype.disable = function () {
    cancelAnimationFrame(this.animater.timer);
    this.actions.enabled = false;
  };
  Scroller.prototype.destroy = function () {
    var _this = this;
    var keys = ['resizeRegister', 'transitionEndRegister', 'actionsHandler', 'actions', 'hooks', 'animater', 'translater', 'scrollBehaviorX', 'scrollBehaviorY'];
    keys.forEach(function (key) {
      return _this[key].destroy();
    });
  };
  return Scroller;
}();
var BScrollConstructor = /** @class */function (_super) {
  __extends(BScrollConstructor, _super);
  function BScrollConstructor(el, options) {
    var _this = _super.call(this, ['refresh', 'contentChanged', 'enable', 'disable', 'beforeScrollStart', 'scrollStart', 'scroll', 'scrollEnd', 'scrollCancel', 'touchEnd', 'flick', 'destroy']) || this;
    var wrapper = getElement(el);
    if (!wrapper) {
      warn('Can not resolve the wrapper DOM.');
      return _this;
    }
    _this.plugins = {};
    _this.options = new OptionsConstructor().merge(options).process();
    if (!_this.setContent(wrapper).valid) {
      return _this;
    }
    _this.hooks = new EventEmitter(['refresh', 'enable', 'disable', 'destroy', 'beforeInitialScrollTo', 'contentChanged']);
    _this.init(wrapper);
    return _this;
  }
  BScrollConstructor.use = function (ctor) {
    var name = ctor.pluginName;
    var installed = BScrollConstructor.plugins.some(function (plugin) {
      return ctor === plugin.ctor;
    });
    if (installed) return BScrollConstructor;
    if (isUndef(name)) {
      warn("Plugin Class must specify plugin's name in static property by 'pluginName' field.");
      return BScrollConstructor;
    }
    BScrollConstructor.pluginsMap[name] = true;
    BScrollConstructor.plugins.push({
      name: name,
      applyOrder: ctor.applyOrder,
      ctor: ctor
    });
    return BScrollConstructor;
  };
  BScrollConstructor.prototype.setContent = function (wrapper) {
    var contentChanged = false;
    var valid = true;
    var content = wrapper.children[this.options.specifiedIndexAsContent];
    if (!content) {
      warn('The wrapper need at least one child element to be content element to scroll.');
      valid = false;
    } else {
      contentChanged = this.content !== content;
      if (contentChanged) {
        this.content = content;
      }
    }
    return {
      valid: valid,
      contentChanged: contentChanged
    };
  };
  BScrollConstructor.prototype.init = function (wrapper) {
    var _this = this;
    this.wrapper = wrapper;
    // mark wrapper to recognize bs instance by DOM attribute
    wrapper.isBScrollContainer = true;
    this.scroller = new Scroller(wrapper, this.content, this.options);
    this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function () {
      _this.refresh();
    });
    this.eventBubbling();
    this.handleAutoBlur();
    this.enable();
    this.proxy(propertiesConfig$7);
    this.applyPlugins();
    // maybe boundary has changed, should refresh
    this.refreshWithoutReset(this.content);
    var _a = this.options,
      startX = _a.startX,
      startY = _a.startY;
    var position = {
      x: startX,
      y: startY
    };
    // maybe plugins want to control scroll position
    if (this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, position)) {
      return;
    }
    this.scroller.scrollTo(position.x, position.y);
  };
  BScrollConstructor.prototype.applyPlugins = function () {
    var _this = this;
    var options = this.options;
    BScrollConstructor.plugins.sort(function (a, b) {
      var _a;
      var applyOrderMap = (_a = {}, _a["pre" /* Pre */] = -1, _a["post" /* Post */] = 1, _a);
      var aOrder = a.applyOrder ? applyOrderMap[a.applyOrder] : 0;
      var bOrder = b.applyOrder ? applyOrderMap[b.applyOrder] : 0;
      return aOrder - bOrder;
    }).forEach(function (item) {
      var ctor = item.ctor;
      if (options[item.name] && typeof ctor === 'function') {
        _this.plugins[item.name] = new ctor(_this);
      }
    });
  };
  BScrollConstructor.prototype.handleAutoBlur = function () {
    /* istanbul ignore if  */
    if (this.options.autoBlur) {
      this.on(this.eventTypes.beforeScrollStart, function () {
        var activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          activeElement.blur();
        }
      });
    }
  };
  BScrollConstructor.prototype.eventBubbling = function () {
    bubbling(this.scroller.hooks, this, [this.eventTypes.beforeScrollStart, this.eventTypes.scrollStart, this.eventTypes.scroll, this.eventTypes.scrollEnd, this.eventTypes.scrollCancel, this.eventTypes.touchEnd, this.eventTypes.flick]);
  };
  BScrollConstructor.prototype.refreshWithoutReset = function (content) {
    this.scroller.refresh(content);
    this.hooks.trigger(this.hooks.eventTypes.refresh, content);
    this.trigger(this.eventTypes.refresh, content);
  };
  BScrollConstructor.prototype.proxy = function (propertiesConfig) {
    var _this = this;
    propertiesConfig.forEach(function (_a) {
      var key = _a.key,
        sourceKey = _a.sourceKey;
      propertiesProxy(_this, sourceKey, key);
    });
  };
  BScrollConstructor.prototype.refresh = function () {
    var _a = this.setContent(this.wrapper),
      contentChanged = _a.contentChanged,
      valid = _a.valid;
    if (valid) {
      var content = this.content;
      this.refreshWithoutReset(content);
      if (contentChanged) {
        this.hooks.trigger(this.hooks.eventTypes.contentChanged, content);
        this.trigger(this.eventTypes.contentChanged, content);
      }
      this.scroller.resetPosition();
    }
  };
  BScrollConstructor.prototype.enable = function () {
    this.scroller.enable();
    this.hooks.trigger(this.hooks.eventTypes.enable);
    this.trigger(this.eventTypes.enable);
  };
  BScrollConstructor.prototype.disable = function () {
    this.scroller.disable();
    this.hooks.trigger(this.hooks.eventTypes.disable);
    this.trigger(this.eventTypes.disable);
  };
  BScrollConstructor.prototype.destroy = function () {
    this.hooks.trigger(this.hooks.eventTypes.destroy);
    this.trigger(this.eventTypes.destroy);
    this.scroller.destroy();
  };
  BScrollConstructor.prototype.eventRegister = function (names) {
    this.registerType(names);
  };
  BScrollConstructor.plugins = [];
  BScrollConstructor.pluginsMap = {};
  return BScrollConstructor;
}(EventEmitter);
function createBScroll(el, options) {
  var bs = new BScrollConstructor(el, options);
  return bs;
}
createBScroll.use = BScrollConstructor.use;
createBScroll.plugins = BScrollConstructor.plugins;
createBScroll.pluginsMap = BScrollConstructor.pluginsMap;
var BScroll = createBScroll;
exports.default = BScroll;
var MouseWheel = /** @class */function () {
  function MouseWheel(scroll) {
    this.scroll = scroll;
    this.wheelEndTimer = 0;
    this.wheelMoveTimer = 0;
    this.wheelStart = false;
    this.init();
  }
  MouseWheel.prototype.init = function () {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.registerEvent();
  };
  MouseWheel.prototype.handleBScroll = function () {
    this.scroll.registerType(['alterOptions', 'mousewheelStart', 'mousewheelMove', 'mousewheelEnd']);
  };
  MouseWheel.prototype.handleOptions = function () {
    var userOptions = this.scroll.options.mouseWheel === true ? {} : this.scroll.options.mouseWheel;
    var defaultOptions = {
      speed: 20,
      invert: false,
      easeTime: 300,
      discreteTime: 400,
      throttleTime: 0,
      dampingFactor: 0.1
    };
    this.mouseWheelOpt = extend(defaultOptions, userOptions);
  };
  MouseWheel.prototype.handleHooks = function () {
    this.hooksFn = [];
    this.registerHooks(this.scroll.hooks, 'destroy', this.destroy);
  };
  MouseWheel.prototype.registerEvent = function () {
    this.eventRegister = new EventRegister(this.scroll.scroller.wrapper, [{
      name: 'wheel',
      handler: this.wheelHandler.bind(this)
    }, {
      name: 'mousewheel',
      handler: this.wheelHandler.bind(this)
    }, {
      name: 'DOMMouseScroll',
      handler: this.wheelHandler.bind(this)
    }]);
  };
  MouseWheel.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  MouseWheel.prototype.wheelHandler = function (e) {
    if (!this.scroll.enabled) {
      return;
    }
    this.beforeHandler(e);
    // start
    if (!this.wheelStart) {
      this.wheelStartHandler(e);
      this.wheelStart = true;
    }
    // move
    var delta = this.getWheelDelta(e);
    this.wheelMoveHandler(delta);
    // end
    this.wheelEndDetector(delta);
  };
  MouseWheel.prototype.wheelStartHandler = function (e) {
    this.cleanCache();
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    scrollBehaviorX.setMovingDirection(0 /* Default */);
    scrollBehaviorY.setMovingDirection(0 /* Default */);
    scrollBehaviorX.setDirection(0 /* Default */);
    scrollBehaviorY.setDirection(0 /* Default */);
    this.scroll.trigger(this.scroll.eventTypes.alterOptions, this.mouseWheelOpt);
    this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
  };
  MouseWheel.prototype.cleanCache = function () {
    this.deltaCache = [];
  };
  MouseWheel.prototype.wheelMoveHandler = function (delta) {
    var _this = this;
    var _a = this.mouseWheelOpt,
      throttleTime = _a.throttleTime,
      dampingFactor = _a.dampingFactor;
    if (throttleTime && this.wheelMoveTimer) {
      this.deltaCache.push(delta);
    } else {
      var cachedDelta = this.deltaCache.reduce(function (prev, current) {
        return {
          x: prev.x + current.x,
          y: prev.y + current.y
        };
      }, {
        x: 0,
        y: 0
      });
      this.cleanCache();
      var _b = this.scroll.scroller,
        scrollBehaviorX = _b.scrollBehaviorX,
        scrollBehaviorY = _b.scrollBehaviorY;
      scrollBehaviorX.setMovingDirection(-delta.directionX);
      scrollBehaviorY.setMovingDirection(-delta.directionY);
      scrollBehaviorX.setDirection(delta.x);
      scrollBehaviorY.setDirection(delta.y);
      // when out of boundary, perform a damping scroll
      var newX = scrollBehaviorX.performDampingAlgorithm(Math.round(delta.x) + cachedDelta.x, dampingFactor);
      var newY = scrollBehaviorY.performDampingAlgorithm(Math.round(delta.y) + cachedDelta.x, dampingFactor);
      if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
        x: newX,
        y: newY
      })) {
        var easeTime = this.getEaseTime();
        if (newX !== this.scroll.x || newY !== this.scroll.y) {
          this.scroll.scrollTo(newX, newY, easeTime);
        }
      }
      if (throttleTime) {
        this.wheelMoveTimer = window.setTimeout(function () {
          _this.wheelMoveTimer = 0;
        }, throttleTime);
      }
    }
  };
  MouseWheel.prototype.wheelEndDetector = function (delta) {
    var _this = this;
    window.clearTimeout(this.wheelEndTimer);
    this.wheelEndTimer = window.setTimeout(function () {
      _this.wheelStart = false;
      window.clearTimeout(_this.wheelMoveTimer);
      _this.wheelMoveTimer = 0;
      _this.scroll.trigger(_this.scroll.eventTypes.mousewheelEnd, delta);
    }, this.mouseWheelOpt.discreteTime);
  };
  MouseWheel.prototype.getWheelDelta = function (e) {
    var _a = this.mouseWheelOpt,
      speed = _a.speed,
      invert = _a.invert;
    var wheelDeltaX = 0;
    var wheelDeltaY = 0;
    var direction = invert ? -1 /* Negative */ : 1 /* Positive */;
    switch (true) {
      case 'deltaX' in e:
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * speed;
          wheelDeltaY = -e.deltaY * speed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
        break;
      case 'wheelDeltaX' in e:
        wheelDeltaX = e.wheelDeltaX / 120 * speed;
        wheelDeltaY = e.wheelDeltaY / 120 * speed;
        break;
      case 'wheelDelta' in e:
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
        break;
      case 'detail' in e:
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
        break;
    }
    wheelDeltaX *= direction;
    wheelDeltaY *= direction;
    if (!this.scroll.hasVerticalScroll) {
      if (Math.abs(wheelDeltaY) > Math.abs(wheelDeltaX)) {
        wheelDeltaX = wheelDeltaY;
      }
      wheelDeltaY = 0;
    }
    if (!this.scroll.hasHorizontalScroll) {
      wheelDeltaX = 0;
    }
    var directionX = wheelDeltaX > 0 ? -1 /* Negative */ : wheelDeltaX < 0 ? 1 /* Positive */ : 0 /* Default */;
    var directionY = wheelDeltaY > 0 ? -1 /* Negative */ : wheelDeltaY < 0 ? 1 /* Positive */ : 0 /* Default */;
    return {
      x: wheelDeltaX,
      y: wheelDeltaY,
      directionX: directionX,
      directionY: directionY
    };
  };
  MouseWheel.prototype.beforeHandler = function (e) {
    var _a = this.scroll.options,
      preventDefault = _a.preventDefault,
      stopPropagation = _a.stopPropagation,
      preventDefaultException = _a.preventDefaultException;
    if (preventDefault && !preventDefaultExceptionFn(e.target, preventDefaultException)) {
      maybePrevent(e);
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
  };
  MouseWheel.prototype.getEaseTime = function () {
    var SAFE_EASETIME = 100;
    var easeTime = this.mouseWheelOpt.easeTime;
    // scrollEnd event will be triggered in every calling of scrollTo when easeTime is too small
    // easeTime needs to be greater than 100
    if (easeTime < SAFE_EASETIME) {
      warn("easeTime should be greater than 100." + "If mouseWheel easeTime is too small," + "scrollEnd will be triggered many times.");
    }
    return Math.max(easeTime, SAFE_EASETIME);
  };
  MouseWheel.prototype.destroy = function () {
    this.eventRegister.destroy();
    window.clearTimeout(this.wheelEndTimer);
    window.clearTimeout(this.wheelMoveTimer);
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
  };
  MouseWheel.pluginName = 'mouseWheel';
  MouseWheel.applyOrder = "pre" /* Pre */;
  return MouseWheel;
}();
exports.MouseWheel = MouseWheel;
var ObserveDOM = /** @class */function () {
  function ObserveDOM(scroll) {
    this.scroll = scroll;
    this.stopObserver = false;
    this.init();
  }
  ObserveDOM.prototype.init = function () {
    this.handleMutationObserver();
    this.handleHooks();
  };
  ObserveDOM.prototype.handleMutationObserver = function () {
    var _this = this;
    if (typeof MutationObserver !== 'undefined') {
      var timer_1 = 0;
      this.observer = new MutationObserver(function (mutations) {
        _this.mutationObserverHandler(mutations, timer_1);
      });
      this.startObserve(this.observer);
    } else {
      this.checkDOMUpdate();
    }
  };
  ObserveDOM.prototype.handleHooks = function () {
    var _this = this;
    this.hooksFn = [];
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
      _this.stopObserve();
      // launch a new mutationObserver
      _this.handleMutationObserver();
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.enable, function () {
      if (_this.stopObserver) {
        _this.handleMutationObserver();
      }
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.disable, function () {
      _this.stopObserve();
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function () {
      _this.destroy();
    });
  };
  ObserveDOM.prototype.mutationObserverHandler = function (mutations, timer) {
    var _this = this;
    if (this.shouldNotRefresh()) {
      return;
    }
    var immediateRefresh = false;
    var deferredRefresh = false;
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (mutation.type !== 'attributes') {
        immediateRefresh = true;
        break;
      } else {
        if (mutation.target !== this.scroll.scroller.content) {
          deferredRefresh = true;
          break;
        }
      }
    }
    if (immediateRefresh) {
      this.scroll.refresh();
    } else if (deferredRefresh) {
      // attributes changes too often
      clearTimeout(timer);
      timer = window.setTimeout(function () {
        if (!_this.shouldNotRefresh()) {
          _this.scroll.refresh();
        }
      }, 60);
    }
  };
  ObserveDOM.prototype.startObserve = function (observer) {
    var config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    observer.observe(this.scroll.scroller.content, config);
  };
  ObserveDOM.prototype.shouldNotRefresh = function () {
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX,
      scrollBehaviorY = scroller.scrollBehaviorY;
    var outsideBoundaries = scrollBehaviorX.currentPos > scrollBehaviorX.minScrollPos || scrollBehaviorX.currentPos < scrollBehaviorX.maxScrollPos || scrollBehaviorY.currentPos > scrollBehaviorY.minScrollPos || scrollBehaviorY.currentPos < scrollBehaviorY.maxScrollPos;
    return scroller.animater.pending || outsideBoundaries;
  };
  ObserveDOM.prototype.checkDOMUpdate = function () {
    var _this = this;
    var content = this.scroll.scroller.content;
    var contentRect = getRect(content);
    var oldWidth = contentRect.width;
    var oldHeight = contentRect.height;
    var check = function check() {
      if (_this.stopObserver) {
        return;
      }
      contentRect = getRect(content);
      var newWidth = contentRect.width;
      var newHeight = contentRect.height;
      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        _this.scroll.refresh();
      }
      oldWidth = newWidth;
      oldHeight = newHeight;
      next();
    };
    var next = function next() {
      setTimeout(function () {
        check();
      }, 1000);
    };
    next();
  };
  ObserveDOM.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  ObserveDOM.prototype.stopObserve = function () {
    this.stopObserver = true;
    if (this.observer) {
      this.observer.disconnect();
    }
  };
  ObserveDOM.prototype.destroy = function () {
    this.stopObserve();
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  ObserveDOM.pluginName = 'observeDOM';
  return ObserveDOM;
}();
exports.ObserveDom = ObserveDOM;
var sourcePrefix$6 = 'plugins.pullDownRefresh';
var propertiesMap$6 = [{
  key: 'finishPullDown',
  name: 'finishPullDown'
}, {
  key: 'openPullDown',
  name: 'openPullDown'
}, {
  key: 'closePullDown',
  name: 'closePullDown'
}, {
  key: 'autoPullDownRefresh',
  name: 'autoPullDownRefresh'
}];
var propertiesConfig$6 = propertiesMap$6.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$6 + "." + item.name
  };
});
var PULLING_DOWN_EVENT = 'pullingDown';
var ENTER_THRESHOLD_EVENT = 'enterThreshold';
var LEAVE_THRESHOLD_EVENT = 'leaveThreshold';
var PullDown = /** @class */function () {
  function PullDown(scroll) {
    this.scroll = scroll;
    this.pulling = 0 /* DEFAULT */;
    this.thresholdBoundary = 0 /* DEFAULT */;
    this.init();
  }
  PullDown.prototype.setPulling = function (status) {
    this.pulling = status;
  };
  PullDown.prototype.setThresholdBoundary = function (boundary) {
    this.thresholdBoundary = boundary;
  };
  PullDown.prototype.init = function () {
    this.handleBScroll();
    this.handleOptions(this.scroll.options.pullDownRefresh);
    this.handleHooks();
    this.watch();
  };
  PullDown.prototype.handleBScroll = function () {
    this.scroll.registerType([PULLING_DOWN_EVENT, ENTER_THRESHOLD_EVENT, LEAVE_THRESHOLD_EVENT]);
    this.scroll.proxy(propertiesConfig$6);
  };
  PullDown.prototype.handleOptions = function (userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }
    userOptions = userOptions === true ? {} : userOptions;
    var defaultOptions = {
      threshold: 90,
      stop: 40
    };
    this.options = extend(defaultOptions, userOptions);
    this.scroll.options.probeType = 3 /* Realtime */;
  };

  PullDown.prototype.handleHooks = function () {
    var _this = this;
    this.hooksFn = [];
    var scroller = this.scroll.scroller;
    var scrollBehaviorY = scroller.scrollBehaviorY;
    this.currentMinScrollY = this.cachedOriginanMinScrollY = scrollBehaviorY.minScrollPos;
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
      _this.finishPullDown();
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
      // content is smaller than wrapper
      if (boundary.maxScrollPos > 0) {
        // allow scrolling when content is not full of wrapper
        boundary.maxScrollPos = -1;
      }
      boundary.minScrollPos = _this.currentMinScrollY;
    });
    // integrate with mousewheel
    if (this.hasMouseWheelPlugin()) {
      this.registerHooks(this.scroll, this.scroll.eventTypes.alterOptions, function (mouseWheelOptions) {
        var SANE_DISCRETE_TIME = 300;
        var SANE_EASE_TIME = 350;
        mouseWheelOptions.discreteTime = SANE_DISCRETE_TIME;
        // easeTime > discreteTime ensure goInto checkPullDown function
        mouseWheelOptions.easeTime = SANE_EASE_TIME;
      });
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function () {
        // mouseWheel need trigger checkPullDown manually
        scroller.hooks.trigger(scroller.hooks.eventTypes.end);
      });
    }
  };
  PullDown.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  PullDown.prototype.hasMouseWheelPlugin = function () {
    return !!this.scroll.eventTypes.alterOptions;
  };
  PullDown.prototype.watch = function () {
    var scroller = this.scroll.scroller;
    this.watching = true;
    this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.end, this.checkPullDown);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
    if (this.hasMouseWheelPlugin()) {
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
    }
  };
  PullDown.prototype.resetStateBeforeScrollStart = function () {
    // current fetching pulldownRefresh has ended
    if (!this.isFetchingStatus()) {
      this.setPulling(1 /* MOVING */);
      this.setThresholdBoundary(0 /* DEFAULT */);
    }
  };

  PullDown.prototype.checkLocationOfThresholdBoundary = function () {
    // pulldownRefresh is in the phase of Moving
    if (this.pulling === 1 /* MOVING */) {
      var scroll_1 = this.scroll;
      // enter threshold boundary
      var enteredThresholdBoundary = this.thresholdBoundary !== 1 /* INSIDE */ && this.locateInsideThresholdBoundary();
      // leave threshold boundary
      var leftThresholdBoundary = this.thresholdBoundary !== 2 /* OUTSIDE */ && !this.locateInsideThresholdBoundary();
      if (enteredThresholdBoundary) {
        this.setThresholdBoundary(1 /* INSIDE */);
        scroll_1.trigger(ENTER_THRESHOLD_EVENT);
      }
      if (leftThresholdBoundary) {
        this.setThresholdBoundary(2 /* OUTSIDE */);
        scroll_1.trigger(LEAVE_THRESHOLD_EVENT);
      }
    }
  };
  PullDown.prototype.locateInsideThresholdBoundary = function () {
    return this.scroll.y <= this.options.threshold;
  };
  PullDown.prototype.unwatch = function () {
    var scroll = this.scroll;
    var scroller = scroll.scroller;
    this.watching = false;
    scroller.hooks.off(scroller.hooks.eventTypes.end, this.checkPullDown);
    scroll.off(scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
    scroll.off(scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
    if (this.hasMouseWheelPlugin()) {
      scroll.off(scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
    }
  };
  PullDown.prototype.checkPullDown = function () {
    var _a = this.options,
      threshold = _a.threshold,
      stop = _a.stop;
    // check if a real pull down action
    if (this.scroll.y < threshold) {
      return false;
    }
    if (this.pulling === 1 /* MOVING */) {
      this.modifyBehaviorYBoundary(stop);
      this.setPulling(2 /* FETCHING */);
      this.scroll.trigger(PULLING_DOWN_EVENT);
    }
    this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
    return this.isFetchingStatus();
  };
  PullDown.prototype.isFetchingStatus = function () {
    return this.pulling === 2 /* FETCHING */;
  };

  PullDown.prototype.modifyBehaviorYBoundary = function (stopDistance) {
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    // manually modify minScrollPos for a hang animation
    // to prevent from resetPosition
    this.cachedOriginanMinScrollY = scrollBehaviorY.minScrollPos;
    this.currentMinScrollY = stopDistance;
    scrollBehaviorY.computeBoundary();
  };
  PullDown.prototype.finishPullDown = function () {
    if (this.isFetchingStatus()) {
      var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
      // restore minScrollY since the hang animation has ended
      this.currentMinScrollY = this.cachedOriginanMinScrollY;
      scrollBehaviorY.computeBoundary();
      this.setPulling(0 /* DEFAULT */);
      this.scroll.resetPosition(this.scroll.options.bounceTime, ease.bounce);
    }
  };
  // allow 'true' type is compat for beta version implements
  PullDown.prototype.openPullDown = function (config) {
    if (config === void 0) {
      config = {};
    }
    this.handleOptions(config);
    if (!this.watching) {
      this.watch();
    }
  };
  PullDown.prototype.closePullDown = function () {
    this.unwatch();
  };
  PullDown.prototype.autoPullDownRefresh = function () {
    var _a = this.options,
      threshold = _a.threshold,
      stop = _a.stop;
    if (this.isFetchingStatus() || !this.watching) {
      return;
    }
    this.modifyBehaviorYBoundary(stop);
    this.scroll.trigger(this.scroll.eventTypes.scrollStart);
    this.scroll.scrollTo(this.scroll.x, threshold);
    this.setPulling(2 /* FETCHING */);
    this.scroll.trigger(PULLING_DOWN_EVENT);
    this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
  };
  PullDown.pluginName = 'pullDownRefresh';
  return PullDown;
}();
exports.PullDownRefresh = PullDown;
var sourcePrefix$5 = 'plugins.pullUpLoad';
var propertiesMap$5 = [{
  key: 'finishPullUp',
  name: 'finishPullUp'
}, {
  key: 'openPullUp',
  name: 'openPullUp'
}, {
  key: 'closePullUp',
  name: 'closePullUp'
}, {
  key: 'autoPullUpLoad',
  name: 'autoPullUpLoad'
}];
var propertiesConfig$5 = propertiesMap$5.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$5 + "." + item.name
  };
});
var PULL_UP_HOOKS_NAME = 'pullingUp';
var PullUp = /** @class */function () {
  function PullUp(scroll) {
    this.scroll = scroll;
    this.pulling = false;
    this.watching = false;
    this.init();
  }
  PullUp.prototype.init = function () {
    this.handleBScroll();
    this.handleOptions(this.scroll.options.pullUpLoad);
    this.handleHooks();
    this.watch();
  };
  PullUp.prototype.handleBScroll = function () {
    this.scroll.registerType([PULL_UP_HOOKS_NAME]);
    this.scroll.proxy(propertiesConfig$5);
  };
  PullUp.prototype.handleOptions = function (userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }
    userOptions = userOptions === true ? {} : userOptions;
    var defaultOptions = {
      threshold: 0
    };
    this.options = extend(defaultOptions, userOptions);
    this.scroll.options.probeType = 3 /* Realtime */;
  };

  PullUp.prototype.handleHooks = function () {
    var _this = this;
    this.hooksFn = [];
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
      _this.finishPullUp();
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
      // content is smaller than wrapper
      if (boundary.maxScrollPos > 0) {
        // allow scrolling when content is not full of wrapper
        boundary.maxScrollPos = -1;
      }
    });
  };
  PullUp.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  PullUp.prototype.watch = function () {
    if (this.watching) {
      return;
    }
    this.watching = true;
    this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkPullUp);
  };
  PullUp.prototype.unwatch = function () {
    this.watching = false;
    this.scroll.off(this.scroll.eventTypes.scroll, this.checkPullUp);
  };
  PullUp.prototype.checkPullUp = function (pos) {
    var _this = this;
    var threshold = this.options.threshold;
    if (this.scroll.movingDirectionY === 1 /* Positive */ && pos.y <= this.scroll.maxScrollY + threshold) {
      this.pulling = true;
      // must reset pulling after scrollEnd
      this.scroll.once(this.scroll.eventTypes.scrollEnd, function () {
        _this.pulling = false;
      });
      this.unwatch();
      this.scroll.trigger(PULL_UP_HOOKS_NAME);
    }
  };
  PullUp.prototype.finishPullUp = function () {
    var _this = this;
    // reset Direction, fix #936
    this.scroll.scroller.scrollBehaviorY.setMovingDirection(0 /* Default */);
    if (this.pulling) {
      this.scroll.once(this.scroll.eventTypes.scrollEnd, function () {
        _this.watch();
      });
    } else {
      this.watch();
    }
  };
  // allow 'true' type is compat for beta version implements
  PullUp.prototype.openPullUp = function (config) {
    if (config === void 0) {
      config = {};
    }
    this.handleOptions(config);
    this.watch();
  };
  PullUp.prototype.closePullUp = function () {
    this.unwatch();
  };
  PullUp.prototype.autoPullUpLoad = function () {
    var threshold = this.options.threshold;
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    if (this.pulling || !this.watching) {
      return;
    }
    // simulate a pullUp action
    var NEGATIVE_VALUE = -1;
    var outOfBoundaryPos = scrollBehaviorY.maxScrollPos + threshold + NEGATIVE_VALUE;
    this.scroll.scroller.scrollBehaviorY.setMovingDirection(NEGATIVE_VALUE);
    this.scroll.scrollTo(this.scroll.x, outOfBoundaryPos, this.scroll.options.bounceTime);
  };
  PullUp.pluginName = 'pullUpLoad';
  return PullUp;
}();
exports.PullUpLoad = PullUp;
var EventHandler = /** @class */function () {
  function EventHandler(indicator, options) {
    this.indicator = indicator;
    this.options = options;
    this.hooks = new EventEmitter(['touchStart', 'touchMove', 'touchEnd']);
    this.registerEvents();
  }
  EventHandler.prototype.registerEvents = function () {
    var _a = this.options,
      disableMouse = _a.disableMouse,
      disableTouch = _a.disableTouch;
    var startEvents = [];
    var moveEvents = [];
    var endEvents = [];
    if (!disableMouse) {
      startEvents.push({
        name: 'mousedown',
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: 'mousemove',
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: 'mouseup',
        handler: this.end.bind(this)
      });
    }
    if (!disableTouch) {
      startEvents.push({
        name: 'touchstart',
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: 'touchmove',
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: 'touchend',
        handler: this.end.bind(this)
      }, {
        name: 'touchcancel',
        handler: this.end.bind(this)
      });
    }
    this.startEventRegister = new EventRegister(this.indicator.indicatorEl, startEvents);
    this.moveEventRegister = new EventRegister(window, moveEvents);
    this.endEventRegister = new EventRegister(window, endEvents);
  };
  EventHandler.prototype.BScrollIsDisabled = function () {
    return !this.indicator.scroll.enabled;
  };
  EventHandler.prototype.start = function (e) {
    if (this.BScrollIsDisabled()) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    maybePrevent(e);
    e.stopPropagation();
    this.initiated = true;
    this.lastPoint = point[this.indicator.keysMap.point];
    this.hooks.trigger(this.hooks.eventTypes.touchStart);
  };
  EventHandler.prototype.move = function (e) {
    if (!this.initiated) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    var pointPos = point[this.indicator.keysMap.point];
    maybePrevent(e);
    e.stopPropagation();
    var delta = pointPos - this.lastPoint;
    this.lastPoint = pointPos;
    this.hooks.trigger(this.hooks.eventTypes.touchMove, delta);
  };
  EventHandler.prototype.end = function (e) {
    if (!this.initiated) {
      return;
    }
    this.initiated = false;
    maybePrevent(e);
    e.stopPropagation();
    this.hooks.trigger(this.hooks.eventTypes.touchEnd);
  };
  EventHandler.prototype.destroy = function () {
    this.startEventRegister.destroy();
    this.moveEventRegister.destroy();
    this.endEventRegister.destroy();
  };
  return EventHandler;
}();
var Indicator$1 = /** @class */function () {
  function Indicator(scroll, options) {
    this.scroll = scroll;
    this.options = options;
    this.hooksFn = [];
    this.wrapper = options.wrapper;
    this.direction = options.direction;
    this.indicatorEl = this.wrapper.children[0];
    this.keysMap = this.getKeysMap();
    this.handleFade();
    this.handleHooks();
  }
  Indicator.prototype.handleFade = function () {
    if (this.options.fade) {
      this.wrapper.style.opacity = '0';
    }
  };
  Indicator.prototype.handleHooks = function () {
    var _this = this;
    var _a = this.options,
      fade = _a.fade,
      interactive = _a.interactive,
      scrollbarTrackClickable = _a.scrollbarTrackClickable;
    var scroll = this.scroll;
    var scrollHooks = scroll.hooks;
    var translaterHooks = scroll.scroller.translater.hooks;
    var animaterHooks = scroll.scroller.animater.hooks;
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refresh);
    this.registerHooks(translaterHooks, translaterHooks.eventTypes.translate, function (pos) {
      var hasScrollKey = _this.keysMap.hasScroll;
      if (_this.scroll[hasScrollKey]) {
        _this.updatePosition(pos);
      }
    });
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.time, this.transitionTime);
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.timeFunction, this.transitionTimingFunction);
    if (fade) {
      this.registerHooks(scroll, scroll.eventTypes.scrollEnd, function () {
        _this.fade();
      });
      this.registerHooks(scroll, scroll.eventTypes.scrollStart, function () {
        _this.fade(true);
      });
      // for mousewheel event
      if (scroll.eventTypes.mousewheelStart && scroll.eventTypes.mousewheelEnd) {
        this.registerHooks(scroll, scroll.eventTypes.mousewheelStart, function () {
          _this.fade(true);
        });
        this.registerHooks(scroll, scroll.eventTypes.mousewheelMove, function () {
          _this.fade(true);
        });
        this.registerHooks(scroll, scroll.eventTypes.mousewheelEnd, function () {
          _this.fade();
        });
      }
    }
    if (interactive) {
      var _b = this.scroll.options,
        disableMouse = _b.disableMouse,
        disableTouch = _b.disableTouch;
      this.eventHandler = new EventHandler(this, {
        disableMouse: disableMouse,
        disableTouch: disableTouch
      });
      var eventHandlerHooks = this.eventHandler.hooks;
      this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchStart, this.startHandler);
      this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchMove, this.moveHandler);
      this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchEnd, this.endHandler);
    }
    if (scrollbarTrackClickable) {
      this.bindClick();
    }
  };
  Indicator.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Indicator.prototype.bindClick = function () {
    var wrapper = this.wrapper;
    this.clickEventRegister = new EventRegister(wrapper, [{
      name: 'click',
      handler: this.handleClick.bind(this)
    }]);
  };
  Indicator.prototype.handleClick = function (e) {
    var newPos = this.calculateclickOffsetPos(e);
    var _a = this.scroll,
      x = _a.x,
      y = _a.y;
    x = this.direction === "horizontal" /* Horizontal */ ? newPos : x;
    y = this.direction === "vertical" /* Vertical */ ? newPos : y;
    this.scroll.scrollTo(x, y, this.options.scrollbarTrackOffsetTime);
  };
  Indicator.prototype.calculateclickOffsetPos = function (e) {
    var _a = this.keysMap,
      poinKey = _a.point,
      domRectKey = _a.domRect;
    var scrollbarTrackOffsetType = this.options.scrollbarTrackOffsetType;
    var clickPointOffset = e[poinKey] - this.wrapperRect[domRectKey];
    var scrollToWhere = clickPointOffset < this.currentPos ? -1 /* Up */ : 1 /* Down */;
    var delta = 0;
    var currentPos = this.currentPos;
    if (scrollbarTrackOffsetType === "step" /* Step */) {
      delta = this.scrollInfo.baseSize * scrollToWhere;
    } else {
      delta = 0;
      currentPos = clickPointOffset;
    }
    return this.newPos(currentPos, delta, this.scrollInfo);
  };
  Indicator.prototype.getKeysMap = function () {
    if (this.direction === "vertical" /* Vertical */) {
      return {
        hasScroll: 'hasVerticalScroll',
        size: 'height',
        wrapperSize: 'clientHeight',
        scrollerSize: 'scrollerHeight',
        maxScrollPos: 'maxScrollY',
        pos: 'y',
        point: 'pageY',
        translateProperty: 'translateY',
        domRect: 'top'
      };
    }
    return {
      hasScroll: 'hasHorizontalScroll',
      size: 'width',
      wrapperSize: 'clientWidth',
      scrollerSize: 'scrollerWidth',
      maxScrollPos: 'maxScrollX',
      pos: 'x',
      point: 'pageX',
      translateProperty: 'translateX',
      domRect: 'left'
    };
  };
  Indicator.prototype.fade = function (visible) {
    var _a = this.options,
      fadeInTime = _a.fadeInTime,
      fadeOutTime = _a.fadeOutTime;
    var time = visible ? fadeInTime : fadeOutTime;
    var wrapper = this.wrapper;
    wrapper.style[style.transitionDuration] = time + 'ms';
    wrapper.style.opacity = visible ? '1' : '0';
  };
  Indicator.prototype.refresh = function () {
    var hasScrollKey = this.keysMap.hasScroll;
    var scroll = this.scroll;
    var x = scroll.x,
      y = scroll.y;
    this.wrapperRect = this.wrapper.getBoundingClientRect();
    if (this.canScroll(scroll[hasScrollKey])) {
      var _a = this.keysMap,
        wrapperSizeKey = _a.wrapperSize,
        scrollerSizeKey = _a.scrollerSize,
        maxScrollPosKey = _a.maxScrollPos;
      this.scrollInfo = this.refreshScrollInfo(this.wrapper[wrapperSizeKey], scroll[scrollerSizeKey], scroll[maxScrollPosKey], this.indicatorEl[wrapperSizeKey]);
      this.updatePosition({
        x: x,
        y: y
      });
    }
  };
  Indicator.prototype.transitionTime = function (time) {
    if (time === void 0) {
      time = 0;
    }
    this.indicatorEl.style[style.transitionDuration] = time + 'ms';
  };
  Indicator.prototype.transitionTimingFunction = function (easing) {
    this.indicatorEl.style[style.transitionTimingFunction] = easing;
  };
  Indicator.prototype.canScroll = function (hasScroll) {
    this.wrapper.style.display = hasScroll ? 'block' : 'none';
    return hasScroll;
  };
  Indicator.prototype.refreshScrollInfo = function (wrapperSize, scrollerSize, maxScrollPos, indicatorElSize) {
    var baseSize = Math.max(Math.round(wrapperSize * wrapperSize / (scrollerSize || wrapperSize || 1)), this.options.minSize);
    if (this.options.isCustom) {
      baseSize = indicatorElSize;
    }
    var maxIndicatorScrollPos = wrapperSize - baseSize;
    // sizeRatio is negative
    var sizeRatio = maxIndicatorScrollPos / maxScrollPos;
    return {
      baseSize: baseSize,
      maxScrollPos: maxIndicatorScrollPos,
      minScrollPos: 0,
      sizeRatio: sizeRatio
    };
  };
  Indicator.prototype.updatePosition = function (point) {
    var _a = this.caculatePosAndSize(point, this.scrollInfo),
      pos = _a.pos,
      size = _a.size;
    this.refreshStyle(size, pos);
    this.currentPos = pos;
  };
  Indicator.prototype.caculatePosAndSize = function (point, scrollInfo) {
    var posKey = this.keysMap.pos;
    var sizeRatio = scrollInfo.sizeRatio,
      baseSize = scrollInfo.baseSize,
      maxScrollPos = scrollInfo.maxScrollPos,
      minScrollPos = scrollInfo.minScrollPos;
    var minSize = this.options.minSize;
    var pos = Math.round(sizeRatio * point[posKey]);
    var size;
    // when out of boundary, slow down size reduction
    if (pos < minScrollPos) {
      size = Math.max(baseSize + pos * 3, minSize);
      pos = minScrollPos;
    } else if (pos > maxScrollPos) {
      size = Math.max(baseSize - (pos - maxScrollPos) * 3, minSize);
      pos = maxScrollPos + baseSize - size;
    } else {
      size = baseSize;
    }
    return {
      pos: pos,
      size: size
    };
  };
  Indicator.prototype.refreshStyle = function (size, pos) {
    var _a = this.keysMap,
      translatePropertyKey = _a.translateProperty,
      sizeKey = _a.size;
    var translateZ = this.scroll.options.translateZ;
    this.indicatorEl.style[sizeKey] = size + "px";
    this.indicatorEl.style[style.transform] = translatePropertyKey + "(" + pos + "px)" + translateZ;
  };
  Indicator.prototype.startHandler = function () {
    this.moved = false;
    this.startTime = getNow();
    this.transitionTime();
    this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
  };
  Indicator.prototype.moveHandler = function (delta) {
    if (!this.moved && !this.indicatorNotMoved(delta)) {
      this.moved = true;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart);
    }
    if (this.moved) {
      var newPos = this.newPos(this.currentPos, delta, this.scrollInfo);
      this.syncBScroll(newPos);
    }
  };
  Indicator.prototype.endHandler = function () {
    if (this.moved) {
      var _a = this.scroll,
        x = _a.x,
        y = _a.y;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
        x: x,
        y: y
      });
    }
  };
  Indicator.prototype.indicatorNotMoved = function (delta) {
    var currentPos = this.currentPos;
    var _a = this.scrollInfo,
      maxScrollPos = _a.maxScrollPos,
      minScrollPos = _a.minScrollPos;
    var notMoved = currentPos === minScrollPos && delta <= 0 || currentPos === maxScrollPos && delta >= 0;
    return notMoved;
  };
  Indicator.prototype.syncBScroll = function (newPos) {
    var timestamp = getNow();
    var _a = this.scroll,
      x = _a.x,
      y = _a.y,
      options = _a.options,
      scroller = _a.scroller,
      maxScrollY = _a.maxScrollY,
      minScrollY = _a.minScrollY,
      maxScrollX = _a.maxScrollX,
      minScrollX = _a.minScrollX;
    var probeType = options.probeType,
      momentumLimitTime = options.momentumLimitTime;
    var position = {
      x: x,
      y: y
    };
    if (this.direction === "vertical" /* Vertical */) {
      position.y = between(newPos, maxScrollY, minScrollY);
    } else {
      position.x = between(newPos, maxScrollX, minScrollX);
    }
    scroller.translater.translate(position);
    // dispatch scroll in interval time
    if (timestamp - this.startTime > momentumLimitTime) {
      this.startTime = timestamp;
      if (probeType === 1 /* Throttle */) {
        scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, position);
      }
    }
    // dispatch scroll all the time
    if (probeType > 1 /* Throttle */) {
      scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, position);
    }
  };
  Indicator.prototype.newPos = function (currentPos, delta, scrollInfo) {
    var maxScrollPos = scrollInfo.maxScrollPos,
      sizeRatio = scrollInfo.sizeRatio,
      minScrollPos = scrollInfo.minScrollPos;
    var newPos = currentPos + delta;
    newPos = between(newPos, minScrollPos, maxScrollPos);
    return Math.round(newPos / sizeRatio);
  };
  Indicator.prototype.destroy = function () {
    var _a = this.options,
      interactive = _a.interactive,
      scrollbarTrackClickable = _a.scrollbarTrackClickable,
      isCustom = _a.isCustom;
    if (interactive) {
      this.eventHandler.destroy();
    }
    if (scrollbarTrackClickable) {
      this.clickEventRegister.destroy();
    }
    if (!isCustom) {
      this.wrapper.parentNode.removeChild(this.wrapper);
    }
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  return Indicator;
}();
var ScrollBar = /** @class */function () {
  function ScrollBar(scroll) {
    this.scroll = scroll;
    this.handleOptions();
    this.createIndicators();
    this.handleHooks();
  }
  ScrollBar.prototype.handleHooks = function () {
    var _this = this;
    var scroll = this.scroll;
    scroll.hooks.on(scroll.hooks.eventTypes.destroy, function () {
      for (var _i = 0, _a = _this.indicators; _i < _a.length; _i++) {
        var indicator = _a[_i];
        indicator.destroy();
      }
    });
  };
  ScrollBar.prototype.handleOptions = function () {
    var userOptions = this.scroll.options.scrollbar === true ? {} : this.scroll.options.scrollbar;
    var defaultOptions = {
      fade: true,
      fadeInTime: 250,
      fadeOutTime: 500,
      interactive: false,
      customElements: [],
      minSize: 8,
      scrollbarTrackClickable: false,
      scrollbarTrackOffsetType: "step" /* Step */,
      scrollbarTrackOffsetTime: 300
    };
    this.options = extend(defaultOptions, userOptions);
  };
  ScrollBar.prototype.createIndicators = function () {
    var indicatorOptions;
    var scroll = this.scroll;
    var indicators = [];
    var scrollDirectionConfigKeys = ['scrollX', 'scrollY'];
    var indicatorDirections = ["horizontal" /* Horizontal */, "vertical" /* Vertical */];

    var customScrollbarEls = this.options.customElements;
    for (var i = 0; i < scrollDirectionConfigKeys.length; i++) {
      var key = scrollDirectionConfigKeys[i];
      // wanna scroll in specified direction
      if (scroll.options[key]) {
        var customElement = customScrollbarEls.shift();
        var direction = indicatorDirections[i];
        var isCustom = false;
        var scrollbarWrapper = customElement ? customElement : this.createScrollbarElement(direction);
        // internal scrollbar
        if (scrollbarWrapper !== customElement) {
          scroll.wrapper.appendChild(scrollbarWrapper);
        } else {
          // custom scrollbar passed by users
          isCustom = true;
        }
        indicatorOptions = _assign(_assign({
          wrapper: scrollbarWrapper,
          direction: direction
        }, this.options), {
          isCustom: isCustom
        });
        indicators.push(new Indicator$1(scroll, indicatorOptions));
      }
    }
    this.indicators = indicators;
  };
  ScrollBar.prototype.createScrollbarElement = function (direction, scrollbarTrackClickable) {
    if (scrollbarTrackClickable === void 0) {
      scrollbarTrackClickable = this.options.scrollbarTrackClickable;
    }
    var scrollbarWrapperEl = document.createElement('div');
    var scrollbarIndicatorEl = document.createElement('div');
    scrollbarWrapperEl.style.cssText = 'position:absolute;z-index:9999;overflow:hidden;';
    scrollbarIndicatorEl.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';
    scrollbarIndicatorEl.className = 'bscroll-indicator';
    if (direction === "horizontal" /* Horizontal */) {
      scrollbarWrapperEl.style.cssText += 'height:7px;left:2px;right:2px;bottom:0;';
      scrollbarIndicatorEl.style.height = '100%';
      scrollbarWrapperEl.className = 'bscroll-horizontal-scrollbar';
    } else {
      scrollbarWrapperEl.style.cssText += 'width:7px;bottom:2px;top:2px;right:1px;';
      scrollbarIndicatorEl.style.width = '100%';
      scrollbarWrapperEl.className = 'bscroll-vertical-scrollbar';
    }
    if (!scrollbarTrackClickable) {
      scrollbarWrapperEl.style.cssText += 'pointer-events:none;';
    }
    scrollbarWrapperEl.appendChild(scrollbarIndicatorEl);
    return scrollbarWrapperEl;
  };
  ScrollBar.pluginName = 'scrollbar';
  return ScrollBar;
}();
exports.ScrollBar = ScrollBar;
var PagesMatrix = /** @class */function () {
  function PagesMatrix(scroll) {
    this.scroll = scroll;
    this.init();
  }
  PagesMatrix.prototype.init = function () {
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX,
      scrollBehaviorY = scroller.scrollBehaviorY;
    this.wrapperWidth = scrollBehaviorX.wrapperSize;
    this.wrapperHeight = scrollBehaviorY.wrapperSize;
    this.scrollerHeight = scrollBehaviorY.contentSize;
    this.scrollerWidth = scrollBehaviorX.contentSize;
    this.pages = this.buildPagesMatrix(this.wrapperWidth, this.wrapperHeight);
    this.pageLengthOfX = this.pages ? this.pages.length : 0;
    this.pageLengthOfY = this.pages && this.pages[0] ? this.pages[0].length : 0;
  };
  PagesMatrix.prototype.getPageStats = function (pageX, pageY) {
    return this.pages[pageX][pageY];
  };
  PagesMatrix.prototype.getNearestPageIndex = function (x, y) {
    var pageX = 0;
    var pageY = 0;
    var l = this.pages.length;
    for (; pageX < l - 1; pageX++) {
      if (x >= this.pages[pageX][0].cx) {
        break;
      }
    }
    l = this.pages[pageX].length;
    for (; pageY < l - 1; pageY++) {
      if (y >= this.pages[0][pageY].cy) {
        break;
      }
    }
    return {
      pageX: pageX,
      pageY: pageY
    };
  };
  // (n x 1) matrix for horizontal scroll or
  // (1 * n) matrix for vertical scroll
  PagesMatrix.prototype.buildPagesMatrix = function (stepX, stepY) {
    var pages = [];
    var x = 0;
    var y;
    var cx;
    var cy;
    var i = 0;
    var l;
    var maxScrollPosX = this.scroll.scroller.scrollBehaviorX.maxScrollPos;
    var maxScrollPosY = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
    cx = Math.round(stepX / 2);
    cy = Math.round(stepY / 2);
    while (x > -this.scrollerWidth) {
      pages[i] = [];
      l = 0;
      y = 0;
      while (y > -this.scrollerHeight) {
        pages[i][l] = {
          x: Math.max(x, maxScrollPosX),
          y: Math.max(y, maxScrollPosY),
          width: stepX,
          height: stepY,
          cx: x - cx,
          cy: y - cy
        };
        y -= stepY;
        l++;
      }
      x -= stepX;
      i++;
    }
    return pages;
  };
  return PagesMatrix;
}();
var BASE_PAGE = {
  pageX: 0,
  pageY: 0,
  x: 0,
  y: 0
};
var SlidePages = /** @class */function () {
  function SlidePages(scroll, slideOptions) {
    this.scroll = scroll;
    this.slideOptions = slideOptions;
    this.slideX = false;
    this.slideY = false;
    this.currentPage = extend({}, BASE_PAGE);
  }
  SlidePages.prototype.refresh = function () {
    this.pagesMatrix = new PagesMatrix(this.scroll);
    this.checkSlideLoop();
    this.currentPage = this.getAdjustedCurrentPage();
  };
  SlidePages.prototype.getAdjustedCurrentPage = function () {
    var _a = this.currentPage,
      pageX = _a.pageX,
      pageY = _a.pageY;
    // page index should be handled
    // because page counts may reduce
    pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 1);
    pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 1);
    // loop scene should also be respected
    // because clonedNode will cause pageLength increasing
    if (this.loopX) {
      pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 2);
    }
    if (this.loopY) {
      pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 2);
    }
    var _b = this.pagesMatrix.getPageStats(pageX, pageY),
      x = _b.x,
      y = _b.y;
    return {
      pageX: pageX,
      pageY: pageY,
      x: x,
      y: y
    };
  };
  SlidePages.prototype.setCurrentPage = function (newPage) {
    this.currentPage = newPage;
  };
  SlidePages.prototype.getInternalPage = function (pageX, pageY) {
    if (pageX >= this.pagesMatrix.pageLengthOfX) {
      pageX = this.pagesMatrix.pageLengthOfX - 1;
    } else if (pageX < 0) {
      pageX = 0;
    }
    if (pageY >= this.pagesMatrix.pageLengthOfY) {
      pageY = this.pagesMatrix.pageLengthOfY - 1;
    } else if (pageY < 0) {
      pageY = 0;
    }
    var _a = this.pagesMatrix.getPageStats(pageX, pageY),
      x = _a.x,
      y = _a.y;
    return {
      pageX: pageX,
      pageY: pageY,
      x: x,
      y: y
    };
  };
  SlidePages.prototype.getInitialPage = function (showFirstPage, firstInitialised) {
    if (showFirstPage === void 0) {
      showFirstPage = false;
    }
    if (firstInitialised === void 0) {
      firstInitialised = false;
    }
    var _a = this.slideOptions,
      startPageXIndex = _a.startPageXIndex,
      startPageYIndex = _a.startPageYIndex;
    var firstPageX = this.loopX ? 1 : 0;
    var firstPageY = this.loopY ? 1 : 0;
    var pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
    var pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
    if (firstInitialised) {
      pageX = this.loopX ? startPageXIndex + 1 : startPageXIndex;
      pageY = this.loopY ? startPageYIndex + 1 : startPageYIndex;
    } else {
      pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
      pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
    }
    var _b = this.pagesMatrix.getPageStats(pageX, pageY),
      x = _b.x,
      y = _b.y;
    return {
      pageX: pageX,
      pageY: pageY,
      x: x,
      y: y
    };
  };
  SlidePages.prototype.getExposedPage = function (page) {
    var exposedPage = extend({}, page);
    // only pageX or pageY need fix
    if (this.loopX) {
      exposedPage.pageX = this.fixedPage(exposedPage.pageX, this.pagesMatrix.pageLengthOfX - 2);
    }
    if (this.loopY) {
      exposedPage.pageY = this.fixedPage(exposedPage.pageY, this.pagesMatrix.pageLengthOfY - 2);
    }
    return exposedPage;
  };
  SlidePages.prototype.getExposedPageByPageIndex = function (pageIndexX, pageIndexY) {
    var page = {
      pageX: pageIndexX,
      pageY: pageIndexY
    };
    if (this.loopX) {
      page.pageX = pageIndexX + 1;
    }
    if (this.loopY) {
      page.pageY = pageIndexY + 1;
    }
    var _a = this.pagesMatrix.getPageStats(page.pageX, page.pageY),
      x = _a.x,
      y = _a.y;
    return {
      x: x,
      y: y,
      pageX: pageIndexX,
      pageY: pageIndexY
    };
  };
  SlidePages.prototype.getWillChangedPage = function (page) {
    page = extend({}, page);
    // Page need fix
    if (this.loopX) {
      page.pageX = this.fixedPage(page.pageX, this.pagesMatrix.pageLengthOfX - 2);
      page.x = this.pagesMatrix.getPageStats(page.pageX + 1, 0).x;
    }
    if (this.loopY) {
      page.pageY = this.fixedPage(page.pageY, this.pagesMatrix.pageLengthOfY - 2);
      page.y = this.pagesMatrix.getPageStats(0, page.pageY + 1).y;
    }
    return page;
  };
  SlidePages.prototype.fixedPage = function (page, realPageLen) {
    var pageIndex = [];
    for (var i = 0; i < realPageLen; i++) {
      pageIndex.push(i);
    }
    pageIndex.unshift(realPageLen - 1);
    pageIndex.push(0);
    return pageIndex[page];
  };
  SlidePages.prototype.getPageStats = function () {
    return this.pagesMatrix.getPageStats(this.currentPage.pageX, this.currentPage.pageY);
  };
  SlidePages.prototype.getValidPageIndex = function (x, y) {
    var lastX = this.pagesMatrix.pageLengthOfX - 1;
    var lastY = this.pagesMatrix.pageLengthOfY - 1;
    var firstX = 0;
    var firstY = 0;
    if (this.loopX) {
      x += 1;
      firstX = firstX + 1;
      lastX = lastX - 1;
    }
    if (this.loopY) {
      y += 1;
      firstY = firstY + 1;
      lastY = lastY - 1;
    }
    x = between(x, firstX, lastX);
    y = between(y, firstY, lastY);
    return {
      pageX: x,
      pageY: y
    };
  };
  SlidePages.prototype.nextPageIndex = function () {
    return this.getPageIndexByDirection("positive" /* Positive */);
  };

  SlidePages.prototype.prevPageIndex = function () {
    return this.getPageIndexByDirection("negative" /* Negative */);
  };

  SlidePages.prototype.getNearestPage = function (x, y) {
    var pageIndex = this.pagesMatrix.getNearestPageIndex(x, y);
    var pageX = pageIndex.pageX,
      pageY = pageIndex.pageY;
    var newX = this.pagesMatrix.getPageStats(pageX, 0).x;
    var newY = this.pagesMatrix.getPageStats(0, pageY).y;
    return {
      x: newX,
      y: newY,
      pageX: pageX,
      pageY: pageY
    };
  };
  SlidePages.prototype.getPageByDirection = function (page, directionX, directionY) {
    var pageX = page.pageX,
      pageY = page.pageY;
    if (pageX === this.currentPage.pageX) {
      pageX = between(pageX + directionX, 0, this.pagesMatrix.pageLengthOfX - 1);
    }
    if (pageY === this.currentPage.pageY) {
      pageY = between(pageY + directionY, 0, this.pagesMatrix.pageLengthOfY - 1);
    }
    var x = this.pagesMatrix.getPageStats(pageX, 0).x;
    var y = this.pagesMatrix.getPageStats(0, pageY).y;
    return {
      x: x,
      y: y,
      pageX: pageX,
      pageY: pageY
    };
  };
  SlidePages.prototype.resetLoopPage = function () {
    if (this.loopX) {
      if (this.currentPage.pageX === 0) {
        return {
          pageX: this.pagesMatrix.pageLengthOfX - 2,
          pageY: this.currentPage.pageY
        };
      }
      if (this.currentPage.pageX === this.pagesMatrix.pageLengthOfX - 1) {
        return {
          pageX: 1,
          pageY: this.currentPage.pageY
        };
      }
    }
    if (this.loopY) {
      if (this.currentPage.pageY === 0) {
        return {
          pageX: this.currentPage.pageX,
          pageY: this.pagesMatrix.pageLengthOfY - 2
        };
      }
      if (this.currentPage.pageY === this.pagesMatrix.pageLengthOfY - 1) {
        return {
          pageX: this.currentPage.pageX,
          pageY: 1
        };
      }
    }
  };
  SlidePages.prototype.getPageIndexByDirection = function (direction) {
    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;
    if (this.slideX) {
      x = direction === "negative" /* Negative */ ? x - 1 : x + 1;
    }
    if (this.slideY) {
      y = direction === "negative" /* Negative */ ? y - 1 : y + 1;
    }
    return {
      pageX: x,
      pageY: y
    };
  };
  SlidePages.prototype.checkSlideLoop = function () {
    this.wannaLoop = this.slideOptions.loop;
    if (this.pagesMatrix.pageLengthOfX > 1) {
      this.slideX = true;
    } else {
      this.slideX = false;
    }
    if (this.pagesMatrix.pages[0] && this.pagesMatrix.pageLengthOfY > 1) {
      this.slideY = true;
    } else {
      this.slideY = false;
    }
    this.loopX = this.wannaLoop && this.slideX;
    this.loopY = this.wannaLoop && this.slideY;
    if (this.slideX && this.slideY) {
      warn('slide does not support two direction at the same time.');
    }
  };
  return SlidePages;
}();
var sourcePrefix$4 = 'plugins.slide';
var propertiesMap$4 = [{
  key: 'next',
  name: 'next'
}, {
  key: 'prev',
  name: 'prev'
}, {
  key: 'goToPage',
  name: 'goToPage'
}, {
  key: 'getCurrentPage',
  name: 'getCurrentPage'
}, {
  key: 'startPlay',
  name: 'startPlay'
}, {
  key: 'pausePlay',
  name: 'pausePlay'
}];
var propertiesConfig$4 = propertiesMap$4.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$4 + "." + item.name
  };
});
var samePage = function samePage(p1, p2) {
  return p1.pageX === p2.pageX && p1.pageY === p2.pageY;
};
var Slide = /** @class */function () {
  function Slide(scroll) {
    this.scroll = scroll;
    this.cachedClonedPageDOM = [];
    this.resetLooping = false;
    this.autoplayTimer = 0;
    if (!this.satisfyInitialization()) {
      return;
    }
    this.init();
  }
  Slide.prototype.satisfyInitialization = function () {
    if (this.scroll.scroller.content.children.length <= 0) {
      warn("slide need at least one slide page to be initialised." + "please check your DOM layout.");
      return false;
    }
    return true;
  };
  Slide.prototype.init = function () {
    this.willChangeToPage = extend({}, BASE_PAGE);
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.createPages();
  };
  Slide.prototype.createPages = function () {
    this.pages = new SlidePages(this.scroll, this.options);
  };
  Slide.prototype.handleBScroll = function () {
    this.scroll.registerType(['slideWillChange', 'slidePageChanged']);
    this.scroll.proxy(propertiesConfig$4);
  };
  Slide.prototype.handleOptions = function () {
    var userOptions = this.scroll.options.slide === true ? {} : this.scroll.options.slide;
    var defaultOptions = {
      loop: true,
      threshold: 0.1,
      speed: 400,
      easing: ease.bounce,
      listenFlick: true,
      autoplay: true,
      interval: 3000,
      startPageXIndex: 0,
      startPageYIndex: 0
    };
    this.options = extend(defaultOptions, userOptions);
  };
  Slide.prototype.handleLoop = function (prevSlideContent) {
    var loop = this.options.loop;
    var slideContent = this.scroll.scroller.content;
    var currentSlidePagesLength = slideContent.children.length;
    // only should respect loop scene
    if (loop) {
      if (slideContent !== prevSlideContent) {
        this.resetLoopChangedStatus();
        this.removeClonedSlidePage(prevSlideContent);
        currentSlidePagesLength > 1 && this.cloneFirstAndLastSlidePage(slideContent);
      } else {
        // many pages reduce to one page
        if (currentSlidePagesLength === 3 && this.initialised) {
          this.removeClonedSlidePage(slideContent);
          this.moreToOnePageInLoop = true;
          this.oneToMorePagesInLoop = false;
        } else if (currentSlidePagesLength > 1) {
          // one page increases to many page
          if (this.initialised && this.cachedClonedPageDOM.length === 0) {
            this.oneToMorePagesInLoop = true;
            this.moreToOnePageInLoop = false;
          } else {
            this.removeClonedSlidePage(slideContent);
            this.resetLoopChangedStatus();
          }
          this.cloneFirstAndLastSlidePage(slideContent);
        } else {
          this.resetLoopChangedStatus();
        }
      }
    }
  };
  Slide.prototype.resetLoopChangedStatus = function () {
    this.moreToOnePageInLoop = false;
    this.oneToMorePagesInLoop = false;
  };
  Slide.prototype.handleHooks = function () {
    var _this = this;
    var scrollHooks = this.scroll.hooks;
    var scrollerHooks = this.scroll.scroller.hooks;
    var listenFlick = this.options.listenFlick;
    this.prevContent = this.scroll.scroller.content;
    this.hooksFn = [];
    // scroll
    this.registerHooks(this.scroll, this.scroll.eventTypes.beforeScrollStart, this.pausePlay);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.modifyCurrentPage);
    this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.startPlay);
    // for mousewheel event
    if (this.scroll.eventTypes.mousewheelMove) {
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelMove, function () {
        // prevent default action of mousewheelMove
        return true;
      });
      this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function (delta) {
        if (delta.directionX === 1 /* Positive */ || delta.directionY === 1 /* Positive */) {
          _this.next();
        }
        if (delta.directionX === -1 /* Negative */ || delta.directionY === -1 /* Negative */) {
          _this.prev();
        }
      });
    }
    // scrollHooks
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refreshHandler);
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.destroy, this.destroy);
    // scroller
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.beforeRefresh, function () {
      _this.handleLoop(_this.prevContent);
      _this.setSlideInlineStyle();
    });
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.momentum, this.modifyScrollMetaHandler);
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.scroll, this.scrollHandler);
    // a click operation will clearTimer, so restart a new one
    this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.checkClick, this.startPlay);
    if (listenFlick) {
      this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.flick, this.flickHandler);
    }
  };
  Slide.prototype.startPlay = function () {
    var _this = this;
    var _a = this.options,
      interval = _a.interval,
      autoplay = _a.autoplay;
    if (autoplay) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = window.setTimeout(function () {
        _this.next();
      }, interval);
    }
  };
  Slide.prototype.pausePlay = function () {
    if (this.options.autoplay) {
      clearTimeout(this.autoplayTimer);
    }
  };
  Slide.prototype.setSlideInlineStyle = function () {
    var styleConfigurations = [{
      direction: 'scrollX',
      sizeType: 'offsetWidth',
      styleType: 'width'
    }, {
      direction: 'scrollY',
      sizeType: 'offsetHeight',
      styleType: 'height'
    }];
    var _a = this.scroll.scroller,
      slideContent = _a.content,
      slideWrapper = _a.wrapper;
    var scrollOptions = this.scroll.options;
    styleConfigurations.forEach(function (_a) {
      var direction = _a.direction,
        sizeType = _a.sizeType,
        styleType = _a.styleType;
      // wanna scroll in this direction
      if (scrollOptions[direction]) {
        var size = slideWrapper[sizeType];
        var children = slideContent.children;
        var length_1 = children.length;
        for (var i = 0; i < length_1; i++) {
          var slidePageDOM = children[i];
          slidePageDOM.style[styleType] = size + 'px';
        }
        slideContent.style[styleType] = size * length_1 + 'px';
      }
    });
  };
  Slide.prototype.next = function (time, easing) {
    var _a = this.pages.nextPageIndex(),
      pageX = _a.pageX,
      pageY = _a.pageY;
    this.goTo(pageX, pageY, time, easing);
  };
  Slide.prototype.prev = function (time, easing) {
    var _a = this.pages.prevPageIndex(),
      pageX = _a.pageX,
      pageY = _a.pageY;
    this.goTo(pageX, pageY, time, easing);
  };
  Slide.prototype.goToPage = function (pageX, pageY, time, easing) {
    var pageIndex = this.pages.getValidPageIndex(pageX, pageY);
    this.goTo(pageIndex.pageX, pageIndex.pageY, time, easing);
  };
  Slide.prototype.getCurrentPage = function () {
    return this.exposedPage || this.pages.getInitialPage(false, true);
  };
  Slide.prototype.setCurrentPage = function (page) {
    this.pages.setCurrentPage(page);
    this.exposedPage = this.pages.getExposedPage(page);
  };
  Slide.prototype.nearestPage = function (x, y) {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    var maxScrollPosX = scrollBehaviorX.maxScrollPos,
      minScrollPosX = scrollBehaviorX.minScrollPos;
    var maxScrollPosY = scrollBehaviorY.maxScrollPos,
      minScrollPosY = scrollBehaviorY.minScrollPos;
    return this.pages.getNearestPage(between(x, maxScrollPosX, minScrollPosX), between(y, maxScrollPosY, minScrollPosY));
  };
  Slide.prototype.satisfyThreshold = function (x, y) {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    var satisfied = true;
    if (Math.abs(x - scrollBehaviorX.absStartPos) <= this.thresholdX && Math.abs(y - scrollBehaviorY.absStartPos) <= this.thresholdY) {
      satisfied = false;
    }
    return satisfied;
  };
  Slide.prototype.refreshHandler = function (content) {
    var _this = this;
    if (!this.satisfyInitialization()) {
      return;
    }
    this.pages.refresh();
    this.computeThreshold();
    var contentChanged = this.contentChanged = this.prevContent !== content;
    if (contentChanged) {
      this.prevContent = content;
    }
    var initPage = this.pages.getInitialPage(this.oneToMorePagesInLoop || this.moreToOnePageInLoop, contentChanged || !this.initialised);
    if (this.initialised) {
      this.goTo(initPage.pageX, initPage.pageY, 0);
    } else {
      this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.beforeInitialScrollTo, function (position) {
        _this.initialised = true;
        position.x = initPage.x;
        position.y = initPage.y;
      });
    }
    this.startPlay();
  };
  Slide.prototype.computeThreshold = function () {
    var threshold = this.options.threshold;
    // Integer
    if (threshold % 1 === 0) {
      this.thresholdX = threshold;
      this.thresholdY = threshold;
    } else {
      // decimal
      var _a = this.pages.getPageStats(),
        width = _a.width,
        height = _a.height;
      this.thresholdX = Math.round(width * threshold);
      this.thresholdY = Math.round(height * threshold);
    }
  };
  Slide.prototype.cloneFirstAndLastSlidePage = function (slideContent) {
    var children = slideContent.children;
    var preprendDOM = children[children.length - 1].cloneNode(true);
    var appendDOM = children[0].cloneNode(true);
    prepend(preprendDOM, slideContent);
    slideContent.appendChild(appendDOM);
    this.cachedClonedPageDOM = [preprendDOM, appendDOM];
  };
  Slide.prototype.removeClonedSlidePage = function (slideContent) {
    // maybe slideContent has removed from DOM Tree
    var slidePages = slideContent && slideContent.children || [];
    if (slidePages.length) {
      this.cachedClonedPageDOM.forEach(function (el) {
        removeChild(slideContent, el);
      });
    }
    this.cachedClonedPageDOM = [];
  };
  Slide.prototype.modifyCurrentPage = function (point) {
    var _a = this.getCurrentPage(),
      prevExposedPageX = _a.pageX,
      prevExposedPageY = _a.pageY;
    var newPage = this.nearestPage(point.x, point.y);
    this.setCurrentPage(newPage);
    /* istanbul ignore if */
    if (this.contentChanged) {
      this.contentChanged = false;
      return true;
    }
    var _b = this.getCurrentPage(),
      currentExposedPageX = _b.pageX,
      currentExposedPageY = _b.pageY;
    this.pageWillChangeTo(newPage);
    // loop is true, and one page becomes many pages when call bs.refresh
    if (this.oneToMorePagesInLoop) {
      this.oneToMorePagesInLoop = false;
      return true;
    }
    // loop is true, and many page becomes one page when call bs.refresh
    // if prevPage > 0, dispatch slidePageChanged and scrollEnd events
    /* istanbul ignore if */
    if (this.moreToOnePageInLoop && prevExposedPageX === 0 && prevExposedPageY === 0) {
      this.moreToOnePageInLoop = false;
      return true;
    }
    if (prevExposedPageX !== currentExposedPageX || prevExposedPageY !== currentExposedPageY) {
      // only trust pageX & pageY when loop is true
      var page = this.pages.getExposedPageByPageIndex(currentExposedPageX, currentExposedPageY);
      this.scroll.trigger(this.scroll.eventTypes.slidePageChanged, page);
    }
    // triggered by resetLoop
    if (this.resetLooping) {
      this.resetLooping = false;
      return;
    }
    var changePage = this.pages.resetLoopPage();
    if (changePage) {
      this.resetLooping = true;
      this.goTo(changePage.pageX, changePage.pageY, 0);
      // stop user's scrollEnd
      // since it is a seamless scroll
      return true;
    }
  };
  Slide.prototype.goTo = function (pageX, pageY, time, easing) {
    var newPage = this.pages.getInternalPage(pageX, pageY);
    var scrollEasing = easing || this.options.easing || ease.bounce;
    var x = newPage.x,
      y = newPage.y;
    var deltaX = x - this.scroll.scroller.scrollBehaviorX.currentPos;
    var deltaY = y - this.scroll.scroller.scrollBehaviorY.currentPos;
    /* istanbul ignore if */
    if (!deltaX && !deltaY) {
      this.scroll.scroller.togglePointerEvents(true);
      return;
    }
    time = time === undefined ? this.getEaseTime(deltaX, deltaY) : time;
    this.scroll.scroller.scrollTo(x, y, time, scrollEasing);
  };
  Slide.prototype.flickHandler = function () {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    var currentPosX = scrollBehaviorX.currentPos,
      startPosX = scrollBehaviorX.startPos,
      directionX = scrollBehaviorX.direction;
    var currentPosY = scrollBehaviorY.currentPos,
      startPosY = scrollBehaviorY.startPos,
      directionY = scrollBehaviorY.direction;
    var _b = this.pages.currentPage,
      pageX = _b.pageX,
      pageY = _b.pageY;
    var time = this.getEaseTime(currentPosX - startPosX, currentPosY - startPosY);
    this.goTo(pageX + directionX, pageY + directionY, time);
  };
  Slide.prototype.getEaseTime = function (deltaX, deltaY) {
    return this.options.speed || Math.max(Math.max(Math.min(Math.abs(deltaX), 1000), Math.min(Math.abs(deltaY), 1000)), 300);
  };
  Slide.prototype.modifyScrollMetaHandler = function (scrollMeta) {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY,
      animater = _a.animater;
    var newX = scrollMeta.newX;
    var newY = scrollMeta.newY;
    var newPage = this.satisfyThreshold(newX, newY) || animater.forceStopped ? this.pages.getPageByDirection(this.nearestPage(newX, newY), scrollBehaviorX.direction, scrollBehaviorY.direction) : this.pages.currentPage;
    scrollMeta.time = this.getEaseTime(scrollMeta.newX - newPage.x, scrollMeta.newY - newPage.y);
    scrollMeta.newX = newPage.x;
    scrollMeta.newY = newPage.y;
    scrollMeta.easing = this.options.easing || ease.bounce;
  };
  Slide.prototype.scrollHandler = function (_a) {
    var x = _a.x,
      y = _a.y;
    if (this.satisfyThreshold(x, y)) {
      var newPage = this.nearestPage(x, y);
      this.pageWillChangeTo(newPage);
    }
  };
  Slide.prototype.pageWillChangeTo = function (newPage) {
    var changeToPage = this.pages.getWillChangedPage(newPage);
    if (!samePage(this.willChangeToPage, changeToPage)) {
      this.willChangeToPage = changeToPage;
      this.scroll.trigger(this.scroll.eventTypes.slideWillChange, this.willChangeToPage);
    }
  };
  Slide.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Slide.prototype.destroy = function () {
    var slideContent = this.scroll.scroller.content;
    var _a = this.options,
      loop = _a.loop,
      autoplay = _a.autoplay;
    if (loop) {
      this.removeClonedSlidePage(slideContent);
    }
    if (autoplay) {
      clearTimeout(this.autoplayTimer);
    }
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      if (hooks.eventTypes[hooksName]) {
        hooks.off(hooksName, handlerFn);
      }
    });
    this.hooksFn.length = 0;
  };
  Slide.pluginName = 'slide';
  return Slide;
}();
exports.Slide = Slide;
var sourcePrefix$3 = 'plugins.wheel';
var propertiesMap$3 = [{
  key: 'wheelTo',
  name: 'wheelTo'
}, {
  key: 'getSelectedIndex',
  name: 'getSelectedIndex'
}, {
  key: 'restorePosition',
  name: 'restorePosition'
}];
var propertiesConfig$3 = propertiesMap$3.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$3 + "." + item.name
  };
});
var WHEEL_INDEX_CHANGED_EVENT_NAME = 'wheelIndexChanged';
var CONSTANTS = {
  rate: 4
};
var Wheel = /** @class */function () {
  function Wheel(scroll) {
    this.scroll = scroll;
    this.init();
  }
  Wheel.prototype.init = function () {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    // init boundary for Wheel
    this.refreshBoundary();
    this.setSelectedIndex(this.options.selectedIndex);
  };
  Wheel.prototype.handleBScroll = function () {
    this.scroll.proxy(propertiesConfig$3);
    this.scroll.registerType([WHEEL_INDEX_CHANGED_EVENT_NAME]);
  };
  Wheel.prototype.handleOptions = function () {
    var userOptions = this.scroll.options.wheel === true ? {} : this.scroll.options.wheel;
    var defaultOptions = {
      wheelWrapperClass: 'wheel-scroll',
      wheelItemClass: 'wheel-item',
      rotate: 25,
      adjustTime: 400,
      selectedIndex: 0,
      wheelDisabledItemClass: 'wheel-disabled-item'
    };
    this.options = extend(defaultOptions, userOptions);
  };
  Wheel.prototype.handleHooks = function () {
    var _this = this;
    var scroll = this.scroll;
    var scroller = this.scroll.scroller;
    var actionsHandler = scroller.actionsHandler,
      scrollBehaviorX = scroller.scrollBehaviorX,
      scrollBehaviorY = scroller.scrollBehaviorY,
      animater = scroller.animater;
    var prevContent = scroller.content;
    // BScroll
    scroll.on(scroll.eventTypes.scrollEnd, function (position) {
      var index = _this.findNearestValidWheel(position.y).index;
      if (scroller.animater.forceStopped && !_this.isAdjustingPosition) {
        _this.target = _this.items[index];
        // since stopped from an animation.
        // prevent user's scrollEnd callback triggered twice
        return true;
      } else {
        _this.setSelectedIndex(index);
        if (_this.isAdjustingPosition) {
          _this.isAdjustingPosition = false;
        }
      }
    });
    // BScroll.hooks
    this.scroll.hooks.on(this.scroll.hooks.eventTypes.refresh, function (content) {
      if (content !== prevContent) {
        prevContent = content;
        _this.setSelectedIndex(_this.options.selectedIndex, true);
      }
      // rotate all wheel-items
      // because position may not change
      _this.rotateX(_this.scroll.y);
      // check we are stop at a disable item or not
      _this.wheelTo(_this.selectedIndex, 0);
    });
    this.scroll.hooks.on(this.scroll.hooks.eventTypes.beforeInitialScrollTo, function (position) {
      // selectedIndex has higher priority than bs.options.startY
      position.x = 0;
      position.y = -(_this.selectedIndex * _this.itemHeight);
    });
    // Scroller
    scroller.hooks.on(scroller.hooks.eventTypes.checkClick, function () {
      var index = HTMLCollectionToArray(_this.items).indexOf(_this.target);
      if (index === -1) return true;
      _this.wheelTo(index, _this.options.adjustTime, ease.swipe);
      return true;
    });
    scroller.hooks.on(scroller.hooks.eventTypes.scrollTo, function (endPoint) {
      endPoint.y = _this.findNearestValidWheel(endPoint.y).y;
    });
    // when content is scrolling
    // click wheel-item DOM repeatedly and crazily will cause scrollEnd not triggered
    // so reset forceStopped
    scroller.hooks.on(scroller.hooks.eventTypes.minDistanceScroll, function () {
      var animater = scroller.animater;
      if (animater.forceStopped === true) {
        animater.forceStopped = false;
      }
    });
    scroller.hooks.on(scroller.hooks.eventTypes.scrollToElement, function (el, pos) {
      if (!hasClass(el, _this.options.wheelItemClass)) {
        return true;
      } else {
        pos.top = _this.findNearestValidWheel(pos.top).y;
      }
    });
    // ActionsHandler
    actionsHandler.hooks.on(actionsHandler.hooks.eventTypes.beforeStart, function (e) {
      _this.target = e.target;
    });
    // ScrollBehaviorX
    // Wheel has no x direction now
    scrollBehaviorX.hooks.on(scrollBehaviorX.hooks.eventTypes.computeBoundary, function (boundary) {
      boundary.maxScrollPos = 0;
      boundary.minScrollPos = 0;
    });
    // ScrollBehaviorY
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
      _this.items = _this.scroll.scroller.content.children;
      _this.checkWheelAllDisabled();
      _this.itemHeight = _this.items.length > 0 ? scrollBehaviorY.contentSize / _this.items.length : 0;
      boundary.maxScrollPos = -_this.itemHeight * (_this.items.length - 1);
      boundary.minScrollPos = 0;
    });
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.momentum, function (momentumInfo) {
      momentumInfo.rate = CONSTANTS.rate;
      momentumInfo.destination = _this.findNearestValidWheel(momentumInfo.destination).y;
    });
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.end, function (momentumInfo) {
      var validWheel = _this.findNearestValidWheel(scrollBehaviorY.currentPos);
      momentumInfo.destination = validWheel.y;
      momentumInfo.duration = _this.options.adjustTime;
    });
    // Animater
    animater.hooks.on(animater.hooks.eventTypes.time, function (time) {
      _this.transitionDuration(time);
    });
    animater.hooks.on(animater.hooks.eventTypes.timeFunction, function (easing) {
      _this.timeFunction(easing);
    });
    // bs.stop() to make wheel stop at a correct position when pending
    animater.hooks.on(animater.hooks.eventTypes.callStop, function () {
      var index = _this.findNearestValidWheel(_this.scroll.y).index;
      _this.isAdjustingPosition = true;
      _this.wheelTo(index, 0);
    });
    // Translater
    animater.translater.hooks.on(animater.translater.hooks.eventTypes.translate, function (endPoint) {
      _this.rotateX(endPoint.y);
    });
  };
  Wheel.prototype.refreshBoundary = function () {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY,
      content = _a.content;
    scrollBehaviorX.refresh(content);
    scrollBehaviorY.refresh(content);
  };
  Wheel.prototype.setSelectedIndex = function (index, contentChanged) {
    if (contentChanged === void 0) {
      contentChanged = false;
    }
    var prevSelectedIndex = this.selectedIndex;
    this.selectedIndex = index;
    // if content DOM changed, should not trigger event
    if (prevSelectedIndex !== index && !contentChanged) {
      this.scroll.trigger(WHEEL_INDEX_CHANGED_EVENT_NAME, index);
    }
  };
  Wheel.prototype.getSelectedIndex = function () {
    return this.selectedIndex;
  };
  Wheel.prototype.wheelTo = function (index, time, ease) {
    if (index === void 0) {
      index = 0;
    }
    if (time === void 0) {
      time = 0;
    }
    var y = -index * this.itemHeight;
    this.scroll.scrollTo(0, y, time, ease);
  };
  Wheel.prototype.restorePosition = function () {
    // bs is scrolling
    var isPending = this.scroll.pending;
    if (isPending) {
      var selectedIndex = this.getSelectedIndex();
      this.scroll.scroller.animater.clearTimer();
      this.wheelTo(selectedIndex, 0);
    }
  };
  Wheel.prototype.transitionDuration = function (time) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].style[style.transitionDuration] = time + 'ms';
    }
  };
  Wheel.prototype.timeFunction = function (easing) {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].style[style.transitionTimingFunction] = easing;
    }
  };
  Wheel.prototype.rotateX = function (y) {
    var _a = this.options.rotate,
      rotate = _a === void 0 ? 25 : _a;
    for (var i = 0; i < this.items.length; i++) {
      var deg = rotate * (y / this.itemHeight + i);
      // Too small value is invalid in some phones, issue 1026
      var SafeDeg = deg.toFixed(3);
      this.items[i].style[style.transform] = "rotateX(" + SafeDeg + "deg)";
    }
  };
  Wheel.prototype.findNearestValidWheel = function (y) {
    y = y > 0 ? 0 : y < this.scroll.maxScrollY ? this.scroll.maxScrollY : y;
    var currentIndex = Math.abs(Math.round(-y / this.itemHeight));
    var cacheIndex = currentIndex;
    var items = this.items;
    var wheelDisabledItemClassName = this.options.wheelDisabledItemClass;
    // implement web native select element
    // first, check whether there is a enable item whose index is smaller than currentIndex
    // then, check whether there is a enable item whose index is bigger than currentIndex
    // otherwise, there are all disabled items, just keep currentIndex unchange
    while (currentIndex >= 0) {
      if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
        break;
      }
      currentIndex--;
    }
    if (currentIndex < 0) {
      currentIndex = cacheIndex;
      while (currentIndex <= items.length - 1) {
        if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
          break;
        }
        currentIndex++;
      }
    }
    // keep it unchange when all the items are disabled
    if (currentIndex === items.length) {
      currentIndex = cacheIndex;
    }
    // when all the items are disabled, selectedIndex should always be -1
    return {
      index: this.wheelItemsAllDisabled ? -1 : currentIndex,
      y: -currentIndex * this.itemHeight
    };
  };
  Wheel.prototype.checkWheelAllDisabled = function () {
    var wheelDisabledItemClassName = this.options.wheelDisabledItemClass;
    var items = this.items;
    this.wheelItemsAllDisabled = true;
    for (var i = 0; i < items.length; i++) {
      if (!hasClass(items[i], wheelDisabledItemClassName)) {
        this.wheelItemsAllDisabled = false;
        break;
      }
    }
  };
  Wheel.pluginName = 'wheel';
  return Wheel;
}();
exports.Wheel = Wheel;
var sourcePrefix$2 = 'plugins.zoom';
var propertiesMap$2 = [{
  key: 'zoomTo',
  name: 'zoomTo'
}];
var propertiesConfig$2 = propertiesMap$2.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$2 + "." + item.name
  };
});
var TWO_FINGERS = 2;
var RAW_SCALE = 1;
var Zoom = /** @class */function () {
  function Zoom(scroll) {
    this.scroll = scroll;
    this.scale = RAW_SCALE;
    this.prevScale = 1;
    this.init();
  }
  Zoom.prototype.init = function () {
    this.handleBScroll();
    this.handleOptions();
    this.handleHooks();
    this.tryInitialZoomTo(this.zoomOpt);
  };
  Zoom.prototype.zoomTo = function (scale, x, y, bounceTime) {
    var _a = this.resolveOrigin(x, y),
      originX = _a.originX,
      originY = _a.originY;
    var origin = {
      x: originX,
      y: originY,
      baseScale: this.scale
    };
    this._doZoomTo(scale, origin, bounceTime, true);
  };
  Zoom.prototype.handleBScroll = function () {
    this.scroll.proxy(propertiesConfig$2);
    this.scroll.registerType(['beforeZoomStart', 'zoomStart', 'zooming', 'zoomEnd']);
  };
  Zoom.prototype.handleOptions = function () {
    var userOptions = this.scroll.options.zoom === true ? {} : this.scroll.options.zoom;
    var defaultOptions = {
      start: 1,
      min: 1,
      max: 4,
      initialOrigin: [0, 0],
      minimalZoomDistance: 5,
      bounceTime: 800
    };
    this.zoomOpt = extend(defaultOptions, userOptions);
  };
  Zoom.prototype.handleHooks = function () {
    var _this = this;
    var scroll = this.scroll;
    var scroller = this.scroll.scroller;
    this.wrapper = this.scroll.scroller.wrapper;
    this.setTransformOrigin(this.scroll.scroller.content);
    var scrollBehaviorX = scroller.scrollBehaviorX;
    var scrollBehaviorY = scroller.scrollBehaviorY;
    this.hooksFn = [];
    // BScroll
    this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.contentChanged, function (content) {
      _this.setTransformOrigin(content);
      _this.scale = RAW_SCALE;
      _this.tryInitialZoomTo(_this.zoomOpt);
    });
    this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.beforeInitialScrollTo, function () {
      // if perform a zoom action, we should prevent initial scroll when initialised
      if (_this.zoomOpt.start !== RAW_SCALE) {
        return true;
      }
    });
    // enlarge boundary
    this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.beforeComputeBoundary, function () {
      // content may change, don't cache it's size
      var contentSize = getRect(_this.scroll.scroller.content);
      scrollBehaviorX.contentSize = Math.floor(contentSize.width * _this.scale);
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.beforeComputeBoundary, function () {
      // content may change, don't cache it's size
      var contentSize = getRect(_this.scroll.scroller.content);
      scrollBehaviorY.contentSize = Math.floor(contentSize.height * _this.scale);
    });
    // touch event
    this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.start, function (e) {
      var numberOfFingers = e.touches && e.touches.length || 0;
      _this.fingersOperation(numberOfFingers);
      if (numberOfFingers === TWO_FINGERS) {
        _this.zoomStart(e);
      }
    });
    this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.beforeMove, function (e) {
      var numberOfFingers = e.touches && e.touches.length || 0;
      _this.fingersOperation(numberOfFingers);
      if (numberOfFingers === TWO_FINGERS) {
        _this.zoom(e);
        return true;
      }
    });
    this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.beforeEnd, function (e) {
      var numberOfFingers = _this.fingersOperation();
      if (numberOfFingers === TWO_FINGERS) {
        _this.zoomEnd();
        return true;
      }
    });
    this.registerHooks(scroller.translater.hooks, scroller.translater.hooks.eventTypes.beforeTranslate, function (transformStyle, point) {
      var scale = point.scale ? point.scale : _this.prevScale;
      _this.prevScale = scale;
      transformStyle.push("scale(" + scale + ")");
    });
    this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.scrollEnd, function () {
      if (_this.fingersOperation() === TWO_FINGERS) {
        _this.scroll.trigger(_this.scroll.eventTypes.zoomEnd, {
          scale: _this.scale
        });
      }
    });
    this.registerHooks(this.scroll.hooks, 'destroy', this.destroy);
  };
  Zoom.prototype.setTransformOrigin = function (content) {
    content.style[style.transformOrigin] = '0 0';
  };
  Zoom.prototype.tryInitialZoomTo = function (options) {
    var start = options.start,
      initialOrigin = options.initialOrigin;
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    if (start !== RAW_SCALE) {
      // Movable plugin may wanna modify minScrollPos or maxScrollPos
      // so we force Movable to caculate them
      this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
      this.zoomTo(start, initialOrigin[0], initialOrigin[1], 0);
    }
  };
  // getter or setter operation
  Zoom.prototype.fingersOperation = function (amounts) {
    if (typeof amounts === 'number') {
      this.numberOfFingers = amounts;
    } else {
      return this.numberOfFingers;
    }
  };
  Zoom.prototype._doZoomTo = function (scale, origin, time, useCurrentPos) {
    var _this = this;
    if (time === void 0) {
      time = this.zoomOpt.bounceTime;
    }
    if (useCurrentPos === void 0) {
      useCurrentPos = false;
    }
    var _a = this.zoomOpt,
      min = _a.min,
      max = _a.max;
    var fromScale = this.scale;
    var toScale = between(scale, min, max);
    (function () {
      if (time === 0) {
        _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
          scale: toScale
        });
        return;
      }
      if (time > 0) {
        var timer_1;
        var startTime_1 = getNow();
        var endTime_1 = startTime_1 + time;
        var scheduler_1 = function scheduler_1() {
          var now = getNow();
          if (now >= endTime_1) {
            _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
              scale: toScale
            });
            cancelAnimationFrame(timer_1);
            return;
          }
          var ratio = ease.bounce.fn((now - startTime_1) / time);
          var currentScale = ratio * (toScale - fromScale) + fromScale;
          _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
            scale: currentScale
          });
          timer_1 = requestAnimationFrame(scheduler_1);
        };
        // start scheduler job
        scheduler_1();
      }
    })();
    // suppose you are zooming by two fingers
    this.fingersOperation(2);
    this._zoomTo(toScale, fromScale, origin, time, useCurrentPos);
  };
  Zoom.prototype._zoomTo = function (toScale, fromScale, origin, time, useCurrentPos) {
    if (useCurrentPos === void 0) {
      useCurrentPos = false;
    }
    var ratio = toScale / origin.baseScale;
    this.setScale(toScale);
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX,
      scrollBehaviorY = scroller.scrollBehaviorY;
    this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
    // position is restrained in boundary
    var newX = this.getNewPos(origin.x, ratio, scrollBehaviorX, true, useCurrentPos);
    var newY = this.getNewPos(origin.y, ratio, scrollBehaviorY, true, useCurrentPos);
    if (scrollBehaviorX.currentPos !== Math.round(newX) || scrollBehaviorY.currentPos !== Math.round(newY) || toScale !== fromScale) {
      scroller.scrollTo(newX, newY, time, ease.bounce, {
        start: {
          scale: fromScale
        },
        end: {
          scale: toScale
        }
      });
    }
  };
  Zoom.prototype.resolveOrigin = function (x, y) {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    var resolveFormula = {
      left: function left() {
        return 0;
      },
      top: function top() {
        return 0;
      },
      right: function right() {
        return scrollBehaviorX.contentSize;
      },
      bottom: function bottom() {
        return scrollBehaviorY.contentSize;
      },
      center: function center(index) {
        var baseSize = index === 0 ? scrollBehaviorX.contentSize : scrollBehaviorY.contentSize;
        return baseSize / 2;
      }
    };
    return {
      originX: typeof x === 'number' ? x : resolveFormula[x](0),
      originY: typeof y === 'number' ? y : resolveFormula[y](1)
    };
  };
  Zoom.prototype.zoomStart = function (e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    this.startDistance = this.getFingerDistance(e);
    this.startScale = this.scale;
    var _a = offsetToBody(this.wrapper),
      left = _a.left,
      top = _a.top;
    this.origin = {
      x: Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.scroll.x,
      y: Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.scroll.y,
      baseScale: this.startScale
    };
    this.scroll.trigger(this.scroll.eventTypes.beforeZoomStart);
  };
  Zoom.prototype.zoom = function (e) {
    var currentDistance = this.getFingerDistance(e);
    // at least minimalZoomDistance pixels for the zoom to initiate
    if (!this.zoomed && Math.abs(currentDistance - this.startDistance) < this.zoomOpt.minimalZoomDistance) {
      return;
    }
    // when out of boundary , perform a damping algorithm
    var endScale = this.dampingScale(currentDistance / this.startDistance * this.startScale);
    var ratio = endScale / this.startScale;
    this.setScale(endScale);
    if (!this.zoomed) {
      this.zoomed = true;
      this.scroll.trigger(this.scroll.eventTypes.zoomStart);
    }
    var scroller = this.scroll.scroller;
    var scrollBehaviorX = scroller.scrollBehaviorX,
      scrollBehaviorY = scroller.scrollBehaviorY;
    var x = this.getNewPos(this.origin.x, ratio, scrollBehaviorX, false, false);
    var y = this.getNewPos(this.origin.y, ratio, scrollBehaviorY, false, false);
    this.scroll.trigger(this.scroll.eventTypes.zooming, {
      scale: this.scale
    });
    scroller.translater.translate({
      x: x,
      y: y,
      scale: endScale
    });
  };
  Zoom.prototype.zoomEnd = function () {
    if (!this.zoomed) return;
    // if out of boundary, do rebound!
    if (this.shouldRebound()) {
      this._doZoomTo(this.scale, this.origin, this.zoomOpt.bounceTime);
      return;
    }
    this.scroll.trigger(this.scroll.eventTypes.zoomEnd, {
      scale: this.scale
    });
  };
  Zoom.prototype.getFingerDistance = function (e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
    return getDistance(deltaX, deltaY);
  };
  Zoom.prototype.shouldRebound = function () {
    var _a = this.zoomOpt,
      min = _a.min,
      max = _a.max;
    var currentScale = this.scale;
    // scale exceeded!
    if (currentScale !== between(currentScale, min, max)) {
      return true;
    }
    var _b = this.scroll.scroller,
      scrollBehaviorX = _b.scrollBehaviorX,
      scrollBehaviorY = _b.scrollBehaviorY;
    // enlarge boundaries manually when zoom is end
    this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
    var xInBoundary = scrollBehaviorX.checkInBoundary().inBoundary;
    var yInBoundary = scrollBehaviorX.checkInBoundary().inBoundary;
    return !(xInBoundary && yInBoundary);
  };
  Zoom.prototype.dampingScale = function (scale) {
    var _a = this.zoomOpt,
      min = _a.min,
      max = _a.max;
    if (scale < min) {
      scale = 0.5 * min * Math.pow(2.0, scale / min);
    } else if (scale > max) {
      scale = 2.0 * max * Math.pow(0.5, max / scale);
    }
    return scale;
  };
  Zoom.prototype.setScale = function (scale) {
    this.scale = scale;
  };
  Zoom.prototype.resetBoundaries = function (scrollBehaviorPairs) {
    scrollBehaviorPairs.forEach(function (behavior) {
      return behavior.computeBoundary();
    });
  };
  Zoom.prototype.getNewPos = function (origin, lastScale, scrollBehavior, shouldInBoundary, useCurrentPos) {
    if (useCurrentPos === void 0) {
      useCurrentPos = false;
    }
    var newPos = origin - origin * lastScale + (useCurrentPos ? scrollBehavior.currentPos : scrollBehavior.startPos);
    if (shouldInBoundary) {
      newPos = between(newPos, scrollBehavior.maxScrollPos, scrollBehavior.minScrollPos);
    }
    // maxScrollPos or minScrollPos maybe a negative or positive digital
    return newPos > 0 ? Math.floor(newPos) : Math.ceil(newPos);
  };
  Zoom.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Zoom.prototype.destroy = function () {
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  Zoom.pluginName = 'zoom';
  return Zoom;
}();
exports.Zoom = Zoom;
var BScrollFamily = /** @class */function () {
  function BScrollFamily(scroll) {
    this.ancestors = [];
    this.descendants = [];
    this.hooksManager = [];
    this.analyzed = false;
    this.selfScroll = scroll;
  }
  BScrollFamily.create = function (scroll) {
    return new BScrollFamily(scroll);
  };
  BScrollFamily.prototype.hasAncestors = function (bscrollFamily) {
    var index = findIndex(this.ancestors, function (_a) {
      var item = _a[0];
      return item === bscrollFamily;
    });
    return index > -1;
  };
  BScrollFamily.prototype.hasDescendants = function (bscrollFamily) {
    var index = findIndex(this.descendants, function (_a) {
      var item = _a[0];
      return item === bscrollFamily;
    });
    return index > -1;
  };
  BScrollFamily.prototype.addAncestor = function (bscrollFamily, distance) {
    var ancestors = this.ancestors;
    ancestors.push([bscrollFamily, distance]);
    // by ascend
    ancestors.sort(function (a, b) {
      return a[1] - b[1];
    });
  };
  BScrollFamily.prototype.addDescendant = function (bscrollFamily, distance) {
    var descendants = this.descendants;
    descendants.push([bscrollFamily, distance]);
    // by ascend
    descendants.sort(function (a, b) {
      return a[1] - b[1];
    });
  };
  BScrollFamily.prototype.removeAncestor = function (bscrollFamily) {
    var ancestors = this.ancestors;
    if (ancestors.length) {
      var index = findIndex(this.ancestors, function (_a) {
        var item = _a[0];
        return item === bscrollFamily;
      });
      if (index > -1) {
        return ancestors.splice(index, 1);
      }
    }
  };
  BScrollFamily.prototype.removeDescendant = function (bscrollFamily) {
    var descendants = this.descendants;
    if (descendants.length) {
      var index = findIndex(this.descendants, function (_a) {
        var item = _a[0];
        return item === bscrollFamily;
      });
      if (index > -1) {
        return descendants.splice(index, 1);
      }
    }
  };
  BScrollFamily.prototype.registerHooks = function (hook, eventType, handler) {
    hook.on(eventType, handler);
    this.hooksManager.push([hook, eventType, handler]);
  };
  BScrollFamily.prototype.setAnalyzed = function (flag) {
    if (flag === void 0) {
      flag = false;
    }
    this.analyzed = flag;
  };
  BScrollFamily.prototype.purge = function () {
    var _this = this;
    // remove self from graph
    this.ancestors.forEach(function (_a) {
      var bscrollFamily = _a[0];
      bscrollFamily.removeDescendant(_this);
    });
    this.descendants.forEach(function (_a) {
      var bscrollFamily = _a[0];
      bscrollFamily.removeAncestor(_this);
    });
    // remove all hook handlers
    this.hooksManager.forEach(function (_a) {
      var hooks = _a[0],
        eventType = _a[1],
        handler = _a[2];
      hooks.off(eventType, handler);
    });
    this.hooksManager = [];
  };
  return BScrollFamily;
}();
var sourcePrefix$1 = 'plugins.nestedScroll';
var propertiesMap$1 = [{
  key: 'purgeNestedScroll',
  name: 'purgeNestedScroll'
}];
var propertiesConfig$1 = propertiesMap$1.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix$1 + "." + item.name
  };
});
var DEFAUL_GROUP_ID = 'INTERNAL_NESTED_SCROLL';
var forceScrollStopHandler = function forceScrollStopHandler(scrolls) {
  scrolls.forEach(function (scroll) {
    if (scroll.pending) {
      scroll.stop();
      scroll.resetPosition();
    }
  });
};
var enableScrollHander = function enableScrollHander(scrolls) {
  scrolls.forEach(function (scroll) {
    scroll.enable();
  });
};
var disableScrollHander = function disableScrollHander(scrolls, currentScroll) {
  scrolls.forEach(function (scroll) {
    if (scroll.hasHorizontalScroll === currentScroll.hasHorizontalScroll || scroll.hasVerticalScroll === currentScroll.hasVerticalScroll) {
      scroll.disable();
    }
  });
};
var syncTouchstartData = function syncTouchstartData(scrolls) {
  scrolls.forEach(function (scroll) {
    var _a = scroll.scroller,
      actions = _a.actions,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    // prevent click triggering many times
    actions.fingerMoved = true;
    actions.contentMoved = false;
    actions.directionLockAction.reset();
    scrollBehaviorX.start();
    scrollBehaviorY.start();
    scrollBehaviorX.resetStartPos();
    scrollBehaviorY.resetStartPos();
    actions.startTime = +new Date();
  });
};
var isOutOfBoundary = function isOutOfBoundary(scroll) {
  var hasHorizontalScroll = scroll.hasHorizontalScroll,
    hasVerticalScroll = scroll.hasVerticalScroll,
    x = scroll.x,
    y = scroll.y,
    minScrollX = scroll.minScrollX,
    maxScrollX = scroll.maxScrollX,
    minScrollY = scroll.minScrollY,
    maxScrollY = scroll.maxScrollY,
    movingDirectionX = scroll.movingDirectionX,
    movingDirectionY = scroll.movingDirectionY;
  var ret = false;
  var outOfLeftBoundary = x >= minScrollX && movingDirectionX === -1 /* Negative */;
  var outOfRightBoundary = x <= maxScrollX && movingDirectionX === 1 /* Positive */;
  var outOfTopBoundary = y >= minScrollY && movingDirectionY === -1 /* Negative */;
  var outOfBottomBoundary = y <= maxScrollY && movingDirectionY === 1 /* Positive */;
  if (hasVerticalScroll) {
    ret = outOfTopBoundary || outOfBottomBoundary;
  } else if (hasHorizontalScroll) {
    ret = outOfLeftBoundary || outOfRightBoundary;
  }
  return ret;
};
var isResettingPosition = function isResettingPosition(scroll) {
  var hasHorizontalScroll = scroll.hasHorizontalScroll,
    hasVerticalScroll = scroll.hasVerticalScroll,
    x = scroll.x,
    y = scroll.y,
    minScrollX = scroll.minScrollX,
    maxScrollX = scroll.maxScrollX,
    minScrollY = scroll.minScrollY,
    maxScrollY = scroll.maxScrollY;
  var ret = false;
  var outOfLeftBoundary = x > minScrollX;
  var outOfRightBoundary = x < maxScrollX;
  var outOfTopBoundary = y > minScrollY;
  var outOfBottomBoundary = y < maxScrollY;
  if (hasVerticalScroll) {
    ret = outOfTopBoundary || outOfBottomBoundary;
  } else if (hasHorizontalScroll) {
    ret = outOfLeftBoundary || outOfRightBoundary;
  }
  return ret;
};
var resetPositionHandler = function resetPositionHandler(scroll) {
  scroll.scroller.reflow();
  scroll.resetPosition(0 /* Immediately */);
};

var calculateDistance = function calculateDistance(childNode, parentNode) {
  var distance = 0;
  var parent = childNode.parentNode;
  while (parent && parent !== parentNode) {
    distance++;
    parent = parent.parentNode;
  }
  return distance;
};
var NestedScroll = /** @class */function () {
  function NestedScroll(scroll) {
    var groupId = this.handleOptions(scroll);
    var instance = NestedScroll.instancesMap[groupId];
    if (!instance) {
      instance = NestedScroll.instancesMap[groupId] = this;
      instance.store = [];
      instance.hooksFn = [];
    }
    instance.init(scroll);
    return instance;
  }
  NestedScroll.getAllNestedScrolls = function () {
    var instancesMap = NestedScroll.instancesMap;
    return Object.keys(instancesMap).map(function (key) {
      return instancesMap[key];
    });
  };
  NestedScroll.purgeAllNestedScrolls = function () {
    var nestedScrolls = NestedScroll.getAllNestedScrolls();
    nestedScrolls.forEach(function (ns) {
      return ns.purgeNestedScroll();
    });
  };
  NestedScroll.prototype.handleOptions = function (scroll) {
    var userOptions = scroll.options.nestedScroll === true ? {} : scroll.options.nestedScroll;
    var defaultOptions = {
      groupId: DEFAUL_GROUP_ID
    };
    this.options = extend(defaultOptions, userOptions);
    var groupIdType = (0, _typeof2.default)(this.options.groupId);
    if (groupIdType !== 'string' && groupIdType !== 'number') {
      warn('groupId must be string or number for NestedScroll plugin');
    }
    return this.options.groupId;
  };
  NestedScroll.prototype.init = function (scroll) {
    scroll.proxy(propertiesConfig$1);
    this.addBScroll(scroll);
    this.buildBScrollGraph();
    this.analyzeBScrollGraph();
    this.ensureEventInvokeSequence();
    this.handleHooks(scroll);
  };
  NestedScroll.prototype.handleHooks = function (scroll) {
    var _this = this;
    this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.destroy, function () {
      _this.deleteScroll(scroll);
    });
  };
  NestedScroll.prototype.deleteScroll = function (scroll) {
    var wrapper = scroll.wrapper;
    wrapper.isBScrollContainer = undefined;
    var store = this.store;
    var hooksFn = this.hooksFn;
    var i = findIndex(store, function (bscrollFamily) {
      return bscrollFamily.selfScroll === scroll;
    });
    if (i > -1) {
      var bscrollFamily = store[i];
      bscrollFamily.purge();
      store.splice(i, 1);
    }
    var k = findIndex(hooksFn, function (_a) {
      var hooks = _a[0];
      return hooks === scroll.hooks;
    });
    if (k > -1) {
      var _a = hooksFn[k],
        hooks = _a[0],
        eventType = _a[1],
        handler = _a[2];
      hooks.off(eventType, handler);
      hooksFn.splice(k, 1);
    }
  };
  NestedScroll.prototype.addBScroll = function (scroll) {
    this.store.push(BScrollFamily.create(scroll));
  };
  NestedScroll.prototype.buildBScrollGraph = function () {
    var store = this.store;
    var bf1;
    var bf2;
    var wrapper1;
    var wrapper2;
    var len = this.store.length;
    // build graph
    for (var i = 0; i < len; i++) {
      bf1 = store[i];
      wrapper1 = bf1.selfScroll.wrapper;
      for (var j = 0; j < len; j++) {
        bf2 = store[j];
        wrapper2 = bf2.selfScroll.wrapper;
        // same bs
        if (bf1 === bf2) continue;
        if (!wrapper1.contains(wrapper2)) continue;
        // bs1 contains bs2
        var distance = calculateDistance(wrapper2, wrapper1);
        if (!bf1.hasDescendants(bf2)) {
          bf1.addDescendant(bf2, distance);
        }
        if (!bf2.hasAncestors(bf1)) {
          bf2.addAncestor(bf1, distance);
        }
      }
    }
  };
  NestedScroll.prototype.analyzeBScrollGraph = function () {
    this.store.forEach(function (bscrollFamily) {
      if (bscrollFamily.analyzed) {
        return;
      }
      var ancestors = bscrollFamily.ancestors,
        descendants = bscrollFamily.descendants,
        currentScroll = bscrollFamily.selfScroll;
      var beforeScrollStartHandler = function beforeScrollStartHandler() {
        // always get the latest scroll
        var ancestorScrolls = ancestors.map(function (_a) {
          var bscrollFamily = _a[0];
          return bscrollFamily.selfScroll;
        });
        var descendantScrolls = descendants.map(function (_a) {
          var bscrollFamily = _a[0];
          return bscrollFamily.selfScroll;
        });
        forceScrollStopHandler(__spreadArrays(ancestorScrolls, descendantScrolls));
        if (isResettingPosition(currentScroll)) {
          resetPositionHandler(currentScroll);
        }
        syncTouchstartData(ancestorScrolls);
        disableScrollHander(ancestorScrolls, currentScroll);
      };
      var touchEndHandler = function touchEndHandler() {
        var ancestorScrolls = ancestors.map(function (_a) {
          var bscrollFamily = _a[0];
          return bscrollFamily.selfScroll;
        });
        var descendantScrolls = descendants.map(function (_a) {
          var bscrollFamily = _a[0];
          return bscrollFamily.selfScroll;
        });
        enableScrollHander(__spreadArrays(ancestorScrolls, descendantScrolls));
      };
      bscrollFamily.registerHooks(currentScroll, currentScroll.eventTypes.beforeScrollStart, beforeScrollStartHandler);
      bscrollFamily.registerHooks(currentScroll, currentScroll.eventTypes.touchEnd, touchEndHandler);
      var selfActionsHooks = currentScroll.scroller.actions.hooks;
      bscrollFamily.registerHooks(selfActionsHooks, selfActionsHooks.eventTypes.detectMovingDirection, function () {
        var ancestorScrolls = ancestors.map(function (_a) {
          var bscrollFamily = _a[0];
          return bscrollFamily.selfScroll;
        });
        var parentScroll = ancestorScrolls[0];
        var otherAncestorScrolls = ancestorScrolls.slice(1);
        var contentMoved = currentScroll.scroller.actions.contentMoved;
        var isTopScroll = ancestorScrolls.length === 0;
        if (contentMoved) {
          disableScrollHander(ancestorScrolls, currentScroll);
        } else if (!isTopScroll) {
          if (isOutOfBoundary(currentScroll)) {
            disableScrollHander([currentScroll], currentScroll);
            if (parentScroll) {
              enableScrollHander([parentScroll]);
            }
            disableScrollHander(otherAncestorScrolls, currentScroll);
            return true;
          }
        }
      });
      bscrollFamily.setAnalyzed(true);
    });
  };
  // make sure touchmove|touchend invoke from child to parent
  NestedScroll.prototype.ensureEventInvokeSequence = function () {
    var copied = this.store.slice();
    var sequencedScroll = copied.sort(function (a, b) {
      return a.descendants.length - b.descendants.length;
    });
    sequencedScroll.forEach(function (bscrollFamily) {
      var scroll = bscrollFamily.selfScroll;
      scroll.scroller.actionsHandler.rebindDOMEvents();
    });
  };
  NestedScroll.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  NestedScroll.prototype.purgeNestedScroll = function () {
    var groupId = this.options.groupId;
    this.store.forEach(function (bscrollFamily) {
      bscrollFamily.purge();
    });
    this.store = [];
    this.hooksFn.forEach(function (_a) {
      var hooks = _a[0],
        eventType = _a[1],
        handler = _a[2];
      hooks.off(eventType, handler);
    });
    this.hooksFn = [];
    delete NestedScroll.instancesMap[groupId];
  };
  NestedScroll.pluginName = 'nestedScroll';
  NestedScroll.instancesMap = {};
  return NestedScroll;
}();
exports.NestedScroll = NestedScroll;
var PRE_NUM = 10;
var POST_NUM = 30;
var IndexCalculator = /** @class */function () {
  function IndexCalculator(wrapperHeight, tombstoneHeight) {
    this.wrapperHeight = wrapperHeight;
    this.tombstoneHeight = tombstoneHeight;
    this.lastDirection = 1 /* DOWN */;
    this.lastPos = 0;
  }
  IndexCalculator.prototype.calculate = function (pos, list) {
    var offset = pos - this.lastPos;
    this.lastPos = pos;
    var direction = this.getDirection(offset);
    // important! start index is much more important than end index.
    var start = this.calculateIndex(0, pos, list);
    var end = this.calculateIndex(start, pos + this.wrapperHeight, list);
    if (direction === 1 /* DOWN */) {
      start -= PRE_NUM;
      end += POST_NUM;
    } else {
      start -= POST_NUM;
      end += PRE_NUM;
    }
    if (start < 0) {
      start = 0;
    }
    return {
      start: start,
      end: end
    };
  };
  IndexCalculator.prototype.getDirection = function (offset) {
    var direction;
    if (offset > 0) {
      direction = 1 /* DOWN */;
    } else if (offset < 0) {
      direction = 0 /* UP */;
    } else {
      return this.lastDirection;
    }
    this.lastDirection = direction;
    return direction;
  };
  IndexCalculator.prototype.calculateIndex = function (start, offset, list) {
    if (offset <= 0) {
      return start;
    }
    var i = start;
    var startPos = list[i] && list[i].pos !== -1 ? list[i].pos : 0;
    var lastPos = startPos;
    var tombstone = 0;
    while (i < list.length && list[i].pos < offset) {
      lastPos = list[i].pos;
      i++;
    }
    if (i === list.length) {
      tombstone = Math.floor((offset - lastPos) / this.tombstoneHeight);
    }
    i += tombstone;
    return i;
  };
  IndexCalculator.prototype.resetState = function () {
    this.lastDirection = 1 /* DOWN */;
    this.lastPos = 0;
  };
  return IndexCalculator;
}();
var ListItem = /** @class */function () {
  function ListItem() {
    this.data = null;
    this.dom = null;
    this.tombstone = null;
    this.width = 0;
    this.height = 0;
    this.pos = 0;
  }
  return ListItem;
}();
var DataManager = /** @class */function () {
  function DataManager(list, fetchFn, onFetchFinish) {
    this.fetchFn = fetchFn;
    this.onFetchFinish = onFetchFinish;
    this.loadedNum = 0;
    this.fetching = false;
    this.hasMore = true;
    this.list = list || [];
  }
  DataManager.prototype.update = function (end) {
    return __awaiter(this, void 0, void 0, function () {
      var len;
      return __generator(this, function (_a) {
        if (!this.hasMore) {
          end = Math.min(end, this.list.length);
        }
        // add data placeholder
        if (end > this.list.length) {
          len = end - this.list.length;
          this.addEmptyData(len);
        }
        // tslint:disable-next-line: no-floating-promises
        return [2 /*return*/, this.checkToFetch(end)];
      });
    });
  };
  DataManager.prototype.add = function (data) {
    for (var i = 0; i < data.length; i++) {
      if (!this.list[this.loadedNum]) {
        this.list[this.loadedNum] = {
          data: data[i]
        };
      } else {
        this.list[this.loadedNum] = _assign(_assign({}, this.list[this.loadedNum]), {
          data: data[i]
        });
      }
      this.loadedNum++;
    }
    return this.list;
  };
  DataManager.prototype.addEmptyData = function (len) {
    for (var i = 0; i < len; i++) {
      this.list.push(new ListItem());
    }
    return this.list;
  };
  DataManager.prototype.fetch = function (len) {
    return __awaiter(this, void 0, void 0, function () {
      var data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.fetching) {
              return [2 /*return*/, []];
            }
            this.fetching = true;
            return [4 /*yield*/, this.fetchFn(len)];
          case 1:
            data = _a.sent();
            this.fetching = false;
            return [2 /*return*/, data];
        }
      });
    });
  };
  DataManager.prototype.checkToFetch = function (end) {
    return __awaiter(this, void 0, void 0, function () {
      var min, newData, currentEnd;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.hasMore) {
              return [2 /*return*/];
            }

            if (end <= this.loadedNum) {
              return [2 /*return*/];
            }

            min = end - this.loadedNum;
            return [4 /*yield*/, this.fetch(min)];
          case 1:
            newData = _a.sent();
            if (newData instanceof Array && newData.length) {
              this.add(newData);
              currentEnd = this.onFetchFinish(this.list, true);
              return [2 /*return*/, this.checkToFetch(currentEnd)];
            } else if (typeof newData === 'boolean' && newData === false) {
              this.hasMore = false;
              this.list.splice(this.loadedNum);
              this.onFetchFinish(this.list, false);
            }
            return [2 /*return*/];
        }
      });
    });
  };

  DataManager.prototype.getList = function () {
    return this.list;
  };
  DataManager.prototype.resetState = function () {
    this.loadedNum = 0;
    this.fetching = false;
    this.hasMore = true;
    this.list = [];
  };
  return DataManager;
}();
var Tombstone = /** @class */function () {
  function Tombstone(create) {
    this.create = create;
    this.cached = [];
    this.width = 0;
    this.height = 0;
    this.initialed = false;
    this.getSize();
  }
  Tombstone.isTombstone = function (el) {
    if (el && el.classList) {
      return el.classList.contains('tombstone');
    }
    return false;
  };
  Tombstone.prototype.getSize = function () {
    if (!this.initialed) {
      var tombstone = this.create();
      tombstone.style.position = 'absolute';
      document.body.appendChild(tombstone);
      tombstone.style.display = '';
      this.height = tombstone.offsetHeight;
      this.width = tombstone.offsetWidth;
      document.body.removeChild(tombstone);
      this.cached.push(tombstone);
    }
  };
  Tombstone.prototype.getOne = function () {
    var tombstone = this.cached.pop();
    if (tombstone) {
      var tombstoneStyle = tombstone.style;
      tombstoneStyle.display = '';
      tombstoneStyle.opacity = '1';
      tombstoneStyle[style.transform] = '';
      tombstoneStyle[style.transition] = '';
      return tombstone;
    }
    return this.create();
  };
  Tombstone.prototype.recycle = function (tombstones) {
    for (var _i = 0, tombstones_1 = tombstones; _i < tombstones_1.length; _i++) {
      var tombstone = tombstones_1[_i];
      tombstone.style.display = 'none';
      this.cached.push(tombstone);
    }
    return this.cached;
  };
  Tombstone.prototype.recycleOne = function (tombstone) {
    this.cached.push(tombstone);
    return this.cached;
  };
  return Tombstone;
}();
var ANIMATION_DURATION_MS = 200;
var DomManager = /** @class */function () {
  function DomManager(content, renderFn, tombstone) {
    this.renderFn = renderFn;
    this.tombstone = tombstone;
    this.unusedDom = [];
    this.timers = [];
    this.setContent(content);
  }
  DomManager.prototype.update = function (list, start, end) {
    if (start >= list.length) {
      start = list.length - 1;
    }
    if (end > list.length) {
      end = list.length;
    }
    this.collectUnusedDom(list, start, end);
    this.createDom(list, start, end);
    this.cacheHeight(list, start, end);
    var _a = this.positionDom(list, start, end),
      startPos = _a.startPos,
      startDelta = _a.startDelta,
      endPos = _a.endPos;
    return {
      start: start,
      startPos: startPos,
      startDelta: startDelta,
      end: end,
      endPos: endPos
    };
  };
  DomManager.prototype.collectUnusedDom = function (list, start, end) {
    // TODO optimise
    for (var i = 0; i < list.length; i++) {
      if (i === start) {
        i = end - 1;
        continue;
      }
      if (list[i].dom) {
        var dom = list[i].dom;
        if (Tombstone.isTombstone(dom)) {
          this.tombstone.recycleOne(dom);
          dom.style.display = 'none';
        } else {
          this.unusedDom.push(dom);
        }
        list[i].dom = null;
      }
    }
    return list;
  };
  DomManager.prototype.createDom = function (list, start, end) {
    for (var i = start; i < end; i++) {
      var dom = list[i].dom;
      var data = list[i].data;
      if (dom) {
        if (Tombstone.isTombstone(dom) && data) {
          list[i].tombstone = dom;
          list[i].dom = null;
        } else {
          continue;
        }
      }
      dom = data ? this.renderFn(data, this.unusedDom.pop()) : this.tombstone.getOne();
      dom.style.position = 'absolute';
      list[i].dom = dom;
      list[i].pos = -1;
      this.content.appendChild(dom);
    }
  };
  DomManager.prototype.cacheHeight = function (list, start, end) {
    for (var i = start; i < end; i++) {
      if (list[i].data && !list[i].height) {
        list[i].height = list[i].dom.offsetHeight;
      }
    }
  };
  DomManager.prototype.positionDom = function (list, start, end) {
    var _this = this;
    var tombstoneEles = [];
    var _a = this.getStartPos(list, start, end),
      startPos = _a.start,
      startDelta = _a.delta;
    var pos = startPos;
    for (var i = start; i < end; i++) {
      var tombstone = list[i].tombstone;
      if (tombstone) {
        var tombstoneStyle = tombstone.style;
        tombstoneStyle[style.transition] = cssVendor + "transform " + ANIMATION_DURATION_MS + "ms, opacity " + ANIMATION_DURATION_MS + "ms";
        tombstoneStyle[style.transform] = "translateY(" + pos + "px)";
        tombstoneStyle.opacity = '0';
        list[i].tombstone = null;
        tombstoneEles.push(tombstone);
      }
      if (list[i].dom && list[i].pos !== pos) {
        list[i].dom.style[style.transform] = "translateY(" + pos + "px)";
        list[i].pos = pos;
      }
      pos += list[i].height || this.tombstone.height;
    }
    var timerId = window.setTimeout(function () {
      _this.tombstone.recycle(tombstoneEles);
    }, ANIMATION_DURATION_MS);
    this.timers.push(timerId);
    return {
      startPos: startPos,
      startDelta: startDelta,
      endPos: pos
    };
  };
  DomManager.prototype.getStartPos = function (list, start, end) {
    if (list[start] && list[start].pos !== -1) {
      return {
        start: list[start].pos,
        delta: 0
      };
    }
    // TODO optimise
    var pos = list[0].pos === -1 ? 0 : list[0].pos;
    for (var i_1 = 0; i_1 < start; i_1++) {
      pos += list[i_1].height || this.tombstone.height;
    }
    var originPos = pos;
    var i;
    for (i = start; i < end; i++) {
      if (!Tombstone.isTombstone(list[i].dom) && list[i].pos !== -1) {
        pos = list[i].pos;
        break;
      }
    }
    var x = i;
    if (x < end) {
      while (x > start) {
        pos -= list[x - 1].height;
        x--;
      }
    }
    var delta = originPos - pos;
    return {
      start: pos,
      delta: delta
    };
  };
  DomManager.prototype.removeTombstone = function () {
    var tombstones = this.content.querySelectorAll('.tombstone');
    for (var i = tombstones.length - 1; i >= 0; i--) {
      this.content.removeChild(tombstones[i]);
    }
  };
  DomManager.prototype.setContent = function (content) {
    if (content !== this.content) {
      this.content = content;
    }
  };
  DomManager.prototype.destroy = function () {
    this.removeTombstone();
    this.timers.forEach(function (id) {
      clearTimeout(id);
    });
  };
  DomManager.prototype.resetState = function () {
    this.destroy();
    this.timers = [];
    this.unusedDom = [];
  };
  return DomManager;
}();
var EXTRA_SCROLL_Y = -2000;
var InfinityScroll = /** @class */function () {
  function InfinityScroll(scroll) {
    this.scroll = scroll;
    this.start = 0;
    this.end = 0;
    this.init();
  }
  InfinityScroll.prototype.init = function () {
    var _this = this;
    this.handleOptions();
    var _a = this.options,
      fetchFn = _a.fetch,
      renderFn = _a.render,
      createTombstoneFn = _a.createTombstone;
    this.tombstone = new Tombstone(createTombstoneFn);
    this.indexCalculator = new IndexCalculator(this.scroll.scroller.scrollBehaviorY.wrapperSize, this.tombstone.height);
    this.domManager = new DomManager(this.scroll.scroller.content, renderFn, this.tombstone);
    this.dataManager = new DataManager([], fetchFn, this.onFetchFinish.bind(this));
    this.scroll.on(this.scroll.eventTypes.destroy, this.destroy, this);
    this.scroll.on(this.scroll.eventTypes.scroll, this.update, this);
    this.scroll.on(this.scroll.eventTypes.contentChanged, function (content) {
      _this.domManager.setContent(content);
      _this.indexCalculator.resetState();
      _this.domManager.resetState();
      _this.dataManager.resetState();
      _this.update({
        y: 0
      });
    });
    var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
    scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.computeBoundary, this.modifyBoundary, this);
    this.update({
      y: 0
    });
  };
  InfinityScroll.prototype.modifyBoundary = function (boundary) {
    // manually set position to allow scroll
    boundary.maxScrollPos = EXTRA_SCROLL_Y;
  };
  InfinityScroll.prototype.handleOptions = function () {
    // narrow down type to an object
    var infinityOptions = this.scroll.options.infinity;
    if (infinityOptions) {
      if (typeof infinityOptions.fetch !== 'function') {
        warn('Infinity plugin need fetch Function to new data.');
      }
      if (typeof infinityOptions.render !== 'function') {
        warn('Infinity plugin need render Function to render each item.');
      }
      if (typeof infinityOptions.render !== 'function') {
        warn('Infinity plugin need createTombstone Function to create tombstone.');
      }
      this.options = infinityOptions;
    }
    this.scroll.options.probeType = 3 /* Realtime */;
  };

  InfinityScroll.prototype.update = function (pos) {
    var position = Math.round(-pos.y);
    // important! calculate start/end index to render
    var _a = this.indexCalculator.calculate(position, this.dataManager.getList()),
      start = _a.start,
      end = _a.end;
    this.start = start;
    this.end = end;
    // tslint:disable-next-line: no-floating-promises
    this.dataManager.update(end);
    this.updateDom(this.dataManager.getList());
  };
  InfinityScroll.prototype.onFetchFinish = function (list, hasMore) {
    var end = this.updateDom(list).end;
    if (!hasMore) {
      this.domManager.removeTombstone();
      this.scroll.scroller.animater.stop();
      this.scroll.resetPosition();
    }
    // tslint:disable-next-line: no-floating-promises
    return end;
  };
  InfinityScroll.prototype.updateDom = function (list) {
    var _a = this.domManager.update(list, this.start, this.end),
      end = _a.end,
      startPos = _a.startPos,
      endPos = _a.endPos,
      startDelta = _a.startDelta;
    if (startDelta) {
      this.scroll.minScrollY = startDelta;
    }
    if (endPos > this.scroll.maxScrollY) {
      this.scroll.maxScrollY = -(endPos - this.scroll.scroller.scrollBehaviorY.wrapperSize);
    }
    return {
      end: end,
      startPos: startPos,
      endPos: endPos
    };
  };
  InfinityScroll.prototype.destroy = function () {
    var _a = this.scroll.scroller,
      content = _a.content,
      scrollBehaviorY = _a.scrollBehaviorY;
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
    this.domManager.destroy();
    this.scroll.off('scroll', this.update);
    this.scroll.off('destroy', this.destroy);
    scrollBehaviorY.hooks.off(scrollBehaviorY.hooks.eventTypes.computeBoundary);
  };
  InfinityScroll.pluginName = 'infinity';
  return InfinityScroll;
}();
exports.InfinityScroll = InfinityScroll;
var sourcePrefix = 'plugins.movable';
var propertiesMap = [{
  key: 'putAt',
  name: 'putAt'
}];
var propertiesConfig = propertiesMap.map(function (item) {
  return {
    key: item.key,
    sourceKey: sourcePrefix + "." + item.name
  };
});
var Movable = /** @class */function () {
  function Movable(scroll) {
    this.scroll = scroll;
    this.handleBScroll();
    this.handleHooks();
  }
  Movable.prototype.handleBScroll = function () {
    this.scroll.proxy(propertiesConfig);
  };
  Movable.prototype.handleHooks = function () {
    var _this = this;
    this.hooksFn = [];
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    var computeBoundary = function computeBoundary(boundary, behavior) {
      if (boundary.maxScrollPos > 0) {
        // content is smaller than wrapper
        boundary.minScrollPos = behavior.wrapperSize - behavior.contentSize;
        boundary.maxScrollPos = 0;
      }
    };
    this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.ignoreHasScroll, function () {
      return true;
    });
    this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.computeBoundary, function (boundary) {
      computeBoundary(boundary, scrollBehaviorX);
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.ignoreHasScroll, function () {
      return true;
    });
    this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
      computeBoundary(boundary, scrollBehaviorY);
    });
    this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function () {
      _this.destroy();
    });
  };
  Movable.prototype.putAt = function (x, y, time, easing) {
    if (time === void 0) {
      time = this.scroll.options.bounceTime;
    }
    if (easing === void 0) {
      easing = ease.bounce;
    }
    var position = this.resolvePostion(x, y);
    this.scroll.scrollTo(position.x, position.y, time, easing);
  };
  Movable.prototype.resolvePostion = function (x, y) {
    var _a = this.scroll.scroller,
      scrollBehaviorX = _a.scrollBehaviorX,
      scrollBehaviorY = _a.scrollBehaviorY;
    var resolveFormula = {
      left: function left() {
        return 0;
      },
      top: function top() {
        return 0;
      },
      right: function right() {
        return scrollBehaviorX.minScrollPos;
      },
      bottom: function bottom() {
        return scrollBehaviorY.minScrollPos;
      },
      center: function center(index) {
        var baseSize = index === 0 ? scrollBehaviorX.minScrollPos : scrollBehaviorY.minScrollPos;
        return baseSize / 2;
      }
    };
    return {
      x: typeof x === 'number' ? x : resolveFormula[x](0),
      y: typeof y === 'number' ? y : resolveFormula[y](1)
    };
  };
  Movable.prototype.destroy = function () {
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  Movable.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Movable.pluginName = 'movable';
  Movable.applyOrder = "pre" /* Pre */;
  return Movable;
}();
exports.Movable = Movable;
var isImageTag = function isImageTag(el) {
  return el.tagName.toLowerCase() === 'img';
};
var ObserveImage = /** @class */function () {
  function ObserveImage(scroll) {
    this.scroll = scroll;
    this.refreshTimer = 0;
    this.init();
  }
  ObserveImage.prototype.init = function () {
    this.handleOptions(this.scroll.options.observeImage);
    this.bindEventsToWrapper();
  };
  ObserveImage.prototype.handleOptions = function (userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }
    userOptions = userOptions === true ? {} : userOptions;
    var defaultOptions = {
      debounceTime: 100
    };
    this.options = extend(defaultOptions, userOptions);
  };
  ObserveImage.prototype.bindEventsToWrapper = function () {
    var wrapper = this.scroll.scroller.wrapper;
    this.imageLoadEventRegister = new EventRegister(wrapper, [{
      name: 'load',
      handler: this.load.bind(this),
      capture: true
    }]);
    this.imageErrorEventRegister = new EventRegister(wrapper, [{
      name: 'error',
      handler: this.load.bind(this),
      capture: true
    }]);
  };
  ObserveImage.prototype.load = function (e) {
    var _this = this;
    var target = e.target;
    var debounceTime = this.options.debounceTime;
    if (target && isImageTag(target)) {
      if (debounceTime === 0) {
        this.scroll.refresh();
      } else {
        clearTimeout(this.refreshTimer);
        this.refreshTimer = window.setTimeout(function () {
          _this.scroll.refresh();
        }, this.options.debounceTime);
      }
    }
  };
  ObserveImage.pluginName = 'observeImage';
  return ObserveImage;
}();
exports.ObserveImage = ObserveImage;
var resolveRatioOption = function resolveRatioOption(ratioConfig) {
  var ret = {
    ratioX: 0,
    ratioY: 0
  };
  /* istanbul ignore if  */
  if (!ratioConfig) {
    return ret;
  }
  if (typeof ratioConfig === 'number') {
    ret.ratioX = ret.ratioY = ratioConfig;
  } else if ((0, _typeof2.default)(ratioConfig) === 'object' && ratioConfig) {
    ret.ratioX = ratioConfig.x || 0;
    ret.ratioY = ratioConfig.y || 0;
  }
  return ret;
};
var handleBubbleAndCancelable = function handleBubbleAndCancelable(e) {
  maybePrevent(e);
  e.stopPropagation();
};
var Indicator = /** @class */function () {
  function Indicator(scroll, options) {
    this.scroll = scroll;
    this.options = options;
    this.currentPos = {
      x: 0,
      y: 0
    };
    this.hooksFn = [];
    this.handleDOM();
    this.handleHooks();
    this.handleInteractive();
  }
  Indicator.prototype.handleDOM = function () {
    var _a = this.options,
      relationElement = _a.relationElement,
      _b = _a.relationElementHandleElementIndex,
      relationElementHandleElementIndex = _b === void 0 ? 0 : _b;
    this.wrapper = relationElement;
    this.indicatorEl = this.wrapper.children[relationElementHandleElementIndex];
  };
  Indicator.prototype.handleHooks = function () {
    var _this = this;
    var scroll = this.scroll;
    var scrollHooks = scroll.hooks;
    var translaterHooks = scroll.scroller.translater.hooks;
    var animaterHooks = scroll.scroller.animater.hooks;
    this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refresh);
    this.registerHooks(translaterHooks, translaterHooks.eventTypes.translate, function (pos) {
      _this.updatePosition(pos);
    });
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.time, this.transitionTime);
    this.registerHooks(animaterHooks, animaterHooks.eventTypes.timeFunction, this.transitionTimingFunction);
  };
  Indicator.prototype.transitionTime = function (time) {
    if (time === void 0) {
      time = 0;
    }
    this.indicatorEl.style[style.transitionDuration] = time + 'ms';
  };
  Indicator.prototype.transitionTimingFunction = function (easing) {
    this.indicatorEl.style[style.transitionTimingFunction] = easing;
  };
  Indicator.prototype.handleInteractive = function () {
    if (this.options.interactive !== false) {
      this.registerEvents();
    }
  };
  Indicator.prototype.registerHooks = function (hooks, name, handler) {
    hooks.on(name, handler, this);
    this.hooksFn.push([hooks, name, handler]);
  };
  Indicator.prototype.registerEvents = function () {
    var _a = this.scroll.options,
      disableMouse = _a.disableMouse,
      disableTouch = _a.disableTouch;
    var startEvents = [];
    var moveEvents = [];
    var endEvents = [];
    if (!disableMouse) {
      startEvents.push({
        name: 'mousedown',
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: 'mousemove',
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: 'mouseup',
        handler: this.end.bind(this)
      });
    }
    if (!disableTouch) {
      startEvents.push({
        name: 'touchstart',
        handler: this.start.bind(this)
      });
      moveEvents.push({
        name: 'touchmove',
        handler: this.move.bind(this)
      });
      endEvents.push({
        name: 'touchend',
        handler: this.end.bind(this)
      }, {
        name: 'touchcancel',
        handler: this.end.bind(this)
      });
    }
    this.startEventRegister = new EventRegister(this.indicatorEl, startEvents);
    this.moveEventRegister = new EventRegister(window, moveEvents);
    this.endEventRegister = new EventRegister(window, endEvents);
  };
  Indicator.prototype.refresh = function () {
    var _a = this.scroll,
      x = _a.x,
      y = _a.y,
      hasHorizontalScroll = _a.hasHorizontalScroll,
      hasVerticalScroll = _a.hasVerticalScroll,
      maxBScrollX = _a.maxScrollX,
      maxBScrollY = _a.maxScrollY;
    var _b = resolveRatioOption(this.options.ratio),
      ratioX = _b.ratioX,
      ratioY = _b.ratioY;
    var _c = getClientSize(this.wrapper),
      wrapperWidth = _c.width,
      wrapperHeight = _c.height;
    var _d = getRect(this.indicatorEl),
      indicatorWidth = _d.width,
      indicatorHeight = _d.height;
    if (hasHorizontalScroll) {
      this.maxScrollX = wrapperWidth - indicatorWidth;
      this.translateXSign = this.maxScrollX > 0 ? -1 /* Positive */ : 1 /* NotPositive */;
      this.minScrollX = 0;
      // ensure positive
      this.ratioX = ratioX ? ratioX : Math.abs(this.maxScrollX / maxBScrollX);
    }
    if (hasVerticalScroll) {
      this.maxScrollY = wrapperHeight - indicatorHeight;
      this.translateYSign = this.maxScrollY > 0 ? -1 /* Positive */ : 1 /* NotPositive */;
      this.minScrollY = 0;
      this.ratioY = ratioY ? ratioY : Math.abs(this.maxScrollY / maxBScrollY);
    }
    this.updatePosition({
      x: x,
      y: y
    });
  };
  Indicator.prototype.start = function (e) {
    if (this.BScrollIsDisabled()) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    handleBubbleAndCancelable(e);
    this.initiated = true;
    this.moved = false;
    this.lastPointX = point.pageX;
    this.lastPointY = point.pageY;
    this.startTime = getNow();
    this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
  };
  Indicator.prototype.BScrollIsDisabled = function () {
    return !this.scroll.enabled;
  };
  Indicator.prototype.move = function (e) {
    if (!this.initiated) {
      return;
    }
    var point = e.touches ? e.touches[0] : e;
    var pointX = point.pageX;
    var pointY = point.pageY;
    handleBubbleAndCancelable(e);
    var deltaX = pointX - this.lastPointX;
    var deltaY = pointY - this.lastPointY;
    this.lastPointX = pointX;
    this.lastPointY = pointY;
    if (!this.moved && !this.indicatorNotMoved(deltaX, deltaY)) {
      this.moved = true;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart);
    }
    if (this.moved) {
      var newPos = this.getBScrollPosByRatio(this.currentPos, deltaX, deltaY);
      this.syncBScroll(newPos);
    }
  };
  Indicator.prototype.end = function (e) {
    if (!this.initiated) {
      return;
    }
    this.initiated = false;
    handleBubbleAndCancelable(e);
    if (this.moved) {
      var _a = this.scroll,
        x = _a.x,
        y = _a.y;
      this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
        x: x,
        y: y
      });
    }
  };
  Indicator.prototype.getBScrollPosByRatio = function (currentPos, deltaX, deltaY) {
    var currentX = currentPos.x,
      currentY = currentPos.y;
    var _a = this.scroll,
      hasHorizontalScroll = _a.hasHorizontalScroll,
      hasVerticalScroll = _a.hasVerticalScroll,
      BScrollMinScrollX = _a.minScrollX,
      BScrollMaxScrollX = _a.maxScrollX,
      BScrollMinScrollY = _a.minScrollY,
      BScrollMaxScrollY = _a.maxScrollY;
    var _b = this.scroll,
      x = _b.x,
      y = _b.y;
    if (hasHorizontalScroll) {
      var newPosX = between(currentX + deltaX, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
      var roundX = Math.round(newPosX / this.ratioX * this.translateXSign);
      x = between(roundX, BScrollMaxScrollX, BScrollMinScrollX);
    }
    if (hasVerticalScroll) {
      var newPosY = between(currentY + deltaY, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
      var roundY = Math.round(newPosY / this.ratioY * this.translateYSign);
      y = between(roundY, BScrollMaxScrollY, BScrollMinScrollY);
    }
    return {
      x: x,
      y: y
    };
  };
  Indicator.prototype.indicatorNotMoved = function (deltaX, deltaY) {
    var _a = this.currentPos,
      x = _a.x,
      y = _a.y;
    var xNotMoved = x === this.minScrollX && deltaX <= 0 || x === this.maxScrollX && deltaX >= 0;
    var yNotMoved = y === this.minScrollY && deltaY <= 0 || y === this.maxScrollY && deltaY >= 0;
    return xNotMoved && yNotMoved;
  };
  Indicator.prototype.syncBScroll = function (newPos) {
    var timestamp = getNow();
    var _a = this.scroll,
      options = _a.options,
      scroller = _a.scroller;
    var probeType = options.probeType,
      momentumLimitTime = options.momentumLimitTime;
    scroller.translater.translate(newPos);
    // dispatch scroll in interval time
    if (timestamp - this.startTime > momentumLimitTime) {
      this.startTime = timestamp;
      if (probeType === 1 /* Throttle */) {
        scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, newPos);
      }
    }
    // dispatch scroll all the time
    if (probeType > 1 /* Throttle */) {
      scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, newPos);
    }
  };
  Indicator.prototype.updatePosition = function (BScrollPos) {
    var newIndicatorPos = this.getIndicatorPosByRatio(BScrollPos);
    this.applyTransformProperty(newIndicatorPos);
    this.currentPos = _assign({}, newIndicatorPos);
  };
  Indicator.prototype.applyTransformProperty = function (pos) {
    var translateZ = this.scroll.options.translateZ;
    var transformProperties = ["translateX(" + pos.x + "px)", "translateY(" + pos.y + "px)", "" + translateZ];
    this.indicatorEl.style[style.transform] = transformProperties.join(' ');
  };
  Indicator.prototype.getIndicatorPosByRatio = function (BScrollPos) {
    var x = BScrollPos.x,
      y = BScrollPos.y;
    var _a = this.scroll,
      hasHorizontalScroll = _a.hasHorizontalScroll,
      hasVerticalScroll = _a.hasVerticalScroll;
    var position = _assign({}, this.currentPos);
    if (hasHorizontalScroll) {
      var roundX = Math.round(this.ratioX * x * this.translateXSign);
      // maybe maxScrollX is negative
      position.x = between(roundX, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
    }
    if (hasVerticalScroll) {
      var roundY = Math.round(this.ratioY * y * this.translateYSign);
      // maybe maxScrollY is negative
      position.y = between(roundY, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
    }
    return position;
  };
  Indicator.prototype.destroy = function () {
    if (this.options.interactive !== false) {
      this.startEventRegister.destroy();
      this.moveEventRegister.destroy();
      this.endEventRegister.destroy();
    }
    this.hooksFn.forEach(function (item) {
      var hooks = item[0];
      var hooksName = item[1];
      var handlerFn = item[2];
      hooks.off(hooksName, handlerFn);
    });
    this.hooksFn.length = 0;
  };
  return Indicator;
}();
var Indicators = /** @class */function () {
  function Indicators(scroll) {
    this.scroll = scroll;
    this.options = [];
    this.indicators = [];
    this.handleOptions();
    this.handleHooks();
  }
  Indicators.prototype.handleOptions = function () {
    var UserIndicatorsOptions = this.scroll.options.indicators;
    assert(Array.isArray(UserIndicatorsOptions), "'indicators' must be an array.");
    for (var _i = 0, UserIndicatorsOptions_1 = UserIndicatorsOptions; _i < UserIndicatorsOptions_1.length; _i++) {
      var indicatorOptions = UserIndicatorsOptions_1[_i];
      assert(!!indicatorOptions.relationElement, "'relationElement' must be a HTMLElement.");
      this.createIndicators(indicatorOptions);
    }
  };
  Indicators.prototype.createIndicators = function (options) {
    this.indicators.push(new Indicator(this.scroll, options));
  };
  Indicators.prototype.handleHooks = function () {
    var _this = this;
    var scrollHooks = this.scroll.hooks;
    scrollHooks.on(scrollHooks.eventTypes.destroy, function () {
      for (var _i = 0, _a = _this.indicators; _i < _a.length; _i++) {
        var indicator = _a[_i];
        indicator.destroy();
      }
      _this.indicators = [];
    });
  };
  Indicators.pluginName = 'indicators';
  return Indicators;
}();
exports.Indicators = Indicators;
BScroll.use(MouseWheel).use(ObserveDOM).use(PullDown).use(PullUp).use(ScrollBar).use(Slide).use(Wheel).use(Zoom).use(NestedScroll).use(InfinityScroll).use(Movable).use(ObserveImage).use(Indicators);

/***/ }),
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */
/*!************************************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/assets/detail-img/21eb9feaaedb3693a489ea3c55840f2.jpg ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/detail-img/21eb9feaaedb3693a489ea3c55840f2.jpg";

/***/ }),
/* 139 */
/*!************************************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/assets/detail-img/e92b71fcecaee35548467f2e02d7e44.jpg ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/detail-img/e92b71fcecaee35548467f2e02d7e44.jpg";

/***/ }),
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */
/*!***************************************************!*\
  !*** D:/项目/uni-app/quna-uni/api/homeHoliday.json ***!
  \***************************************************/
/*! exports provided: ret, code, message, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"ret\":true,\"code\":200,\"message\":\"成功\",\"data\":{\"monthHoliday\":[{\"id\":\"M001\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M002\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M003\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M004\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M005\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M006\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M007\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"},{\"id\":\"M008\",\"url\":\"https://imgs.qunarzz.com/p/p70/1809/e7/4941057a6aae702.jpg_256x160_9fee6ccb.jpg\",\"titleSite\":\"广州-丽江\",\"titleMessage\":\"5天跟团游\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\"}],\"todayHoliday\":[{\"id\":\"T001\",\"url\":\"https://imgs.qunarzz.com/vs_ceph_b2c_001/29ad36de-ec47-4198-8685-6644dea56d5d.jpg_180x120x90_9773302b.jpg\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"holidayDesc\":\" 纯玩0购物💕丽江+大理4天丨动车往返丨洱海吉普旅拍丨圣托里尼丨赠西双版纳+机票\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\",\"priceMore\":\"起\"},{\"id\":\"T002\",\"url\":\"https://imgs.qunarzz.com/vs_ceph_b2c_001/29ad36de-ec47-4198-8685-6644dea56d5d.jpg_180x120x90_9773302b.jpg\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"holidayDesc\":\" 纯玩0购物💕丽江+大理4天丨动车往返丨洱海吉普旅拍丨圣托里尼丨赠西双版纳+机票\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\",\"priceMore\":\"起\"},{\"id\":\"T003\",\"url\":\"https://imgs.qunarzz.com/vs_ceph_b2c_001/29ad36de-ec47-4198-8685-6644dea56d5d.jpg_180x120x90_9773302b.jpg\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"holidayDesc\":\" 纯玩0购物💕丽江+大理4天丨动车往返丨洱海吉普旅拍丨圣托里尼丨赠西双版纳+机票\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\",\"priceMore\":\"起\"},{\"id\":\"T004\",\"url\":\"https://imgs.qunarzz.com/vs_ceph_b2c_001/29ad36de-ec47-4198-8685-6644dea56d5d.jpg_180x120x90_9773302b.jpg\",\"holidayName\":\"含往返飞机票(含税)+4晚住宿\",\"holidayDesc\":\" 纯玩0购物💕丽江+大理4天丨动车往返丨洱海吉普旅拍丨圣托里尼丨赠西双版纳+机票\",\"priceUnit\":\"¥\",\"priceNum\":\"4599\",\"priceMore\":\"起\"}]}}");

/***/ }),
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */
/*!**********************************************************************!*\
  !*** D:/项目/uni-app/quna-uni/node_modules/swiper/dist/css/swiper.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map