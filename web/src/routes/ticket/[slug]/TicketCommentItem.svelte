<script>
    export let ticket
    export let md

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

<style>
    .comment-info {
        background-color: lightgray;
    }
</style>