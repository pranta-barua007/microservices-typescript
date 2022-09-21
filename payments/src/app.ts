import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@prbtickets/common";

const app = express();

app.set('trust proxy', true); //handle https proxy of ngnx
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

