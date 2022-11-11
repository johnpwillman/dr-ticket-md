<script>
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
    <div class="d-flex w-100 align-items-center p-3 my-3 text-white bg-indigo-400 rounded shadow-sm">
            <div class="lh-1">
                <h1 class="h4 mb-0 text-white lh-1">Tickets</h1>
            </div>
            {#if data.success}
            <div class="ms-auto">
                <a class="btn btn-outline-light" href="/ticket">New Ticket</a>
            </div>
            {/if}
    </div>
    {#if data.success}
    <div class="my-3 p-3 bg-body rounded shadow-sm">
      <h6 class="border-bottom pb-2 mb-0">Tickets List</h6>
      {#each data.tickets as ticket}
      <a class="no-underline" href="/ticket/{ticket.key}">
      <div class="d-flex text-muted pt-3">
        <div class="ticket-status">
            <strong class="d-flex text-gray-dark mr-1em">{ticket.status}</strong>
        </div>
        {#await get_gravatar_image_url(ticket.submitted_by, 32)}
            <p>...</p>
        {:then gravatar}
            <img class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" src="{gravatar}" alt="gravatar-img" />
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
        <div class="w-100">
            <div class="d-flex justify-content-between">
                <p class="pb-3 mb-0 small lh-sm border-bottom">
                    <strong class="d-block text-gray-dark ticket-subject">{ticket.subject}</strong>
                    {ticket.submitted_by}
                </p>
                {new Date(ticket.created_at * 1000)}
            </div>
        </div>
      </div>
      </a>
      {/each}
    </div>
    {:else}
    <h3>{data.detail}</h3>
    {/if}
</main>

<style>
    main {
        margin-top: 90px;
    }

    .bg-indigo-400 {
        background-color: #8540f5;
    }

    .ticket-status {
        width: 7em;
    }

    .ticket-subject {
        font-size: 1.3em;
    }

    a.no-underline {
        text-decoration: none;
    }

    .mr-1em {
        margin-right: 1em;
    }
</style>