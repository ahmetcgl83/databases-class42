require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URL;
const dbName = "databaseWeek4";
const collectionNameAccounts = "accounts";
const collectionNameChanges = "changes";

async function transfer(fromAccount, toAccount, amount, remark) {
	const client = new MongoClient(url);
	await client.connect();

	const session = client.startSession();

	const transactionOptions = {
		readPreference: "primary",
		readConcern: { level: "local" },
		writeConcern: { w: "majority" },
	};

	try {
		await session.withTransaction(async () => {
			const coll1 = client.db(dbName).collection(collectionNameAccounts);
			const coll2 = client.db(dbName).collection(collectionNameChanges);
			const countOfChanges = await coll2.count();
			const date = new Date();

			// Important:: You must pass the session to the operations

			const fromAccountQuery = { account_number: fromAccount };
			const fromAccountDoc = await coll1.findOne(fromAccountQuery);
			if (!fromAccountDoc) {
				throw new Error(`Account ${fromAccount} not found`);
			}
			const fromAccountBalance = fromAccountDoc.balance;
			if (fromAccountBalance < amount) {
				throw new Error(`Insufficient funds in account ${fromAccount}`);
			}
			const fromAccountUpdate = { $inc: { balance: -amount } };
			const answerFrom = await coll1.updateOne(
				fromAccountQuery,
				fromAccountUpdate,
				{ session }
			);

			const toAccountQuery = { account_number: toAccount };
			const toAccountDoc = await coll1.findOne(toAccountQuery);
			if (!toAccountDoc) {
				throw new Error(`Account ${toAccount} not found`);
			}
			const toAccountUpdate = { $inc: { balance: amount } };
			const answerTo = await coll1.updateOne(
				toAccountQuery,
				toAccountUpdate,
				{ session }
			);
			if (answerTo.acknowledged && answerFrom.acknowledged)
				console.log("Transfer was successful");

			const answerChanges = await coll2.insertOne(
				{
					change_number: `C${countOfChanges + 1}`,
					amount,
					changed_date: date,
					remark,
				},
				{ session }
			);
			if (answerChanges.acknowledged) {
				console.log("Data to Changes was added!");
			}
		}, transactionOptions);
	} catch (e) {
		console.log(e);
	} finally {
		await session.endSession();
		await client.close();
	}
}

transfer("A0101", "A0102", 100, "Transfer");
