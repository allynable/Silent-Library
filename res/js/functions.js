// get user object
function getUser() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    return user;
}

// get member data in local storage
function getMemberData() {
    var member = JSON.parse(localStorage.getItem('memberData'));
    return member;
}

function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// login alert and redirect to home page
$("#login").submit(() => {
    var member = getMemberData();
    var username = $("#login-username").val();
    var password = $("#login-password").val();
    var user = getUser();
    member.forEach((item) => {
        if (item.username === username && item.password === password) {

            user.isLoggedIn = "true";
            user.username = item.username;
            user.name = item.name;
        }
    });

    if (user.isLoggedIn === "true") {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location = "../pages/index.html";
        return false;
    } else {
        alert("Incorrect username or password");
    }
});

// logout function
$(document).ready(() => {
    $("#logout").click(() => {
        var user = getUser();

        user.isLoggedIn = "false";
        user.username = "";
        user.name = "";

        sessionStorage.setItem('user', JSON.stringify(user));
        window.location = "../pages/index.html";
    });
});

// creates admin account in local storage if not present
function addAdminData() {
    var members = getMemberData();
    var hasAdmin = false;
    if (members != null) {
        members.forEach((item) => {
            if (item.username === "admin") {
                hasAdmin = true;
            }
        });
    }
    if (!hasAdmin) {
        var adminObj = {
            "name": "Admin",
            "username": "admin",
            "password": "admin",
            "email": "admin"
        };
        addMemberData(adminObj);
    }
}

// function that creates and returns userid
function createID() {
    const ID = Date.now();
    return ID.toString();
}

// add data to local storage
function addMemberData(memberObj) {
    var member = JSON.parse(localStorage.getItem('memberData'));
    if (member != null) {
        member.push(memberObj);

        localStorage.setItem('memberData', JSON.stringify(member));
    } else {
        var memberData = new Array();
        memberData.push(memberObj);
        localStorage.setItem('memberData', JSON.stringify(memberData));
    }
}

// displays all member dat
function bindMemberData() {
    var member = getMemberData();

    // displays all member data in a form if data is not null
    if (member != null) {
        var data = "";
        member.forEach((item, index) => {
            if (item.username !== "admin") {
                var memberData =
                    "<div class='member' id='borrower" + index + "'>" +
                    "<div class='member-img'>" +
                    "<img src='../res/img/profile.png' alt=''>" +
                    "</div>" +
                    "<div class='member-details'>" +
                    "<form action='member-details'id='" + index + "'>" +
                    "<label for='id' class='label-title'>Member ID: </label>" +
                    "<input type='text' disabled value='" + item.id + "' class='form-input' name='form" + index + "' required></input>" +

                    "<label for='name' class='label-title'>Name: </label>" +
                    "<input type='text' disabled value='" + item.name + "' class='form-input'name='form" + index + "' required></input>" +

                    "<label for='username' class='label-title'>User Name: </label>" +
                    "<input type='text' disabled value='" + item.username + "' class='form-input' name='form" + index + "' required></input>" +

                    "<input type='password' hidden value='" + item.password + "' name='form" + index + "'></input>" +

                    "<label for='gender' class='label-title'>Gender: </label>" +
                    "<input type='text' disabled value='" + item.gender + "' class='form-input' name='form" + index + "' required></input>" +

                    "<label for='DOB' class='label-title'>Date of Birth: </label>" +
                    "<input type='text' disabled value='" + item.DOB + "' class='form-input' name='form" + index + "' required></input>" +

                    "<label for='contact' class='label-title'>Contact: </label>" +
                    "<input type='text' disabled value='" + item.contact + "' class='form-input' name='form" + index + "' required></input>" +

                    "<label for='address' class='label-title'>Address: </label>" +
                    "<input type='text' disabled value='" + item.address + "' class='form-input' name='form" + index + "' required></input>" +

                    "<label for='membertype' class='label-title'>Member Type: </label>" +
                    "<input type='text' disabled value='" + item.membertype + "' class='form-input' name='form" + index + "' required></input>" +
                    "</form>" +
                    "</div>" +
                    "<div class='action' name='form" + index + "'>" +
                    "<button class='btn btn-warning' onclick='showEditRow(" + index + ")'>Edit</button>" +
                    "<button class='btn btn-danger' onclick='deleteRow(" + index + ")'>Delete</button>" +
                    "</div>" +
                    "</div>";
                data += memberData;
            }
        });
        $("#row-member").html(data + "<div class='clear'></div>");
    }
}

// get selected row
function selectedRow(index) {
    var memberRow = document.getElementsByName("form" + index);
    return memberRow;
};

