import mysql from "mysql";

//create connection
const db = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	multipleStatements: true,
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySql connected...");
});

db.query("CREATE DATABASE IF NOT EXISTS db", (err, result) => {
	if (err) throw err;
	console.log(result);
});

db.query("USE db", (err, result) => {
	if (err) throw err;
	console.log(result);
	console.log("Connected to db...");
});

db.query(
	`CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(25),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(10))
;`,
	(err, result) => {
		if (err) throw err;
		console.log(result);
		console.log("Authors table created...");
	}
);

db.query(
	`ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor
    FOREIGN KEY (mentor)
    REFERENCES authors(author_id);`,
	(err, result) => {
		if (err) throw err;
		console.log(result);
		console.log("Authors table altered...");
	}
);

db.end();
