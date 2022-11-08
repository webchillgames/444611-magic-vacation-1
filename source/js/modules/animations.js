export default () => {
  const body = document.querySelector(`body`);
  const prizeMenuLink = document.querySelector(`[data-href="prizes"]`);

  const coverBlock = document.createElement(`div`);
  coverBlock.classList.add(`cover-block`);

  window.onload = () => {
    body.classList.add(`page-loaded`);

    body.appendChild(coverBlock);
  };

  if (window.location.hash === `#story`) {
    startCoveringBackground();
  }

  window.addEventListener(`hashchange`, (e) => {
    if (e.newURL.endsWith(`story`)) {
      startCoveringBackground();
    }
  });

  function startCoveringBackground() {
    prizeMenuLink.addEventListener(`click`, (e) => {
      e.preventDefault();
      coverBlock.classList.add(`active`);

      setTimeout(() => {
        window.location.hash = `#prizes`;
      }, 1000);

    });
  }
};
