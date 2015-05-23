
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var imageurl = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=";
    var location = street + ", " + city;
    var full_url = imageurl + location;
    $('body').append('<img class = "bgimg" src="' + full_url + '">');


    var NYTURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key=88e858ef717bf67a473a4b27656ce9b4:3:51798175";
    console.log(NYTURL);
    $.getJSON(NYTURL, function (data) {
        $nytHeaderElem.text('New York Times articles about ' + city);
        var i = 0;
        console.log(data.response.docs[i].headline.main);
        var articles = data.response.docs;
        for (i; i < articles.length; i++) {
            var article = data.response.docs[i];
            $nytElem.append('<li class="article">' + '<a href="'+ article.web_url +'">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        }
    }).error(function() {
        alert( "New York Times failed to load, please retry the request." )
    });
/*
    $.ajax( {
    url: 'http://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json',
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' }
} );
*/
    return false;
}

$('#form-container').submit(loadData);
