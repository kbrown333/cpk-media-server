System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Ajax;
    return {
        setters:[],
        execute: function() {
            Ajax = class Ajax {
                get(data) {
                    $.ajax({
                        url: data.path,
                        type: 'GET',
                        success: data.callback,
                        error: data.error
                    });
                }
                post(data) {
                    $.ajax({
                        url: data.path,
                        type: 'POST',
                        headers: data.headers,
                        data: data.data,
                        success: data.callback,
                        error: data.error
                    });
                }
            };
            exports_1("Ajax", Ajax);
        }
    }
});
