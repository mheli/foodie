////////////////////////////////////////////////////////////////
//
// JavaScript file for FoodByte's swiping feature and page!
//
////////////////////////////////////////////////////////////////

//
// Main Variables
//
var lol = "derp";

//
// jQuery function that reads clicks on the "Yes" or "No" buttons and acts
// on a button press of "Yes"
//
$("#button-yes").click(function() {
    $("#button-no").fadeOut("slow");
    $(this).fadeOut("slow");
    $(".information").show();
});

