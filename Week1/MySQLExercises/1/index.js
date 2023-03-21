const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "meetup",
});

db.connect((err) => {
	if (err) throw err;
	console.log("Database connected");
});

const createDatabaseSql = "CREATE DATABASE IF NOT EXISTS meetup";
db.query(createDatabaseSql, (err, result) => {
	if (err) throw err;
	console.log("Database created", result);
});

const dropInviteeSql = "DROP TABLE IF EXISTS invitee";
const createInviteeSql =
	"CREATE TABLE invitee (invitee_no INT AUTO_INCREMENT, invitee_name VARCHAR(255), invitee_by VARCHAR(255), PRIMARY KEY (invitee_no))";
db.query(dropInviteeSql, (err, result) => {
	if (err) {
		console.log("Error dropping invitee table", err);
	}
	console.log("Invitee table dropped", result);
	db.query(createInviteeSql, (err, result) => {
		if (err) throw err;
		console.log("Invitee table created", result);

		const insertInvitee =
			"INSERT INTO invitee (invitee_name, invitee_by) VALUES ('The Doe','John'), ('Holy', 'John'), ('John', 'Doe'), ('Don', 'Quixote'), ('Holy', 'Doe')";
		db.query(insertInvitee, (err, result) => {
			if (err) throw err;
			console.log("Records inserted in invitee table", result);
		});
	});
});

const dropRoomSql = "DROP TABLE IF EXISTS room";
const createRoomSql =
	"CREATE TABLE room (room_no INT AUTO_INCREMENT, room_name VARCHAR(255), floor_number INT, PRIMARY KEY (room_no))";
const insertRoomSql =
	"INSERT INTO room (room_name, floor_number) VALUES ('Magna', 1), ('Card', 1), ('Eden', 2), ('Garden', 2), ('Oasis', 2)";
db.query(dropRoomSql, (err, result) => {
	if (err) {
		console.log("Error dropping room table", err);
	}
	console.log("Room table dropped", result);
	db.query(createRoomSql, (err, result) => {
		if (err) throw err;
		console.log("Room table created", result);
		db.query(insertRoomSql, (err, result) => {
			if (err) throw err;
			console.log("Records inserted in room table", result);
		});
	});
});

const dropMeetingSql = "DROP TABLE IF EXISTS meeting";
const createMeetingSql =
	"CREATE TABLE meeting (meeting_no INT AUTO_INCREMENT, meeting_title TEXT, starting_time DATETIME, ending_time DATETIME, room_no INT, PRIMARY KEY (meeting_no), FOREIGN KEY (room_no) REFERENCES room (room_no))";
const insertMeetingSql =
	"INSERT INTO meeting (meeting_title, starting_time, ending_time, room_no) VALUES ('Message 1', '2022-02-03 10:22:15', '2022-02-03 12:25:30', 1), ('Message 2', '2022-03-03 18:13:15', '2022-03-03 20:25:30', 2), ('Message 3', '2022-04-04 10:22:15', '2022-04-04 12:25:30', 3), ('Holy Message', '2022-06-12 13:13:13', '2022-06-12 13:13:13', 4), ('Main message', '2022-07-07 07:07:07', '2022-07-07 08:08:08', 5)";

db.query(dropMeetingSql, (err, result) => {
	if (err) {
		console.log("Error dropping meeting table", err);
	}
	console.log("Meeting table dropped", result);
	db.query(createMeetingSql, (err, result) => {
		if (err) throw err;
		console.log("Meeting table created", result);
		db.query(insertMeetingSql, (err, result) => {
			if (err) throw err;
			console.log("Records inserted into meeting table", result);
		});
	});
});
