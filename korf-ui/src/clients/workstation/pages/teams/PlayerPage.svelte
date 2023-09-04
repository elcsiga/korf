<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { appState, send } from "../../../../state/state";
  import { Link, navigate } from "svelte-routing";
  import ButtonRow from "../../../../lib/ButtonRow.svelte";
  import {
    CreatePlayerCommand,
    DeletePlayerCommand,
    DeleteTeamCommand,
    UpdatePlayerCommand,
    UpdateTeamCommand,
  } from "../../../../shared/commands/commands";
  import ConfirmationDialog from "../../../../lib/ConfirmationDialog.svelte";
  import EditTeamDialog from "./EditTeamDialog.svelte";
  import type { Player, Team } from "../../../../shared/types";
  import PageTitle from "../../../../lib/PageTitle.svelte";
  import EditPlayerDialog from "./EditPlayerDialog.svelte";
  import FullPageError from "../../../../lib/FullPageError.svelte";

  export let id: string;
  export let teamId: string;
  let team;
  let player;

  $: {
    team = $appState?.teams.find((t) => t.id === teamId);
    player = team?.players.find((p) => p.id === id);
  }

  let deletePlayerDialogOpen = false;
  const deletePlayer = () => {
    send(new DeletePlayerCommand(team.id, player.id));
    navigate("/teams/" + team.id);
  };

  let editPlayerDialogOpen = false;
  const editPlayer = (e: CustomEvent<Player>) =>
    send(new UpdatePlayerCommand(team.id, e.detail));
</script>

{#if player}
  <div>
    <Breadcrumb>
      <BreadcrumbItem home><Link to="/">Home</Link></BreadcrumbItem>
      <BreadcrumbItem><Link to="/teams">Teams</Link></BreadcrumbItem>
      <BreadcrumbItem
        ><Link to="/teams/{team.id}">{team.name}</Link></BreadcrumbItem
      >
      <BreadcrumbItem>{player.name}</BreadcrumbItem>
    </Breadcrumb>

    <ButtonRow>
      <Button on:click={() => (editPlayerDialogOpen = true)}>Edit</Button>
      <Button on:click={() => (deletePlayerDialogOpen = true)}>Delete</Button>
    </ButtonRow>

    <Heading tag="h1">{player.number}</Heading>
    <PageTitle>{player.name}</PageTitle>

    <ConfirmationDialog
      bind:open={deletePlayerDialogOpen}
      on:apply={deletePlayer}
    >
      Are you sure you want to delete <i>{player.name}</i>?
      <span slot="apply">Delete Player</span>
    </ConfirmationDialog>

    <EditPlayerDialog
      bind:open={editPlayerDialogOpen}
      {player}
      on:apply={editPlayer}
    />
  </div>
{:else}
  <FullPageError>No player found!</FullPageError>
{/if}