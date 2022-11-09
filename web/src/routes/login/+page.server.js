/** @type {import('./$types').Actions} */
import { redirect } from '@sveltejs/kit';

let apiBase = 'http://127.0.0.1:8000/v1/';

export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch(apiBase + "users", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const text = await response.text();
        console.log( text ? JSON.parse(text) : {} );

        return {
            action: "register",
            success: response.ok,
            message: text
        }
    },
    login: async ({ request, cookies, setHeaders }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch(apiBase + "token", {
            method: "POST",
            body: 'grant_type=password&username=' + email + '&password=' + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const text = await response.text();
        //console.log(text);

        if (!response.ok) {
            //console.log( text ? JSON.parse(text) : {} ); //{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiZXhwIjoxNjY3OTY4NDIxfQ.2raglaHLbS-atO_tbl3AIFCDxTmci1x64DfthuZvo40","token_type":"bearer"}

            return {
                action: "login",
                success: response.ok,
                message: text
            }
        }

        cookies.set('jwt', JSON.parse(text).access_token, {
            path: '/'
        });
        setHeaders({
            "Authorization": "Bearer " + JSON.parse(text).access_token
        });

        throw redirect(303, '/');

    },
};