<script>
  import { spreadsheetStore } from "../stores/spreadsheetStore.js";
  import Handsontable from "handsontable";
  import "handsontable/dist/handsontable.full.css";
  import { onDestroy, onMount } from "svelte";

  const data = [
    ["Anrede", "Name", "Email", "Tel"],
    ["Hr.", "Manfred Bauer", "mani@email.com", "1234"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
    ["Fr.", "Hellen Arnolt", "hellen@email.com", "4556"],
  ];

  let spreadsheetElement;
  let hot;
  let resizeObserver;

  onMount(() => {
    hot = new Handsontable(spreadsheetElement, {
      data: data,
      rowHeaders: true,
      stretchH: "all",
      fixedRowsTop: 0,
      minSpareRows: 1,
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
    console.log(hot.getData());

    resizeObserver = new ResizeObserver(resizeTable).observe(spreadsheetElement);
  });

  function resizeTable() {
    hot.refreshDimensions();
  }

  function afterChange(changes) {
    if (hot) {
      $spreadsheetStore = hot.getData();
    }
  }

  onDestroy(() => {
    hot.destroy();
  });

  export function getSpreadsheet() {
    return hot;
  }
</script>

<div class="spreadsheet-container" bind:this={spreadsheetElement} />

<style>
  .spreadsheet-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
