// check if the user is logged in
$(document).ready(() => {
    // try catch to update data in member list
    try {
        bindMemberData();
        addAdminData();
    } catch {

    }
    // checks if "isLoggedIn" is already defined in local storage, if not, create item
    var checkUser = JSON.parse(sessionStorage.getItem("user"));
    if (checkUser === null) {
        var user = {
            "isLoggedIn": "false",
            "username": "",
            "name": ""
        };
        sessionStorage.setItem('user', JSON.stringify(user));
    }
    var user = getUser();
    $("#profile-name").html("<h6>" + user.name + "</h6>");
    // hide and unhide menu buttons if user is logged in or logged out
    if (user.isLoggedIn === "true") {
        $("#nav-login").hide();
        $("#nav-logout").show();

        if (user.username == "admin") {
            $("#nav-member").show();
            $("#nav-borrowers").show();
            $("#admin-sitemap").show();
        } else {
            $("#nav-member").hide();
            $("#nav-borrowers").hide();
            $("#admin-sitemap").hide();
        }
    } else {
        $("#nav-login").css('display', 'flex');
        $("#nav-logout").hide();
        $("#nav-member").hide();
        $("#nav-borrowers").hide();
        $("#admin-sitemap").hide();
    }
});

// show modal for add member button
$("#add-member").click(() => {
    $(".modal").fadeIn("fast");
});

$("#modal-cancel").click(() => {
    $(".modal").fadeOut("fast");
    $(".modal-enquire").fadeOut("fast");
    $(".sign-up").trigger("reset");
});

$('body').click((e) => {
    if ($(e.target).is('.modal')) {
        $(".modal").fadeOut("fast");
    }
});

//user profile dropdown
$(".user").hover(
    () => {
        var user = getUser();
        $(".user").width("100px");

        if (user.username === 'admin') {
            $(".drop-down").slideDown("fast");
            $("#profile-drop-down").hide();
            $("#books-drop-down").hide();
            $(".drop-down").css("top", "12px")
        } else {
            $(".drop-down").slideDown("fast");
        }
    }, () => {
        $(".user").width("80px");
        $(".drop-down").slideUp("fast");
    }
);

$(".enquire-btn").click(() => {
    $(".modal").fadeIn();
});

$("#enquiry").submit(() => {
    $("#enquiry").trigger("reset");
    alert("Enquiry Sent!");
    $(".modal").fadeOut();
})


