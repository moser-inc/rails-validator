/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* Build a path for redirection.
*
* - Adds a timestamp GET param for cache busting
* - Inserts an ID attribute if necessary
*/
var buildSuccessPath = exports.buildSuccessPath = function buildSuccessPath(path, json) {
  var timestamp = new Date().valueOf();
  if (path.indexOf('?') > -1) {
    path += '&t=' + timestamp;
  } else {
    path += '?t=' + timestamp;
  }
  if (json && json.id) {
    path = path.replace(':id', json.id);
  }
  return path;
};

/*
* Remote element
*/
var removeElement = exports.removeElement = function removeElement(element) {
  element.parentElement.removeChild(element);
};

/*
* Create an error element
*/
var createErrorParagraph = exports.createErrorParagraph = function createErrorParagraph(text, base) {
  var p = document.createElement('p');
  p.classList.add('form-error');
  p.classList.add(base ? 'form-error-base' : 'form-error-inline');
  p.innerText = text;
  return p;
};

/*
* Convert a query into an array of elements
*/
var querySelectorArray = exports.querySelectorArray = function querySelectorArray(parent, selector) {
  var query = parent.querySelectorAll(selector);
  var array = Array.prototype.slice.call(query);
  return array;
};

/*
* Take a single error message and format it as if it were
* a json error coming from the server
*/
var formatStringAsErrors = exports.formatStringAsErrors = function formatStringAsErrors(errorString) {
  return { base: [errorString] };
};

