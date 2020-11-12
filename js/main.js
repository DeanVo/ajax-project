var $dealsPage = document.querySelector('.container');

function toggleFavorite() {
  var inactive = 'fas fa-heart align-items-center favorite-icon inactive';
  var active = 'fas fa-heart align-items-center favorite-icon active';

  // if (event.target.tagName !== 'I') {
  //   return;
  // }

  // if (event.target.tagName === 'I' && event.target.className === inactive) {
  //   event.target.className = active;
  // } else {
  //   event.target.className = inactive;
  // }
}

document.addEventListener('click', toggleFavorite);

function getDealData() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://www.cheapshark.com/api/1.0/deals?');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log('xhr status', xhr.status);
    console.log('xhr response', xhr.response);
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
    }
  });
  xhr.send();
}

getDealData();

function renderDealData(deal) {
  var $newContainer = document.createElement('div');
  $newContainer.setAttribute('class', 'newContainer');

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
  // API data
  $thumb.setAttribute('src', deal.thumb);
  $columnHalf1.appendChild($thumb);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half text-align-center');
  $row1.appendChild($columnHalf2);

  var $gameTitle = document.createElement('h2');
  $gameTitle.setAttribute('class', 'game-title');
  // API data
  $gameTitle.textContent = deal.title;
  $columnHalf2.appendChild($gameTitle);

  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row');
  $dealInfoContainer.appendChild($row2);

  var $columnHalf3 = document.createElement('div');
  $columnHalf3.setAttribute('class', 'column-half text-align-center margin-left');
  $row2.appendChild($columnHalf3);

  // Deal info section, will require API
  var $retail = document.createElement('h2');
  $retail.innerHTML = 'Retail: <span class="red-striked">$' + deal.normalPrice + '</span>';
  $columnHalf3.appendChild($retail);

  var $steamRatingPercent = document.createElement('h2');
  $steamRatingPercent.innerHTML = 'Steam: <span class="font-weight-normal">' + deal.steamRatingPercent + '</span>';
  $columnHalf3.appendChild($steamRatingPercent);

  var $metacriticScore = document.createElement('h2');
  $metacriticScore.innerHTML = 'Metacritic: <span class="font-weight-normal">' + deal.metacriticScore + '</span>';
  $columnHalf3.appendChild($metacriticScore);

  var $columnHalf4 = document.createElement('div');
  $columnHalf4.setAttribute('class', 'column-half text-align-center margin-right');
  $row2.appendChild($columnHalf4);

  var $newPrice = document.createElement('h2');
  $newPrice.innerHTML = 'New Price: <span class="green">$' + deal.salePrice + '</span>';
  $columnHalf4.appendChild($newPrice);

  var $savings = document.createElement('h2');
  $savings.textContent = parseFloat(deal.savings).toFixed(2) + '% off!';
  $columnHalf4.appendChild($savings);

  var $dealRating = document.createElement('h2');
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
  $colThird1.appendChild($icon1);

  var $colThird2 = document.createElement('div');
  $colThird2.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird2);

  var $icon2 = document.createElement('i');
  $icon2.setAttribute('class', 'fas fa-info-circle info-icon');
  $icon2.setAttribute('data-gameId', deal.gameID);
  $icon2.addEventListener('click', function (e) { console.log(e.target.dataset); });
  $colThird2.appendChild($icon2);

  var $colThird3 = document.createElement('div');
  $colThird3.setAttribute('class', 'column-third justify-content-center align-items-center padding-top');
  $row3.appendChild($colThird3);

  var $icon3 = document.createElement('i');
  $icon3.setAttribute('class', 'fas fa-heart align-items-center favorite-icon inactive');
  $colThird3.appendChild($icon3);

  return $newContainer;
}

// function getGameID(game) {
//   var xhr = new XMLHttpRequest();

//   xhr.open('GET', 'https://www.cheapshark.com/api/1.0/deals?');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     for (var i = 0; i < xhr.response.length; i++) {
//       if (game === xhr.response[i].title) {
//         data.moreInfo.title = xhr.response[i].title;
//         data.moreInfo.gameID = xhr.response[i].gameID;
//       }
//     }
//   });
//   xhr.send();
// }

