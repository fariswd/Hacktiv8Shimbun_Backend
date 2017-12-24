# Hacktiv8Shimbun_Backend
Mobile app server for hacktiv8 Shimbun

## HTTP Endpoint
| Endpoint         | HTTP | Require   | Description          |
|------------------|------|-----------|----------------------|
| /api/article     | POST | {json}    | post a new article   |
| /api/article/:id | PUT | params.id, {json}    | edit an article   |
| /api/article/:id | DELET | params.id | delete an article |
| /api/latest      | GET  | -         | get latest 10         |
| /api/latest/:page | GET  | params.page |  get page, 10 articles/page |
| /api/article/:id | GET  | params.id | get article by id  |
| /api/search?keyword= | GET | query.keyword | search by title |
| /api/category/:category | GET | params.category | get article by category latest 10 |
| /api/category/:category/:page | GET | params.category, params.page | get article by category, 10 articles/page |
