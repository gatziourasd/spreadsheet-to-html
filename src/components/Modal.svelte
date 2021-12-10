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
        <button on:click={close}>Close</button>
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
    z-index: 100;
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
    z-index: 102;
  }

  .foreground {
    z-index: 103;

    padding: 20px 25px;
    background-color: white;
    border-radius: 5px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  .block-pointer {
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    align-items: center;
    z-index: 101;
  }

  :global(.no-scroll) {
    height: 100%;
    overflow-y: hidden;
  }
</style>
