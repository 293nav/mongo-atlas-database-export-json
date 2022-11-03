const { MongoClient } = require("mongodb")
const fs = require('fs/promises')
const { checkDirectoryExists, createDirectory } = require("./file")

class Mongo {

    constructor(args){

        this._username = args.username || ""
        this._password = args.password || ""
        this._host = args.host || ""
        this._port = args.port || 27017
        this._database = args.database || "admin"
        this._client = null

    }

    getUri(){

        let uri = `mongodb+srv://${this._username}:${encodeURIComponent(this._password)}@${this._host}?retryWrites=true&w=majority`
        return uri

    }

    async connect() {

        return new Promise(async (resolve, reject) => {

            try {
            
                const uri = this.getUri()
                this._client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})
                console.log(`Initiating connection to Mongo Atlas cluster`)
                await this._client.connect()

                console.log(`Mongo Client connected`)
    
                return resolve(true)
    
            } catch (error) {
                
                return reject(error)
    
            }

        })

    }

    setDatabase(database) {

        this._database = database

    }

    async listDatabases(){

        return new Promise(async (resolve, reject) => {

            if(!this._client){

                console.log(`The client doesn't exist`)
                return reject('Invalid client')

            }

            try {
                
                let databases = [], avoid = ['admin', 'local', 'config']

                const result = await this._client.db('admin').admin().listDatabases()
                databases = result.databases.map(row => row.name).filter(db => !avoid.includes(db))

                return resolve(databases)

            } catch (error) {
                
                return reject(error)

            }

        })

    }

    async listCollections(){

        return new Promise(async (resolve, reject) => {

            if(!this._client){

                console.log(`The client doesn't exist`)
                return reject(`Invalid client`)

            }

            try {
                
                console.log(`Listing the collections in the database`)

                let collections = []
                
                const result = await this._client.db(this._database).listCollections().toArray()

                collections = result.map(row => row.name)

                return resolve(collections)


            } catch (error) {
                
                return reject(error)

            }

        })

    }

    async exportCollection(collection){

        return new Promise(async(resolve, reject) => {

            try {
                
                const directoryExists = await checkDirectoryExists(`./output/${this._database}`)

                if(!directoryExists){

                    await createDirectory(`./output/${this._database}`)

                }

                const result = await this._client.db(this._database).collection(collection).find().toArray()
                
                await fs.writeFile(`./output/${this._database}/${collection}.json`, JSON.stringify(result), {encoding: 'utf-8', flag:'w'})

                return resolve(true)


            } catch (error) {
                
                return reject(error)

            }

        })

    }

    async disconnect() {

        return new Promise(async (resolve, reject) => {

            try {
                
                await this._client.close()
                this._client = null

                console.log(`Mongo Client disconnected`)

                return resolve(true)

            } catch (error) {
                
                return reject(error)

            }

        })

    }

}

module.exports = Mongo