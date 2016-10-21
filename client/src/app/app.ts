import {inject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";
import {Utilities} from './models/utilities';
import {SessionData} from './models/session';

@inject(Router, Utilities, SessionData)
export class App {

    //APPLICATION LOAD FUNCTIONS

    constructor(private router: Router, private utils: Utilities, private session: SessionData) {
        this.loadRouter();
        this.appLoaded();
    }

    private loadRouter() {
        this.router.configure((config: RouterConfiguration): RouterConfiguration => {
            config.title = "CPK Media";
            config.map([
                { route: ['', 'dash'], name: 'dash', moduleId: './views/dashboard/dash', nav: true, title: 'Dash' },
                { route: ['files'], name: 'files', moduleId: './views/files/files', nav: true, title: 'Files' },
                { route: ['music'], name: 'music', moduleId: './views/music/music', nav: true, title: 'Music' },
                { route: ['pictures'], name: 'pictures', moduleId: './views/pictures/pictures', nav: true, title: 'Images' },
                { route: ['videos'], name: 'videos', moduleId: './views/videos/videos', nav: true, title: 'Videos' },
            ]);
            return config;
        });
    }

    private appLoaded() {
        this.utils.addEventListener('toggle_aside', 'app.ts', () => {
            this.toggle_aside();
        });        
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
}