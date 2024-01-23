const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "a150d504-641a-4496-ac6e-7f2c106c23a9",
    "Content-Type": "application/json",
  },
};
function handleResponse(response) {
  if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

  return response.json();
}

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me `, { headers: config.headers }).then(
    handleResponse
  );
};

const updateUserData = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(handleResponse);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    handleResponse
  );
};

const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export {
  getUserData,
  updateUserData,
  getInitialCards,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
  updateAvatar,
};
