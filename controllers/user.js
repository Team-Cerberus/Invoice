const AUTHENTICATION_KEY_LENGTH = 60,
    AUTHENTICATION_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM';

function generateAuthKey(uniquePart) {
    let authKey = uniquePart,
        index;
    while (authKey.length < AUTHENTICATION_KEY_LENGTH) {
        index = Math.floor(Math.random() * AUTHENTICATION_KEY_CHARS.length);
        authKey += AUTHENTICATION_KEY_CHARS[index];
    }
    return authKey;
}

function post(req, res) {
    let user = req.body;
    if (!user || typeof user.username !== 'string' || typeof user.passHash !== 'string') {
        res.status(400)
            .json('Invalid user');
        return;
    }
    let error = validate(user);

    if (error) {
        res.status(400)
            .json(error.message);
        return;
    }
    let dbUser = db('users').find({
        usernameToLower: user.username.toLowerCase()
    });

    if (dbUser) {
        res.status(400)
            .json('Duplicated user');
        return;
    }
    user.usernameToLower = user.username.toLowerCase();
    db('users').insert(user);
    res.status(201)
        .json({
            result: {
                username: user.username
            }
        });
}

function put(req, res) {
    let reqUser = req.body;
    let user = db('users').find({
        usernameToLower: reqUser.username.toLowerCase()
    });
    if (!user || user.passHash !== reqUser.passHash) {
        res.status(404)
            .json('Invalid username or password');
        return;
    }
    if (!user.authKey) {
        user.authKey = generateAuthKey(user.id);
        db.save();
    }

    res.json({
        result: {
            username: user.username,
            authKey: user.authKey
        }
    });
}

return {
    get: get,
    post: post,
    put: put
};
};
