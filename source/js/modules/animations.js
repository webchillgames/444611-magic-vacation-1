export default () => {
  const body = document.querySelector(`body`);

  window.onload = () => {
    body.classList.add(`page-loaded`);
  };
};
