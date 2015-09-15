
'use strict';
var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
	render: function () {
		return (
			<Row>
				<Col md={12}>
					<h1 className="page-header">
						<div className="pull-left">
							react-bootstrap-daterangepicker
							&nbsp;
							<small>DEMO</small>
						</div>
						<div className="pull-right">
							<Button bsStyle="primary" className="pull-right" href="https://github.com/skratchdot/react-bootstrap-daterangepicker">Source Code / Readme</Button>
						</div>
						<div className="clearfix"></div>
					</h1>
				</Col>
			</Row>
		);
	}
});
