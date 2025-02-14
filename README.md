# AI express test assignment

## Prerequisites
- Clone the repository

```
git clone https://github.com/valtkachenko/ai-express.git
cd ai-express
```
- Copy .env.example to .env file and fill it
```bash  
cp .env-example .env
```
Environment variables:
```
PORT=5001

# project relies on a gpt-4o-mini model 
OPENAI_API_KEY=...
```

## Running locally via docker compose
1. Make sure docker is installed on your machine
2. Make sure to set environment variables (.env)
3. Run
```
docker compose up --build
```
And in order to stop container:
```
docker compose down
```


## Running locally via Docker
1. Make sure docker is installed on your machine
2. Make sure to set environment variables (.env)
3. Run:
```
docker build -t ai-express .
docker run --name ai-express -p 5001:5001 ai-express
```

## Running locally
1. Make sure Node.js v20+ is installed
2. Install dependencies:
```
npm install
``` 
3. Make sure to set environment variables (.env)
4. Start the server
```
npm run start
``` 

## Available endpoints
1. GET /

Test "hello-world" endpoint
2. POST /sales/insights

Request body example:
```
[
  {
    "name": "Alice Johnson",
    "email": "alice.johnson1@example.com",
    "product": "Widget A",
    "category": "Widgets",
    "amount": 120.50,
    "date": "2023-03-01",
    "state": "California"
  },
  {
    "name": "Bob Smith",
    "email": "bob.smith2@example.com",
    "product": "Widget A",
    "category": "Widgets",
    "amount": 85.00,
    "date": "2023-03-02",
    "state": "California"
  }
]
```

