module.exports = {
    db: {
        database: 'gamedb',
        host: 'localhost',
        //port: 27017,  // optional, default: 27017
        user: 'zeeman', // optional
        password: 'test', // optional
        supportBigNumbers: true,
        connectionLimit: 10
        //collection: 'sessions' // optional, default: sessions
    },
    cookie_secret: "zdjwoi3dsl6ase9nqmwf7jeioa3sdjfodfjekw23jasasf",
    cookie_key: 'express.sid',
    fbId: "117029551705347",
    fbSecret: "9508055c147b509ea2434f0ba99c226c",
    fbCallbackAddress: "http://localhost:3000/auth/facebook",
    game: {
        bouns: {
            exp: 1, //驗經加倍
            sell: 1 //賣價加倍
        },
        teamMax: 5
    }
};
