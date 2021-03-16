<!-- Redirect page -->
<script context="module" lang="ts">
  type Loaded = {
    status?: number;
    error?: Error | string;
    redirect?: string;
    maxage?: number;
    props?: Record<string, any>;
    context?: Record<string, any>;
  };

  export function load(): Loaded {
    return {
      status: 302,
      redirect: "/dashboard",
    };
  }
</script>
