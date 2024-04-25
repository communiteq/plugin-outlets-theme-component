import { apiInitializer } from 'discourse/lib/api';
import PluginOutletsHeaderIcon from "../components/plugin-outlets-header-icon";

export default apiInitializer('0.11.1', (api) => {
  api.headerIcons.add("plugin-outlets-header-icon", PluginOutletsHeaderIcon);
});
