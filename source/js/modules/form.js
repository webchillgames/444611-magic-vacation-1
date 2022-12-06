export default () => {
  let emailFields = document.querySelectorAll(`input[type="email"]`);
  // let adaptPlaceholder = function (el) {
  //   if ((window.innerWidth / window.innerHeight < 1) || (window.innerWidth < 769)) {
  //     el.placeholder = `e-mail`;
  //   } else {
  //     el.placeholder = `e-mail для регистации результата и получения приза`;
  //   }
  // };

  // for (let i = 0; i < emailFields.length; i++) {
  //   adaptPlaceholder(emailFields[i]);
  //   window.addEventListener(`resize`, function () {
  //     adaptPlaceholder(emailFields[i]);
  //   });
  // }

  let adaptLabel = function (el) {
    el.labels[0].style = `opacity: 0`;
    if ((window.innerWidth / window.innerHeight < 1) || (window.innerWidth < 769)) {
      el.labels[0].innerText = `e-mail`;
    } else {
      el.labels[0].innerText = `e-mail для регистации результата и получения приза`;
    }

    el.addEventListener(`animationend`, () => {
      el.labels[0].style = `opacity: 1`;
    });
  };

  for (let i = 0; i < emailFields.length; i++) {
    adaptLabel(emailFields[i]);
    window.addEventListener(`resize`, function () {
      adaptLabel(emailFields[i]);
    });
  }

};
