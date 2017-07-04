$(document).ready(function () {
       
     $('.slider').slider({full_width: true});
     $('#signInSlider').slider({height: ($(window).height()-120)});
     
    var config = {
    apiKey: "AIzaSyAAz1o4oosftlgvAdJvorJ_kvRx8LuE73o",
    authDomain: "first-project-f1ef0.firebaseapp.com",
    databaseURL: "https://first-project-f1ef0.firebaseio.com",
    projectId: "first-project-f1ef0",
    storageBucket: "first-project-f1ef0.appspot.com",
    messagingSenderId: "256133650243"
   };
   
   firebase.initializeApp(config);

   const txtLoginEmail = $("#txtLoginEmail");
   const txtLoginPassword = $("#txtLoginPassword");

   const txtSignUpUserName = $("#txtSignUpUserName");
   const txtSignUpEmail = $("#txtSignUpEmail");
   const txtSignUpPassword = $("#txtSignUpPassword");
   const txtSignUpConfirmPassword = $("#txtSignUpConfirmPassword");

   const btnLogin = $("#btnLogin");
   const btnSignUp = $("#btnSignUp");
   const btnLogout = $("#btnLogout");

   
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('#mdLogin').modal();
    $('#mdSignUp').modal();

   $("#btnLoginSubmit").click(function(){
    const loginEmail = txtLoginEmail.val();
    const loginPass = txtLoginPassword.val();

    const auth = firebase.auth();

    $("#loginError").empty();

    const promise = auth.signInWithEmailAndPassword(loginEmail,loginPass);
    promise.catch(e => { 
      if (e.code == 'auth/user-not-found'){
        $("#loginError").html('This account does not exist. Please proceed to sign up tab.')
      }else if(e.code == 'auth/wrong-password'){
        $("#loginError").html('The password is invalid');
      }
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
     if (firebaseUser){
      $('#mdLogin').modal('close');
      txtLoginEmail.val('');
      txtLoginPassword.val('');
      window.location.href = 'layout.html';
     }
    });

   });

   $("#btnLogout").click(function(){
    firebase.auth().signOut();
    window.location.href = 'signInPage.html';
   });

   $("#btnSignUpSubmit").click(function(){
    const signUpUserName = txtSignUpUserName.val();
    const signUpEmail  = txtSignUpEmail.val();
    const signUpPass  = txtSignUpPassword.val();
    const signUpConfirmPass  = txtSignUpConfirmPassword.val();

    const auth = firebase.auth();

    $("#signUpError").empty();

    const promise = auth.createUserWithEmailAndPassword(signUpEmail,signUpPass);

    promise.catch(e => $("#signUpError").html(e.message));

    firebase.auth().onAuthStateChanged(firebaseUser => {
     if (firebaseUser){
      $('#mdSignUp').modal('close');
      txtSignUpUserName.val('');
      txtSignUpEmail.val('');
      txtSignUpPassword.val('');
      txtSignUpConfirmPassword.val('');
     }
    });
   });

   firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
      btnLogout[0].classList.remove('hide');
      btnLogin[0].classList.add('hide');
      btnSignUp[0].classList.add('hide');

    }else{
      btnLogout[0].classList.add('hide');
      btnLogin[0].classList.remove('hide');
      btnSignUp[0].classList.remove('hide');
    }
   });

   $('#mdLogin').modal({
      dismissible: true,
      complete: function() { // Callback for Modal open. Modal and trigger parameters available.
      txtLoginEmail.val('');
      txtLoginPassword.val('');
      }
    });

    $('#mdSignUp').modal({
      dismissible: true,
      complete: function() { // Callback for Modal open. Modal and trigger parameters available.
      txtLoginEmail.val('');
      txtLoginPassword.val('');
      }
    });

   });