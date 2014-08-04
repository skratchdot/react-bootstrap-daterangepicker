/** @jsx React.DOM */
'use strict';
/**
 * react-bootstrap-daterangepicker.js
 * 
 * A slightly modified version of bootstrap-daterangepicker.js for use in react and npm.
 * Original copyright in: ./src/daterangepicker.js
 */
var React = require('react');
var $ = require('jquery');
var DateRangePicker = require('./daterangepicker.js');

/* this is our export React class */
module.exports = React.createClass({
	$picker: null,
	options: ['startDate','endDate','minDate','maxDate','dateLimit','showDropdowns','showWeekNumbers',
		'timePicker','timePickerIncrement','timePicker12Hour','ranges','opens','buttonClasses',
		'applyClass','cancelClass','format','separator','locale','singleDatePicker','parentEl'
	],
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
	setOptionsFromProps: function () {
		var currentOptions = {}, needToInit = false, $this = this;
		if ($this.$picker) {
			$this.options.forEach(function (option) {
				if ($this.props.hasOwnProperty(option)) {
					currentOptions[option] = $this.props[option];
					needToInit = true;
				}
			});
			if (needToInit) {
				$this.$picker.data('daterangepicker').setOptions(currentOptions);
			}
		}
	},
	componentDidMount: function () {
		var $this = this;
		$this.$picker = $(this.refs.picker.getDOMNode());
		// initialize
		$this.$picker.daterangepicker();
		// attach event listeners
		['Show','Hide','Apply','Cancel'].forEach(function (event) {
			var lcase = event.toLowerCase();
			$this.$picker.on(lcase + '.daterangepicker', $this.makeEventHandler('on' + event));
		});
		// initial options from this.props
		$this.setOptionsFromProps();
	},
	componentWillUnmount: function () {
		this.$picker = null;
	},
	render: function () {
		this.setOptionsFromProps();
		return this.transferPropsTo(
			<div ref="picker">{this.props.children}</div>
		);
	}
});
