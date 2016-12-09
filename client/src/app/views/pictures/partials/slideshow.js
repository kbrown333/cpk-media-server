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
    var aurelia_framework_1, FnTs_1, session_1, Slideshow;
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
            Slideshow = class Slideshow {
                constructor(fn, session) {
                    this.fn = fn;
                    this.session = session;
                    this.current_img = 'about:blank';
                    this.picture_index = 0;
                    this.getPictureList = () => {
                        return new Promise((res) => {
                            var req = {
                                url: '/pictures/pictures_list'
                            };
                            var callback = (list) => {
                                res(list.data);
                            };
                            this.fn.fn_Ajax(req)
                                .then(callback);
                        });
                    };
                    this.prev = () => {
                        if (this.picture_index > 0) {
                            this.picture_index--;
                            this.current_img = this.picture_list[this.picture_index];
                        }
                    };
                    this.next = () => {
                        if (this.picture_index < this.picture_list.length - 1) {
                            this.picture_index++;
                            this.current_img = this.picture_list[this.picture_index];
                        }
                    };
                    this.selectImage = (index) => {
                        this.picture_index = index;
                        this.current_img = this.picture_list[this.picture_index];
                    };
                    this.screenResize = (size = null) => {
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
                        $('.panel-body[panel-type="pictures-panel"]').css('height', height + 'px');
                        $('img', '.slide_column').css('max-height', (height - 50) + 'px');
                        $('ul', '.slide_column').css('height', (height - 50) + 'px');
                        $('img', '.slide_column ul').css('max-height', '70px');
                    };
                    this.getPictureList()
                        .then((data) => {
                        this.master_list = data;
                        this.picture_list = data;
                        this.current_img = data[0];
                    });
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
            };
            Slideshow = __decorate([
                aurelia_framework_1.inject(FnTs_1.FnTs, session_1.SessionData),
                __metadata("design:paramtypes", [FnTs_1.FnTs, session_1.SessionData])
            ], Slideshow);
            exports_1("Slideshow", Slideshow);
        }
    };
});
