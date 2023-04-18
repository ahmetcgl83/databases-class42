require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const url = process.env.MONGODB_URL;
const collectionNameAccounts = "accounts";
const collectionNameChanges = "changes";

async function addData() {
	const client = new MongoClient(url, { useUnifiedTopology: true });

	const dataAccounts = [
		{
			account_number: "A0101",
			balance: 10000.0,
		},
		{
			account_number: "A0102",
			balance: 134000.0,
		},
		{
			account_number: "A0103",
			balance: 6000.0,
		},
		{
			account_number: "A0104",
			balance: 100.0,
		},
		{
			account_number: "A0105",
			balance: 94000.0,
		},
		{
			account_number: "A0106",
			balance: 100.99,
		},
		{
			account_number: "A0107",
			balance: 5850.64,
		},
		{
			account_number: "A0108",
			balance: 47470.7,
		},
		{
			account_number: "A0109",
			balance: 1040.04,
		},
		{
			account_number: "A0110",
			balance: 184840.09,
		},
		{
			account_number: "A0111",
			balance: 7400.1,
		},
		{
			account_number: "A0112",
			balance: 94890.22,
		},
		{
			account_number: "A0113",
			balance: 4740.0,
		},
		{
			account_number: "A0114",
			balance: 48400.5,
		},
		{
			account_number: "A0115",
			balance: 85850.32,
		},
	];
	const date = new Date();
	const dataAccountsChanges = [
		{
			change_number: "C1",
			amount: 100.0,
			changed_date: date,
			remark: "Deposit",
		},
		{
			change_number: "C2",
			amount: 1000.0,
			changed_date: date,
			remark: "Transfer",
		},
		{
			change_number: "C3",
			amount: 100.0,
			changed_date: date,
			remark: "Deposit",
		},
		{
			change_number: "C4",
			amount: 1000.0,
			changed_date: date,
			remark: "Withdrawal",
		},
		{
			change_number: "C5",
			amount: 100.0,
			changed_date: date,
			remark: "Deposit",
		},
		{
			change_number: "C6",
			amount: 9100.0,
			changed_date: date,
			remark: "Transfer",
		},
		{
			change_number: "C7",
			amount: 7100.0,
			changed_date: date,
			remark: "Withdrawal",
		},
		{
			change_number: "C8",
			amount: 100.0,
			changed_date: date,
			remark: "Deposit",
		},
	];

	try {
		await client.connect();

		const database = client.db("databaseWeek4");

		const collectionAccounts = database.collection(collectionNameAccounts);
		await collectionAccounts.deleteMany({});
		const resultAccounts = await collectionAccounts.insertMany(
			dataAccounts
		);
		console.log("added Accounts ", resultAccounts.insertedCount);

		const collectionChanges = database.collection(collectionNameChanges);
		await collectionChanges.deleteMany({});
		const resultChanges = await collectionChanges.insertMany(
			dataAccountsChanges
		);
		console.log("added Changes ", resultChanges.insertedCount);
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

addData();
