import { redirect } from '@sveltejs/kit';
import Cookies from 'js-cookie'

export async function load({ fetch }) {

    let apiRoot = `http://127.0.0.1:8000/v1/`

    if (Cookies.get('jwt')) {
        const response = await fetch(apiRoot + 'tickets/', {
            headers: {
                "Authorization": "Bearer " + Cookies.get('jwt')
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
