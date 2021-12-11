<script>
  export let title = "";
  let isOpen = false;

  export function open() {
    isOpen = true;
  }
  export function close() {
    isOpen = false;
  }

  $: document.body.classList.toggle("no-scroll", isOpen);
</script>

{#if isOpen}
  <div class="container">
    <div class="foreground">
      <div class="button-container">
        <h3>{title}</h3>
        <button class="close-button" on:click={close}>Close</button>
      </div>
      <slot />
    </div>
    <div
      class="background"
      on:click={() => {
        isOpen = false;
      }}
    />
    <div class="block-pointer" />
  </div>
{/if}

<style>
  .container {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 300;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .background {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    align-items: center;
    z-index: 302;
  }

  .foreground {
    z-index: 303;

    padding: 20px 25px;
    background-color: white;
    border-radius: 5px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    margin-top: -15px;
  }

  .block-pointer {
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    align-items: center;
    z-index: 301;
  }

  :global(.no-scroll) {
    height: 100%;
    overflow-y: hidden;
  }

  .close-button {
    background-color: var(--helper-red, red);
    color: var(--text-light, white);
  }

  .close-button:hover {
    background-color: var(--helper-red-lighter);
  }

  .close-button:active {
    background-color: var(--helper-red-darker);
  }
</style>
