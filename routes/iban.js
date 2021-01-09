const express = require('express');
const config = require('config');
const axios = require('axios');
const { validateIbanNumber, dependsToSEB, cardDependency } = require('../utils/IBAN_validation');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Welcome to IBAN numbers validation API');
});

router.get('/:IBAN', async (req,res) => {
    let { IBAN } = req.params;
    let {valid, message} = validateIbanNumber(IBAN);
    if(valid) {
        try {
            await axios.get(`${config.get('countryCodeAPI')}${IBAN.slice(0, 2)}`)
            if(dependsToSEB(IBAN)) {
                res.status(200).json({
                    IBAN,
                    valid: true,
                    isSEB: true
                }) 
            }
            else res.status(200).json({
                IBAN,
                valid: true,
                isSEB: false
            })
        } catch (ex) {
            res.status(400).json({message: "Country code does not match any of ISO 3166-1 alpha-2 codes"})
        }
    } else res.status(400).json({message});
});

router.post('iban/file/', async (req, res) => {
    try {
        let {'' : {data, name}} = req.files;
        let result = {valid: [], bank: []};
        if(name.slice(-3) === 'csv') {
            data = data.toString('utf8');
            let arr = data.split('\r\n').filter(el => el);
            for (let i = 0; i < arr.length; i++) {
                try {
                    await axios.get(
                        `${config.get('countryCodeAPI')}${arr[i].slice(0, 2)}`
                    )
                    result.valid.push({
                        IBAN: arr[i],
                        valid: validateIbanNumber(arr[i]).valid,
                    })
                } catch (error) {
                    result.valid.push({ IBAN:arr[i], valid: false })
                }

                let bankName = cardDependency(parseInt(arr[i].slice(4, 9)))
                if (bankName && arr[i].length == 20) {
                    result.bank.push({ IBAN: arr[i], Bank: bankName })
                } else result.bank.push({ IBAN: arr[i] })
            }
            return res.status(200).json({IBANS: result})
        } else res.status(400).json({message: 'Incorect file format. File must be .csv format'})
    } catch (error) {
        res.status(400).json({message: "No file found"})
    }
});

router.post('iban/list/', async (req, res) => {
    let result = {valid: [], bank: []};

    for (let i = 0; i < req.body.length; i++) {
        try {
            await axios.get(
                `${config.get('countryCodeAPI')}${req.body[i].slice(0, 2)}`
            )
            result.valid.push({
                IBAN: req.body[i],
                valid: validateIbanNumber(req.body[i]).valid,
            })
        } catch (error) {
            result.valid.push({ IBAN:req.body[i], valid: false })
        }

        let bankName = cardDependency(parseInt(req.body[i].slice(4, 9)))
        if (bankName && req.body[i].length == 20) {
            result.bank.push({ IBAN: req.body[i], Bank: bankName })
        } else result.bank.push({ IBAN: req.body[i] })
    }
    return res.status(200).json({IBANS: result})
});

module.exports = router;