<script>
  import Modal from "./Modal.svelte";
  let modalElement;
</script>

<Modal title="Template (handlebars.js" bind:this={modalElement}>
<pre class="content">
    {`<div>
        {{#each people as |person|}}
          <div style="font-size: 14px; font-family: 'DaxPro-Regular', 'Segoe UI Semilight';">
            <span style="color: #7F7F7F">{{person.title}}</span>
            <a
              style="color: #111111;"
              href="mailto:{{person.email}}"
            >{{person.name}}</a>
            {{#if tel}}
              <span style="color: #7F7F7F">, Tel.</span>
              <span style="color: #111111;">{{person.tel}}</span>
            {{/if}}
          </div>
        {{/each}}
      </div>`}
</pre>
<div class="button-container">
    <button>Save</button>
</div>
</Modal>
<div class="container">
  <div class="logo"><img src="/favicon.svg" alt="logo"></div>
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
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
