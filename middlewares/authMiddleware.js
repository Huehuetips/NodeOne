const jwt = require('jsonwebtoken');
const { User, Permission } = require('../models');

const authMiddleware = {
    authenticateToken: (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login'); // Redirigir a la ruta de inicio de sesión
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid token.' });

            try {
                const user = await User.findByPk(decoded.id);
                if (!user) return res.status(404).json({ message: 'User not found.' });

                if (!user.enableUser) return res.status(403).json({ message: 'User is disabled.' });

                req.user = user;
                next();
            } catch (error) {
                res.status(500).json({ message: 'Internal server error.' });
            }
        });
    },

    authorizePermission: (permissionName) => {
        return async (req, res, next) => {
            try {
                const userPermissions = await Permission.findAll({
                    where: { userId: req.user.id },
                    include: [{ model: Permission, where: { namePermission: permissionName } }]
                });

                if (userPermissions.length === 0) {
                    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
                }

                next();
            } catch (error) {
                res.status(500).json({ message: 'Internal server error.' });
            }
        };
    }
};

module.exports = authMiddleware;
