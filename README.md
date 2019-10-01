[Mud5](http://mud5games.herokuapp.com/login) was created during our Computer Science's Build Week. The front-end was built using Vanilla Javascript or Plain JavaScript, SASS and Canvas HTML. The backend was built using Python and Django Framework

### Team

| Members        | Github                          |
| :------------- | :------------------------------ |
| Zach Irvin     | https://github.com/badCompany55 |
| Thomas Utsey   | https://github.com/ThomasUtsey  |
| Bao Pham       | https://github.com/ExpressoJava |
| Javier Alvarez | https://github.com/jalvarez2020 |

## Deployment

Our front-end and backend is deployed on Heroku.
http://mud5games.herokuapp.com/login

## API

APIs are protected by built-in Django's OA.

## Frontend Dependencies

[Vanilla JavaScript or Plain JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[Axios](https://www.npmjs.com/package/axios)
[Babelify](https://github.com/babel/babelify)
[Bowserify](http://browserify.org/)
[core-js](https://www.npmjs.com/package/core-js?activeTab=readme)
[SASS](https://sass-lang.com/)
[Budo](https://www.npmjs.com/package/budo)

## Backend Dependencies/Packages

[Django](https://docs.djangoproject.com/en/2.2/)
[Django Rest REST Framework](https://www.django-rest-framework.org/)
[Postgresql](https://www.postgresql.org/)

## To run the app locally

Install Python

```bash
Check to see if Python is installed in your machine.
Fire up your terminal:
python --version

```

Install Pip and Pipenv. Click [here](https://docs.python-guide.org/dev/virtualenvs/) for documentations on how to install Pip on your machine

Make sure Postgresql is installed and set it up accordingly in settings.py
Create a database. Please follow [Postgresql](https://www.postgresql.org/) for installation and set up your super user account.

Create a Database and name it whatever you want
Go into mud5 folder > setting.py and look for DATABASE and paste this in there.
'default': {
'ENGINE':'django.db.backends.postgresql',
'NAME':'you_data_base_name_here',
'USER': 'postgres_user_name_here',
'PASSWORD': 'postgres_password_here',
'HOST': 'localhost',
'PORT':'5432'
}
name = your database name you created with Postgres
User: your super user or your user for that database you created
Password: your postgres super user password or password created for that database
Port: default port is 5432

Run server migrate:
Make sure you're in root of project folder and can see manage.py file
Make sure you're activate your env when execute

```bash
python manage.py migrate
```

to create an Admin login:

```bash
python manage.py createsuperuser
follow instructions on the prompt
```

To fire up the server:

```bash
python manage.py runserver
```

by default Django will run at 8000. Go to localhost:8000/admin
