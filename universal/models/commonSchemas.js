export default {
    location: new SimpleSchema({
        fullAddress: {
            type: String
        },
        lat: {
            type: Number,
            decimal: true
        },
        lng: {
            type: Number,
            decimal: true
        },
        geometry: {
            type: Object,
            blackbox: true
        },
        placeId: {
            type: String
        },
        street: {
            type: String,
            max: 100
        },
        city: {
            type: String,
            max: 50
        },
        state: {
            type: String,
            regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
        },
        zip: {
            type: String,
            regEx: /^[0-9]{5}$/
        },
        country: {
            type: String
        }
    })
};
