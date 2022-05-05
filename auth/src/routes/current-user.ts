import express from "express";

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    return res.json({ msg: "Hi there" })
});

export { router as currentUserRouter };