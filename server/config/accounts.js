/* clean out all guest accounts more than 24 hours old */
Accounts.removeOldGuests();

/* make guests anonymous (i.e. no auto-generated username and email) */
AccountsGuest.anonymous = true;