<script>
    export let ticket

    async function md5 (string_to_hash) {
        let response = await fetch('https://api.hashify.net/hash/md5/hex', {
            method: "POST",
            body: string_to_hash
        })
        let resJson = await response.json()
        return resJson.Digest
    }

    async function get_gravatar_image_url (email, size, default_image, allowed_rating, force_default) {
        email = typeof email !== 'undefined' ? email : 'john.doe@example.com'
        size = (size >= 1 && size <= 2048) ? size : 80
        default_image = typeof default_image !== 'undefined' ? default_image : 'mm'
        allowed_rating = typeof allowed_rating !== 'undefined' ? allowed_rating : 'g'
        force_default = force_default === true ? 'y' : 'n'
        let md5_email = await md5(email.toLowerCase().trim())
        
        return ("https://secure.gravatar.com/avatar/" + md5_email + "?size=" + size + "&default=" + encodeURIComponent(default_image) + "&rating=" + allowed_rating + (force_default === 'y' ? "&forcedefault=" + force_default : ''))
    }
</script>

<a class="no-underline" href="/ticket/{ticket.key}">
<div class="d-flex text-muted pt-3 border-bottom">
    <div class="col-md-1 ticket-status">
        <strong class="d-flex text-gray-dark mr-1em">{ticket.status}</strong>
    </div>
    <div class="col-md-8">
        <div class="d-flex">
            {#await get_gravatar_image_url(ticket.submitted_by, 32)}
            <p>...</p>
            {:then gravatar}
                <img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" src="{gravatar}" alt="gravatar-img" />
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
            <div class="d-flex justify-content-between">
                <p class="pb-3 mb-0 small lh-sm">
                    <strong class="d-block text-gray-dark ticket-subject">{ticket.subject}</strong>
                    {ticket.submitted_by}
                </p>
            </div>
        </div>
    </div>
    <div class="col-md-3 text-end">
        <p>{new Date(ticket.created_at * 1000).toDateString()}</p>
    </div>
</div>
</a>

<style>
    .ticket-status {
        width: 7em;
        padding: 0 1em 0 0;
    }

    .ticket-subject {
        font-size: 1.3em;
    }

    a.no-underline {
        text-decoration: none;
    }

    /* .mr-1em {
        margin-right: 1em;
    } */
</style>