<script>
  export let splitPercentage = 50;

  const dividerWidth = 3;
  let rWidth = splitPercentage;

  let mousedown = false;
</script>

<svelte:body
  on:mouseup={() => {
    mousedown = false;
  }}
  on:mouseleave={() => {
    mousedown = false;
  }}
  on:mousemove={(e) => {
    if (mousedown) {
      rWidth = ((e.clientX - dividerWidth / 2) / window.innerWidth) * 100;
    }
  }} />

<div class="container">
  <div
    class="active pane selector"
    class:selector={mousedown}
    style="flex-basis: {rWidth}%; width: {rWidth}%; flex-grow: 0; flex-shrink: 0;"
  >
    <slot name="left" />
  </div>
  <div
    class="divider"
    style="width:{dividerWidth}px; min-width: {dividerWidth}px;"
    on:mousedown={() => {
      mousedown = true;
    }}
  />
  <div class="pane" class:selector={mousedown}>
    <slot name="right" />
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }

  .divider {
    background-color: var(--element-foreground-darker, black);
    cursor: col-resize;
  }

  .divider:hover {
    background-color: var(--accent-primary, blue);
    transform: scaleX(4);
    z-index: 310;
  }

  .selector {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .pane {
    width: 100%;
  }
</style>
