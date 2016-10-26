import {inject, bindable} from 'aurelia-framework';
import {FnTs} from '../../models/FnTs';

@inject(FnTs)
export class Dash {

    app_events: any;
    toggle_visibility: any = {
        dash_panel: 'show'
    }
    aside_links: any = [
        {name: 'Test Link', event: 'testLink', data: 'Test Link.'}
    ];

    constructor(private fn: FnTs) {  }

    attached(): void {
        this.app_events = this.fn.ea.subscribe('react', (event: any) => {
            if (this[event.event_name] != null) { this[event.event_name](event.data); }
        });
    }

    detached() {
        this.app_events.dispose();
    }

    //event-aggregator handlers
    toggleDashPanel(state: boolean): void {
        if (state) {
            this.toggle_visibility.dash_panel = 'show';
        } else {
            this.toggle_visibility.dash_panel = 'hide';
        }
    }

    testLink(msg: string) {
        alert(msg);
    }
}