// enable form to edit member data
function showEditRow(index) {
    memberRow = selectedRow(index);

    var membertype = memberRow[8].value;
    var gender = memberRow[4].value;
    var DOB = memberRow[5].value;
    console.log()
    memberRow.forEach((item) => {
        item.disabled = false;
    });

    memberRow[0].focus();
    memberRow[9].innerHTML =
        "<button class='btn btn-success' onclick='update(" + index + ")'>Update</button>" +
        "<button class='btn btn-danger' onclick='cancel(" + index + ")'>Cancel</button>";
    if (membertype == "Standard") {
        $(memberRow[8]).replaceWith(
            "<select name='form" + index + "' class='form-input'>" +
            "<option value='Standard' selected>Standard</option>" +
            "<option value='Premium'>Premium</option>" +
            "<option value='VIP'>VIP</option>" +
            "</select>"
        );
    } else if (membertype == "Premium") {
        $(memberRow[8]).replaceWith(
            "<select name='form" + index + "' class='form-input'>" +
            "<option value='Standard'>Standard</option>" +
            "<option value='Premium' selected>Premium</option>" +
            "<option value='VIP'>VIP</option>" +
            "</select>"
        );
    } else {
        $(memberRow[8]).replaceWith(
            "<select name='form" + index + "' class='form-input'>" +
            "<option value='Standard'>Standard</option>" +
            "<option value='Premium'>Premium</option>" +
            "<option value='VIP' selected>VIP</option>" +
            "</select>"
        );
    }

    if (gender == "Male") {
        $(memberRow[4]).replaceWith(
            "<select name='form" + index + "' class='form-input'>" +
            "<option value='Male' selected>Male</option>" +
            "<option value='Female'>Female</option>" +
            "</select>"
        );
    } else {
        $(memberRow[4]).replaceWith(
            "<select name='form" + index + "' class='form-input'>" +
            "<option value='Male'>Male</option>" +
            "<option value='Female' selected>Female</option>" +
            "</select>"
        );
    }
    $(memberRow[5]).replaceWith("<input type='text' class='form-input' autocomplete='off' name='form" + index + "' value='" + DOB + "'>");
}

// Cancel update function
function cancel(index) {
    var memberRow = getMemberData()[index];

    var memberData =
        "<div class='member-img'>" +
        "<img src='../res/img/profile.png' alt=''>" +
        "</div>" +
        "<div class='member-details'>" +
        "<form action='member-details' id='" + index + "'>" +
        "<label for='id' class='label-title'>Member ID: </label>" +
        "<input type='text' disabled value='" + memberRow.id + "' class='form-input' name='form" + index + "' required></input>" +

        "<label for='name' class='label-title'>Name: </label>" +
        "<input type='text' disabled value='" + memberRow.name + "' class='form-input' name='form" + index + "' required></input>" +

        "<label for='username' class='label-title'>User Name: </label>" +
        "<input type='text' disabled value='" + memberRow.username + "' class='form-input' name='form" + index + "' required></input>" +

        "<input type='password' hidden value='" + memberRow.password + "' name='form" + index + "'></input>" +

        "<label for='gender' class='label-title'>Gender: </label>" +
        "<input type='text' disabled value='" + memberRow.gender + "' class='form-input' name='form" + index + "' required></input>" +

        "<label for='DOB' class='label-title'>Date of Birth: </label>" +
        "<input type='text' disabled value='" + memberRow.DOB + "' class='form-input' name='form" + index + "' required></input>" +

        "<label for='contact' class='label-title'>Contact: </label>" +
        "<input type='text' disabled value='" + memberRow.contact + "' class='form-input' name='form" + index + "' required></input>" +

        "<label for='address' class='label-title'>Address: </label>" +
        "<input type='text' disabled value='" + memberRow.address + "' class='form-input' name='form" + index + "' required></input>" +

        "<label for='membertype' class='label-title'>Member Type: </label>" +
        "<input type='text' disabled value='" + memberRow.membertype + "' class='form-input' name='form" + index + "' required></input>" +
        "</form>" +
        "</div>" +
        "<div class='action' name='form" + index + "'>" +
        "<button class='btn btn-warning' onclick='showEditRow(" + index + ")'>Edit</button>" +
        "<button class='btn btn-danger' onclick='deleteRow(" + index + ")'>Delete</button>" +
        "</div>";
    $("#borrower" + index).html(memberData);
}

// Update data to local storage
function update(index) {
    var memberData = selectedRow(index);
    var id = memberData[0].value;
    var name = memberData[1].value;
    var username = memberData[2].value;
    var password = memberData[3].value;
    var gender = memberData[4].value;
    var DOB = memberData[5].value;
    var contact = memberData[6].value;
    var address = memberData[7].value;
    var membertype = memberData[8].value;

    var memberObj = {
        "id": id,
        "name": name,
        "gender": gender,
        "DOB": DOB,
        "contact": contact,
        "address": address,
        "username": username,
        "password": password,
        "membertype": membertype
    };

    var members = getMemberData();
    if (members != null) {
        var member = members.filter((x) => x.id == memberObj.id).pop();
        if (member != null) {
            member.name = memberObj.name;
            member.username = memberObj.username;
            member.password = memberObj.password;
            member.gender = memberObj.gender;
            member.DOB = memberObj.DOB;
            member.contact = memberObj.contact;
            member.address = memberObj.address;
            member.membertype = memberObj.membertype;
        }
        localStorage.setItem('memberData', JSON.stringify(members));
    }
    memberData.forEach((item, index) => {
        if (index !== item.length - 1) {
            item.disabled = true;
        }
    });
    memberData[9].innerHTML =
        "<button class='btn btn-warning' onclick='showEditRow(" + index + ")'>Edit</button>" +
        "<button class='btn btn-danger' onclick='deleteRow(" + index + ")'>Delete</button>";
    $(memberData[8]).replaceWith(
        "<input type='text' disabled value='" + membertype + "' class='form-input' name='form" + index + "' required></input>"
    );
    $(memberData[4]).replaceWith(
        "<input type='text' disabled value='" + gender + "' class='form-input' name='form" + index + "' required></input>"
    );

    $(memberRow[5]).replaceWith("<input type='text' class='form-input' id='DOB' name='form" + index + "' value='" + DOB + "'>");

    $(".alert h3").replaceWith("<h3> Members information updated! </h3>");

    $(".alert h3").fadeIn(() => {
        $(".alert h3").delay(2000).fadeOut();
    });
}

