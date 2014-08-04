/** @jsx React.DOM */
'use strict';
var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Header = require('./Header');
var DateRangePicker = require('../../src/index.js');
var moment = require('moment');
var fileContent = require('./AppContent').content;

var App = React.createClass({
	getInitialState: function () {
		return {
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			},
			startDate: moment().subtract(29, 'days'),
			endDate: moment()
		};
	},
	handleEvent: function (event, picker) {
		/*
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
		*/
	},
	render: function () {
		var start = this.state.startDate.format('YYYY-MM-DD');
		var end = this.state.endDate.format('YYYY-MM-DD');
		var label = start + ' - ' + end;
		if (start === end) {
			label = start;
		}
		return (
			<Grid>
				<Header />
				<Row>
					<Col md={3}>
						<h2>Demo:</h2>
						<DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onEvent={this.handleEvent}>
							<Button className="selected-date-range-btn" style={{width:'100%'}}>
								<div className="pull-left"><Glyphicon glyph="calendar" /></div>
								<div className="pull-right">
									<span>
										{label}
									</span>
									<span className="caret"></span>
								</div>
							</Button>
						</DateRangePicker>
					</Col>
					<Col md={9}>
						<h2>Demo Source Code:</h2>
						<textarea className="form-control" style={{width:'100%',height:'500px'}} readOnly value={fileContent} />
					</Col>
				</Row>
			</Grid>
		);
	}
});

// init our demo app
React.renderComponent(<App />, document.getElementById('app'));

// we are using browserify. setup the browser.
exports.React = window.React = React;
