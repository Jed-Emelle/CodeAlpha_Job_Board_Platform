
const employerMiddleware = (req, res, next) => {
    if(req.userInfo.role !== 'Employer'){
        return res.status(403).json({
            success: false,
            message: 'You cannot access this. Must be an Employer'
        })
    }
    next();
}

module.exports = employerMiddleware;