const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySql connected...");
});

db.query("CREATE DATABASE IF NOT EXISTS week3", (err) => {
	if (err) throw err;
	console.log("Database created...");
});

db.query("USE week3", (err) => {
	if (err) throw err;
});

db.query(
	"CREATE TABLE IF NOT EXISTS account (account_number INT PRIMARY KEY, balance DECIMAL(10,2) NOT NULL)",
	(err) => {
		if (err) throw err;
		console.log("Table-account created...");
	}
);

db.query(
	"CREATE TABLE IF NOT EXISTS account_changes (change_number INT AUTO_INCREMENT PRIMARY KEY, account_number INT, amount DECIMAL(10,2) NOT NULL, changed_date DATE NOT NULL, remark VARCHAR(255), FOREIGN KEY (account_number) REFERENCES account(account_number))",
	(err) => {
		if (err) throw err;
		console.log("Table-account-changes created...");
	}
);
