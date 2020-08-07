<!-- Redirect page -->
<script context="module" lang="ts">
	export async function preload() {
		this.redirect(302, 'dashboard')
	}
</script>