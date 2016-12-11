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
		open_playlist: {display: 'hide', header: ''},
		loaded_songs: {display: 'hide', header: 'Songs'},
	};
	nav: any = {index: 0, list: null, playlist: false};
	view_header: string = 'Select View';
	grid_data: any;
	master_list: any = [];
	artists: any = [];
	artist_index: any = {};
	albums: any = [];
	album_index: any = {};
	genres: any = [];
	genre_index: any = {};
	playlists: any = [];
	loaded_playlist: any = [];
	loaded_songs: any = [];

	constructor(private fn: FnTs, private session: SessionData) {
		this.fn.fn_Ajax({ url: '/music/playlists' })
			.then((data) => { this.playlists = data; });
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
			this.master_list = newVal;
			this.loadBindableData(newVal);
		}
	}

	clickSubList = (name: string) => {
		this.nav.list = name;
		this.nav.index = 1;
		this.toggleSubList(name);
		if (name == 'songs') { this.loaded_songs = this.master_list; }
	}

	toggleSubList = (name: string) => {
		if (name != null) {
			var keys = Object.keys(this.visibility);
			for (var i = 0; i < keys.length; i++) {
				this.visibility[keys[i]].display = 'hide';
			}
			this.visibility[name].display = 'show';
			this.view_header = this.visibility[name].header;
		}
	}

	clickBack = () => {
		switch(this.nav.index) {
			case 1: {
				this.toggleSubList('main');
				this.nav.index--;
				break;
			}
			case 2: {
				this.toggleSubList(this.nav.list);
				this.nav.index--;
				break;
			}
		}
	}

	clickForward = () => {
		switch(this.nav.index) {
			case 0: {
				if (this.nav.list != null) {
					this.nav.index++;
					this.toggleSubList(this.nav.list);
				}
				break;
			}
			case 1: {
				if (this.nav.playlist) {
					this.toggleSubList('open_playlist');
				} else {
					this.toggleSubList('loaded_songs');
				}
				this.nav.index++;
				break;
			}
		}
	}

	loadBindableData = (data: any) => {
		this.clearLists();
		this.clearIndexes();
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

	loadSubGroup = (item: any, index: number) => {
		this.nav.playlist = false;
		this.nav.index = 2;
		this.loaded_songs = item.array;
		this.toggleSubList('loaded_songs');
	}

	sendListToPlayer = (item: any) => {
		var path = item.path.replace('content/tracks', '/music');
		var split = path.lastIndexOf('/') + 1;
		var current = path.substring(0, split);
		var file = path.substring(split);
		var all_files = this.loaded_songs.map((val) => {
			return val.path;
		})
		var data = {
			selected: path,
			path: current,
			original: file,
			all_files: all_files
		};
		this.fn.ea.publish('react', {event_name: 'loadPlayerFromList', data: data});
	}

	clickAddPlaylist = () => {
		this.fn.ea.publish('react', {
			event_name: 'showModal',
			data: {
				modal: 'add_playlist',
				content: {
					title: 'Add Playlist',
					name: ''
				}
			}
		});
	}

	addPlaylist = (name: any) => {
		var req = {
			url: '/music/playlists',
			type: 'POST',
			data: {playlist: name}
		}
		this.fn.fn_Ajax(req)
			.then((data) => {
				this.playlists.push({name: name, tracks: []})
			});
	}

	selectPlaylist = (index: number) => {
		this.loaded_playlist = this.playlists[index].tracks;
		this.visibility.open_playlist.header = this.playlists[index].name;
		this.loaded_songs = this.playlists[index].tracks;
		this.nav.index = 2;
		this.nav.playlist = true;
		this.toggleSubList('open_playlist');
	}

	//Event Aggregator Functions
	screenResize = (size: any = null): void => {
		this.resizeCategoryLists();
	}

	resizeCategoryLists = () => {
		setTimeout(() => {
			var outer = $('.panel-body[panel-type="music-panel"]').height();
			var inner = $('.list-view-header').height();
			var height = outer - inner - 20;
			height = Math.max(height, 150);
			$('.category-list').css('max-height', height + "px");
			$('.playlist-data').css('max-height', (height - 40) + "px");
		}, 50);
	}

	onModalClose = (data: any) => {
		switch (data.modal) {
			case 'add_playlist':
				this.addPlaylist(data.content.name);
				break;
		}
	}

}
