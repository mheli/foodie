////////////////////////////////////////////////////////////////
//
// JavaScript file for FoodByte's swiping feature and page!
//
////////////////////////////////////////////////////////////////

//
// Global Variables
//
////////////////////////////////////////////////////////////////

var userAreaCode = 91733;
var latitude = 0;
var longitude = 0;

var foodTitle = "Pho (Vietnamese Beef Noodle Soup)";

var restaurantName = "Pho (Vietnamese Beef Noodle Soup)";
var restaurantRestaurant = "Pho Filet";
var restaurantAddress = "4242 San Gabriel Avenue, San Gabriel, California 96969";
var restaurantPhone = "(696) 969-6969";
var restaurantWeb = "N/A";
var restaurantHours = "6 AM - 9 PM";
var restaurantPrice = "$6 - $9";

var restaurantInfo = {
    restaurantName: "Pho Filet",
    restaurantAddress: "4242 San Gabriel Avenue, San Gabriel, California 96969",
    restaurantPhone: "(696) 969-6969",
    restaurantWeb: "N/A",
    restaurantHours: "6 AM - 9 PM",
    restaurantPrice: "$6 - $9"
}

//
// Helper Functions
//
////////////////////////////////////////////////////////////////

//
// Convert the area code to latitude and longitude
//
function areaCodeToLatLng() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': userAreaCode.toString() },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
            } else {
              alert('Geocode was not successful because WE GONNA CELEBRATE ONE MORE TIME');
            }
        }
    );
}

//
// Find the geolocation of the user
//
function findGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                alert("GEOLOCATION WORKS");
            },
            function () {
                alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
                latitude = 60;
                longitude = 105;
            }
        );
    } else { // Browser doesn't support Geolocation
        alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
        latitude = 60;
        longitude = 105;
    }
}

//
// Gets a random image URL... Custom random number generator anyone?
//
function getRandomImgUrl() {
    var map;
    var infowindow;
    var place_id_2_place = [];
    var place_photos_2_id = [];

        function initialize() {
          var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
        
          map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: pyrmont,
            zoom: 15
          });
        
          var request = {
            location: pyrmont,
            radius: 500,
            types: ['restaurant']
          };
          alert("begin12");
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, function(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  place_id_2_place[results[i].place_id] = results[i];
                  createMarker(results[i]);
                }
                var index = Math.floor((Math.random() * place_id_2_place.length));
                var count = 0;

                 for (var key in place_id_2_place) {
                   if (count >= index){
                    var request = {
                      placeId: key
                    };
                   
                  service.getDetails(request, function(place, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
    
                        var index = Math.floor((Math.random() * place.photos.length));

                       var imgUrl = (place.photos[index]).getUrl({'maxWidth' : 1000});

                        document.getElementById("yes-image").innerHTML = "<img>"+imgUrl+"</img>";
                        document.getElementById("image-food").innerHTML = "<img>"+imgUrl+"</img>";

                        var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                      });
                      google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(place.name);
                        infowindow.open(map, this);
                      });
                    }
                  });
                 
                   }
                   else
                    count += 1;
                 }
              }
            });
        }
        
        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        }
        
        initialize();
       //google.maps.event.addDomListener(window, 'load', initialize);
};

//
// IIFE that prompts the user to input a ZIP code to search for nearby areas
// (and later, possibly use Google's Geolocation API)
//
////////////////////////////////////////////////////////////////

(function() {
    // Hide the yes information
    $('#food-data').hide();
    
    $('#area-code-modal').modal('show');
    document.getElementById("food-name-heading").innerHTML = foodTitle;
    document.getElementById("user-area-code").innerHTML = "Your area code - " + userAreaCode.toString();
}());

//
// User Input Functions
// 
////////////////////////////////////////////////////////////////

//
// jQuery function that reads the user's input on the modal to update the 
// geographic coordinates
//
$('#modal-button').click(function() {
    var value = $('input').val();
    if (value.length != 5 || (isNaN == true)) {
        alert("Please enter a valid postal code.");
    }
    else {
        userAreaCode = value;
        document.getElementById("user-area-code").innerHTML = "Your area code - " + userAreaCode.toString();
    
        $('#area-code-modal').modal('hide');
        areaCodeToLatLng();
    }
});

//
// jQuery function that finds the user's location using Geolocation.
//
$('#modal-button-geolocation').click(function() {
    findGeolocation();
});

//
// jQuery function that reads clicks on the "Yes" or "No" buttons and acts
// on a button press of "No"
//
$("#button-no").click(function() {
    getRandomImgUrl();
    //$("#image-food").attr("src", "https://40.media.tumblr.com/5f0a1d478eb300af666f79f728d6d9f6/tumblr_nmajux73XD1rq6lflo1_1280.jpg");
});


//
// jQuery function that reads clicks on the "Yes" or "No" buttons and acts
// on a button press of "Yes"
//
$("#button-yes").click(function() {
    $("#button-no").fadeOut("slow");
    $(this).fadeOut("slow");
    $("#image-food").fadeOut("slow");
    
    //$("#image-food").animate({
    //    'marginLeft' : "-=300px"
    //});
    
    // Change restaurant data if accept
    // document.getElementById("restaurant-name").innerHTML = "Restaurant Name - " + restaurantInfo.restaurantName;
    // document.getElementById("restaurant-address").innerHTML = "Address - " + restaurantInfo.restaurantAddress;
    // document.getElementById("restaurant-phone").innerHTML = "Phone Number - " + restaurantInfo.restaurantPhone;
    // document.getElementById("restaurant-web").innerHTML = "Website - " + restaurantInfo.restaurantWeb;
    
    document.getElementById("restaurant-name").innerHTML = restaurantInfo.restaurantName;
    document.getElementById("restaurant-address").innerHTML = restaurantInfo.restaurantAddress;
    document.getElementById("restaurant-phone").innerHTML = restaurantInfo.restaurantPhone;
    document.getElementById("restaurant-web").innerHTML = restaurantInfo.restaurantWeb;
    
    // Hours of Operation Table
    document.getElementById("restaurant-hours-Sun").innerHTML = restaurantInfo.restaurantHours;
    document.getElementById("restaurant-hours-Mon").innerHTML = restaurantInfo.restaurantHours;
    document.getElementById("restaurant-hours-Tues").innerHTML = restaurantInfo.restaurantHours;
    document.getElementById("restaurant-hours-Wed").innerHTML = restaurantInfo.restaurantHours;
    document.getElementById("restaurant-hours-Thurs").innerHTML = restaurantInfo.restaurantHours;
    document.getElementById("restaurant-hours-Fri").innerHTML = restaurantInfo.restaurantHours;
    document.getElementById("restaurant-hours-Sat").innerHTML = restaurantInfo.restaurantHours;
    
    $("#food-data").fadeIn("slow");
    // $(".information").slideUp("slow");
});
