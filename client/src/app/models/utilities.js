System.register(['aurelia-framework', './ajax'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1, ajax_1;
    var Utilities;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ajax_1_1) {
                ajax_1 = ajax_1_1;
            }],
        execute: function() {
            Utilities = class Utilities {
                constructor(ajax) {
                    this.ajax = ajax;
                    // event listener functions
                    this.events = [];
                    this.handleResize();
                }
                // sequencing functions
                afterSeries(times, func) {
                    return () => {
                        if (--times < 1) {
                            return func.apply(this, arguments);
                        }
                    };
                }
                ;
                addEventListener(event, caller, callback) {
                    if (this.events[event] == null) {
                        this.events[event] = [];
                        this.events[event].count = 0;
                    }
                    if (this.events[event][caller] == null) {
                        this.events[event][caller] = callback;
                        this.events[event].count++;
                    }
                }
                dropEventListener(event, caller) {
                    if (this.events[event] != null) {
                        if (this.events[event][caller] != null) {
                            delete this.events[event][caller];
                            this.events[event].count--;
                        }
                    }
                }
                fireEvent(event, data = null) {
                    if (this.events[event] != null) {
                        var keys = Object.keys(this.events[event]);
                        for (var i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            if (key !== "count") {
                                if (data != null) {
                                    this.events[event][key](data);
                                }
                                else {
                                    this.events[event][key]();
                                }
                            }
                            ;
                        }
                    }
                }
                fireException(data) {
                    this.fireEvent("exception", data);
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
                            this.fireEvent('screen_resize', data);
                        }, 100);
                    });
                }
            };
            Utilities = __decorate([
                aurelia_framework_1.inject(ajax_1.Ajax), 
                __metadata('design:paramtypes', [ajax_1.Ajax])
            ], Utilities);
            exports_1("Utilities", Utilities);
        }
    }
});
