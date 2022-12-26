export default () => {
  let footerTogglers = document.querySelectorAll(`.js-footer-toggler`);


  if (footerTogglers.length) {
    for (let i = 0; i < footerTogglers.length; i++) {
      let text;
      let bg;

      for (let j of footerTogglers[i].parentElement.children) {
        if (j.classList.contains(`screen__footer-bg`)) {
          bg = j;
        }

        if (j.classList.contains(`screen__footer-wrapper`)) {
          text = j;
        }
      }

      footerTogglers[i].addEventListener(`click`, function () {
        let footer = footerTogglers[i].parentNode;
        if (footer.classList.contains(`screen__footer--full`)) {
          text.style.opacity = 0;

          setTimeout(() => {
            bg.style.transform = `translate3d(0, 100%, 0)`;
          }, 400);

          setTimeout(() => {
            footer.classList.remove(`screen__footer--full`);
          }, 600);


        } else {
          footer.classList.add(`screen__footer--full`);
          bg.style.transform = `translate3d(0, 0, 0)`;

          setTimeout(() => {
            text.style.opacity = 1;
          }, 400);
        }
      });
    }
  }
};
