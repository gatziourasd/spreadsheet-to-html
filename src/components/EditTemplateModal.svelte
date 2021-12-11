<script>
  import { templates } from "../stores/templateStore.js";
  import Modal from "./Modal.svelte";
  let modalElement;

  let editorContent = $templates;

  $: $templates = editorContent;

  export function open() {
    modalElement.open();
  }

  export function close() {
    modalElement.close();
  }

  function save() {
    templates.save(editorContent);
    savedState = localStorage.templateFile ?? "";
  }

  function reset() {
    editorContent = localStorage.templateFile ?? "";
    savedState = localStorage.templateFile ?? "";
  }

  let savedState = localStorage.templateFile ?? "";
</script>

<Modal title='Template (handlebars.js) [Base Object "row"]' bind:this={modalElement}>
  <textarea class="editor" bind:value={editorContent} />
  <div class="button-container">
    <button
      class="reset-button"
      class:inactive={editorContent === savedState}
      on:click={reset}
    >
      Reset
    </button>
    <button class:inactive={editorContent === savedState} on:click={save}>
      Save
    </button>
  </div>
</Modal>

<style>
  .editor {
    width: 50vw;
    min-height: 300px;
    min-width: 300px;
    height: 500px;
  }

  .inactive {
    background-color: var(--helper-gray-lighter, gray);
    color: var(--helper-gray-darker, black);
    pointer-events: none;
  }

  .button-container {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }

  button {
    transition: 400ms;
  }
</style>
