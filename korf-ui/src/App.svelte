<script lang="ts">
  import { appState } from "./state/state";
  import { Alert } from 'flowbite-svelte';


</script>

<main>
  <h1>KORF 3</h1>


  <div class="p-8">
    <Alert>
      <span class="font-medium">Info alert!</span>
      Change a few things up and try submitting again.
    </Alert>
  </div>

  { JSON.stringify($appState) }

</main>

<style>


</style>
