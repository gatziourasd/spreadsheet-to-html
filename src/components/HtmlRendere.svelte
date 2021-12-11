<script>
  import { spreadsheetStore } from "../stores/spreadsheetStore.js";
  import { templates } from "../stores/templateStore";
  import Handlebars from "../../node_modules/handlebars/dist/cjs/handlebars.js";
  import { onDestroy } from "svelte";
  import Modal from "./Modal.svelte";

  let templateFile = $templates;

  let errorMsg = "";
  let template;
  compileTemplateFile();

  let dataObjects = {};

  let output = "";

  const unsubscribeSpreadsheet = spreadsheetStore.subscribe((sourceData) => {
    const header = sourceData[0]
      .filter((header) => header !== null && header !== "")
      .map((header) => header?.toLowerCase().trim());
    let data = sourceData
      .slice(1)
      .filter((row) => {
        for (let i = 0; i < header.length; i++) {
          if (row[i] !== null && row[i] !== "") return true;
        }
        return false;
      })
      .map((row) => {
        const dataObject = {};
        for (let i = 0; i < header.length; i++) {
          dataObject[header[i]] = row[i];
        }
        return dataObject;
      });
    dataObjects = data;

    build();
  });

  function compileTemplateFile() {
    errorMsg = "";
    try {
      template = Handlebars.compile(templateFile);
    } catch (error) {
      errorMsg = error;
    }
  }

  function build() {
    try {
      output = template({
        row: [...dataObjects],
      });
    } catch (error) {
      errorMsg = error;
    }
  }

  const unsubscribeTemplate = templates.subscribe((newTemplateFile) => {
    templateFile = newTemplateFile;
    compileTemplateFile();
    build();
  });

  onDestroy(() => {
    unsubscribeTemplate();
    unsubscribeSpreadsheet();
  });

  let modalElement;

  function download(filename, text) {
    var pom = document.createElement("a");
    pom.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    pom.setAttribute("download", filename);

    if (document.createEvent) {
      var event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  }
</script>

<div class="container">
  {#if errorMsg !== ""}
    <pre class="error-msg">
      {errorMsg}
    </pre>
  {:else}
    <div class="html-container">
      {@html output}
    </div>
  {/if}

  <div class="tool-bar">
    <div class="button-group">
      <button
        on:click={() => {
          navigator.clipboard.writeText(output);
        }}
      >
        Copy
      </button>
      <button
        on:click={() => {
          download(`HTML-Output.html`, output);
        }}
      >
        Download
      </button>
    </div>
    <button
      on:click={() => {
        modalElement.open();
      }}
    >
      Show
    </button>
  </div>
</div>

<Modal title="HTML Output" bind:this={modalElement}>
  <textarea class="editor">
    {output}
  </textarea>
</Modal>

<style>
  .container {
    display: flex;
    flex-direction: column;

    height: 100%;
  }

  .html-container {
    height: 100%;
    padding: 20px 25px;
    overflow-y: scroll;
  }

  .editor {
    width: 50vw;
    min-height: 300px;
    min-width: 300px;
    height: 500px;
  }

  .tool-bar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    gap: 10px;

    padding: 10px 15px;

    background-color: var(--element-foreground, white);
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    gap: 10px;
  }

  .error-msg{
    color: var(--helper-red, red);
    height: 100%;
    white-space: pre-wrap;
  }
</style>
