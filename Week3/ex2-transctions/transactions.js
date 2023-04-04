const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "week3",
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySql connected...");
});

db.query("START TRANSACTION", (err) => {
	if (err) {
		throw err;
	}
	console.log("Transaction started...");
});

db.query(
	"UPDATE account SET balance = balance - 1000 WHERE account_number = 101",
	(err) => {
		if (err) {
			throw err;
		}
		console.log("1000 Euros was withdrawn from the account 101");
	}
);

db.query(
	"UPDATE account SET balance = balance + 1000 WHERE account_number = 102",
	(err) => {
		if (err) {
			throw err;
		}
		console.log("1000 Euros deposited into the account 102");
	}
);

db.query(
	'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, "2023-03-03","Transfer from account 101 to account 102")',
	(err) => {
		if (err) {
			throw err;
		}
	}
);
db.query(
	'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, 1000, "2023-03-03","Transfer from account 101 to account 102")',
	(err) => {
		if (err) {
			throw err;
		}
	}
);

db.query("COMMIT", (err) => {
	if (err) {
		throw err;
	}
	console.log("Transfer complete.");
});
