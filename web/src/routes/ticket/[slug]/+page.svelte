<script>
    export let data;

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import Cookies from 'js-cookie'

    let md
    let ticket
    let status
    onMount(async () => {
		md = new window.remarkable.Remarkable();
        await getTicket()
        status = ticket.status
	})

    let body = ''
    let apiRoot = `http://127.0.0.1:8000/v1/`

    async function getTicket() {
        if (Cookies.get('jwt')) {
            const response = await fetch(apiRoot + 'tickets/' + data.slug, {
                headers: {
                    "Authorization": "Bearer " + Cookies.get('jwt')
                }
            })

            if (response.status === 401) {
                //JWT Timed out
                Cookies.remove('jwt')
                Cookies.remove('user')
                await goto('/login', {
                    invalidateAll: true
                })
            }

            ticket = await response.json()
        }
    }

    async function newComment() {
        console.log(body, status)
        const response = await fetch(apiRoot + "tickets/" + ticket.key + "/comments", {
            method: "POST",
            body: JSON.stringify({
                body: body,
                status: status
            }),
            headers: {
                "Authorization": "Bearer " + Cookies.get('jwt'),
                "Content-Type": "application/json"
            }
        })

        if (response.status === 401) {
            //JWT Timed out
            Cookies.remove('jwt')
            Cookies.remove('user')
            await goto('/login', {
                invalidateAll: true
            })
        }

        const text = await response.text()
        //console.log( text ? JSON.parse(text) : {} );

        await getTicket()
        body = ''
    }

    async function md5 (string_to_hash) {
        let response = await fetch('https://api.hashify.net/hash/md5/hex', {
            method: "POST",
            body: string_to_hash
        });
        let resJson = await response.json();
        return resJson.Digest;
    }

    async function get_gravatar_image_url (email, size, default_image, allowed_rating, force_default)
    {
        email = typeof email !== 'undefined' ? email : 'john.doe@example.com';
        size = (size >= 1 && size <= 2048) ? size : 80;
        default_image = typeof default_image !== 'undefined' ? default_image : 'mm';
        allowed_rating = typeof allowed_rating !== 'undefined' ? allowed_rating : 'g';
        force_default = force_default === true ? 'y' : 'n';
        let md5_email = await md5(email.toLowerCase().trim());
        
        return ("https://secure.gravatar.com/avatar/" + md5_email + "?size=" + size + "&default=" + encodeURIComponent(default_image) + "&rating=" + allowed_rating + (force_default === 'y' ? "&forcedefault=" + force_default : ''));
    }
</script>

<main class="container">
    {#if ticket}
    <form on:submit|preventDefault={newComment}>
    <div class="row mb-4 comment-form">
        <div class="col-md-8 comment-textarea">
            <div class="card">
                <h4 class="card-header">Ticket: "{ticket.subject}"</h4>
                <div class="card-body">
                    <textarea class="form-control" name="body" rows="5" placeholder="Add a comment to this ticket." bind:value={body}></textarea>
                </div>
                {#if md}
                <div class="card-footer">
                    <p><strong>Preview:</strong></p>
                    <p>{@html md.render(body)}</p>
                </div>
                {/if}
                
            </div>
        </div>
        <div class="col-md-4 comment-submit">
            <div class="card">
                <h4 class="card-header">Update</h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <select bind:value="{status}" class="form-select comment-submit-select" name="status" id="exampleSelect">
                                <option value="open">Open</option>
                                <option value="pending">With Customer</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-secondary bg-indigo-400">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
    <div class="row">
        <div class="col-md-8 ticket-comments">
            {#each ticket.comments as comment}
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-3 pt-2 pb-2 text-center comment-info">
                        {#await get_gravatar_image_url(comment.submitted_by, 48)}
                            <p>...</p>
                        {:then gravatar}
                            <img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="48" height="48" src="{gravatar}" alt="gravatar-img" />
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                        <br/>
                        {comment.submitted_by}
                        <br/><br/>
                        {(new Date(comment.created_at)).toISOString().match(/(\d|-|:)+/g)[0]}
                        <br/>
                        {(new Date(comment.created_at)).toISOString().match(/(\d|-|:)+/g)[1]}
                    </div>
                    <div class="col-md-9 d-flex align-items-start flex-column">
                        <div class="card-body w-100">
                            {#if md}
                                <p>{@html md.render(comment.body)}</p>
                            {:else}
                                <p>{comment.body}</p>
                            {/if}
                        </div>
                        <div class="card-footer w-100 text-muted">
                            Ticket state set to: {comment.status.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
            {/each}
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-3 pt-2 pb-2 text-center comment-info">
                        {#await get_gravatar_image_url(ticket.submitted_by, 48)}
                            <p>...</p>
                        {:then gravatar}
                            <img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="48" height="48" src="{gravatar}" alt="gravatar-img" />
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                        <br/>
                        {ticket.submitted_by}
                        <br/><br/>
                        {(new Date(ticket.created_at)).toISOString().match(/(\d|-|:)+/g)[0]}
                        <br/>
                        {(new Date(ticket.created_at)).toISOString().match(/(\d|-|:)+/g)[1]}
                    </div>
                    <div class="col-md-9">
                        <h5 class="card-header">
                            {ticket.subject}
                        </h5>
                        <div class="card-body">
                            {#if md}
                                <p>{@html md.render(ticket.body)}</p>
                            {:else}
                                <p>{ticket.body}</p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 ticket-info">

    </div>
    {/if}
</main>

<style>
    main {
        margin-top: 90px;
    }

    
    .bg-indigo-400 {
        background-color: #8540f5;
    }

    /* .comment-submit-select {
        width: 14em;
    } */

    .comment-info {
        background-color: lightgray;
    }
    
</style>