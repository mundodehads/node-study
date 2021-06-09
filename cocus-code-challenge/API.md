# API Documentation

## [GET] /repositories/{user}

### Path parameters

Parameter | Type | Description
---|---|---
user | `string` | Github username

### Responses

- `200`:
    - ```json
      [{
          "name": "string",
          "owner": "string",
          "branches": [{
              "name": "string",
              "lastCommitSha": "string"
          }]
      }]
      ```
- `404`:
    - ```json
      {
        "currentRoute": "string",
        "error": "string",
        "existingRoutes": [
            "string"
        ],
        "statusCode": 404
      }
      ```
- `406`:
    - ```json
      {
        "status": 406,
        "message": "string"
      }
      ```
- `500`:
    - ```json
      {
        "status": 500,
        "message": "string"
      }
      ```