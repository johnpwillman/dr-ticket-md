import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies, fetch }) {

    let env = process.env.ENV;
    let apiBase = process.env[`${env}_API_URL`];

    if (cookies.get('jwt')) {
        const response = await fetch(apiBase + 'tickets', {
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt')
            }
        });

        if (response.status === 401) {
            //JWT Timed out
            throw redirect(303, '/logout')
        }

        const tickets = await response.json();
        return {
            success: true,
            detail: `${tickets.length} ticket(s)`,
            tickets: tickets
        }
    }
    return {
        detail: "Please login to see your tickets."
    }
}
