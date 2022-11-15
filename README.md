# Dr. Ticket M.D.
A simple app for client submission and vendor addressing of help tickets. Profile images are fetched from [Gravatar](https://en.gravatar.com/), and markdown ticket/comment bodies are supported by [remarkable](https://github.com/jonschlinkert/remarkable).

The Backend API and HTTP server is built with [FastAPI](https://fastapi.tiangolo.com/).

The Frontend is a static Javascript app created with [SvelteKit](https://kit.svelte.dev/)

It is designed to run on [deta.sh](https://deta.sh) for free, though it can be deployed to various diverse platforms with little effort.

## Deploy to Deta
[![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=https://github.com/johnpwillman/dr-ticket-md)

## Local Development
### Run API
The following command will run the API on 127.0.0.1:8000 using a top-level `.env` file
```
python -m uvicorn test:app --reload
```

### Run Web
The following command will run the JS frontend on 127.0.0.1:5173 using a `web/.env`
```
cd web
npm run dev
```

### Build Static Web App
The following command will build the static Frontend Web App in `web/build`
```
cd web
npm run build
```