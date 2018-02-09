# react-bootstrap-daterangepicker

[![NPM version](https://badge.fury.io/js/react-bootstrap-daterangepicker.svg)](http://badge.fury.io/js/react-bootstrap-daterangepicker)
[![Build Status](https://travis-ci.org/skratchdot/react-bootstrap-daterangepicker.svg?branch=master)](https://travis-ci.org/skratchdot/react-bootstrap-daterangepicker)
[![Code Climate](https://codeclimate.com/github/skratchdot/react-bootstrap-daterangepicker.png)](https://codeclimate.com/github/skratchdot/react-bootstrap-daterangepicker)
[![Coverage Status](https://coveralls.io/repos/skratchdot/react-bootstrap-daterangepicker/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/react-bootstrap-daterangepicker?branch=master)
[![Dependency Status](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker.svg)](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker)
[![devDependency Status](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker/dev-status.svg)](https://david-dm.org/skratchdot/react-bootstrap-daterangepicker#info=devDependencies)

[![NPM](https://nodei.co/npm/react-bootstrap-daterangepicker.png)](https://npmjs.org/package/react-bootstrap-daterangepicker)

## Description

A date/time picker for react (using bootstrap). This is a react wrapper around
an existing jQuery/bootstrap library (it is not a pure react port):

[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker)

## Getting Started

1. Install the needed peer dependencies:
   `npm install --save bootstrap-daterangepicker react jquery moment prop-types`

2. Install the module with:
   `npm install --save react-bootstrap-daterangepicker`

3. Include the bootstrap@3 css and fonts in your project.
   (aka `import 'bootstrap/dist/css/bootstrap.css';`)

4. Include the bootstrap-daterangepicker css in your project.
   (aka `import 'bootstrap-daterangepicker/daterangepicker.css';`)

5. This is a commonjs library. You will need a tool like browserify/webpack/etc to build your code.

```javascript
import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

class MyComponent {
  render() {
    return (
      <DateRangePicker startDate="1/1/2014" endDate="3/1/2014">
        <button>Click Me To Open Picker!</button>
      </DateRangePicker>
    );
  }
}
```

## Documentation

For in depth documentation, see the original
[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) project page.

You can pass all the same props as the original plugin:

* **&lt;input&gt;, alwaysShowCalendars, applyClass, autoApply, autoUpdateInput,
  buttonClasses, cancelClass, dateLimit, drops, endDate, isCustomDate,
  isInvalidDate, linkedCalendars, locale, maxDate, minDate, opens, parentEl,
  ranges, showCustomRangeLabel, showDropdowns, showISOWeekNumbers,
  showWeekNumbers, singleDatePicker, startDate, template, timePicker,
  timePicker24Hour, timePickerIncrement, timePickerSeconds**

You can listen to the following 7 events:

* **onShow**: thrown when the widget is shown
* **onHide**: thrown when the widget is hidden
* **onShowCalendar**: thrown when the calendar is shown
* **onHideCalendar**: thrown when the calendar is hidden
* **onApply**: thrown when the apply button is clicked
* **onCancel**: thrown when the cancel button is clicked
* **onEvent**: thrown when any of the 4 events above are triggered

All 7 of the events above should take a handler that is passed 2 arguments: **event** and **picker**

#### Example event handler:

```javascript
class SomeReactComponent extends React.Component {
  handleEvent(event, picker) {
    console.log(picker.startDate);
  }
  render() {
    return <DateRangePicker onEvent={this.handleEvent} />;
  }
}
```

There are 2 additional props you can pass, that are not part of the wrapped
[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) project.
Every `<DateRangePicker />` element emits a div element for the wrapper project to initialize itself against.

The emitted div looks like this by default:

```html
<div class="react-bootstrap-daterangepicker-container" style="display:inline-block"></div>
```

The 2 props you can pass to modify this behavior are:

* **containerStyles [object]**: the styles of the container `<div />` (default: `{ display: 'inline-block' }`)
* **containerClass [string]**: the class of the container `<div />` (default: `'react-bootstrap-daterangepicker-container'`)

## Release Notes

Release notes can be found in the
[Changelog](https://github.com/skratchdot/react-bootstrap-daterangepicker/blob/master/CHANGELOG.md).

## Links

* [Source Code](https://github.com/skratchdot/react-bootstrap-daterangepicker)
* [Changelog](https://github.com/skratchdot/react-bootstrap-daterangepicker/blob/master/CHANGELOG.md)
* [Live Demo](http://projects.skratchdot.com/react-bootstrap-daterangepicker/)
* [Original Plugin](https://github.com/dangrossman/bootstrap-daterangepicker)

## License

Copyright (c) 2014 skratchdot  
Uses the original [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) license.
