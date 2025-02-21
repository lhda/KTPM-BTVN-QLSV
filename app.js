const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const port = 3000;

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
	res.render("index");
});

app.post("/add", upload.any(), function (req, res) {
	var path = __dirname + "/public/data.csv";
	var data = "\n";
	for (const [key, value] of Object.entries(req.body)) {
		data += value + ",";
	}
	data = data.substring(0, data.length - 1);
	fs.appendFile(path, data, function (err) {
		console.log(err);
		res.redirect("/");
	});
});

app.post("/remove", upload.any(), function (req, res) {
	var path = __dirname + "/public/data.csv";
	var data = req.body.data;
	fs.writeFile(path, data, function (err) {
		console.log(err);
		res.redirect("/");
	});
});

app.post("/update", upload.any(), function (req, res) {
	// var path = __dirname + "/public/data.csv";
	// var data = req.body.data;
	// fs.writeFile(path, data, function (err) {
	// 	console.log(err);
	// 	res.redirect("/");
	// });
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
