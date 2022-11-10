<script>
    import { onMount } from 'svelte';
    let md;
    let textAreaVal='';

    onMount(async () => {
		md = new window.remarkable.Remarkable();
	});

    /** @type {import('./$types').PageData} */
    export let data;

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
    <form method="POST" action="?/newComment">
    <div class="row mb-4 comment-form">
        <div class="col-md-8 comment-textarea">
            <h4>Subject: {data.ticket.subject}</h4>
            <div class="form mb-4">
                <textarea class="form-control" name="body" rows="5" placeholder="Add a comment to this ticket." bind:value={textAreaVal}></textarea>
            </div>
            {#if md}
            <div class="row">
                <div class="col-md-3">
                    <h4>Preview</h4>
                </div>
                <div class="col-md-9 markdown-preview">
                    <p>{@html md.render(textAreaVal)}</p>
                </div>
            </div>
            {/if}
        </div>
        <div class="col-md-4 comment-submit">
            <h4>Status</h4>
            <div class="row">
                <div class="col-md-6">
                    <select class="form-select comment-submit-select" name="status" id="exampleSelect" value="{data.ticket.status}">
                        <option value="open">Open</option>
                        <option value="pending">With Customer</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary bg-indigo-400">Submit</button>
                </div>
            </div>
        </div>
    </div>
    </form>
    <div class="col-md-8 ticket-comments">
        {#each data.comments as comment}
        <div class="row mb-2">
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
            <div class="col-md-9 comment">
                <div class="d-flex flex-column comment-column">
                    <div class="comment-item">
                        {#if md}
                            {@html md.render(comment.body)}
                        {:else}
                            {comment.body}
                        {/if}
                    </div>
                    <div class="mt-auto state-change comment-item">
                        Ticket state set to: {comment.status.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
        {/each}
        <div class="row mb-2">
            <div class="col-md-3 pt-2 p b-2 text-center comment-info">
                {#await get_gravatar_image_url(data.ticket.submitted_by, 48)}
                    <p>...</p>
                {:then gravatar}
                    <img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="48" height="48" src="{gravatar}" alt="gravatar-img" />
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
                <br />
                {data.ticket.submitted_by}
                <br/><br/>
                {(new Date(data.ticket.created_at)).toISOString().split('T')[0]}
                <br/>
                {(new Date(data.ticket.created_at)).toISOString().replace('Z', '').split('T')[1]}
            </div>
            <div class="col-md-9 comment">
                <div class="d-flex flex-column comment-column">
                    <div class="comment-item">
                        {#if md}
                            {@html md.render(data.ticket.body)}
                        {:else}
                            {data.ticket.body}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 ticket-info">

    </div>

</main>

<style>
    main {
        margin-top: 90px;
    }

    
    .bg-indigo-400 {
        background-color: #8540f5;
    }

    .comment-form {
        background-color: lightgray;
    }

    /* .comment-submit-select {
        width: 14em;
    } */

    .comment-info {
        background-color: lightgray;
    }
    
    .markdown-preview {
        word-wrap: break-word;
    }

    .comment {
        padding: 0 0 0 0;
    }

    .comment-column {
        height: 100%;
    }

    .comment-item {
        padding: 0 5px 0 5px;
    }

    .state-change {
        background-color: #e2e2e2;
    }
</style>