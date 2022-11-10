import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */

let apiBase = 'http://127.0.0.1:8000/v1/';

export const actions = {
    newTicket: async ({ request, cookies }) => {
        const data = await request.formData();
        const subject = data.get('subject');
        const body = data.get('body');
        const status = 'open';

        const response = await fetch(apiBase + "tickets" , {
            method: "POST",
            body: JSON.stringify({
                subject: subject,
                body: body,
                status: status
            }),
            headers: {
                "Authorization": "Bearer " + cookies.get('jwt'),
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const ticket = await response.json();

            throw redirect(303, `/ticket/${ticket.key}`)
        }

        const respText = await response.text();
        console.log(respText);

        return {
            success: response.ok,
            message: respText
        }
    },
}