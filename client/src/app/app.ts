import {inject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {SessionData} from './models/session';
import {FnTs} from './models/FnTs';

@inject(Router, SessionData, FnTs)
export class App {

    app_events: any;

    //APPLICATION LOAD FUNCTIONS
    constructor(private router: Router, private session: SessionData, private fn: FnTs) {
        this.loadRouter();
        this.loadEventListener();
        this.loadAutoSocket();
        this.appLoaded();
    }

    private loadRouter() {
        this.router.configure((config: RouterConfiguration): RouterConfiguration => {
            config.title = "CPK Media";
            config.map([
                { route: ['', 'files'], name: 'files', moduleId: './views/files/files', nav: true, title: 'Files' },
                { route: ['music'], name: 'music', moduleId: './views/music/music', nav: true, title: 'Music' },
                { route: ['videos'], name: 'videos', moduleId: './views/videos/videos', nav: true, title: 'Videos' },
                { route: ['pictures'], name: 'pictures', moduleId: './views/pictures/pictures', nav: true, title: 'Images' },
            ]);
            return config;
        });
    }

    loadEventListener() {
		this.app_events = this.fn.ea.subscribe('react', (event: any) => {
            if (this[event.event_name] != null) { this[event.event_name](event.data); }
        });
    }

    loadAutoSocket() {
        //defer loading so not to interfere with application load
        setTimeout(() => {
            //manually load script to compensate for raspbian / aurelia polyfill
            $.getScript('socket.io/socket.io.js', (data) => {
                $("#socket_io").text(data);
                if (localStorage['device_name'] != null) {
                    var iosocket = io.connect();
                    iosocket.on("connect", () => {
                        iosocket.emit("register_device", {device: localStorage['device_name']});
                        iosocket.on("auto_action", this.automate);
                    });
                }
            });
        }, 5000);
    }

    private appLoaded() {
        this.handleResize();
    }

    //APP EVENTS

    toggle_header = () => {
        $(".collapse").toggle();
    }

    toggle_aside = () => {
        this.session.visibility.aside = 'stage';
        setTimeout(() => {
            this.session.visibility.aside = 'slide';
        }, 10);
    }

    private handleResize(): void {
        var resizeTimeout;
        $(window).resize(() => {
            if (!!resizeTimeout) { resizeTimeout = null; }
            resizeTimeout = setTimeout(() => {
                var data = {
                    height: $(window).height(),
                    width: $(window).width()
                };
                this.fn.ea.publish('react', {event_name: 'screenResize', data: data});
            }, 100);
        });
    }

    automate = (data: any) => {
        this.fn.ea.publish('react', {event_name: 'receiveCommand', data: data})
    }
}
