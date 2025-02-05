<script lang="ts">
// app.css includes tailwind css dependencies that we use
import './app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { router } from 'tinro';
import Route from './lib/Route.svelte';
import { onMount } from 'svelte';
import { getRouterState } from './api/client';
import HelloWorld from './HelloWorld.svelte';
import type { ServerInfo } from '@podman-desktop-mcp/shared';
import ChatInterface from './components/ChatInterface.svelte';
import ServerList from './components/ServerList.svelte';

// Using our router instance, we can determine if the application has been mounted.
router.mode.hash();
let isMounted = false;

let loading = true;
let servers: ServerInfo[] = [];

onMount(() => {
  // Load router state on application startup
  const state = getRouterState();
  router.goto(state.url);
  isMounted = true;
});

onMount(async () => {
  try {
    // TODO: Load servers from backend
    loading = false;
  } catch (error) {
    console.error('Failed to load servers:', error);
    loading = false;
  }
});
</script>

<!--
  This is the main application component. It is the root component of the application.
  It is responsible for rendering the application layout and routing the application to the correct page.

  For example, the main page of the application is the "HelloWorld" svelte component.$derived

  This can be expanded more by including more Route paths which the application can navigate too, for example /about, /contact etc.
-->
<Route path="/*" breadcrumb="Hello World" isAppMounted={isMounted} let:meta>
  <main class="flex flex-col w-screen h-screen overflow-hidden bg-[var(--pd-content-bg)]">
    <div class="flex flex-row w-full h-full overflow-hidden">
      <Route path="/" breadcrumb="Hello World Page">
        <HelloWorld />
      </Route>
    </div>
  </main>
</Route>

<div class="app-container">
  {#if loading}
    <div class="loading">Loading...</div>
  {:else}
    <div class="sidebar">
      <ServerList {servers} />
    </div>
    <div class="main-content">
      <ChatInterface {servers} />
    </div>
  {/if}
</div>

<style>
  .app-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.2rem;
    color: var(--text-secondary);
  }

  .sidebar {
    width: 250px;
    border-right: 1px solid var(--border-color, #ccc);
    background: var(--background-secondary);
  }

  .main-content {
    flex: 1;
    overflow: hidden;
    background: var(--background-primary);
  }
</style>
