import React, { useState } from "react";
import "./Footer.scss";
import { toast, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState(""); // ✅ вместо телефона/связи
  const [modal, setModal] = useState(false);
  const nav = useNavigate();
  const { user } = useSelector((s) => s.userReducer);

  const clearForm = () => {
    setName("");
    setAnswer("");
  };

  const isEmpty = (val) => val.length === 0 || val.replaceAll(" ", "") === "";

  const sendToTelegram = () => {
    if (isEmpty(name) || isEmpty(answer)) {
      toast.error("Пожалуйста, заполните все поля!", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    const chat_id = "-1002708842759";
    const token = "7784579498:AAE4SwLV99YhzCxGvp8so-GaYdzWdQb7WrU";
    const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

    const userData = {
      chat_id,
      parse_mode: "HTML",
      text: `
<b>📋 Новая анкета</b>\n
<b>👤 Имя:</b> ${name}
<b>✅ Ответ:</b> ${answer}
      `,
    };

    axios
      .post(api_url, userData)
      .then(() => {
        toast.success("✅ Анкета отправлена в Telegram!", {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
          transition: Slide,
        });
        clearForm();
        setModal(false);
      })
      .catch(() => {
        toast.error("❌ Ошибка отправки", {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
          transition: Slide,
        });
      });
  };

  return (
    <div id="request">
      <div className="container">
        <div className="request">
          <h1>АНКЕТА</h1>
          <p>Тойго келериңиздин жообун берип коюуңузду суранабыз!</p>

          <button
            onClick={() => {
              if (user) {
                setModal(true);
              } else {
                toast.warn("⚠️ Войдите в аккаунт, чтобы заполнить анкету!", {
                  position: "bottom-right",
                  autoClose: 4000,
                  theme: "colored",
                  transition: Bounce,
                });
                nav("/");
              }
            }}
          >
            Заполнить анкету
          </button>
        </div>
      </div>

      {modal && (
        <div className="logout-modal">
          <div className="logout-modal__content">
            <div className="logout-modal__buttons">
              <button className="a" onClick={() => setModal(false)}>
                X
              </button>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="options">
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value="Сөзсүз келем"
                    checked={answer === "Сөзсүз келем"}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  Сөзсүз келем
                </label>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value="Тилекке каршы, келе албайм"
                    checked={answer === "Тилекке каршы, келе албайм"}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  Тилекке каршы, келе албайм
                </label>
              </div>
            </div>

            <button onClick={sendToTelegram}>Отправить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
