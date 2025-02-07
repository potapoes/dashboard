import { action, computed } from 'mobx';
import _ from 'lodash';

import { providers, providerMap } from 'config/runtimes';

import Store from '../Store';

export default class CloudEnvironmentStore extends Store {
  constructor(...args) {
    super(...args);

    this.defineObservables(function () {
      this.environment = [];

      this.config_set = [];

      this.versionType = '';

      this.handleType = '';

      this.cloudInfo = {};
    });
  }

  @computed
  get activeEnv() {
    if (!this.versionType) {
      return this.environment.filter(item => item.enable);
    }
    const arr = providerMap[this.versionType];
    if (!_.isArray(arr)) {
      return [];
    }
    return this.environment.filter(
      item => item.enable && arr.includes(item.key)
    );
  }

  @action
  fetchAll = async () => {
    const result = await this.request.post('service_configs/get', {
      service_type: ['runtime']
    });
    this.config_set = _.get(result, 'runtime_config.config_set', []);

    this.environment = this.intersection(providers, this.config_set);
  };

  intersection = (arr1, arr2) => {
    _.forEach(arr1, item => {
      _.forEach(arr2, runtime => {
        if (item.key === runtime.name) {
          item.enable = runtime.enable;
        }
      });
    });

    return arr1;
  };

  @action
  fetchCloudInfo = async () => {
    const result = await this.request.post('service_configs/get', {
      service_type: ['basic_config']
    });
    this.cloudInfo = _.get(result, 'basic_config', {});
  };

  @action
  saveCloudInfo = async data => {
    await this.request.post('service_configs/set', {
      basic_config: data
    });
    this.handleType = '';
    await this.fetchCloudInfo();
  };

  @action
  changeEnv = async (checked, item) => {
    const set = _.find(this.config_set, { name: item });
    set.enable = checked;
    const result = await this.update();
    if (result.is_succ) {
      const env = _.find(this.environment, { key: item });
      if (item) {
        env.enable = checked;
      }
    }
  };

  update = () => this.request.post('service_configs/set', {
    runtime_config: {
      config_set: this.config_set
    }
  });

  @action
  getActiveEnv = versionType => {
    this.versionType = versionType;
    return this.activeEnv;
  };

  @action
  getActiveKey = versionType => this.getActiveEnv(versionType).map(item => item.key);

  @action
  changeHandleType = async type => {
    this.handleType = type;
  };
}
