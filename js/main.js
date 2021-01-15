/* eslint-disable no-undef */
var $dealsPage = document.querySelector('.deals-page-container');
var $moreInfoPage = document.querySelector('.more-info-page-container');
var $favoritesPage = document.querySelector('.favorites-page-container');
var $backIcon = document.querySelector('.back-icon');
var $dealsButton = document.querySelector('.deals-button');
var $favoritesButton = document.querySelector('.favorites-button');
var loadingGif = document.querySelector('.loading-container');
var $errorModal = document.querySelector('.error-modal');
var $errorModalExit = document.querySelector('.exit-icon');
var favoritesID = 0;
var correspondingID;

function removeNoFavoritesMsg() {
  var noFavoritesMsg = document.querySelector('.no-favorites-container');
  if (noFavoritesMsg) {
    noFavoritesMsg.className = 'no-favorites-container roboto hidden';
  }
}

function showNoFavoritesMsg() {
  var noFavoritesMsg = document.querySelector('.no-favorites-container');
  if (data.favorites[0] === undefined) {
    noFavoritesMsg.className = 'no-favorites-container roboto';
  }
}

function removeMoreInfoFirstChild() {
  $moreInfoPage.firstElementChild.remove();
}

function shoppingIcon(e) {
  var correspondingDeal = '';
  if (page.view === 'favorites-page') {
    if (e.target.tagName === 'I' && e.target.className === 'fas fa-shopping-cart cart-icon') {
      correspondingDeal = e.target.closest('.newContainer').getAttribute('data-dealid');
      window.open('https://www.cheapshark.com/redirect?dealID={' + correspondingDeal + '}', '_blank');
    }
  }
}

document.addEventListener('click', shoppingIcon);

function infoIcon(e) {
  var corresponding = '';
  if (page.view === 'favorites-page') {
    if (e.target.tagName === 'I' && e.target.className === 'fas fa-info-circle info-icon') {
      corresponding = e.target.getAttribute('data-dealid');
      for (var i = 0; i < data.allDeals.length; i++) {
        if (data.allDeals[i].dealID === corresponding) {
          data.moreInfo.title = data.allDeals[i].title;
          data.moreInfo.gameImg = data.allDeals[i].thumb;
          data.moreInfo.normalPrice = data.allDeals[i].normalPrice;
          data.moreInfo.salePrice = data.allDeals[i].salePrice;
          data.moreInfo.steamRating = data.allDeals[i].steamRatingPercent;
          data.moreInfo.percentOff = data.allDeals[i].savings;
          data.moreInfo.metacriticScore = data.allDeals[i].metacriticScore;
          data.moreInfo.dealRating = data.allDeals[i].dealRating;
        }
      }
      getMoreDealData(e.target.getAttribute('data-dealid'));
    }
  }
}

document.addEventListener('click', infoIcon);

function goDealsPage() {
  viewSwapper('deals-page');
}

$dealsButton.addEventListener('click', goDealsPage);

function goFavoritesPage() {
  viewSwapper('favorites-page');
}

$favoritesButton.addEventListener('click', goFavoritesPage);

function exitModal() {
  $errorModal.className = 'error-modal';
}

$errorModalExit.addEventListener('click', exitModal);

function goBack(e) {
  if (page.view === 'more-info' && page.previousView === 'more-info' && e.target.className === 'far fa-arrow-alt-circle-left back-icon') {
    viewSwapper('favorites-page');
  } else if (page.view === 'more-info' && page.previousView === 'favorites-page' && e.target.className === 'far fa-arrow-alt-circle-left back-icon') {
    viewSwapper('favorites-page');
  } else if (page.view === 'more-info' && e.target.className === 'far fa-arrow-alt-circle-left back-icon') {
    viewSwapper('deals-page');
  } else if (page.view === 'deals-page' && e.target.className === 'far fa-arrow-alt-circle-left back-icon') {
    viewSwapper('home-page');
  } else if (page.view === 'favorites-page' && e.target.className === 'far fa-arrow-alt-circle-left back-icon') {
    viewSwapper('home-page');
  }
}

$backIcon.addEventListener('click', goBack);

