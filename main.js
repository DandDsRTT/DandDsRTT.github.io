/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/form-data/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
/***/ ((module) => {


module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),

/***/ "./node_modules/axios/lib/adapters/adapters.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




const knownAdapters = {
    http: _http_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(knownAdapters, (fn, value) => {
    if (fn) {
        try {
            Object.defineProperty(fn, 'name', { value });
        }
        catch (e) {
        }
        Object.defineProperty(fn, 'adapterName', { value });
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getAdapter: (adapters) => {
        adapters = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(adapters) ? adapters : [adapters];
        const { length } = adapters;
        let nameOrAdapter;
        let adapter;
        for (let i = 0; i < length; i++) {
            nameOrAdapter = adapters[i];
            if ((adapter = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
                break;
            }
        }
        if (!adapter) {
            if (adapter === false) {
                throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](`Adapter ${nameOrAdapter} is not supported by the environment`, 'ERR_NOT_SUPPORT');
            }
            throw new Error(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].hasOwnProp(knownAdapters, nameOrAdapter) ?
                `Adapter '${nameOrAdapter}' is not available in the build` :
                `Unknown adapter '${nameOrAdapter}'`);
        }
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(adapter)) {
            throw new TypeError('adapter is not a function');
        }
        return adapter;
    },
    adapters: knownAdapters
});


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../helpers/cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../helpers/isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");














function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = (0,_helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);
    return e => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;
        bytesNotified = loaded;
        const data = {
            loaded,
            total,
            progress: total ? (loaded / total) : undefined,
            bytes: progressBytes,
            rate: rate ? rate : undefined,
            estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
            event: e
        };
        data[isDownloadStream ? 'download' : 'upload'] = true;
        listener(data);
    };
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        let requestData = config.data;
        const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers).normalize();
        const responseType = config.responseType;
        let onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener('abort', onCanceled);
            }
        }
        if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFormData(requestData) && (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserEnv || _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserWebWorkerEnv)) {
            requestHeaders.setContentType(false);
        }
        let request = new XMLHttpRequest();
        if (config.auth) {
            const username = config.auth.username || '';
            const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
            requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        }
        const fullPath = (0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__["default"])(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
            if (!request) {
                return;
            }
            const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
            const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
                request.responseText : request.response;
            const response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            request = null;
        }
        if ('onloadend' in request) {
            request.onloadend = onloadend;
        }
        else {
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                    return;
                }
                setTimeout(onloadend);
            };
        }
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }
            reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED, config, request));
            request = null;
        };
        request.onerror = function handleError() {
            reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_NETWORK, config, request));
            request = null;
        };
        request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
            const transitional = config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__["default"];
            if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"](timeoutErrorMessage, transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED, config, request));
            request = null;
        };
        if (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStandardBrowserEnv) {
            const xsrfValue = (config.withCredentials || (0,_helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__["default"])(fullPath))
                && config.xsrfCookieName && _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__["default"].read(config.xsrfCookieName);
            if (xsrfValue) {
                requestHeaders.set(config.xsrfHeaderName, xsrfValue);
            }
        }
        requestData === undefined && requestHeaders.setContentType(null);
        if ('setRequestHeader' in request) {
            _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
                request.setRequestHeader(key, val);
            });
        }
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== 'json') {
            request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === 'function') {
            request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
        }
        if (typeof config.onUploadProgress === 'function' && request.upload) {
            request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
        }
        if (config.cancelToken || config.signal) {
            onCanceled = cancel => {
                if (!request) {
                    return;
                }
                reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__["default"](null, config, request) : cancel);
                request.abort();
                request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
            }
        }
        const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__["default"])(fullPath);
        if (protocol && _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].protocols.indexOf(protocol) === -1) {
            reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Unsupported protocol ' + protocol + ':', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_BAD_REQUEST, config));
            return;
        }
        request.send(requestData || null);
    });
});


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers/HttpStatusCode.js */ "./node_modules/axios/lib/helpers/HttpStatusCode.js");

















function createInstance(defaultConfig) {
    const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"](defaultConfig);
    const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.request, context);
    _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, context, { allOwnKeys: true });
    _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
        return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
    };
    return instance;
}
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"];
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_8__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__["default"];
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__["default"];
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__["default"];
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__["default"];
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];
axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__["default"];
axios.formToJSON = thing => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);
axios.HttpStatusCode = _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_15__["default"];
axios.default = axios;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");


class CancelToken {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError('executor must be a function.');
        }
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
        });
        const token = this;
        this.promise.then(cancel => {
            if (!token._listeners)
                return;
            let i = token._listeners.length;
            while (i-- > 0) {
                token._listeners[i](cancel);
            }
            token._listeners = null;
        });
        this.promise.then = onfulfilled => {
            let _resolve;
            const promise = new Promise(resolve => {
                token.subscribe(resolve);
                _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
                token.unsubscribe(_resolve);
            };
            return promise;
        };
        executor(function cancel(message, config, request) {
            if (token.reason) {
                return;
            }
            token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
            resolvePromise(token.reason);
        });
    }
    throwIfRequested() {
        if (this.reason) {
            throw this.reason;
        }
    }
    subscribe(listener) {
        if (this.reason) {
            listener(this.reason);
            return;
        }
        if (this._listeners) {
            this._listeners.push(listener);
        }
        else {
            this._listeners = [listener];
        }
    }
    unsubscribe(listener) {
        if (!this._listeners) {
            return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    }
    static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
            cancel = c;
        });
        return {
            token,
            cancel
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CancelToken);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");



function CanceledError(message, config, request) {
    _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
    this.name = 'CanceledError';
}
_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].inherits(CanceledError, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
    __CANCEL__: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanceledError);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isCancel)
/* harmony export */ });

function isCancel(value) {
    return !!(value && value.__CANCEL__);
}


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");









const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].validators;
class Axios {
    constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
            request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
            response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
        };
    }
    request(configOrUrl, config) {
        if (typeof configOrUrl === 'string') {
            config = config || {};
            config.url = configOrUrl;
        }
        else {
            config = configOrUrl || {};
        }
        config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);
        const { transitional, paramsSerializer, headers } = config;
        if (transitional !== undefined) {
            _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(transitional, {
                silentJSONParsing: validators.transitional(validators.boolean),
                forcedJSONParsing: validators.transitional(validators.boolean),
                clarifyTimeoutError: validators.transitional(validators.boolean)
            }, false);
        }
        if (paramsSerializer !== undefined) {
            _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(paramsSerializer, {
                encode: validators.function,
                serialize: validators.function
            }, true);
        }
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();
        let contextHeaders;
        contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].merge(headers.common, headers[config.method]);
        contextHeaders && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (method) => {
            delete headers[method];
        });
        config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].concat(contextHeaders, headers);
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
                return;
            }
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i = 0;
        let len;
        if (!synchronousRequestInterceptors) {
            const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].bind(this), undefined];
            chain.unshift.apply(chain, requestInterceptorChain);
            chain.push.apply(chain, responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while (i < len) {
                promise = promise.then(chain[i++], chain[i++]);
            }
            return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config;
        i = 0;
        while (i < len) {
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
                newConfig = onFulfilled(newConfig);
            }
            catch (error) {
                onRejected.call(this, error);
                break;
            }
        }
        try {
            promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, newConfig);
        }
        catch (error) {
            return Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while (i < len) {
            promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }
        return promise;
    }
    getUri(config) {
        config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);
        const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__["default"])(config.baseURL, config.url);
        return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__["default"])(fullPath, config.params, config.paramsSerializer);
    }
}
_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    Axios.prototype[method] = function (url, config) {
        return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
            method,
            url,
            data: (config || {}).data
        }));
    };
});
_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
            return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
                method,
                headers: isForm ? {
                    'Content-Type': 'multipart/form-data'
                } : {},
                url,
                data
            }));
        };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axios);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");


function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }
    else {
        this.stack = (new Error()).stack;
    }
    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
}
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].inherits(AxiosError, Error, {
    toJSON: function toJSON() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        };
    }
});
const prototype = AxiosError.prototype;
const descriptors = {};
[
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL'
].forEach(code => {
    descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype);
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
    }, prop => {
        return prop !== 'isAxiosError';
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosError);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");



