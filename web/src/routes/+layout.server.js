import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export async function load({ cookies, fetch }) {

    let env = process.env.ENV;
    let apiBase = process.env[`${env}_API_URL`];

    if (cookies.get('jwt')) {
        const response = await fetch(apiBase + 'users/me', {
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt')
            }
        });

        if (response.status === 401) {
            //JWT Timed out
            throw redirect(303, '/logout')
        }

        const user = await response.json();
        cookies.set('user', JSON.stringify(user));
        return {
            user: user
        }
    }
}
