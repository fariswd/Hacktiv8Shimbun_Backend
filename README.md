# Hacktiv8Shimbun_Backend
Mobile app server for hacktiv8 Shimbun

## HTTP Endpoint
| Endpoint         | HTTP | Require   | Description          |
|------------------|------|-----------|----------------------|
| /api/latest      | GET  | -         | get latest 10         |
| /api/latest/:page | GET  | params.page |  get page, 10 articles/page |
| /api/article/:id | GET  | params.id | get article by id  |
| /api/search?keyword= | GET | query.keyword | search by title |
| /api/catagory/:catagory | GET | params.catagory | get article by catagory latest 10 |
| /api/catagory/:catagory/:page | GET | params.catagory, params.page | get article by catagory, 10 articles/page |
