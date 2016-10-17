System.register(['aurelia-framework', '../../models/utilities', '../../models/session'], function(exports_1, context_1) {
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
    var aurelia_framework_1, utilities_1, session_1;
    var Dash;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            }],
        execute: function() {
            Dash = class Dash {
                constructor(utils, session) {
                    this.utils = utils;
                    this.session = session;
                    this.aside_links = [
                        { name: 'Test Link', event: 'test_link' }
                    ];
                    this.toggle_visibility = {
                        panel_body_1: 'show'
                    };
                }
                attached() {
                    this.utils.addEventListener('toggle_panel_1', 'dash.ts', (state) => {
                        if (state) {
                            this.toggle_visibility.panel_body_1 = 'show';
                        }
                        else {
                            this.toggle_visibility.panel_body_1 = 'hide';
                        }
                    });
                    this.utils.addEventListener('test_link', 'dash.ts', () => {
                        alert('Testing Link');
                    });
                }
                detached() {
                    this.utils.dropEventListener('toggle_panel_1', 'dash.ts');
                    this.utils.dropEventListener('test_link', 'dash.ts');
                }
            };
            Dash = __decorate([
                aurelia_framework_1.inject(utilities_1.Utilities, session_1.SessionData), 
                __metadata('design:paramtypes', [utilities_1.Utilities, session_1.SessionData])
            ], Dash);
            exports_1("Dash", Dash);
        }
    }
});
