const { body, validationResult } = require('express-validator');

const validatePost = [
    body('content').isString().notEmpty().withMessage('Content is required'),
    body('mediaUrl').optional().isURL().withMessage('Invalid URL for media'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validatePost
};
