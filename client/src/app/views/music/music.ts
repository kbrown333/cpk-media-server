import {inject} from 'aurelia-framework';
import {FnTs} from '../../models/FnTs';

@inject(FnTs)
export class Music {

	constructor(private fn: FnTs) {
		
	}

}
