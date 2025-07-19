
const inputs = document.querySelectorAll('.formInput input');

inputs.forEach(input => {
  const label = input.nextElementSibling; 
  const originalPlaceholder = input.placeholder;

  input.addEventListener('focus', () => {
    if (label && label.classList.contains('floatingLabel')) {
      label.style.visibility = 'visible';
    }
    input.placeholder = '';
  });


  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      if (label && label.classList.contains('floatingLabel')) {
        label.style.visibility = 'hidden';
      }
      input.placeholder = originalPlaceholder;
    }
  });
});
