import {inject, bindable, bindingMode} from 'aurelia-framework';
import {FnTs} from '../../../models/FnTs';
import {SessionData} from '../../../models/session';

@bindable({name: 'grid_data', defaultValue: [], defaultBindingMode: bindingMode.twoWay})
@inject(FnTs, SessionData)
export class MusicList {

	app_events: any;
	visibility: any = {
		main: {display: 'show', header: 'Select View'},
		songs: {display: 'hide', header: 'All Songs'},
		artists: {display: 'hide', header: 'Artists'},
		albums: {display: 'hide', header: 'Albums'},
		genres: {display: 'hide', header: 'Genres'},
		playlists: {display: 'hide', header: 'Playlists'},
		loaded_songs: {display: 'hide', header: 'Songs'},
	}
	view_header: string = 'Select View'
	grid_data: any;
	songs: any = [];
	artists: any = [];
	artist_index: any = {};
	albums: any = [];
	album_index: any = {};
	genres: any = [];
	genre_index: any = {};
	playlists: any = [];
	loaded_songs: any = [];

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

	grid_dataChanged(newVal: any, oldVal: any) {
		if (newVal != null) {
			this.loadBindableData(newVal);
		}
	}

	toggleSubList = (name: string) => {
		var keys = Object.keys(this.visibility);
		for (var i = 0; i < keys.length; i++) {
			this.visibility[keys[i]].display = 'hide';
		}
		this.visibility[name].display = 'show';
		this.view_header = this.visibility[name].header;
	}

	loadBindableData = (data: any) => {
		this.clearLists();
		this.clearIndexes();
		this.songs = data;
		for (var i = 0; i < data.length; i++) {
			this.loadByType(data[i], 'artist', 'artists', 'artist_index');
			this.loadByType(data[i], 'album', 'albums', 'album_index');
			this.loadByType(data[i], 'genre', 'genres', 'genre_index');
		}
		var test = this.albums;
	}

	clearLists = () => {
		this.artists = [{'name': 'Unknown', 'array': []}];
		this.albums =[{'name': 'Unknown', 'array': []}];
		this.genres = [{'name': 'Unknown', 'array': []}];
	}

	clearIndexes = () => {
		this.artist_index = {'unknown': 0, 'count': 1};
		this.album_index = {'unknown': 0, 'count': 1};
		this.genre_index = {'unknown': 0, 'count': 1};
	}

	loadByType = (data: any, oi: string, ti: string, ii: string) => {
		var index;
		if (data[oi] == null || data[oi].trim() == "") {
			index = 0;
		} else {
			var name = data[oi];
			if (this[ii][data[oi]] == null) {
				index = this[ii][data[oi]] = this[ii].count;
				this[ii].count++;
				this[ti].push({});
				this[ti][index]['array'] = [];
				this[ti][index]['name'] = name;
			} else {
				index = this[ii][data[oi]];
			}
		}
		this[ti][index]['array'].push(data);
	}

	//Event Aggregator Functions
	screenResize = (size: any = null): void => {

	}

}
