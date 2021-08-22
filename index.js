
class CountdownTimer {
    constructor({ targetDate, choosenTimer }) {
        this.choosenTimer = document.querySelector(choosenTimer);
        console.log(this.choosenTimer)
        this.targetDate = targetDate;
        this.refs = {
            daysRef: this.choosenTimer.querySelector('[data-value="days"]'),
            hoursRef: this.choosenTimer.querySelector('[data-value="hours"]'),
            minutesRef: this.choosenTimer.querySelector('[data-value="mins"]'),
            secondsRef: this.choosenTimer.querySelector('[data-value="secs"]'),
        };
        this.start()
    }

    start() {
        this.interval = setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.updateClockSpan(time)
        }, 1000)
    }

    pad(value) {
        return String(value).padStart(2, '0')
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs }

    }

    updateClockSpan({ days, hours, mins, secs }) {
        const time = this.targetDate - Date.now();
        if (time <= 0) {
            clearInterval(this.interval);
            return;
        }
        this.refs.daysRef.textContent = days;
        this.refs.hoursRef.textContent = hours;
        this.refs.minutesRef.textContent = mins;
        this.refs.secondsRef.textContent = secs;

        return
    }

}

const timer = new CountdownTimer({
    choosenTimer: '#timer-1',
    targetDate: new Date('August 31, 2021 24:00'),
})