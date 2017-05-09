const express = require('express');

module.exports = function (db) {
    const router = express.Router();

    router
        .get('/', function (req, res) {

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
        .post('/', function (req, res) {
           
            const user = req.user;
            if (!user) {
                res.status(401)
                    .json('Not authorized User');
                return;
            }

            let userInDB = req.body.user; //.toLowerCase();

            db.get('users')
                .find(
                    { username: userInDB }
                )
                .get('sellers')
                .find({
                    idNumber: req.body.sellerIDNumber
                })
                .get('invoices')
                .push(req.body.data)
                .write();


            // const dbUser = db.get('users')
            //     .find({
            //         username: userInDB
            //     })
            // console.log(dbUser.value());

            // const seller = db.get('users')
            //     .find(
            //     { username: userInDB }
            //     )
            //     .get('sellers')
            //     .find({
            //         idNumber: req.body.sellerIDNumber
            //     });
            // console.log(seller.value());

            // const invoices = seller.get('invoices');
            // console.log(invoices.value());

            // if (!invoices) {
            //     seller
            //         .set('invoices', [])
            //         .write();
            //     invoices = seller.get('invoices');
            // }

            // invoices
            //     .push(req.body.data)
            //     .write();
            res.status(201)
                .json({
                    result: user
                });
        })
        .put('/', function (req, res) {
            
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
