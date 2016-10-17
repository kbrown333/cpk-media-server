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
                { route: ['', 'dash'], name: 'dash', moduleId: './views/dashboard/dash', nav: true, title: 'Dashboard' },
                { route: ['files'], name: 'files', moduleId: './views/files/files', nav: true, title: 'Files' },
            ]);
            return config;
        });
    }

    private appLoaded() {
        
    }

    //APP EVENTS

    toggle_header = () => {
        $(".collapse").toggle();
    }

    toggle_aside = () => {
        if (this.session.visibility.aside == 'hide') {
            this.session.visibility.aside = 'show';
        } else {
            this.session.visibility.aside = 'hide';
        }
    }
}