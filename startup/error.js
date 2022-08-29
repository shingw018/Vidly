const config = require('config');

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR! jwtPrivateKey not defined!');
}