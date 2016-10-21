System.register(['aurelia-framework', '../../models/utilities'], function(exports_1, context_1) {
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
    var Files;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            Files = class Files {
                constructor(utils) {
                    this.utils = utils;
                    this.directory = {};
                    this.current_path = '/music';
                    this.display_path = 'music';
                    this.cntl_enabled = false;
                    this.aside_links = [
                        { name: 'Music', event: 'load_page', data: 'music' },
                        { name: 'Videos', event: 'load_page', data: 'videos' },
                        { name: 'Pictures', event: 'load_page', data: 'pictures' },
                        { name: 'Documents', event: 'load_page', data: 'documents' }
                    ];
                    this.load_files = (data) => {
                        this.files = data.files;
                        var directory = {};
                        var str_i, str_j, tmp, dir, fname;
                        for (var i = 0; i < data.files.length; i++) {
                            str_i = data.files[i];
                            tmp = str_i.split('/');
                            if (tmp.length > 0) {
                                dir = directory;
                                for (var j = 0; j < tmp.length - 1; j++) {
                                    str_j = tmp[j];
                                    if (dir[str_j] == null) {
                                        if (j > 0) {
                                            dir[str_j] = { '...': {} };
                                        }
                                        else {
                                            dir[str_j] = {};
                                        }
                                    }
                                    dir = dir[str_j];
                                }
                                fname = tmp[tmp.length - 1];
                                if (dir['_files_'] == null) {
                                    dir['_files_'] = [];
                                }
                                if (fname != "") {
                                    dir['_files_'].push(fname);
                                }
                            }
                        }
                        this.directory = directory;
                    };
                    this.get_files();
                }
                attached() {
                    this.utils.addEventListener('screen_resize', 'files.ts', (res) => {
                        this.set_height(res.height);
                    });
                    this.utils.addEventListener('open_folder', 'files.ts', (data) => {
                        if (data == "...") {
                            this.step_back();
                        }
                        else {
                            this.step_into(data);
                        }
                    });
                    this.utils.addEventListener('select_folder', 'files.ts', (index) => {
                        var elem = $($('.icon-block[block-type="folder"]')[index]);
                        this.select_block(elem, index, 'folder');
                        var x = 1;
                    });
                    this.utils.addEventListener('select_file', 'files.ts', (index) => {
                        var elem = $($('.icon-block[block-type="file"]')[index]);
                        this.select_block(elem, index, 'file');
                        var x = 1;
                    });
                    this.utils.addEventListener('load_page', 'files.ts', (data) => {
                        this.current_path = '/' + data;
                        this.display_path = data;
                        this.utils.fireEvent('toggle_aside');
                        this.load_dir();
                    });
                    this.set_height();
                    $('body').keydown((event) => {
                        if (event.which == 17) {
                            this.cntl_enabled = true;
                        }
                    });
                    $('body').keyup((event) => {
                        if (event.which == 17) {
                            this.cntl_enabled = false;
                        }
                    });
                }
                detached() {
                    this.utils.dropEventListener('screen_resize', 'files.ts');
                    this.utils.dropEventListener('open_folder', 'files.ts');
                    this.utils.dropEventListener('select_folder', 'files.ts');
                    this.utils.dropEventListener('select_file', 'files.ts');
                }
                set_height(height = null) {
                    if (height == null) {
                        height = $(window).height();
                    }
                    height = height - 160;
                    $(".panel-body").css('height', height + 'px');
                }
                get_files() {
                    this.utils.ajax.get({
                        path: '/files/files_list',
                        callback: (data) => {
                            this.load_files(data);
                            this.load_dir();
                        },
                        error: (err) => {
                            alert('Error loading files');
                        }
                    });
                }
                load_dir() {
                    var files = [], folders = [];
                    var dir = this.get_directory();
                    if (dir != null) {
                        if (dir['_files_'] != null) {
                            files = dir['_files_'];
                        }
                        for (var obj in dir) {
                            if (obj != '_files_') {
                                folders.push(obj);
                            }
                        }
                    }
                    this.visible_files = files;
                    this.visible_folders = folders;
                    setTimeout(() => {
                        this.register_drag_drop();
                    }, 500);
                }
                register_drag_drop() {
                    $(".drag_me").draggable({ revert: true });
                    $(".drop_here").droppable({
                        classes: {
                            "ui-droppable-active": "ui-state-active",
                            "ui-droppable-hover": "ui-state-hover"
                        },
                        drop: (event, ui) => {
                            //var from = $("i", ui.draggable).attr('name');
                            //var to = $("i", this).attr('name');
                            var is_folder = $("i", ui.draggable).hasClass('fa-folder');
                            //fserve.move_object(from, to, is_folder);
                        }
                    });
                }
                get_directory() {
                    var dir = this.directory;
                    var tmp = this.current_path.split('/');
                    var path;
                    for (var i = 1; i < tmp.length; i++) {
                        path = tmp[i];
                        dir = dir[path];
                    }
                    return dir;
                }
                step_into(folder) {
                    this.current_path += "/" + folder;
                    this.load_dir();
                }
                step_back() {
                    var tmp = this.current_path.split('/');
                    var path = "";
                    for (var i = 1; i < tmp.length - 1; i++) {
                        path += "/" + tmp[i];
                    }
                    this.current_path = path;
                    this.load_dir();
                }
                select_block(elem, index, type) {
                    var selected;
                    if (this.cntl_enabled) {
                        if (elem.hasClass('selected_block')) {
                            elem.removeClass('selected_block');
                            selected = true;
                        }
                        else {
                            elem.addClass('selected_block');
                            selected = false;
                        }
                    }
                    else {
                        if (elem.hasClass('selected_block')) {
                            $(".icon-block").removeClass('selected_block');
                            selected = true;
                        }
                        else {
                            $(".icon-block").removeClass('selected_block');
                            elem.addClass('selected_block');
                            selected = false;
                        }
                    }
                }
            };
            Files = __decorate([
                aurelia_framework_1.inject(utilities_1.Utilities), 
                __metadata('design:paramtypes', [utilities_1.Utilities])
            ], Files);
            exports_1("Files", Files);
        }
    }
});
