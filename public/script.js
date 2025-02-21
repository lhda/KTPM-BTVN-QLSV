var data = [[]];

(async function () {
	const csv = await fetch("data.csv");
	csv.text().then((text) => {
		data = text.split("\n").map((row) => row.split(","));
		const table = document.getElementById("table");

		table.innerHTML = "";

		for (let i = 0; i < data.length; i++) {
			let tr = document.createElement("tr");

			for (let j = 0; j < data[i].length; j++) {
				let td = document.createElement("td");

				td.textContent = data[i][j];
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	});
})();

var modal = document.getElementById("inputModal");
var modalContent = document.getElementById("inputModalContent");
var inputForm = document.getElementById("inputForm");
var span = document.getElementsByClassName("close")[0];

var btnAdd = document.getElementById("btnAdd");

var btnRemove = document.getElementById("btnRemove");
var inputRemove = document.getElementById("inputRemove");

var btnUpdate = document.getElementById("btnUpdate");
var inputUpdate = document.getElementById("inputUpdate");

btnAdd.onclick = addStudent;
btnRemove.onclick = removeStudent;
btnUpdate.onclick = updateStudent;
span.onclick = closeModal;
window.onclick = function (event) {
	if (event.target == modal) {
		closeModal();
	}
};

function openModal() {
	modal.style.display = "block";
}

function closeModal() {
	modal.style.display = "none";
}

function addStudent() {
	inputForm.setAttribute("action", "/add");
	openModal();
}

function removeStudent() {
	for (let index = 1; index < data.length; index++) {
		const row = data[index];
		// console.log(row[0]);

		if (row[0] == inputRemove.value) {
			data.splice(index, 1);

			fetch("/remove", {
				method: "POST",
				body: JSON.stringify({
					data: dataToString(),
				}),
				headers: {
					"Content-type": "application/json; charset=utf-8",
				},
			}).then((window.location.href = "/"));

			return;
		}
	}
	window.alert("MSSV không tồn tại!");
}

function updateStudent() {
	inputForm.setAttribute("action", "/update");

	var inputs = inputForm.querySelectorAll("input, select");

	data.forEach((row) => {
		if (row[0] == inputUpdate.value) {
			for (let index = 0; index < row.length; index++) {
				if (inputs[index].value !== undefined) {
					inputs[index].value = row[index];
				}
			}
			openModal();
			return;
		}
	});
}

function dataToString() {
	var string = "";
	for (let index = 0; index < data.length; index++) {
		const row = data[index];
		string += row.toString() + "\n";
	}

	string = string.substring(0, string.length - 1);

	return string;
}
