import { iconNode } from 'discourse-common/lib/icon-library';
import { apiInitializer } from 'discourse/lib/api';
import { h } from 'virtual-dom';

export default apiInitializer('0.11.1', (api) => {
  let icon = iconNode('plug');
  api.decorateWidget('header-icons:before', () => {
    return h('li.header-dropdown-toggle', [
      h(
        'a.icon.btn-flat#toggle-plugin-outlets',
        {
          title: 'Toggle Outlets',
        },
        icon
      ),
    ]);
  });

  api.attachWidgetAction('header-icons', 'click', function (e) {
    const outlets = document.querySelectorAll('.outlet');

    outlets.forEach((outlet) => {
      if (outlet.style.display === 'none') {
        outlet.style.display = 'block';
      } else {
        outlet.style.display = 'none';
      }
    });
  });
});
