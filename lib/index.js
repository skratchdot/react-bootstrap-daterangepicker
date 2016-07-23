'use strict';
/**
 * react-bootstrap-daterangepicker.js
 *
 * A slightly modified version of bootstrap-daterangepicker.js for use in react and npm.
 * Original copyright in: ./lib/daterangepicker.js
 */
var React = require('react');
var $ = require('jquery');
var objectAssign = require('object-assign');
var DateRangePicker = require('bootstrap-daterangepicker');
var getOptions = require('./get-options.js');

/* this is our export React class */
module.exports = React.createClass({
	$picker: null,
	options: getOptions(),
	makeEventHandler: function (eventType) {
		return function (event, picker) {
			if (typeof this.props.onEvent === 'function') {
				this.props.onEvent(event, picker);
			}
			if (typeof this.props[eventType] === 'function') {
				this.props[eventType](event, picker);
			}
		}.bind(this);
	},
	getOptionsFromProps: function (props) {
		var options;
		props = props || this.props;
		this.options.forEach(function (option) {
			if (props.hasOwnProperty(option)) {
				options = options || {};
				options[option] = props[option];
			}
		});
		return options || {};
	},
	setOptionsFromProps: function (currentOptions) {
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
	},
	componentWillReceiveProps: function (nextProps) {
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
	},
	componentDidMount: function () {
		this.initializeDateRangePicker();
	},
	componentWillUnmount: function () {
		this.removeDateRangePicker();
	},
	removeDateRangePicker: function () {
		this.$picker.data('daterangepicker').remove();
	},
	initializeDateRangePicker: function () {
		var $this = this;
		$ = (window.jQuery && window.jQuery.fn.daterangepicker) ? window.jQuery : $;
		$this.$picker = $(this.refs.picker);
		// initialize
		$this.$picker.daterangepicker(this.getOptionsFromProps());
		// attach event listeners
		['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(function (event) {
			var lcase = event.toLowerCase();
			$this.$picker.on(lcase + '.daterangepicker', $this.makeEventHandler('on' + event));
		});
	},
	render: function () {
		var ignoredAttrs = this.options.concat([
			"onShow", "onHide", "onShowCalendar", "onHideCalendar", "onApply",
			"onCancel", "onEvent", "children"
		]);

		var oldProps = this.props;
		var props = {ref: 'picker'};
		for (var i in oldProps) {
			if (ignoredAttrs.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(oldProps, i)) continue;
			props[i] = oldProps[i];
		}

		return React.createElement(
			'div',
			props,
			this.props.children
		);
	}
});
