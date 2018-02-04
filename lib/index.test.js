import React from 'react';
import { mount } from 'enzyme';
import DateRangePicker from './index.js';

const delay = async (ms) => new Promise(r => setTimeout(r, ms));

test('DateRangePicker - simple', async () => {
  // Render a checkbox with label in the document
  const picker = mount(<DateRangePicker>click me</DateRangePicker>);
  expect(picker.html()).toMatchSnapshot();
  //await delay(100);
  expect(document.body).toMatchSnapshot();
});
