import React, { useState, useRef } from 'react';
import jQuery from 'jquery';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import DateRangePicker from './index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

// expose jQuery to window for debugging
window.jQuery = window.$ = jQuery;

storiesOf('DateRangePicker', module)
  .addDecorator(withKnobs)
  .add('simple button', () => {
    const buttonLabel = text('label', 'click to open');
    return (
      <DateRangePicker>
        <button type="button" className="btn btn-primary">
          {buttonLabel}
        </button>
      </DateRangePicker>
    );
  })
  .add('simple input', () => {
    return (
      <DateRangePicker>
        <input type="text" className="form-control col-4" />
      </DateRangePicker>
    );
  })
  .add('with start and end date', () => {
    const startDate = text('startDate', '1/1/2017');
    const endDate = text('endDate', '1/5/2017');
    return (
      <DateRangePicker initialSettings={{ startDate, endDate }}>
        <input type="text" className="form-control col-4" />
      </DateRangePicker>
    );
  })
  .add('log events', () => {
    return (
      <DateRangePicker
        onApply={action('onApply')}
        onCancel={action('onCancel')}
        onHide={action('onHide')}
        onHideCalendar={action('onHideCalendar')}
        onShow={action('onShow')}
        onShowCalendar={action('onShowCalendar')}
        onEvent={action('onEvent')}
        onCallback={action('onCallback')}
      >
        <input type="text" className="form-control col-4" />
      </DateRangePicker>
    );
  })
  .add('date picker with dropdowns', () => {
    return (
      <DateRangePicker initialSettings={{ showDropdowns: true }}>
        <input type="text" className="form-control col-4" />
      </DateRangePicker>
    );
  })
  .add('single date picker', () => {
    return (
      <DateRangePicker
        initialSettings={{
          singleDatePicker: true,
          showDropdowns: true,
          startDate: '10/18/1984',
          minYear: 1901,
          maxYear: parseInt(moment().format('YYYY'), 10),
        }}
        onCallback={(start) => {
          const years = moment().diff(start, 'years');
          alert('You are ' + years + ' years old!');
        }}
      >
        <input type="text" className="form-control col-4" />
      </DateRangePicker>
    );
  })
  .add('date range picker with times', () => {
    return (
      <DateRangePicker
        initialSettings={{
          timePicker: true,
          startDate: moment().startOf('hour').toDate(),
          endDate: moment().startOf('hour').add(32, 'hour').toDate(),
          locale: {
            format: 'M/DD hh:mm A',
          },
        }}
      >
        <input type="text" className="form-control col-4" />
      </DateRangePicker>
    );
  })
  .add('predefined date ranges', () => {
    const [state, setState] = useState({
      start: moment().subtract(29, 'days'),
      end: moment(),
    });
    const { start, end } = state;
    const handleCallback = (start, end) => {
      setState({ start, end });
    };
    const label =
      start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
    return (
      <DateRangePicker
        initialSettings={{
          startDate: start.toDate(),
          endDate: end.toDate(),
          ranges: {
            Today: [moment().toDate(), moment().toDate()],
            Yesterday: [
              moment().subtract(1, 'days').toDate(),
              moment().subtract(1, 'days').toDate(),
            ],
            'Last 7 Days': [
              moment().subtract(6, 'days').toDate(),
              moment().toDate(),
            ],
            'Last 30 Days': [
              moment().subtract(29, 'days').toDate(),
              moment().toDate(),
            ],
            'This Month': [
              moment().startOf('month').toDate(),
              moment().endOf('month').toDate(),
            ],
            'Last Month': [
              moment().subtract(1, 'month').startOf('month').toDate(),
              moment().subtract(1, 'month').endOf('month').toDate(),
            ],
          },
        }}
        onCallback={handleCallback}
      >
        <div
          id="reportrange"
          className="col-4"
          style={{
            background: '#fff',
            cursor: 'pointer',
            padding: '5px 10px',
            border: '1px solid #ccc',
            width: '100%',
          }}
        >
          <i className="fa fa-calendar"></i>&nbsp;
          <span>{label}</span> <i className="fa fa-caret-down"></i>
        </div>
      </DateRangePicker>
    );
  })
  .add('input initially empty', () => {
    const handleApply = (event, picker) => {
      picker.element.val(
        picker.startDate.format('MM/DD/YYYY') +
          ' - ' +
          picker.endDate.format('MM/DD/YYYY')
      );
    };
    const handleCancel = (event, picker) => {
      picker.element.val('');
    };
    return (
      <DateRangePicker
        initialSettings={{
          autoUpdateInput: false,
          locale: {
            cancelLabel: 'Clear',
          },
        }}
        onApply={handleApply}
        onCancel={handleCancel}
      >
        <input type="text" className="form-control col-4" defaultValue="" />
      </DateRangePicker>
    );
  })
  .add('set start date from "outside" the component', () => {
    const myRef = useRef();
    const changeStartDate = () => {
      myRef.current.setStartDate(moment().subtract(1, 'week'));
    };
    return (
      <div>
        <DateRangePicker ref={myRef}>
          <input type="text" className="form-control col-4" />
        </DateRangePicker>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={changeStartDate}
        >
          set startDate to 1 week ago
        </button>
      </div>
    );
  })
  .add('use onCallback to display start/end dates', () => {
    const [state, setState] = useState();
    const handleCallback = (start, end) => {
      setState({ start, end });
    };
    return (
      <>
        <DateRangePicker onCallback={handleCallback}>
          <input type="text" className="form-control col-4" />
        </DateRangePicker>
        <br />
        <h4>
          startDate: <small>{state?.start?.format('MM/DD/YYYY (dddd)')}</small>
        </h4>
        <h4>
          endDate: <small>{state?.end?.format('MM/DD/YYYY (dddd)')}</small>
        </h4>
      </>
    );
  })
  .add('change initialSettings (range data)', () => {
    const StoryComp = () => {
      const changeButtonLabel = text(
        'change button label',
        'change range label'
      );
      const keyRef = useRef(Date.now());
      const [dates, setDates] = useState({
        startDate: moment('2020/03/01'),
        endDate: moment('2020/03/15'),
      });
      const [ranges, setRanges] = useState({
        ['First Range']: [
          moment().subtract(2, 'days'),
          moment().add(2, 'days'),
        ],
      });
      const handleApply = (event, picker) => {
        setDates({
          startDate: picker.startDate,
          endDate: picker.endDate,
        });
      };
      const randomNumber = () => Math.floor(Math.random() * 20) + 1;
      const handleChangeRanges = () => {
        keyRef.current = Date.now();
        setRanges({
          [`Range ${Date.now()}`]: [
            moment().subtract(randomNumber(), 'days').startOf('day'),
            moment().add(randomNumber(), 'days').startOf('day'),
          ],
        });
      };
      return (
        <div>
          <DateRangePicker
            key={keyRef.current}
            onApply={handleApply}
            onCancel={action('onCancel')}
            onEvent={action('onEvent')}
            onHide={action('onHide')}
            onHideCalendar={action('onHideCalendar')}
            onShow={action('onShow')}
            onShowCalendar={action('onShowCalendar')}
            initialSettings={{ ranges }}
          >
            <input type="text" className="form-control col-4" />
          </DateRangePicker>
          <br />
          <h4>
            startDate: <small>{dates.startDate.format()}</small>
          </h4>
          <h4>
            endDate: <small>{dates.endDate.format()}</small>
          </h4>
          <h4>
            ranges: <small>{JSON.stringify(ranges)}</small>
          </h4>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleChangeRanges}
          >
            {changeButtonLabel}
          </button>
        </div>
      );
    };
    return (
      <div>
        <StoryComp />
      </div>
    );
  });
