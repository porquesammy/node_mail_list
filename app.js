// jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(
        bodyParser.urlencoded({
                extended: true,
        })
);

app.get('/', function(req, res) {
        res.sendFile(`${__dirname}/signup.html`);
});

app.post('/', function(req, res) {
        const firstName = req.body.fName;
        const lastName = req.body.lName;
        const eMail = req.body.email;
        const data = {
                members: [
                        {
                                email_address: eMail.toLowerCase(),
                                status: 'subscribed',
                                merge_fields: {
                                        FNAME: firstName.toLowerCase(),
                                        LNAME: lastName.toLowerCase(),
                                },
                        },
                ],
        };

        const jsonData = JSON.stringify(data);

        const options = {
                url: 'https://us20.api.mailchimp.com/3.0/lists/b9cedb6b20',
                method: 'POST',
                headers: {
                        Authorization: 'porqueSammy dab4f02e8be54c784bd3327ee313aa25-us20',
                },
                body: jsonData,
        };

        request(options, function(error, response, body) {
                if (error) {
                        res.sendFile(`${__dirname}/failure.html`);
                } else if (response.statusCode === 200) {
                        res.sendFile(`${__dirname}/success.html`);
                } else {
                        res.sendFile(`${__dirname}/failure.html`);
                }
        });
});

app.post('/failure', function(req, res) {
        res.redirect('/');
});

app.post('/success', function(req, res) {
        res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
        // eslint-disable-next-line no-console
        console.log('server successful');
});
