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
        limit: {
            team: 5,
            enemy:[3,5,10],
            str:50,
            int:50,
            wis:50,
            dex:50,
            vit:50,
            level:50,
            retirehp:250,
            retiremp:250
        },
        lang:'cht',
        storageType:{
            storage:1,
            bag:2,
            equipment:3,
            sell:4
        },
        equipmentType:{
            weapon:1,
            shield:2,
            head:3,
            amulet:4,
            shoulder:5,
            body:6,
            hand:7,
            ring:8,
            belt:9,
            foot:10
        },
        equipmentName:{
            1:"武",
            2:"盾",
            3:"頭",
            4:"符",
            5:"肩",
            6:"身",
            7:"手",
            8:"戒",
            9:"腰",
            10:"腳"
        }
    },
    default: {
        loginkeyLimitTime: 5,
        position: 'city'
    }
};
