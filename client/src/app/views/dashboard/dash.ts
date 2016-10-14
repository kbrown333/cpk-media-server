import {inject, bindable} from 'aurelia-framework';
import {Utilities} from '../../models/utilities';

@inject(Utilities)
export class Dash {

    toggle_visibility: any;

    constructor(private utils: Utilities) {
        this.toggle_visibility = {
            panel_body_1: 'show'
        }
    }

    attached(): void {
        this.utils.addEventListener('toggle_panel_1', 'dash.ts', (state: boolean) => {
            if (state) {
                this.toggle_visibility.panel_body_1 = 'show';
            } else {
                this.toggle_visibility.panel_body_1 = 'hide';
            }
        });
    }
}