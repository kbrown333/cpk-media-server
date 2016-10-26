System.register(['aurelia-framework', 'aurelia-event-aggregator'], function(exports_1, context_1) {
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
    var aurelia_framework_1, aurelia_event_aggregator_1;
    var FnTs;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            }],
        execute: function() {
            FnTs = class FnTs {
                constructor(ea) {
                    this.ea = ea;
                }
                //public members
                fn_Parallel(args) {
                    return new Promise((res, err) => {
                        var data = [];
                        var finished = this.afterSeries(args.length, () => {
                            res(data);
                        });
                        for (var i = 0; i < args.length; i++) {
                            args[i]
                                .then((info) => { data.push(info); return; })
                                .then(() => { finished(); })
                                .catch((ex) => { err(ex); });
                        }
                    });
                }
                fn_Map(data, fn) {
                    return new Promise((res) => {
                        var new_data = data.map((val) => {
                            return fn(val);
                        });
                        res(new_data);
                    });
                }
                fn_Filter(data, fn) {
                    return new Promise((res) => {
                        var new_data = data.filter((val) => {
                            return fn(val);
                        });
                        res(new_data);
                    });
                }
                fn_Ajax(data) {
                    return new Promise((res, err) => {
                        $.ajax({
                            type: data.type == null ? 'GET' : data.type,
                            url: data.url,
                            headers: data.headers,
                            data: data.data,
                            success: (rslt) => { res(rslt); },
                            error: (ex) => { err(ex); }
                        });
                    });
                }
                fn_Sort(array, obj, direction) {
                    return new Promise((res) => {
                        var rslt = this.mergeSort(array, obj, direction);
                        res(rslt);
                    });
                }
                //output functions - useful for quick error handlers
                logText(msg) {
                    return new Promise((res) => {
                        console.log(msg);
                        res(msg);
                    });
                }
                logDir(data) {
                    return new Promise((res) => {
                        console.dir(data);
                        res(data);
                    });
                }
                logError(err) {
                    return new Promise((res) => {
                        console.error(err);
                        res(err);
                    });
                }
                // internal functions
                afterSeries(times, func) {
                    return () => {
                        if (--times < 1) {
                            return func.apply(this, arguments);
                        }
                    };
                }
                ;
                mergeSort(arr, obj, direction) {
                    if (arr.length < 2)
                        return arr;
                    var middle = parseInt(String(arr.length / 2));
                    var left = arr.slice(0, middle);
                    var right = arr.slice(middle, arr.length);
                    if (direction == "asc") {
                        return this.merge_ascending(this.mergeSort(left, obj, direction), this.mergeSort(right, obj, direction), obj);
                    }
                    else {
                        return this.merge_descending(this.mergeSort(left, obj, direction), this.mergeSort(right, obj, direction), obj);
                    }
                }
                merge_ascending(left, right, obj) {
                    var result = [];
                    while (left.length && right.length) {
                        if (left[0][obj] <= right[0][obj]) {
                            result.push(left.shift());
                        }
                        else {
                            result.push(right.shift());
                        }
                    }
                    while (left.length)
                        result.push(left.shift());
                    while (right.length)
                        result.push(right.shift());
                    return result;
                }
                merge_descending(left, right, obj) {
                    var result = [];
                    while (left.length && right.length) {
                        if (left[0][obj] >= right[0][obj]) {
                            result.push(left.shift());
                        }
                        else {
                            result.push(right.shift());
                        }
                    }
                    while (left.length)
                        result.push(left.shift());
                    while (right.length)
                        result.push(right.shift());
                    return result;
                }
            };
            FnTs = __decorate([
                aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator), 
                __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator])
            ], FnTs);
            exports_1("FnTs", FnTs);
        }
    }
});
