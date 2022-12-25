export default () => {
  let footerTogglers = document.querySelectorAll(`.js-footer-toggler`);


  if (footerTogglers.length) {
    for (let i = 0; i < footerTogglers.length; i++) {
      const text = document.querySelector(`.screen__footer-wrapper`);
      const bg = document.querySelector(`.screen__footer-bg`);

      footerTogglers[i].addEventListener(`click`, function () {
        let footer = footerTogglers[i].parentNode;
        if (footer.classList.contains(`screen__footer--full`)) {
          text.style.opacity = 0;
          bg.style.transform = `translate3d(0, 100%, 0)`;

          setTimeout(() => {
            footer.classList.remove(`screen__footer--full`);
          }, 400);

        } else {
          footer.classList.add(`screen__footer--full`);
          bg.style.transform = `translate3d(0, 0, 0)`;

          setTimeout(() => {
            text.style.opacity = 1;
          }, 200);
        }
      });
    }
  }
};
