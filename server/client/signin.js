//var signin = {
//    init: function() {
//
//        signin.events();
//    },
//
//
//
//    events: function() {
//        $(".glyphicon-plus").on('click', function(event) {
//            event.preventDefault();
//            $('.add-item-container').toggleClass('hidden');
//        });
//
//        $(".admin-log-in").on('click', function(event) {
//            event.preventDefault();
//            $('.signIn').toggleClass('hidden');
//            $('header').toggleClass("larger");
//        });
//        //credit to http://www.formget.com/javascript-login-form/ for the function below
//
//        $(document).ready(function() {
//            $(".loginSubmit").on('click', function(event) {
//                event.preventDefault();
//                var username = CryptoJS.SHA256(document
//                    .getElementById("username").value
//                ).toString();
//                var password = CryptoJS.SHA256(document
//                    .getElementById("password").value
//                ).toString();
//                if (username === signin.usernameSHA2 &&
//                    password === signin.passwordSHA2) {
//                    $('.signIn').toggleClass('hidden');
//                    $('header').toggleClass("larger");
//                    $('.admin').removeClass('hidden');
//                    // alert("Login successfully");
//                    menuPage.admin = true;
//                } else {
//                    alert("You are wrong about that.");
//                    document.getElementById("username")
//                        .value = "username";
//                    document.getElementById("password")
//                        .value = "password";
//                }
//            });
//        });
//
//    },
//    usernameSHA2: "fd5e374b69ee5208517033e1bed268aa7c51ede53a05229e663e9b651a7d867e",
//    passwordSHA2: "e92db92a5c6598db82fd8ecc0057fb7ef78c009d35465da31ca1af8665375888",
//};

// This is only used for demonstration

var signin = {
    init: function() {

        signin.events();
    },



    events: function() {
        $(".glyphicon-plus").on('click', function(event) {
            event.preventDefault();
            $('.add-item-container').toggleClass('hidden');
        });

        $(".admin-log-in").on('click', function(event) {
            event.preventDefault();
            $('.signIn').toggleClass('hidden');
            $('header').toggleClass("larger");
        });
        //credit to http://www.formget.com/javascript-login-form/ for the function below

        $(document).ready(function() {
            $(".loginSubmit").on('click', function(event) {
                event.preventDefault();
                var username = ("Admin");
                var password = ("1234");
                if (username === username &&
                    password === password) {
                    $('.signIn').toggleClass('hidden');
                    $('header').toggleClass("larger");
                    $('.admin').removeClass('hidden');
                    // alert("Login successfully");
                    menuPage.admin = true;
                } else {
                    alert("You are wrong about that.");
                    document.getElementById("username")
                        .value = "username";
                    document.getElementById("password")
                        .value = "password";
                }
            });
        });

    },
    usernameSHA2: "fd5e374b69ee5208517033e1bed268aa7c51ede53a05229e663e9b651a7d867e",
    passwordSHA2: "e92db92a5c6598db82fd8ecc0057fb7ef78c009d35465da31ca1af8665375888",
};