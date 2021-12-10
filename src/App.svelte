<script>
  import SplitPane from "./components/SplitPane.svelte";
  // import Spreadsheet from "./components/Spreadsheet.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import HtmlRenderer from "./components/HtmlRendere.svelte";
</script>

<div style="height: 100vh;">
  <HeaderBar />
  <SplitPane splitPercentage="50">
    <!-- <div style="height: 100%" slot="left">
      <Spreadsheet />
    </div> -->
    <div
      style="background-color: blue; height: 100%; width: 100% min-width: 300px"
      slot="left"
    >
      LEFT PANE
    </div>
    <div slot="right" style="height: 100%; width: 100%">
      <HtmlRenderer />
    </div>
  </SplitPane>
</div>
