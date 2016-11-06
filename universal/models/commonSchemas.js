export default {
    location: new SimpleSchema({
        fullAddress: {
            type: String,
            optional: true
        },
        lat: {
            type: Number,
            decimal: true,
            optional: true
        },
        lng: {
            type: Number,
            decimal: true,
            optional: true
        },
        geometry: {
            type: Object,
            blackbox: true,
            optional: true
        },
        placeId: {
            type: String,
            optional: true
        },
        street: {
            type: String,
            max: 100,
            optional: true
        },
        city: {
            type: String,
            max: 50,
            optional: true
        },
        state: {
            type: String,
            optional: true,
            regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
        },
        zip: {
            type: String,
            optional: true,
            regEx: /^[0-9]{5}$/
        },
        country: {
            type: String,
            optional: true
        }
    })
};
