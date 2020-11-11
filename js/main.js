function clickFavorite() {
  var inactive = 'fas fa-heart align-items-center favorite-icon inactive';
  var active = 'fas fa-heart align-items-center favorite-icon active';

  if (event.target.tagName !== 'I') {
    return;
  }

  if (event.target.tagName === 'I' && event.target.className === inactive) {
    event.target.className = active;
  } else {
    event.target.className = inactive;
  }

}

document.addEventListener('click', clickFavorite);
