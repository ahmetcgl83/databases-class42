import mysql from "mysql";

//create connection
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

db.query(`CREATE DATABASE IF NOT EXISTS db_week2`);

db.query(`USE db_week2`, (err, result) => {
	if (err) throw err;
	console.log(result);
	console.log("Connected to db...");
});

db.query(
	`CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
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

db.query(
	`INSERT INTO authors 
		(author_name, university, date_of_birth, h_index, gender,mentor) 
		VALUES (
		'Sarah Johnson', 'Massachusetts Institute of Technology', '1985-05-15', 10, 'Female', null),
		('David Wilson', 'Harvard University', '1978-10-23', 15, 'Male', 1), 
		('Emily Green', 'Stanford University', '1990-02-01', 8, 'Female', 2), 
		('Maria Rodriguez', 'Massachusetts Institute of Technology', '1987-12-07', 12, 'Female', 1), 
		('Andrew Kim', 'Stanford University', '1982-06-12', 9, 'Male', 4), 
		('Sophia Lee', 'Columbia University', '1984-08-18', 14, 'Female', 5), 
		('Chris Brown', 'University of Cambridge', '1975-03-25', 11, 'Male', 3), 
		('Karen Davis', 'Yale University', '1993-01-09', 7, 'Female', 7), 
		('Michael Chen', 'University of Oxford', '1989-11-02', 10, 'Male', 3), 
		('Rachel Lee', 'University of Oxford', '1981-09-29', 16, 'Female', 2), 
		('Kevin Thompson', 'Princeton University', '1983-07-14', 12, 'Male', 6), 
		('Amy Kim', 'Harvard University', '1992-04-05', 6, 'Female', 2), 
		('Daniel Kim', 'ETH Zurich', '1986-12-01', 13, 'Male', 5), 
		('Grace Rodriguez', 'Harvard University', '1979-02-17', 9, 'Female', 6), 
		('Thomas Brown', 'University of Oxford', '1980-06-21', 11, 'Male', 3)`,
	(err) => {
		if (err) {
			throw err;
		}
		console.log("Author data inserted ...");
	}
);

db.end();
