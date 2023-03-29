import mysql from "mysql";

const db = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "db_week2",
	multipleStatements: true,
});

db.connect((err) => {
	if (err) throw err;
	console.log("MySql connected...");
});

db.query(`CREATE DATABASE IF NOT EXISTS db_week2`);

db.query(`USE db_week2`, (err) => {
	if (err) throw err;
	console.log("Using db_week2...");
});

db.query(
	`CREATE TABLE IF NOT EXISTS research_Paper (
    paper_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    paper_title VARCHAR(255), 
    conference VARCHAR(255), 
    publish_date DATE)
    `,
	(err) => {
		if (err) throw err;
		console.log("Table research_Paper created ...");
	}
);

db.query(`DROP TABLE IF EXISTS author_of_research_Paper`);

db.query(
	`CREATE TABLE IF NOT EXISTS author_of_research_Paper (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    author_id INT, 
    research_Paper_id INT, 
    FOREIGN KEY (author_id) REFERENCES authors (author_id), 
    FOREIGN KEY (research_Paper_id) REFERENCES research_Paper (paper_id))`,
	(err) => {
		if (err) throw err;
		console.log("Table author_of_research_Paper created ...");
	}
);

db.query(
	`INSERT INTO research_Paper (paper_title, conference, publish_date) 
VALUES
('Paper 1', 'Conference 1', '2022-01-01'),
('Paper 2', 'Conference 2', '2022-02-01'),
('Paper 3', 'Conference 3', '2022-03-01'),
('Paper 4', 'Conference 4', '2022-04-01'),
('Paper 5', 'Conference 5', '2022-05-01'),
('Paper 6', 'Conference 6', '2022-06-01'),
('Paper 7', 'Conference 7', '2022-07-01'),
('Paper 8', 'Conference 8', '2022-08-01'),
('Paper 9', 'Conference 9', '2022-09-01'),
('Paper 10', 'Conference 10', '2022-10-01'),
('Paper 11', 'Conference 11', '2022-11-01'),
('Paper 12', 'Conference 12', '2022-12-01'),
('Paper 13', 'Conference 13', '2023-01-01'),
('Paper 14', 'Conference 14', '2023-02-01'),
('Paper 15', 'Conference 15', '2023-03-01'),
('Paper 16', 'Conference 16', '2023-04-01'),
('Paper 17', 'Conference 17', '2023-05-01'),
('Paper 18', 'Conference 18', '2023-06-01'),
('Paper 19', 'Conference 19', '2023-07-01'),
('Paper 20', 'Conference 20', '2023-08-01'),
('Paper 21', 'Conference 21', '2023-09-01'),
('Paper 22', 'Conference 22', '2023-10-01'),
('Paper 23', 'Conference 23', '2023-11-01'),
('Paper 24', 'Conference 24', '2023-12-01'),
('Paper 25', 'Conference 25', '2024-01-01'),
('Paper 26', 'Conference 26', '2024-02-01'),
('Paper 27', 'Conference 27', '2024-03-01'),
('Paper 28', 'Conference 28', '2024-04-01'),
('Paper 29', 'Conference 29', '2024-05-01'),
('Paper 30', 'Conference 30', '2024-06-01')
`
);

db.query(`
    INSERT INTO author_of_research_Paper (
        author_id, research_Paper_id
    ) VALUES 
        (5,28),(5,21),(6,7),(6,13),(6,23),(7,3),(7,10),(7,11),(8,17),(8,22),
        (1,4),(1,9),(1,12),(2,1),(2,5),(2,15),(3,2),(3,19),(3,29),(4,8),
        (9,6),(9,14),(10,15),(10,20),(10,21),(11,23),(11,25),(11,27),(12,30),
`);

db.end();
