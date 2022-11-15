<script>
    // export let data
    import { goto } from '$app/navigation';
    import Cookies from 'js-cookie'
    import {
        PUBLIC_ENV,
        PUBLIC_DEV_API_ROOT,
        PUBLIC_API_ROOT
    } from '$env/static/public';
    let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

    let email
    let password
    let result = {}
    async function login() {
        const resp = await fetch(apiRoot + "token/", {
            method: "POST",
            body: 'grant_type=password&username=' + email + '&password=' + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let respJson = await resp.json()
        result = {
            success: resp.ok,
            detail: JSON.stringify(respJson)
        }
        if (resp.ok) {
            Cookies.set('jwt', respJson.access_token, {
                path: '/',
                sameSite: 'strict'
            })
        }
        const response = await fetch(apiRoot + 'users/me', {
            headers: {
                "Authorization": "Bearer " + Cookies.get('jwt')
            }
        })
        let responseJson = await response.json()
        if (response.ok) {
            Cookies.set('user', JSON.stringify(responseJson), {
                path: '/',
                sameSite: 'strict'
            })
            await goto('/')
        }
    }
    async function register() {
        console.log('register', email, password)
        const response = await fetch(apiRoot + "users/", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let responseJson = await response.json()
        result = {
            success: response.ok,
            detail: response.ok ? "Please login." : JSON.stringify(responseJson)
        }
    }

</script>

<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={login}>
        <h1 class="h3 mb-3 fw-normal">Login or create a new User Account</h1>

        <div class="form-floating">
        <input name="email" bind:value="{email}" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
        <input name="password" bind:value="{password}" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-lg btn-primary" type="submit">Sign in</button>
            <button class="btn btn-lg btn-secondary" on:click|preventDefault={register}>Register</button>
        </div>
    </form>
</main>

{#if result.success}
    <p>The action was successful. {result.detail}</p>
{:else if result.detail}
    <p class="error">The action was unsuccessful. {result.detail}</p>
{/if}

<style>

    .error {
        color: red;
    }

    .form-signin {
        max-width: 330px;
        padding: 15px;

        margin-top: 90px!important;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>