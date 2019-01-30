'use strict';
var commonLookups = require("./lookups.model");

/**
 * GET - list of projects
 */
exports.getLookupDetails = (req, res, next) => {

    var _lookupCode = ((req.params.lookupType != 'ALL') ? req.params.lookupType : '%');
    commonLookups.findAll({
        where: { lookupType: { $like: _lookupCode }}}).then((_lookups) => {
        res.status(200).json({
            commonLookups: _lookups
        });
    }
    )
}