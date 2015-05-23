
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
        alert( "New York Times failed to load, please retry the request." );
    });

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0 ; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikiapedia.org/wiki/' + articleStr;
                console.log(url);
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
}

$('#form-container').submit(loadData);