const $internals = Symbol('internals');
function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
    if (value === false || value == null) {
        return value;
    }
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
    }
    return tokens;
}
function isValidHeaderName(str) {
    return /^[-_a-zA-Z]+$/.test(str.trim());
}
function matchHeaderValue(context, value, header, filter) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
        return filter.call(this, value, header);
    }
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value))
        return;
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
        return value.indexOf(filter) !== -1;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
        return filter.test(value);
    }
}
function formatHeader(header) {
    return header.trim()
        .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
    });
}
function buildAccessors(obj, header) {
    const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);
    ['get', 'set', 'has'].forEach(methodName => {
        Object.defineProperty(obj, methodName + accessorName, {
            value: function (arg1, arg2, arg3) {
                return this[methodName].call(this, header, arg1, arg2, arg3);
            },
            configurable: true
        });
    });
}
class AxiosHeaders {
    constructor(headers) {
        headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
        const self = this;
        function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) {
                throw new Error('header name must be a non-empty string');
            }
            const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);
            if (!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
                self[key || _header] = normalizeValue(_value);
            }
        }
        const setHeaders = (headers, _rewrite) => _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
        }
        else if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
        }
        else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
        }
        return this;
    }
    get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
            const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);
            if (key) {
                const value = this[key];
                if (!parser) {
                    return value;
                }
                if (parser === true) {
                    return parseTokens(value);
                }
                if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
                    return parser.call(this, value, key);
                }
                if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
                    return parser.exec(value);
                }
                throw new TypeError('parser must be boolean|regexp|function');
            }
        }
    }
    has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
            const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);
            return !!(key && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
    }
    delete(header, matcher) {
        const self = this;
        let deleted = false;
        function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
                const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);
                if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                    delete self[key];
                    deleted = true;
                }
            }
        }
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
            header.forEach(deleteHeader);
        }
        else {
            deleteHeader(header);
        }
        return deleted;
    }
    clear() {
        return Object.keys(this).forEach(this.delete.bind(this));
    }
    normalize(format) {
        const self = this;
        const headers = {};
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
            const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);
            if (key) {
                self[key] = normalizeValue(value);
                delete self[header];
                return;
            }
            const normalized = format ? formatHeader(header) : String(header).trim();
            if (normalized !== header) {
                delete self[header];
            }
            self[normalized] = normalizeValue(value);
            headers[normalized] = true;
        });
        return this;
    }
    concat(...targets) {
        return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
        const obj = Object.create(null);
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
            value != null && value !== false && (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
        });
        return obj;
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
    }
    get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
    }
    static from(thing) {
        return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
        const computed = new this(first);
        targets.forEach((target) => computed.set(target));
        return computed;
    }
    static accessor(header) {
        const internals = this[$internals] = (this[$internals] = {
            accessors: {}
        });
        const accessors = internals.accessors;
        const prototype = this.prototype;
        function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
                buildAccessors(prototype, _header);
                accessors[lHeader] = true;
            }
        }
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
    }
}
AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent']);
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders.prototype);
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosHeaders);


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");


class InterceptorManager {
    constructor() {
        this.handlers = [];
    }
    use(fulfilled, rejected, options) {
        this.handlers.push({
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
    }
    eject(id) {
        if (this.handlers[id]) {
            this.handlers[id] = null;
        }
    }
    clear() {
        if (this.handlers) {
            this.handlers = [];
        }
    }
    forEach(fn) {
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
                fn(h);
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InterceptorManager);


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFullPath)
/* harmony export */ });
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");



function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__["default"])(requestedURL)) {
        return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(baseURL, requestedURL);
    }
    return requestedURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dispatchRequest)
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");







function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
        throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](null, config);
    }
}
function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers);
    config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(config, config.transformRequest);
    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
        config.headers.setContentType('application/x-www-form-urlencoded', false);
    }
    const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"].adapter);
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(config, config.transformResponse, response);
        response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(response.headers);
        return response;
    }, function onAdapterRejection(reason) {
        if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__["default"])(reason)) {
            throwIfCancellationRequested(config);
            if (reason && reason.response) {
                reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(config, config.transformResponse, reason.response);
                reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(reason.response.headers);
            }
        }
        return Promise.reject(reason);
    });
}


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeConfig)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");



const headersToObject = (thing) => thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
            return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call({ caseless }, target, source);
        }
        else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
            return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge({}, source);
        }
        else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray(source)) {
            return source.slice();
        }
        return source;
    }
    function mergeDeepProperties(a, b, caseless) {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
            return getMergedValue(a, b, caseless);
        }
        else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
            return getMergedValue(undefined, a, caseless);
        }
    }
    function valueFromConfig2(a, b) {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
            return getMergedValue(undefined, b);
        }
    }
    function defaultToConfig2(a, b) {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
            return getMergedValue(undefined, b);
        }
        else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
            return getMergedValue(undefined, a);
        }
    }
    function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
            return getMergedValue(a, b);
        }
        else if (prop in config1) {
            return getMergedValue(undefined, a);
        }
    }
    const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(config1[prop], config2[prop], prop);
        (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });
    return config;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ settle)
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");


function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
    }
    else {
        reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"]('Request failed with status code ' + response.status, [_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST, _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
}


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transformData)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");




function transformData(fns, response) {
    const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    const context = response || config;
    const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(context.headers);
    let data = context.data;
    _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
}


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");








const DEFAULT_CONTENT_TYPE = {
    'Content-Type': undefined
};
function stringifySafely(rawValue, parser, encoder) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
        try {
            (parser || JSON.parse)(rawValue);
            return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
        }
        catch (e) {
            if (e.name !== 'SyntaxError') {
                throw e;
            }
        }
    }
    return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
    transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    adapter: ['xhr', 'http'],
    transformRequest: [function transformRequest(data, headers) {
            const contentType = headers.getContentType() || '';
            const hasJSONContentType = contentType.indexOf('application/json') > -1;
            const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);
            if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
                data = new FormData(data);
            }
            const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);
            if (isFormData) {
                if (!hasJSONContentType) {
                    return data;
                }
                return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__["default"])(data)) : data;
            }
            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
                _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
                _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
                _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
                _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data)) {
                return data;
            }
            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
                return data.buffer;
            }
            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
                headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
                return data.toString();
            }
            let isFileList;
            if (isObjectPayload) {
                if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
                    return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data, this.formSerializer).toString();
                }
                if ((isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
                    const _FormData = this.env && this.env.FormData;
                    return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__["default"])(isFileList ? { 'files[]': data } : data, _FormData && new _FormData(), this.formSerializer);
                }
            }
            if (isObjectPayload || hasJSONContentType) {
                headers.setContentType('application/json', false);
                return stringifySafely(data);
            }
            return data;
        }],
    transformResponse: [function transformResponse(data) {
            const transitional = this.transitional || defaults.transitional;
            const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            const JSONRequested = this.responseType === 'json';
            if (data && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
                const silentJSONParsing = transitional && transitional.silentJSONParsing;
                const strictJSONParsing = !silentJSONParsing && JSONRequested;
                try {
                    return JSON.parse(data);
                }
                catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === 'SyntaxError') {
                            throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].ERR_BAD_RESPONSE, this, null, this.response);
                        }
                        throw e;
                    }
                }
            }
            return data;
        }],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.FormData,
        Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.Blob
    },
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            'Accept': 'application/json, text/plain, */*'
        }
    }
};
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
});
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].merge(DEFAULT_CONTENT_TYPE);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaults);


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
});


/***/ }),

/***/ "./node_modules/axios/lib/env/classes/FormData.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/env/classes/FormData.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form_data__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VERSION": () => (/* binding */ VERSION)
/* harmony export */ });
const VERSION = "1.2.2";


/***/ }),

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js":
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");


function encode(str) {
    const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
    });
}
function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
    const _encode = encoder ? function (value) {
        return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosURLSearchParams);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/HttpStatusCode.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/HttpStatusCode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HttpStatusCode);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bind)
/* harmony export */ });

function bind(fn, thisArg) {
    return function wrap() {
        return fn.apply(thisArg, arguments);
    };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildURL)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



function encode(val) {
    return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
}
function buildURL(url, params, options) {
    if (!params) {
        return url;
    }
    const _encode = options && options.encode || encode;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
        serializedParams = serializeFn(params, options);
    }
    else {
        serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params) ?
            params.toString() :
            new _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, options).toString(_encode);
    }
    if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ combineURLs)
/* harmony export */ });

function combineURLs(baseURL, relativeURL) {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStandardBrowserEnv ?
    (function standardBrowserEnv() {
        return {
            write: function write(name, value, expires, path, domain, secure) {
                const cookie = [];
                cookie.push(name + '=' + encodeURIComponent(value));
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(expires)) {
                    cookie.push('expires=' + new Date(expires).toGMTString());
                }
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(path)) {
                    cookie.push('path=' + path);
                }
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(domain)) {
                    cookie.push('domain=' + domain);
                }
                if (secure === true) {
                    cookie.push('secure');
                }
                document.cookie = cookie.join('; ');
            },
            read: function read(name) {
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return (match ? decodeURIComponent(match[3]) : null);
            },
            remove: function remove(name) {
                this.write(name, '', Date.now() - 86400000);
            }
        };
    })() :
    (function nonStandardBrowserEnv() {
        return {
            write: function write() { },
            read: function read() { return null; },
            remove: function remove() { }
        };
    })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");


