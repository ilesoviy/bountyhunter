# BountyHunter

## configuration to app
.env file contains environment of node application.\
You should add DB_URI to .env file for database connection.\
### Example of .env file
(on Local)
```
DB_URI = "mongodb://localhost:27017/bountyhunter_db"
PORT=8888
```
Here, PORT number isn't fixed. You can change with any value you want.

## How to run/stop the app
You can login to the bash shell of machines by ssh.\
You must run the following command to install packages
```
npm install / yarn
```
You run the following commands to start app
```
npm run start
```

You run the following commands to stop app (on Local)
```
(simply press) Ctrl+C
```

## How to view logs
Logs are pushed to fifo message queue for every User action. You can purge those logs at anytime you want.

You connect to the db by any means, including shell, client tool, VSCode extension, etc.\
After that, issue the following command (view all logs):
```
use bountyhunter_db
db.logs.find({})
```
