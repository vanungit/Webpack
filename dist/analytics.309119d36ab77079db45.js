/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./analytics.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("function createAnalitics() {\r\n    let counter = 0\r\n    let isDestory = false\r\n    let Listener = ()=> counter ++\r\n\r\n    document.addEventListener('click',Listener)\r\n\r\n    return{\r\n        destroy(){\r\n            document.removeEventListener('click',Listener)\r\n            isDestory = true\r\n        },\r\n        getClicks(){\r\n            if(isDestory){\r\n                return 'Analitics is destroyed'\r\n            }\r\n            return counter\r\n        }\r\n    }\r\n}\r\nwindow.analitics = createAnalitics()\n\n//# sourceURL=webpack:///./analytics.js?");
/******/ })()
;