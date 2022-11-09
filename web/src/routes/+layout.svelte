<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark navbar-static-top">
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
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul class="navbar-nav mb-2 mb-md-0">
        {#if data.user}
            <li class="nav-item">
                <a class="nav-link disabled" href="/users/me">{data.user.email}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout">Logout</a>
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
</style>