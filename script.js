//function to show data.......
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html +=
            '<td><button onclick="deleteData(' +
            index +
            ')" class="btn btn-danger">Delete</button>' +
            '<button onclick="editData(' +
            index +
            ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudtable tbody").innerHTML = html;
}


//load all data when document or page loaded
document.onload = showData();


//function to add data
function addData() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    var peopleList;

    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
        name: name,
        age: age,
        address: address,
        email: email
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
}

function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList"));
    if (index >= 0 && index < peopleList.length) {
        peopleList.splice(index, 1); // Remove the element at the specified index
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData(); // Refresh the table after deleting
    }
}
// function editData(index) {
//     var peopleList = JSON.parse(localStorage.getItem("peopleList"));
//     if (index >= 0 && index < peopleList.length) {
//         var person = peopleList[index];
//         // Populate the form fields with the data of the selected person
//         document.getElementById("name").value = person.name;
//         document.getElementById("age").value = person.age;
//         document.getElementById("address").value = person.address;
//         document.getElementById("email").value = person.email;

//         // Remove the selected person from the list (optional)
//         peopleList.splice(index, 1);
//         localStorage.setItem("peopleList", JSON.stringify(peopleList));
//     }
// }

// Function to populate the form for editing
function editData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList"));
    if (index >= 0 && index < peopleList.length) {
        var person = peopleList[index];
        document.getElementById("name").value = person.name;
        document.getElementById("age").value = person.age;
        document.getElementById("address").value = person.address;
        document.getElementById("email").value = person.email;

        // Hide the "Submit" button and show the "Update" button
        document.getElementById("submit").style.display = "none";
        document.getElementById("update").style.display = "block";

        // Store the index of the item being edited for later use
        document.getElementById("update").dataset.index = index;
    }
}

// Function to update data
function updateData() {
    var index = document.getElementById("update").dataset.index;
    var peopleList = JSON.parse(localStorage.getItem("peopleList"));
    if (index >= 0 && index < peopleList.length) {
        // Update the data in the array
        peopleList[index].name = document.getElementById("name").value;
        peopleList[index].age = document.getElementById("age").value;
        peopleList[index].address = document.getElementById("address").value;
        peopleList[index].email = document.getElementById("email").value;

        // Update the data in local storage
        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";

        // Show the "Submit" button and hide the "Update" button
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";

        // Refresh the table
        showData();
    }
}

