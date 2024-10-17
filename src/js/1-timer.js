// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

let userSelectedDate = null;
const startButton = document.querySelector('button[data-start]');
const inputTime = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      startButton.classList.add('disabled-button');
      startButton.disabled = true;      
      iziToast.show({
        icon: 'icon-person',
        message: '❌ Please choose a date in the future',
        color: 'red',
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        closeOnClick: true,
        displayMode: 'replace', // once, replace
        timeout: 5000,
      });
    } else {
      const toast = document.querySelector('.iziToast'); 
      iziToast.hide({}, toast);

      startButton.classList.remove('disabled-button');
      startButton.disabled = false;
    }    
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.classList.add('disabled-button');
  startButton.disabled = true;
  inputTime.disabled = true;
  let remaining = null;
  let remainingTime = null;
  const days = document.querySelector('span[data-days]');
  const hours = document.querySelector('span[data-hours]');
  const minutes = document.querySelector('span[data-minutes]');
  const seconds = document.querySelector('span[data-seconds]');

  const intervalId = setInterval(() => {
    remaining = userSelectedDate.getTime() - Date.now();
    remainingTime = convertMs(remaining);    

    if (remaining > 0) {
      days.textContent = addLeadingZero(remainingTime.days.toString());
      hours.textContent = addLeadingZero(remainingTime.hours.toString());
      minutes.textContent = addLeadingZero(remainingTime.minutes.toString());
      seconds.textContent = addLeadingZero(remainingTime.seconds.toString());
    } else {
      clearInterval(intervalId);
      inputTime.disabled = false;
    }
  }, 1000);
});
