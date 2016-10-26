import {inject, bindable, bindingMode} from 'aurelia-framework';
import {SessionData} from '../models/session';

@bindable({name: 'aside_links', defaultBindingMode: bindingMode.twoWay, defaultValue: {}})
@inject(SessionData)
export class Aside {

	aside_links: any;

	constructor(private session: SessionData) {

	}

	attached() {

	}

}
