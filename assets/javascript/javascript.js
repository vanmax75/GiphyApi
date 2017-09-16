//verbs to be turned into buttons for GIPHY API
var topics = ["running", "dancing", "laughing", "singing", "yawning"];

var still
var animated
var results

//Dumps JSON content for each button into verb-gif div
function displayVerbGifs() {
    temp = $(this).data("name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + temp + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
          //(below) we can use results as a shortcut to reference response.data
          results = response.data;

          //empty the gifs-view div so that when button is clicked, the new gifs appear/append
           $("#gifs-view").empty();

          //loop through results; response.data is an array
          //for each one, we create a div and the rating for the current object; we also create a paragraph and modify the text to put in the rating w/rating variable
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p class='rating'>").text("RATED: " + rating);
            var verbGif = $("<img class='gif'>");
            //building source from results pulled from giphy
            $(verbGif).attr({
                src: results[i].images.fixed_height_still.url,
                "data-behavior": "still",
              "data-animated": results[i].images.fixed_height.url,
              "data-still": results[i].images.fixed_height_still.url})



            //add gif and paragraph before other gifs (image is first because it is later in the code)
            gifDiv.append(p);
            gifDiv.append(verbGif);
            $("#gifs-view").append(gifDiv);
        }
    });
}

$(document).on("click", ".gif", function() {

  var state = $(this).attr("data-behavior");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animated"));
    state = $(this).attr("data-behavior", "animated");
                    
  } else if (state === "animated") {
    $(this).attr("src", $(this).attr("data-still"));
    state = $(this).attr("data-behavior", "still")
    } else {};
});

//create buttons in HTML
function renderButtons() {

    // Deletes the buttons prior to adding new ones (necessary to prevent repeat buttons)
    $("#buttons-list").empty();

    // Looping through the array of verbs(topics)
    for (var i = 0; i < topics.length; i++) {

                    // Then dynamicaly generating buttons for each movie in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
                    // Adding a class of movie to our button
        a.addClass("verb");
                    // Adding a data-attribute
        a.attr("data-name", topics[i]);
                    // Providing the initial button text
        a.text(topics[i]);
                    // Adding the button to the buttons-list div
        $("#buttons-list").append(a);
    }
}

            // This function handles events where one button is clicked
            $("#add-verb").on("click", function(event) {
                event.preventDefault();

                // This line grabs the input from the textbox
                var verb = $("#verb-input").val().trim();

                // The movie from the textbox is then added to our array
                topics.push(verb);

                // Calling renderButtons which handles the processing of verb array
                renderButtons();

            });


//when clicking on verb button, runs displayVerbGifs function to print on page
$(document).on("click", ".verb", displayVerbGifs);

//calling renderButtons to display initial buttons
renderButtons();