<script>
  import {
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Navbar,
  } from "flowbite-svelte";
  import { DarkMode } from "flowbite-svelte";
  import { appState } from "../../state/state";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import FullPageError from "../../lib/FullPageError.svelte";
  import TeamPage from "./pages/teams/TeamPage.svelte";
  import TeamsPage from "./pages/teams/TeamsPage.svelte";
    import PlayerPage from "./pages/teams/PlayerPage.svelte";

  console.log("---", $appState);

  export let url = "";
</script>

<Router {url}>
  <Navbar let:hidden let:toggle>
    <NavBrand href="/">
      <img src="/korf.webp" class="mr-3 h-6 sm:h-9" alt="Korfball" />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >Korf</span
      >
    </NavBrand>

    <div class="flex md:order-2">
      <DarkMode />
      <NavHamburger on:click={toggle} />
    </div>

    <NavUl {hidden}>
      <NavLi><Link to="/">Home</Link></NavLi>
      <NavLi><Link to="/teams">Teams</Link></NavLi>
    </NavUl>
  </Navbar>

  <div class="mx-auto container px-2 sm:px-4">
    <Route path="/"><Home /></Route>
    <Route path="/teams" component={TeamsPage} />
    <Route path="/teams/:id" let:params>
      <TeamPage id={params.id} />
    </Route>
    <Route path="/teams/:teamId/player/:id" let:params>
      <PlayerPage teamId={params.teamId} id={params.id} />
    </Route>
    <Route path="**" let:params>
      <FullPageError>Invalid route!</FullPageError>
    </Route>
  </div>
</Router>
