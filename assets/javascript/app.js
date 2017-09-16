var topics = ["nasa", "hubble", "nebula", "planets", "stars"];
var _topicImages = []; 
var API_KEY = "dc6zaTOxFJmzC"; 
var LIMIT = 10;

function renderTopicButtons() {
    
    var buttonContainer = $("#button-container"); 
 
    buttonContainer.empty(); 

    for (var i = 0; i < topics.length; i++) {
    
        var topicButton = $("<button/>", {

            text: topics[i], 
            click: function () { 

                getTopicImages($(this)) 
            }  
        });
        
        buttonContainer.append(topicButton);
    }
}

function getTopicImages(queryURL) {

    var query = queryURL.text();
    _topicImages = [];

    var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=" + API_KEY + "&limit=" + LIMIT);
    
    queryURL.done(function(apiResults) { 
       
        console.log("yay! got data", apiResults); 

        for (var i = 0; i < apiResults.data.length; i++) {
         
            var GIF = apiResults.data[i]; 
            var topicImage = {

                rating: GIF.rating,
                still: GIF.images.fixed_width_still,
                animate: GIF.images.fixed_width_downsampled
            }

            _topicImages.push(topicImage);
        }

        renderTopicImages();
    });
}

function renderTopicImages() {

    var imageContainer = $("#image-container");
    imageContainer.empty();

    console.log("topic images", _topicImages)

    for (var i = 0; i < _topicImages.length; i++) {

        var topicImage = _topicImages[i];
        var figureHTML = $("<figure/>");
        var urlStill = topicImage.still.url;

        var topicImageHTML = $("<img />", {

            src: topicImage.still.url, 
            width: topicImage.still.width,
            height: topicImage.still.height,
            "data-index": i, 

            click: function () { 

                toggleImageAnimation($(this)) 
            }  
        });
        
        var figureCaptionHTML = $("<figcaption/>"); 
        figureCaptionHTML.text(topicImage.rating); 
        figureHTML.prepend(figureCaptionHTML);
        figureHTML.prepend(topicImageHTML);
        imageContainer.append(figureHTML);
    }
}

function toggleImageAnimation(image) {

    var imageHTML = $(image); 
    var index = imageHTML.attr("data-index"); 
    var topicImage = _topicImages[index]; 

    if (imageHTML.attr("src") == topicImage.still.url) {

        imageHTML.attr("src", topicImage.animate.url);

    } else {

        imageHTML.attr("src", topicImage.still.url);
    }
}

function addTopic(topic) {

    topics.push(topic);
    renderTopicButtons();
    $('#space-input').val(" ");
}

$("#add-spaceStuff").on("click", function(event) { 

        event.preventDefault();
        addTopic($("#space-input").val().trim());
});     

renderTopicButtons();

