////////////////////////////////////////////////////////////////
//
// JavaScript file for FoodByte's swiping feature and page!
//
////////////////////////////////////////////////////////////////

//
// Main Variables
//

// Temporary variables for now I guess

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

var userAreaCode = 91733;

//
// IIFE that prompts the user to input a ZIP code to search for nearby areas
// (and later, possibly use Google's Geolocation API)
//
(function() {
    // Hide the yes information
    $('#food-data').hide();
    
    // $('#area-code-modal').modal('show');
    document.getElementById("food-name-heading").innerHTML = foodTitle;
    document.getElementById("user-area-code").innerHTML = "Your area code - " + userAreaCode.toString();
}());


//
// jQuery function that reads clicks on the "Yes" or "No" buttons and acts
// on a button press of "No"
//
$("#button-no").click(function() {
    $("#image-food").attr("src", "https://41.media.tumblr.com/42845f7b5fd4db8811764a9033b43d44/tumblr_nm4oedrx8x1rzwv55o1_500.jpg");
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
    
    document.getElementById("restaurant-hours").innerHTML = restaurantInfo.restaurantHours;
    
    $("#food-data").fadeIn("slow");
    // $(".information").slideUp("slow");
});

