const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router
        .get('/buyers', function (req, res) {
            const user = req.user;
            if (!user) {            //copied this from self-manager. It obviously requires user authentication
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            const dbUser = db.get('users')
                .find({
                    username: user.username.toLowerCase()
                })
                .value();
            const buyers = dbUser
                .get('buyers')     
                .value();

            res.status(201)
                .json({
                    result: buyers //|| []
                });
        })
        .post('/buyers', function (req, res) {
            const user = req.user;
            if (!user) {            //copied this from self-manager. It obviously requires user authentication
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            const dbUser = db.get('users')
                .find({
                    username: user.username.toLowerCase()
                })
                .value();
            const buyers = dbUser.get('buyers');
            if (!buyers) {
                dbUser
                    .set('buyers', [])
                    .write()
                    .then(
                        () => buyers = dbUser.get('buyers')
                    );
            }

            buyers
                .push(req.buyer)
                .write()
                .then(
                    () => {
                        res.status(201)
                            .json({
                                result: user
                            });
                    }
                );
        })
        .put('/buyers', function (req, res) {
            const user = req.user;
            if (!user) {            //copied this from self-manager. It obviously requires user authentication
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            const dbUser = db.get('users')
                .find({
                    username: user.username.toLowerCase()
                })
                .value();
            const buyers = dbUser.get('buyers');
            
            buyers
                .find({idNumber:req.buyer.idNumber})
                .remove({ idNumber: req.buyer.idNumber })   
                .push(req.buyer)
                .write()
                .then(
                    () => {
                        res.status(201)
                            .json({
                                result: user
                            });
                    }
                );
        });
    return router;
};
