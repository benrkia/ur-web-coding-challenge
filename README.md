# UR Web Challenge

This is my solution of the ur web challenge.
The application require logged user to:
    - See the nearby shops
    - See the preferred shops
    - Like, Deslike or Unlike a shop

## Getting Started

The followed approach is to create an application divided into 2 parts:
    1. backend: a rest api using `laravel`
    2. frontend: signle page application using `react`

### Prerequisites

What things you need to install the application and how to install them

- composer
- Node.js
- laravel
- create-react-app

### Installing

after downloading/cloning the project folder, the steps to follow are:

>>Note:
Before runing php artisan migrate you shoud make a copy of `.env.example` and name it `.env`, then insert the database connection info
Make sure to create a database, just a database. laravel will handel the creation of tables.
In order to reshow the desliked shops after 2 hours you should create and event in database by simply run the below code:
ps: `change the user`

```sql
SET GLOBAL event_scheduler="ON";
DROP EVENT `delete_deslike_reactions_after_2_hours`;
CREATE DEFINER=`user goes here` EVENT `delete_deslike_reactions_after_2_hours` ON SCHEDULE EVERY 1 HOUR STARTS '2019-01-22 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM users_reactions WHERE users_reactions.reaction_type='deslike' && users_reactions.created_at <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
```

now you're done configuring the database, let's move to the next step

```bash
cd backend
composer update
php artisan migrate
php artisan db:seed
cd ../frontend
npm install
```

## Running the application

```bash
cd backend
php artisan serve
```

and you'll be able to access the application using the url shown in your terminal

>> make sure to create a copy of `.env.example` and name it `.env`
then change REACT_APP_API_URL with the api url

```bash
cd ../frontend
npm start
```

and done. you're ready to use the app.

## Built With

* [Laravel](https://laravel.com/)
* [React](https://reactjs.org/)

## Authors

* **Benrkia ilyasse** - [benrkia](https://benrkia.com)
