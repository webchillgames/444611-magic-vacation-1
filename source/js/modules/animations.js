export default () => {
  const body = document.querySelector(`body`);
  const prizeMenuLink = document.querySelector(`[data-href="prizes"]`);
  const pageContent = document.querySelector(`.page-content`);

  if (!prizeMenuLink || !pageContent) {
    return;
  }

  const coverBlock = document.createElement(`div`);
  coverBlock.classList.add(`cover-block`);

  window.addEventListener(`load`, () => {
    body.classList.add(`page-loaded`);

    pageContent.appendChild(coverBlock);

    if (window.location.hash === `#story`) {
      prizeMenuLink.addEventListener(`click`, changeTransitionByLink);
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
