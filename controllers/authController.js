const jwt = require('jsonwebtoken');
const { User } = require('../models');
const crypto = require('crypto');

class AuthController {
    static async login(req, res) {
        const { userUser, passwordUser } = req.body;

        try {
            const user = await User.findOne({ where: { userUser } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const [algorithm, iterations, salt, hash] = user.passwordUser.split('$');
            const hashBuffer = Buffer.from(hash, 'base64');
            const derivedKey = crypto.pbkdf2Sync(passwordUser, Buffer.from(salt, 'base64'), parseInt(iterations), hashBuffer.length, algorithm);

            if (!crypto.timingSafeEqual(hashBuffer, derivedKey)) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

module.exports = AuthController;
