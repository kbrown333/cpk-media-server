System.register(['aurelia-framework', '../models/FnTs'], function(exports_1, context_1) {
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
    var aurelia_framework_1, FnTs_1;
    var SearchBox;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (FnTs_1_1) {
                FnTs_1 = FnTs_1_1;
            }],
        execute: function() {
            SearchBox = class SearchBox {
                constructor(fn) {
                    this.fn = fn;
                    this.search = () => {
                        if (this.event != null) {
                            this.fn.ea.publish('react', {
                                event_name: this.event,
                                data: this.search_key
                            });
                        }
                    };
                }
            };
            SearchBox = __decorate([
                aurelia_framework_1.bindable({ name: 'event', defaultValue: null }),
                aurelia_framework_1.inject(FnTs_1.FnTs), 
                __metadata('design:paramtypes', [FnTs_1.FnTs])
            ], SearchBox);
            exports_1("SearchBox", SearchBox);
        }
    }
});
