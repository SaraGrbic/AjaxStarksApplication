$(document).ready(function () {
    getCourses();
}
);
//Declare a variable to check when the action is Insert or Update
var isUpdateable = false;
//Get courses list,by default this function will be run first for the page load

function getCourses()
{
    $.ajax({
        url: '/Courses/GetCourses/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>"
                rows += "<td>" + item.CourseId + "</td>"
                rows += "<td>" + item.Name + "</td>"
                rows += "<td>" + item.Description + "</td>"
                rows += "<td><button type='button' id='btnEdit' class='btn btn-warning' onclick='return getCourseById(" + item.CourseId + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteCourseById(" + item.CourseId + ")'>Delete</button></td>"
                rows += "</tr>";
                $("#listCourses tbody").html(rows);
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });

}
//Get course by Id
function getCourseById(CourseId) {
    $("#title").text("Course Detail");
    $.ajax({
        url: '/Courses/Get/ ' + CourseId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#CourseId").val(data.CourseId);
            $("#Name").val(data.Name);
            $("#Description").val(data.Description);
            isUpdateable = true;
            $("#courseModal").modal('show');
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
//Insert/Update course
$("#btnSave").click(function () {
    var data = {
        CourseId: $("#CourseId").val(),
        Name: $("#Name").val(),
        Description: $("#Description").val()
    }
    if (!isUpdateable) {
        $.ajax({
            url: '/Courses/Create/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getCourses();
                $("#courseModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }

        })

    }
    else {
        $.ajax({
            url: '/Courses/Update/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getCourses();
                isUpdateable = false;
                $("#courseModal").modal('hide');
                clear();

            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});
//Delete course by Id
function deleteCourseById(id) {
    $("#confirmModal #title").text("Delete Course");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: '/Courses/Delete/' + id,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                getCourses();
                $("#confirmModal").modal('hide');

            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });
        e.preventDefault();
    });
}
//SEt title for create new
$("#btnCreate").click(function () {
    $("#title").text("Create New");
})
//Close modal
$("#btnClose").click(function () {
    clear();
});
//Clear all items
function clear() {
    $("#CourseId").val("");
    $("#Name").val("");
    $("#Description").val("");
}
