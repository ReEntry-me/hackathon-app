export default {
    address: new SimpleSchema({
        address1: {
            type: String,
            optional: true
        },
        address2: {
            type: String,
            optional: true
        },
        city: {
            type: String,
            optional: true
        },
        state: {
            type: String,
            optional: true
        },
        postCode: {
            type: String,
            optional: true
        },
        country: {
            type: String,
            optional: true
        }
    })
};
