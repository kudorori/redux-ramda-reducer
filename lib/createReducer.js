"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var passThroughSpec = [_ramda.T, (0, _ramda.always)(_ramda.identity)];
var ensureCondFunction = (0, _ramda.unless)((0, _ramda.is)(Function), (0, _ramda.propEq)("type"));

var fnReducer = (0, _ramda.curry)(function (payload, memo, fn) {
  return fn(payload)(memo);
});

var createPayloadReducer = (0, _ramda.curry)(function (fn, action, state) {
  var payload = action.payload;
  var fns = (0, _ramda.unless)((0, _ramda.is)(Array), _ramda.of)(fn);
  return (0, _ramda.reduce)(fnReducer(payload), state, fns);
});

var ensureCondSpec = (0, _ramda.compose)((0, _ramda.adjust)(ensureCondFunction, 0), (0, _ramda.adjust)(createPayloadReducer, 1));

var createReducerSpec = (0, _ramda.compose)(_ramda.cond, (0, _ramda.append)(passThroughSpec), (0, _ramda.map)(ensureCondSpec));

var createReducer = (0, _ramda.curry)(function (initialState, spec, state) {
  var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  state = state ? state : initialState;
  return createReducerSpec(spec)(action)(state);
});

exports.default = createReducer;