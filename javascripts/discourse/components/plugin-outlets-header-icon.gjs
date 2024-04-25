import Component from "@glimmer/component";
import DButton from "discourse/components/d-button";
import { action } from "@ember/object";

export default class PluginOutletsHeaderIcon extends Component {
  @action
  toggleOutlets() {
    if (document.body.classList.contains('plugin-outlets-visible')) {
      document.body.classList.remove('plugin-outlets-visible');
      localStorage.setItem('plugin-outlet-visibility', 'outlets-invisible');
    } else {
      document.body.classList.add('plugin-outlets-visible');
      localStorage.setItem('plugin-outlet-visibility', 'outlets-visible');
    }
  }

  <template>
    <li>
      <DButton
        class="icon btn-flat plugin-outlets-header-icon"
        @icon="plug"
        @action={{this.toggleOutlets}}
      />
    </li>
  </template>
}
