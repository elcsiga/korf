<script lang="ts">
    import { Button, Card } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
    import { navigate } from "svelte-routing";

    export let path: string;
</script>

<Card>
    <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
        <slot name="title" />
    </h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        <slot />
    </p>
    <Button class="w-fit" on:click={() => navigate(path)}>
        <slot name="button" />
        <Icon name="arrow-right-outline" class="w-3.5 h-3.5 ml-2 text-white" />
    </Button>
</Card>
