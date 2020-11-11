var $dealsPage = document.querySelector('.container');

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
    var dealInfo = data.dealInfo;

    dealInfo.title = xhr.response[0].title;
    dealInfo.gameImg = xhr.response[0].thumb;
    dealInfo.normalPrice = xhr.response[0].normalPrice;
    dealInfo.salePrice = xhr.response[0].salePrice;
    dealInfo.percentOff = xhr.response[0].savings;
    dealInfo.steamRating = xhr.response[0].steamRatingPercent;
    dealInfo.metacriticScore = xhr.response[0].metacriticScore;
    dealInfo.dealRating = xhr.response[0].dealRating;

    $dealsPage.appendChild(renderDealData());

  });
  xhr.send();
}

function renderDealData() {
  var $newContainer = document.createElement('div');
  $newContainer.setAttribute('class', 'container');

  var $newDeal = document.createElement('div');
  $newDeal.setAttribute('class', 'deal-listing-container');
  $newContainer.appendChild($newDeal);

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
  $gameImg.setAttribute('src', data.dealInfo.gameImg);
  $columnHalf1.appendChild($gameImg);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half text-align-center');
  $row1.appendChild($columnHalf2);

  var $gameTitle = document.createElement('h2');
  $gameTitle.setAttribute('class', 'game-title');
  // API data
  $gameTitle.textContent = data.dealInfo.title;
  $columnHalf2.appendChild($gameTitle);

  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row');
  $dealInfoContainer.appendChild($row2);

  var $columnHalf3 = document.createElement('div');
  $columnHalf3.setAttribute('class', 'column-half text-align-center margin-left');
  $row2.appendChild($columnHalf3);

  // Deal info section, will require API
  var $retail = document.createElement('h2');
  $retail.innerHTML = 'Retail: <span class="red-striked">' + data.dealInfo.normalPrice + '</span>';
  $columnHalf3.appendChild($retail);

  var $steamRating = document.createElement('h2');
  $steamRating.innerHTML = 'Steam Rating: <span class="font-weight-normal">' + data.dealInfo.steamRating + '</span>';
  $columnHalf3.appendChild($steamRating);

  var $metacriticScore = document.createElement('h2');
  $metacriticScore.innerHTML = 'Metacritic Score: <span class="font-weight-normal">' + data.dealInfo.metacriticScore + '</span>';
  $columnHalf3.appendChild($metacriticScore);

  var $columnHalf4 = document.createElement('div');
  $columnHalf4.setAttribute('class', 'column-half text-align-center margin-right');
  $row2.appendChild($columnHalf4);

  var $newPrice = document.createElement('h2');
  $newPrice.innerHTML = 'New Price: <span class="green">$' + data.dealInfo.salePrice + '</span>';
  $columnHalf4.appendChild($newPrice);

  var $percentOff = document.createElement('h2');
  $percentOff.textContent = parseFloat(data.dealInfo.percentOff).toFixed(2) + '% off!';
  $columnHalf4.appendChild($percentOff);

  var $dealRating = document.createElement('h2');
  $dealRating.innerHTML = 'Deal Rating: <span class="font-weight-normal">' + data.dealInfo.dealRating + '</span>';
  $columnHalf4.appendChild($dealRating);

  var $row3 = document.createElement('div');
  $row3.setAttribute('class', 'row margin-left');
  $newDeal.appendChild($row3);

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

  var $icon3 = document.createElement('i');
  $icon3.setAttribute('href', '');
  $icon3.setAttribute('class', 'fas fa-heart align-items-center favorite-icon inactive');
  $colThird3.appendChild($icon3);

  return $newContainer;
}