function hideBackOnHome() {
  if (page.view === 'home-page') {
    $backIcon.style.visibility = 'hidden';
  }
}

hideBackOnHome();

function removeFavorite(e) {
  if (page.view === 'favorites-page') {
    if (e.target.tagName === 'I' && e.target.className === 'fas fa-heart align-items-center favorite-icon active') {
      correspondingID = e.target.closest('.newContainer').getAttribute('data-dealid');
      e.target.closest('.newContainer').remove();
      removeDealsFill();
    }
  }
}

document.addEventListener('click', removeFavorite);

function removeDealsFill() {
  var allActive = document.querySelectorAll('.active');
  for (var i = 0; i < allActive.length; i++) {
    if (allActive[i].closest('.newContainer').getAttribute('data-dealid') === correspondingID) {
      allActive[i].className = 'fas fa-heart align-items-center favorite-icon inactive';
    }
  }
}

function toggleFavorite(e) {
  if (e.target.tagName === 'I' && e.target.className === 'fas fa-heart align-items-center favorite-icon inactive') {
    var getContainer = e.target.closest('.newContainer').querySelector('[data-dealid]').getAttribute('data-dealid');
    e.target.className = 'fas fa-heart align-items-center favorite-icon active';
    data.favoritesIcon.push(e.target.id);
    for (var i = 0; i < data.allDeals.length; i++) {
      if (data.allDeals[i].dealID === getContainer) {
        data.favorites.push(data.allDeals[i]);
        $favoritesPage.appendChild(e.target.closest('.newContainer').cloneNode(true));
        removeNoFavoritesMsg();
      }
    }

  } else if (e.target.tagName === 'I' && e.target.className === 'fas fa-heart align-items-center favorite-icon active') {
    getContainer = e.target.closest('.newContainer').querySelector('[data-dealid]').getAttribute('data-dealid');
    e.target.className = 'fas fa-heart align-items-center favorite-icon inactive';
    data.favoritesIcon.splice(e.target.id, 1);
    for (var x = 0; x < data.favorites.length; x++) {
      if (data.favorites[x].dealID === getContainer) {
        data.favorites.splice(x, 1);
        showNoFavoritesMsg();
      }
    }
  }
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('EcoGamer', dataJSON);
}

document.addEventListener('click', toggleFavorite);

// uses local storage to keep track of saved favorites
window.addEventListener('load', function (e) {

  var previousProfile = localStorage.getItem('EcoGamer');
  if (previousProfile !== null) {
    // eslint-disable-next-line no-global-assign
    data = JSON.parse(previousProfile);
  }

  for (var i = 0; i < data.favorites.length; i++) {
    $favoritesPage.prepend(renderDealData(data.favorites[i]));
  }

  var favoriteDeals = document.querySelectorAll('.newContainer');
  for (var x = 0; x < data.favorites.length; x++) {
    for (var y = 0; y < favoriteDeals.length; y++) {
      if (data.favorites[x].dealID === favoriteDeals[y].getAttribute('data-dealid')) {
        favoriteDeals[y].querySelector('.favorite-icon').className = 'fas fa-heart align-items-center favorite-icon active';
      }
    }
  }

  if (data.favorites[0]) {
    removeNoFavoritesMsg();
  }

});

var $viewList = document.querySelectorAll('div[data-view');

function viewSwapper(dataView) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') !== dataView) {
      $viewList[i].className = 'hidden';
    } else {
      $viewList[i].className = '';
    }
  }
  page.previousView = page.view;
  page.view = dataView;
  if (page.view === 'home-page') {
    $backIcon.style.visibility = 'hidden';
  } else {
    $backIcon.style.visibility = 'visible';
  }
}

function showLoading() {
  loadingGif.className = 'loading-container show';
}

function hideLoading() {
  loadingGif.className = 'loading-container';
}

