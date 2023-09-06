<script lang="ts">
    import { Label, Input, Helper, Textarea } from "flowbite-svelte";
    export let field: any;
    export let label: string;
    export let placeholder: string;
    export let longText = false;
</script>

<div class="mb-6">
    <Label for={$field.name} class="block mb-2">{label}</Label>
    {#if longText}
        <Textarea bind:value={$field.value} id={$field.name} {placeholder} />
    {:else}
        <Input bind:value={$field.value} id={$field.name} {placeholder} />
    {/if}
    {#if $field.dirty && $field.errors.includes("required")}
        <Helper class="mt-2" color="red">{$field.name} is required!</Helper>
    {/if}
</div>
