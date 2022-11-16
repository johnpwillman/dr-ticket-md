<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores';
  import Cookies from 'js-cookie'
  import {
      PUBLIC_ENV,
      PUBLIC_DEV_API_ROOT,
      PUBLIC_API_ROOT
  } from '$env/static/public';
  let apiRoot = PUBLIC_ENV == 'DEV' ? PUBLIC_DEV_API_ROOT : PUBLIC_API_ROOT

  let app_name = "Dr. Ticket M.D."
  onMount(async () => {
		const response = await fetch(apiRoot + 'app/name')
    let text = await response.text()
    if (response.ok) {
      app_name = text
    }
	});

  let user
  
  $: retrieveUser($page.url.pathname)
  function retrieveUser(somepath) {
    let userCookie = Cookies.get('user')
    user = userCookie ? JSON.parse(userCookie) : undefined
  }

  function logout() {
    Cookies.remove('jwt')
    Cookies.remove('user')
    user = undefined
  }
</script>

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-indigo-400 navbar-static-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">{app_name}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Tickets</a>
        </li>
      </ul>
      <ul class="navbar-nav mb-2 mb-md-0">
        {#if user}
            {#if user.admin}
            <li class="nav-item">
                <a class="nav-link" href="/users">Users Admin</a>
            </li>
            {/if}
            <li class="nav-item">
                <a class="nav-link disabled" href="/users/me">{user.email}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/login" on:click={logout}>Logout</a>
            </li>
        {:else}
            <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
            </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<slot></slot>

<style>
  .bg-indigo-400 {
    background-color: #8540f5;
  }
</style>