/*
* Return true if the element is in view
*/
var elementIsInView = exports.elementIsInView = function elementIsInView(el) {
  var rect = el.getBoundingClientRect();
  var w = window,
      d = document;
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (w.innerHeight || d.documentElement.clientHeight) && rect.right <= (w.innerWidth || d.documentElement.clientWidth);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _handlers = __webpack_require__(2);

var handlers = _interopRequireWildcard(_handlers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MODULE_LOADED = '_rails_validator_loaded';

var init = function init() {
  window[MODULE_LOADED] = true;
  addListener('form', 'ajax:before', handlers.onRemoteFormBefore);
  addListener('form[data-success], a[data-success]', 'ajax:success', handlers.onRemoteFormSuccess);
  addListener('form[data-errors]', 'ajax:error', handlers.onRemoteFormErrors);
};

var addListener = function addListener(selector, event, fn) {
  document.addEventListener(event, function (e) {
    if (e.target.matches(selector)) {
      e.stopPropagation();
      fn.call(e.target, e);
    }
  });
};

if (!window[MODULE_LOADED]) {
  init();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRemoteFormErrors = exports.onRemoteFormSuccess = exports.onRemoteFormBefore = undefined;

var _errors = __webpack_require__(3);

var errors = _interopRequireWildcard(_errors);

var _helpers = __webpack_require__(0);

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Tell the server we want a json response
*/
var onRemoteFormBefore = exports.onRemoteFormBefore = function onRemoteFormBefore(event) {
  var form = event.target;
  if (form.getAttribute('data-type') === null) {
    form.setAttribute('data-type', 'json');
  }
};

/*
* Called when a remote form is submitted with a data-success configured
* Redirects to the configured path, or reloads the page if "reload" is passed
*
* ie:
* <form action="..." data-remote="true" data-success="/path/for/success/:id">
*/
var onRemoteFormSuccess = exports.onRemoteFormSuccess = function onRemoteFormSuccess(event) {
  var form = event.target;
  var successPath = form.getAttribute('data-success');
  if (successPath === 'reload') {
    window.location.reload(true);
  } else {
    var json = event.detail[0];
    window.location = helpers.buildSuccessPath(successPath, json);
  }
};

/*
* Called when a remote form is submitted and the server has returned an
* error, only if the form has a data-errors attribute
*
* ie:
* <form action="..." data-remote="true" data-errors="inline">
*   - OR -
* <form action="..." data-remote="true" data-errors="alert">
*/
var onRemoteFormErrors = exports.onRemoteFormErrors = function onRemoteFormErrors(event) {
  var json = event.detail[0];
  var xhr = event.detail[2];
  var form = event.target;
  var errorType = form.getAttribute('data-errors');

  if (xhr.status === 422) {
    if (errorType === 'inline') {
      errors.displayErrorsInline(form, json);
    } else {
      errors.displayErrorsAlert(json);
    }
  } else if (xhr.status === 401 || xhr.status === 403) {
    window.alert('Error: Access denied.');
  } else {
    var errorThrown = event.detail[1];
    window.alert('An unexpected error occurred: ' + errorThrown);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayErrorsAlert = exports.displayErrorsInline = exports.clearErrors = undefined;

var _helpers = __webpack_require__(0);

var helpers = _interopRequireWildcard(_helpers);

var _case = __webpack_require__(4);

var _case2 = _interopRequireDefault(_case);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Remove inline error messages
*/
var clearErrors = exports.clearErrors = function clearErrors(form) {
  helpers.querySelectorArray(form, '.form-error-inline, .form-error-base').forEach(helpers.removeElement);
};

/*
* Append error text to form input fields and scroll to the first error
*/
var displayErrorsInline = exports.displayErrorsInline = function displayErrorsInline(form, json) {
  if (typeof json === 'string') {
    json = helpers.formatStringAsErrors(json);
  }

  clearErrors(form);
  var errors = json.errors;

  for (var key in errors) {
    var messages = errors[key];
    if (key === 'base') {
      for (var i = 0; i < messages.length; i++) {
        var p = helpers.createErrorParagraph(messages[i], true);
        form.insertBefore(p, form.firstChild);
      }
    } else {
      var input = void 0,
          keyArr = void 0;
      keyArr = key.split('.');

      if (keyArr.length === 2) {
        keyArr[0] += '_attributes';
        input = form.querySelector('[name$=\'[' + keyArr.join('][') + ']\']');
      } else {
        var array = helpers.querySelectorArray(form, '[name$=\'[' + key + ']\']');
        input = array.filter(function (input) {
          // Filter out nested attribute inputs ie model[a][b]
          return !input.name.match(/\]\[/);
        })[0];
        if (input === null && !key.match(/_id$/)) {
          input = form.querySelector('[name$=\'[' + key + '_id]\']');
        }
      }

      var message = messages[0];
      if (input) {
        input.parentNode.appendChild(helpers.createErrorParagraph(message));
      } else {
        // eslint-disable-next-line no-console
        console.warn('Missing input field for key:', key);
        form.insertBefore(helpers.createErrorParagraph(_case2.default.title(key) + ' ' + message), form.firstChild);
      }
    }
  }

  var firstError = form.querySelector('.form-error-inline, .form-error-base');
  if (firstError && !helpers.elementIsInView(firstError) && typeof firstError.scrollIntoView === 'function') {
    firstError.parentElement.scrollIntoView();
  }
};

/*
* Display errors in a standard window.alert dialog
*/
var displayErrorsAlert = exports.displayErrorsAlert = function displayErrorsAlert(json) {
  if (typeof json === 'string') {
    json = helpers.formatStringAsErrors(json);
  }
  var text = 'Please correct the following errors:\n';
  var message = void 0,
      errors = json.errors;
  for (var key in errors) {
    message = errors[key][0];
    if (key === 'base') {
      text += ' - ' + message + '\n';
    } else {
      text += ' - ' + _case2.default.title(key) + ' ' + message + '\n';
    }
  }
  window.alert(text);
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*! Case - v1.5.3 - 2017-07-11
* Copyright (c) 2017 Nathan Bubna; Licensed MIT, GPL */
(function() {
    "use strict";
    var unicodes = function(s, prefix) {
        prefix = prefix || '';
        return s.replace(/(^|-)/g, '$1\\u'+prefix).replace(/,/g, '\\u'+prefix);
    },
    basicSymbols = unicodes('20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7', '00'),
    baseLowerCase = 'a-z'+unicodes('DF-F6,F8-FF', '00'),
    baseUpperCase = 'A-Z'+unicodes('C0-D6,D8-DE', '00'),
    improperInTitle = 'A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via',
    regexps = function(symbols, lowers, uppers, impropers) {
        symbols = symbols || basicSymbols;
        lowers = lowers || baseLowerCase;
        uppers = uppers || baseUpperCase;
        impropers = impropers || improperInTitle;
        return {
            capitalize: new RegExp('(^|['+symbols+'])(['+lowers+'])', 'g'),
            pascal: new RegExp('(^|['+symbols+'])+(['+lowers+uppers+'])', 'g'),
            fill: new RegExp('['+symbols+']+(.|$)','g'),
            sentence: new RegExp('(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")(['+lowers+'])', 'g'),
            improper: new RegExp('\\b('+impropers+')\\b', 'g'),
            relax: new RegExp('([^'+uppers+'])(['+uppers+']*)(['+uppers+'])(?=['+lowers+']|$)', 'g'),
            upper: new RegExp('^[^'+lowers+']+$'),
            hole: /[^\s]\s[^\s]/,
            apostrophe: /'/g,
            room: new RegExp('['+symbols+']')
        };
    },
    re = regexps(),
    _ = {
        re: re,
        unicodes: unicodes,
        regexps: regexps,
        types: [],
        up: String.prototype.toUpperCase,
        low: String.prototype.toLowerCase,
        cap: function(s) {
            return _.up.call(s.charAt(0))+s.slice(1);
        },
        decap: function(s) {
            return _.low.call(s.charAt(0))+s.slice(1);
        },
        deapostrophe: function(s) {
            return s.replace(re.apostrophe, '');
        },
        fill: function(s, fill, deapostrophe) {
            if (fill != null) {
                s = s.replace(re.fill, function(m, next) {
                    return next ? fill + next : '';
                });
            }
            if (deapostrophe) {
                s = _.deapostrophe(s);
            }
            return s;
        },
        prep: function(s, fill, pascal, upper) {
            s = s == null ? '' : s + '';// force to string
            if (!upper && re.upper.test(s)) {
                s = _.low.call(s);
            }
            if (!fill && !re.hole.test(s)) {
                var holey = _.fill(s, ' ');
                if (re.hole.test(holey)) {
                    s = holey;
                }
            }
            if (!pascal && !re.room.test(s)) {
                s = s.replace(re.relax, _.relax);
            }
            return s;
        },
        relax: function(m, before, acronym, caps) {
            return before + ' ' + (acronym ? acronym+' ' : '') + caps;
        }
    },
    Case = {
        _: _,
        of: function(s) {
            for (var i=0,m=_.types.length; i<m; i++) {
                if (Case[_.types[i]].apply(Case, arguments) === s){ return _.types[i]; }
            }
        },
        flip: function(s) {
            return s.replace(/\w/g, function(l) {
                return (l == _.up.call(l) ? _.low : _.up).call(l);
            });
        },
        random: function(s) {
            return s.replace(/\w/g, function(l) {
                return (Math.round(Math.random()) ? _.up : _.low).call(l);
            });
        },
        type: function(type, fn) {
            Case[type] = fn;
            _.types.push(type);
        }
    },
    types = {
        lower: function(s, fill, deapostrophe) {
            return _.fill(_.low.call(_.prep(s, fill)), fill, deapostrophe);
        },
        snake: function(s) {
            return Case.lower(s, '_', true);
        },
        constant: function(s) {
            return Case.upper(s, '_', true);
        },
        camel: function(s) {
            return _.decap(Case.pascal(s));
        },
        kebab: function(s) {
            return Case.lower(s, '-', true);
        },
        header: function(s) {
            return Case.capital(s, '-', true);
        },
        upper: function(s, fill, deapostrophe) {
            return _.fill(_.up.call(_.prep(s, fill, false, true)), fill, deapostrophe);
        },
        capital: function(s, fill, deapostrophe) {
            return _.fill(_.prep(s).replace(re.capitalize, function(m, border, letter) {
                return border+_.up.call(letter);
            }), fill, deapostrophe);
        },
        pascal: function(s) {
            return _.fill(_.prep(s, false, true).replace(re.pascal, function(m, border, letter) {
                return _.up.call(letter);
            }), '', true);
        },
        title: function(s) {
            return Case.capital(s).replace(re.improper, function(small, p, i, s) {
                return i > 0 && i < s.lastIndexOf(' ') ? _.low.call(small) : small;
            });
        },
        sentence: function(s, names) {
            s = Case.lower(s).replace(re.sentence, function(m, prelude, letter) {
                return prelude + _.up.call(letter);
            });
            if (names) {
                names.forEach(function(name) {
                    s = s.replace(new RegExp('\\b'+Case.lower(name)+'\\b', "g"), _.cap);
                });
            }
            return s;
        }
    };

    // TODO: Remove "squish" in a future breaking release.
    types.squish = types.pascal;

    for (var type in types) {
        Case.type(type, types[type]);
    }
    // export Case (AMD, commonjs, or global)
    var define = typeof define === "function" ? define : function(){};
    define(typeof module === "object" && module.exports ? module.exports = Case : this.Case = Case);

}).call(this);


/***/ })
/******/ ]);
//# sourceMappingURL=rails-validator.js.map