<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Home</h1>

{#if data.success}
    <h3>{data.detail}</h3>
    {#each data.tickets as ticket}
        <div>{JSON.stringify(ticket)}</div>
        <div></div>
    {/each}
{:else}
    <p>{data.detail}</p>
{/if}