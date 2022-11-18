<script>
    export let data;

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import Cookies from 'js-cookie'
    import {
        PUBLIC_ENV,
        PUBLIC_DEV_API_ROOT,
        PUBLIC_API_ROOT
    } from '$env/static/public';
    let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

    import CommentItem from './CommentItem.svelte'
    import TicketCommentItem from './TicketCommentItem.svelte';

    let md
    onMount(async () => {
		md = new window.remarkable.Remarkable();
	})

    let body = ''
    let ticket
    let status
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
            status = ticket.status
            return ticket
        }
        await goto('/login', {
            invalidateAll: true
        })
    }

    async function newComment() {
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

        await getTicket()
        body = ''
    }
</script>

<main class="container">
    {#await getTicket()}
        <h4>..Retrieving ticket</h4>
    {:then} 
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
                <CommentItem comment={comment} md={md} />
                {/each}
                <TicketCommentItem ticket={ticket} md={md} />
            </div>
        </div>
        <div class="col-md-4 ticket-info">

        </div>
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