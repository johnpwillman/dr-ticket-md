<script>
    import { goto } from '$app/navigation'
    import Cookies from 'js-cookie'
    import {
        PUBLIC_ENV,
        PUBLIC_DEV_API_ROOT,
        PUBLIC_API_ROOT
    } from '$env/static/public';
    let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

    import TicketListItem from './TicketListItem.svelte'

    let user
    let userCookie = Cookies.get('user')
    user = userCookie ? JSON.parse(userCookie) : undefined

    async function get_my_tickets() {
        if (Cookies.get('jwt')) {
            const response = await fetch(apiRoot + 'tickets/', {
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

            let tickets = await response.json()
            return tickets
        }
    }
</script>

<main class="container">
    <div class="d-flex w-100 align-items-center p-3 my-3 text-white bg-indigo-400 rounded shadow-sm">
        <div class="lh-1">
            <h1 class="h4 mb-0 text-white lh-1">Tickets</h1>
        </div>
        {#if user}
        <div class="ms-auto">
            <a class="btn btn-outline-light" href="/ticket">New Ticket</a>
        </div>
        {/if}
    </div>
    {#await get_my_tickets()}
        <p>..Retrieving tickets</p>
    {:then tickets}
        {#if tickets}
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">Tickets List</h6>
            {#each tickets as ticket}
                <TicketListItem ticket={ticket} />
            {/each}
        </div>
        {:else}
        <h3>Log in to see tickets</h3>
        {/if}
    {/await}
</main>

<style>
    main {
        margin-top: 90px;
    }

    .bg-indigo-400 {
        background-color: #8540f5;
    }
</style>