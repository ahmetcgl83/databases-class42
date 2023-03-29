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
	console.log("Using db_week2...");
});

db.query(
	`SELECT research_Paper.paper_id, research_Paper.paper_title, 
    COUNT(authors.author_id) AS number_of_authors 
    FROM research_Paper 
    JOIN authors_of_research_Paper ON authors_of_research_Paper.research_Paper_id = research_Paper.paper_id 
    JOIN authors ON authors_of_research_Paper.author_id = authors.author_id 
    GROUP BY research_paper.paper_id ORDER BY research_Paper.paper_id`,
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);

db.query(
	'WITH new_table AS (SELECT authors.author_name, authors.gender, research_Paper.paper_id, research_Paper.paper_title FROM authors JOIN authors_of_research_Paper ON authors_of_research_Paper.research_Paper_id = authors.author_id JOIN research_Paper ON authors_of_research_Paper.author_id = research_Paper.paper_id WHERE authors.gender = "Female") SELECT COUNT(gender) AS Summing_papers_published_by_all_female_authors FROM new_table',
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);

db.query(
	`SELECT university, AVG(h_index) AS average_h_index 
    FROM authors 
    GROUP BY university`,
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);

db.query(
	`SELECT authors.university, COUNT(authors_of_research_Paper.research_Paper_id) AS num_papers 
    FROM authors 
    JOIN authors_of_research_Paper ON authors.author_id = authors_of_research_Paper.author_id 
    GROUP BY authors.university`,
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);

db.query(
	`SELECT university, MAX(h_index) AS max_h_index, MIN(h_index) AS min_h_index 
    FROM authors GROUP BY university`,
	(err, result) => {
		if (err) {
			throw err;
		}
		console.log(result);
	}
);
db.end();