function getDealData() {
  var xhr = new XMLHttpRequest();
  showLoading();

  xhr.open('GET', 'https://www.cheapshark.com/api/1.0/deals?');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.allDeals = xhr.response;

    for (var i = 0; i < data.allDeals.length; i++) {
      var dealInfo = data.allDeals[i];
      if (dealInfo.steamRatingPercent === '0') {
        dealInfo.steamRatingPercent = 'N/A';
      }
      if (dealInfo.metacriticScore === '0') {
        dealInfo.metacriticScore = 'N/A';
      }
      $dealsPage.appendChild(renderDealData(dealInfo));
      hideLoading();
    }
  });
  xhr.addEventListener('error', function () {
    $errorModal.className = 'error-modal show';
    hideLoading();
  });
  xhr.send();
}

getDealData();

function getMoreDealData(dealID) {
  var xhr = new XMLHttpRequest();
  var moreInfo = data.moreInfo;
  showLoading();
  xhr.open('GET', 'https://www.cheapshark.com/api/1.0/deals?id=' + dealID);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.dealMoreInfo = xhr.response;
    moreInfo.publisher = xhr.response.gameInfo.publisher;
    moreInfo.cheapestPrice = xhr.response.cheapestPrice.price;
    moreInfo.cheapestPriceDate = xhr.response.cheapestPrice.date;
    moreInfo.releaseDate = xhr.response.gameInfo.releaseDate;
    moreInfo.metacriticLink = xhr.response.gameInfo.metacriticLink;
    moreInfo.steamRatingText = xhr.response.gameInfo.steamRatingText;
    moreInfo.steamRatingCount = xhr.response.gameInfo.steamRatingCount;
    renderMoreDealData();
    $moreInfoPage.appendChild(renderMoreInfo());
    removeMoreInfoFirstChild();
    viewSwapper('more-info');
    hideLoading();
  });
  xhr.addEventListener('error', function () {
    $errorModal.className = 'error-modal show';
    hideLoading();
  });
  xhr.send();
}

function renderMoreDealData() {
  var moreInfo = data.moreInfo;
  var dealMoreInfo = data.dealMoreInfo;

  moreInfo.publisher = dealMoreInfo.gameInfo.publisher;
  moreInfo.cheapestPrice = dealMoreInfo.cheapestPrice.price;
  moreInfo.cheapestPriceDate = dealMoreInfo.cheapestPrice.date;
  moreInfo.releaseDate = dealMoreInfo.gameInfo.releaseDate;
  moreInfo.metacriticLink = dealMoreInfo.gameInfo.metacriticLink;
  moreInfo.steamRatingText = dealMoreInfo.gameInfo.steamRatingText;
  moreInfo.steamRatingCount = dealMoreInfo.gameInfo.steamRatingCount;

  if (moreInfo.steamRatingText === null || moreInfo.steamRatingText === 0) {
    moreInfo.steamRatingText = 'N/A';
  }

  if (moreInfo.steamRatingCount === null || moreInfo.steamRatingCount === '0') {
    moreInfo.steamRatingCount = 'N/A';
  }

  if (moreInfo.cheapestPrice === undefined) {
    moreInfo.cheapestPrice = '--';
  }

  if (moreInfo.metacriticLink === null) {
    moreInfo.metacriticLink = '';
  }

  if (moreInfo.cheapestPriceDate === null || moreInfo.cheapestPriceDate === 0) {
    moreInfo.cheapestPriceDate = 'N/A';
  } else if (moreInfo.cheapestPriceDate) {
    var newDate = new Date(moreInfo.cheapestPriceDate * 1000);
    newDate = newDate.toString().substr(4, 11);
    moreInfo.cheapestPriceDate = newDate;
  }

  if (moreInfo.releaseDate === null || moreInfo.releaseDate === 0) {
    moreInfo.releaseDate = 'N/A';
  } else if (moreInfo.releaseDate) {
    var releaseDate = new Date(moreInfo.releaseDate * 1000);
    releaseDate = releaseDate.toString().substr(4, 11);
    moreInfo.releaseDate = releaseDate;
  }
}

