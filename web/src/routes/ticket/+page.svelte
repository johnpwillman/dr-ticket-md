<script>
    /** @type {import('./$types').PageData} */
    export let data;
    console.log(data);
</script>

<main class="container">
    <form method="POST" action="?/newTicket">
        <h1 class="h3 mb-3 fw-normal">Create a new Ticket</h1>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Subject</label>
            <input type="text" name="subject" class="form-control" id="exampleFormControlInput1" placeholder="Quick description">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea name="body" class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Describe the issue in detail"></textarea>
          </div>
        <div class="gap-2">
            <button class="btn btn-dark bg-indigo-400" type="submit">Submit Ticket</button>
        </div>
    </form>
</main>

<style>
    main {
        margin-top: 90px;
    }

    .bg-indigo-400 {
        background-color: #8540f5;
    }
</style>