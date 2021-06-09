# EdirectInsure Todo List

## How to run - Front End

First you need to access frontend folder:

```
cd frontend
```

Then, install all dependencies:

```
npm install
```

After all dependencies is installed, you run:

```
gatsby develop
```

Then, open any browser and go to http://localhost:8000/

## How to run - Backend

Before you configure your backend, you need to install mongodb and create a collection named `todolist`.

Then, you need to access backend folder:

```
cd backend
```

Then, install all dependencies:

```
npm install
```

In the backend you also need to configure local environments, create a .env file with the following:

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/todolist
```

After all, you run:

```
npm start
```

You can also run tests with:

```
npm test
```

And check coverage with:

```
npm run coverage
```




