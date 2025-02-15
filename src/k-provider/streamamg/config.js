//@flow
import {clone} from '../../util/clone';

const defaultConfig: Object = {
  serviceUrl: 'https://cdnapisec.kaltura.com/api_v3',
  cdnUrl: 'https://cdnapisec.kaltura.com',
  serviceParams: {
    apiVersion: '3.3.0',
    format: 1
  },
  useApiCaptions: true
};

export default class StreamAMGConfiguration {
  static set(clientConfig?: ProviderEnvConfigObject) {
    if (clientConfig) {
      Object.assign(defaultConfig, clientConfig);
    }
  }

  static get(): Object {
    return clone(defaultConfig);
  }
}

export {StreamAMGConfiguration};
