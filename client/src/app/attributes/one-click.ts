import {bindable, bindingMode, inject} from 'aurelia-framework';
import {FnTs} from '../models/FnTs';

@inject(Element, FnTs)
export class OneClickCustomAttribute {

    @bindable event: string;
    @bindable data: any;

    constructor(private element: Element, private fn: FnTs) {
        $(element).click((event: JQueryEventObject) => {
            this.fn.ea.publish('react', {event_name: this.event, data: this.data });
        });
    }

    eventChanged(newValue: string, oldValue: string) {
        var x = 1;
    }

    dataChanged(newValue: string, oldValue: string) {
        var x = 1;
    }
}
