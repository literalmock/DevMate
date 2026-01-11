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

> made them dynamic for :status == interested/ignored

##  request received
POST /request/review/accept/:requesteduserId
POST /request/review/reject/:requesteduserId

> made them dyname for :status == accept/reject

## User account
GET /connections
GET /requests/received
GET /feed

