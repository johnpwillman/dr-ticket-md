<script>
  import { page } from '$app/stores';
  import Cookies from 'js-cookie'

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
    <a class="navbar-brand" href="/">Dr. Ticket M.D.</a>
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