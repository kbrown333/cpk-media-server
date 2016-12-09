import {inject} from 'aurelia-framework';
import {FnTs} from '../../../models/FnTs';
import {SessionData} from '../../../models/session';

@inject(FnTs, SessionData)
export class Slideshow {

	app_events: any;
	current_img: string = 'about:blank';
	master_list: any;
	picture_list: any;
	picture_index: number = 0;

	constructor (private fn: FnTs, private session: SessionData) {
		this.getPictureList()
			.then((data: any) => {
				this.master_list = data;
				this.picture_list = data;
				this.current_img = data[0];
			})
	}

	attached() {
		this.screenResize();
		this.app_events = this.fn.ea.subscribe('react', (event: any) => {
			if (this[event.event_name] != null) { this[event.event_name](event.data); }
		});
	}

	detached() {
		this.app_events.dispose();
	}

	getPictureList = (): Promise<any> => {
		return new Promise((res) => {
			var req = {
				url: '/pictures/pictures_list'
			}
			var callback = (list: any) => {
				res(list.data);
			}
			this.fn.fn_Ajax(req)
				.then(callback);
		});
	}

	prev = () => {
		if (this.picture_index > 0) {
			this.picture_index--;
			this.current_img = this.picture_list[this.picture_index];
		}
	}

	next = () => {
		if (this.picture_index < this.picture_list.length - 1) {
			this.picture_index++;
			this.current_img = this.picture_list[this.picture_index];
		}
	}

	selectImage = (index: number) => {
		this.picture_index = index;
		this.current_img = this.picture_list[this.picture_index];
	}

	//Event Aggregator Functions
	screenResize = (size: any = null): void => {
		var height, width;
		if (size == null) { height = $(window).height(); width = $(window).width(); }
		else { height = size.height; width = size.width; }
		var offset = width > 768 ? 150 : 190;
		height = height - offset;
		$('.panel-body[panel-type="pictures-panel"]').css('height', height + 'px');
		$('img', '.slide_column').css('max-height', (height - 50) + 'px');
		$('ul', '.slide_column').css('height', (height - 50) + 'px');
		$('img', '.slide_column ul').css('max-height', '70px');
	}

}
