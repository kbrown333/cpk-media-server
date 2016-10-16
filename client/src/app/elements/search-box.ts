import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Utilities} from '../models/utilities';

@bindable({name: 'event', defaultValue: null})
@inject(Utilities)
export class SearchBox {
	
	event: string;
	search_key: string;

	constructor(private utils: Utilities) {

	}

	search = () => {
		if (this.event != null) {
			this.utils.fireEvent(this.event, this.search_key);
		}
	}

}