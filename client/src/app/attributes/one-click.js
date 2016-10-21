System.register(['aurelia-framework', '../models/utilities'], function(exports_1, context_1) {
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
    var aurelia_framework_1, utilities_1;
    var OneClickCustomAttribute;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            OneClickCustomAttribute = class OneClickCustomAttribute {
                constructor(element, utils) {
                    this.element = element;
                    this.utils = utils;
                    $(element).click((event) => {
                        this.utils.fireEvent(this.event, this.data);
                    });
                }
                eventChanged(newValue, oldValue) {
                    var x = 1;
                }
                dataChanged(newValue, oldValue) {
                    var x = 1;
                }
            };
            __decorate([
                aurelia_framework_1.bindable, 
                __metadata('design:type', String)
            ], OneClickCustomAttribute.prototype, "event", void 0);
            __decorate([
                aurelia_framework_1.bindable, 
                __metadata('design:type', Object)
            ], OneClickCustomAttribute.prototype, "data", void 0);
            OneClickCustomAttribute = __decorate([
                aurelia_framework_1.inject(Element, utilities_1.Utilities), 
                __metadata('design:paramtypes', [Element, utilities_1.Utilities])
            ], OneClickCustomAttribute);
            exports_1("OneClickCustomAttribute", OneClickCustomAttribute);
        }
    }
});
