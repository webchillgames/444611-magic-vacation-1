export default () => {
  const pageContent = document.querySelector(`.page-content`);

  // PRIZES
  const prizeMenuLink = document.querySelector(`[data-href="prizes"]`);
  const prizesTitle = document.querySelector(`.prizes__title`);

  // RULES
  const rulesPage = document.querySelector(`.rules`);
  const buttonGo = document.querySelector(`.rules__link`);
  const gamePage = document.querySelector(`.game`);


  // INTRO
  const introTitle = document.querySelector(`.intro__title`);
  const introInfo = document.querySelector(`.intro__info`);
  const introDate = document.querySelector(`.intro__date`);

  const sliderTitle = document.querySelector(`.slider__item-title`);
  const coverBlock = createEl({tag: `div`, cssClass: `cover-block`});

  const storyPage = document.querySelector(`.screen--story`);

  window.addEventListener(`load`, () => {
    document.body.classList.add(`page-loaded`); // анимируется header

    pageContent.appendChild(coverBlock);

    if (window.location.hash === `#prizes`) {
      prizesTitle.classList.add(`animated`);
    }

    if (window.location.hash === `#top` || window.location.hash === ``) {
      setTimeout(() => {
        introTitle.classList.add(`animated`);
      }, 500);

      setTimeout(() => {
        introInfo.classList.add(`animated`);
      }, 1500);
    }

    if (window.location.hash === `#rules`) {
      gamePage.classList.add(`active`);
    }

    if (window.location.hash === `#story`) {
      prizeMenuLink.addEventListener(`click`, changeTransitionByLink);

      storyPage.classList.add(`animated`);
    }

    if (window.location.hash === `#rules`) {
      rulesPage.classList.add(`active`);
      buttonGo.classList.add(`animated`);

      buttonGo.addEventListener(`transitionend`, () => {
        buttonGo.classList.remove(`animated`);
      });
    }
  });

  window.addEventListener(`hashchange`, (e) => {
    const from = getHash(e.oldURL);
    const to = getHash(e.newURL);

    if (to === `story`) {
      prizeMenuLink.addEventListener(`click`, changeTransitionByLink);
    } else {
      prizeMenuLink.removeEventListener(`click`, changeTransitionByLink);
    }

    if (to !== `prizes` || (to === `prizes` && from !== `story`)) {
      coverBlock.classList.remove(`active`);
    }

    if (to === `prizes`) {
      prizesTitle.classList.add(`animated`);
    } else {
      prizesTitle.classList.remove(`animated`);
    }

    if (to === `rules`) {
      rulesPage.classList.add(`active`);

      buttonGo.classList.add(`animated`);

      buttonGo.addEventListener(`transitionend`, () => {
        buttonGo.classList.remove(`animated`);
      });
    } else {
      rulesPage.classList.remove(`active`);
      buttonGo.classList.remove(`animated`);
    }

    if (to === `game`) {
      gamePage.classList.add(`active`);
    } else {
      gamePage.classList.remove(`active`);
    }

    if (to === `top`) {

      setTimeout(() => {
        introTitle.classList.add(`animated`);
      }, 500);

      setTimeout(() => {
        introInfo.classList.add(`animated`);
      }, 1500);
    } else {

      introTitle.classList.remove(`animated`);
      introInfo.classList.remove(`animated`);
    }

    if (to === `story`) {
      storyPage.classList.add(`animated`);
    } else {
      storyPage.classList.remove(`animated`);
    }
  });

  function changeTransitionByLink(e) {
    e.preventDefault();
    coverBlock.classList.add(`active`);

    window.setTimeout(() => {
      window.location.hash = `#prizes`;
      coverBlock.classList.remove(`active`);
    }, 1000);
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
    blockEl.classList.add(cssClass);

    return blockEl;
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
