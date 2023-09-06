<script lang="ts">
    import { Label, Input, Helper, Button, Modal } from "flowbite-svelte";
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { type Team } from "../../../../shared/types";
    import { createEventDispatcher } from "svelte";
    import ButtonRow from "../../../../lib/ButtonRow.svelte";
    import InputField from "../../../../lib/InputField.svelte";

    export let team: Team = {
        id: null,
        name: '',
        players: [],
        details: '',
    };

    const teamName = field("name", team.name, [required()]);
    const teamDetails = field("details", team.details);
    const teamForm = form(teamName, teamDetails);
    teamForm.validate();

    const dispatch = createEventDispatcher<{ apply: Team }>();
    const apply = () =>
        dispatch("apply", {
            ...team,
            ...$teamForm.summary,
        } as Team);
</script>

<InputField field={teamName} label="Name" placeholder="Name of the team" />
<InputField field={teamDetails} longText ={true} label="Details" placeholder="Team details" />

<ButtonRow>
    <Button disabled={!$teamForm.valid} on:click={apply}
        >{#if team.id}
            Edit Team
        {:else}
            Add Team
        {/if}
    </Button>
    <Button color="alternative">Cancel</Button>
</ButtonRow>
