
//array of topics

var topics = ["Canada", "Cuba", "Mexico", "bahamas"];

$(document).ready(function(){
  renderBtns();
});

//Function to render buttons from array

      // Function for displaying movie data
      function renderBtns() {

        // Deleting the topic buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#dispBtns").empty();

        // Looping through the array of mtopics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each country in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("myCountry btn");
          // Adding a data-attribute with a value of the country at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the country at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#dispBtns").append(a);
        }
      }

$(document).on("click", ".myCountry", function(){ 
  //Note: above syntax is used because this works on newly created buttons. 
 

  //We need a function that will fetch images from giphy when a button is clicked.

  var myCountry = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  myCountry + "+vacation" + "&api_key=RJEqk2XbAKa7TkMXK1JMZr1NzQjBuSYc&limit=10&rating=g";

  
  //make the API call using the dymanic URL created
  $.ajax({
    url: queryURL,
    method: "GET"
  }) //end of ajax GET call

  //
  .then(function(response) {
    console.log(queryURL);

    console.log(response.data);

    //empty div
    $("#dispGifs").empty();

    // store the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      console.log(results[i].images.fixed_height_still.url);
      
      var myCountryDiv = $("<div>");

      var rating = results[i].rating;

      var dispRating = $("<p>").text("Rating: " + rating);

      var myCountryImage = $("<img>");

      myCountryImage.addClass("picha");

      myCountryImage.attr("data-state", "animate");

      myCountryImage.attr("data-animate",results[i].images.fixed_height.url );

      // myCountryImage.attr("data-state", "still");

      myCountryImage.attr("data-still",results[i].images.fixed_height_still.url);

      myCountryImage.attr("src",results[i].images.fixed_height.url);

      //add paragraph and image to myCountryDiv

      myCountryDiv.prepend(dispRating);

      myCountryDiv.prepend(myCountryImage);

      //add myCountryDiv to html content area with id dispGifs
      $("#dispGifs").prepend(myCountryDiv);

    }
  }); //end of callback
}); //End of on-click function


      // This .on("click") function will trigger the AJAX Call

$("#find-country").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var countryInput= $("input").val();

        console.log(countryInput);
        topics.push(countryInput);
        renderBtns();
        $("#country-input").val("");

});

//Add event listener on gifs to toggle between still and animate states
        
$(document).on("click", ".picha", function(){

          console.log("You Clicked me!");
          console.log($(this).attr("data-state"));
       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
});
    