<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<nav>
    <a href="/">Home</a>
    {#if data.user}
        <a href="#">{data.user.email}</a>
    {:else}
    <a href="/login">Login</a>
    {/if}
</nav>

<slot></slot>