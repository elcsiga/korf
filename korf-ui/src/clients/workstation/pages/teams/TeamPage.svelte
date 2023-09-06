<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
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
  import ConfirmationDialog from "../../../../lib/ConfirmationDialog.svelte";
  import EditTeamDialog from "./EditTeamDialog.svelte";
  import type { Player, Team } from "../../../../shared/types";
  import PageTitle from "../../../../lib/PageTitle.svelte";
  import EditPlayerDialog from "./EditPlayerDialog.svelte";
  import FullPageError from "../../../../lib/FullPageError.svelte";
  import TransitionContainer from "../../../../lib/transition/TransitionContainer.svelte";
  import { setStructureDepth } from "../../../../lib/transition/transitions";
  import {
    DeleteTeamCommand,
    UpdateTeamCommand,
  } from "../../../../shared/commands/commands/team";
  import { CreatePlayerCommand } from "../../../../shared/commands/commands/player";
    import PageDetails from "../../../../lib/PageDetails.svelte";

  setStructureDepth(2);

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

  let createPlayerDialogOpen = false;
  const createPlayer = (e: CustomEvent<Player>) =>
    send(new CreatePlayerCommand(team.id, e.detail));
</script>

<TransitionContainer>
  {#if team}
    <Breadcrumb>
      <BreadcrumbItem home><Link to="/">Home</Link></BreadcrumbItem>
      <BreadcrumbItem><Link to="/teams">Teams</Link></BreadcrumbItem>
      <BreadcrumbItem>{team.name}</BreadcrumbItem>
    </Breadcrumb>

    <ButtonRow>
      <Button on:click={() => (editTeamDialogOpen = true)}>Edit</Button>
      <Button on:click={() => (createPlayerDialogOpen = true)}
        >Add Player</Button
      >
      <Button on:click={() => (deleteTeamDialogOpen = true)}>Delete</Button>
    </ButtonRow>

    <PageTitle>{team.name}</PageTitle>
    <PageDetails>{team.details}</PageDetails>

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

    <Modal bind:open={editTeamDialogOpen} autoclose>
      <EditTeamDialog {team} on:apply={editTeam} />
    </Modal>
    <Modal bind:open={createPlayerDialogOpen} autoclose>
      <EditPlayerDialog on:apply={createPlayer} />
    </Modal>
  {:else}
    <FullPageError>No team found!</FullPageError>
  {/if}
</TransitionContainer>
