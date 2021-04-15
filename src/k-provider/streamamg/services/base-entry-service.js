//@flow
import OVPBaseEntryService from '../../ovp/services/base-entry-service';
import RequestBuilder from '../../../util/request-builder';

const SERVICE_NAME: string = 'baseEntry';

export default class StreamAMGBaseEntryService extends OVPBaseEntryService {
  /**
   * Creates an instance of RequestBuilder for baseentry.getContextData
   * @function getContextData
   * @param {string} serviceUrl The service base URL
   * @param {string} ks The ks
   * @param {serviceEntryId} serviceEntryId The entry id from the request result (to support loading by referenceId)
   * @returns {RequestBuilder} The request builder
   * @static
   */
  static getContextData(serviceUrl: string, ks: string, serviceEntryId: string): RequestBuilder {
    const headers: Map<string, string> = new Map();
    headers.set('Content-Type', 'application/json');
    const request = new RequestBuilder(headers);
    request.service = SERVICE_NAME;
    request.action = 'getContextData';
    request.method = 'POST';
    request.url = request.getUrl(serviceUrl);
    request.tag = 'baseEntry-getContextData';
    const contextDataParams = {objectType: 'KalturaEntryContextDataParams', flavorTags: 'all'};
    request.params = {entryId: serviceEntryId, ks: ks, contextDataParams: contextDataParams};
    return request;
  }
}
