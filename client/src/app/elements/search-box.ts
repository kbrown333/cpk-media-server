import {inject, bindable, bindingMode} from 'aurelia-framework';
import {FnTs} from '../models/FnTs';

@bindable({name: 'event', defaultValue: null})
@inject(FnTs)
export class SearchBox {

	event: string;
	search_key: string;

	constructor(private fn: FnTs) {

	}

	search = () => {
		if (this.event != null) {
			this.fn.ea.publish('react', {
				event_name: this.event,
				data: this.search_key
			});
		}
	}

}
