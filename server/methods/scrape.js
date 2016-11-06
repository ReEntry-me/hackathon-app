import ScrapedData from '../../universal/models/ScrapedData.js';
import Resources from '../../universal/models/Resources.js';

export default function() {
    Meteor.methods({
        'processScrape': function() {
        	this.unblock();

        	const s = ScrapedData.find().fetch();


        	for(var i in s) {
        		var r = {};

        		if(_.has(s[i], 'category')) {
        			r.conditions = [s[i].category];
        		}

        		if(_.has(s[i], 'phone')) {
        			r.phone = s[i].phone.replace('(','').replace(')','').replace(/-/g,'');
        			
        			if(!/(([2-9]{1})([0-9]{2})([0-9]{3})([0-9]{4}))$/.test(r.phone)) {
        				delete r.phone;
        			}
        		}

        		if(_.has(s[i], 'name')) {
        			r.name = s[i].name;
        		}

        		if(_.has(s[i], 'address') && s[i].address.indexOf('No Address Provided') === -1) {
        			r.address = {fullAddress: s[i].address};
        		}

        		r.active = true;

        		r.createdBy = '99999999999999999';

        		var existing = Resources.findOne({active: true, name: r.name});

        		if(!existing) {
        			Resources.insert(r);
        		}

        		ScrapedData.remove({_id: s[i]._id});
        	}
        }
    });
}
