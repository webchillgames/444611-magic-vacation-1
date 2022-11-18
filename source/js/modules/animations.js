export default () => {
  const body = document.querySelector(`body`);
  const pageContent = document.querySelector(`.page-content`);

  const prizeMenuLink = document.querySelector(`[data-href="prizes"]`);

  const rulesPage = document.querySelector(`.rules`);
  const buttonGo = document.querySelector(`.rules__link`);
  const gamePage = document.querySelector(`.game`);

  if (!prizeMenuLink || !pageContent) {
    return;
  }

  const coverBlock = document.createElement(`div`);
  coverBlock.classList.add(`cover-block`);

  window.addEventListener(`load`, () => {
    body.classList.add(`page-loaded`);

    pageContent.appendChild(coverBlock);

    if (window.location.hash === `#rules`) {
      gamePage.classList.add(`active`);
    }

    if (window.location.hash === `#story`) {
      prizeMenuLink.addEventListener(`click`, changeTransitionByLink);
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
};
