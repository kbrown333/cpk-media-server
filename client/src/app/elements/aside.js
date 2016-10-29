System.register(['aurelia-framework', '../models/session'], function(exports_1, context_1) {
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
    var aurelia_framework_1, session_1;
    var Aside;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            }],
        execute: function() {
            Aside = class Aside {
                constructor(session) {
                    this.session = session;
                }
                attached() {
                }
            };
            Aside = __decorate([
                aurelia_framework_1.bindable({ name: 'aside_links', defaultBindingMode: aurelia_framework_1.bindingMode.twoWay, defaultValue: {} }),
                aurelia_framework_1.inject(session_1.SessionData), 
                __metadata('design:paramtypes', [session_1.SessionData])
            ], Aside);
            exports_1("Aside", Aside);
        }
    }
});
