System.register(["aurelia-framework", "../../models/FnTs", "../../models/session"], function (exports_1, context_1) {
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
    var aurelia_framework_1, FnTs_1, session_1, Videos;
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
            Videos = class Videos {
                constructor(fn, session) {
                    this.fn = fn;
                    this.session = session;
                    this.aside_links = [
                        { name: 'Video Files', event: 'toggleVideoScreens', data: 'panel' },
                        { name: 'Video Player', event: 'toggleVideoScreens', data: 'player' }
                    ];
                    this.videos = [];
                    this.now_playing = '';
                    this.visibility = {
                        panel: 'show',
                        player: 'hide'
                    };
                    this.dir = {
                        videos: { '_files_': [] },
                    };
                    this.changeVideo = (link) => {
                        var player = document.getElementById('vid_player');
                        var video = document.getElementById('vid_src');
                        player.pause();
                        video.src = link;
                        player.load();
                    };
                    this.changeNowPlaying = (link) => {
                        var data = link.split('/');
                        this.now_playing = data[data.length - 1];
                    };
                    this.loadDirectionButtonEvents = (data) => {
                        var index = data.all_files.indexOf(data.original);
                        if (index == -1) {
                            this.prev = () => { };
                            this.next = () => { };
                        }
                        else if (index == 0) {
                            this.prev = () => { };
                            this.next = () => {
                                var new_data = this.generateLoadRequest(data, data.all_files[index + 1]);
                                this.loadVideoFile(new_data, true);
                            };
                        }
                        else if (index == data.all_files.length - 1) {
                            this.prev = () => {
                                var new_data = this.generateLoadRequest(data, data.all_files[index - 1]);
                                this.loadVideoFile(new_data, true);
                            };
                            this.next = () => { };
                        }
                        else {
                            this.prev = () => {
                                var new_data = this.generateLoadRequest(data, data.all_files[index - 1]);
                                this.loadVideoFile(new_data, true);
                            };
                            this.next = () => {
                                var new_data = this.generateLoadRequest(data, data.all_files[index + 1]);
                                this.loadVideoFile(new_data, true);
                            };
                        }
                    };
                    this.generateLoadRequest = (data, file) => {
                        return {
                            selected: data.path + file,
                            all_files: data.all_files,
                            path: data.path,
                            original: file
                        };
                    };
                    this.next = () => { };
                    this.prev = () => { };
                    this.togglePanel = () => {
                        if (this.visibility.panel == 'show') {
                            this.visibility.panel = 'hide';
                            this.visibility.player = 'show';
                        }
                        else {
                            this.visibility.panel = 'show';
                            this.visibility.player = 'hide';
                        }
                    };
                    this.screenResize = (size = null) => {
                    };
                    this.toggleVideoScreens = (screen) => {
                        if (this.visibility[screen] != 'show') {
                            this.togglePanel();
                        }
                        this.fn.ea.publish('react', { event_name: 'toggle_aside' });
                    };
                    this.loadVideoFile = (data, override = false) => {
                        var link = '/content' + data.selected;
                        this.changeVideo(link);
                        this.changeNowPlaying(link);
                        this.loadDirectionButtonEvents(data);
                        if (!override)
                            this.togglePanel();
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
            };
            Videos = __decorate([
                aurelia_framework_1.inject(FnTs_1.FnTs, session_1.SessionData),
                __metadata("design:paramtypes", [FnTs_1.FnTs, session_1.SessionData])
            ], Videos);
            exports_1("Videos", Videos);
        }
    };
});
