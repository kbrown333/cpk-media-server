import {inject, bindable} from 'aurelia-framework';
import {Utilities} from '../../models/utilities';
import {SessionData} from '../../models/session';

@inject(Utilities, SessionData)
export class Dash {

    toggle_visibility: any;
    aside_links: any = [
        {name: 'Test Link', event: 'test_link'}
    ];

    constructor(private utils: Utilities, private session: SessionData) {
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
        this.utils.addEventListener('test_link', 'dash.ts', () => {
            alert('Testing Link');
        });
    }

    detached(): void {
        this.utils.dropEventListener('toggle_panel_1', 'dash.ts');
        this.utils.dropEventListener('test_link', 'dash.ts');
    }
}