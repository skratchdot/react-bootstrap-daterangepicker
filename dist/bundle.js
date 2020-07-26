'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var $ = _interopDefault(require('jquery'));
var PropTypes = _interopDefault(require('prop-types'));
require('bootstrap-daterangepicker');

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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var DateRangePicker = /*#__PURE__*/function (_Component) {
  _inherits(DateRangePicker, _Component);

  var _super = _createSuper(DateRangePicker);

  function DateRangePicker(props) {
    var _this;

    _classCallCheck(this, DateRangePicker);

    _this = _super.call(this, props);
    _this.ref = null;
    _this.$picker = null;
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // initialize daterangepicker
      this.$picker = $(this.ref);
      this.$picker.daterangepicker(this.props.initialSettings, this.handleCallback.bind(this)); // attach event listeners

      ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(function (event) {
        var lcase = event.toLowerCase();

        _this2.$picker.on(lcase + '.daterangepicker', _this2.makeEventHandler('on' + event));
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.$picker && this.$picker.data && this.$picker.data('daterangepicker')) {
        this.$picker.data('daterangepicker').remove();
      }
    }
  }, {
    key: "handleCallback",
    value: function handleCallback() {
      if (typeof this.props.onCallback === 'function') {
        var _this$props;

        (_this$props = this.props).onCallback.apply(_this$props, arguments);
      }
    }
  }, {
    key: "makeEventHandler",
    value: function makeEventHandler(eventType) {
      var _this3 = this;

      var onEvent = this.props.onEvent;
      return function (event, picker) {
        if (typeof onEvent === 'function') {
          onEvent(event, picker);
        }

        if (typeof _this3.props[eventType] === 'function') {
          _this3.props[eventType](event, picker);
        }
      };
    }
  }, {
    key: "setStartDate",
    value: function setStartDate(dateOrString) {
      this.$picker.data('daterangepicker').setStartDate(dateOrString);
    }
  }, {
    key: "setEndDate",
    value: function setEndDate(dateOrString) {
      this.$picker.data('daterangepicker').setEndDate(dateOrString);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var childElement = React__default.Children.only(this.props.children);
      return /*#__PURE__*/React__default.cloneElement(childElement, {
        ref: function ref(el) {
          return _this4.ref = el;
        }
      });
    }
  }]);

  return DateRangePicker;
}(React.Component);
DateRangePicker.propTypes = {
  initialSettings: PropTypes.shape({
    '<input>': PropTypes.any,
    alwaysShowCalendars: PropTypes.bool,
    applyButtonClasses: PropTypes.array,
    applyClass: PropTypes.string,
    autoApply: PropTypes.bool,
    autoUpdateInput: PropTypes.bool,
    buttonClasses: PropTypes.array,
    cancelButtonClasses: PropTypes.array,
    cancelClass: PropTypes.string,
    dateLimit: PropTypes.object,
    drops: PropTypes.oneOf(['down', 'up']),
    endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    isCustomDate: PropTypes.func,
    isInvalidDate: PropTypes.func,
    linkedCalendars: PropTypes.bool,
    locale: PropTypes.object,
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    maxSpan: PropTypes.any,
    maxYear: PropTypes.any,
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    minYear: PropTypes.any,
    moment: PropTypes.any,
    opens: PropTypes.oneOf(['left', 'right', 'center']),
    parentEl: PropTypes.any,
    ranges: PropTypes.object,
    showCustomRangeLabel: PropTypes.bool,
    showDropdowns: PropTypes.bool,
    showISOWeekNumbers: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    singleDatePicker: PropTypes.bool,
    startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    template: PropTypes.any,
    timePicker: PropTypes.bool,
    timePicker24Hour: PropTypes.bool,
    timePickerIncrement: PropTypes.number,
    timePickerSeconds: PropTypes.bool
  }),
  // you must pass a single element here
  children: PropTypes.node.isRequired,
  // events supported by the upstream lib
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onHide: PropTypes.func,
  onHideCalendar: PropTypes.func,
  onShow: PropTypes.func,
  onShowCalendar: PropTypes.func,
  // custom events in this lib
  onEvent: PropTypes.func,
  onCallback: PropTypes.func
};

exports.DateRangePicker = DateRangePicker;
exports.default = DateRangePicker;
