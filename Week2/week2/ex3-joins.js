import mysql from "mysql";

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

db.query("USE db_week2", (err) => {
	if (err) {
		throw err;
	}
});

db.query(
	`SELECT authors.author_name, mentors.author_name AS mentor_name 
    FROM authors
    JOIN authors AS mentors ON authors.mentor = mentors.author_id`,
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);

db.query(
	`SELECT authors.*, research_Paper.paper_title 
    FROM authors_of_research_Paper 
    LEFT JOIN authors ON authors.author_id = authors_of_research_Paper.author_id 
    JOIN research_Paper ON  research_Paper.paper_id = authors_of_research_Paper.research_Paper_id 
    ORDER BY authors.author_id`,
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);
db.end();
