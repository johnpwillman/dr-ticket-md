<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Home</h1>

{#if data.success}
    <p>{JSON.stringify(data.detail)}</p>
    {#each data.tickets as ticket}
    {JSON.stringify(ticket)}
    {/each}
{:else}
    <p>{data.detail}</p>
{/if}