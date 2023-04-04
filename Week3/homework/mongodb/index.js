require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

const client = new MongoClient(process.env.MONGODB_URL);

async function createEpisodeExercise(client) {
	const result = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.insertOne({
			episode: "S09E13",
			title: "MOUNTAIN HIDE-AWAY",
			elements: [
				"CIRRUS",
				"CLOUDS",
				"CONIFER",
				"DECIDIOUS",
				"GRASS",
				"MOUNTAIN",
				"MOUNTAINS",
				"RIVER",
				"SNOWY_MOUNTAIN",
				"TREE",
				"TREES",
			],
		});

	console.log(
		`Created season 9 episode 13 and the document got the id ${result.insertedId}`
	);
}

async function findEpisodesExercises(client) {
	const result1 = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.findOne({
			episode: "S02E02",
		});

	console.log(`The title of episode 2 in season 2 is ${result1.title}`);

	const result2 = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.findOne({
			title: "BLACK RIVER",
		});
	console.log(
		`The season and episode number of the "BLACK RIVER" episode is ${result2.episode}`
	);

	const cursor3 = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.find({ elements: { $elemMatch: { $regex: /CLIFF/i } } });

	const results3 = await cursor3.toArray();
	const episodeTitles3 = results3.map((episode) => episode.title);
	console.log(
		`The episodes that Bob Ross painted a CLIFF are ${episodeTitles3}`
	);

	const cursor4 = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.find({
			$and: [
				{ elements: { $elemMatch: { $regex: /CLIFF/i } } },
				{ elements: { $elemMatch: { $regex: /LIGHTHOUSE/i } } },
			],
		});

	const results4 = await cursor4.toArray();
	const episodeTitles4 = results4.map((episode) => episode.title);
	console.log(
		`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${episodeTitles4}`
	);
}

async function updateEpisodeExercises(client) {
	const result1 = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.updateOne(
			{ title: "BLUE RIDGE FALLERS" },
			{ $set: { title: "BLUE RIDGE FALLS" } }
		);

	console.log(
		`Ran a command to update episode 13 in season 30 and it updated ${result1.modifiedCount} episode`
	);

	const result2 = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.updateMany(
			{ elements: { $in: ["BUSHES"] } },
			{ $set: { "elements.$": "BUSH" } }
		);

	console.log(
		`Ran a command to update all the BUSHES to BUSH and it updated ${result2.modifiedCount} episodes`
	);
}

async function deleteEpisodeExercise(client) {
	const result = await client
		.db("databaseWeek3")
		.collection("bob_ross_episodes")
		.deleteOne({ episode: "S31E14" });

	console.log(
		`Ran a command to delete episode and it deleted ${result.deletedCount} episode`
	);
}

async function main() {
	if (process.env.MONGODB_URL == null) {
		throw Error(
			`You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
		);
	}
	const client = new MongoClient(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	try {
		await client.connect();
		// Seed our database
		await seedDatabase(client);
		// CREATE
		await createEpisodeExercise(client);
		// READ
		await findEpisodesExercises(client);
		// UPDATE
		await updateEpisodeExercises(client);
		// DELETE
		await deleteEpisodeExercise(client);
	} catch (err) {
		console.error(err);
	} finally {
		// Always close the connection at the end
		client.close();
	}
}
main();
