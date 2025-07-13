# Brief-Service API

## Endpoints

### Get all briefs
- **GET** `/briefs`
- **Response:**
```json
[
  {
    "_id": "...",
    "title": "...",
    "description": "...",
    "competences": ["..."],
    "apprenants": ["..."],
    "createdAt": "...",
    "updatedAt": "..."
  },
  ...
]
```

### Get a brief by ID
- **GET** `/briefs/:id`
- **Response:**
```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "competences": ["..."],
  "apprenants": ["..."],
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Assign an apprenant to a brief
- **POST** `/briefs/:id/apprenants`
- **Body:**
```json
{
  "apprenantId": "<apprenant_id>"
}
```
- **Response:**
```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "competences": ["..."],
  "apprenants": ["...", "<apprenant_id>", ...],
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Unassign an apprenant from a brief
- **DELETE** `/briefs/:id/apprenants`
- **Body:**
```json
{
  "apprenantId": "<apprenant_id>"
}
```
- **Response:**
```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "competences": ["..."],
  "apprenants": [ ... ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Add a competence to a brief
- **POST** `/briefs/:id/competences`
- **Body:**
```json
{
  "competenceId": "<competence_id>"
}
```

### Remove a competence from a brief
- **DELETE** `/briefs/:id/competences`
- **Body:**
```json
{
  "competenceId": "<competence_id>"
}
```

### Add multiple competences to a brief
- **POST** `/briefs/:id/competences/bulk`
- **Body:**
```json
{
  "competenceIds": ["<competence_id1>", "<competence_id2>"]
}
``` 