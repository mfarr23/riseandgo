
$(document).ready(function() {

// *************VARIABLES************************
  var database = firebase.database();
  var workAddress = "";
  var HomeAddress = "";
  var MorningRoutine;
  var arriveWork = "hh:mm:ss";
  var youtube = "";
  var localemail = localStorage.getItem("email");

//***************** Functions*****************************

function submitdata(event) {

    event.preventDefault();

    workAddress = $("#workAddress").val().trim();
    HomeAddress = $("#HomeAddress").val().trim();
    MorningRoutine = $("#MorningRoutine").val().trim();
    arriveWork = $("#timepicker").val();
    youtube = $("#youtube").val();

    var currentuser = '';
    firebase.auth().onAuthStateChanged(function(user) {
      currentuser = user;
    });

    database.ref('users/').push({
      email: localemail,
      workAddress:workAddress,
      HomeAddress:HomeAddress,
      MorningRoutine:MorningRoutine,
      arriveWork: arriveWork,
      youtube:youtube,
      dataAdded: firebase.database.ServerValue.TIMESTAMP
     });

    alert("Submitted successfully!")

    $("#workAddress").val('');
    $("#HomeAddress").val('');
    $("#MorningRoutine").val('');
    $("#timepicker").val('');
    $("#youtube").val('');
};

   // onclick of  buttons
$(document).on("click", "#submit", submitdata);

///styling 
$(".mat-input").focus(function(){
  $(this).parent().addClass("is-active is-completed");
});

$(".mat-input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  $(this).parent().removeClass("is-active");
})

  $('.timepicker').pickatime({
    default: 'now', // Set default time
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    // aftershow: function(){} //Function for after opening timepicker  
  });


});
