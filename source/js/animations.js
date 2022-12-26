export default () => {
  const body = document.querySelector(`body`);
  const pageContent = document.querySelector(`.page-content`);

  // PRIZES
  const prizeMenuLink = document.querySelector(`[data-href="prizes"]`);
  const prizesTitle = document.querySelector(`.prizes__title`);

  // RULES
  const buttonGo = document.querySelector(`.rules__link`);
  const rulesMenuLink = document.querySelector(`[data-href="rules"]`);


  // INTRO
  const introTitle = document.querySelector(`.intro__title`);
  const introInfo = document.querySelector(`.intro__info`);
  const introDate = document.querySelector(`.intro__date`);

  const sliderTitle = document.querySelector(`.slider__item-title`);
  const coverBlock = createEl({tag: `div`, cssClass: `cover-block`});

  // SCREENS
  const storyPage = document.querySelector(`.screen--story`);
  const introPage = document.querySelector(`.screen--intro`);
  const prizesPage = document.querySelector(`.screen--prizes`);
  const gamePage = document.querySelector(`.screen--game`);
  const rulesPage = document.querySelector(`.screen--rules`);

  // SLIDER
  const sliderControls = document.querySelectorAll(`.slider__control`);
  const swiper = document.querySelector(`.js-slider`).swiper;

  const changeClass = {
    remove(el, cl) {
      el.classList.remove(cl);
    },
    add(el, cl) {
      el.classList.add(cl);
    }
  };

  window.addEventListener(`load`, () => {
    document.body.classList.add(`page-loaded`); // анимируется header
    pageContent.appendChild(coverBlock);

    // INTRO
    if (window.location.hash === `#top` || window.location.hash === ``) {
      changeClass.add(introPage, `animated`);

      setTimeout(() => {
        introTitle.classList.add(`title-animated`);
      }, 495);

      setTimeout(() => {
        introInfo.classList.add(`title-animated`);
      }, 1485);
    }

    // STORY
    if (window.location.hash === `#story`) {
      setModeBySliderChage();
      prizeMenuLink.addEventListener(`click`, changeTransitionByLink);

      changeClass.add(storyPage, `animated`);
      changeClass.add(sliderTitle, `title-animated`);
    }

    // PRIZES
    if (window.location.hash === `#prizes`) {
      changeClass.add(prizesPage, `animated`);
      changeClass.add(prizesTitle, `title-animated`);
      rulesMenuLink.addEventListener(`click`, changeTransitionByLinkRules);
    }

    // RULES

    if (window.location.hash === `#rules`) {
      changeClass.add(buttonGo, `btn-animated`);
      changeClass.add(rulesPage, `animated`);

      buttonGo.addEventListener(`transitionend`, () => {
        changeClass.remove(buttonGo, `btn-animated`);
      }); // зачем удалять класс?

      slideInDisclaimer();
    }

    // GAME

    if (window.location.hash === `#game`) {
      changeClass.add(gamePage, `animated`);
    }
  });

  window.addEventListener(`hashchange`, (e) => {
    const from = getHash(e.oldURL);
    const to = getHash(e.newURL);

    // INTRO
    if (to === `top` || to === ``) {
      changeClass.add(introPage, `animated`);

      setTimeout(() => {
        changeClass.add(introTitle, `title-animated`);
      }, 495);

      setTimeout(() => {
        changeClass.add(introInfo, `title-animated`);
      }, 1485);

    } else {
      changeClass.remove(introPage, `animated`);
      changeClass.remove(introTitle, `title-animated`);
      changeClass.remove(introInfo, `title-animated`);
    }

    // STORY

    if (to === `story`) {
      setModeBySliderChage();
      changeClass.add(storyPage, `animated`);
      changeClass.add(sliderTitle, `title-animated`);
      prizeMenuLink.addEventListener(`click`, changeTransitionByLink);
    } else {
      deleteSliderModeClasses();
      changeClass.remove(storyPage, `animated`);
      changeClass.remove(sliderTitle, `title-animated`);
      prizeMenuLink.removeEventListener(`click`, changeTransitionByLink);
    }

    // PRIZES

    if (to !== `prizes` || (to === `prizes` && from !== `story`)) {
      changeClass.remove(coverBlock, `active`);
    }

    if (to === `prizes`) {
      changeClass.add(prizesPage, `animated`);
      changeClass.add(prizesTitle, `title-animated`);
      rulesMenuLink.addEventListener(`click`, changeTransitionByLinkRules);
    } else {
      rulesMenuLink.removeEventListener(`click`, changeTransitionByLinkRules);
      changeClass.remove(prizesPage, `animated`);
      changeClass.remove(prizesTitle, `title-animated`);
    }

    // RULES

    if (to === `rules` && from !== `prizes`) {
      slideInDisclaimer();
    }


    if (to === `rules`) {
      changeClass.add(buttonGo, `btn-animated`);
      changeClass.add(rulesPage, `animated`);

      buttonGo.addEventListener(`transitionend`, () => {
        changeClass.remove(buttonGo, `btn-animated`);
      }); // зачем удалять класс?
    } else {
      changeClass.remove(buttonGo, `btn-animated`);
      changeClass.remove(rulesPage, `animated`);
    }

    if (from === `rules`) {
      const disclaimer = document.querySelector(`.screen__disclaimer`);
      if (disclaimer) {
        pageContent.removeChild(disclaimer);
      }
    }

    // GAME

    if (to === `game`) {
      changeClass.add(gamePage, `animated`);
    } else {
      changeClass.remove(gamePage, `animated`);
    }
  });

  function setModeBySliderChage() {
    if (swiper && sliderControls) {
      if (swiper.activeIndex === 0) {
        changeClass.add(body, `slider-mode-purple`);
      } else {
        changeClass.remove(body, `slider-mode-purple`);
      }

      sliderControls.forEach((control) => {
        control.addEventListener(`click`, () => {
          if (swiper.activeIndex === 0) {
            changeClass.add(body, `slider-mode-purple`);
          } else {
            changeClass.remove(body, `slider-mode-purple`);
          }

          if (swiper.activeIndex === 2) {
            changeClass.add(body, `slider-mode-blue`);
          } else {
            changeClass.remove(body, `slider-mode-blue`);
          }

          if (swiper.activeIndex === 4) {
            changeClass.add(body, `slider-mode-light`);
          } else {
            changeClass.remove(body, `slider-mode-light`);
          }

          if (swiper.activeIndex === 6) {
            changeClass.add(body, `slider-mode-dark`);
          } else {
            changeClass.remove(body, `slider-mode-dark`);
          }
        });
      });
    }
  }

  function deleteSliderModeClasses() {
    const classNames = body.classList;
    for (let className of classNames) {
      if (className.startsWith(`slider-mode`)) {
        body.classList.remove(className);
      }
    }
  }

  function slideInDisclaimer() {
    pageContent.appendChild(createDisclaimer());

    const disclaimer = document.querySelector(`.screen__disclaimer`);
    disclaimer.style.transform = `translate3d(0, 100%, 0)`;
    document.querySelector(`.screen__disclaimer ul`).style.opacity = 0;
    disclaimer.style.transition = `all 0.3s`;

    setTimeout(() => {
      disclaimer.style.transform = `translate3d(0, 0, 0)`;
      document.querySelector(`.screen__disclaimer ul`).style.opacity = 1;
    }, 200);

  }

  function changeTransitionByLink(e) {
    e.preventDefault();
    coverBlock.classList.add(`active`);

    window.setTimeout(() => {
      window.location.hash = `#prizes`;
      coverBlock.classList.remove(`active`);
    }, 1000);
  }


  function changeTransitionByLinkRules(e) {
    e.preventDefault();

    document.querySelector(`.screen--prizes .screen__footer-note p`).style.opacity = 0;

    pageContent.appendChild(createDisclaimer());

    const disclaimer = document.querySelector(`.screen__disclaimer`);

    if (disclaimer) {
      setTimeout(() => {
        changeClass.add(disclaimer, `disclaimer-fade-in`);
      }, 198);
    }

    setTimeout(() => {
      window.location.hash = `#rules`;
    }, 1023);
  }

  function getHash(url) {
    return url.split(`#`)[1];
  }

  function setLettersAnimation(el, options) {

    const separatedText = el.textContent.trim(``);

    el.innerText = ``;
    el.classList.add(`text-animation`);

    function wrapToSpan(d) {
      const mainSpanEl = document.createElement(`span`);
      mainSpanEl.classList.add(`text-animation__word`);

      d.forEach((char, i) => {
        if (char !== ` `) {
          const spanEl = document.createElement(`span`);
          spanEl.innerHTML = char;
          spanEl.classList.add(`text-animation__char`);

          if (d[i + 1] === ` `) {
            spanEl.style.marginRight = `1rem`;
          }

          mainSpanEl.appendChild(spanEl);
        } else {
          return;
        }
      });

      el.appendChild(mainSpanEl);
    }

    if (options.stringsQuanity === 1) {
      wrapToSpan(separatedText.split(``));
    } else {
      options.separatorsIdx.map((idx) => {
        separatedText.split(separatedText[idx]).map((str) => {
          wrapToSpan(str.split(``));
        });
      });
    }

    el.querySelectorAll(`.text-animation__char`).forEach((v, i) => {
      v.style.transitionDelay = options.animationOptions[i].delay + `s`;
      v.style.transitionDuration = options.animationOptions[i].duration + `s`;
    });
  }

  function createEl(options) {
    const {tag, cssClass} = options;
    const blockEl = document.createElement(tag);

    if (cssClass) {
      blockEl.classList.add(cssClass);
    }

    return blockEl;
  }

  function createDisclaimer() {
    const screenDisclaimerEl = createEl({tag: `div`, cssClass: `screen__disclaimer`});
    const disclaimerEl = createEl({tag: `div`, cssClass: `disclaimer`});
    const listEl = createEl({tag: `ul`, cssClass: ``});
    const disclaimerLinks = [
      {id: 1, title: `Правовая информация`, link: `#`},
      {id: 2, title: `Подробные правила`, link: `#`}
    ];

    for (let i = 0; i < disclaimerLinks.length; i++) {
      const itemEl = createEl({tag: `li`, cssClass: ``});
      const aEl = createEl({tag: `a`, cssClass: ``});
      aEl.setAttribute(`href`, disclaimerLinks[i].link);
      aEl.textContent = disclaimerLinks[i].title;
      aEl.style.textDecoration = `none`;
      itemEl.appendChild(aEl);
      listEl.appendChild(itemEl);
    }

    disclaimerEl.appendChild(listEl);
    screenDisclaimerEl.appendChild(disclaimerEl);

    return screenDisclaimerEl;
  }


  setLettersAnimation(introTitle, {
    stringsQuanity: 2, separatorsIdx: [12], animationOptions: [
      // т
      {delay: 0.132, duration: 0.495},
      // а
      {delay: 0.066, duration: 0.429},
      // и
      {delay: 0, duration: 0.429},
      // н
      {delay: 0.066, duration: 0.429},
      // с
      {delay: 0.132, duration: 0.429},
      // т
      {delay: 0.066, duration: 0.429},
      // в
      {delay: 0, duration: 0.429},
      // е
      {delay: 0.231, duration: 0.429},
      // н
      {delay: 0.132, duration: 0.429},
      // н
      {delay: 0, duration: 0.429},
      // ы
      {delay: 0.132, duration: 0.429},
      // й
      {delay: 0.033, duration: 0.429},

      // о
      {delay: 0.363, duration: 0.429},
      // т
      {delay: 0.429, duration: 0.429},
      // п
      {delay: 0.33, duration: 0.429},
      // у
      {delay: 0.264, duration: 0.429},
      // с
      {delay: 0.363, duration: 0.429},
      // к
      {delay: 0.297, duration: 0.429}
    ]
  });

  setLettersAnimation(introDate, {
    stringsQuanity: 1, separatorIdx: null, animationOptions: [
      // 0
      {delay: 0.132, duration: 0.33},
      // 1
      {delay: 0.099, duration: 0.33},
      // -
      {delay: 0.099, duration: 0.33},
      // 3
      {delay: 0.165, duration: 0.33},
      // 1
      {delay: 0.066, duration: 0.33},
      // .
      {delay: 0.132, duration: 0.33},
      // 0
      {delay: 0.099, duration: 0.33},
      // 5
      {delay: 0.198, duration: 0.33},
      // /
      {delay: 0.099, duration: 0.33},
      // 2
      {delay: 0.033, duration: 0.33},
      // 0
      {delay: 0.132, duration: 0.33},
      // 2
      {delay: 0.132, duration: 0.33},
      // 2
      {delay: 0.132, duration: 0.33},
      // 0
      {delay: 0.66, duration: 0.33},
    ]
  });

  setLettersAnimation(sliderTitle, {
    stringsQuanity: 1, separatorIdx: null, animationOptions: [
      // И
      {delay: 0.165, duration: 0.33},
      // С
      {delay: 0.066, duration: 0.33},
      // Т
      {delay: 0.033, duration: 0.33},
      // О
      {delay: 0.066, duration: 0.33},
      // Р
      {delay: 0.099, duration: 0.33},
      // И
      {delay: 0.066, duration: 0.33},
      // Я
      {delay: 0.033, duration: 0.33}
    ]
  });

  setLettersAnimation(prizesTitle, {
    stringsQuanity: 1, separatorIdx: null, animationOptions: [
      // П
      {delay: 0.165, duration: 0.33},
      // Р
      {delay: 0.066, duration: 0.33},
      // И
      {delay: 0.033, duration: 0.33},
      // З
      {delay: 0.066, duration: 0.33},
      // Ы
      {delay: 0.132, duration: 0.33}
    ]
  });
};
