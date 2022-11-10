import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */
/** @type {import('./$types').PageServerLoad} */

let apiBase = 'http://127.0.0.1:8000/v1/';

export async function load({ cookies, fetch, params }) {

    let ticketKey = params.slug;

    if (cookies.get('jwt')) {
        const response = await fetch(apiBase + 'tickets/' + ticketKey, {
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt')
            }
        });

        if (response.status === 401) {
            //JWT Timed out
            throw redirect(303, '/logout')
        }

        const ticket = await response.json();
        let comments = ticket.comments;
        comments.sort((a, b)=> {return (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime()});
        
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

export const actions = {
    newComment: async ({ request, cookies, params }) => {
        const data = await request.formData();
        const body = data.get('body');
        const status = data.get('status');

        const response = await fetch(apiBase + "tickets/" + params.slug + "/comments", {
            method: "POST",
            body: JSON.stringify({
                body: body,
                status: status
            }),
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt'),
                "Content-Type": "application/json"
            }
        });

        const text = await response.text();
        //console.log( text ? JSON.parse(text) : {} );

        return {
            success: response.ok,
            message: text,
            comment: JSON.parse(text)
        }
    },
}