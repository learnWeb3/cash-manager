# Cash-manager (server API)

## API documentation

https://documenter.getpostman.com/view/13953520/2s8YzMZRjr

## Quick start

### On a local development machine

To start your node JS server:

  * Install dependencies with `npm install`
  * Run the seed file for you to have an admin user with `npm run seed`
  * Start the http server with `npm run dev`

### Using docker

To start the application:

  * Check that your docker desktop is up and running
  * Open a terminal and place yourself under the root project directory
  * Build the project image using `docker compose build`
  * Run the project containers using `docker compose up -d`

### Roles

* COMPANY_ADMIN => 'COMPANY_ADMIN'
* ADMIN => 'ADMIN',
* EMPLOYEE => 'EMPLOYEE'
