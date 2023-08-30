import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PluginOutletConnectorComponent extends Component {
    @tracked showName = true;

    @action
    toggleVisibility() {
      this.showName = !this.showName;
    }
}
