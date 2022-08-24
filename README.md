# react-bootstrap-daterangepicker

[![NPM version](https://badge.fury.io/js/react-bootstrap-daterangepicker.svg)](http://badge.fury.io/js/react-bootstrap-daterangepicker)
[![Build Status](https://travis-ci.org/skratchdot/react-bootstrap-daterangepicker.svg?branch=master)](https://travis-ci.org/skratchdot/react-bootstrap-daterangepicker)
[![Code Climate](https://codeclimate.com/github/skratchdot/react-bootstrap-daterangepicker.png)](https://codeclimate.com/github/skratchdot/react-bootstrap-daterangepicker)
[![Coverage Status](https://coveralls.io/repos/skratchdot/react-bootstrap-daterangepicker/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/react-bootstrap-daterangepicker?branch=master)

[![NPM](https://nodei.co/npm/react-bootstrap-daterangepicker.png)](https://npmjs.org/package/react-bootstrap-daterangepicker)

# 🚨 Deprecation Notice 🚨

> I put this project on github because I used it briefly for a project back in 2014. I haven't used it for years, and have recommended
> looking for a "pure react" date picker library. I might continue to merge small PRs, but will not be giving this library much/any
> support. I recommend using one of the [other react date picker](#other-react-date-pickers) libraries listed below.

## Description

A date/time picker for react (using bootstrap). This is a react wrapper around
an existing jQuery/bootstrap library (it is not a pure react port):

[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker)

## Getting Started

1.  Install the needed peer dependencies:
    `npm install --save bootstrap-daterangepicker react jquery moment`

2.  Install the module with:
    `npm install --save react-bootstrap-daterangepicker`

3.  Include the bootstrap@4 css and fonts in your project.
    (aka `import 'bootstrap/dist/css/bootstrap.css';`)

4.  Include the bootstrap-daterangepicker css in your project.
    (aka `import 'bootstrap-daterangepicker/daterangepicker.css';`)

5.  This is a commonjs library. You will need a tool like browserify/webpack/etc to build your code.

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
      <DateRangePicker
        initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}
      >
        <button>Click Me To Open Picker!</button>
      </DateRangePicker>
    );
  }
}
```

## Documentation

For in depth documentation, see the original
[bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) project page.

You can pass all the settings from the original plugin to the `initialSettings` prop:

- **&lt;input&gt;, alwaysShowCalendars, applyButtonClasses, applyClass,
  autoApply, autoUpdateInput, buttonClasses, cancelButtonClasses, cancelClass,
  dateLimit, drops, endDate, isCustomDate, isInvalidDate, linkedCalendars,
  locale, maxDate, maxSpan, maxYear, minDate, minYear, moment, opens, parentEl,
  ranges, showCustomRangeLabel, showDropdowns, showISOWeekNumbers,
  showWeekNumbers, singleDatePicker, startDate, template, timePicker,
  timePicker24Hour, timePickerIncrement, timePickerSeconds**

You can listen to the following 8 events:

- **onShow**: `callback(event, picker)` thrown when the widget is shown
- **onHide**: `callback(event, picker)` thrown when the widget is hidden
- **onShowCalendar**: `callback(event, picker)` thrown when the calendar is shown
- **onHideCalendar**: `callback(event, picker)` thrown when the calendar is hidden
- **onApply**: `callback(event, picker)` thrown when the apply button is clicked
- **onCancel**: `callback(event, picker)` thrown when the cancel button is clicked
- **onEvent**: `callback(event, picker)` thrown when any of the 6 events above are triggered
- **onCallback**: `callback(start, end, label)` thrown when the start/end dates change

You MUST pass a single child element to the `<DateRangePicker />` component- and it MUST be a DOM element.
Passing custom react components is not currently supported b/c this lib needs a single dom node to initialize.

NOTE: This component should be used as an [Uncontrolled Component](https://reactjs.org/docs/uncontrolled-components.html). If you try
to control the value of your child `<input />`, then you will probably encounter issues.

There are 2 methods from the upstream lib that can be called: `setStartDate` and `setEndDate`, but you need to use refs when doing so.
Please view the storybook for an example of this.

### Examples

For more usage examples, please view the storybook:  
https://projects.skratchdot.com/react-bootstrap-daterangepicker/

#### Simple button example

```javascript
<DateRangePicker>
  <button type="button" className="btn btn-primary">
    click to open
  </button>
</DateRangePicker>
```

#### Simple input example

```javascript
<DateRangePicker>
  <input type="text" className="form-control" />
</DateRangePicker>
```

#### Initialize with a startDate and endDate

```javascript
<DateRangePicker
  initialSettings={{ startDate: '01/01/2020', endDate: '01/15/2020' }}
>
  <input type="text" className="form-control" />
</DateRangePicker>
```

#### Example event handler:

```javascript
class SomeReactComponent extends React.Component {
  handleEvent(event, picker) {
    console.log(picker.startDate);
  }
  handleCallback(start, end, label) {
    console.log(start, end, label);
  }
  render() {
    return (
      <DateRangePicker onEvent={this.handleEvent} onCallback={this.handleCallback}>
        <input />
      </DateRangePicker>;
  }
}
```

## Release Notes

Release notes can be found in the
[Changelog](https://github.com/skratchdot/react-bootstrap-daterangepicker/blob/master/CHANGELOG.md).

## Links

- [Source Code](https://github.com/skratchdot/react-bootstrap-daterangepicker)
- [Changelog](https://github.com/skratchdot/react-bootstrap-daterangepicker/blob/master/CHANGELOG.md)
- [Live Demo](http://projects.skratchdot.com/react-bootstrap-daterangepicker/)
- [Original Plugin](https://github.com/dangrossman/bootstrap-daterangepicker)

## Other React Date Pickers

- [react-date-range](https://github.com/Adphorus/react-date-range)
- [react-dates](https://github.com/airbnb/react-dates)
- [react-datepicker](https://github.com/Hacker0x01/react-datepicker)

**NOTE: Please submit a PR if there are other date pickers you can recommend**

## License

Copyright (c) 2014 skratchdot  
Uses the original [bootstrap-daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker) license.
