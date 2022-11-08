<script>
    /** @type {import('./$types').PageData} */
    export let data;
    /** @type {import('./$types').ActionData} */
    export let form;
    console.log(form);
</script>

<h1>SignUp</h1>
<h3>Login or create a new User Account</h3>
<form method="POST" action="?/login">
    <label>
        email
        <input name="email" type="email">
    </label>
    <label>
        password
        <input name="password" type="password">
    </label>
    <button>Log in</button>
    <button formaction="?/register">Register</button>
</form>

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
</style>