
const candidateMiddleware = (req, res, next) => {
    if(req.userInfo.role !== 'Candidate'){
        return res.status(403).json({
            success: false,
            message: 'You cannot access this. Must be a Candidate!'
        })
    }
    next();
}

module.exports = candidateMiddleware;