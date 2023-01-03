const bCrypt = require('bcrypt');

const bcrypt = {
    async validarPass(user, password){
        try{
            return bCrypt.compareSync(password, user.password);
        }catch(e){
            console.log(`Ha ocurrido el siguiente problema ${e}`);
        }
    },
    async encryptPass(password){
        try{
            return bCrypt.hashSync(
                password,
                bCrypt.genSaltSync(10),
                null);
        }catch(e){
            console.log(`Ha ocurrido el siguiente problema ${e}`);
        }
    }
}

module.exports = bcrypt;