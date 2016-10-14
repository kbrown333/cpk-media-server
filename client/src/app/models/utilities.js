System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utilities;
    return {
        setters:[],
        execute: function() {
            Utilities = class Utilities {
                constructor() {
                    // event listener functions
                    this.events = [];
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
            };
            exports_1("Utilities", Utilities);
        }
    }
});
