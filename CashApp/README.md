# TimeManager (mobile)

## API documentation

https://documenter.getpostman.com/view/13953520/2s8YCjDXs6

## Quick start

### On a local development machine

To start the project:

  * Install dependencies with `npm i`
  * Install expo globally on your system with `npm i -g expo`
  * Install ngrok on your local machine in order to expose your localhost backend server on the web and be able to call it from the mobile emulated app
  * Install android studio (https://docs.expo.dev/workflow/android-studio-emulator/)
  * Launch ngrok using with `ngrok http <BACKEND API PORT RUNNING ON LOCALHOST HERE 4000>`
  * Ammend your .env file available at the root of the mobile directory with the url provided by ngrok eg "https://8388-163-5-23-136.eu.ngrok.io/api"
  * Make the necessary configurations to launch a phone emulator 
  * Launch the app using `npm run start` and then choose android when prompted


### Using the production API server

To start the project:

  * Install dependencies with `npm i`
  * Install expo globally on your system with `npm i -g expo`
  * Install android studio (https://docs.expo.dev/workflow/android-studio-emulator/)
  * Make the necessary configurations to launch a phone emulator 
  * Launch the app using `npm run start` and then choose android when prompted


### Admin user credentials 

Credentials 

  * email: "admin@yopmail.com"
  * password: "foobar"

### Roles

  * admin" => 1
  * manager => 2
  * employee" => 3

## Learn more

  * Official website: https://www.phoenixframework.org/
