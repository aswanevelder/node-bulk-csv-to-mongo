# node-bulk-csv-to-mongo
NodeJS function to bulk import csv data to MongoDB

# Installation
Use the package manager npm to install bulk-csv-to-mongo.

```
npm i bulk-csv-to-mongo
```

# Usage

object.insert(lines, function, [params]);

### Params

Environment Variables

STORE_DBURL = MongoDB Url \
STORE_DBNAME = MongoDB Database Name \
STORE_COLLECTIONNAME = MongoDB Collection Name

Optional Params as parameter

```
{
    STORE_DBURL: process.env.STORE_DBURL,
    STORE_DBNAME: process.env.STORE_DBNAME,
    STORE_COLLECTIONNAME: process.env.STORE_COLLECTIONNAME,
}
```

### Example

```
const nbcm = require('bulk-csv-to-mongo');

nbcm.insert(['value1,value2,value2,value3'], (lines) => {
    let collection = [];
    let data;

    lines.map(line => {
        data = line.split(",");
        if (data.length === 4) {
            collection.push({
                "value1": data[0],
                "value2": data[1],
                "value2": data[2],
                "value3": data[3]
            });
        }
    });

    console.log('Collection Count: ' + collection.length);
    return collection;
});

```


