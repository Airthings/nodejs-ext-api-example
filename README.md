## Using the Airthings Api with Node

This sample code involves using a simple Node.js webapp as a front-end interface using the simple-oauth2 protocol to authenticate and access the Airthings API using the Authorization Grant Ouath2 flow.

Please note that this is a basic example created only to show how to access information from the Airthings API. 
**Do not** use this code in production without first implementing standard security within your web application.
Tokens used to access data are stored directly in a server variable and are only intended to be used by a single individual or organization.

For more information about the Airthings ext-API visit the [Getting started with Airthings Api](https://deeloper.airthings.com) developer site for more information.


## Required dependencies

* [Node.js](https://nodejs.org)

## How to use
**Setup**

Clone the repisitory:
```
$ git clone https://github.com/Airthings/nodejs-ext-api-example
```

Install dependencies:

```
$ cd nodejs-ext-api-example
$ npm install
```

Launch the webapp:
```
$ node index.js
```

Your app should be running! If you direct your browser to http://localhost:3000, you should see the login screen.
Please note that the app will not work until it's fully configured.

## Configure your app
**Client information**

The configuration variables for this app are located in `config.json`. Locate and open this file. We will need to update 3 items:
- `clientId`
- `clienSecret`
- `redirectUri`

Replace these values with the values found in your Airthings HBD client on [Airthings accounts](https://accoutns.airthings.com). 

Once these valid values have been entered, the app will be ready to run. Note that using `localhost` and `http` is for development only. Once your app goes into production, your app will need to be hosted over `https`.



**Fetching data**

Navigate to `ìndex.ejs` in the ``views``folders. Here you will see a list of navigational buttons, each fetching data from a single ext-api endpoint.
Note that this is an example application only and is only meant to be used as example on how to fetch data from the ext-api.
For several of those to work, the values following the `/` need to be replaced with actual values.

For example, to fetch data for a single device, fetch all your devices and then copy-paste its id as in the example below: 

```
<a href="/devices/2930000000">Device by idr</a>
```



## How it works
**Dynamic pages**

For every route this application responds with dynamic HTML pages. The files can be found in the `views` folder. These files 
use the  `.ejs` extention which stands for Embedded JavaScript. EJS is a templating language and it allows you to use static template files that are rendered
at runtime.

This has several benefits, one of which is especially useful in this example. EJS allows us to embed Javascript into the HTML file.
Here is a code example:
 
```
res.render('index', { data: your_variable });
```

In our app this functionality is used to send the data fetched from an Airthings account and post it to the ``index.ejs`` file and display it to the client. To access the data in ``index.ejs``, the following syntax is used:
```
<% if(data !== null) { %>
 <%= data %>
<% } %>
```
