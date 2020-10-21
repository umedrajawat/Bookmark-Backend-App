# Bookmark-Backend-App

Commands to run the backend

>>git clone https://github.com/umedrajawat/Bookmark-Backend-App.git
>>npm i    //this will install all the node modules required for running the server
>>npm run dev

PORT - 3000

TECH STACK used-
Node.js
Express.js
MongoDB
Mongoose.js
AWS EC2


3rd party Libraries used-
Express
Url
Html-metadata-parser
validate
Mongodb
Mongoose









Explanation of the Solution
Server:
Created a server using express exposing following endpoints
http://localhost:3000/bookmark [METHOD-POST ] 
http://localhost:3000/bookmarks[METHOD-GET]
http://localhost:3000/bookmarks/:id[METHOD-GET ]
http://localhost:3000/bookmarks/:id[METHOD-DELETE ]
http://localhost:3000/tags[METHOD-POST ]
http://localhost:3000/tags [METHOD-GET]
http://localhost:3000/tags/:id [METHOD-GET ]
http://localhost:3000/tags/:id [METHOD-DELETE]
http://localhost:3000/addTag [METHOD-PATCH]

DEPLOYMENT - These APIs are deployed in AWS EC2 instance and can be used by replacing 
http://localhost:3000 with http://3.80.214.221:3000/

Eg - http://3.80.214.221:3000/addTag 

EXPLANATIONS - 
http://localhost:3000/bookmark [METHOD-POST ] -  This API is used to create a new Bookmark by adding the link of the Bookmark with the request body as JSON .Title and Publisher are fetched from the link using url and html-metadata-parser
http://localhost:3000/bookmarks[METHOD-GET] - This API is used to retrieve all the bookmarks in the collection.
 
http://localhost:3000/bookmarks/:id[METHOD-GET ] - This will display only a particular bookmark with id provided in req param. eg: http://localhost:3000/ab8783494egh 
 
http://localhost:3000/bookmarks/:id[METHOD-DELETE ]- This will delete only a particular bookmark with id provided in req param.  eg: http://localhost:3000/ab8783494egh 

http://localhost:3000/tags[METHOD-POST ] - This will create a new Tag . We need to provide Title of the Tag with the body in JSON format

http://localhost:3000/tags [METHOD-GET] - This will retrieve all the Tags stored in the Tags collection

http://localhost:3000/tags/:id [METHOD-GET ] - This API will retrieve only particular tag using the id passed as req param

http://localhost:3000/tags/:id [METHOD-DELETE] - This API will delete only particular tag using the id passed as req param


http://localhost:3000/addTag [METHOD-PATCH]  - This API will add the tag with the id passed in body as tag to bookmark having id passed in Bookmark in body as JSON format

