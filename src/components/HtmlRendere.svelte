<script>
  import Handlebars from "../../node_modules/handlebars/dist/cjs/handlebars.js";

  let templateFile = `<div>
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
      </div>`;

  let template = Handlebars.compile(templateFile);

  let output = template({
    people: [
      {
        title: "Hr.",
        name: "Manfred Bauer",
        email: "manfred@email.com",
        tel: "4124",
      },
    ],
  });
</script>

<div class="container">
  {@html output}
</div>

<style>
  .container {
    height: 100%;
    padding: 20px 25px;
  }
</style>
