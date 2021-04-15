//@flow
import MultiRequestBuilder from './multi-request-builder';
import StreamAMGConfiguration from '../config';

const SERVICE_NAME: string = 'multirequest';

export default class OVPService {
  /**
   * Gets a new instance of MultiRequestBuilder with ovp params
   * @function getMultiRequest
   * @param {string} playerVersion The player version
   * @param {string} ks The ks
   * @param {string} partnerId The partner ID
   * @returns {MultiRequestBuilder} The multi request builder
   * @static
   */
  static getMultiRequest(playerVersion: string, ks: string, partnerId?: number): MultiRequestBuilder {
    const config = StreamAMGConfiguration.get();
    const ovpParams = config.serviceParams;
    Object.assign(ovpParams, {ks: ks, clientTag: 'html5:v' + playerVersion});
    if (partnerId) {
      Object.assign(ovpParams, {partnerId: partnerId});
    }
    const headers: Map<string, string> = new Map();
    // OM START: Remove content type - we're gonna be GET reqest and receiving XML
    //headers.set('Content-Type', 'application/json');
    // OM END
    const multiReq = new MultiRequestBuilder(headers);
    multiReq.method = 'GET';
    multiReq.service = SERVICE_NAME;
    // OM START: Patch in index.php automatically, otherwise we get redirects and fail
    multiReq.url = multiReq.getUrl(config.serviceUrl.match('/index.php$') ? config.serviceUrl : config.serviceUrl + '/index.php');
    // OM END
    multiReq.params = ovpParams;
    return multiReq;
  }
}