function renderMoreInfo(deal) {
  var $moreInfoContainer = document.createElement('div');
  $moreInfoContainer.setAttribute('class', 'more-info-container');

  var $info1 = document.createElement('div');
  $info1.setAttribute('class', 'info-1 roboto');
  $moreInfoContainer.appendChild($info1);
  // API title
  var $gameTitleInfo = document.createElement('h3');
  $gameTitleInfo.setAttribute('class', 'text-align-center game-title-info roboto margin-bottom padding-top');
  $gameTitleInfo.textContent = 'Crysis';
  $info1.appendChild($gameTitleInfo);

  var $infoRow1 = document.createElement('div');
  $infoRow1.setAttribute('class', 'row margin-info text-align-center');
  $info1.appendChild($infoRow1);

  var $infoColumnHalf1 = document.createElement('div');
  $infoColumnHalf1.setAttribute('class', 'column-half');
  $infoRow1.appendChild($infoColumnHalf1);
  // API img
  var $infoImg = document.createElement('img');
  $infoImg.setAttribute('class', '');
  $infoImg.setAttribute('src', 'img/placeholder_dracula_origin.jpg');
  $infoColumnHalf1.appendChild($infoImg);
  // API steam rating
  var $infoSteamRating = document.createElement('h3');
  $infoSteamRating.setAttribute('class', 'no-margin padding-top one-line');
  $infoSteamRating.innerHTML = 'Steam Rating: <span class="font-weight-normal">82%</span></h3>';
  $infoColumnHalf1.appendChild($infoSteamRating);
  // API metacritic score
  var $infoMetacriticScore = document.createElement('h3');
  $infoMetacriticScore.setAttribute('class', 'no-margin padding-top one-line');
  $infoMetacriticScore.innerHTML = 'Metacritic Score: <span class="font-weight-normal">91</span></h3>';
  $infoColumnHalf1.appendChild($infoMetacriticScore);

  var $infoColumnHalf2 = document.createElement('div');
  $infoColumnHalf2.setAttribute('class', 'column-half');
  $infoRow1.appendChild($infoColumnHalf2);

  var $infoRetail = document.createElement('h3');
  $infoRetail.setAttribute('class', 'no-margin one-line');
  $infoRetail.innerHTML = 'Retail: <span class="red-striked">$9.99</span></h3>';
  $infoColumnHalf2.appendChild($infoRetail);

  var $infoNewPrice = document.createElement('h3');
  $infoNewPrice.setAttribute('class', 'no-margin padding-bottom');
  $infoNewPrice.innerHTML = 'New Price: <span class="green">$1.99</span></h3>';
  $infoColumnHalf2.appendChild($infoNewPrice);

  var $infoPercentage = document.createElement('h3');
  $infoPercentage.setAttribute('class', 'no-margin padding-top-info padding-bottom-2');
  $infoPercentage.textContent = '75.04% off!';
  $infoColumnHalf2.appendChild($infoPercentage);

  var $infoDealRating = document.createElement('h3');
  $infoDealRating.setAttribute('class', 'no-margin padding-top margin-bottom');
  $infoDealRating.innerHTML = 'Deal Rating: <span class="font-weight-normal">8.3</span></h3>';
  $infoColumnHalf2.appendChild($infoDealRating);

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
  $cheapestDate.textContent = 'Date:';
  $info2ColumnHalf1.appendChild($cheapestDate);

  var $info2ColumnHalf2 = document.createElement('div');
  $info2ColumnHalf2.setAttribute('class', 'column-half text-align-left');
  $infoRow2.appendChild($info2ColumnHalf2);

  var $publisherAPI = document.createElement('h3');
  $publisherAPI.setAttribute('class', 'font-weight-normal');
  $publisherAPI.textContent = 'N/A';
  $info2ColumnHalf2.appendChild($publisherAPI);

  var $releaseAPI = document.createElement('h3');
  $releaseAPI.setAttribute('class', 'font-weight-normal');
  $releaseAPI.textContent = '11/12/2017';
  $info2ColumnHalf2.appendChild($releaseAPI);

  var $metacriticLinkAPI = document.createElement('h3');
  $metacriticLinkAPI.setAttribute('class', 'font-weight-normal');
  $metacriticLinkAPI.textContent = 'Crysis';
  $info2ColumnHalf2.appendChild($metacriticLinkAPI);

  var $steamReviewsAPI = document.createElement('h3');
  $steamReviewsAPI.setAttribute('class', 'font-weight-normal');
  $steamReviewsAPI.textContent = 'Very Positive';
  $info2ColumnHalf2.appendChild($steamReviewsAPI);

  var $reviewCountAPI = document.createElement('h3');
  $reviewCountAPI.setAttribute('class', 'font-weight-normal');
  $reviewCountAPI.textContent = '9364';
  $info2ColumnHalf2.appendChild($reviewCountAPI);

  var $cheapestPriceAPI = document.createElement('h3');
  $cheapestPriceAPI.setAttribute('class', 'font-weight-normal');
  $cheapestPriceAPI.textContent = '$3.99';
  $info2ColumnHalf2.appendChild($cheapestPriceAPI);

  var $cheapestDateAPI = document.createElement('h3');
  $cheapestDateAPI.setAttribute('class', 'font-weight-normal');
  $cheapestDateAPI.textContent = '06/06/2017';
  $info2ColumnHalf2.appendChild($cheapestDateAPI);

  return $moreInfoContainer;
}

renderMoreInfo();

var $viewList = document.querySelectorAll('div[data-view');

function viewSwapper(dataView) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') !== dataView) {
      $viewList[i].className = 'hidden';
    } else {
      $viewList[i].className = '';
    }
  }
}
