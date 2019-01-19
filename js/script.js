let inputForm = document.getElementById("inputForm");
let btnAdd = document.getElementById("btnAdd");
let btnSort = document.getElementById("btnSort");
let btnClear = document.getElementById("btnClear");
let listItem = document.getElementById("listItem");

let listArray = [];
if (localStorage.listArray) {
    listArray = JSON.parse(localStorage.listArray);
}

let refreshList = function () {
    // Clearing the already outputed list.
    listItem.innerHTML = "";

    for (let i = 0; i < listArray.length; i++) {
        let inputData = listArray[i];
        let newListItem = document.createElement("li");
        let newDivItem = document.createElement("div");
        let dataDivItem = document.createElement("div");
        let btnGroupDivItem = document.createElement("div");

        // Button in the list are created here.
        let btnDone = document.createElement("button")
        let btnDelete = document.createElement("button")

        let btnUpArrow = document.createElement("button");
        let btnDownArrow = document.createElement("button");

        // Classes to the elements created are added here.
        newListItem.className = "list-group-item rounded border-0 bg-white";
        newDivItem.className = "row";

        if (inputData["status"] == true) {
            dataDivItem.className = "col my-auto rounded border p-2 pl-3 bg-secondary disabled";
        } else {
            dataDivItem.className = "col my-auto rounded border p-2 pl-3";
        }

        btnGroupDivItem.className = "btn-group col-auto my-auto"

        btnDone.className = "btn btn-primary shadow rounded-left my-auto";
        btnDelete.className = "btn btn-danger shadow my-auto";

        btnUpArrow.className = "btn fas fa-chevron-circle-up fa-2x pr-0"
        btnDownArrow.className = "btn fas fa-chevron-circle-down fa-2x"

        if (i == 0) {
            btnUpArrow.disabled = true;
        } else if (i == listArray.length - 1) {
            btnDownArrow.disabled = true;
        }


        // Button name is generated here
        btnDone.innerText = inputData["status"] ? "Not Done" : "Done";
        btnDelete.innerText = "Delete";

        btnUpArrow.onclick = function () {
            if (i == 0) return;
            listArray[i] = listArray[i - 1];
            listArray[i - 1] = inputData;
            refreshList();
        }

        btnDownArrow.onclick = function () {
            if (i >= listArray.length - 1) return;
            listArray[i] = listArray[i + 1];
            listArray[i + 1] = inputData;
            refreshList();
        }

        // Buttton action definition.
        btnDone.onclick = function () {
            if (inputData["status"] == false) {
                btnDone.innerText = "Not Done";
                inputData["status"] = true;
                dataDivItem.className += " disabled bg-secondary";
            } else {
                btnDone.innerText = "Done";
                inputData["status"] = false;
                dataDivItem.classList.remove("disabled");
                dataDivItem.classList.remove("bg-secondary");
            }
            listArray[i] = inputData;
            localStorage.listArray = JSON.stringify(listArray);
            console.log(inputData["status"]);
            // console.log("Done Button Pressed")
        }

        btnDelete.onclick = function () {
            listArray.splice(i, 1);
            refreshList();
        }


        // Button group is generated.
        btnGroupDivItem.appendChild(btnUpArrow);
        btnGroupDivItem.appendChild(btnDownArrow);

        btnGroupDivItem.appendChild(btnDone);
        btnGroupDivItem.appendChild(btnDelete);

        // Input data is addeed in here.
        dataDivItem.innerText = inputData["data"];

        // Elements added to the main div element
        newDivItem.appendChild(dataDivItem);
        newDivItem.appendChild(btnGroupDivItem);

        // New list item is created.
        newListItem.appendChild(newDivItem);

        // New list item is added to outline list on the HTML page.
        listItem.appendChild(newListItem);
    }
    localStorage.listArray = JSON.stringify(listArray);
}

refreshList();

let sortListArray = btnSort.onclick = () => {
    console.log("Sort function is working")
    listArray.sort((inputData, secondInputData) => {
        return inputData["status"] - secondInputData["status"];
    });
    refreshList();
}

// Clearing the listArray stored on the localstorage.
btnClear.onclick = () => {
    listArray = [];
    localStorage.listArray = JSON.stringify(listArray);
    refreshList();
}

// Add new list item via click event or the pressing ENTER key.
let addData = btnAdd.onclick = () => {
    let inputData = inputForm.value;

    // Clearing the input form.
    inputForm.value = "";

    if (inputData == "") {
        console.log("Enter Something in the input form.");
        inputForm.className += " is-invalid";
        inputForm.setAttribute("placeholder", "It's Empty!");
        return;
    } else {
        inputForm.classList.remove("is-invalid");
        inputForm.setAttribute("placeholder", "Enter Your New List Item");
    }
    // Pushing the new list item into the array.
    let newData = {
        data: inputData,
        status: false,
    }
    listArray.push(newData);

    // Refreshing list every time new data is entered.
    refreshList();
    // console.log(listArray);
}

inputForm.addEventListener("keyup", (ev) => {
    let key = ev.keyCode;
    if (key == 13) {
        console.log("Enter Key Pressed");
        addData();
    }
});