System.register(["aurelia-framework", "aurelia-router", "./models/session", "./models/FnTs"], function (exports_1, context_1) {
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
    var aurelia_framework_1, aurelia_router_1, session_1, FnTs_1, App;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            },
            function (FnTs_1_1) {
                FnTs_1 = FnTs_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor(router, session, fn) {
                    this.router = router;
                    this.session = session;
                    this.fn = fn;
                    this.toggle_header = () => {
                        $(".collapse").toggle();
                    };
                    this.toggle_aside = () => {
                        this.session.visibility.aside = 'stage';
                        setTimeout(() => {
                            this.session.visibility.aside = 'slide';
                        }, 10);
                    };
                    this.automate = (data) => {
                        this.fn.ea.publish('react', { event_name: 'receiveCommand', data: data });
                    };
                    this.loadRouter();
                    this.loadEventListener();
                    this.loadAutoSocket();
                    this.appLoaded();
                }
                loadRouter() {
                    this.router.configure((config) => {
                        config.title = "CPK Media";
                        config.map([
                            { route: ['', 'files'], name: 'files', moduleId: './views/files/files', nav: true, title: 'Files' },
                            { route: ['music'], name: 'music', moduleId: './views/music/music', nav: true, title: 'Music' },
                            { route: ['videos'], name: 'videos', moduleId: './views/videos/videos', nav: true, title: 'Videos' },
                            { route: ['pictures'], name: 'pictures', moduleId: './views/pictures/pictures', nav: true, title: 'Images' },
                        ]);
                        return config;
                    });
                }
                loadEventListener() {
                    this.app_events = this.fn.ea.subscribe('react', (event) => {
                        if (this[event.event_name] != null) {
                            this[event.event_name](event.data);
                        }
                    });
                }
                loadAutoSocket() {
                    setTimeout(() => {
                        $.getScript('socket.io/socket.io.js', (data) => {
                            $("#socket_io").text(data);
                            if (localStorage['device_name'] != null) {
                                var iosocket = io.connect();
                                iosocket.on("connect", () => {
                                    iosocket.emit("register_device", { device: localStorage['device_name'] });
                                    iosocket.on("auto_action", this.automate);
                                });
                            }
                        });
                    }, 5000);
                }
                appLoaded() {
                    this.handleResize();
                }
                handleResize() {
                    var resizeTimeout;
                    $(window).resize(() => {
                        if (!!resizeTimeout) {
                            resizeTimeout = null;
                        }
                        resizeTimeout = setTimeout(() => {
                            var data = {
                                height: $(window).height(),
                                width: $(window).width()
                            };
                            this.fn.ea.publish('react', { event_name: 'screenResize', data: data });
                        }, 100);
                    });
                }
            };
            App = __decorate([
                aurelia_framework_1.inject(aurelia_router_1.Router, session_1.SessionData, FnTs_1.FnTs),
                __metadata("design:paramtypes", [aurelia_router_1.Router, session_1.SessionData, FnTs_1.FnTs])
            ], App);
            exports_1("App", App);
        }
    };
});
