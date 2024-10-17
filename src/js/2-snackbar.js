// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const delay = event.target.delay.value;
  const state = event.target.state.value;
  const userPromise = createPromise(delay, state);
  userPromise
    .then(value => {
      iziToast.show({
        icon: 'icon-person',
        message: `${value}`,
        color: 'green',
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        timeout: 3000,
      });
    })
    .catch(error => {
      iziToast.show({
        icon: 'icon-person',
        message: `${error}`,
        color: 'red',
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        timeout: 3000,
      });
    }); 
}
