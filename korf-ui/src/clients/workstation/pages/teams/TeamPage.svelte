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
    DeleteTeamCommand,
    UpdateTeamCommand,
  } from "../../../../shared/commands/commands";
  import ConfirmationDialog from "../../../../lib/ConfirmationDialog.svelte";
  import EditTeamDialog from "./EditTeamDialog.svelte";
  import type { Player, Team } from "../../../../shared/types";
  import PageTitle from "../../../../lib/PageTitle.svelte";
  import EditPlayerDialog from "./EditPlayerDialog.svelte";
    import FullPageError from "../../../../lib/FullPageError.svelte";

  export let id: string;
  let team;
  $: team = $appState?.teams.find((t) => t.id === id);

  let deleteTeamDialogOpen = false;
  const deleteTeam = () => {
    send(new DeleteTeamCommand(team.id));
    navigate("/teams");
  };

  let editTeamDialogOpen = false;
  const editTeam = (e: CustomEvent<Team>) =>
    send(new UpdateTeamCommand(e.detail));

  let addPlayerDialogOpen = false;
  const createPlayer = (e: CustomEvent<Player>) =>
    send(new CreatePlayerCommand(team.id, e.detail));
</script>

{#if team}
  <div>
    <Breadcrumb>
      <BreadcrumbItem home><Link to="/">Home</Link></BreadcrumbItem>
      <BreadcrumbItem><Link to="/teams">Teams</Link></BreadcrumbItem>
      <BreadcrumbItem>{team.name}</BreadcrumbItem>
    </Breadcrumb>

    <ButtonRow>
      <Button on:click={() => (editTeamDialogOpen = true)}>Edit</Button>
      <Button on:click={() => (addPlayerDialogOpen = true)}>Add Player</Button>
      <Button on:click={() => (deleteTeamDialogOpen = true)}>Delete</Button>
    </ButtonRow>

    <PageTitle>{team.name}</PageTitle>

    <Table hoverable={true}>
      <TableHead>
        <TableHeadCell>Number</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
      </TableHead>
      {#if team.players.length}
        <TableBody tableBodyClass="divide-y">
          {#each team.players as player}
            <TableBodyRow
              on:click={() =>
                navigate("/teams/" + team.id + "/player/" + player.id)}
            >
              <TableBodyCell>{player.number}</TableBodyCell>
              <TableBodyCell>{player.name}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      {:else}
        No players.
      {/if}
    </Table>

    <ConfirmationDialog bind:open={deleteTeamDialogOpen} on:apply={deleteTeam}>
      Are you sure you want to delete <i>{team.name}</i>?
      <span slot="apply">Delete Team</span>
    </ConfirmationDialog>

    <EditTeamDialog bind:open={editTeamDialogOpen} {team} on:apply={editTeam} />
    <EditPlayerDialog bind:open={addPlayerDialogOpen} on:apply={createPlayer} />
  </div>
{:else}
  <FullPageError>No team found!</FullPageError>
{/if}
