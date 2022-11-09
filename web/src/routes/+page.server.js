/** @type {import('./$types').PageLoad} */
export async function load({ cookies, fetch }) {

    let apiBase = 'http://127.0.0.1:8000/v1/';

    if (cookies.get('jwt')) {
        const response = await fetch(apiBase + 'tickets', {
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt')
            }
        });

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