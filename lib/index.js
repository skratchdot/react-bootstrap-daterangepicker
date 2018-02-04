'use strict';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import getOptions from './get-options.js';
import PropTypes from 'prop-types';
import 'bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

export class DateRangePicker extends Component {
	constructor(props) {
		super(props);
		this.$picker = null;
		this.options = getOptions();
		this.displayName = 'DateRangePicker';
	}
	makeEventHandler(eventType) {
		return function (event, picker) {
			if (typeof this.props.onEvent === 'function') {
				this.props.onEvent(event, picker);
			}
			if (typeof this.props[eventType] === 'function') {
				this.props[eventType](event, picker);
			}
		}.bind(this);
	}
	getOptionsFromProps(props) {
		var options;
		props = props || this.props;
		this.options.forEach(function (option) {
			if (props.hasOwnProperty(option)) {
				options = options || {};
				options[option] = props[option];
			}
		});
		return options || {};
	}
	setOptionsFromProps(currentOptions) {
		var keys = Object.keys(currentOptions);
		var $this = this;
		if ($this.$picker) {
			if (currentOptions) {
				keys.forEach(function (key) {
					if (key === 'startDate') {
						$this.$picker.data('daterangepicker').setStartDate(currentOptions[key]);
					} else if (key === 'endDate') {
						$this.$picker.data('daterangepicker').setEndDate(currentOptions[key]);
					} else if (key === 'locale') {
						$.extend($this.$picker.data('daterangepicker')[key], currentOptions[key]);
					} else {
						$this.$picker.data('daterangepicker')[key] = currentOptions[key];
					}
				});
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		var $this = this;
		if ($this.$picker) {
			var currentOptions = $this.getOptionsFromProps();
			var nextOptions = $this.getOptionsFromProps(nextProps);
			var changedOptions = {};
			$this.options.forEach(function (option) {
				if (currentOptions[option] !== nextOptions[option]) {
					changedOptions[option] = nextOptions[option];
				}
			});
			$this.setOptionsFromProps(changedOptions);
		}
	}
	componentDidMount() {
		this.initializeDateRangePicker();
	}
	componentWillUnmount() {
		this.removeDateRangePicker();
	}
	removeDateRangePicker() {
		if(this.$picker && this.$picker.data('daterangepicker')) {
			this.$picker.data('daterangepicker').remove();
		}
	}
	initializeDateRangePicker() {
		var $this = this;
		//$ = (window.jQuery && window.jQuery.fn.daterangepicker)? window.jQuery : $;
		$this.$picker = $(findDOMNode(this.refs.picker));
		// initialize
		$this.$picker.daterangepicker(this.getOptionsFromProps());
		// attach event listeners
		['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(function (event) {
			var lcase = event.toLowerCase();
			$this.$picker.on(lcase + '.daterangepicker', $this.makeEventHandler('on' + event));
		});
	}
	render() {
		const props = Object.assign({}, this.props, { ref: 'picker'});

		Object.keys(this.constructor.propTypes).forEach(function(key) {
			delete props[key];
		});

		return <div ref="picker">{this.props.children}</div>;

		//React.cloneElement(this.props.children, {ref: 'picker'});
	}
};

DateRangePicker.propTypes = {
	"<input>": PropTypes.any,
	alwaysShowCalendars: PropTypes.bool,
	applyClass: PropTypes.string,
	autoApply: PropTypes.bool,
	autoUpdateInput: PropTypes.bool,
	buttonClasses: PropTypes.array,
	cancelClass: PropTypes.string,
	dateLimit: PropTypes.object,
	drops: PropTypes.oneOf(['down', 'up']),
	endDate: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	isCustomDate: PropTypes.func,
	isInvalidDate: PropTypes.func,
	linkedCalendars: PropTypes.bool,
	locale: PropTypes.object,
	maxDate: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	minDate: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
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
	startDate: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	template: PropTypes.any,
	timePicker: PropTypes.bool,
	timePickerIncrement: PropTypes.number,
	timePicker24Hour: PropTypes.bool,
	timePickerSeconds: PropTypes.bool,
};

export default DateRangePicker;
