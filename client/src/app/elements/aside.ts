import {inject, bindable, bindingMode} from 'aurelia-framework';
import {SessionData} from '../models/session';
import {Utilities} from '../models/utilities';

@bindable({name: 'aside_links', defaultBindingMode: bindingMode.twoWay, defaultValue: {}})
@inject(SessionData, Utilities) 
export class Aside {

	aside_links: any;
	
	constructor(private session: SessionData, private utils: Utilities) {

	}

	attached() {
		$(".aside_link").click((event: JQueryEventObject) => {
			var event_path = $(".hdn_info", event.currentTarget).text().trim();
			this.utils.fireEvent(event_path);
		});
	}

}