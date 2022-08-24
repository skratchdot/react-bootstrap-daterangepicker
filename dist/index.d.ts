/// <reference types="jquery" />
/// <reference types="daterangepicker" />
/// <reference types="jquery" />
import * as React from 'react';
import 'bootstrap-daterangepicker';
export interface EventHandler {
    (event: JQuery.Event, picker: daterangepicker): any;
}
export interface CallbackHandler {
    (start?: daterangepicker.DateOrString, end?: daterangepicker.DateOrString, label?: string): any;
}
export interface Props {
    initialSettings?: daterangepicker.Options;
    onApply?: EventHandler;
    onCancel?: EventHandler;
    onHide?: EventHandler;
    onHideCalendar?: EventHandler;
    onShow?: EventHandler;
    onShowCalendar?: EventHandler;
    onEvent?: EventHandler;
    onCallback?: CallbackHandler;
}
export declare class DateRangePicker extends React.Component<React.PropsWithChildren<Props>> {
    ref: any;
    $picker: JQuery | null;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleCallback(...args: any): void;
    makeEventHandler(eventType: string): (event: JQuery.Event, picker: daterangepicker) => void;
    setStartDate(dateOrString: daterangepicker.DateOrString): void;
    setEndDate(dateOrString: daterangepicker.DateOrString): void;
    render(): React.FunctionComponentElement<{
        ref: (el: any) => any;
    }>;
}
export default DateRangePicker;
//# sourceMappingURL=index.d.ts.map