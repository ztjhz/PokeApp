# PokeApp

## 👉 [Website](http://ec2-54-179-68-12.ap-southeast-1.compute.amazonaws.com/)

|Category|Tech Stack|
|----|----|
|Frontend|React, Redux|
|Backend|Django, DjangoRestFramework,<br/>Djoser + JWTAuthentication|
|Database|Postgresql,  SQLite|
|Deployment|AWS EC2 (T2.micro) + AWS RDS (postgresql)|

<br/>

## Table of Contents

- [PokeApp](#pokeapp)
  - [👉 Website](#-website)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Frontend](#frontend)
  - [Deployment](#deployment)
    - [Deploying the app for production](#deploying-the-app-for-production)
    - [Deploying the app locally](#deploying-the-app-locally)
  - [API endpoints](#api-endpoints)
  - [Djoser API endpoints](#djoser-api-endpoints)
  - [Problems](#problems)

## Features

1. Has user authentication (login/sign-up) mechanisms

   - Utilized `Djoser` and `JWTAuthentication`
   - Each user has to login with a `username` and `password`

2. Allows users to view the current portfolio of pokemon they own and their stats

   - Each pokemon may only be owned by a single user and identified by its unique `ID`
   - Each owner may own any number of pokemon
   - Each pokemon has a (int) `level` `1-100` that is randomly generated upon capture

3. Allows users to add newly captured pokemon to their portfolio, and remove pokemon from their portfolio
   - Show a randomly generated pokemon from the dataset (from the list of all pokemons), available for capture
   - To capture, we implement a simple “guess the number” game (see https://www.funbrain.com/games/guess-the-number)
   - If the user correctly guesses the number within 3 tries, the pokemon is captured, and added to the user’s portfolio
   - If the user is not able to guess the number within 3 tries, the pokemon is returned to the wild, the page is refreshed, and a new game instance is generated (with new randomly generated pokemon)
4. Allows users to view the names of pokemons they do not own yet (only names, not the stats)

<br/>

## Frontend

Pages

- Login
- Signup
- Collection
- Catch Pokemon

<br/>

## Deployment

### Deploying the app for production

- Front end -> AWS EC2 (T2.micro)
- Back end -> AWS EC2 (T2.micro)
- Database -> AWS Relational Database Service (PostgreSQL)

Start the `Django` server

```
py -m pip install -r requirements.txt // in backend folder
py manage.py makemigrations
py manage.py migrate
py manage.py collectstatic
py manage.py run server 0.0.0.0:80
```

### Deploying the app locally

- Set up database
  - `py manage.py makemigrations`
  - `py manage.py migrate`
- Start the Django server
  - `py manage.py runserver`
  - Go to `localhost:8000` to view the PokeApp
- Run frontend react app
  - `npm install`
  - `npm run start`
- Build frontend react app
  - `npm run build`
- Update frontend static files
  - Run `npm run build` in `frontend` directory
  - Copy the `build` folder to the `backend` directory

<br/>

## API endpoints

1. `pokemon/unownedpokemon/` - a GET request here should return a serialised list of
   all the pokemon that the user does not currently own
2. `pokemon/mypokemon/` - a GET request here should return a serialised list of the
   pokemon owned by the user
3. `pokemon/allpokemon/` - a GET request here should return a serialised list of all
   pokemon in the dataset
4. `pokemon/addpokemon/` - a POST request here should add a pokemon to the user’s
   collection
5. `pokemon/releasepokemon/` - a POST request here should allow a user to discard
   one of his pokemons in his collection

<br/>

## Djoser API endpoints

Create User:

```
POST http://localhost:8000/auth/users/

HEADERS Content-Type application/json

BODY
{
    "username": "Jing Hua",
    "password": "123toh45",
    "re_password": "123toh45"
}
```

Get JSON Web Token:

```
POST http://localhost:8000/auth/jwt/create/

HEADERS Content-Type application/json

BODY
{
    "username": "Jing Hua",
    "password": "123toh45"
}
```

## Problems

| Type           | Problem                                                                                                                                     | Action                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication | request.user is `AnonymousUser` instead of username                                                                                         | workaround is to query for current user from djoser from the frontend and feed it to the backend                                                                                                                                                                                                                                                                                                          |
| Error handling | handle error for edge cases                                                                                                                 | Did not do much error handling because of time constraints due to academic work load                                                                                                                                                                                                                                                                                                                      |
| Deployment     | Refused to execute script, strict MIME type checking is enabled <br/><br/> Reason: paths for static files were returning index.html instead | 1. added `type="application/json"` to the bundle script tag <br/><br/>2. [[source]](https://stackoverflow.com/questions/67271401/how-to-correctly-serve-my-react-production-build-through-django-currently-havin) change from <br/> `re_path(r'^.*', TemplateView.as_view(template_name='index.html'))`<br/> to<br/> `re_path(r"^(?!static)(?:.*)/?$", TemplateView.as_view(template_name='index.html'))` |
| Deployment     | Static file not found (`404` error) <br/><br/>Did not know that django did not support static file hosting in production                    | Workaround: use whitenoise [[source]](https://devcenter.heroku.com/articles/django-assets)                                                                                                                                                                                                                                                                                                                |
| Deployment     | AttributeError: type object 'BlacklistedToken' has no attribute 'objects'                                                                   | Workaround [[source]](https://stackoverflow.com/questions/57867859/type-object-user-has-no-attribute-objects-django): <br/> Added to `settings.py`:<br/>`SIMPLE_JWT = { 'ROTATE_REFRESH_TOKENS': False, 'BLACKLIST_AFTER_ROTATION': False, 'UPDATE_LAST_LOGIN': False, }`                                                                                                                                 |
