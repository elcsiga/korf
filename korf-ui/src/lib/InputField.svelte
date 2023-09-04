<script lang="ts">
    import { Label, Input, Helper } from "flowbite-svelte";
    export let field: any;

    export let label: string;
    export let placeholder: string;
</script>

<div class="mb-6">
    <Label for="{$field.name}" class="block mb-2">{label}</Label>
    <Input bind:value={$field.value} id={$field.name} {placeholder} />

    {#if $field.dirty && $field.errors.includes("required")}
        <Helper class="mt-2" color="red">{$field.name} is required!</Helper>
    {/if}
</div>
