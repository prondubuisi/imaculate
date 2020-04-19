const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling Get'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling post'
    });
});

router.get('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
        res.status(200).json({
        message: 'handling single'
    });
});

router.patch('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
        res.status(200).json({
        message: 'patch single'
    });
});

router.delete('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
        res.status(200).json({
        message: 'delete single'
    });
});

module.exports = router;