<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { type Player } from "../../../../shared/types";
    import { createEventDispatcher } from "svelte";
    import ButtonRow from "../../../../lib/ButtonRow.svelte";
    import InputField from "../../../../lib/InputField.svelte";

    export let player: Player = {
        id: null,
        name: '',
        number: '',
        details: ''
    };

    const playerName = field("name", player.name, [required()]);
    const playerNumber = field("number", player.number, [required()]);
    const playerDetails = field("details", player.details);
    const playerForm = form(playerName, playerNumber, playerDetails);
    playerForm.validate();

    const dispatch = createEventDispatcher<{ apply: Player }>();
    const apply = () =>
        dispatch("apply", {
            ...player,
            ...$playerForm.summary,
        } as Player);
</script>

<InputField
    field={playerNumber}
    label="Number"
    placeholder="Number of the player"
/>
<InputField field={playerName} label="Name" placeholder="Name of the player" />
<InputField field={playerDetails} longText ={true} label="Details" placeholder="Player details" />

<ButtonRow>
    <Button disabled={!$playerForm.valid} on:click={apply}
        >{#if player.id}
            Edit Player
        {:else}
            Add Player
        {/if}
    </Button>
    <Button color="alternative">Cancel</Button>
</ButtonRow>
