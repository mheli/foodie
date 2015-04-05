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

var foodName = [
    "So what do you think of this dish?",
    "How about you check this out!",
    "This dish looks real hot!",
    ""
];

var restaurantName = "Pho Filet";
var restaurantAddress = "4242 San Gabriel Avenue, San Gabriel, California 96969";
var restaurantPhone = "(696) 969-6969";
var restaurantWeb = "N/A";
var restaurantHours = "6 AM - 9 PM";
var restaurantPrice = "$6 - $9";
var restaurantHoursSun = "10:00 AM - 9:00 PM";
var restaurantHoursMon = "10:00 AM - 9:00 PM";
var restaurantHoursTues = "10:00 AM - 9:00 PM";
var restaurantHoursWed = "10:00 AM - 9:00 PM";
var restaurantHoursThurs = "10:00 AM - 8:00 PM";
var restaurantHoursFri = "11:00 AM - 4:00 PM";
var restaurantHoursSat = "11:00 AM - 4:00 PM";

var restaurantInfo = {
    restaurantName: "Pho Filet",
    restaurantAddress: "4242 San Gabriel Avenue, San Gabriel, California 96969",
    restaurantPhone: "(696) 969-6969",
    restaurantWeb: "N/A",
    restaurantHoursSun: "6 AM - 9 PM",
    restaurantHoursMon: "6 AM - 9 PM",
    restaurantHoursTues: "6 AM - 9 PM",
    restaurantHoursWed: "6 AM - 9 PM",
    restaurantHoursThurs: "6 AM - 9 PM",
    restaurantHoursFri: "6 AM - 9 PM",
    restaurantHoursSat: "6 AM - 9 PM",
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
                alert("GEOLOCATION ALMOST WORKS");
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
          var pyrmont = new google.maps.LatLng(latitude, longitude);
        
          map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: pyrmont,
            zoom: 15
          });
        
          var request = {
            location: pyrmont,
            radius: 3800,
            types: ['restaurant']
          };
          
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, function(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                var i;
                for (i = 0; i < results.length; i++) {
                  place_id_2_place[results[i].place_id] = results[i];
                  createMarker(results[i]);
                }
                var index = Math.floor((Math.random() * results.length));
                var count = 0;
                var pic_key;
                for (var key in place_id_2_place) {
                    if (count >= index){
                        pic_key = key;
                        break;
                    }
                    else
                        count += 1;
                }
                 
                    var request = {
                      placeId: pic_key
                    };
                   
                  service.getDetails(request, function(place, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        var index = Math.floor((Math.random() * place.photos.length));

                        var imgUrl = (place.photos[index]).getUrl({'maxWidth' : 400});
                        document.getElementById("yes-image").innerHTML = "<img id='image-food' src='"+imgUrl+"'>";
                        //'<img id="button-no" style="float: center; margin: 0px 20px 15px 15px;" src="https://pressimus.com/css/images/remove-big.png" width="100" /><img id="image-food" style="float: center; margin: 0px 20px 15px 15px;" src="' + imgUrl + '" width="400" /> <img id="button-yes" style="float: center; margin: 0px 0px 15px 15px;" src="http://www.clipartbest.com/cliparts/yTo/pp6/yTopp6GTE.gif" width="100" />';
                        document.getElementById("wanted-image").innerHTML = "<img id='approved-image'  width='400' src='"+imgUrl+"'>";

                        restaurantInfo.restaurantName = place_id_2_place[pic_key].name;
                        restaurantInfo.restaurantAddress = place.formatted_address;
                        restaurantInfo.restaurantPhone = place.international_phone_number;
                        restaurantInfo.restaurantWeb = place.website;
                        restaurantInfo.restaurantHoursSun = sch[0];
                        restaurantInfo.restaurantHoursMon = sch[1];
                        restaurantInfo.restaurantHoursTues = sch[2];
                        restaurantInfo.restaurantHoursWed = sch[3];
                        restaurantInfo.restaurantHoursThurs = sch[4];
                        restaurantInfo.restaurantHoursFri = sch[5];
                        restaurantInfo.restaurantHoursSat = sch[6];


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
    document.getElementById("food-name-heading").innerHTML = foodName[0];
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
    $(".disappear").fadeOut("slow");
    
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
    document.getElementById("restaurant-hours-Sun").innerHTML = restaurantHoursSun;
    document.getElementById("restaurant-hours-Mon").innerHTML = restaurantHoursMon;
    document.getElementById("restaurant-hours-Tues").innerHTML = restaurantHoursTues;
    document.getElementById("restaurant-hours-Wed").innerHTML = restaurantHoursWed;
    document.getElementById("restaurant-hours-Thurs").innerHTML = restaurantHoursThurs;
    document.getElementById("restaurant-hours-Fri").innerHTML = restaurantHoursFri;
    document.getElementById("restaurant-hours-Sat").innerHTML = restaurantHoursSat;
    
    $("#food-data").fadeIn("slow");
    // $(".information").slideUp("slow");
});
