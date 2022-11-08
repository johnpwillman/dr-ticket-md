/** @type {import('./$types').Actions} */

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
    login: async ({ request }) => {
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

        console.log(response);
        console.log(await response.json());
    },
};