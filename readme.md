app name : inchallah
Endpoint  Params  Method  Description

##### api design
AUTHORIZATION
- functions
POST  User registration
POST  User login

/user/login name, email POST  User login or registration
REGISTRATION
/user/:id gcm_registration_id PUT Updates user’s gcm registration id in database

CHAT_ROOM
- functions
GET Fetches all chat rooms
GET Fetches single chat room messages
POST  Posting a message in a chat room

/chat_rooms – GET Fetches all chat rooms
/chat_rooms/:id replace :id with actual chat room id  GET Fetches single chat room messages
/chat_rooms/:id/message replace :id with actual chat room id  POST  Posting a message in a chat room

MESSAGE
POST Sending a message to user
POST Sending a message to multiple users
POST  Sending a message to all the users subscribed to a particular topic

/users/:id/message  replace :id with actual user id POST  Sending a message to user
/users/message  user_id, to, message
`to` – param is user ids separated by comma (,) POST  Sending a message to multiple users
/users/send_to_all  user_id, message  POST  Sending a message to all the users subscribed to `global` topic

#### web design interfaces
technologie utilisée 
angularjs, css, html, javascript


Installing it:

npm install -g qckwinsvc
Installing your service:

> qckwinsvc
prompt: Service name: [name for your service]
prompt: Service description: [description for it]
prompt: Node script path: [path of your node script]
Service installed
Uninstalling your service:

> qckwinsvc --uninstall
prompt: Service name: [name of your service]
prompt: Node script path: [path of your node script]
Service stopped
Service uninstalled


status 0 nouveau, 1 traité, 2 annulé


V2

- add role with permissions
 - DASHOBOARD
 - HOME
 - ADMINISTRATION
 	- Role
 	- services ou produits
 - REPORT

 - SETTINGS


Dahsboard

- Income
- Expense