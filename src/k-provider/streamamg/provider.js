//@flow
import getLogger from '../../util/logger';
import StreamAMGMediaEntryLoader from './loaders/media-entry-loader';
import OVPSessionLoader from '../ovp/loaders/session-loader';
import OVPDataLoaderManager from './loaders/data-loader-manager';
import Error from '../../util/error/error';
import OVPProvider from '../ovp/provider';
import StreamAMGConfiguration from './config';

export default class StreamAMGProvider extends OVPProvider {
  /**
   * @constructor
   * @param {ProviderOptionsObject} options - provider options
   * @param {string} playerVersion - player version
   */
  constructor(options: ProviderOptionsObject, playerVersion: string) {
    super(options, playerVersion);
    this._logger = getLogger('StreamAMGProvider');
    StreamAMGConfiguration.set(options.env);
    this._setFilterOptionsConfig(options.filterOptions);
    this._networkRetryConfig = Object.assign(this._networkRetryConfig, options.networkRetryParameters);
  }

  /**
   * Gets the backend media config.
   * @param {OVPProviderMediaInfoObject} mediaInfo - ovp media info
   * @returns {Promise<ProviderMediaConfigObject>} - The provider media config
   */
  getMediaConfig(mediaInfo: OVPProviderMediaInfoObject): Promise<ProviderMediaConfigObject> {
    if (mediaInfo.ks) {
      this.ks = mediaInfo.ks;
      this._isAnonymous = false;
    }
    if (this.widgetId !== this.defaultWidgetId) {
      this._isAnonymous = false;
    }
    this._dataLoader = new OVPDataLoaderManager(this.playerVersion, this.partnerId, this.ks, this._networkRetryConfig);
    return new Promise((resolve, reject) => {
      const entryId = mediaInfo.entryId;
      const referenceId = mediaInfo.referenceId;
      if (entryId || referenceId) {
        let ks: string = this.ks;
        if (!ks) {
          ks = '{1:result:ks}';
          this._dataLoader.add(OVPSessionLoader, {widgetId: this.widgetId});
        }
        const redirectFromEntryId = this._getEntryRedirectFilter(mediaInfo);
        // OM START: Remove the playbackContext that is not supported and add our customised loader
        this._dataLoader.add(StreamAMGMediaEntryLoader, {entryId, ks, redirectFromEntryId, referenceId});
        // OM END
        return this._dataLoader.fetchData().then(
          response => {
            try {
              resolve(this._parseDataFromResponse(response));
            } catch (err) {
              reject(err);
            }
          },
          err => {
            reject(err);
          }
        );
      } else {
        reject(new Error(Error.Severity.CRITICAL, Error.Category.PROVIDER, Error.Code.MISSING_MANDATORY_PARAMS, {message: 'missing entry id'}));
      }
    });
  }
}
