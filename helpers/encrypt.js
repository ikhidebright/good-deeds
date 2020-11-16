import bycrypt from 'bcryptjs'

export default class Encrypt {
    static hashPassword (password) {
        const salt = bycrypt.genSaltSync(10)
        return bycrypt.hashSync(password, salt)
    }

    static comparePassword (password, comparePassword) {
        return bycrypt.compareSync(password, comparePassword);
    }
}