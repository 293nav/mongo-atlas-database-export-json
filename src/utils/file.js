const fs = require('fs/promises')

const checkDirectoryExists = async (path) => {

    return new Promise(async (resolve, reject) => {

        try {
            
            if(!path){
                throw Error('no path provided')
            }

            await fs.access(path)
            return resolve(true)

        } catch (error) {
            
            return resolve(false)

        }

    })

}

const createDirectory = async (folder) => {

    return new Promise(async (resolve, reject) => {

        try {
            
            await fs.mkdir(folder)
            return resolve(true)

        } catch (error) {
            
            return reject(error)

        }

    })

}

module.exports = {
    checkDirectoryExists,
    createDirectory
}