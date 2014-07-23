# react-bootstrap-daterangepicker

[![NPM version](https://badge.fury.io/js/react-bootstrap-daterangepicker.svg)](http://badge.fury.io/js/react-bootstrap-daterangepicker)
[![Dependency Status](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker.svg)](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker)
[![devDependency Status](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker/dev-status.svg)](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker#info=devDependencies)


## Description

A date/time picker for react (using bootstrap). This is a react port of:

[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker)


## Getting Started

Install the module with: `npm install --save react-bootstrap-daterangepicker`

```javascript
var React = require('react');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var someReactComponent = React.createClass({
    render: function () {
        return (
            <DateRangePicker startDate="1/1/2014" endDate="3/1/2014" />
        );
    }
});
```


## Documentation

For in depth documentation, see the original
[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) project page.

You can pass all the same props as the original plugin:

- startDate, endDate, minDate, maxDate, dateLimit, showDropdowns, showWeekNumbers,
  timePicker, timePickerIncrement, timePicker12Hour, ranges, opens, buttonClasses,
  applyClass, cancelClass, format, separator, locale, singleDatePicker, parentEl

You can listen to the following 5 events:

- onShow: thrown when the widget is shown
- onHide: thrown when the widget is hidden
- onApply: thrown when the apply button is clicked
- onCancel: thrown when the cancel button is clicked
- onEvent: thrown when any of the 4 events above are triggered

All 5 of the events above should take a handler that is passed 2 arguments: **event** and **picker**

#### Example event handler:

```javascript
var someReactComponent = React.createClass({
    handleEvent: function (event, picker) {
        console.log(picker.startDate);
    },
    render: function () {
        return (
            <DateRangePicker onEvent={this.handleEvent} />
        );
    }
});
```


## Links

- [Source Code](https://github.com/skratchdot/react-bootstrap-daterangepicker)
- [Live Demo](http://projects.skratchdot.com/react-bootstrap-daterangepicker/)
- [Original Plugin](https://github.com/dangrossman/bootstrap-daterangepicker)


## License

Copyright (c) 2014 skratchdot  
Uses the original [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) license.
