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
  import EditTeamDialog from "./EditTeamDialog.svelte";
  import ButtonRow from "../../../../lib/ButtonRow.svelte";
  import type { Team } from "../../../../shared/types";
  import { CreateTeamCommand } from "../../../../shared/commands/commands";
    import PageTitle from "../../../../lib/PageTitle.svelte";

  let addTeamDialogOpen = false;
  const createTeam = (e: CustomEvent<Team>) =>
    send(new CreateTeamCommand(e.detail));
</script>

<Breadcrumb>
  <BreadcrumbItem home><Link to="/">Home</Link></BreadcrumbItem>
  <BreadcrumbItem>Teams</BreadcrumbItem>
</Breadcrumb>

<ButtonRow>
  <Button on:click={() => (addTeamDialogOpen = true)}>Create Team</Button>
</ButtonRow>

<PageTitle>Teams</PageTitle>

<Table hoverable={true}>
  <TableHead>
    <TableHeadCell>Team Name</TableHeadCell>
  </TableHead>
  {#if $appState?.teams.length}
    <TableBody tableBodyClass="divide-y">
      {#each $appState.teams as team}
        <TableBodyRow>
          <TableBodyCell on:click={() => navigate("/teams/" + team.id)}
            >{team.name}</TableBodyCell
          >
        </TableBodyRow>
      {/each}
    </TableBody>
  {:else}
    No teams.
  {/if}
</Table>

<EditTeamDialog bind:open={addTeamDialogOpen} on:apply={createTeam} />
