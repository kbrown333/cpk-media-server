import {inject, bindable, bindingMode} from 'aurelia-framework';
import {FnTs} from '../../../models/FnTs';

@bindable({name: 'current_path', defaultValue: '/music'})
@bindable({name: 'display_path', defaultValue: ''})
@bindable({name: 'base_dir', defaultValue: {}})
@bindable({name: 'ajax_path', defaultValue: '/files/files_list' })
@inject(FnTs)
export class FilesPanel {

	app_events: any;
	ajax_path: any;
	files: any;
	base_dir: any;
	directory: any = {};
	current_path: string;
	visible_folders: any;
	visible_files: any;
	selected_objects: any = [];
	cntl_enabled: boolean = false;
	hdr_btns: any = {
		select_all: 'hide',
		select_single: 'hide'
	}
	nav: any = {
		show_loader: 'show',
		show_files: 'hide'
	}
	reduce_path = (a, b) => {return a + '/' + b;};

	constructor(private fn: FnTs) {

	}

	attached() {
		this.getFiles();
		this.app_events = this.fn.ea.subscribe('react', (event: any) => {
			if (this[event.event_name] != null) { this[event.event_name](event.data); }
		});
		this.screenResize();
		$('body').keydown((event: JQueryEventObject) => {
			if (event.which == 17) { this.cntl_enabled = true; }
		});
		$('body').keyup((event: JQueryEventObject) => {
			if (event.which == 17) { this.cntl_enabled = false; }
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
		this.fn.fn_Ajax({url: this.ajax_path})
			.then((rslt) => {this.startRender(rslt, this.base_dir);});
	}

	startRender = (data: any, dir: any) => {
		this.BuildFolderStructure(data, $.extend(true, {}, dir))
			.then(this.getDirectory)
			.then(this.buildDirectory)
			.then(this.renderDirectory)
			.catch(this.fn.logError);
	}

	renderDirectory =  (data: any) => {
		this.current_path = data.current_path;
		this.directory = data.directory;
		this.visible_files = data.visible_files;
		this.visible_folders = data.visible_folders;
		if (data.files != null) { this.files = data.files; }
		setTimeout(() => {
			this.register_drag_drop();
			this.show_files();
		}, 500);
	}

	BuildFolderStructure = (data: any, dir: any): Promise<any> => {
		return new Promise((res, err) => {
			for (var i = 0; i < data.files.length; i++) {
				this.create_file_path(data.files[i], dir);
			}
			res({
				files: data.files,
				directory: dir,
				current_path: this.current_path
			});
		});
	}

	create_file_path(path: string, current_dir: any) {
		var parts = path.split('/').filter((val) => {return val != "";});
		if (parts.length == 1) {
			if (current_dir['_files_'] == null) { current_dir['_files_'] = []; }
			current_dir['_files_'].push(parts[0]);
		} else {
			var dir = parts[0];
			if (current_dir[dir] == null) {
				current_dir[dir] = {'...': {}, '_files_': []}
			};
			if (parts.length == 2) {
				if (parts[1].indexOf('.') != -1) {
					current_dir[dir]['_files_'].push(parts[1]);
				} else {
					current_dir[dir][parts[1]] = {'...': {}, '_files_': []}
				}
			} else {
				parts.shift();
				var new_path = parts.reduce(this.reduce_path, '');
				this.create_file_path(new_path, current_dir[dir]);
			}
		}
	}

	getDirectory = (data: any): any => {
		var dir = data.directory;
		var tmp = data.current_path.split('/');
		var path;
		for (var i = 1; i < tmp.length; i++) {
			path = tmp[i];
			dir = dir[path];
		}
		data.current_directory = dir;
		return data;
	}

	buildDirectory(data: any) {
		var files = [], folders = [];
		var dir = data.current_directory;
		if (dir != null) {
			if (dir['_files_'] != null) { files = dir['_files_']; }
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

	step_into(folder: string): void {
		var data = {
			directory: this.directory,
			current_path: this.current_path + '/' + folder
		};
		data = this.getDirectory(data);
		this.renderDirectory(this.buildDirectory(data));
	}

	step_back(): void {
		var tmp = this.current_path.split('/');
		var path = "";
		for (var i = 1; i < tmp.length - 1; i++) {
			path += "/" + tmp[i];
		}
		var data = {directory: this.directory, current_path: path};
		data = this.getDirectory(data);
		this.renderDirectory(this.buildDirectory(data));
	}

	register_drag_drop(): void {
		var move = (from: string, to: string, is_folder: boolean) => {
			this.move_object(from, to, is_folder);
		}
		$(".drag_me").draggable({revert: true});
		$(".drop_here").droppable({
			classes: {
				"ui-droppable-active": "ui-state-active",
				"ui-droppable-hover": "ui-state-hover"
			},
			drop: function(event, ui) {
				var from = $(".hidden_input", ui.draggable).val();
				var to = $(".hidden_input", this).val();
				var is_folder = $(ui.draggable).attr('block-type') == 'folder';
				move(from, to, is_folder);
			}
		});
	}

	//File Processing Algorithms
	move_object(obj: string, folder: string, is_folder: boolean): void {
		this.show_loader();
		var old_path = this.current_path + '/' + obj;
		var dest;
		if (folder == "...") {
			var tmp = this.current_path.split('/');
			tmp.pop();
			tmp = tmp.filter((val) => {return val != "";});
			dest = tmp.reduce(this.reduce_path, '');
			dest += ("/" + obj);
		} else {
			dest = this.current_path + "/" + folder + "/" + obj;
		}
		var data = {
			data: { old_name: old_path, new_name: dest },
			url: '/files/rename',
			type: 'POST'
		};
		this.fn.fn_Ajax(data)
			.then(() => { this.post_move(old_path, dest) })
			.catch((err) => {
				console.log(err.responseText);
				this.show_files();
			});
	}

	post_move(old_path: string, new_path: string) {
		var ind = this.files.indexOf(old_path.substring(1));
		var files = $.extend(true, [], this.files);
		if (ind != -1) {
			files.splice(ind, 1);
			files.push(new_path.substring(1));
		}
		var data = { files: files };
		this.startRender(data, this.base_dir);
	}

	click_upload_btn = () => {
		$('#upload-input').click();
	}

	upload_files_selected() {
		var files = (<HTMLInputElement>$('#upload-input').get(0)).files;
	  	if (files.length > 0) {
		  	var formData = new FormData();
		  	for (var i = 0; i < files.length; i++) {
			  	var file = files[i];
			  	formData.append('uploads[]', file, file.name);
		  	}
		  	this.upload(formData);
	  	}
	}

	upload(formData: FormData) {
		var data = {
			url: '/files/upload',
			type: 'POST',
			headers: {
				'x-path': this.current_path
			},
			data: formData,
			processData: false,
			contentType: false
		}
		this.fn.fn_Ajax(data)
			.then(() => {
				this.getFiles();
			});
	}

	delete_files = () => {
		this.show_loader();
		var data = {
			url: 'files/delete_files',
			type: 'POST',
			data: { files: this.selected_objects, path: this.current_path }
		}
		this.fn.fn_Ajax(data)
			.then(() => { this.getFiles(); });
	}

	download_file = () => {
		var items = this.selected_objects;
		if (items.length > 1) {
			alert('Only 1 file at a time allowed for downloads');
		}
		var rt = this.current_path + '/';
		var file = rt + items[0];
		window.open('/files/download_files?file=' + file);
	}

	open_rename_modal = () => {
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
	}

	rename_file = (old_name: string, new_name: string) => {
		var data = {
			type: 'POST',
			url: 'files/rename',
			data: {
				old_name: this.current_path + '/' + old_name,
				new_name: this.current_path + '/' + new_name
			}
		}
		this.fn.fn_Ajax(data)
			.then(() => { this.getFiles(); });
	}

	open_add_folder = () => {
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
	}

	add_new_folder(folder_name: string) {
		var data = {
			type: 'POST',
			url: 'files/new_folder',
			data: {path: this.current_path + '/' + folder_name}
		}
		this.fn.fn_Ajax(data)
			.then(() => { this.getFiles(); });
	}

	//Folder / File Selection
	select_block(elem: any, index: number, type: string): void {
		var select;
		if (this.cntl_enabled) {
			if (elem.hasClass('selected_block')) {
				elem.removeClass('selected_block');
				select = false;
			} else {
				elem.addClass('selected_block');
				select = true;
			}
		} else {
			if (elem.hasClass('selected_block')) {
				$(".icon-block").removeClass('selected_block');
				select = false;
			} else {
				$(".icon-block").removeClass('selected_block');
				elem.addClass('selected_block');
				select = true;
			}
		}
		var count = this.set_button_status();
		var fetch_obj;
		if (type == "file") {
			fetch_obj = this.visible_files;
		} else {
			fetch_obj = this.visible_folders;
		}
		if (count == 0) {
			this.selected_objects = [];
		} else if (count == 1) {elem
			this.selected_objects = [];
			this.selected_objects.push(fetch_obj[index]);
		} else {
			if (select) {
				this.selected_objects.push(fetch_obj[index]);
			} else {
				var name = fetch_obj[index];
				var i = this.selected_objects.indexOf(name);
				this.selected_objects.splice(i, 1);
			}
		}
	}

	set_button_status(): number {
		var count = $(".selected_block").length;
		if (count == 0) {
			this.hdr_btns.select_all = 'hide';
			this.hdr_btns.select_single = 'hide';
		} else if (count == 1) {
			this.hdr_btns.select_all = 'inline-block';
			this.hdr_btns.select_single = 'inline-block';
		} else {
			this.hdr_btns.select_all = 'inline-block';
			this.hdr_btns.select_single = 'hide';
		}
		return count;
	}

	//Event Aggregator Functions
	screenResize(size: any = null): void {
		var height, width;
		if (size == null) { height = $(window).height(); width = $(window).width(); }
		else { height = size.height; width = size.width; }
		var offset = width > 768 ? 150 : 190;
		height = height - offset;
		$(".panel-body").css('height', height + 'px');
	}

	loadPage(page: string) {
		this.current_path = '/' + page;
		this.fn.ea.publish('react', {event_name: 'toggle_aside'});
		var data = { files: this.files };
		this.startRender(data, this.base_dir);
	}

	openFolder(data: string) {
		if (data == "...") {
			this.step_back();
		} else {
			this.step_into(data);
		}
	}

	openFile(file: any) {
		var types = {
			'mp3': 'loadMusicFile',
			'mp4': 'loadVideoFile'
		}
		var ext = file.substring(file.lastIndexOf('.') + 1);
		var event = types[ext];
		var data = {
				selected:  this.current_path + '/' + file,
				all_files: this.visible_files,
				path: this.current_path + '/',
				original: file
		};
		this.fn.ea.publish('react', {event_name: event, data: data});
	}

	selectFolder(index: number) {
		var elem = $($('.icon-block[block-type="folder"]')[index]);
		this.select_block(elem, index, 'folder');
	}

	selectFile(index: number) {
		var elem = $($('.icon-block[block-type="file"]')[index]);
		this.select_block(elem, index, 'file');
	}

	onModalClose(data: any) {
		switch (data.modal) {
			case 'edit_fname':
				this.rename_file(this.selected_objects[0], data.content.fname);
				break;
			case 'add_folder':
				this.add_new_folder(data.content.fname);
				break;
		}
	}

}
