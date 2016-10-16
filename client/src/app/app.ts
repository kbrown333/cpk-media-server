import {inject} from "aurelia-framework";
import {Router, RouterConfiguration} from "aurelia-router";

@inject(Router)
export class App {

    constructor(private router: Router) {
        this.loadRouter();
        this.appLoaded();
    }

    private loadRouter() {
        this.router.configure((config: RouterConfiguration): RouterConfiguration => {
            config.title = "CPK Media";
            config.map([
                { route: ['', 'dash'], name: 'dash', moduleId: './views/dashboard/dash', nav: true, title: 'Dashboard' },

            ]);
            return config;
        });
    }

    private appLoaded() {
        
    }
}