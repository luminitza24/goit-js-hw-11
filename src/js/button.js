const toggleButton = shouldDisplay => {
    const loadButton = document.querySelector('.load__more');
    if (shouldDisplay) {
      loadButton.style.display = 'block';
    } else {
      loadButton.style.display = 'none';
    }
  };
  
  export default toggleButton;