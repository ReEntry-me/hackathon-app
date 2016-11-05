# tech-for-justice

Read through the [GUIDE.md](https://github.com/matteodem/meteor-boilerplate/blob/master/GUIDE.md) or checkout the repository locally for more information.

## Problems
- Data is highly variable and distributed. For example, there are many state corrections departments and many have resource lists, but all use different technologies and formats.
- Scope: Some resources are locally focused, some are regional, statewide, or national. Helping people find the right resources starts with providing relevant results.
- Data quality sucks. We'll need some sort of dedupe/manual resolution process powered by humans before adding a resource. 
- Narrative content is useful, but rare and often out of date. It could also be misleading, insensitive, biased, etc.
- When relevant new resources are added or changed, there's no easy way to stay updated. In addition to quality ratings, there should be some sort of deadpool that indicates the resource is no longer available.
- Many resources are targeted toward (languages, ethnicities, religions) or restricted from certain groups (i.e. violent or drug offenders).
- Privacy is a major concern.

### Data Quality
- Does address exist? Google Place Autocomplete
- User Reviews
- Is phone number valid? Twilio
- Is web address valid? Web resolver
- Text quality / sensitivity check
- Flags

### Functionality
#### Accounts
- anonymous (artwells/meteor-accounts-guest)
- password for admins/resolvers (possibly split into two apps with the same backend)

#### Push Notifications
- Let people know (without an email address) when new resources are available.

#### Natural language query
- I need a job -> training or employment
- How do I get to work? -> transportation
- I want to get my GED -> education
- I need somewhere to live -> housing

#### Crisis Button

### Collections
- Sources
- Scrapers
- Conflicts
- Locations
- Organizations
- Services
- Conditions
	- Language
	- Ethnicity
	- Religion
	- Veteran
	- Substance abuse
	- Drug violation
	- Violent crime
	- Sex offender
	- Domestic violence
- Resources
- Ratings
- News / Alerts
- Scope (Google Places)
- Tags
- Users
	- Reputation
	- Location
	- Conditions
	- (Delete)


