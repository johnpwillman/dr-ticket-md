<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<main class="form-signin w-100 m-auto">
    <form method="POST" action="?/login">
        <h1 class="h3 mb-3 fw-normal">Login or create a new User Account</h1>

        <div class="form-floating">
        <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
        <input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-lg btn-primary" type="submit">Sign in</button>
            <button class="btn btn-lg btn-secondary" formaction="?/register">Register</button>
        </div>
    </form>
</main>

{#if form?.success}
    <!-- this message is ephemeral; it exists because the page was rendered in
        response to a form submission. it will vanish if the user reloads -->
    <!--<p>Successfully logged in! Welcome back, {data.user.name}</p>-->
    <p>The {form.action} action was successful. Please login.</p>
{:else if form}
    <p class="error">The {form.action} action was unsuccessful. {form.message}</p>
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