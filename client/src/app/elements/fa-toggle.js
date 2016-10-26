System.register(["aurelia-framework", "../models/FnTs"], function (exports_1, context_1) {
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
    var aurelia_framework_1, FnTs_1, FaToggle;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (FnTs_1_1) {
                FnTs_1 = FnTs_1_1;
            }
        ],
        execute: function () {
            FaToggle = class FaToggle {
                constructor(fn) {
                    this.fn = fn;
                    this.toggle = () => {
                        if (this.state == 'on') {
                            this.toggle_on = 'hide';
                            this.toggle_off = 'show';
                            this.state = 'off';
                        }
                        else {
                            this.toggle_on = 'show';
                            this.toggle_off = 'hide';
                            this.state = 'on';
                        }
                        if (this.event != null) {
                            var status = this.state == 'on';
                            this.fn.ea.publish('react', { event_name: this.event, data: status });
                        }
                    };
                    this.toggle_on = 'show';
                    this.toggle_off = 'hide';
                }
                attached() {
                    if (this.state != 'on') {
                        this.toggle_on = 'hide';
                    }
                }
            };
            FaToggle = __decorate([
                aurelia_framework_1.bindable({ name: 'state', defaultValue: 'on' }),
                aurelia_framework_1.bindable({ name: 'event', defaultValue: null }),
                aurelia_framework_1.inject(FnTs_1.FnTs),
                __metadata("design:paramtypes", [FnTs_1.FnTs])
            ], FaToggle);
            exports_1("FaToggle", FaToggle);
        }
    };
});
