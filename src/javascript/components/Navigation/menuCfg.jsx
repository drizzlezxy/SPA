import CookieUtil from 'extend/common/CookieUtil';
export class menuCfg {
  static initMenu () {
    let menuList = {};
    let rootAdmin = CookieUtil.getCookieH5('group');
    if (rootAdmin === 'Root') {
      menuList = {
        initKey: '1',
        list: [
          {
            id: '1',
            name: '项目管理',
            icon: 'folder-open',
            href: '/Manage/User',
          },
        ],
      };
    } else {
      menuList = {
        initKey: '1',
        list: [
          {
            id: '1',
            name: '文件上传',
            icon: 'folder-open',
            href: '/Manage/Objects',
          },
          {
            id: '2',
            name: '文件列表',
            icon: 'bars',
            href: '/Manage/List',
          },
        ],
      };
    }
    return menuList;
  };
}
