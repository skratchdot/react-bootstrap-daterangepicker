'use strict';
import React, { Component } from 'react';
import $ from 'jquery';
import getOptions from './get-options.js';
import PropTypes from 'prop-types';
import 'bootstrap-daterangepicker';

export class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.$picker = null;
    this.options = getOptions();
  }
  componentDidMount() {
    // initialize
    this.$picker.daterangepicker(this.getOptionsFromProps());
    // attach event listeners
    ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(
      event => {
        const lcase = event.toLowerCase();
        this.$picker.on(
          lcase + '.daterangepicker',
          this.makeEventHandler('on' + event)
        );
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    const currentOptions = this.getOptionsFromProps();
    const nextOptions = this.getOptionsFromProps(nextProps);
    const changedOptions = {};
    this.options.forEach(option => {
      if (currentOptions[option] !== nextOptions[option]) {
        changedOptions[option] = nextOptions[option];
      }
    });
    this.setOptionsFromProps(changedOptions);
  }
  componentWillUnmount() {
    if (this.$picker && this.$picker.data('daterangepicker')) {
      this.$picker.data('daterangepicker').remove();
    }
  }
  makeEventHandler(eventType) {
    const { onEvent } = this.props;
    return (event, picker) => {
      if (typeof onEvent === 'function') {
        onEvent(event, picker);
      }
      if (typeof this.props[eventType] === 'function') {
        this.props[eventType](event, picker);
      }
    };
  }
  getOptionsFromProps(props) {
    let options;
    props = props || this.props;
    this.options.forEach(option => {
      if (props.hasOwnProperty(option)) {
        options = options || {};
        options[option] = props[option];
      }
    });
    return options || {};
  }
  setOptionsFromProps(currentOptions) {
    const keys = Object.keys(currentOptions);
    keys.forEach(key => {
      if (key === 'startDate') {
        this.$picker.data('daterangepicker').setStartDate(currentOptions[key]);
      } else if (key === 'endDate') {
        this.$picker.data('daterangepicker').setEndDate(currentOptions[key]);
      } else {
        this.$picker.data('daterangepicker')[key] = currentOptions[key];
      }
    });
  }
  render() {
    const { children, containerStyles, containerClass } = this.props;
    return (
      <div
        ref={picker => {
          this.$picker = $(picker);
        }}
        className={containerClass}
        style={containerStyles}
      >
        {children}
      </div>
    );
  }
}

DateRangePicker.defaultProps = {
  containerClass: 'react-bootstrap-daterangepicker-container',
  containerStyles: {
    display: 'inline-block'
  }
};

DateRangePicker.propTypes = {
  '<input>': PropTypes.any,
  alwaysShowCalendars: PropTypes.bool,
  applyClass: PropTypes.string,
  autoApply: PropTypes.bool,
  autoUpdateInput: PropTypes.bool,
  buttonClasses: PropTypes.array,
  cancelClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  containerClass: PropTypes.string,
  containerStyles: PropTypes.object,
  dateLimit: PropTypes.object,
  drops: PropTypes.oneOf(['down', 'up']),
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isCustomDate: PropTypes.func,
  isInvalidDate: PropTypes.func,
  linkedCalendars: PropTypes.bool,
  locale: PropTypes.object,
  maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onEvent: PropTypes.func,
  onHide: PropTypes.func,
  onHideCalendar: PropTypes.func,
  onShow: PropTypes.func,
  onShowCalendar: PropTypes.func,
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
  timePickerIncrement: PropTypes.number,
  timePicker24Hour: PropTypes.bool,
  timePickerSeconds: PropTypes.bool
};

export default DateRangePicker;
