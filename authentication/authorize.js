const AUTH_KEY_HEADER_NAME = 'x-auth-key';

function authorize(app, db) {
    app.use(function (req, res, next) {
        const authKey = req.headers[AUTH_KEY_HEADER_NAME],
            user = db.get('users').find({
                authKey: authKey
            });
        req.user = user || null;
        next();
    });
};

module.exports = authorize;