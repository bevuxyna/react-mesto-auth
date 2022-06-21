import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import React, {useState, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
  }, [])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
            closeAllPopups();
      }
  }

  //закрытие попапов по Esc
  function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }

  useEffect(() => {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
  }, []);


  function handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then((res) => {
                //обновляем стейт currentUser из полученных данных
                setCurrentUser(res);

                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

  function handleUpdateAvatar(data) {
        api.updateAvatar(data)
            .then(res => {
                //обновляем стейт currentUser из полученных данных
                setCurrentUser(res);

                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

  function handleCardLike(card) {
      // Проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(item => item._id === currentUser._id);

      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)
          .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
                console.log(`Ошибка ${err}`);
          })
  }

  function handleCardDelete(card) {
      api.deleteCard(card._id)
          .then(() => {
                //обновление стейта cards с помощью метода filter: создаём копию массива, исключив из него удалённую карточку
                setCards((state) => state.filter((c) => c._id !== card._id && c));
          })
          .catch((err) => {
                console.log(`Ошибка ${err}`);
          })
  }

  function handleAddPlaceSubmit(data) {
      api.sendCard(data)
          .then((newCard) => {
              //обновляем стейт cards с помощью расширенной копии текущего массива
              setCards([newCard, ...cards]);

              closeAllPopups();
          })
          .catch((err) => {
              console.log(`Ошибка ${err}`);
          })
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page__container">
              <div className="page">
                  <Header />

                  <Main
                      cards={cards}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                  />

                  <Footer />

                  <EditProfilePopup
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      onOverlayClose={handleOverlayClose}
                  />

                  <EditAvatarPopup
                      isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      onOverlayClose={handleOverlayClose}
                  />

                  <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                      onOverlayClose={handleOverlayClose}
                  />

                  <ImagePopup
                      card={selectedCard}
                      onClose={closeAllPopups}
                      onOverlayClose={handleOverlayClose}
                  />
              </div>
          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
