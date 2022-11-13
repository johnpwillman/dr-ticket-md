<script>
    import { onMount } from 'svelte'
    import Cookies from 'js-cookie'
    import { goto } from '$app/navigation'
    import {
        PUBLIC_ENV,
        PUBLIC_DEV_API_ROOT,
        PUBLIC_API_ROOT
    } from '$env/static/public';
    let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

    let md

    onMount(async () => {
		md = new window.remarkable.Remarkable()
	});

    let subject
    let body = ''
    async function newTicket() {
        const status = 'open';

        const response = await fetch(apiRoot + "tickets/" , {
            method: "POST",
            body: JSON.stringify({
                subject: subject,
                body: body,
                status: status
            }),
            headers: {
                "Authorization": "Bearer " + Cookies.get('jwt'),
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            //JWT Timed out
            Cookies.remove('jwt')
            Cookies.remove('user')
            await goto('/login', {
                invalidateAll: true
            })
        }

        if (response.ok) {
            const ticket = await response.json();

            goto(`/ticket/${ticket.key}`)
        }

        const respText = await response.text();
        console.log(respText);

        return {
            success: response.ok,
            message: respText
        }
    }
</script>

<main class="container">
    <form on:submit|preventDefault={newTicket}>
        <h1 class="h3 mb-3 fw-normal">Create a new Ticket</h1>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Subject</label>
            <input bind:value="{subject}" type="text" name="subject" class="form-control" id="exampleFormControlInput1" placeholder="Quick description">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Ticket Body</label>
            <textarea bind:value="{body}" name="body" class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Describe the issue in detail (markdown allowed)"></textarea>
          </div>
          {#if md && body.length > 0}
          <div class="mb-3">
            <p><strong>Preview:</strong></p>
            <p>{@html md.render(body)}</p>
          </div>
          {/if}
        <div class="gap-2">
            <button class="btn btn-dark bg-indigo-400" type="submit">Submit Ticket</button>
        </div>
    </form>
</main>

<style>
    main {
        margin-top: 90px;
    }

    .bg-indigo-400 {
        background-color: #8540f5;
    }
</style>