import {inject} from 'aurelia-framework';
import {FnTs} from '../../models/FnTs';
import {SessionData} from '../../models/session';

@inject(FnTs, SessionData)
export class Music {

	app_events: any;
	aside_links: any = [];
	dir = {
		music: {'_files_': []},
	};

	constructor(private fn: FnTs, private session: SessionData) {

	}

	attached() {
		this.app_events = this.fn.ea.subscribe('react', (event: any) => {
			if (this[event.event_name] != null) { this[event.event_name](event.data); }
		});
	}

	detached() {
		this.app_events.dispose();
	}

	//Event Aggregator Functions
	screenResize = (size: any = null): void => {

	}

}
