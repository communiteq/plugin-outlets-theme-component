import { apiInitializer } from 'discourse/lib/api';

export default apiInitializer('0.11.1', (api) => {
  let currentUser = api.getCurrentUser();
  if (currentUser && currentUser.admin) {
    api.addGlobalNotice('The Plugin Outlet Locations theme component has been deprecated. Use the <a href="https://meta.discourse.org/t/introducing-discourse-developer-toolbar/346215/" target="_blank">Developer Toolbar</a> instead.', "critical-deprecation", {
      dismissable: true,
      dismissDuration: moment.duration(1, "day"),
      level: "warn"
    });
  }
});
