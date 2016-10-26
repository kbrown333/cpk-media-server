System.register(["aurelia-framework", "../../models/utilities", "../../models/FnTs"], function (exports_1, context_1) {
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
    var aurelia_framework_1, utilities_1, FnTs_1, Files;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (FnTs_1_1) {
                FnTs_1 = FnTs_1_1;
            }
        ],
        execute: function () {
            Files = class Files {
                constructor(utils, fn) {
                    this.utils = utils;
                    this.fn = fn;
                    this.directory = {};
                    this.current_path = '/music';
                    this.display_path = 'Music';
                    this.selected_objects = [];
                    this.cntl_enabled = false;
                    this.aside_links = [
                        { name: 'Music', event: 'loadPage', data: 'music' },
                        { name: 'Videos', event: 'loadPage', data: 'videos' },
                        { name: 'Pictures', event: 'loadPage', data: 'pictures' },
                        { name: 'Documents', event: 'loadPage', data: 'documents' }
                    ];
                    this.hdr_btns = {
                        select_all: 'hide',
                        select_single: 'hide'
                    };
                    this.nav = {
                        show_loader: 'show',
                        show_files: 'hide'
                    };
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
                    this.upload = (formData) => {
                        this.post_files(formData);
                    };
                    this.delete_files = () => {
                        this.show_loader();
                        this.utils.ajax.post({
                            path: '/files/delete_files',
                            data: {
                                files: this.selected_objects,
                                path: this.current_path
                            },
                            callback: (data) => {
                                this.get_files();
                            },
                            error: (data) => {
                                console.error(data.responseText);
                            }
                        });
                    };
                    this.download_file = () => {
                        var items = this.selected_objects;
                        if (items.length > 1) {
                            alert('Only 1 file at a time allowed for downloads');
                        }
                        var rt = this.current_path + '/';
                        var file = rt + items[0];
                        window.open('/files/download_files?file=' + file);
                    };
                    this.edit_file = () => {
                        var x = 1;
                    };
                    this.add_folder = () => {
                        var x = 1;
                    };
                    this.upload_file = () => {
                        $('#upload-input').click();
                    };
                    this.get_files();
                }
                attached() {
                    this.app_events = this.fn.ea.subscribe('react', (event) => {
                        if (this[event.event_name] != null) {
                            this[event.event_name](event.data);
                        }
                    });
                    this.screenResize();
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
                    this.app_events.dispose();
                }
                set_title(data) {
                    switch (data) {
                        case 'music':
                            this.display_path = 'Music';
                            break;
                        case 'documents':
                            this.display_path = 'Documents';
                            break;
                        case 'pictures':
                            this.display_path = 'Pictures';
                            break;
                        case 'videos':
                            this.display_path = 'Videos';
                            break;
                    }
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
                    $('.selected_block').removeClass('selected_block');
                    setTimeout(() => {
                        this.register_drag_drop();
                        this.show_files();
                    }, 500);
                }
                show_loader() {
                    this.nav.show_loader = 'show';
                    this.nav.show_files = 'hide';
                }
                show_files() {
                    this.nav.show_loader = 'hide';
                    this.nav.show_files = 'show';
                }
                click_upload_files() {
                    var files = $(this).get(0).files;
                    if (files.length > 0) {
                        var formData = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            formData.append('uploads[]', file, file.name);
                        }
                        this.upload(formData);
                    }
                }
                register_drag_drop() {
                    var move = (from, to, is_folder) => {
                        this.move_object(from, to, is_folder);
                    };
                    $(".drag_me").draggable({ revert: true });
                    $(".drop_here").droppable({
                        classes: {
                            "ui-droppable-active": "ui-state-active",
                            "ui-droppable-hover": "ui-state-hover"
                        },
                        drop: function (event, ui) {
                            var from = $(".hidden_input", ui.draggable).val();
                            var to = $(".hidden_input", this).val();
                            var is_folder = $(ui.draggable).attr('block-type') == 'folder';
                            move(from, to, is_folder);
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
                    var select;
                    if (this.cntl_enabled) {
                        if (elem.hasClass('selected_block')) {
                            elem.removeClass('selected_block');
                            select = false;
                        }
                        else {
                            elem.addClass('selected_block');
                            select = true;
                        }
                    }
                    else {
                        if (elem.hasClass('selected_block')) {
                            $(".icon-block").removeClass('selected_block');
                            select = false;
                        }
                        else {
                            $(".icon-block").removeClass('selected_block');
                            elem.addClass('selected_block');
                            select = true;
                        }
                    }
                    var count = this.set_button_status();
                    var fetch_obj;
                    if (type == "file") {
                        fetch_obj = this.visible_files;
                    }
                    else {
                        fetch_obj = this.visible_folders;
                    }
                    if (count == 0) {
                        this.selected_objects = [];
                    }
                    else if (count == 1) {
                        elem;
                        this.selected_objects = [];
                        this.selected_objects.push(fetch_obj[index]);
                    }
                    else {
                        if (select) {
                            this.selected_objects.push(fetch_obj[index]);
                        }
                        else {
                            var name = fetch_obj[index];
                            var i = this.selected_objects.indexOf(name);
                            this.selected_objects.splice(i, 1);
                        }
                    }
                }
                set_button_status() {
                    var count = $(".selected_block").length;
                    if (count == 0) {
                        this.hdr_btns.select_all = 'hide';
                        this.hdr_btns.select_single = 'hide';
                    }
                    else if (count == 1) {
                        this.hdr_btns.select_all = 'inline-block';
                        this.hdr_btns.select_single = 'inline-block';
                    }
                    else {
                        this.hdr_btns.select_all = 'inline-block';
                        this.hdr_btns.select_single = 'hide';
                    }
                    return count;
                }
                move_object(obj, folder, is_folder) {
                    this.show_loader();
                    var old_path = this.current_path + '/' + obj;
                    var dest;
                    if (folder == "...") {
                        var tmp = this.current_path.split('/');
                        dest = "";
                        for (var i = 1; i < tmp.length - 1; i++) {
                            dest += "/" + tmp[i];
                        }
                        dest += ("/" + obj);
                    }
                    else {
                        dest = this.current_path + "/" + folder + "/" + obj;
                    }
                    this.utils.ajax.post({
                        path: '/files/rename',
                        data: {
                            old_name: old_path,
                            new_name: dest
                        },
                        callback: (data) => {
                            this.post_move(obj, folder, is_folder);
                        },
                        error: (err) => {
                            alert('Error moving file');
                            console.error(err.responseText);
                        }
                    });
                }
                post_move(obj, folder, is_folder) {
                    var old_directory = this.get_directory();
                    if (folder != "...") {
                        this.step_into(folder);
                    }
                    else {
                        this.step_back();
                    }
                    var new_directory = this.get_directory();
                    if (is_folder) {
                        var copy_obj = $.extend({}, old_directory[obj]);
                        delete old_directory[obj];
                        new_directory[obj] = copy_obj;
                    }
                    else {
                        var index = old_directory['_files_'].indexOf(obj);
                        old_directory['_files_'].splice(index, 1);
                        new_directory['_files_'].push(obj);
                    }
                    this.load_dir();
                }
                post_files(formData) {
                    $.ajax({
                        url: '/files/upload',
                        type: 'POST',
                        headers: {
                            'x-path': this.current_path
                        },
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: (data) => {
                            console.log('upload successful!');
                            this.insert_files(data);
                        },
                        error: function (data) {
                            console.error(data.responseText);
                            alert('Error uploading files');
                        }
                    });
                }
                insert_files(data) {
                    var dir = this.get_directory();
                    if (dir['_files_'] == null) {
                        dir['_files_'] = [];
                    }
                    for (var i = 0; i < data.length; i++) {
                        dir['_files_'].push(data[i]);
                    }
                    this.load_dir();
                }
                screenResize(size = null) {
                    var height;
                    if (size == null) {
                        height = $(window).height();
                    }
                    else {
                        height = size.height;
                    }
                    height = height - 195;
                    $(".panel-body").css('height', height + 'px');
                }
                loadPage(page) {
                    this.current_path = '/' + page;
                    this.set_title(page);
                    this.fn.ea.publish('react', { event_name: 'toggle_aside' });
                    this.load_dir();
                }
                openFolder(data) {
                    if (data == "...") {
                        this.step_back();
                    }
                    else {
                        this.step_into(data);
                    }
                }
                selectFolder(index) {
                    var elem = $($('.icon-block[block-type="folder"]')[index]);
                    this.select_block(elem, index, 'folder');
                }
                selectFile(index) {
                    var elem = $($('.icon-block[block-type="file"]')[index]);
                    this.select_block(elem, index, 'file');
                }
            };
            Files = __decorate([
                aurelia_framework_1.inject(utilities_1.Utilities, FnTs_1.FnTs),
                __metadata("design:paramtypes", [utilities_1.Utilities, FnTs_1.FnTs])
            ], Files);
            exports_1("Files", Files);
        }
    };
});
