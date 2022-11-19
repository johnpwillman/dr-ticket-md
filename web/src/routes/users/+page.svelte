<script>
    import { goto } from '$app/navigation'
    import Cookies from 'js-cookie'
    import {
        PUBLIC_ENV,
        PUBLIC_DEV_API_ROOT,
        PUBLIC_API_ROOT
    } from '$env/static/public';
    let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

    let users = []
    let search = ""

    $: filteredUsers = users.filter(user => user.email.includes(search))

    async function getUsers() {
        let userCookie = Cookies.get('user')
        let user = userCookie ? JSON.parse(userCookie) : undefined
        if (!user || !user.admin) {
            await goto("/login")
        }
        if (Cookies.get('jwt')) {
            const response = await fetch(apiRoot + 'users/', {
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
            users = await response.json()
        }
    }

    async function updateUser(user) {
        if (confirm("Update user?") == true) {
            const response = await fetch(apiRoot + 'users/' + user.key, {
                method: "PATCH",
                body: JSON.stringify(user),
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

            await getUsers()
        }
    }

    async function changeUserAdmin(user) {
        user.admin = !user.admin
        await updateUser(user)
    }

    async function changeUserDisabled(user) {
        user.disabled = !user.disabled
        await updateUser(user)
    }

</script>

<main class="container text-center mx-auto">
    {#await getUsers()}
        <p>Retrieving users</p>
    {:then}
    <div class="row pb-3">
        <h1>Registered Users</h1>
        <input class="form-control" bind:value="{search}" placeholder="Search by email" />
    </div>
        {#each filteredUsers as user}
        <div class="row d-flex flex-wrap pb-3">
            <div class="flex-grow-1 col-sm-6 text-start"><h5>{user.email}</h5></div>
            <div class="col-sm-6 d-flex align-items-center">
                <div class="ms-auto pe-2">
                    <button class="btn btn-secondary checked-{user.admin.toString()}" on:click|preventDefault={() => changeUserAdmin(user)}>{user.admin ? "Admin" : "Not Admin"}</button>
                </div>
                <div class="me-auto ps-2">
                    <button class="btn btn-secondary checked-{(!user.disabled).toString()}" on:click|preventDefault={() => changeUserDisabled(user)}>{user.disabled ? "Disabled" : "Enabled"}</button>
                </div>
            </div>
        </div>
        {/each}
    {:catch error}
        <p>{error}</p>
    {/await}
</main>

<style>
    main {
        margin-top: 90px;
    }

    .bg-indigo-400 {
        background-color: #8540f5;
    }

    .btn.checked-true {
        background-color: #8540f5;
    }
</style>