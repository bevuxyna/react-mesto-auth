export class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkServerResponse(res){
        //Проверка ответа сервера
        if (res.ok) {
            return res.json();
        }
        //Отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Обновление аватара пользователя
    updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Редактирование профиля
    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Добавление новой карточки
    sendCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Удаление карточки
    deleteCard(cardID) {
        return fetch(`${this._url}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Постановка лайка
    setLike(cardID) {
        return fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then((res) => this._checkServerResponse(res));
    }

    //Снятие лайка
    deleteLike(cardID) {
        return fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._checkServerResponse(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.setLike(cardId);
        } else {
            return this.deleteLike(cardId);
        }
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40/',
    headers: {
        authorization: '051d708c-058c-4034-9252-0a36ac6463d7',
        'Content-Type': 'application/json',
    },
});

export default api;