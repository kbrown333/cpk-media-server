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
    var aurelia_framework_1, FnTs_1, session_1, MusicPlayer;
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
            MusicPlayer = class MusicPlayer {
                constructor(fn, session) {
                    this.fn = fn;
                    this.session = session;
                    this.now_playing = '[None Selected]';
                    this.loadMusicFile = (data) => {
                        var test = data;
                    };
                }
                attached() {
                    this.screenResize();
                    this.app_events = this.fn.ea.subscribe('react', (event) => {
                        if (this[event.event_name] != null) {
                            this[event.event_name](event.data);
                        }
                    });
                }
                detached() {
                    this.app_events.dispose();
                }
                screenResize(size = null) {
                    var height, width;
                    if (size == null) {
                        height = $(window).height();
                        width = $(window).width();
                    }
                    else {
                        height = size.height;
                        width = size.width;
                    }
                    var offset = width > 768 ? 150 : 190;
                    height = height - offset;
                    if (width > 991)
                        $('.panel-body[panel-type="music-panel"]').css('height', height + 'px');
                    else
                        $('.panel-body[panel-type="music-panel"]').css('height', '100px');
                }
            };
            MusicPlayer = __decorate([
                aurelia_framework_1.inject(FnTs_1.FnTs, session_1.SessionData),
                __metadata("design:paramtypes", [FnTs_1.FnTs, session_1.SessionData])
            ], MusicPlayer);
            exports_1("MusicPlayer", MusicPlayer);
        }
    };
});
