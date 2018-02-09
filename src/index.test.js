import React from 'react';
import { mount } from 'enzyme';
import DateRangePicker from './index.js';
import lolex from 'lolex';

let clock;

beforeEach(() => {
  clock = lolex.install({ now: new Date('2018/01/15 09:15:30') });
});

test('simple picker with 1 child', async () => {
  const picker = mount(
    <DateRangePicker>
      <button>click me</button>
    </DateRangePicker>
  );
  expect(picker.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('simple picker with text child is wrapped in div', async () => {
  const picker = mount(<DateRangePicker>clickme</DateRangePicker>);
  expect(picker.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('simple picker with multiple children is wrapped in div', async () => {
  const picker = mount(
    <DateRangePicker>
      <div>clickme</div>
      <div>clickme2</div>
    </DateRangePicker>
  );
  expect(picker.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('show picker', async () => {
  const onShow = jest.fn();
  const picker = mount(
    <DateRangePicker onShow={onShow}>
      <button>click me</button>
    </DateRangePicker>
  );
  const afterRender = document.body.innerHTML;
  expect(onShow).not.toHaveBeenCalled();
  picker.ref('picker').click();
  expect(onShow).toHaveBeenCalled();
  const afterShow = document.body.innerHTML;
  expect(afterShow).not.toEqual(afterRender);
  expect(document.body).toMatchSnapshot();
});
