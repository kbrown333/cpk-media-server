import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Utilities} from '../models/utilities';

@bindable({ name: 'state', defaultValue: 'on' })
@bindable({ name: 'event', defaultValue: null })
@inject(Utilities)
export class FaToggle {

    state: string;
    event: string;
    toggle_on: string;
    toggle_off: string;

    constructor(private utils: Utilities) {
        this.toggle_on = 'show';
        this.toggle_off = 'hide';
    }

    attached(): void {
        if (this.state != 'on') {
            this.toggle_on = 'hide';
        }
    }

    toggle = () => {
        if (this.state == 'on') {
            this.toggle_on = 'hide';
            this.toggle_off = 'show';
            this.state = 'off';
        } else {
            this.toggle_on = 'show';
            this.toggle_off = 'hide';
            this.state = 'on';
        }
        if (this.event != null) {
            var status = this.state == 'on';
            this.utils.fireEvent(this.event, status);
        }
    }
}