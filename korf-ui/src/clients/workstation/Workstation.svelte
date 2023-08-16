<script>
  import { NavBrand, NavHamburger, NavLi, NavUl, Navbar, SpeedDial, SpeedDialButton } from "flowbite-svelte";
  import { Icon } from "flowbite-svelte-icons";
  import { appState } from "../../state/state";
  import { Alert, DarkMode } from "flowbite-svelte";
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src="korf.webp"
      class="mr-3 h-6 sm:h-9"
      alt="Korfball"
    />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Korf</span
    >
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">Teams</NavLi>
    <NavLi href="/services">Players</NavLi>
    <NavLi href="/pricing">Matches</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>

<DarkMode />
<Alert>
  <span class="font-medium">Info alert!</span>
  Change a few things up and try submitting again.
</Alert>
