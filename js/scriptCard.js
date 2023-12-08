'use strict';

const API_URL = 'https://oceanic-scrawny-governor.glitch.me/';
// const API_URL = 'http://localhost:3000/';

const card = document.querySelector('.card');
const cardTitle = document.querySelector('.card__title');
const cartContacts = document.querySelector('.card__contacts');

const cardTo = document.querySelector('.card__to');
const cardFrom = document.querySelector('.card__from');
const cardImage = document.querySelector('.card__img');
const cardMessage = document.querySelector('.card__message');

const rearrangeElement = () => {
  const screenWidth = window.innerWidth;


  if (screenWidth <= 580) {
    card.after(cartContacts);
  } else {
    cardTitle.after(cartContacts);
  }
};
const getIdFromUrl = () => {
  const params = new URLSearchParams(location.search);
  return params.get('id');
};

const getGiftData = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/gift/${id}`);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Открытка не найдена')
    }
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  rearrangeElement();
  window.addEventListener('resize', rearrangeElement);

  const id = getIdFromUrl();
  if (id) {
    const data = await getGiftData(id);

    if (data) {
      cardTo.textContent = data.receiver_name;
      cardFrom.textContent = data.sender_name;
      cardImage.src = `img/${data.card}.jpg`;
      const formattedMessage = data.message.replaceAll('\n', '<br>');
      cardMessage.innerHTML = formattedMessage;
    }
  }
};

init();