// delete data  from local storage; ask confirmation to user
function deleteRow(index) {
    if (confirm("Are you sure you want to delete this?")) {
        var memberData = getMemberData();
        memberData.splice(index, 1);
        localStorage.setItem('memberData', JSON.stringify(memberData));
        bindMemberData();

        $(".alert h3").replaceWith("<h3> Member deleted! </h3>");
        $(".alert h3").fadeIn(() => {
            $(".alert h3").delay(2000).fadeOut();
        });
    }
}

// retrieve and display user profile
$(document).ready(() => {

    var user = getUser();
    var member = getMemberData();
    member.forEach((item) => {
        if (item.username === user.username) {
            user = item;
        }
    });
    var userData =
        "<label for='name' class='label-title'>Name: </label>" +
        "<input type='text' id='name' class='form-input' disabled value='" + user.name + "'>" +

        "<label for='gender' class='label-title'>Gender: </label>" +
        "<input type='text' id='gender' class='form-input' disabled value='" + user.gender + "'>" +

        "<label for='DOB' class='label-title'>Gender: </label>" +
        "<input type='text' id='DOB' class='form-input' disabled value='" + user.DOB + "'>" +

        "<label for='mobile' class='label-title'>Contact: </label>" +
        "<input type='text' id='mobile' class='form-input' disabled value='" + user.contact + "'>" +

        "<label for='name' class='label-title'>Address: </label>" +
        "<input type='text' id='address' class='form-input' disabled value='" + user.address + "'>" +

        "<label for='username' class='label-title'>Username: </label>" +
        "<input type='text' id='username' class='form-input' disabled value='" + user.username + "'>" +

        "<label for='password' class='label-title'>Password: </label>" +
        "<input type='password' id='password' class='form-input' disabled value='" + user.password + "'>" +

        "<label for='membership' class='label-title'>Membership: </label>" +
        "<input type='text' id='membertype' class='form-input' disabled value='" + user.membertype + "'>"
        ;

    $("#profile-body").html(userData);
});

// create the member object and call add to local storage function
$("#register").submit(() => {
    var isExisting = false;
    var user = getUser();
    var member = getMemberData();
    var userID = createID();
    var name = $("#name").val();
    var email = $("#email").val();
    var DOB = $("#DOB").val();
    var gender = $("#gender").val();
    var contact = $("#contact").val();
    var username = $("#username").val();
    var address = $("#address").val();
    var password = $("#password").val();
    var confirmpassword = $("#confirmpassword").val();
    var membertype = $("#membertype").val();

    member.forEach((item) => {
        if (item.username === username) {
            isExisting = true;
        }
    });
    // execute of user is not existing
    if (!isExisting) {
        if (password !== confirmpassword) {
            alert("Password does not match!");
            $("#password").css("border", "1px solid red");
            $("#confirmpassword").css("border", "1px solid red")
            return false;
        } else if (!checkEmail(email)) {
            alert("Enter a valid email");
            $("#email").css("border", "1px solid red")
            return false
        } else {
            // create member object and add to local storage
            var memberObj = {
                "id": userID,
                "name": name,
                "gender": gender,
                "DOB": DOB,
                "contact": contact,
                "address": address,
                "username": username,
                "password": password,
                "membertype": membertype
            };
            addMemberData(memberObj);
            if (user.isLoggedIn === "false") {
                $(".alert h3").fadeIn(() => {
                    $(".alert h3").delay(2000).fadeOut();
                });
                $("#register").trigger("reset");
                $("#DOB").val("");
                return false;
            } else {
                $(".alert h3").replaceWith("<h3> Member successfully added! </h3>");
                $(".alert h3").fadeIn(() => {
                    $(".alert h3").delay(2000).fadeOut();
                });
                $(".modal").fadeOut("fast");
                bindMemberData();
                $("#register").trigger("reset");
                $("#DOB").val("");
                return false;
            }
        }
        // execute if user is existing
    } else {
        alert("Username already taken!");
        $("#username").css("border", "1px solid red");
        return false;
    }
});