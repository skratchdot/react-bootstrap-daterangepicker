import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateRangePicker from '../lib/index.js';
import 'bootstrap/dist/css/bootstrap.css';

storiesOf('DateRangePicker', module)
  .add('simple', () => <DateRangePicker>click to open</DateRangePicker>)
  .add('with start and end date', () => <DateRangePicker startDate="1/1/2017" endDate="1/5/2017">click to open</DateRangePicker>)
