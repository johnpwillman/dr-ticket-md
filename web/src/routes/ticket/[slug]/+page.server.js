/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch, params }) {

    let apiBase = 'http://127.0.0.1:8000/v1/';

    let ticketKey = params.slug;

    if (cookies.get('jwt')) {
        const response = await fetch(apiBase + 'tickets/' + ticketKey, {
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt')
            }
        });

        const ticket = await response.json();
        let comments = ticket.comments;
        console.log(comments);
        comments.sort((a, b)=> {return (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime()});
        console.log(comments);
        return {
            success: true,
            detail: ``,
            ticket: ticket,
            comments: comments.reverse()
        }
    }
    return {
        detail: "Please login to see your tickets."
    }
}