import ScrapedData from '../models/ScrapedData.js';
import bodyParser from 'body-parser';
//import connect from 'connect';

export default function() {
    var postRoutes = Picker.filter(function(req, res) {
        return req.method == "POST";
    });

	//connect.limit('100mb');

    Picker.middleware(bodyParser.urlencoded({ extended: false }));
    Picker.middleware(bodyParser.json());

    Picker.route('/post/scrape', function(params, req, res, next) {
    	if (req.body && _.isArray(req.body)) {
        	for(var i in req.body) {
        		ScrapedData.insert(req.body[i]);
        	}

        	Meteor.call('processScrape');

            res.statusCode = 200;
        	res.end("thanks");
        } else {
        	res.statusCode = 500;
        	res.end("ruh roh");
        }
    });
}
