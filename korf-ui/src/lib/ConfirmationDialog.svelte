<script lang="ts">
    import { Button, Modal } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
    import { createEventDispatcher } from "svelte";

    export let open = false;
    const dispatch = createEventDispatcher();
</script>

<Modal bind:open={open} size="xs" autoclose>
    <div class="text-center">
        <Icon
            name="exclamation-circle-outline"
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <slot />
        </h3>
        <Button
            color="red"
            class="mr-2"
            on:click={() => dispatch('apply')}><slot name="apply"/></Button
        >
        <Button color="alternative">Cancel</Button>
    </div>
</Modal>
