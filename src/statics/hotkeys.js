window.addEventListener('keydown', (event) => {
  console.log(event);

  if (event.key.match(/s|S/) && event.ctrlKey) {
    event.preventDefault();
  }
});
