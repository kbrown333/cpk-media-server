System.register(["aurelia-framework", "../../../models/FnTs", "../../../models/session"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, FnTs_1, session_1, MusicList;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (FnTs_1_1) {
                FnTs_1 = FnTs_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            }
        ],
        execute: function () {
            MusicList = class MusicList {
                constructor(fn, session) {
                    this.fn = fn;
                    this.session = session;
                    this.visibility = {
                        main: { display: 'show', header: 'Select View' },
                        songs: { display: 'hide', header: 'All Songs' },
                        artists: { display: 'hide', header: 'Artists' },
                        albums: { display: 'hide', header: 'Albums' },
                        genres: { display: 'hide', header: 'Genres' },
                        playlists: { display: 'hide', header: 'Playlists' },
                        open_playlist: { display: 'hide', header: '' },
                        loaded_songs: { display: 'hide', header: 'Songs' },
                    };
                    this.nav = { index: 0, list: null, playlist: false };
                    this.view_header = 'Select View';
                    this.master_list = [];
                    this.artists = [];
                    this.artist_index = {};
                    this.albums = [];
                    this.album_index = {};
                    this.genres = [];
                    this.genre_index = {};
                    this.playlists = [];
                    this.loaded_playlist = [];
                    this.loaded_songs = [];
                    this.clickSubList = (name) => {
                        this.nav.list = name;
                        this.nav.index = 1;
                        this.toggleSubList(name);
                        if (name == 'songs') {
                            this.loaded_songs = this.master_list;
                        }
                    };
                    this.toggleSubList = (name) => {
                        if (name != null) {
                            var keys = Object.keys(this.visibility);
                            for (var i = 0; i < keys.length; i++) {
                                this.visibility[keys[i]].display = 'hide';
                            }
                            this.visibility[name].display = 'show';
                            this.view_header = this.visibility[name].header;
                        }
                    };
                    this.clickBack = () => {
                        switch (this.nav.index) {
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
                    };
                    this.clickForward = () => {
                        switch (this.nav.index) {
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
                                }
                                else {
                                    this.toggleSubList('loaded_songs');
                                }
                                this.nav.index++;
                                break;
                            }
                        }
                    };
                    this.loadBindableData = (data) => {
                        this.clearLists();
                        this.clearIndexes();
                        for (var i = 0; i < data.length; i++) {
                            this.loadByType(data[i], 'artist', 'artists', 'artist_index');
                            this.loadByType(data[i], 'album', 'albums', 'album_index');
                            this.loadByType(data[i], 'genre', 'genres', 'genre_index');
                        }
                        var test = this.albums;
                    };
                    this.clearLists = () => {
                        this.artists = [{ 'name': 'Unknown', 'array': [] }];
                        this.albums = [{ 'name': 'Unknown', 'array': [] }];
                        this.genres = [{ 'name': 'Unknown', 'array': [] }];
                    };
                    this.clearIndexes = () => {
                        this.artist_index = { 'unknown': 0, 'count': 1 };
                        this.album_index = { 'unknown': 0, 'count': 1 };
                        this.genre_index = { 'unknown': 0, 'count': 1 };
                    };
                    this.loadByType = (data, oi, ti, ii) => {
                        var index;
                        if (data[oi] == null || data[oi].trim() == "") {
                            index = 0;
                        }
                        else {
                            var name = data[oi];
                            if (this[ii][data[oi]] == null) {
                                index = this[ii][data[oi]] = this[ii].count;
                                this[ii].count++;
                                this[ti].push({});
                                this[ti][index]['array'] = [];
                                this[ti][index]['name'] = name;
                            }
                            else {
                                index = this[ii][data[oi]];
                            }
                        }
                        this[ti][index]['array'].push(data);
                    };
                    this.loadSubGroup = (item, index) => {
                        this.nav.playlist = false;
                        this.nav.index = 2;
                        this.loaded_songs = item.array;
                        this.toggleSubList('loaded_songs');
                    };
                    this.sendListToPlayer = (item) => {
                        var path = item.path.replace('content/tracks', '/music');
                        var split = path.lastIndexOf('/') + 1;
                        var current = path.substring(0, split);
                        var file = path.substring(split);
                        var all_files = this.loaded_songs.map((val) => {
                            return val.path;
                        });
                        var data = {
                            selected: path,
                            path: current,
                            original: file,
                            all_files: all_files
                        };
                        this.fn.ea.publish('react', { event_name: 'loadPlayerFromList', data: data });
                    };
                    this.clickAddPlaylist = () => {
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
                    };
                    this.addPlaylist = (name) => {
                        var req = {
                            url: '/music/playlists',
                            type: 'POST',
                            data: { playlist: name }
                        };
                        this.fn.fn_Ajax(req)
                            .then((data) => {
                            this.playlists.push({ name: name, tracks: [] });
                        });
                    };
                    this.selectPlaylist = (index) => {
                        this.loaded_playlist = this.playlists[index].tracks;
                        this.visibility.open_playlist.header = this.playlists[index].name;
                        this.loaded_songs = this.playlists[index].tracks;
                        this.nav.index = 2;
                        this.nav.playlist = true;
                        this.toggleSubList('open_playlist');
                    };
                    this.screenResize = (size = null) => {
                        this.resizeCategoryLists();
                    };
                    this.resizeCategoryLists = () => {
                        setTimeout(() => {
                            var outer = $('.panel-body[panel-type="music-panel"]').height();
                            var inner = $('.list-view-header').height();
                            var height = outer - inner - 20;
                            height = Math.max(height, 150);
                            $('.category-list').css('max-height', height + "px");
                            $('.playlist-data').css('max-height', (height - 40) + "px");
                        }, 50);
                    };
                    this.onModalClose = (data) => {
                        switch (data.modal) {
                            case 'add_playlist':
                                this.addPlaylist(data.content.name);
                                break;
                        }
                    };
                    this.fn.fn_Ajax({ url: '/music/playlists' })
                        .then((data) => { this.playlists = data; });
                }
                attached() {
                    this.app_events = this.fn.ea.subscribe('react', (event) => {
                        if (this[event.event_name] != null) {
                            this[event.event_name](event.data);
                        }
                    });
                }
                detached() {
                    this.app_events.dispose();
                }
                grid_dataChanged(newVal, oldVal) {
                    if (newVal != null) {
                        this.master_list = newVal;
                        this.loadBindableData(newVal);
                    }
                }
            };
            MusicList = __decorate([
                aurelia_framework_1.bindable({ name: 'grid_data', defaultValue: [], defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
                aurelia_framework_1.inject(FnTs_1.FnTs, session_1.SessionData),
                __metadata("design:paramtypes", [FnTs_1.FnTs, session_1.SessionData])
            ], MusicList);
            exports_1("MusicList", MusicList);
        }
    };
});
