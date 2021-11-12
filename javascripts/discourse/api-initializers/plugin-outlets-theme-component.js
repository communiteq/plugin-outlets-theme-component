import { iconNode } from 'discourse-common/lib/icon-library';
import { apiInitializer } from 'discourse/lib/api';
import { h } from 'virtual-dom';

export default apiInitializer('0.11.1', (api) => {
  let icon = iconNode('plug');

  api.onPageChange(() => {
    const outlets = document.querySelectorAll('.outlet');
    const visibility = localStorage.getItem('plugin-outlet-visibility');

    if (visibility === null) {
      localStorage.setItem('plugin-outlet-visibility', 'outlets-visible');
    } else if (visibility === 'outlets-invisible') {
      outlets.forEach((outlet) => {
        outlet.style.display = 'none';
      });
    } else if (visibility === 'outlets-visible') {
      outlets.forEach((outlet) => {
        outlet.style.display = 'block';
      });
    }
  });

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
        localStorage.setItem('plugin-outlet-visibility', 'outlets-visible');
      } else {
        outlet.style.display = 'none';
        localStorage.setItem('plugin-outlet-visibility', 'outlets-invisible');
      }
    });
  });
});
