/** @jsx React.DOM */
'use strict';
var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var DateRangePicker = require('../index.js');
var moment = require('moment');
var fileContent = require('./AppContent').content;

module.exports = React.createClass({
	render: function () {
		return (
			<Row>
				<Col md={12}>
					<h1 className="page-header">
						<div className="pull-left">
							react-bootstrap-datetimepicker
							&nbsp;
							<small>DEMO</small>
						</div>
						<div className="pull-right">
							<Button bsStyle="primary" className="pull-right" href="https://github.com/skratchdot/react-bootstrap-datetimepicker">Source Code / Readme</Button>
						</div>
						<div className="clearfix"></div>
					</h1>
				</Col>
			</Row>
		);
	}
});
