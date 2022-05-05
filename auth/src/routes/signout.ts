import express from "express";

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    return res.json({ msg: "Hi there" })
});

export { router as signoutRouter };