import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

/**generate from here:
 * https://dmkcode.com/2016/08/simple-timer-using-angular-2-and-rxjs/
 */


@Component({
    selector: 'timer',
    templateUrl: 'timer.html'
})
export class TimerComponent {

    constructor() {

    }
    ticks = 0;

    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;

    sub: Subscription;

    public getTime() {
        return {
            'seconds': +this.secondsDisplay + 0.5,//add one to fix the pause, the first '+' is to tall the TS that 'secondsDisplay' is number
            'minutes': this.minutesDisplay,
            'hours': this.hoursDisplay
        };
    }

    public resetTimer() {
        this.secondsDisplay = 0;
        this.minutesDisplay = 0;
        this.hoursDisplay = 0;
    }

    public startTimer() {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;

                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
            }
        );
    }

    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
        return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }
}
