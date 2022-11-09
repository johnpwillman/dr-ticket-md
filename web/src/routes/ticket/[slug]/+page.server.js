/** @type {import('./$types').PageLoad} */
export async function load({ cookies, fetch, slug }) {

    let apiBase = 'http://127.0.0.1:8000/v1/';

    let ticketKey = slug;

    if (cookies.get('jwt')) {
        const response = await fetch(apiBase + 'tickets/' + ticketKey, {
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt')
            }
        });

        const ticket = await response.text();
        console.log(ticket);
        let comments = ticket.comments;
        comments.sort((a, b)=> {a.created_at - b.created_at});
        return {
            success: true,
            detail: ``,
            ticket: ticket,
            comments: comments
        }
    }
    return {
        detail: "Please login to see your tickets."
    }
}