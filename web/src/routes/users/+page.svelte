<script>
    import { goto } from '$app/navigation'
    import Cookies from 'js-cookie'
    import {
        PUBLIC_ENV,
        PUBLIC_DEV_API_ROOT,
        PUBLIC_API_ROOT
    } from '$env/static/public';
    let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

    let users

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
        }
    }

</script>

<main class="container">
    {#await getUsers()}
        <p>Retrieving users</p>
    {:then} 
    <table class="mx-auto user-table">
        <thead>
            <tr>
                <th>Email</th>
                <th>Admin</th>
                <th>Disabled</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each users as user}
            <tr>
                <td>
                    {user.email}
                </td>
                <td class="text-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="admin" bind:checked="{user.admin}">
                        Admin
                    </div>
                </td>
                <td class="text-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="disabled" bind:checked="{user.disabled}">
                        Disabled
                    </div>
                </td>
                <td class="text-center">
                    <button class="btn btn-secondary btn-sm bg-indigo-400" on:click|preventDefault={() => updateUser(user)} type="submit" name="submit">Update</button>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
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

    .user-table th, .user-table td {
        padding: 0 2em 1em 2em!important;
    }
</style>