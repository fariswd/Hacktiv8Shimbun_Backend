# Hacktiv8Shimbun_Backend
Mobile app server for hacktiv8 Shimbun

## HTTP Endpoint
| Endpoint         | HTTP    | Require   | Description          |
|------------------|---------|-----------|----------------------|
| /api/article     | POST    | {json}    | post a new article   |
| /api/article/    | GET     | - | get all article  |
| /api/article/:id | GET     | params.id | get article by id  |
| /api/article/:id | PUT     | params.id, {json}    | edit an article   |
| /api/article/:id | DELETE  | params.id | delete an article |
| /api/latest      | GET     | -         | get latest 10         |
| /api/latest/:page | GET    | params.page |  get page, 10 articles/page |
| /api/search?keyword= | GET | query.keyword | search by title |
| /api/category/:category | GET | params.category | get article by category latest 10 |
| /api/category/:category/:page | GET | params.category, params.page | get article by category, 10 articles/page |

## API Documentation
#### POST | /api/article
* Require: {json}
* Data Params:
```js
{
    "title": "[Waifu Friday] Kizuna Ai",
    "author": "Kagamine Punk",
    "image_header": "http://jpg.link.com/img.jpg",
    "category": [
      "Perfect",
      "Virtual",
      "Waifu",
      "waifu friday"
    ],
    "content": "<p>Some HTML Content</p>",
  	"createdAt": "2017-08-17T09:58:00.562Z"
}
```
* Success Response  
```js
{
	"status": "OK",
	"newArticle": {
		"__v": 0,
		"_id": "5a3f7bc02821764c7f44b86e",
    "title": "[Waifu Friday] Kizuna Ai",
    "author": "Kagamine Punk",
    "image_header": "http://jpg.link.com/img.jpg",
    "category": [
      "Perfect",
      "Virtual",
      "Waifu",
      "waifu friday"
    ],
    "content": "<p>Some HTML Content</p>",
  	"createdAt": "2017-08-17T09:58:00.562Z"
	}
}
```
* Error Response  
```js
{
    status: 'cannot post article',
    msg: <error message>
}
```

#### GET | /api/article or /api/article/:id
* Require: -
* Params:  
optional: id=[object_id]
* Data Params: -
* Success Response  
default:
```js
{
    {
    	"status": "OK",
    	"articles": [
    		{
          "__v": 0,
      		"_id": "5a3f7bc02821764c7f44b86e",
          "title": "[Waifu Friday] Kizuna Ai",
          "author": "Kagamine Punk",
          "image_header": "http://jpg.link.com/img.jpg",
          "category": [
            "Perfect",
            "Virtual",
            "Waifu",
            "waifu friday"
          ],
          "content": "<p>Some HTML Content</p>",
        	"createdAt": "2017-08-17T09:58:00.562Z"
    		},
    		{
          "__v": 0,
    			"_id": "5a3f7ac32821764c7f44b865",
          "title": "[Waifu Friday] Hatsune Miku",
          "author": "Kagamine Punk",
          "image_header": "http://jpg.link.com/img.jpg",
          "category": [
            "Perfect",
            "Virtual",
            "Waifu",
            "waifu friday"
          ],
          "content": "<p>Some HTML Content</p>",
        	"createdAt": "2017-08-10T09:58:00.562Z"
    		},
        ...
      ]
    }
}
```
using params:
```js
{
    {
    	"status": "OK",
    	"articles":
    		{
          "__v": 0,
      		"_id": "5a3f7bc02821764c7f44b86e",
          "title": "[Waifu Friday] Kizuna Ai",
          "author": "Kagamine Punk",
          "image_header": "http://jpg.link.com/img.jpg",
          "category": [
            "Perfect",
            "Virtual",
            "Waifu",
            "waifu friday"
          ],
          "content": "<p>Some HTML Content</p>",
        	"createdAt": "2017-08-17T09:58:00.562Z"
    		}
    }
}
```
* Error Response  
```js
{
    status: 'cannot get all articles',
    msg: <error message>
}
```

#### PUT | /api/article/:id
* Require: :id params
* Params:  
required: id=[object_id]
* Data Params:
```js
{
    "title": "[Waifu Friday] Kizuna Ai",
    "author": "Kagamine Punk",
    "image_header": "http://jpg.link.com/img.jpg",
    "category": [
      "Perfect",
      "Virtual",
      "Waifu",
      "waifu friday"
    ],
    "content": "<p>Some HTML Content</p>",
  	"createdAt": "2017-08-17T09:58:00.562Z"
}
```
* Success Response  
```js
{
	"status": {
		"n": 1,
		"nModified": 1,
		"ok": 1
	},
	"articleBefore": {
    "__v": 0,
		"_id": "5a3f7bc02821764c7f44b86e",
    "title": "[Waifu Friday] Kizuna Ai",
    "author": "Kagamine Punk",
    "image_header": "http://jpg.link.com/img.jpg",
    "category": [
      "Perfect",
      "Virtual",
      "Waifu",
      "waifu friday"
    ],
    "content": "<p>Some HTML Content</p>",
    "createdAt": "2017-08-17T09:58:00.562Z"
	},
	"artcileAfter": {
    "__v": 0,
		"_id": "5a3f7bc02821764c7f44b86e",
    "title": "[Waifu Friday] Kizuna Ai",
    "author": "Kagamine Punk",
    "image_header": "http://jpg.link.com/img.jpg",
    "category": [
      "Perfect",
      "Virtual",
      "Waifu",
      "waifu friday"
    ],
    "content": "<p>Some HTML Content</p>",
  	"createdAt": "2017-08-17T09:58:00.562Z"
	}
}
```
* Error Response  
```js
{
    status: "cannot edit article ID 5a3f7bc02821764c7f44b86e",
    msg: <error message>
}
```

#### DELETE | /api/article/:id
* Require: :id params
* Params:  
required: id=[object_id]  
* Data Params: -
* Success Response  
```js
{
	"status": {
		"n": 1,
		"ok": 1
	},
	"articleBefore": {
    "__v": 0,
		"_id": "5a3f7bc02821764c7f44b86e",
    "title": "[Waifu Friday] Kizuna Ai",
    "author": "Kagamine Punk",
    "image_header": "http://jpg.link.com/img.jpg",
    "category": [
      "Perfect",
      "Virtual",
      "Waifu",
      "waifu friday"
    ],
    "content": "<p>Some HTML Content</p>",
    "createdAt": "2017-08-17T09:58:00.562Z"
	}
}
```
* Error Response  
```js
{
    status: "cannot delete article ID 5a3f7bc02821764c7f44b86e",
    msg: <error message>
}
```