function renderDealData(deal) {
  var $newContainer = document.createElement('ul');
  $newContainer.setAttribute('class', 'newContainer');
  $newContainer.setAttribute('data-dealId', deal.dealID);

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

  var $thumb = document.createElement('img');
  $thumb.setAttribute('class', 'game-img');

  $thumb.setAttribute('src', deal.thumb);
  $columnHalf1.appendChild($thumb);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half text-align-center');
  $row1.appendChild($columnHalf2);

  var $gameTitle = document.createElement('h2');
  $gameTitle.setAttribute('class', 'game-title');

  $gameTitle.textContent = deal.title;
  $columnHalf2.appendChild($gameTitle);

  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row');
  $dealInfoContainer.appendChild($row2);

  var $columnHalf3 = document.createElement('div');
  $columnHalf3.setAttribute('class', 'column-half text-align-center margin-left');
  $row2.appendChild($columnHalf3);

  var $retail = document.createElement('h2');
  $retail.setAttribute('class', 'one-line');
  $retail.innerHTML = 'Retail: <span class="red-striked">$' + deal.normalPrice + '</span>';
  $columnHalf3.appendChild($retail);

  var $steamRatingPercent = document.createElement('h2');
  $steamRatingPercent.setAttribute('class', 'one-line');
  $steamRatingPercent.innerHTML = 'Steam: <span class="font-weight-normal">' + deal.steamRatingPercent + '</span>';
  $columnHalf3.appendChild($steamRatingPercent);

  var $metacriticScore = document.createElement('h2');
  $metacriticScore.setAttribute('class', 'one-line');
  $metacriticScore.innerHTML = 'Metacritic: <span class="font-weight-normal">' + deal.metacriticScore + '</span>';
  $columnHalf3.appendChild($metacriticScore);

  var $columnHalf4 = document.createElement('div');
  $columnHalf4.setAttribute('class', 'column-half text-align-center margin-right');
  $row2.appendChild($columnHalf4);

  var $newPrice = document.createElement('h2');
  $newPrice.setAttribute('class', 'one-line');
  $newPrice.innerHTML = 'New Price: <span class="green">$' + deal.salePrice + '</span>';
  $columnHalf4.appendChild($newPrice);

  var $savings = document.createElement('h2');
  $savings.setAttribute('class', 'one-line');
  $savings.textContent = parseFloat(deal.savings).toFixed(2) + '% off!';
  $columnHalf4.appendChild($savings);

  var $dealRating = document.createElement('h2');
  $dealRating.setAttribute('class', 'one-line');
  $dealRating.innerHTML = 'Deal Rating: <span class="font-weight-normal">' + deal.dealRating + '</span>';
  $columnHalf4.appendChild($dealRating);

  var $row3 = document.createElement('div');
  $row3.setAttribute('class', 'row margin-left');
  $newDeal.appendChild($row3);

  var $colThird1 = document.createElement('div');
  $colThird1.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird1);

  var $icon1 = document.createElement('i');
  $icon1.setAttribute('class', 'fas fa-shopping-cart cart-icon');
  $icon1.addEventListener('click', function (e) {
    var correspondingDealID = e.target.closest('.newContainer').getAttribute('data-dealid');
    window.open('https://www.cheapshark.com/redirect?dealID={' + correspondingDealID + '}', '_blank');
  });
  $colThird1.appendChild($icon1);

  var $colThird2 = document.createElement('div');
  $colThird2.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird2);

  var $icon2 = document.createElement('i');
  $icon2.setAttribute('class', 'fas fa-info-circle info-icon');
  $icon2.setAttribute('data-dealId', deal.dealID);
  $icon2.addEventListener('click', function (e) {
    getMoreDealData(e.target.getAttribute('data-dealId'));

    var moreInfo = data.moreInfo;
    moreInfo.title = deal.title;
    moreInfo.gameID = deal.gameID;
    moreInfo.gameImg = deal.thumb;
    moreInfo.normalPrice = deal.normalPrice;
    moreInfo.salePrice = deal.salePrice;
    moreInfo.percentOff = deal.savings;
    moreInfo.steamRating = deal.steamRatingPercent;
    moreInfo.metacriticScore = deal.metacriticScore;
    moreInfo.dealRating = deal.dealRating;
    moreInfo.dealID = deal.dealID;
    moreInfo.metacriticLink = deal.metacriticLink;
    moreInfo.steamRatingCount = deal.steamRatingCount;

  });
  $colThird2.appendChild($icon2);

  var $colThird3 = document.createElement('div');
  $colThird3.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird3);

  var $icon3 = document.createElement('i');
  $icon3.setAttribute('class', 'fas fa-heart align-items-center favorite-icon inactive');
  $icon3.setAttribute('id', 'ID' + favoritesID++);
  $colThird3.appendChild($icon3);

  return $newContainer;
}

