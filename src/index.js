'use strict';
import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import 'bootstrap-daterangepicker';

export class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.$picker = null;
  }
  componentDidMount() {
    // initialize daterangepicker
    this.$picker = $(this.ref);
    this.$picker.daterangepicker(
      this.props.initialSettings,
      this.handleCallback.bind(this)
    );
    // attach event listeners
    ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(
      (event) => {
        const lcase = event.toLowerCase();
        this.$picker.on(
          lcase + '.daterangepicker',
          this.makeEventHandler('on' + event)
        );
      }
    );
  }
  componentWillUnmount() {
    if (
      this.$picker &&
      this.$picker.data &&
      this.$picker.data('daterangepicker')
    ) {
      this.$picker.data('daterangepicker').remove();
    }
  }
  handleCallback(...args) {
    if (typeof this.props.onCallback === 'function') {
      this.props.onCallback(...args);
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
  setStartDate(dateOrString) {
    this.$picker.data('daterangepicker').setStartDate(dateOrString);
  }
  setEndDate(dateOrString) {
    this.$picker.data('daterangepicker').setEndDate(dateOrString);
  }
  render() {
    const childElement = React.Children.only(this.props.children);
    return React.cloneElement(childElement, { ref: (el) => (this.ref = el) });
  }
}

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
    timePickerSeconds: PropTypes.bool,
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
  onCallback: PropTypes.func,
};

export default DateRangePicker;
