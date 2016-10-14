export class Utilities {
    // sequencing functions
    public afterSeries(times: number, func: Function): Function {
        return () => {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    // event listener functions
    private events: any = [];
    public addEventListener(event: string, caller: string, callback: Function): void {
        if (this.events[event] == null) {
            this.events[event] = [];
            this.events[event].count = 0;
        }
        if (this.events[event][caller] == null) {
            this.events[event][caller] = callback;
            this.events[event].count++;
        }
    }
    public dropEventListener(event: string, caller: string): void {
        if (this.events[event] != null) {
            if (this.events[event][caller] != null) {
                delete this.events[event][caller];
                this.events[event].count--;
            }
        }
    }
    public fireEvent(event: string, data: any = null): void {
        if (this.events[event] != null) {
            var keys = Object.keys(this.events[event]);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "count") {
                    if (data != null) {
                        this.events[event][key](data);
                    } else {
                        this.events[event][key]();
                    }
                };
            }
        }
    }
    public fireException(data: any): void {
        this.fireEvent("exception", data);
    }
}