function parsePropPath(name) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].matchAll(/\w+|\[(\w*)]/g, name).map(match => {
        return match[0] === '[]' ? '' : match[1] || match[0];
    });
}
function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
    }
    return obj;
}
function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
        let name = path[index++];
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;
        if (isLast) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
                target[name] = [target[name], value];
            }
            else {
                target[name] = value;
            }
            return !isNumericKey;
        }
        if (!target[name] || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
            target[name] = [];
        }
        const result = buildPath(path, value, target[name], index);
        if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
            target[name] = arrayToObject(target[name]);
        }
        return !isNumericKey;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
        const obj = {};
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
            buildPath(parsePropPath(name), value, obj, 0);
        });
        return obj;
    }
    return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formDataToJSON);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAbsoluteURL)
/* harmony export */ });

function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isAxiosError)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");


function isAxiosError(payload) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && (payload.isAxiosError === true);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStandardBrowserEnv ?
    (function standardBrowserEnv() {
        const msie = /(msie|trident)/i.test(navigator.userAgent);
        const urlParsingNode = document.createElement('a');
        let originURL;
        function resolveURL(url) {
            let href = url;
            if (msie) {
                urlParsingNode.setAttribute('href', href);
                href = urlParsingNode.href;
            }
            urlParsingNode.setAttribute('href', href);
            return {
                href: urlParsingNode.href,
                protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
                host: urlParsingNode.host,
                search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
                hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
                hostname: urlParsingNode.hostname,
                port: urlParsingNode.port,
                pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                    urlParsingNode.pathname :
                    '/' + urlParsingNode.pathname
            };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
            const parsed = (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(requestURL)) ? resolveURL(requestURL) : requestURL;
            return (parsed.protocol === originURL.protocol &&
                parsed.host === originURL.host);
        };
    })() :
    (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
            return true;
        };
    })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");


const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();
        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
            return;
        }
        if (key === 'set-cookie') {
            if (parsed[key]) {
                parsed[key].push(val);
            }
            else {
                parsed[key] = [val];
            }
        }
        else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
    });
    return parsed;
});


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseProtocol)
/* harmony export */ });

function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/speedometer.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) {
            firstSampleTS = now;
        }
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i = tail;
        let bytesCount = 0;
        while (i !== head) {
            bytesCount += bytes[i++];
            i = i % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) {
            tail = (tail + 1) % samplesCount;
        }
        if (now - firstSampleTS < min) {
            return;
        }
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (speedometer);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ spread)
/* harmony export */ });

function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _env_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../env/classes/FormData.js */ "./node_modules/axios/lib/env/classes/FormData.js");




function isVisitable(thing) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}
function removeBrackets(key) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
    if (!path)
        return key;
    return path.concat(key).map(function each(token, i) {
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
}
function isFlatArray(arr) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}
const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
});
function isSpecCompliant(thing) {
    return thing && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator];
}
function toFormData(obj, formData, options) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
        throw new TypeError('target must be an object');
    }
    formData = formData || new (_env_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"] || FormData)();
    options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
    }, false, function defined(option, source) {
        return !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && isSpecCompliant(formData);
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
    }
    function convertValue(value) {
        if (value === null)
            return '';
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
            return value.toISOString();
        }
        if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
            throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Blob is not supported. Use a Buffer instead.');
        }
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
            return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }
        return value;
    }
    function defaultVisitor(value, key, path) {
        let arr = value;
        if (value && !path && typeof value === 'object') {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
                key = metaTokens ? key : key.slice(0, -2);
                value = JSON.stringify(value);
            }
            else if ((_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
                (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value)))) {
                key = removeBrackets(key);
                arr.forEach(function each(el, index) {
                    !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'), convertValue(el));
                });
                return false;
            }
        }
        if (isVisitable(value)) {
            return true;
        }
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
    });
    function build(value, path) {
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value))
            return;
        if (stack.indexOf(value) !== -1) {
            throw Error('Circular reference detected in ' + path.join('.'));
        }
        stack.push(value);
        _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
            const result = !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && visitor.call(formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers);
            if (result === true) {
                build(el, path ? path.concat(key) : [key]);
            }
        });
        stack.pop();
    }
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
        throw new TypeError('data must be an object');
    }
    build(obj);
    return formData;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toFormData);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toURLEncodedForm)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/browser/index.js");




function toURLEncodedForm(data, options) {
    return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].classes.URLSearchParams(), Object.assign({
        visitor: function (value, key, path, helpers) {
            if (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBuffer(value)) {
                this.append(key, value.toString('base64'));
                return false;
            }
            return helpers.defaultVisitor.apply(this, arguments);
        }
    }, options));
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");



const validators = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
});
const deprecatedWarnings = {};
validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return '[Axios v' + _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }
    return (value, opt, opts) => {
        if (validator === false) {
            throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED);
        }
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
            const value = options[opt];
            const result = value === undefined || validator(value, opt, options);
            if (result !== true) {
                throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('option ' + opt + ' must be ' + result, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
            }
            continue;
        }
        if (allowUnknown !== true) {
            throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    assertOptions,
    validators
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js":
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormData);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");


const isStandardBrowserEnv = (() => {
    let product;
    if (typeof navigator !== 'undefined' && ((product = navigator.product) === 'ReactNative' ||
        product === 'NativeScript' ||
        product === 'NS')) {
        return false;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
})();
const isStandardBrowserWebWorkerEnv = (() => {
    return (typeof WorkerGlobalScope !== 'undefined' &&
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts === 'function');
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    isBrowser: true,
    classes: {
        URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
        FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        Blob
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");


const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
};
const typeOfTest = type => thing => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest('undefined');
function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest('ArrayBuffer');
function isArrayBufferView(val) {
    let result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
    }
    else {
        result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
}
const isString = typeOfTest('string');
const isFunction = typeOfTest('function');
const isNumber = typeOfTest('number');
const isObject = (thing) => thing !== null && typeof thing === 'object';
const isBoolean = thing => thing === true || thing === false;
const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
        return false;
    }
    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest('Date');
const isFile = kindOfTest('File');
const isBlob = kindOfTest('Blob');
const isFileList = kindOfTest('FileList');
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
    const pattern = '[object FormData]';
    return thing && ((typeof FormData === 'function' && thing instanceof FormData) ||
        toString.call(thing) === pattern ||
        (isFunction(thing.toString) && thing.toString() === pattern));
};
const isURLSearchParams = kindOfTest('URLSearchParams');
const trim = (str) => str.trim ?
    str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    let i;
    let l;
    if (typeof obj !== 'object') {
        obj = [obj];
    }
    if (isArray(obj)) {
        for (i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    }
    else {
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;
        for (i = 0; i < len; i++) {
            key = keys[i];
            fn.call(null, obj[key], key, obj);
        }
    }
}
function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
        _key = keys[i];
        if (key === _key.toLowerCase()) {
            return _key;
        }
    }
    return null;
}
const _global = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global);
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
        const targetKey = caseless && findKey(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
            result[targetKey] = merge(result[targetKey], val);
        }
        else if (isPlainObject(val)) {
            result[targetKey] = merge({}, val);
        }
        else if (isArray(val)) {
            result[targetKey] = val.slice();
        }
        else {
            result[targetKey] = val;
        }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
            a[key] = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg);
        }
        else {
            a[key] = val;
        }
    }, { allOwnKeys });
    return a;
};
const stripBOM = (content) => {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
};
const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
        return destObj;
    do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
                destObj[prop] = sourceObj[prop];
                merged[prop] = true;
            }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
};
const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
        position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
    if (!thing)
        return null;
    if (isArray(thing))
        return thing;
    let i = thing.length;
    if (!isNumber(i))
        return null;
    const arr = new Array(i);
    while (i-- > 0) {
        arr[i] = thing[i];
    }
    return arr;
};
const isTypedArray = (TypedArray => {
    return thing => {
        return TypedArray && thing instanceof TypedArray;
    };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
    }
};
const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
    }
    return arr;
};
const isHTMLForm = kindOfTest('HTMLFormElement');
const toCamelCase = str => {
    return str.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
    });
};
const hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest('RegExp');
const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name) => {
        if (reducer(descriptor, name, obj) !== false) {
            reducedDescriptors[name] = descriptor;
        }
    });
    Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
        if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
            return false;
        }
        const value = obj[name];
        if (!isFunction(value))
            return;
        descriptor.enumerable = false;
        if ('writable' in descriptor) {
            descriptor.writable = false;
            return;
        }
        if (!descriptor.set) {
            descriptor.set = () => {
                throw Error('Can not rewrite read-only method \'' + name + '\'');
            };
        }
    });
};
const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
        arr.forEach(value => {
            obj[value] = true;
        });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
};
const noop = () => { };
const toFiniteNumber = (value, defaultValue) => {
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
};
const toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i) => {
        if (isObject(source)) {
            if (stack.indexOf(source) >= 0) {
                return;
            }
            if (!('toJSON' in source)) {
                stack[i] = source;
                const target = isArray(source) ? [] : {};
                forEach(source, (value, key) => {
                    const reducedValue = visit(value, i + 1);
                    !isUndefined(reducedValue) && (target[key] = reducedValue);
                });
                stack[i] = undefined;
                return target;
            }
        }
        return source;
    };
    return visit(obj, 0);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    toJSONObject
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

