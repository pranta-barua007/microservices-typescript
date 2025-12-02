import http from "k6/http";
import { BASE_URL, HOST_HEADER, TEST_USER } from "../config.js";

export const options = {
    insecureSkipTLSVerify: true,
    vus: 1,
    duration: "10s",
};

export default function () {
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Host": HOST_HEADER,
        },
    };

    console.log(`Target: ${BASE_URL}`);
    console.log(`Host: ${HOST_HEADER}`);

    // 1. Signup
    console.log(">>> Attempting Signup...");
    const signupRes = http.post(`${BASE_URL}/api/users/signup`, JSON.stringify(TEST_USER), params);
    console.log(`Signup Status: ${signupRes.status}`);

    // 2. Signin
    console.log(">>> Attempting Signin...");
    const signinRes = http.post(`${BASE_URL}/api/users/signin`, JSON.stringify(TEST_USER), params);
    console.log(`Signin Status: ${signinRes.status}`);
    console.log(`Signin Headers: ${JSON.stringify(signinRes.headers)}`);

    // Check if cookie is present in headers
    const setCookie = signinRes.headers["Set-Cookie"];
    console.log(`Set-Cookie: ${setCookie}`);

    // 3. Try to access a protected route
    console.log(">>> Attempting to create ticket (protected check)...");
    // Note: We are NOT manually passing the cookie here to see if k6 default jar handles it.
    const ticketRes = http.post(
        `${BASE_URL}/api/tickets`,
        JSON.stringify({ title: "Debug Ticket", price: 10 }),
        params
    );
    console.log(`Create Ticket Status: ${ticketRes.status}`);
    console.log(`Create Ticket Body: ${ticketRes.body}`);
}
