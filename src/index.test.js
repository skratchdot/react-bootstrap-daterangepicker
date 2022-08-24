import * as React from 'react';

import $ from 'jquery';
import DateRangePicker from './index';
import lolex from 'lolex';
import moment from 'moment';
import { mount } from 'enzyme';

beforeEach(() => {
  lolex.install({ now: new Date('2018/01/15 09:15:30') });
  document.body.innerHTML = '';
});

test.skip('simple picker with 1 child', async () => {
  const wrapper = mount(
    <DateRangePicker>
      <button>click me</button>
    </DateRangePicker>
  );
  expect(wrapper.html()).toMatchSnapshot();
  expect(document.body).toMatchSnapshot();
});

test('you cannot pass text as a child', async () => {
  expect(() => {
    mount(<DateRangePicker>clickme</DateRangePicker>);
  }).toThrow();
});

test('you cannot pass multiple children to the', async () => {
  expect(() => {
    mount(
      <DateRangePicker>
        <div>clickme</div>
        <div>clickme2</div>
      </DateRangePicker>
    );
  }).toThrow();
});

test.skip('show picker with onShow handler', async () => {
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

test.skip('picker with all event handlers', async () => {
  const onShow = jest.fn();
  const onHide = jest.fn();
  const onShowCalendar = jest.fn();
  const onHideCalendar = jest.fn();
  const onApply = jest.fn();
  const onCancel = jest.fn();
  const onEvent = jest.fn();
  const onCallback = jest.fn();
  const wrapper = mount(
    <DateRangePicker
      onShow={onShow}
      onHide={onHide}
      onShowCalendar={onShowCalendar}
      onHideCalendar={onHideCalendar}
      onApply={onApply}
      onCancel={onCancel}
      onEvent={onEvent}
      onCallback={onCallback}
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
  expect(onCallback).toHaveBeenCalledTimes(0);

  // open picker
  wrapper.instance().$picker.click();
  expect(onShow).toHaveBeenCalledTimes(1);
  expect(onHide).toHaveBeenCalledTimes(0);
  expect(onShowCalendar).toHaveBeenCalledTimes(1);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(0);
  expect(onEvent).toHaveBeenCalledTimes(2);
  expect(onCallback).toHaveBeenCalledTimes(0);

  // click 2 dates
  $(document.body).find('.drp-calendar.left [data-title="r2c3"]').mousedown();
  $(document.body).find('.drp-calendar.right [data-title="r2c3"]').mousedown();

  // cancel picker
  $(document.body).find('.cancelBtn').click();
  expect(onShow).toHaveBeenCalledTimes(1);
  expect(onHide).toHaveBeenCalledTimes(1);
  expect(onShowCalendar).toHaveBeenCalledTimes(2);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onEvent).toHaveBeenCalledTimes(5);
  expect(onCallback).toHaveBeenCalledTimes(0);

  // open picker again
  wrapper.instance().$picker.click();
  expect(onShow).toHaveBeenCalledTimes(2);
  expect(onHide).toHaveBeenCalledTimes(1);
  expect(onShowCalendar).toHaveBeenCalledTimes(3);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onEvent).toHaveBeenCalledTimes(7);
  expect(onCallback).toHaveBeenCalledTimes(0);
  const d1 = '2018-01-15T05:00:00.000Z';
  const d2 = '2018-01-16T04:59:59.999Z';
  expect(onCancel.mock.calls[0][1].oldStartDate.toISOString()).toEqual(d1);
  expect(onCancel.mock.calls[0][1].startDate.toISOString()).toEqual(d1);
  expect(onCancel.mock.calls[0][1].oldEndDate.toISOString()).toEqual(d2);
  expect(onCancel.mock.calls[0][1].endDate.toISOString()).toEqual(d2);

  // click 2 dates
  $(document.body).find('.drp-calendar.left [data-title="r2c3"]').mousedown();
  $(document.body).find('.drp-calendar.right [data-title="r2c3"]').mousedown();

  // apply picker
  $(document.body).find('.applyBtn').click();
  expect(onShow).toHaveBeenCalledTimes(2);
  expect(onHide).toHaveBeenCalledTimes(2);
  expect(onShowCalendar).toHaveBeenCalledTimes(4);
  expect(onHideCalendar).toHaveBeenCalledTimes(0);
  expect(onApply).toHaveBeenCalledTimes(1);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onEvent).toHaveBeenCalledTimes(10);
  expect(onCallback).toHaveBeenCalledTimes(1);
  const d3 = '2018-01-17T05:00:00.000Z';
  const d4 = '2018-02-15T04:59:59.999Z';
  expect(onCancel.mock.calls[0][1].oldStartDate.toISOString()).toEqual(d1);
  expect(onCancel.mock.calls[0][1].startDate.toISOString()).toEqual(d3);
  expect(onCancel.mock.calls[0][1].oldEndDate.toISOString()).toEqual(d2);
  expect(onCancel.mock.calls[0][1].endDate.toISOString()).toEqual(d4);
});

test.skip('change startDate after opening', async () => {
  const startDate = moment('2018-02-15T09:00:00.000Z');
  expect($('td.active').length).toEqual(0);
  const myRef = React.createRef();
  const wrapper = mount(
    <DateRangePicker
      ref={myRef}
      initialSettings={{ startDate, singleDatePicker: true }}
    >
      <button>click me</button>
    </DateRangePicker>
  );

  // open and close
  wrapper.instance().$picker.click();
  expect($('td.active').length).toEqual(1);
  expect($('td.active').text()).toEqual('15');
  wrapper.instance().$picker.click();

  // change startDate
  console.log(wrapper.instance());
  //wrapper.instance().$picker.setStartDate(moment('2018-10-25T09:00:00.000Z'));
  // open and close
  wrapper.instance().$picker.click();
  expect($('td.active').length).toEqual(1);
  expect($('td.active').text()).toEqual('25');
  wrapper.instance().$picker.click();
});

test.skip('daterangepicker is destroyed during componentWillUnmount()', async () => {
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

test.skip('unmount when internal ref is gone', async () => {
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
