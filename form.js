
$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdWA6RwVW98EYpbDwU8SSOMHRTUfdy6UM",
    authDomain: "riseandgo-9572a.firebaseapp.com",
    databaseURL: "https://riseandgo-9572a.firebaseio.com",
    projectId: "riseandgo-9572a",
    storageBucket: "riseandgo-9572a.appspot.com",
    messagingSenderId: "431744264850"
  };
  firebase.initializeApp(config);


// *************VARIABLES************************
  var database = firebase.database();
  var workAddress = "";
  var HomeAddress = "";
  var MorningRoutine;
  var arriveWork = "hh:mm:ss";

//***************** Functions*****************************

function submitdata(event) {

    event.preventDefault();

    console.log("clicking");

    workAddress = $("#workAddress").val().trim();
    HomeAddress = $("#HomeAddress").val().trim();
    MorningRoutine = $("#MorningRoutine").val().trim();
    arriveWork = $("#timepicker").val();


    console.log(workAddress);
    console.log(HomeAddress);
    console.log(MorningRoutine);
    console.log(arriveWork);

    database.ref().push({
      workAddress:workAddress,
      HomeAddress:HomeAddress,
      MorningRoutine:MorningRoutine,
      arriveWork: arriveWork,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
};

//************OnClick******************************
   console.log("the page loaded");

   // onclick of  buttons
$(document).on("click", "#submit", submitdata);

/////styling 
// $(".mat-input").focus(function(){
//   $(this).parent().addClass("is-active is-completed");
// });

// $(".mat-input").focusout(function(){
//   if($(this).val() === "")
//     $(this).parent().removeClass("is-completed");
//   $(this).parent().removeClass("is-active");
// })

//   $('.timepicker').pickatime({
//     default: 'now', // Set default time
//     fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
//     twelvehour: false, // Use AM/PM or 24-hour format
//     donetext: 'OK', // text for done-button
//     cleartext: 'Clear', // text for clear-button
//     canceltext: 'Cancel', // Text for cancel-button
//     autoclose: false, // automatic close timepicker
//     ampmclickable: true, // make AM PM clickable
//     // aftershow: function(){} //Function for after opening timepicker  
//   });


});
