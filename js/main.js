function toggleFavorite() {
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

document.addEventListener('click', toggleFavorite);

function getDealData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.cheapshark.com/api/1.0/deals?');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log('xhr status', xhr.status);
    console.log('xhr response', xhr.response);
  });
  xhr.send();
}

function renderDealData() {
  var $newDeal = document.createElement('div');
  $newDeal.setAttribute('class', 'deal-listing-container');

  var $dealInfoContainer = document.createElement('div');
  $dealInfoContainer.setAttribute('class', 'deal-info-container');
  $newDeal.appendChild($dealInfoContainer);

  var $row1 = document.createElement('div');
  $row1.setAttribute('class', 'row padding-top');
  $dealInfoContainer.appendChild($row1);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half justify-content-center');
  $row1.appendChild($columnHalf1);

  var $gameImg = document.createElement('img');
  $gameImg.setAttribute('class', 'game-img');
  // API data
  $gameImg.setAttribute('src', 'img/placeholder_dracula_origin.jpg');
  $columnHalf1.appendChild($gameImg);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row1.appendChild($columnHalf2);

  var $gameTitle = document.createElement('div');
  $gameTitle.setAttribute('class', 'game-title');
  // API data
  $gameTitle.textContent = 'Dracula: Origin';
  $columnHalf2.appendChild($gameTitle);

  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row');
  $dealInfoContainer.appendChild($row2);

  var $columnHalf3 = document.createElement('div');
  $columnHalf3.setAttribute('class', 'column-half text-align-center margin-left');
  $row2.appendChild($columnHalf3);

  // Deal info section, will require API
  var $retail = document.createElement('h2');
  $retail.innerHTML = 'Retail: <span class="red-striked">$9.99</span>';
  $columnHalf3.appendChild($retail);

  var $steamRating = document.createElement('h2');
  $steamRating.innerHTML = 'Steam Rating: <span class="font-weight-normal">83</span>';
  $columnHalf3.appendChild($steamRating);

  var $metacriticScore = document.createElement('h2');
  $metacriticScore.innerHTML = 'Metacritic Score: <span class="font-weight-normal">78</span>';
  $columnHalf3.appendChild($metacriticScore);

  var $columnHalf4 = document.createElement('div');
  $columnHalf4.setAttribute('class', 'column-half text-align-center margin-right');
  $row2.appendChild($columnHalf4);

  var $newPrice = document.createElement('h2');
  $newPrice.innerHTML = 'New Price: <span class="green">$2.49</span>';
  $columnHalf4.appendChild($newPrice);

  var $percentOff = document.createElement('h2');
  $percentOff.textContent = '75.06% off!';
  $columnHalf4.appendChild($percentOff);

  var $dealRating = document.createElement('h2');
  $dealRating.innerHTML = 'Deal Rating: <span class="font-weight-normal">8.7</span>';
  $columnHalf4.appendChild($dealRating);

  var $row3 = document.createElement('div');
  $row3.setAttribute('class', 'row margin-left');
  $dealInfoContainer.appendChild($row3);

  var $colThird1 = document.createElement('div');
  $colThird1.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird1);

  var $icon1 = document.createElement('a');
  $icon1.setAttribute('href', '');
  $icon1.setAttribute('class', 'fas fa-shopping-cart cart-icon');
  $colThird1.appendChild($icon1);

  var $colThird2 = document.createElement('div');
  $colThird2.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird2);

  var $icon2 = document.createElement('a');
  $icon2.setAttribute('href', '');
  $icon2.setAttribute('class', 'fas fa-info-circle info-icon');
  $colThird2.appendChild($icon2);

  var $colThird3 = document.createElement('div');
  $colThird3.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird3);

  var $icon3 = document.createElement('a');
  $icon3.setAttribute('href', '');
  $icon3.setAttribute('class', 'fas fa-heart align-items-center favorite-icon inactive');
  $colThird3.appendChild($icon3);

  return $newDeal;
}
