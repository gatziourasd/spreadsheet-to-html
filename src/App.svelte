<script>
  //Remove Spreadsheet component for debug!
  import SplitPane from "./components/SplitPane.svelte";
  import Spreadsheet from "./components/Spreadsheet.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import HtmlRenderer from "./components/HtmlRendere.svelte";
</script>

<div class="container">
  <HeaderBar />
  <SplitPane splitPercentage="50">
    <div style="height: 100%;" slot="left">
      <Spreadsheet />
    </div>
    <!-- <div
      style="background-color: blue; height: 100%; width: 100% min-width: 300px"
      slot="left"
    >
      LEFT PANE
    </div> -->
    <div slot="right" style="height: 100%; width: 100%">
      <HtmlRenderer />
    </div>
  </SplitPane>
</div>

<style>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
