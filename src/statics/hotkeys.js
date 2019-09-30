window.addEventListener('keydown', (event) => {
  event.preventDefault();
  console.log(event);

  if (event.key.match(/s|S/) && event.ctrlKey) {
    event.preventDefault();
    console.log('CTRL + S');
  }
});
