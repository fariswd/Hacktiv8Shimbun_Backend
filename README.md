# Hacktiv8Shimbun_Backend
Mobile app server for hacktiv8 Shimbun

## HTTP Endpoint
| Endpoint         | HTTP | Require   | Description          |
|------------------|------|-----------|----------------------|
| /api/articles    | GET  | -         | public fetch         |
| /api/article/:id | GET  | params.id | get article by id    |
| /api/search?keyword= | GET | query.keyword | search by title |
| /api/catagory/:catagory | GET | params.catagory | get article by catagory |
