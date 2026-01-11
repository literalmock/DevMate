const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://admin:ri4p6bzRA2Mndjkm@cluster0.jlomruu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

// Database Name
const dbName = 'roadhelp_db';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  // the following code examples can be pasted here...
//   //insert a document
//     const newdata = { name: "lmao vscode", email: "lmao@vscode.com" };
//     const insertResult = await collection.insertMany([newdata]);
//     console.log('Inserted documents =>', insertResult);
    // edit a document
//     const updateResult = await collection.updateOne({ name: "lmao vscode" }, { $set: { email: "lol@vscode.com" } });
//     console.log('Updated documents =>', updateResult);
// }
    // view a document
    const findResult = await collection.findOne({name: "lmao vscode"});
    console.log('Found document =>', findResult);
    //remove a document
    const deleteResult = await collection.deleteOne({ username: "testuser" });
    console.log('Deleted documents =>', deleteResult);
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());