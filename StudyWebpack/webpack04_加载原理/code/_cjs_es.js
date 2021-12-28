var __webpack_modules__ = ({

    "./src/js/cjs.js":
        ((module) => {

            const sum = function (a, b) {
                return a + b
            }

            const format = function (a, b) {
                return "100.00"
            }

            module.exports = {
                sum,
                format
            }
        }),

    "./src/js/imp.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            "sum": () => (sum),
            "format": () => (format)
        });
        const sum = function (a, b) {
            return a + b
        }

        const format = function (a, b) {
            return "100.00"
        }
    })

});
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
        return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {

        exports: {}
    };

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
}

// 再进行一次代理
(() => {
    __webpack_require__.n = (module) => {
        var getter = module && module.__esModule ?
            () => (module['default']) :
            () => (module);
        __webpack_require__.d(getter, {a: getter});
        return getter;
    };
})();

(() => {
    __webpack_require__.d = (exports, definition) => {
        for (var key in definition) {
            if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
            }
        }
    };
})();

(() => {
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();

(() => {
    __webpack_require__.r = (exports) => {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
        }
        Object.defineProperty(exports, '__esModule', {value: true});
    };
})();

var __webpack_exports__ = {};
(() => {
    __webpack_require__.r(__webpack_exports__);
    // import 导入 cjs模块
    var _js_cjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/cjs */ "./src/js/cjs.js");
    var _js_cjs__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_js_cjs__WEBPACK_IMPORTED_MODULE_0__);
    // cjs导入 import模块
    const {sum} = __webpack_require__(/*! ./js/imp */ "./src/js/imp.js");

    console.log(sum(1, 2))
    console.log((0, _js_cjs__WEBPACK_IMPORTED_MODULE_0__.format)())

})();
