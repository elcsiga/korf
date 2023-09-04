<script lang="ts">
    import { replaceSlide } from "./transitions";

    const [slideIn, slideOut] = replaceSlide();
</script>

<div in:slideIn|global out:slideOut|global >
    <slot />
</div>
