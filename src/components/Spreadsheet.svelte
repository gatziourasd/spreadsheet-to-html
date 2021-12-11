<script>
  import { spreadsheetStore } from "../stores/spreadsheetStore.js";
  import Handsontable from "handsontable";
  import "handsontable/dist/handsontable.full.css";
  import { onDestroy, onMount } from "svelte";

  if (!localStorage.spreadsheetData) {
    localStorage.spreadsheetData = JSON.stringify(
      new Array(41).fill(["", "", "", ""])
    );
  }

  let data = JSON.parse(localStorage.spreadsheetData);

  let spreadsheetElement;
  let hot;
  let resizeObserver;

  let hasChanged = false;

  onMount(() => {
    hot = new Handsontable(spreadsheetElement, {
      data: data,
      rowHeaders: true,
      stretchH: "all",
      fixedRowsTop: 1,
      minSpareRows: 1,
      minSpareCols: 1,
      persistentState: true,
      contextMenu: [
        "row_above",
        "row_below",
        "remove_row",
        "---------",
        "col_left",
        "col_right",
        "remove_col",
      ],
      licenseKey: "non-commercial-and-evaluation",
      afterChange: afterChange,
    });
    $spreadsheetStore = hot.getData();
    resizeObserver = new ResizeObserver(resizeTable).observe(
      spreadsheetElement
    );

    hasChanged = false;
  });

  function resizeTable() {
    hot.refreshDimensions();
  }

  function afterChange(changes) {
    if (hot) {
      $spreadsheetStore = hot.getData();
    }
    hasChanged = true;
  }

  onDestroy(() => {
    hot.destroy();
  });

  export function getSpreadsheet() {
    return hot;
  }

  function save() {
    localStorage.spreadsheetData = JSON.stringify(hot.getData());
    hasChanged = false;
  }

  function load() {
    const localData = JSON.parse(localStorage.spreadsheetData ?? "{}");
    hot.getInstance().loadData(localData);
    hot.getInstance().render();
  }

  function clear() {
    data = data.map((row) => {
      return row.map((cell) => {
        return "";
      });
    });

    hot.getInstance().loadData(data);
    hot.getInstance().render();
  }
</script>

<div class="container">
  <div class="spreadsheet-container" bind:this={spreadsheetElement} />
  <div class="tool-bar">
    <div class="button-group">
      <button on:click={clear}>Clear</button>
      <button on:click={load}>Reset</button>
    </div>
    <button class:inactive={!hasChanged} on:click={save}>Save</button>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;

    height: 100%;
  }
  .spreadsheet-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* Style first table row to look like a header row */
  :global(tbody > tr:nth-child(1) > td) {
    background-color: #f0f0f0;
    font-weight: 700;
  }

  .active {
    pointer-events: none;
    color: gray;
    background-color: coral;
  }

  .inactive {
    background-color: var(--helper-gray-lighter, gray);
    color: var(--helper-gray-darker, black);
    pointer-events: none;
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
</style>
