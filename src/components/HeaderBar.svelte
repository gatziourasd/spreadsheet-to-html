<script>
  import EditTemplateModal from "./EditTemplateModal.svelte";
  let modalElement;
</script>

<EditTemplateModal bind:this={modalElement} />

<div class="container">
  <div class="logo-group">
    <img class="logo" src="/favicon.svg" alt="logo" />
    <h1>Spreadsheet to HTML</h1>
  </div>
  <button
    on:click={() => {
      modalElement.open();
    }}
    class="template-settings"
  >
    Template settings
  </button>
</div>

<style>
  .container {
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;

    background-color: var(--element-foreground, white);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  }

  .logo-group {
    display: flex;
    align-items: center;
  }

  h1 {
    margin: 0;
    padding: 0;

    font-size: 18px;
    font-weight: 600;

    margin-left: 20px;

    color: var(--text-dark, black);
  }

  .logo {
    height: 32px;
    width: 32px;
  }
</style>
