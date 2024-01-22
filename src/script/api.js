const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "a150d504-641a-4496-ac6e-7f2c106c23a9",
    "Content-Type": "application/json",
  },
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me `, { headers: config.headers }).then(
    (response) => {
      if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

      return response.json();
    }
  );
};

const updateUserData = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((response) => {
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

    return response.json();
  });
};

const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar })
  }).then((response) => {
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

    return response.json();
  });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    (response) => {
      if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

      return response.json();
    }
  );
};

const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((response) => {
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

    return response.json();
  });
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

    return response.json();
  });
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

    return response.json();
  });
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) return Promise.reject(`Ошибка: ${response.status}`);

    return response.json();
  });
};

export {
  getUserData,
  updateUserData,
  getInitialCards,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
  updateAvatar
};
