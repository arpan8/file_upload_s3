const user = require('../../models').User;
const { success, error } = require('../../response/macros');

module.exports = {
    create_user
}

async function create_user(req, res){
    try {

        const { name } = req.payload;

        let duplicate_user = await user.findOne({
            where: {
                name
            }
        });

        if(duplicate_user){
            return success({},'User already exists')(res);
        }

        await user.create({
            name
        })

        return success({},'User created successfully')(res);
    } catch (err) {
        
        console.log(err);
        return error(err,'Something went wrong')(res);
    }
}