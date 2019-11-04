# Microfrontend Sample

## About

This project is a sample to build a hello world using a microfrontend architecture, with 4 containers comunicating with each other to process a .html with a Hello World.

## Run

To run this project local and get a hello world, follow this steps:

- First make sure you have docker on your machine, im currently using docker `v18.01`.

- Then access the folder of this project from your terminal and run:

```bash
npm run build
```

- Access in a browser the url:
  http://localhost:3000

- Check each specific content accessing each individual container listed with:

```bash
docker ps
```

- Fell free to alter anything you want.
