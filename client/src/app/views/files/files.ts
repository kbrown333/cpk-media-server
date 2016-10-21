import {inject} from 'aurelia-framework';
import {Utilities} from '../../models/utilities';

@inject(Utilities)
export class Files {
	
	files: any;
	directory: any = {};
	current_path: string = '/music';
	display_path: string = 'music';
	visible_folders: any;
	visible_files: any;
	cntl_enabled: boolean = false;
    aside_links: any = [
        {name: 'Music', event: 'load_page', data: 'music'},
        {name: 'Videos', event: 'load_page', data: 'videos'},
        {name: 'Pictures', event: 'load_page', data: 'pictures'},
        {name: 'Documents', event: 'load_page', data: 'documents'}
    ];

	constructor(private utils: Utilities) {
		this.get_files();
	}

	attached() {		
		this.utils.addEventListener('screen_resize', 'files.ts', (res: any) => {
			this.set_height(res.height);
		});		
		this.utils.addEventListener('open_folder', 'files.ts', (data: string) => {
			if (data == "...") {
				this.step_back();
			} else {
				this.step_into(data);
			}
		});
		this.utils.addEventListener('select_folder', 'files.ts', (index: number) => {
			var elem = $($('.icon-block[block-type="folder"]')[index]);
			this.select_block(elem, index, 'folder');
			var x = 1;
		});
		this.utils.addEventListener('select_file', 'files.ts', (index: number) => {
			var elem = $($('.icon-block[block-type="file"]')[index]);
			this.select_block(elem, index, 'file');
			var x = 1;
		});
		this.utils.addEventListener('load_page', 'files.ts', (data: string) => {
			this.current_path = '/' + data;
			this.display_path = data;
			this.utils.fireEvent('toggle_aside');
			this.load_dir();

		});
		this.set_height();
		$('body').keydown((event: JQueryEventObject) => {
			if (event.which == 17) {
				this.cntl_enabled = true;
			}
		});
		$('body').keyup((event: JQueryEventObject) => {
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

	set_height(height: number = null): void {		
		if (height == null) { height = $(window).height(); }
		height = height - 160;
		$(".panel-body").css('height', height + 'px');
	}

	get_files(): void {
		this.utils.ajax.get({
			path: '/files/files_list',
			callback: (data: any) => {
				this.load_files(data);
				this.load_dir();
			},
			error: (err: any) => {
				alert('Error loading files');
			}
		});
	}

	load_files = (data: any) => {
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
							dir[str_j] = {'...': {}};
						} else {
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
	}

	load_dir(): void {
		var files = [], folders = [];
		var dir = this.get_directory();
		if (dir != null) {
			if (dir['_files_'] != null) { files = dir['_files_']; }
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

	register_drag_drop(): void {
		$(".drag_me").draggable({revert: true});
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

	get_directory(): any {
		var dir = this.directory;
		var tmp = this.current_path.split('/');
		var path;
		for (var i = 1; i < tmp.length; i++) {
			path = tmp[i];
			dir = dir[path];
		}
		return dir;
	}

	step_into(folder: string): void {
		this.current_path += "/" + folder;
		this.load_dir();
	}

	step_back(): void {
		var tmp = this.current_path.split('/');
		var path = "";
		for (var i = 1; i < tmp.length - 1; i++) {
			path += "/" + tmp[i];
		}
		this.current_path = path;
		this.load_dir();
	}

	select_block(elem: any, index: number, type: string): void {	
		var selected;	
		if (this.cntl_enabled) {
			if (elem.hasClass('selected_block')) {
				elem.removeClass('selected_block');
				selected = true;
			} else {
				elem.addClass('selected_block');
				selected = false;
			}
		} else {
			if (elem.hasClass('selected_block')) {
				$(".icon-block").removeClass('selected_block');
				selected = true;
			} else {
				$(".icon-block").removeClass('selected_block');
				elem.addClass('selected_block');
				selected = false;
			}
		}
	}

}