document.addEventListener("DOMContentLoaded", (e) => {
  const showPopup = (trigger, selector, modalSelector, closeSelector) => {
    const btns = document.querySelectorAll(trigger);
    const popup = document.querySelector(selector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelectorAll(closeSelector);

    btns.forEach((item) => {
      item.addEventListener("click", () => {
        popup.style.display = "block";
        setTimeout(() => {
          modal.style.top = "0px";
        }, 0);
        document.querySelector("body").style.overflow = "hidden";
      });
    });

    close.forEach((item) => {
      item.addEventListener("click", () => {
        modal.style.top = "-350px";
        setTimeout(() => {
          popup.style.display = "none";
        }, 500);
        document.querySelector("body").style.overflow = "visible";
      });
    });
  };

  const sliderFunction = (
    selectorSlider,
    selectorSlides,
    selectorTabs,
    selectorTabNumber
  ) => {
    const slider = document.querySelector(selectorSlider);
    const slides = document.querySelectorAll(selectorSlides);
    const tabs = document.querySelectorAll(selectorTabs);
    const tabNumber = document.querySelector(selectorTabNumber);
    let value = 0;
    let index = 0;

    const sliderInterval = () => {
      tabs.forEach((tab) => {
        tab.style.color = "black";
      });

      index++;
      if (tabs.length <= index) index = 0;
      tabs[index].style.color = "white";

      tabNumber.innerHTML = `${index + 1}/5`;

      if (value <= -300 * 4) value = 300;
      value -= 300;
      slider.style.top = value + "px";
    };

    let startSlider = setInterval(sliderInterval, 2000);
    slider.addEventListener("mouseover", () => {
      clearInterval(startSlider);
    });
    slider.addEventListener("mouseout", () => {
      startSlider = setInterval(sliderInterval, 2000);
    });

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        let dataSlide = e.target.getAttribute("data-slide");
        clearInterval(startSlider);

        value = (+dataSlide - 1) * -300;
        index = dataSlide - 1;
        sliderInterval();
      });
    });
  };

  const moreInformationCard = (selectorTriggers) => {
    const triggers = document.querySelectorAll(selectorTriggers);
    const defaultHeight = "220px";

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (e.target.parentNode.parentNode.style.height == "290px") {
          triggers.forEach(
            (item) => (item.parentNode.parentNode.style.height = defaultHeight)
          );
        } else {
          triggers.forEach(
            (item) => (item.parentNode.parentNode.style.height = defaultHeight)
          );
          e.target.parentNode.parentNode.style.height = "290px";
        }
      });
    });
  };

  const burgerOpen = (selectorTrigger, selectorMenu) => {
    const trigger = document.querySelector(selectorTrigger);
    const menu = document.querySelector(selectorMenu);

    trigger.addEventListener("click", () => {
      if (menu.style.left == "0%") menu.style.left = "-120%";
      else menu.style.left = "0%";
    });
  };

  const validationForm = (
    nameInput,
    mobileInput,
    emailInput,
    selectorSubmit
  ) => {
    const name = document.querySelector(nameInput);
    const mobile = document.querySelector(mobileInput);
    const email = document.querySelector(emailInput);
    const submit = document.querySelector(selectorSubmit);

    name.addEventListener("blur", () => {
      if (!/^[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+$/g.test(name.value)) {
        name.style.borderColor = "red";
      } else name.style.borderColor = "white";
    });
    mobile.addEventListener("blur", () => {
      if (
        !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g.test(
          mobile.value
        )
      ) {
        mobile.style.borderColor = "red";
      } else mobile.style.borderColor = "white";
    });
    email.addEventListener("blur", () => {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)) {
        email.style.borderColor = "red";
      } else email.style.borderColor = "white";
    });
    submit.addEventListener("click", (e) => {
      e.preventDefault();

      const valueFilter = () => {
        if (
          name.value.length == 0 ||
          mobile.value.length == 0 ||
          email.value.length == 0
        )
          return false;
        else return true;
      };

      const borderFilter = () => {
        if (
          name.style.borderColor == "red" ||
          mobile.style.borderColor == "red" ||
          email.style.borderColor == "red"
        )
          return false;
        else return true;
      };

      if (!valueFilter() || !borderFilter()) {
        let div = document.createElement("div");
        div.innerHTML = "Некорректно введены данные";
        div.style.color = "red";
        div.classList.add("form__error");
        div.style.marginTop = "10px";
        document.querySelector(".popup-content").appendChild(div);
        setTimeout(() => document.querySelector(".form__error").remove(), 2000);
      } else {
        let div = document.createElement("div");
        div.innerHTML = "Форма успешно отправлена";
        div.style.color = "white";
        div.classList.add("form__suc");
        div.style.marginTop = "10px";
        document.querySelector(".popup-content").appendChild(div);
        setTimeout(() => document.querySelector(".form__suc").remove(), 2000);
      }
    });
  };

  showPopup(".slide__first-btn", ".popup", ".popup-content", ".popup-close");
  sliderFunction(
    ".slider__inner",
    ".slider__slide",
    ".tab__el",
    ".tab__number"
  );
  moreInformationCard(".card__btn");
  burgerOpen(".header__burger", ".burger__list");
  validationForm(
    'input[name="name"]',
    'input[name="phone"]',
    'input[name="email"]',
    ".button-order"
  );
});
