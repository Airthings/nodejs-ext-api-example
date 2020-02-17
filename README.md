## Using the Airthings Api with Node

This sample code involves using a simple Node.js web app as a front-end interface using the simple-oauth2 library to authenticate and access the Airthings API using the Authorization Grant Ouath2 flow.
For an example of how to configure your app to support the Client Credentials flow, see the bottom of the [configure your app](#configure-your-app) section.

Please note that this is a basic example created only to show how to access information from the Airthings API. 
**Do not** use this code in production without first implementing standard security within your web application.
Tokens used to access data are stored directly in a server variable and are only intended to be used by a single individual or organization, Authentication, and Authorization of the frontend is out of scope for this example.

For more information about the Airthings ext-API visit the [Getting started with Airthings Api](https://developer.airthings.com) developer site for more information.


## Required dependencies

* [Node.js](https://nodejs.org)
* [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)

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

Replace these values with the values found in your Airthings HBS client, created on [Airthings accounts](https://accounts.airthings.com). 

Once these valid values have been entered, the app will be ready to run. Note that using `localhost` and `http` is for development only. Once your app goes into production, your app will need to be hosted over `https`.



**Fetching data**

Navigate to `ìndex.ejs` in the ``views`` folder. Here you will see a list of navigational buttons, each fetching data from a single ext-api endpoint.
Note that this is an example application only and is only meant to be used as example on how to fetch data from the ext-api.
For several of those to work, the text following the `/` need to be replaced with actual values.

For example, to fetch data for a single device, fetch all your devices and then copy-pase one of its id's as in the example below: 

```
<a href="/devices/2930000000">Device by idr</a>
```

####Client credentials flow
Especially for machine-to-machine (m2m) authentication, we have implemented Client Credentials from the OAuth2 spec. 
To configure the sample code for m2m, edit the existing code as shown below. You can also remove the ``/callback`` router endpoint and the 
``authorizationUri`` variable used for authorization code.

```
const oauth2 = simpleOauthModule.create({
    client: {
        id: config.clientId,
        secret: config.clientSecret,
    },
    auth: {
        tokenHost: 'https://accounts.airthings.com',
        tokenPath: 'https://accounts-api.airthings.com/v1/token'
    },
});

const tokenConfig = {
    scope: 'read:device',
};

router.get('/auth', async (req, res) => {
    try {
        const result = await oauth2.clientCredentials.getToken(tokenConfig);
        accessToken = oauth2.accessToken.create(result);
        res.redirect('/');
    } catch (error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }
});
```


## How it works
**Dynamic pages**

For every route this application responds with dynamic HTML pages. The files can be found in the `views` folder, which use the  `.ejs` extention, short for Embedded JavaScript. EJS is a templating language that allows you to use static template files that are rendered at runtime.

This has several benefits, one of which is especially useful in our example. EJS allows us to embed Javascript into the HTML file.
Here is a code example:
 
```
res.render('index', { data: your_variable });
```

In our app this functionality is used to send the data fetched from an Airthings account, post it to the ``index.ejs`` file and display it to the client. To access the data in ``index.ejs``, the following syntax is used:
```
<% if(data !== null) { %>
 <%= data %>
<% } %>
```
