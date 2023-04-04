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

db.query(
	"INSERT INTO account (account_number, balance) VALUES (101, 10000.00), (102, 5000.00), (103, 7000.00)",
	(err) => {
		if (err) throw err;
		console.log("Data inserted into account table...");
	}
);

db.query(
	'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, 10000.00, "2022-04-03", "Initial balance"), (102, 5000.00, "2022-04-03", "Initial balance"), (103, 7000.00, "2022-04-03", "Initial balance")',
	(err) => {
		if (err) throw err;
		console.log("Data inserted into account_changes table...");
	}
);