function renderMoreInfo() {
  var moreInfo = data.moreInfo;

  var $moreInfoContainer = document.createElement('div');
  $moreInfoContainer.setAttribute('class', 'more-info-container roboto');

  var $info1 = document.createElement('div');
  $info1.setAttribute('class', 'info-1');
  $moreInfoContainer.appendChild($info1);

  var $info1Row1 = document.createElement('div');
  $info1Row1.setAttribute('class', 'row padding-top');
  $info1.appendChild($info1Row1);

  var $info1ColumnHalf1 = document.createElement('div');
  $info1ColumnHalf1.setAttribute('class', 'column-half justify-content-center');
  $info1Row1.appendChild($info1ColumnHalf1);

  var $info1GameImg = document.createElement('img');
  $info1GameImg.setAttribute('class', 'game-img');
  $info1GameImg.setAttribute('src', moreInfo.gameImg);
  $info1ColumnHalf1.appendChild($info1GameImg);

  var $info1ColumnHalf2 = document.createElement('div');
  $info1ColumnHalf2.setAttribute('class', 'column-half text-align-center');
  $info1Row1.appendChild($info1ColumnHalf2);

  var $info1GameTitle = document.createElement('h2');
  $info1GameTitle.setAttribute('class', 'game-title');
  $info1GameTitle.textContent = moreInfo.title;
  $info1ColumnHalf2.appendChild($info1GameTitle);

  var $info1Row2 = document.createElement('div');
  $info1Row2.setAttribute('class', 'row');
  $info1.appendChild($info1Row2);

  var $info1ColumnHalf3 = document.createElement('div');
  $info1ColumnHalf3.setAttribute('class', 'column-half text-align-center margin-left');
  $info1Row2.appendChild($info1ColumnHalf3);

  var $info1Retail = document.createElement('h2');
  $info1Retail.setAttribute('class', 'one-line');
  $info1Retail.innerHTML = 'Retail: <span class="red-striked">$' + moreInfo.normalPrice + '</span>';
  $info1ColumnHalf3.appendChild($info1Retail);

  var $info1Steam = document.createElement('h2');
  $info1Steam.setAttribute('class', 'one-line');
  $info1Steam.innerHTML = 'Steam Rating: <span class="font-weight-normal">' + moreInfo.steamRating + '</span>';
  $info1ColumnHalf3.appendChild($info1Steam);

  var $info1Metacritic = document.createElement('h2');
  $info1Metacritic.setAttribute('class', 'one-line');
  $info1Metacritic.innerHTML = 'Metacritic Score: <span class="font-weight-normal">' + moreInfo.metacriticScore + '</span>';
  $info1ColumnHalf3.appendChild($info1Metacritic);

  var $info1ColumnHalf4 = document.createElement('div');
  $info1ColumnHalf4.setAttribute('class', 'column-half text-align-center margin-right');
  $info1Row2.appendChild($info1ColumnHalf4);

  var $info1NewPrice = document.createElement('h2');
  $info1NewPrice.setAttribute('class', 'one-line');
  $info1NewPrice.innerHTML = 'New Price: <span class="green">$' + moreInfo.salePrice + '</span>';
  $info1ColumnHalf4.appendChild($info1NewPrice);

  var $info1PercentOff = document.createElement('h2');
  $info1PercentOff.setAttribute('class', 'one-line');
  $info1PercentOff.textContent = parseFloat(moreInfo.percentOff).toFixed(2) + '% off!';
  $info1ColumnHalf4.appendChild($info1PercentOff);

  var $info1DealRating = document.createElement('h2');
  $info1DealRating.setAttribute('class', 'one-line');
  $info1DealRating.innerHTML = 'Deal Rating: <span class="font-weight-normal">' + moreInfo.dealRating + '</span>';
  $info1ColumnHalf4.appendChild($info1DealRating);

  var $info2 = document.createElement('div');
  $info2.setAttribute('class', 'info-2 margin-top text-align-center roboto');
  $moreInfoContainer.appendChild($info2);

  var $infoRow2 = document.createElement('div');
  $infoRow2.setAttribute('class', 'row');
  $info2.appendChild($infoRow2);

  var $info2ColumnHalf1 = document.createElement('div');
  $info2ColumnHalf1.setAttribute('class', 'column-half text-align-end');
  $infoRow2.appendChild($info2ColumnHalf1);

  var $publisher = document.createElement('h3');
  $publisher.textContent = 'Publisher:';
  $info2ColumnHalf1.appendChild($publisher);

  var $releaseDate = document.createElement('h3');
  $releaseDate.textContent = 'Release Date:';
  $info2ColumnHalf1.appendChild($releaseDate);

  var $metacriticLink = document.createElement('h3');
  $metacriticLink.textContent = 'Metacritic Link:';
  $info2ColumnHalf1.appendChild($metacriticLink);

  var $steamReviews = document.createElement('h3');
  $steamReviews.textContent = 'Steam Reviews:';
  $info2ColumnHalf1.appendChild($steamReviews);

  var $reviewCount = document.createElement('h3');
  $reviewCount.textContent = 'Review Count:';
  $info2ColumnHalf1.appendChild($reviewCount);

  var $cheapestPrice = document.createElement('h3');
  $cheapestPrice.textContent = 'Cheapest Price:';
  $info2ColumnHalf1.appendChild($cheapestPrice);

  var $cheapestDate = document.createElement('h3');
  $cheapestDate.textContent = 'Cheapest Price Date:';
  $info2ColumnHalf1.appendChild($cheapestDate);

  var $info2ColumnHalf2 = document.createElement('div');
  $info2ColumnHalf2.setAttribute('class', 'column-half text-align-left');
  $infoRow2.appendChild($info2ColumnHalf2);

  var $publisherAPI = document.createElement('h3');
  $publisherAPI.setAttribute('class', 'font-weight-normal');
  $publisherAPI.textContent = data.moreInfo.publisher;
  $info2ColumnHalf2.appendChild($publisherAPI);

  var $releaseAPI = document.createElement('h3');
  $releaseAPI.setAttribute('class', 'font-weight-normal');
  $releaseAPI.textContent = data.moreInfo.releaseDate;
  $info2ColumnHalf2.appendChild($releaseAPI);

  var $metacriticLinkAPI = document.createElement('h3');
  $metacriticLinkAPI.setAttribute('class', 'font-weight-normal');
  $metacriticLinkAPI.innerHTML = '<a target="_blank" href="https://www.metacritic.com' + moreInfo.metacriticLink + '">Click Here</a>';
  $info2ColumnHalf2.appendChild($metacriticLinkAPI);

  var $steamReviewsAPI = document.createElement('h3');
  $steamReviewsAPI.setAttribute('class', 'font-weight-normal');
  $steamReviewsAPI.textContent = data.moreInfo.steamRatingText;
  $info2ColumnHalf2.appendChild($steamReviewsAPI);

  var $reviewCountAPI = document.createElement('h3');
  $reviewCountAPI.setAttribute('class', 'font-weight-normal');
  $reviewCountAPI.textContent = data.moreInfo.steamRatingCount;
  $info2ColumnHalf2.appendChild($reviewCountAPI);

  var $cheapestPriceAPI = document.createElement('h3');
  $cheapestPriceAPI.setAttribute('class', 'font-weight-normal');
  $cheapestPriceAPI.textContent = '$' + data.moreInfo.cheapestPrice;
  $info2ColumnHalf2.appendChild($cheapestPriceAPI);

  var $cheapestDateAPI = document.createElement('h3');
  $cheapestDateAPI.setAttribute('class', 'font-weight-normal');
  $cheapestDateAPI.textContent = data.moreInfo.cheapestPriceDate;
  $info2ColumnHalf2.appendChild($cheapestDateAPI);

  return $moreInfoContainer;
}
