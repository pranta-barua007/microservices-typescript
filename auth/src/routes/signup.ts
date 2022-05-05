import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be 4 and 20 characters')
], (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            errors.array().map((error) => new Error(error.msg))
        }
        const { email, password } = req.body;
        return res.json({ email, password })
    }catch(err: any) {
        console.error(err);
        return res.status(400).json({ error: err, message: err.message })
    }
});

export { router as signupRouter };