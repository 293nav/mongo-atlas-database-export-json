# mongo-atlas-database-export-json
Export all the databases and collections present in mongo atlas into json files.

## Setup
1. Execute ```npm install``` to install the packages required
2. Update the configuration details in the .env file.
3. Check if the output folder exists at the root of the repo. If not exists, create the output folder. All the outputs of the export will be stored in this folder.

## Execute
1. Execute ```npm run start``` command at the root of the repo to execute the script and export all the databases and collections present in the given atlas cluster

## .env file structure
MONGO_USERNAME=USERNAME\
MONGO_PASSWORD=PASSWORD\
MONGO_HOST=ATLAS CLUSTER ENDPOINT
