

$(document).ready(function () {
    getEnrollments();
});

// Declare a variable to check when the action is Insert or Update
var isUpdateable = false;

// Get enrollments list, by default, this function will be run first for the page load
function getEnrollments() {
    $.ajax({
        url: '/Enrollments/GetEnrollments/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>"
                rows += "<td>" + item.Student.FirstName + "</td>"
                rows += "<td>" + item.Course.Name + "</td>"
                rows += "<td>" + item.Mark + "</td>"
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getEnrollmentById(" + item.EnrollmentId + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteEnrollmentById(" + item.EnrollmentId + ")'>Delete</button></td>"
                rows += "</tr>";
                $("#listEnrollments tbody").html(rows);
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

// Get enrollment by id
function getEnrollmentById(id) {
    $("#title").text("Enrollment Detail");
    $.ajax({
        url: '/Enrollments/Get/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#EnrollmentId").val(data.EnrollmentId);
            $("#StudentId").val(data.Student.Id);
            $("#CourseId").val(data.Course.CourseId);
            $("#FirstName").val(data.Student.FirstName);
            $("#Name").val(data.Course.Name);
            $("#Mark").val(data.Mark);
            isUpdateable = true;
            $("#enrollmentModal").modal('show');
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

// Insert/ Update  enrollment
$("#btnSave").click(function (e) {

    var data = {
        EnrollmentId: $("#EnrollmentId").val(),
        StudentId: $("#StudentId").val(),
        CourseId: $("#CourseId").val(),
        FirstName: $("#FirstName").val(),
        Name: $("#Name").val(),
        Mark: $("#Mark").val()
    }

    if (!isUpdateable) {
        $.ajax({
            url: '/Enrollments/Create/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getProducts();
                $("#enrollmentModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
    else {
        $.ajax({
            url: '/Enrollments/Update/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getEnrollments();
                isUpdateable = false;
                $("#enrollmentModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});

// Delete enrollment by id
function deleteProductById(id) {
    $("#confirmModal #title").text("Delete Enrollment");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Enrollments/Delete/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                getEnrollments();
                $("#confirmModal").modal('hide');
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

// Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Create New");
})

// Close modal
$("#btnClose").click(function () {
    clear();
});

// Clear all items
function clear() {
    $("#EnrollmentId").val("");
    $("#StudentId").val("");
    $("#CourseId").val("");
    $("#FirstName").val("");
    $("#Name").val("");
    $("#Mark").val("");
}
