window.addEventListener('keydown', (event) => {
  console.log(event);

  if (event.key === 's' | event.key === 'S' && event.ctrlKey) {
    event.preventDefault();
  }

  if (event.key === 'Tab' && event.ctrlKey) {
    console.log('Changing note');
  }
});
