<h1>SignUp</h1>
<h3>Create a new User Account</h3>
<form method="POST" on:submit|preventDefault={createUser} >
    <label>
        email
        <input name="email" type="email" bind:value={email}>
    </label>
    <label>
        password
        <input name="password" type="password" bind:value={password}>
    </label>
    <button>Log in</button>
</form>

<script>
    import { onMount } from 'svelte';

    let apiBase = 'http://127.0.0.1:8000/v1/'

    let email = '';
    let password = '';

    async function createUser() {
        let opts = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        const res = await fetch(apiBase + "users", opts);
        if (res.ok || res.status === 422) {
            const text = await res.text();
            console.log( text ? JSON.parse(text) : {} );
        }
    }
    

    // onMount(async () => {
    //     let res = await fetch('http://127.0.0.1:8000/openapi.json');
    //     console.log(await res.json());
    // });
</script>