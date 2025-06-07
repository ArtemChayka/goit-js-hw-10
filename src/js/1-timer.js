
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let countdownInterval = null;


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;


// flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: "Y-m-d H:i",
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if (selectedDate) {
            const now = new Date();

            if (selectedDate <= now) {
                iziToast.error({
                    message: 'Please choose a date in the future',
                    position: 'topRight',
                });
                startButton.disabled = true;
                userSelectedDate = null;
            } else {
                userSelectedDate = selectedDate;
                startButton.disabled = false;
            }
        }
    },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerDisplay(timeLeft) {
    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}

function startCountdown() {
    if (!userSelectedDate) return;

    startButton.disabled = true;
    datetimePicker.disabled = true;
    datetimePicker.classList.add('timer-running');


    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const targetTime = userSelectedDate.getTime();
        const timeLeft = targetTime - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            updateTimerDisplay(0);

            datetimePicker.disabled = false;
            return;
        }

        updateTimerDisplay(timeLeft);
    }, 1000);
}

startButton.addEventListener('click', startCountdown);

updateTimerDisplay(0);