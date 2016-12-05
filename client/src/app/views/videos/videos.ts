import {inject} from 'aurelia-framework';
import {FnTs} from '../../models/FnTs';
import {SessionData} from '../../models/session';

@inject(FnTs, SessionData)
export class Videos {

	app_events: any;
	aside_links: any = [
        {name: 'Video Files', event: 'toggleVideoScreens', data: 'panel'},
	    {name: 'Video Player', event: 'toggleVideoScreens', data: 'player'}
	];
	videos: any = [];
	now_playing: string = '';
	visibility: any = {
		panel: 'show',
		player: 'hide'
	};
	dir = {
		videos: {'_files_': []},
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

	changeVideo = (link: string) => {
		var player = <HTMLVideoElement>document.getElementById('vid_player');
		var video = <HTMLVideoElement>document.getElementById('vid_src');
		document.getElementById('vid_player').addEventListener('ended', () => {
			this.next();
		}, false)
		player.pause();
		video.src = link;
		player.load();
		player.play();
	}

	changeNowPlaying = (link: string) => {
		var data = link.split('/');
		this.now_playing = data[data.length - 1];
	}

	loadDirectionButtonEvents = (data: any) => {
		var index = data.all_files.indexOf(data.original);
		if (index == -1) {
			this.prev = () => {}
			this.next = () => {}
		} else if (index == 0) {
			this.prev = () => {}
			this.next = () => {
				var new_data = this.generateLoadRequest(data, data.all_files[index + 1]);
				this.loadVideoFile(new_data, true);
			}
		} else if (index == data.all_files.length - 1) {
			this.prev = () => {
				var new_data = this.generateLoadRequest(data, data.all_files[index - 1]);
				this.loadVideoFile(new_data, true);
			}
			this.next = () => {}
		} else {
			this.prev = () => {
				var new_data = this.generateLoadRequest(data, data.all_files[index - 1]);
				this.loadVideoFile(new_data, true);
			}
			this.next = () => {
				var new_data = this.generateLoadRequest(data, data.all_files[index + 1]);
				this.loadVideoFile(new_data, true);
			}
		}
	}

	generateLoadRequest = (data: any, file: string) => {
		return {
			selected: data.path + file,
			all_files: data.all_files,
			path: data.path,
			original: file
		}
	}

	next = () => {}
	prev = () => {}

	togglePanel = () => {
		if (this.visibility.panel == 'show') {
			this.visibility.panel = 'hide';
			this.visibility.player = 'show';
		} else {
			this.visibility.panel = 'show';
			this.visibility.player = 'hide';
		}
	}

	//Event Aggregator Functions
	screenResize = (size: any = null): void => {

	}

	toggleVideoScreens = (screen: string) => {
		if (this.visibility[screen] != 'show') {
			this.togglePanel();
		}
		this.fn.ea.publish('react', {event_name: 'toggle_aside'});
	}

	loadVideoFile = (data: any, override: boolean = false) => {
		var link = '/content' + data.selected;
		this.changeVideo(link);
		this.changeNowPlaying(link);
		this.loadDirectionButtonEvents(data);
		if (!override) this.togglePanel();
	}

}
