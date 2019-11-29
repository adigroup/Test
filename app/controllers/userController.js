const Model = require('../models');
const async = require('async');

let mongoose = require('mongoose');



//Product details
exports.userView = function (req, res) {
    let userCount;
    async.auto({
        checkParams: function (cb) {
            console.log("asdas", req.body);
            if (!req.body.prodId) {
                res.json({ success: false, msg: 'Product id  is required.' });
            }
            else {
                cb(null)
            }
        },
        totalUser: ['checkParams', function (err, cb) {
            Model.UserView.distinct("UserId", function (err, result) {
                if (err) {
                    console.log("*****", err);
                    cb(err);
                }
                else {
                    if (result.length) {
                        userCount = result.length
                        console.log("*****", userCount);
                        cb(null)

                    } else {
                        cb(null)

                    }

                }
            })
        }],
        dailyUser: ['totalUser', function (err, cb2) {
            Model.UserView.aggregate([{
                $match: {
                    ProductId: mongoose.Types.ObjectId("5ddf641535659f28fe4ed66f")
                }
            },
            {
                $group: {
                    _id: { $dayOfYear: "$ViewDate" },
                    UserId: { $addToSet: "$UserId" },
                    ViewDate: { $addToSet: "$ViewDate" }

                }
            },
            {
                $project: {
                    _id: 0,
                    ViewDate: { $min: "$ViewDate" },
                    UniqueUsersviewedcount: { $size: "$UserId" }
                }
            }
            ],
                {
                    "allowDiskUse": false
                }, function (err, result) {
                    if (err) {
                        //console.log("*****", err);
                        cb2(err);
                    }
                    else {
                        dailyUser = result;
                        console.log("result", result);
                        cb2(null)
                    }
                })
        }],
        weeklyUser: ['totalUser', function (err, cb2) {
            Model.UserView.aggregate([{
                $match: {
                    ProductId: mongoose.Types.ObjectId("5ddf641535659f28fe4ed66f")
                }
            },
            {
                $group: {
                    _id: { $week: "$ViewDate" },
                    UserId: { $addToSet: "$UserId" },
                    ViewDate: { $addToSet: "$ViewDate" }

                }
            },
            {
                $project: {
                    _id: 0,
                    ViewWeek: { $min: "$ViewDate" },
                    UniqueUsersviewedcount: { $size: "$UserId" }
                }
            }
            ],
                {
                    "allowDiskUse": false
                }, function (err, result) {
                    if (err) {
                        //console.log("*****", err);
                        cb2(err);
                    }
                    else {
                        weeklyUser = result;
                        console.log("result", result);
                        cb2(null)
                    }
                })
        }],
        monthlyUser: ['totalUser', function (err, cb2) {
            Model.UserView.aggregate([{
                $match: {
                    ProductId: mongoose.Types.ObjectId("5ddf641535659f28fe4ed66f")
                }
            },
            {
                $group: {
                    _id: { $month: "$ViewDate" },
                    UserId: { $addToSet: "$UserId" },
                    ViewDate: { $addToSet: "$ViewDate" }

                }
            },
            {
                $project: {
                    _id: 0,
                    ViewMonth: { $min: "$ViewDate" },
                    UniqueUsersviewedcount: { $size: "$UserId" }
                }
            }
            ],
                {
                    "allowDiskUse": false
                }, function (err, result) {
                    if (err) {
                        //console.log("*****", err);
                        cb2(err);
                    }
                    else {
                        monthlyUser = result;
                        console.log("result", result);
                        cb2(null)
                    }
                })
        }]

    }, function (err, result) {
        if (err) {
            console.log(" error", err);
            return false;
        }
        else {
            let data = {};
            data.userCount = userCount;
            data.dailyUser = dailyUser;
            data.weeklyUser = weeklyUser;
            data.monthlyUser = monthlyUser;
            return res.json({ success: true, results: data, msg: 'Product details.' });
        }
    })
};