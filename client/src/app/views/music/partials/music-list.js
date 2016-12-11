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
                        loaded_songs: { display: 'hide', header: 'Songs' },
                    };
                    this.view_header = 'Select View';
                    this.songs = [];
                    this.artists = [];
                    this.artist_index = {};
                    this.albums = [];
                    this.album_index = {};
                    this.genres = [];
                    this.genre_index = {};
                    this.playlists = [];
                    this.loaded_songs = [];
                    this.toggleSubList = (name) => {
                        var keys = Object.keys(this.visibility);
                        for (var i = 0; i < keys.length; i++) {
                            this.visibility[keys[i]].display = 'hide';
                        }
                        this.visibility[name].display = 'show';
                        this.view_header = this.visibility[name].header;
                    };
                    this.loadBindableData = (data) => {
                        this.clearLists();
                        this.clearIndexes();
                        this.songs = data;
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
                    this.screenResize = (size = null) => {
                    };
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
