System.register(["aurelia-framework", "../../models/FnTs"], function (exports_1, context_1) {
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
    var aurelia_framework_1, FnTs_1, Files;
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
            Files = class Files {
                constructor(fn) {
                    this.fn = fn;
                    this.directory = {};
                    this.current_path = '/music';
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
                    this.reduce_path = (a, b) => { return a + '/' + b; };
                    this.startRender = (data) => {
                        this.BuildFolderStructure(data)
                            .then(this.getDirectory)
                            .then(this.buildDirectory)
                            .then(this.renderDirectory)
                            .catch(this.fn.logError);
                    };
                    this.renderDirectory = (data) => {
                        this.current_path = data.current_path;
                        this.directory = data.directory;
                        this.visible_files = data.visible_files;
                        this.visible_folders = data.visible_folders;
                        if (data.files != null) {
                            this.files = data.files;
                        }
                        setTimeout(() => {
                            this.register_drag_drop();
                            this.show_files();
                        }, 500);
                    };
                    this.BuildFolderStructure = (data) => {
                        return new Promise((res, err) => {
                            var dir = {
                                music: { '_files_': [] },
                                videos: { '_files_': [] },
                                pictures: { '_files_': [] },
                                documents: { '_files_': [] },
                            };
                            for (var i = 0; i < data.files.length; i++) {
                                this.create_file_path(data.files[i], dir);
                            }
                            res({
                                files: data.files,
                                directory: dir,
                                current_path: this.current_path
                            });
                        });
                    };
                    this.getDirectory = (data) => {
                        var dir = data.directory;
                        var tmp = data.current_path.split('/');
                        var path;
                        for (var i = 1; i < tmp.length; i++) {
                            path = tmp[i];
                            dir = dir[path];
                        }
                        data.current_directory = dir;
                        return data;
                    };
                    this.click_upload_btn = () => {
                        $('#upload-input').click();
                    };
                    this.delete_files = () => {
                        this.show_loader();
                        var data = {
                            url: 'files/delete_files',
                            type: 'POST',
                            data: { files: this.selected_objects, path: this.current_path }
                        };
                        this.fn.fn_Ajax(data)
                            .then(() => { this.getFiles(); });
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
                    this.open_rename_modal = () => {
                        this.fn.ea.publish('react', {
                            event_name: 'showModal',
                            data: {
                                modal: 'edit_fname',
                                content: {
                                    title: 'Edit File Name',
                                    fname: this.selected_objects[0]
                                }
                            }
                        });
                    };
                    this.rename_file = (old_name, new_name) => {
                        var data = {
                            type: 'POST',
                            url: 'files/rename',
                            data: {
                                old_name: this.current_path + '/' + old_name,
                                new_name: this.current_path + '/' + new_name
                            }
                        };
                        this.fn.fn_Ajax(data)
                            .then(() => { this.getFiles(); });
                    };
                    this.open_add_folder = () => {
                        this.fn.ea.publish('react', {
                            event_name: 'showModal',
                            data: {
                                modal: 'add_folder',
                                content: {
                                    title: 'Add New Folder',
                                    fname: ''
                                }
                            }
                        });
                    };
                    this.getFiles();
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
                    $("#upload-input").on('change', () => {
                        this.upload_files_selected();
                    });
                }
                detached() {
                    this.app_events.dispose();
                }
                show_loader() {
                    this.nav.show_loader = 'show';
                    this.nav.show_files = 'hide';
                }
                show_files() {
                    this.nav.show_loader = 'hide';
                    this.nav.show_files = 'show';
                }
                getFiles() {
                    return new Promise((res) => {
                        this.fn.fn_Ajax({ url: '/files/files_list' })
                            .then(this.startRender)
                            .then(() => {
                            res();
                        });
                    });
                }
                create_file_path(path, current_dir) {
                    var parts = path.split('/').filter((val) => { return val != ""; });
                    if (parts.length == 1) {
                        if (current_dir['_files_'] == null) {
                            current_dir['_files_'] = [];
                        }
                        current_dir['_files_'].push(parts[0]);
                    }
                    else {
                        var dir = parts[0];
                        if (current_dir[dir] == null) {
                            current_dir[dir] = { '...': {}, '_files_': [] };
                        }
                        ;
                        if (parts.length == 2) {
                            if (parts[1].indexOf('.') != -1) {
                                current_dir[dir]['_files_'].push(parts[1]);
                            }
                            else {
                                current_dir[dir][parts[1]] = { '...': {}, '_files_': [] };
                            }
                        }
                        else {
                            parts.shift();
                            var new_path = parts.reduce(this.reduce_path, '');
                            this.create_file_path(new_path, current_dir[dir]);
                        }
                    }
                }
                buildDirectory(data) {
                    var files = [], folders = [];
                    var dir = data.current_directory;
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
                    $('.selected_block').removeClass('selected_block');
                    data.visible_files = files;
                    data.visible_folders = folders;
                    return data;
                }
                step_into(folder) {
                    var data = {
                        directory: this.directory,
                        current_path: this.current_path + '/' + folder
                    };
                    data = this.getDirectory(data);
                    this.renderDirectory(this.buildDirectory(data));
                }
                step_back() {
                    var tmp = this.current_path.split('/');
                    var path = "";
                    for (var i = 1; i < tmp.length - 1; i++) {
                        path += "/" + tmp[i];
                    }
                    var data = { directory: this.directory, current_path: path };
                    data = this.getDirectory(data);
                    this.renderDirectory(this.buildDirectory(data));
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
                move_object(obj, folder, is_folder) {
                    this.show_loader();
                    var old_path = this.current_path + '/' + obj;
                    var dest;
                    if (folder == "...") {
                        var tmp = this.current_path.split('/');
                        tmp.pop();
                        tmp = tmp.filter((val) => { return val != ""; });
                        dest = tmp.reduce(this.reduce_path, '');
                        dest += ("/" + obj);
                    }
                    else {
                        dest = this.current_path + "/" + folder + "/" + obj;
                    }
                    var data = {
                        data: { old_name: old_path, new_name: dest },
                        url: '/files/rename',
                        type: 'POST'
                    };
                    this.fn.fn_Ajax(data)
                        .then(() => { this.post_move(old_path, dest); })
                        .catch((err) => {
                        console.log(err.responseText);
                        this.show_files();
                    });
                }
                post_move(old_path, new_path) {
                    var ind = this.files.indexOf(old_path.substring(1));
                    var files = $.extend(true, [], this.files);
                    if (ind != -1) {
                        files.splice(ind, 1);
                        files.push(new_path.substring(1));
                    }
                    var data = { files: files };
                    this.startRender(data);
                }
                upload_files_selected() {
                    var files = $('#upload-input').get(0).files;
                    if (files.length > 0) {
                        var formData = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            formData.append('uploads[]', file, file.name);
                        }
                        this.upload(formData);
                    }
                }
                upload(formData) {
                    var data = {
                        url: '/files/upload',
                        type: 'POST',
                        headers: {
                            'x-path': this.current_path
                        },
                        data: formData,
                        processData: false,
                        contentType: false
                    };
                    this.fn.fn_Ajax(data)
                        .then(() => {
                        this.getFiles();
                    });
                }
                add_new_folder(folder_name) {
                    var data = {
                        type: 'POST',
                        url: 'files/new_folder',
                        data: { path: this.current_path + '/' + folder_name }
                    };
                    this.fn.fn_Ajax(data)
                        .then(() => { this.getFiles(); });
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
                screenResize(size = null) {
                    var height, width;
                    if (size == null) {
                        height = $(window).height();
                        width = $(window).width();
                    }
                    else {
                        height = size.height;
                        width = size.width;
                    }
                    var offset = width > 768 ? 150 : 190;
                    height = height - offset;
                    $(".panel-body").css('height', height + 'px');
                }
                loadPage(page) {
                    this.current_path = '/' + page;
                    this.fn.ea.publish('react', { event_name: 'toggle_aside' });
                    var data = { files: this.files };
                    this.startRender(data);
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
                onModalClose(data) {
                    switch (data.modal) {
                        case 'edit_fname':
                            this.rename_file(this.selected_objects[0], data.content.fname);
                            break;
                        case 'add_folder':
                            this.add_new_folder(data.content.fname);
                            break;
                    }
                }
            };
            Files = __decorate([
                aurelia_framework_1.inject(FnTs_1.FnTs),
                __metadata("design:paramtypes", [FnTs_1.FnTs])
            ], Files);
            exports_1("Files", Files);
        }
    };
});
