// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (event.target.state.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${event.target.delay.value}ms`);
      } else {
        reject(`❌ Rejected promise in ${event.target.delay.value}ms`);
      }
    }, event.target.delay.value);
  });

  promise
    .then(value => {
      iziToast.show({
        icon: 'icon-person',
        message: `${value}`,
        color: 'green',
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        timeout: 5000,
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
        timeout: 5000,
      });
    });
}
