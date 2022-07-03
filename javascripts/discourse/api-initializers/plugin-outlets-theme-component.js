import { iconNode } from 'discourse-common/lib/icon-library';
import { apiInitializer } from 'discourse/lib/api';
import { h } from 'virtual-dom';

export default apiInitializer('0.11.1', (api) => {
  let icon = iconNode('plug');

  api.onPageChange(() => {
    const visibility = localStorage.getItem('plugin-outlet-visibility');

    if (visibility === null) {
      localStorage.setItem('plugin-outlet-visibility', 'outlets-invisible');
    } else if (visibility === 'outlets-invisible') {
      document.body.classList.remove('plugin-outlets-visible');
    } else if (visibility === 'outlets-visible') {
      document.body.classList.add('plugin-outlets-visible');
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
    if (document.body.classList.contains('plugin-outlets-visible')) {
      document.body.classList.remove('plugin-outlets-visible');
      localStorage.setItem('plugin-outlet-visibility', 'outlets-invisible');
    } else {
      document.body.classList.add('plugin-outlets-visible');
      localStorage.setItem('plugin-outlet-visibility', 'outlets-visible');
    }
  });
});
