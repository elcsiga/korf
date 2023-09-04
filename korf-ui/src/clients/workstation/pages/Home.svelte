<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Button, Card } from "flowbite-svelte";
  import PageTitle from "../../../lib/PageTitle.svelte";
  import { Icon } from "flowbite-svelte-icons";
  import MainCard from "../../../lib/MainCard.svelte";
</script>

<Breadcrumb>
  <BreadcrumbItem home>Home</BreadcrumbItem>
</Breadcrumb>

<div class="my-4">
  <MainCard path="teams">
    <span slot="title">Teams & Players</span>
    Create and manage Teams and team members.
    <span slot="button">Manage Teams </span>
  </MainCard>
</div>
