$(document).ready(function () {
    getStudents();
});
//Declare a variable to check when the action is Insert or Update

var isUpdateable= false;

//Get students list,by default this function will be run first for the page load
function getStudents() {
    $.ajax({
        url: '/Students/GetStudents/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>"
                rows += "<td>" + item.Id + "</td>"
                rows += "<td>" + item.FirstName + "</td>"
                rows += "<td>" + item.LastName + "</td>"
                rows += "<td>" + item.Address + "</td>"
                rows += "<td>" + item.City + "</td>"
                rows += "<td>" + item.State + "</td>"
                rows += "<td>" + item.DateOfBirth + "</td>"
                rows += "<td>" + item.Gender + "</td>"
                rows += "<td><button type='button' id='btnEdit' class='btn btn-warning' onclick='return getStudentById(" + item.Id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteStudentById(" + item.Id + ")'>Delete</button></td>"
                rows += "</tr>";
                $("#listStudents tbody").html(rows);
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
}
//Get student by id
function getStudentById(id) {
    $("#title").text("Student Detail");
    $.ajax({
        url: '/Students/Get/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#Id").val(data.Id);
            $("#FirstName").val(data.FirstName);
            $("#LastName").val(data.LastName);
            $("#Address").val(data.Address);
            $("#City").val(data.City);
            $("#State").val(data.State);
            $("#DateOfBirth").val(data.DateOfBirth);
            $("#Gender").val(data.Gender);
            isUpdateable = true;
            $("#studentModal").modal('show');

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
}
//Insert/Update a student
$("#btnSave").click(function (e) {
    var data = {
        Id: $("#Id").val(),
        FirstName: $("#FirstName").val(),
        LastName: $("#LastName").val(),
        Address: $("#Address").val(),
        City: $("#City").val(),
        State: $("#State").val(),
        DateOfBirth: $("#DateOfBirth").val(),
        Gender: $("#Gender").val()
    }
    if (!isUpdateable) {
        $.ajax({
            url: '/Students/Create/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getStudents();
                $("#studentModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }

        })

    }
    else {
        $.ajax({
            url: '/Students/Update/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getStudents();
                isUpdateable = false;
                $("#studentModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }

        })
      
    }

});
//Delete student by id
function deleteStudentById(id) {
    $("#confirmModal #title").text("Delete Student");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: '/Students/Delete/' + id,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                getStudents();
                $("#confirmModal").modal('hide');
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }

        });
        e.preventDefault();
    });
}
//Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Create New");
})

//Close modal
$("#btnClose").click(function () {
    $("#studentModal").modal('hide');
    clear();

    
});
//Clear all items
function clear() {
    $("#Id").val("");
    $("#FirstName").val("");
    $("#LastName").val("");
    $("#Address").val("");
    $("#City").val("");
    $("#State").val("");
    $("#DateOfBirth").val("");
    $("#Gender").val("");
}
$(function () {
    $("#DateOfBirth").datepicker();
});




