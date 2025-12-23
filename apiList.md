# API List

## Auth
POST /login
POST /signup
POST /logout

## profile
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

## status --> ignored/accepted
POST /request/sent/interested/:userId
POST /request/sent/ignored/:userId

##  request received
POST /request/review/accept/:userId
POST /request/review/reject/:userId

## User account
GET /connections
GET /requests/received
GET /feed

