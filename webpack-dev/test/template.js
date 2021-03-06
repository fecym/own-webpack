(function (modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }


  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };


  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";


  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./index.js");
})

// 做两件事
// 1. 确定文件的入口 ./index
// 2. 收集依赖，做成一个依赖列表（递归找依赖）
  ({

    "./index.js":


      (function (module, exports, __webpack_require__) {

        eval("const a = __webpack_require__(/*! ./src/a */ \"./src/a.js\")\nconsole.log(a);\n\n\n//# sourceURL=webpack:///./index.js?");

      }),

    "./src/a.js":

      (function (module, exports, __webpack_require__) {

        eval("const b = __webpack_require__(/*! ./base/b */ \"./src/base/b.js\")\nconst c = __webpack_require__(/*! ./base/c */ \"./src/base/c.js\")\nmodule.exports = b + c\n\n//# sourceURL=webpack:///./src/a.js?");

      }),

    "./src/base/b.js":

      (function (module, exports) {

        eval("module.exports = 'b'\n\n//# sourceURL=webpack:///./src/base/b.js?");

      }),

    "./src/base/c.js":

      (function (module, exports) {

        eval("module.exports = 'c'\n\n\n//# sourceURL=webpack:///./src/base/c.js?");

      })

  });