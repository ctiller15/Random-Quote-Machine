/*
2/3/2017 - Christopher Tiller

Currently I'm satisfied with the result at my current skill level. Eventually I want to revisit this and:
1: Add in some animations for the buttons, and an animation that transitions between the inevitable div height changes.
2: Improve the styling for the document.
3: Assuming extended stay on the site, allow for the user an opportunity to pause, stop, and play the video in the background. Buttons should be off to the side, and unobtrusive, but still in an intuitive position.
4: Probably autoplay some really light, relaxing sounds. They should be barely noticable. They should also have all of the same options to stop if a user desires.
5:Make the site more responsive. Account for different screen sizes. Do more than just throwing on a bootstrap class and say you're done.
*/

function parseQuote(){
       //Getting the API. Here we are using the forismatic api. We are then executing a function immediately after.
        //**NOTE: Forismatic's API does not work over https. I have provided a link to the http version of this site in the footer.
       $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(foris) {
        /*There appears to be a slight error with some of the quotes. Some of them appear to not have their author listed.
        This checks to see if their author exists, and if not, replaces the blank name with "Unknown"*/
        if (foris.quoteAuthor == ""){
          var author = "Unknown"
        }else {
          var author = foris.quoteAuthor;
          }
        //Setting the quote to the new one from the API.
        var quote = foris.quoteText;
        
        $(".quote").html('\"' + quote + '\"');
        $(".author").html("-" + String(author));
        $("#quote").fadeTo('slow',1);
        var tweeturl = document.getElementsByClassName("tweet");
      
        tweeturl[0].href = tweeturl[0].href.slice(0,38);
        tweeturl[0].href += ('\"' + quote + '\"' +' %23' + author);
        });
};

$(document).ready(function() {
  //Prepopulating the page with a trial quote, before the user clicks the button.
  parseQuote();
  //This will only execute upon clicking the "quote" button.
  $(".quoteButton").on("click", function(){
    //Using the fadeTo function here. It preserves area, unlike if I were using fadeIn or fadeOut.
    $("#quote").fadeTo('slow', 0, function(){
      parseQuote();
    });
  });
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  });
  new Clipboard(".copyButton");
  
  //This allows the use of twitter widgets. In this case, it specifically allows for the use of twitter buttons.
  window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));
  
});