import React from 'react';
import { mount } from 'enzyme';
import DateRangePicker from './index.js';
import lolex from 'lolex';
import moment from 'moment';
import $ from 'jquery';

beforeEach(() => {
  lolex.install({ now: new Date('2018/01/15 09:15:30') });
  document.body.innerHTML = '';
});

test('simple picker with 1 child', async () => {
  const wrapper = mount(
    <DateRangePicker>
      <button>click me</button>
    </DateRangePicker>
  );
  expect(wrapper.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('simple picker with text child is wrapped in div', async () => {
  const wrapper = mount(<DateRangePicker>clickme</DateRangePicker>);
  expect(wrapper.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('simple picker with multiple children is wrapped in div', async () => {
  const wrapper = mount(
    <DateRangePicker>
      <div>clickme</div>
      <div>clickme2</div>
    </DateRangePicker>
  );
  expect(wrapper.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('show picker with onShow handler', async () => {
  const onShow = jest.fn();
  const wrapper = mount(
    <DateRangePicker onShow={onShow}>
      <button>click me</button>
    </DateRangePicker>
  );
  const afterRender = document.body.innerHTML;
  expect(onShow).not.toHaveBeenCalled();
  wrapper.instance().$picker.click();
  expect(onShow).toHaveBeenCalled();
  const afterShow = document.body.innerHTML;
  expect(afterShow).not.toEqual(afterRender);
  expect(document.body).toMatchSnapshot();
});

test('picker with all event handlers', async () => {
  const onShow = jest.fn();
  const onHide = jest.fn();
  const onShowCalendar = jest.fn();
  const onHideCalendar = jest.fn();
  const onApply = jest.fn();
  const onCancel = jest.fn();
  const onEvent = jest.fn();
  const wrapper = mount(
    <DateRangePicker
      onShow={onShow}
      onHide={onHide}
      onShowCalendar={onShowCalendar}
      onHideCalendar={onHideCalendar}
      onApply={onApply}
      onCancel={onCancel}
      onEvent={onEvent}
    >
      <button>click me</button>
    </DateRangePicker>
  );

  // after render no events called
  expect(onShow).toHaveBeenCalledTimes(0);
  expect(onHide).toHaveBeenCalledTimes(0);
  expect(onShowCalendar).toHaveBeenCalledTimes(0);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(0);
  expect(onEvent).toHaveBeenCalledTimes(0);

  // open picker
  wrapper.instance().$picker.click();
  expect(onShow).toHaveBeenCalledTimes(1);
  expect(onHide).toHaveBeenCalledTimes(0);
  expect(onShowCalendar).toHaveBeenCalledTimes(0);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(0);
  expect(onEvent).toHaveBeenCalledTimes(1);

  // click 2 dates
  $(document.body)
    .find('.calendar.left [data-title="r2c3"]')
    .mousedown();
  $(document.body)
    .find('.calendar.right [data-title="r2c3"]')
    .mousedown();

  // cancel picker
  $(document.body)
    .find('.cancelBtn')
    .click();
  expect(onShow).toHaveBeenCalledTimes(1);
  expect(onHide).toHaveBeenCalledTimes(1);
  expect(onShowCalendar).toHaveBeenCalledTimes(0);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onEvent).toHaveBeenCalledTimes(3);

  // open picker again
  wrapper.instance().$picker.click();
  expect(onShow).toHaveBeenCalledTimes(2);
  expect(onHide).toHaveBeenCalledTimes(1);
  expect(onShowCalendar).toHaveBeenCalledTimes(0);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onEvent).toHaveBeenCalledTimes(4);
  const d1 = '2018-01-15T05:00:00.000Z';
  const d2 = '2018-01-16T04:59:59.999Z';
  expect(onCancel.mock.calls[0][1].oldStartDate.toISOString()).toEqual(d1);
  expect(onCancel.mock.calls[0][1].startDate.toISOString()).toEqual(d1);
  expect(onCancel.mock.calls[0][1].oldEndDate.toISOString()).toEqual(d2);
  expect(onCancel.mock.calls[0][1].endDate.toISOString()).toEqual(d2);

  // click 2 dates
  $(document.body)
    .find('.calendar.left [data-title="r2c3"]')
    .mousedown();
  $(document.body)
    .find('.calendar.right [data-title="r2c3"]')
    .mousedown();

  // apply picker
  $(document.body)
    .find('.applyBtn')
    .click();
  expect(onShow).toHaveBeenCalledTimes(2);
  expect(onHide).toHaveBeenCalledTimes(2);
  expect(onShowCalendar).toHaveBeenCalledTimes(0);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(1);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onEvent).toHaveBeenCalledTimes(6);
  const d3 = '2018-01-17T05:00:00.000Z';
  const d4 = '2018-02-15T04:59:59.000Z';
  expect(onCancel.mock.calls[0][1].oldStartDate.toISOString()).toEqual(d1);
  expect(onCancel.mock.calls[0][1].startDate.toISOString()).toEqual(d3);
  expect(onCancel.mock.calls[0][1].oldEndDate.toISOString()).toEqual(d2);
  expect(onCancel.mock.calls[0][1].endDate.toISOString()).toEqual(d4);
});

test('change startDate after opening', async () => {
  const startDate = moment('2018-02-15T09:00:00.000Z');
  expect($('td.active').length).toEqual(0);
  const wrapper = mount(
    <DateRangePicker startDate={startDate} singleDatePicker>
      <button>click me</button>
    </DateRangePicker>
  );

  // open and close
  wrapper.instance().$picker.click();
  expect($('td.active').length).toEqual(1);
  expect($('td.active').text()).toEqual('15');
  wrapper.instance().$picker.click();

  // change startDate
  wrapper.setProps({ startDate: moment('2018-10-25T09:00:00.000Z') });
  // open and close
  wrapper.instance().$picker.click();
  expect($('td.active').length).toEqual(1);
  expect($('td.active').text()).toEqual('25');
  wrapper.instance().$picker.click();
});

test('daterangepicker is destroyed during componentWillUnmount()', async () => {
  expect($('.daterangepicker').length).toEqual(0);
  const wrapper = mount(
    <DateRangePicker>
      <button>click me</button>
    </DateRangePicker>
  );
  expect($('.daterangepicker').length).toEqual(1);
  wrapper.unmount();
  expect($('.daterangepicker').length).toEqual(0);
});

test('unmount when internal ref is gone', async () => {
  expect($('.daterangepicker').length).toEqual(0);
  const wrapper = mount(
    <DateRangePicker>
      <button>click me</button>
    </DateRangePicker>
  );
  expect($('.daterangepicker').length).toEqual(1);
  const inst = wrapper.instance();
  inst.$picker = null;
  wrapper.unmount();
  expect($('.daterangepicker').length).toEqual(1);
});

test('set some props after initial render. locale is overwritten.', async () => {
  const propsAfterRender = {
    startDate: moment('2018-10-25T09:00:00.000Z'),
    endDate: moment('2018-11-02T08:09:10.000Z'),
    locale: {
      format: 'YYYY-MM-DD'
    },
    showDropdowns: true
  };
  const wrapper = mount(
    <DateRangePicker locale={{ applyLabel: 'Apply' }}>
      <button>click me</button>
    </DateRangePicker>
  );
  expect(wrapper.props()).toMatchSnapshot();
  wrapper.setProps(propsAfterRender);
  expect(wrapper.props()).toMatchSnapshot();
});