const root = document.createElement("div");
document.body.appendChild(root);
const input = document.createElement("input");
input.value = "optimizeGeneratorTuningMap?unparsedT=[⟨1 1 0] ⟨0 1 4]}&tuningSchemeSpec=TILT minimax-U";
input.style.width = "700px";
root.appendChild(input);
const submit = document.createElement("button");
submit.innerText = "Submit";
root.appendChild(submit);
const results = document.createElement("div");
root.appendChild(results);
const HOST = "https://rtt-api-server.onrender.com/";
submit.onclick = () => {
    results.innerText = "Loading...";
    axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(HOST + encodeURI(input.value), {}).then(data => {
        console.log("you tried to send", data.data);
        results.innerText = data.data;
    }).catch(e => {
        console.log("axios error: ", e);
    });
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaURBQVMsa0NBQWtDO0FBQy9DO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9jbGFzc2VzL0Zvcm1EYXRhLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL251bGwuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwid2VicGFjazovL3J0dC1hcHAvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL3J0dC1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnR0LWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcnR0LWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J0dC1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ydHQtYXBwLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnID8gc2VsZi5Gb3JtRGF0YSA6IHdpbmRvdy5Gb3JtRGF0YTtcclxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcclxuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XHJcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcclxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xyXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xyXG4gICAgaHR0cDogaHR0cEFkYXB0ZXIsXHJcbiAgICB4aHI6IHhockFkYXB0ZXJcclxufTtcclxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywgeyB2YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7IHZhbHVlIH0pO1xyXG4gICAgfVxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XHJcbiAgICAgICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcclxuICAgICAgICBjb25zdCB7IGxlbmd0aCB9ID0gYWRhcHRlcnM7XHJcbiAgICAgICAgbGV0IG5hbWVPckFkYXB0ZXI7XHJcbiAgICAgICAgbGV0IGFkYXB0ZXI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICgoYWRhcHRlciA9IHV0aWxzLmlzU3RyaW5nKG5hbWVPckFkYXB0ZXIpID8ga25vd25BZGFwdGVyc1tuYW1lT3JBZGFwdGVyLnRvTG93ZXJDYXNlKCldIDogbmFtZU9yQWRhcHRlcikpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYWRhcHRlcikge1xyXG4gICAgICAgICAgICBpZiAoYWRhcHRlciA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBBZGFwdGVyICR7bmFtZU9yQWRhcHRlcn0gaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnRgLCAnRVJSX05PVF9TVVBQT1JUJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHV0aWxzLmhhc093blByb3Aoa25vd25BZGFwdGVycywgbmFtZU9yQWRhcHRlcikgP1xyXG4gICAgICAgICAgICAgICAgYEFkYXB0ZXIgJyR7bmFtZU9yQWRhcHRlcn0nIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkYCA6XHJcbiAgICAgICAgICAgICAgICBgVW5rbm93biBhZGFwdGVyICcke25hbWVPckFkYXB0ZXJ9J2ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYWRhcHRlciBpcyBub3QgYSBmdW5jdGlvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgIH0sXHJcbiAgICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcclxuaW1wb3J0IHNldHRsZSBmcm9tICcuLy4uL2NvcmUvc2V0dGxlLmpzJztcclxuaW1wb3J0IGNvb2tpZXMgZnJvbSAnLi8uLi9oZWxwZXJzL2Nvb2tpZXMuanMnO1xyXG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi8uLi9oZWxwZXJzL2J1aWxkVVJMLmpzJztcclxuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzJztcclxuaW1wb3J0IGlzVVJMU2FtZU9yaWdpbiBmcm9tICcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzJztcclxuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XHJcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XHJcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcclxuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcclxuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcclxuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XHJcbmltcG9ydCBzcGVlZG9tZXRlciBmcm9tICcuLi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzJztcclxuZnVuY3Rpb24gcHJvZ3Jlc3NFdmVudFJlZHVjZXIobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0pIHtcclxuICAgIGxldCBieXRlc05vdGlmaWVkID0gMDtcclxuICAgIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xyXG4gICAgcmV0dXJuIGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xyXG4gICAgICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcclxuICAgICAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xyXG4gICAgICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XHJcbiAgICAgICAgYnl0ZXNOb3RpZmllZCA9IGxvYWRlZDtcclxuICAgICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgICBsb2FkZWQsXHJcbiAgICAgICAgICAgIHRvdGFsLFxyXG4gICAgICAgICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcclxuICAgICAgICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGV2ZW50OiBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBkYXRhW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddID0gdHJ1ZTtcclxuICAgICAgICBsaXN0ZW5lcihkYXRhKTtcclxuICAgIH07XHJcbn1cclxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcclxuZXhwb3J0IGRlZmF1bHQgaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcclxuICAgICAgICBsZXQgb25DYW5jZWxlZDtcclxuICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5zaWduYWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkgJiYgKHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSkge1xyXG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hdXRoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSA6ICcnO1xyXG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xyXG4gICAgICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xyXG4gICAgICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xyXG4gICAgICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcclxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcclxuICAgICAgICAgICAgICAgIGNvbmZpZyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgICAgICB9LCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xyXG4gICAgICAgICAgICBpZiAoIXJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcclxuICAgICAgICAgICAgcmVxdWVzdCA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcclxuICAgICAgICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xyXG4gICAgICAgICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpXHJcbiAgICAgICAgICAgICAgICAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgJiYgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICh4c3JmVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldChjb25maWcueHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcclxuICAgICAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcclxuICAgICAgICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcclxuICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xyXG4gICAgICAgICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKGZ1bGxQYXRoKTtcclxuICAgICAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xyXG4gICAgICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcclxuICAgIH0pO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xyXG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcclxuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzL2luZGV4LmpzJztcclxuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XHJcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xyXG5pbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSAnLi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMnO1xyXG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xyXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi9lbnYvZGF0YS5qcyc7XHJcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcclxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xyXG5pbXBvcnQgc3ByZWFkIGZyb20gJy4vaGVscGVycy9zcHJlYWQuanMnO1xyXG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xyXG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XHJcbmltcG9ydCBIdHRwU3RhdHVzQ29kZSBmcm9tICcuL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMnO1xyXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcclxuICAgIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7IGFsbE93bktleXM6IHRydWUgfSk7XHJcbiAgICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHsgYWxsT3duS2V5czogdHJ1ZSB9KTtcclxuICAgIGluc3RhbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhkZWZhdWx0Q29uZmlnLCBpbnN0YW5jZUNvbmZpZykpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG5jb25zdCBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcclxuYXhpb3MuQXhpb3MgPSBBeGlvcztcclxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XHJcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XHJcbmF4aW9zLmlzQ2FuY2VsID0gaXNDYW5jZWw7XHJcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xyXG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcclxuYXhpb3MuQXhpb3NFcnJvciA9IEF4aW9zRXJyb3I7XHJcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XHJcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxufTtcclxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xyXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XHJcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XHJcbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcclxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcclxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZTtcclxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xyXG5leHBvcnQgZGVmYXVsdCBheGlvcztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xyXG5jbGFzcyBDYW5jZWxUb2tlbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzb2x2ZVByb21pc2U7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcztcclxuICAgICAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHdoaWxlIChpLS0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9taXNlLnRoZW4gPSBvbmZ1bGZpbGxlZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBfcmVzb2x2ZTtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcclxuICAgICAgICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICBpZiAodG9rZW4ucmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRocm93SWZSZXF1ZXN0ZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhc29uKSB7XHJcbiAgICAgICAgICAgIHRocm93IHRoaXMucmVhc29uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN1YnNjcmliZShsaXN0ZW5lcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYXNvbikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBzb3VyY2UoKSB7XHJcbiAgICAgICAgbGV0IGNhbmNlbDtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XHJcbiAgICAgICAgICAgIGNhbmNlbCA9IGM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgICAgIGNhbmNlbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcclxuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcclxuICAgIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XHJcbiAgICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XHJcbn1cclxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xyXG4gICAgX19DQU5DRUxfXzogdHJ1ZVxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xyXG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XHJcbmltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXIuanMnO1xyXG5pbXBvcnQgZGlzcGF0Y2hSZXF1ZXN0IGZyb20gJy4vZGlzcGF0Y2hSZXF1ZXN0LmpzJztcclxuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xyXG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tICcuL2J1aWxkRnVsbFBhdGguanMnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdG9yLmpzJztcclxuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XHJcbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcclxuY2xhc3MgQXhpb3Mge1xyXG4gICAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XHJcbiAgICAgICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcclxuICAgICAgICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xyXG4gICAgICAgIGNvbnN0IHsgdHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzIH0gPSBjb25maWc7XHJcbiAgICAgICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xyXG4gICAgICAgICAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXHJcbiAgICAgICAgICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcclxuICAgICAgICAgICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcclxuICAgICAgICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcclxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvblxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBjb250ZXh0SGVhZGVycztcclxuICAgICAgICBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoaGVhZGVycy5jb21tb24sIGhlYWRlcnNbY29uZmlnLm1ldGhvZF0pO1xyXG4gICAgICAgIGNvbnRleHRIZWFkZXJzICYmIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sIChtZXRob2QpID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XHJcbiAgICAgICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xyXG4gICAgICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBwcm9taXNlO1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgbGVuO1xyXG4gICAgICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xyXG4gICAgICAgICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XHJcbiAgICAgICAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XHJcbiAgICAgICAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xyXG4gICAgICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xyXG4gICAgICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcclxuICAgICAgICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xyXG4gICAgICAgICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpID0gMDtcclxuICAgICAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBnZXRVcmkoY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcclxuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xyXG4gICAgICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xyXG4gICAgfVxyXG59XHJcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xyXG4gICAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xyXG4gICAgICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbn0pO1xyXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICAgICAgfSA6IHt9LFxyXG4gICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XHJcbiAgICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XHJcbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xyXG4gICAgRXJyb3IuY2FsbCh0aGlzKTtcclxuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xyXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xyXG4gICAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XHJcbiAgICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcclxuICAgIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xyXG4gICAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XHJcbn1cclxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcclxuICAgIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcclxuICAgICAgICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXHJcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcclxuICAgICAgICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcclxuICAgICAgICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXHJcbiAgICAgICAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgY29kZTogdGhpcy5jb2RlLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KTtcclxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XHJcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XHJcbltcclxuICAgICdFUlJfQkFEX09QVElPTl9WQUxVRScsXHJcbiAgICAnRVJSX0JBRF9PUFRJT04nLFxyXG4gICAgJ0VDT05OQUJPUlRFRCcsXHJcbiAgICAnRVRJTUVET1VUJyxcclxuICAgICdFUlJfTkVUV09SSycsXHJcbiAgICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXHJcbiAgICAnRVJSX0RFUFJFQ0FURUQnLFxyXG4gICAgJ0VSUl9CQURfUkVTUE9OU0UnLFxyXG4gICAgJ0VSUl9CQURfUkVRVUVTVCcsXHJcbiAgICAnRVJSX0NBTkNFTEVEJyxcclxuICAgICdFUlJfTk9UX1NVUFBPUlQnLFxyXG4gICAgJ0VSUl9JTlZBTElEX1VSTCdcclxuXS5mb3JFYWNoKGNvZGUgPT4ge1xyXG4gICAgZGVzY3JpcHRvcnNbY29kZV0gPSB7IHZhbHVlOiBjb2RlIH07XHJcbn0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xyXG4gICAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xyXG4gICAgfSwgcHJvcCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xyXG4gICAgfSk7XHJcbiAgICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XHJcbiAgICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XHJcbiAgICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xyXG4gICAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XHJcbiAgICByZXR1cm4gYXhpb3NFcnJvcjtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQXhpb3NFcnJvcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xyXG5pbXBvcnQgcGFyc2VIZWFkZXJzIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzJztcclxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcclxuICAgIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xyXG4gICAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcclxuICAgIGxldCBtYXRjaDtcclxuICAgIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XHJcbiAgICAgICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRva2VucztcclxufVxyXG5mdW5jdGlvbiBpc1ZhbGlkSGVhZGVyTmFtZShzdHIpIHtcclxuICAgIHJldHVybiAvXlstX2EtekEtWl0rJC8udGVzdChzdHIudHJpbSgpKTtcclxufVxyXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlcikge1xyXG4gICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcclxuICAgIH1cclxuICAgIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xyXG4gICAgcmV0dXJuIGhlYWRlci50cmltKClcclxuICAgICAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcclxuICAgICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcclxuICAgIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XHJcbiAgICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoYXJnMSwgYXJnMiwgYXJnMykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmNsYXNzIEF4aW9zSGVhZGVycyB7XHJcbiAgICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XHJcbiAgICAgICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcclxuICAgIH1cclxuICAgIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcclxuICAgICAgICAgICAgaWYgKCFsSGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcclxuICAgICAgICAgICAgaWYgKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PiB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XHJcbiAgICAgICAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcclxuICAgICAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcclxuICAgICAgICBpZiAoaGVhZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XHJcbiAgICAgICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XHJcbiAgICAgICAgaWYgKGhlYWRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiAhIShrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XHJcbiAgICAgICAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XHJcbiAgICAgICAgICAgIGlmIChfaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcykuZm9yRWFjaCh0aGlzLmRlbGV0ZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIG5vcm1hbGl6ZShmb3JtYXQpIHtcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XHJcbiAgICAgICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY29uY2F0KC4uLnRhcmdldHMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XHJcbiAgICB9XHJcbiAgICB0b0pTT04oYXNTdHJpbmdzKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlICYmIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbiAgICB9XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XHJcbiAgICB9XHJcbiAgICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XHJcbiAgICAgICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb20odGhpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XHJcbiAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XHJcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcclxuICAgICAgICByZXR1cm4gY29tcHV0ZWQ7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XHJcbiAgICAgICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xyXG4gICAgICAgICAgICBhY2Nlc3NvcnM6IHt9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcclxuICAgICAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcclxuICAgICAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XHJcbiAgICAgICAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XHJcbiAgICAgICAgICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbkF4aW9zSGVhZGVycy5hY2Nlc3NvcihbJ0NvbnRlbnQtVHlwZScsICdDb250ZW50LUxlbmd0aCcsICdBY2NlcHQnLCAnQWNjZXB0LUVuY29kaW5nJywgJ1VzZXItQWdlbnQnXSk7XHJcbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSk7XHJcbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcclxuZXhwb3J0IGRlZmF1bHQgQXhpb3NIZWFkZXJzO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcclxuY2xhc3MgSW50ZXJjZXB0b3JNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcclxuICAgIH1cclxuICAgIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcclxuICAgICAgICAgICAgZnVsZmlsbGVkLFxyXG4gICAgICAgICAgICByZWplY3RlZCxcclxuICAgICAgICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuICAgIGVqZWN0KGlkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVycykge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yRWFjaChmbikge1xyXG4gICAgICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xyXG4gICAgICAgICAgICBpZiAoaCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm4oaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcclxuaW1wb3J0IGNvbWJpbmVVUkxzIGZyb20gJy4uL2hlbHBlcnMvY29tYmluZVVSTHMuanMnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xyXG4gICAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB0cmFuc2Zvcm1EYXRhIGZyb20gJy4vdHJhbnNmb3JtRGF0YS5qcyc7XHJcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xyXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xyXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XHJcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xyXG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XHJcbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XHJcbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XHJcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcclxuICAgIH1cclxuICAgIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xyXG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xyXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XHJcbiAgICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChjb25maWcsIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0KTtcclxuICAgIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcclxuICAgICAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcik7XHJcbiAgICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcclxuICAgICAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKGNvbmZpZywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLCByZXNwb25zZSk7XHJcbiAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcclxuICAgICAgICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xyXG4gICAgICAgICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoY29uZmlnLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsIHJlYXNvbi5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcclxuICAgIH0pO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcclxuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcclxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHRoaW5nLnRvSlNPTigpIDogdGhpbmc7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcclxuICAgIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xyXG4gICAgY29uc3QgY29uZmlnID0ge307XHJcbiAgICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcclxuICAgICAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7IGNhc2VsZXNzIH0sIHRhcmdldCwgc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMoYSwgYiwgY2FzZWxlc3MpIHtcclxuICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBjYXNlbGVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBjYXNlbGVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XHJcbiAgICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKGEsIGIpIHtcclxuICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcclxuICAgICAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IG1lcmdlTWFwID0ge1xyXG4gICAgICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcclxuICAgICAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXHJcbiAgICAgICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcclxuICAgICAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXHJcbiAgICAgICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXHJcbiAgICAgICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXHJcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXHJcbiAgICAgICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXHJcbiAgICAgICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXHJcbiAgICAgICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcclxuICAgICAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxyXG4gICAgICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXHJcbiAgICAgICAgaGVhZGVyczogKGEsIGIpID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHRydWUpXHJcbiAgICB9O1xyXG4gICAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyhjb25maWcxKS5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xyXG4gICAgICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcclxuICAgICAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xyXG4gICAgICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcclxuICAgIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cywgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLCByZXNwb25zZS5jb25maWcsIHJlc3BvbnNlLnJlcXVlc3QsIHJlc3BvbnNlKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XHJcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHM7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XHJcbiAgICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcclxuICAgIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcclxuICAgICAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG4gICAgaGVhZGVycy5ub3JtYWxpemUoKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcclxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcclxuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcclxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcclxuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcclxuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcclxuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4uL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xyXG5jb25zdCBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcclxuICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWRcclxufTtcclxuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcclxuICAgIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XHJcbn1cclxuY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxyXG4gICAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCddLFxyXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChpc0Zvcm1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0pTT05Db250ZW50VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcclxuICAgICAgICAgICAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XHJcbiAgICAgICAgICAgICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxyXG4gICAgICAgICAgICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XHJcbiAgICAgICAgICAgICAgICB1dGlscy5pc0Jsb2IoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpc0ZpbGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKGlzRmlsZUxpc3QgPyB7ICdmaWxlc1tdJzogZGF0YSB9IDogZGF0YSwgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSwgdGhpcy5mb3JtU2VyaWFsaXplcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1dLFxyXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcclxuICAgICAgICAgICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xyXG4gICAgICAgICAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1dLFxyXG4gICAgdGltZW91dDogMCxcclxuICAgIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXHJcbiAgICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXHJcbiAgICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcclxuICAgIG1heEJvZHlMZW5ndGg6IC0xLFxyXG4gICAgZW52OiB7XHJcbiAgICAgICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXHJcbiAgICAgICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXHJcbiAgICB9LFxyXG4gICAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xyXG4gICAgICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcclxuICAgIH0sXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgY29tbW9uOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xyXG4gICAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XHJcbn0pO1xyXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xyXG4gICAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXHJcbiAgICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcclxuICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXHJcbn07XHJcbiIsImltcG9ydCBGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xyXG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YTtcclxuIiwiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuMi4yXCI7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcclxuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xyXG4gICAgY29uc3QgY2hhck1hcCA9IHtcclxuICAgICAgICAnISc6ICclMjEnLFxyXG4gICAgICAgIFwiJ1wiOiAnJTI3JyxcclxuICAgICAgICAnKCc6ICclMjgnLFxyXG4gICAgICAgICcpJzogJyUyOScsXHJcbiAgICAgICAgJ34nOiAnJTdFJyxcclxuICAgICAgICAnJTIwJzogJysnLFxyXG4gICAgICAgICclMDAnOiAnXFx4MDAnXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xyXG4gICAgICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xyXG4gICAgdGhpcy5fcGFpcnMgPSBbXTtcclxuICAgIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XHJcbn1cclxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xyXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG59O1xyXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XHJcbiAgICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSk7XHJcbiAgICB9IDogZW5jb2RlO1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcclxuICAgICAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XHJcbiAgICB9LCAnJykuam9pbignJicpO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcclxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XHJcbiAgICBDb250aW51ZTogMTAwLFxyXG4gICAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXHJcbiAgICBQcm9jZXNzaW5nOiAxMDIsXHJcbiAgICBFYXJseUhpbnRzOiAxMDMsXHJcbiAgICBPazogMjAwLFxyXG4gICAgQ3JlYXRlZDogMjAxLFxyXG4gICAgQWNjZXB0ZWQ6IDIwMixcclxuICAgIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxyXG4gICAgTm9Db250ZW50OiAyMDQsXHJcbiAgICBSZXNldENvbnRlbnQ6IDIwNSxcclxuICAgIFBhcnRpYWxDb250ZW50OiAyMDYsXHJcbiAgICBNdWx0aVN0YXR1czogMjA3LFxyXG4gICAgQWxyZWFkeVJlcG9ydGVkOiAyMDgsXHJcbiAgICBJbVVzZWQ6IDIyNixcclxuICAgIE11bHRpcGxlQ2hvaWNlczogMzAwLFxyXG4gICAgTW92ZWRQZXJtYW5lbnRseTogMzAxLFxyXG4gICAgRm91bmQ6IDMwMixcclxuICAgIFNlZU90aGVyOiAzMDMsXHJcbiAgICBOb3RNb2RpZmllZDogMzA0LFxyXG4gICAgVXNlUHJveHk6IDMwNSxcclxuICAgIFVudXNlZDogMzA2LFxyXG4gICAgVGVtcG9yYXJ5UmVkaXJlY3Q6IDMwNyxcclxuICAgIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXHJcbiAgICBCYWRSZXF1ZXN0OiA0MDAsXHJcbiAgICBVbmF1dGhvcml6ZWQ6IDQwMSxcclxuICAgIFBheW1lbnRSZXF1aXJlZDogNDAyLFxyXG4gICAgRm9yYmlkZGVuOiA0MDMsXHJcbiAgICBOb3RGb3VuZDogNDA0LFxyXG4gICAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxyXG4gICAgTm90QWNjZXB0YWJsZTogNDA2LFxyXG4gICAgUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA0MDcsXHJcbiAgICBSZXF1ZXN0VGltZW91dDogNDA4LFxyXG4gICAgQ29uZmxpY3Q6IDQwOSxcclxuICAgIEdvbmU6IDQxMCxcclxuICAgIExlbmd0aFJlcXVpcmVkOiA0MTEsXHJcbiAgICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcclxuICAgIFBheWxvYWRUb29MYXJnZTogNDEzLFxyXG4gICAgVXJpVG9vTG9uZzogNDE0LFxyXG4gICAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcclxuICAgIFJhbmdlTm90U2F0aXNmaWFibGU6IDQxNixcclxuICAgIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXHJcbiAgICBJbUFUZWFwb3Q6IDQxOCxcclxuICAgIE1pc2RpcmVjdGVkUmVxdWVzdDogNDIxLFxyXG4gICAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxyXG4gICAgTG9ja2VkOiA0MjMsXHJcbiAgICBGYWlsZWREZXBlbmRlbmN5OiA0MjQsXHJcbiAgICBUb29FYXJseTogNDI1LFxyXG4gICAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXHJcbiAgICBQcmVjb25kaXRpb25SZXF1aXJlZDogNDI4LFxyXG4gICAgVG9vTWFueVJlcXVlc3RzOiA0MjksXHJcbiAgICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcclxuICAgIFVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zOiA0NTEsXHJcbiAgICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXHJcbiAgICBOb3RJbXBsZW1lbnRlZDogNTAxLFxyXG4gICAgQmFkR2F0ZXdheTogNTAyLFxyXG4gICAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXHJcbiAgICBHYXRld2F5VGltZW91dDogNTA0LFxyXG4gICAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ6IDUwNSxcclxuICAgIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxyXG4gICAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxyXG4gICAgTG9vcERldGVjdGVkOiA1MDgsXHJcbiAgICBOb3RFeHRlbmRlZDogNTEwLFxyXG4gICAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcclxufTtcclxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcclxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xyXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXHJcbiAgICAgICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxyXG4gICAgICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxyXG4gICAgICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cclxuICAgICAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cclxuICAgICAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXHJcbiAgICAgICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XHJcbiAgICBpZiAoIXBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XHJcbiAgICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XHJcbiAgICBsZXQgc2VyaWFsaXplZFBhcmFtcztcclxuICAgIGlmIChzZXJpYWxpemVGbikge1xyXG4gICAgICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykgP1xyXG4gICAgICAgICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XHJcbiAgICAgICAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcclxuICAgICAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xyXG4gICAgICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcclxuICAgIH1cclxuICAgIHJldHVybiB1cmw7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xyXG4gICAgcmV0dXJuIHJlbGF0aXZlVVJMXHJcbiAgICAgICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcclxuICAgICAgICA6IGJhc2VVUkw7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XHJcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52ID9cclxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29va2llID0gW107XHJcbiAgICAgICAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KSgpIDpcclxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkgeyB9LFxyXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcclxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7IH1cclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xyXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcclxuICAgIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XHJcbiAgICBjb25zdCBvYmogPSB7fTtcclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xyXG4gICAgbGV0IGk7XHJcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcclxuICAgIGxldCBrZXk7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIG9ialtrZXldID0gYXJyW2tleV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XHJcbiAgICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcclxuICAgICAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XHJcbiAgICAgICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcclxuICAgICAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcclxuICAgICAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XHJcbiAgICAgICAgaWYgKGlzTGFzdCkge1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcclxuICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCAmJiB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcclxuICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcclxuICAgIH1cclxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0ge307XHJcbiAgICAgICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBmb3JtRGF0YVRvSlNPTjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xyXG4gICAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcclxuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcclxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xyXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcclxuICAgICAgICBjb25zdCBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICBjb25zdCB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICBsZXQgb3JpZ2luVVJMO1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XHJcbiAgICAgICAgICAgIGxldCBocmVmID0gdXJsO1xyXG4gICAgICAgICAgICBpZiAobXNpZSkge1xyXG4gICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XHJcbiAgICAgICAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXHJcbiAgICAgICAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcclxuICAgICAgICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcclxuICAgICAgICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXHJcbiAgICAgICAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXHJcbiAgICAgICAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxyXG4gICAgICAgICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcclxuICAgICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xyXG4gICAgICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXHJcbiAgICAgICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpIDpcclxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH0pKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IG51bGw7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xyXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcclxuICAgICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXHJcbiAgICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXHJcbiAgICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXHJcbiAgICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xyXG5dKTtcclxuZXhwb3J0IGRlZmF1bHQgcmF3SGVhZGVycyA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSB7fTtcclxuICAgIGxldCBrZXk7XHJcbiAgICBsZXQgdmFsO1xyXG4gICAgbGV0IGk7XHJcbiAgICByYXdIZWFkZXJzICYmIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcclxuICAgICAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcclxuICAgICAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlZFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xyXG4gICAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xyXG4gICAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcclxuICAgIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcclxuICAgIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XHJcbiAgICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XHJcbiAgICBsZXQgaGVhZCA9IDA7XHJcbiAgICBsZXQgdGFpbCA9IDA7XHJcbiAgICBsZXQgZmlyc3RTYW1wbGVUUztcclxuICAgIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcclxuICAgIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xyXG4gICAgICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xyXG4gICAgICAgICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xyXG4gICAgICAgIH1cclxuICAgICAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xyXG4gICAgICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XHJcbiAgICAgICAgbGV0IGkgPSB0YWlsO1xyXG4gICAgICAgIGxldCBieXRlc0NvdW50ID0gMDtcclxuICAgICAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xyXG4gICAgICAgICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XHJcbiAgICAgICAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcclxuICAgICAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xyXG4gICAgICAgICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xyXG4gICAgICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcclxuICAgIH07XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xyXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xyXG5pbXBvcnQgZW52Rm9ybURhdGEgZnJvbSAnLi4vZW52L2NsYXNzZXMvRm9ybURhdGEuanMnO1xyXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xyXG4gICAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xyXG4gICAgcmV0dXJuIHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xyXG59XHJcbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcclxuICAgIGlmICghcGF0aClcclxuICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcclxuICAgICAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcclxuICAgICAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XHJcbiAgICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XHJcbn1cclxuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XHJcbiAgICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XHJcbn1cclxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XHJcbiAgICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xyXG59KTtcclxuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50KHRoaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpbmcgJiYgdXRpbHMuaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXTtcclxufVxyXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcclxuICAgIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKGVudkZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xyXG4gICAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XHJcbiAgICAgICAgbWV0YVRva2VuczogdHJ1ZSxcclxuICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICBpbmRleGVzOiBmYWxzZVxyXG4gICAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gIXV0aWxzLmlzVW5kZWZpbmVkKHNvdXJjZVtvcHRpb25dKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbWV0YVRva2VucyA9IG9wdGlvbnMubWV0YVRva2VucztcclxuICAgIGNvbnN0IHZpc2l0b3IgPSBvcHRpb25zLnZpc2l0b3IgfHwgZGVmYXVsdFZpc2l0b3I7XHJcbiAgICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xyXG4gICAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcclxuICAgIGNvbnN0IF9CbG9iID0gb3B0aW9ucy5CbG9iIHx8IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iO1xyXG4gICAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIGlzU3BlY0NvbXBsaWFudChmb3JtRGF0YSk7XHJcbiAgICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdXNlQmxvYiAmJiB1dGlscy5pc0Jsb2IodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XHJcbiAgICAgICAgICAgICAgICAodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSkge1xyXG4gICAgICAgICAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcclxuICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLCBjb252ZXJ0VmFsdWUoZWwpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RhY2sgPSBbXTtcclxuICAgIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XHJcbiAgICAgICAgZGVmYXVsdFZpc2l0b3IsXHJcbiAgICAgICAgY29udmVydFZhbHVlLFxyXG4gICAgICAgIGlzVmlzaXRhYmxlXHJcbiAgICB9KTtcclxuICAgIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XHJcbiAgICAgICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGFjay5wdXNoKHZhbHVlKTtcclxuICAgICAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIHZpc2l0b3IuY2FsbChmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVycyk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN0YWNrLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgYnVpbGQob2JqKTtcclxuICAgIHJldHVybiBmb3JtRGF0YTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XHJcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XHJcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIHZpc2l0b3I6IGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBvcHRpb25zKSk7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xyXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xyXG5jb25zdCB2YWxpZGF0b3JzID0ge307XHJcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XHJcbiAgICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XHJcbiAgICB9O1xyXG59KTtcclxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XHJcbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xyXG4gICAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcclxuICAgICAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLCBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XHJcbiAgICAgICAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XHJcbiAgICB9O1xyXG59O1xyXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcclxuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaS0tID4gMCkge1xyXG4gICAgICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XHJcbiAgICAgICAgaWYgKHZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGFzc2VydE9wdGlvbnMsXHJcbiAgICB2YWxpZGF0b3JzXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGE7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xyXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xyXG4iLCJpbXBvcnQgVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMnO1xyXG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcclxuY29uc3QgaXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHByb2R1Y3Q7XHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKChwcm9kdWN0ID0gbmF2aWdhdG9yLnByb2R1Y3QpID09PSAnUmVhY3ROYXRpdmUnIHx8XHJcbiAgICAgICAgcHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcclxuICAgICAgICBwcm9kdWN0ID09PSAnTlMnKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xyXG59KSgpO1xyXG5jb25zdCBpc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcclxuICAgICAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nKTtcclxufSkoKTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgaXNCcm93c2VyOiB0cnVlLFxyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICAgIFVSTFNlYXJjaFBhcmFtcyxcclxuICAgICAgICBGb3JtRGF0YSxcclxuICAgICAgICBCbG9iXHJcbiAgICB9LFxyXG4gICAgaXNTdGFuZGFyZEJyb3dzZXJFbnYsXHJcbiAgICBpc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcclxuICAgIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xyXG5jb25zdCB7IHRvU3RyaW5nIH0gPSBPYmplY3QucHJvdG90eXBlO1xyXG5jb25zdCB7IGdldFByb3RvdHlwZU9mIH0gPSBPYmplY3Q7XHJcbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XHJcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcclxuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcclxufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XHJcbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xyXG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGU7XHJcbn07XHJcbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcclxuY29uc3QgeyBpc0FycmF5IH0gPSBBcnJheTtcclxuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcclxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XHJcbiAgICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxyXG4gICAgICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcclxufVxyXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcclxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xyXG4gICAgICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcclxuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XHJcbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XHJcbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xyXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XHJcbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XHJcbiAgICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcclxuICAgIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWwpO1xyXG59O1xyXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XHJcbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcclxuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xyXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcclxuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xyXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XHJcbiAgICBjb25zdCBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcclxuICAgIHJldHVybiB0aGluZyAmJiAoKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fFxyXG4gICAgICAgIHRvU3RyaW5nLmNhbGwodGhpbmcpID09PSBwYXR0ZXJuIHx8XHJcbiAgICAgICAgKGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09IHBhdHRlcm4pKTtcclxufTtcclxuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcclxuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cclxuICAgIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcclxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7IGFsbE93bktleXMgPSBmYWxzZSB9ID0ge30pIHtcclxuICAgIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgaTtcclxuICAgIGxldCBsO1xyXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgb2JqID0gW29ial07XHJcbiAgICB9XHJcbiAgICBpZiAoaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcclxuICAgICAgICBsZXQga2V5O1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcclxuICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xyXG4gICAgbGV0IF9rZXk7XHJcbiAgICB3aGlsZSAoaS0tID4gMCkge1xyXG4gICAgICAgIF9rZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2tleTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcztcclxuICAgIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xyXG59KSgpO1xyXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xyXG5mdW5jdGlvbiBtZXJnZSgpIHtcclxuICAgIGNvbnN0IHsgY2FzZWxlc3MgfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gICAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XHJcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xyXG4gICAgICAgICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcclxuICAgICAgICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7IGFsbE93bktleXMgfSA9IHt9KSA9PiB7XHJcbiAgICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xyXG4gICAgICAgICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhW2tleV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgeyBhbGxPd25LZXlzIH0pO1xyXG4gICAgcmV0dXJuIGE7XHJcbn07XHJcbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcclxuICAgIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbn07XHJcbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcclxuICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcclxuICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XHJcbiAgICAgICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXHJcbiAgICB9KTtcclxuICAgIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XHJcbn07XHJcbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xyXG4gICAgbGV0IHByb3BzO1xyXG4gICAgbGV0IGk7XHJcbiAgICBsZXQgcHJvcDtcclxuICAgIGNvbnN0IG1lcmdlZCA9IHt9O1xyXG4gICAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XHJcbiAgICBpZiAoc291cmNlT2JqID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuIGRlc3RPYmo7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xyXG4gICAgICAgIGkgPSBwcm9wcy5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGktLSA+IDApIHtcclxuICAgICAgICAgICAgcHJvcCA9IHByb3BzW2ldO1xyXG4gICAgICAgICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcclxuICAgICAgICAgICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xyXG4gICAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGRlc3RPYmo7XHJcbn07XHJcbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xyXG4gICAgc3RyID0gU3RyaW5nKHN0cik7XHJcbiAgICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcclxuICAgICAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xyXG4gICAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XHJcbiAgICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xyXG59O1xyXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XHJcbiAgICBpZiAoIXRoaW5nKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgaWYgKGlzQXJyYXkodGhpbmcpKVxyXG4gICAgICAgIHJldHVybiB0aGluZztcclxuICAgIGxldCBpID0gdGhpbmcubGVuZ3RoO1xyXG4gICAgaWYgKCFpc051bWJlcihpKSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcclxuICAgIHdoaWxlIChpLS0gPiAwKSB7XHJcbiAgICAgICAgYXJyW2ldID0gdGhpbmdbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XHJcbiAgICByZXR1cm4gdGhpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcclxuICAgIH07XHJcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XHJcbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XHJcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xyXG4gICAgICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XHJcbiAgICAgICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xyXG4gICAgbGV0IG1hdGNoZXM7XHJcbiAgICBjb25zdCBhcnIgPSBbXTtcclxuICAgIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XHJcbiAgICAgICAgYXJyLnB1c2gobWF0Y2hlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59O1xyXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XHJcbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcclxuICAgIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXy1cXHNdKFthLXpcXGRdKShcXHcqKS9nLCBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcclxuICAgICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xyXG4gICAgfSk7XHJcbn07XHJcbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7IGhhc093blByb3BlcnR5IH0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XHJcbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XHJcbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xyXG4gICAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xyXG4gICAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XHJcbiAgICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IGRlc2NyaXB0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XHJcbn07XHJcbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XHJcbiAgICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcclxuICAgICAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xyXG4gICAgICAgICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XHJcbiAgICBjb25zdCBvYmogPSB7fTtcclxuICAgIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcclxuICAgICAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xyXG4gICAgcmV0dXJuIG9iajtcclxufTtcclxuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcclxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xyXG4gICAgdmFsdWUgPSArdmFsdWU7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xyXG59O1xyXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XHJcbiAgICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XHJcbiAgICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcclxuICAgICAgICBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XHJcbiAgICAgICAgICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB2aXNpdChvYmosIDApO1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBpc0FycmF5LFxyXG4gICAgaXNBcnJheUJ1ZmZlcixcclxuICAgIGlzQnVmZmVyLFxyXG4gICAgaXNGb3JtRGF0YSxcclxuICAgIGlzQXJyYXlCdWZmZXJWaWV3LFxyXG4gICAgaXNTdHJpbmcsXHJcbiAgICBpc051bWJlcixcclxuICAgIGlzQm9vbGVhbixcclxuICAgIGlzT2JqZWN0LFxyXG4gICAgaXNQbGFpbk9iamVjdCxcclxuICAgIGlzVW5kZWZpbmVkLFxyXG4gICAgaXNEYXRlLFxyXG4gICAgaXNGaWxlLFxyXG4gICAgaXNCbG9iLFxyXG4gICAgaXNSZWdFeHAsXHJcbiAgICBpc0Z1bmN0aW9uLFxyXG4gICAgaXNTdHJlYW0sXHJcbiAgICBpc1VSTFNlYXJjaFBhcmFtcyxcclxuICAgIGlzVHlwZWRBcnJheSxcclxuICAgIGlzRmlsZUxpc3QsXHJcbiAgICBmb3JFYWNoLFxyXG4gICAgbWVyZ2UsXHJcbiAgICBleHRlbmQsXHJcbiAgICB0cmltLFxyXG4gICAgc3RyaXBCT00sXHJcbiAgICBpbmhlcml0cyxcclxuICAgIHRvRmxhdE9iamVjdCxcclxuICAgIGtpbmRPZixcclxuICAgIGtpbmRPZlRlc3QsXHJcbiAgICBlbmRzV2l0aCxcclxuICAgIHRvQXJyYXksXHJcbiAgICBmb3JFYWNoRW50cnksXHJcbiAgICBtYXRjaEFsbCxcclxuICAgIGlzSFRNTEZvcm0sXHJcbiAgICBoYXNPd25Qcm9wZXJ0eSxcclxuICAgIGhhc093blByb3A6IGhhc093blByb3BlcnR5LFxyXG4gICAgcmVkdWNlRGVzY3JpcHRvcnMsXHJcbiAgICBmcmVlemVNZXRob2RzLFxyXG4gICAgdG9PYmplY3RTZXQsXHJcbiAgICB0b0NhbWVsQ2FzZSxcclxuICAgIG5vb3AsXHJcbiAgICB0b0Zpbml0ZU51bWJlcixcclxuICAgIGZpbmRLZXksXHJcbiAgICBnbG9iYWw6IF9nbG9iYWwsXHJcbiAgICBpc0NvbnRleHREZWZpbmVkLFxyXG4gICAgdG9KU09OT2JqZWN0XHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5jb25zdCByb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KTtcclxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbmlucHV0LnZhbHVlID0gXCJvcHRpbWl6ZUdlbmVyYXRvclR1bmluZ01hcD91bnBhcnNlZFQ9W+KfqDEgMSAwXSDin6gwIDEgNF19JnR1bmluZ1NjaGVtZVNwZWM9VElMVCBtaW5pbWF4LVVcIjtcclxuaW5wdXQuc3R5bGUud2lkdGggPSBcIjcwMHB4XCI7XHJcbnJvb3QuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5zdWJtaXQuaW5uZXJUZXh0ID0gXCJTdWJtaXRcIjtcclxucm9vdC5hcHBlbmRDaGlsZChzdWJtaXQpO1xyXG5jb25zdCByZXN1bHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxucm9vdC5hcHBlbmRDaGlsZChyZXN1bHRzKTtcclxuY29uc3QgSE9TVCA9IFwiaHR0cHM6Ly9ydHQtYXBpLXNlcnZlci5vbnJlbmRlci5jb20vXCI7XHJcbnN1Ym1pdC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgcmVzdWx0cy5pbm5lclRleHQgPSBcIkxvYWRpbmcuLi5cIjtcclxuICAgIGF4aW9zLmdldChIT1NUICsgZW5jb2RlVVJJKGlucHV0LnZhbHVlKSwge30pLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgdHJpZWQgdG8gc2VuZFwiLCBkYXRhLmRhdGEpO1xyXG4gICAgICAgIHJlc3VsdHMuaW5uZXJUZXh0ID0gZGF0YS5kYXRhO1xyXG4gICAgfSkuY2F0Y2goZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJheGlvcyBlcnJvcjogXCIsIGUpO1xyXG4gICAgfSk7XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==