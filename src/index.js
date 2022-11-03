const Mongo = require('./utils/mongo')
require('dotenv').config()

const main = async () => {

    try {
        
        const mongoClient = new Mongo({
            username: process.env.MONGO_USERNAME,
            password: process.env.MONGO_PASSWORD,
            host: process.env.MONGO_HOST
        })

        await mongoClient.connect()

        const databases = await mongoClient.listDatabases()
        console.log(`Database List: `,databases)

        for(let i=0;i<databases.length;i++){

            console.log(`Exporting ${databases[i]}`)
            mongoClient.setDatabase(databases[i])

            const collections = await mongoClient.listCollections()
            for(let j = 0;j<collections.length;j++){

                console.log(collections[j])
                await mongoClient.exportCollection(collections[j])

            }
            console.log(`#####################`)

        }

        await mongoClient.disconnect()

    } catch (error) {
        
        console.log(error)

    }

}

main()