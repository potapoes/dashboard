import { observable, action } from 'mobx';
import { pick } from 'lodash';

import Store from './Store';

import App, {
  Deploy as AppDeploy,
  Version as AppVersion,
  Create as AppCreate,
  Uncategoried as AppUncategoried
} from './app';
import Category from './category';
import Cluster, { Detail as ClusterDetail } from './cluster';
import Runtime, {
  Credential as RuntimeCredential,
  RuntimeCluster
} from './runtime';
import User, { Role, Group, Detail as UserDetail } from './user';
import sshKey from './key_pair';
import TestingEnv, { Create as TestingEnvCreate } from './testing_env';
import Vendor from './vendor';
import CloudEnv from './cloud_env';
import NotificationServer from './notification_server';
import Modal from './modal';

const defaultNotifyOption = { title: '', message: '', type: 'info' };

export default class RootStore extends Store {
  @observable fixNav = false;

  @observable notifications = [];

  user = {};

  lastSetFixStamp = Date.now();

  constructor(initialState) {
    super(initialState);
    this.state = initialState;
  }

  @action
  setNavFix = fixNav => {
    if (Date.now() - this.lastSetFixStamp < 300) {
      // fixNav在临界值造成的抖动，忽略此次设置
      return;
    }
    this.lastSetFixStamp = Date.now();
    this.fixNav = !!fixNav;
  };

  @action
  setUser = user => {
    this.user = user;
  };

  getUser = () => this.user;

  @action
  updateUser = props => {
    this.user.update(props);
  };

  @action
  notify = (...msg) => {
    let notification = {};

    if (typeof msg[0] === 'object') {
      notification = pick(Object.assign(defaultNotifyOption, msg[0]), [
        'title',
        'message',
        'type'
      ]);
    } else if (typeof msg[0] === 'string') {
      notification = Object.assign(defaultNotifyOption, {
        message: msg[0],
        type: msg[1],
        title: msg[2]
      });
    } else {
      throw Error('invalid notification message');
    }

    this.notifications.push(
      Object.assign(notification, {
        ts: Date.now()
      })
    );
  };

  @action
  detachNotify = ts => {
    this.notifications = this.notifications.filter(item => item.ts !== ts);
  };

  @action
  clearNotify = () => {
    this.notifications = [];
  };

  register = (name, Ctor, withState = true) => {
    if (!name.endsWith('Store')) {
      name += 'Store';
    }
    if (typeof Ctor === 'function') {
      this[name] = new Ctor(withState ? this.state : '', name);
    } else if (
      typeof Ctor === 'object'
      && Ctor.opStore.toString() === 'Symbol(op)'
    ) {
      Ctor.setInitialState(withState ? this.state : '', name);
      this[name] = Ctor;
    } else {
      throw Error('Invalid store constructor or instance');
    }

    Object.assign(this[name], {
      notify: this.notify,
      updateUser: this.updateUser,
      getStore: this.getRegisteredStore,
      getUser: this.getUser
    });
  };

  getRegisteredStore = (name = '') => {
    if (!name) {
      throw Error('Bad store name');
    }
    if (!name.endsWith('Store')) {
      name += 'Store';
    }

    if (!(this[name] instanceof Store)) {
      throw Error(`Unregisterd store: ${name}`);
    }

    return this[name];
  };

  registerStores = () => {
    // app
    this.register('app', App);
    this.register('appDeploy', AppDeploy);
    this.register('appVersion', AppVersion);
    this.register('appCreate', AppCreate);
    this.register('appUncategoried', AppUncategoried);

    // cluster
    this.register('cluster', Cluster);
    this.register('clusterDetail', ClusterDetail);

    // runtime
    this.register('runtime', Runtime);
    this.register('runtimeCredential', RuntimeCredential);
    this.register('runtimeCluster', RuntimeCluster);

    // fixme: testing env contains runtime logic
    // testing env, authorization
    this.register('testingEnv', TestingEnv);
    this.register('testingEnvCreate', TestingEnvCreate);

    // category
    this.register('category', Category);

    // user, role
    this.register('user', User);
    this.register('role', Role);
    this.register('group', Group);
    this.register('userDetail', UserDetail);

    this.register('sshKey', sshKey);

    // Vendor
    this.register('vendor', Vendor);

    this.register('cloudEnv', CloudEnv);
    this.register('notificationServer', NotificationServer);

    this.register('modal', Modal);
  };
}
