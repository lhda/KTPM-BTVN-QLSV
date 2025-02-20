(async function () {
  const csv = await fetch("data.csv");
  const data = csv.text().then((text) => {
    const rows = text.split("\n").map((row) => row.split(","));
    const table = document.getElementById("table");

    table.innerHTML = "";

    for (let i = 0; i < rows.length; i++) {
      let tr = document.createElement("tr");

      for (let j = 0; j < rows[i].length; j++) {
        let td = document.createElement("td");

        td.textContent = rows[i][j];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    button.style.display = "block";
  });
})();
