import {inject} from 'aurelia-framework';
import {FnTs} from '../../../models/FnTs';
import {SessionData} from '../../../models/session';

@inject(FnTs, SessionData)
export class MusicPlayer {

	app_events: any;
	now_playing: string = '[None Selected]';

	constructor (private fn: FnTs, private session: SessionData) {

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

	//Event Aggregator Functions
	screenResize(size: any = null): void {
		var height, width;
		if (size == null) { height = $(window).height(); width = $(window).width(); }
		else { height = size.height; width = size.width; }
		var offset = width > 768 ? 150 : 190;
		height = height - offset;
		if (width > 991) $('.panel-body[panel-type="music-panel"]').css('height', height + 'px');
		else $('.panel-body[panel-type="music-panel"]').css('height', '100px');
	}

	loadMusicFile = (data: any) => {
		var test = data;
	}

}
