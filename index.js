const environment = require('./config/environment');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

exports.insert = (lines, createCollection, params) => {
    if (!createCollection) {
        console.log('Please specify a createCollection function.');
        return;
    }

    if (params) {
        environment = params;
    }

    MongoClient.connect(environment.STORE_DBURL, function (err, client) {
        if (err)
            console.error(err.message);

        const db = client.db(environment.STORE_DBNAME);
        const collection = db.collection(environment.STORE_COLLECTIONNAME);

        collection.deleteMany({}).then(async () => {
            try {
                console.log('Cleared Collection');
                const dataArray = createCollection(lines);
                const chunkArray = _.chunk(dataArray, 50000);

                for (let x = 0; x < chunkArray.length; x++) {
                    const data = chunkArray[x];
                    console.log(`Try to insert collection ${x} with total records of ${data.length}`);
                    await collection.insertMany(data).then((result) => {
                        console.log("Inserted records: " + result.result.n);
                        if (x === chunkArray.length - 1) {
                            console.log("Waiting for DB to complete.")
                            setTimeout(() => { client.close(); console.log("Done"); }, 60000);
                        }
                    }).catch((err) => console.log(err));
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

