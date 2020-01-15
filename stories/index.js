import React from 'react';
import jQuery from 'jquery';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import DateRangePicker from '../src/index.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

// expose jQuery to window for debugging
window.jQuery = window.$ = jQuery;

storiesOf('DateRangePicker', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .addDecorator(story => <div style={{ margin: 40 }}>{story()}</div>)
  .addDecorator(withKnobs)
  .add('simple', () => {
    const buttonLabel = text('label', 'click to open');
    return (
      <DateRangePicker>
        <button>{buttonLabel}</button>
      </DateRangePicker>
    );
  })
  .add('with start and end date', () => {
    const buttonLabel = text('label', 'click to open');
    const startDate = text('startDate', '1/1/2017');
    const endDate = text('endDate', '1/5/2017');
    return (
      <DateRangePicker startDate={startDate} endDate={endDate}>
        <button>{buttonLabel}</button>
      </DateRangePicker>
    );
  })
  .add('with start date as moment() and end date as string', () => {
    const buttonLabel = text('label', 'click to open');
    const startDate = text('startDate', '1/1/2017');
    const endDate = text('endDate', '1/5/2017');
    return (
      <DateRangePicker startDate={moment(startDate)} endDate={endDate}>
        <button>{buttonLabel}</button>
      </DateRangePicker>
    );
  })
  .add('log events', () => {
    const buttonLabel = text('label', 'click to open');
    return (
      <DateRangePicker
        onApply={action('onApply')}
        onCancel={action('onCancel')}
        onEvent={action('onEvent')}
        onHide={action('onHide')}
        onHideCalendar={action('onHideCalendar')}
        onShow={action('onShow')}
        onShowCalendar={action('onShowCalendar')}
      >
        <button>{buttonLabel}</button>
      </DateRangePicker>
    );
  })
  .add('showDropdowns', () => {
    const buttonLabel = text('label', 'click to open');
    const showDropdowns = boolean('showDropdowns', true);
    return (
      <DateRangePicker showDropdowns={showDropdowns}>
        <button>{buttonLabel}</button>
      </DateRangePicker>
    );
  })
  .add('singleDatePicker', () => {
    const buttonLabel = text('label', 'click to open');
    const singleDatePicker = boolean('singleDatePicker', true);
    return (
      <DateRangePicker singleDatePicker={singleDatePicker}>
        <button>{buttonLabel}</button>
      </DateRangePicker>
    );
  })
  .add('PropsUpdate', () => {
    class StoryComp extends React.Component {
      constructor( props ){
        super(props);
        this.state = {
          ranges: {
            'ics': [moment('2020-01-02T10:14:33Z'), moment('2020-30-02T10:14:33Z')]
          },
        }

        this.onValueChange = this.onValueChange.bind(this);
      }
      onValueChange () {
        setTimeout( () => {
          this.setState({
            ranges: {
              'Electronics': [moment('2020-01-02T10:14:33Z'), moment('2020-30-02T10:14:33Z')]
            }
          })
        }, 1000);
      }
      render () {
        const buttonLabel = text('label', 'click to open');
        return ( 
          <div>
            <DateRangePicker
              onApply={action('onApply')}
              onCancel={action('onCancel')}
              onEvent={action('onEvent')}
              onHide={action('onHide')}
              onHideCalendar={action('onHideCalendar')}
              onShow={action('onShow')}
              onShowCalendar={action('onShowCalendar')}
              ranges={this.state.ranges}
            >
              <button>{buttonLabel}</button>
            </DateRangePicker>
            <button onClick={this.onValueChange}>Change State</button>
          </div>
        );
      }
    }
    return <StoryComp />
  });
