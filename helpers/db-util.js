import { MongoClient, ServerApiVersion } from "mongodb";

export async function connectDatabase() {
  const client = new MongoClient(
    "mongodb+srv://nextjsuser:CByIP6mfbSzR1ZDL@fsprojectsyelpcamp.1mtpg.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    }
  );

  await client.connect();

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("nextjscoreconcepts");

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db("nextjscoreconcepts");

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
