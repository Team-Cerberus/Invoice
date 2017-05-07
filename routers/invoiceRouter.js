const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router
        .get('/invoice', function (req, res) {
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
            const seller = dbUser
                .get('sellers')
                .find({
                    idNumber: user.seller.idNumber
                })   
                .value();
            const invoice = seller
                .get('invoices')
                .find({
                    number: req.user.seller.invoice.number
                })
                .value();

            res.status(201)
                .json({
                    result: invoice 
                });
        })
        .post('/invoice', function (req, res) {
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
            const seller = dbUser
                .get('sellers')
                .find({
                    idNumber: req.seller.idNumber
                })   
                .value();

            const invoices = seller.get('invoices');
            if (!invoices) {
                seller
                    .set('invoices', [])
                    .write()
                    .then(
                        () => invoices = dbUser.get('invoices')
                    );
            }

            invoices
                .push(req.invoice)
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
        .put('/invoice', function (req, res) {
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
            const seller = dbUser
                .get('sellers')
                .find({
                    idNumber: req.seller.idNumber
                })   
                .value();

            const invoices = seller.get('invoices');
            if (!invoices) {
                seller
                    .set('invoices', [])
                    .write()
                    .then(
                        () => invoices = dbUser.get('invoices')
                    );
            }
          
            invoices
                .remove({ number: req.invoice.number })   
                .push(req.invoice)
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