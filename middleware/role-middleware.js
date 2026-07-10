const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.userInfo) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        if (!allowedRoles.includes(req.userInfo.role)) {
            return res.status(403).json({
                success: false,
                message: `You are not authorized to perform this action.`
            });
        }

        next();
    };
};

module.exports = authorize;