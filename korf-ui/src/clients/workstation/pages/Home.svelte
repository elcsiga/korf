<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Button, Card } from "flowbite-svelte";
  import MainCard from "../../../lib/MainCard.svelte";
  import TransitionContainer from "../../../lib/transition/TransitionContainer.svelte";
    import { setStructureDepth } from "../../../lib/transition/transitions";

  setStructureDepth(0);
</script>

<TransitionContainer>
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
</TransitionContainer>
