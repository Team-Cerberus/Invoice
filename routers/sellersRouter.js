const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router
        .get('/sellers', function (req, res) {
            const user = req.user;
            if (!user) {            
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            const dbUser = db.get('users')
                .find({
                    username: user.username.toLowerCase()
                })
                .value();
            const sellers = dbUser
                .get('sellers')     //TODO: Must not get invoices
                .value();

            res.status(201)
                .json({
                    result: sellers //|| []
                });
        })
        .post('/sellers', function (req, res) {
            const user = req.user;
            if (!user) {            
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            let userInDB = req.body.user;
            const dbUser = db.get('users')
                .find({
                    username: userInDB
                })
                .value();
            const sellers = dbUser.get('sellers');
            if (!sellers) {
                dbUser
                    .set('sellers', [])
                    .write()
                    .then(
                        () => sellers = dbUser.get('sellers')
                    );
            }

            sellers
                .push(req.seller)
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
        .put('/sellers', function (req, res) {
            const user = req.user;
            if (!user) {            
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            const dbUser = db.get('users')
                .find({
                    username: user.username.toLowerCase()
                })
                .value();
            const sellers = dbUser.get('sellers');
            
            sellers
                .find({idNumber:req.seller.idNumber})
                .remove({ idNumber: req.seller.idNumber })   //TODO: for now invoices are attached
                .push(req.seller)
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
