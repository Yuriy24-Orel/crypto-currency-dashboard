1) First thing first, you need to setup database. I chose MongoDB, so you need to setup exactly MongoDB database. Here is link for downloading:
 - https://www.mongodb.com/try/download/community

Here is instructions:
 - https://www.mongodb.com/docs/guides/server/install/

2) Second thing second, in both folders "react-side" and "node-side", you need to install all dependencies and libraries. You can do it with command "npm install" and you must run that command in both folders

3) After first and second steps, you need to connect node-side to database. In file database.js, you should change db server. By default, it has this link: "mongodb://localhost:27017", but if you changed port, or server link, you also should change it in database file.

Thats all. Just run project in react-side folder with "npm start" command and inside node-side folder with "node index.js" command.