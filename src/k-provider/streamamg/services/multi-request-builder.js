//@flow
import RequestBuilder from '../../../util/request-builder';
import Error from '../../../util/error/error';
import MultiRequestBuilder, {MultiRequestResult} from '../../common/multi-request-builder';

export default class LegacyMultiRequestBuilder extends MultiRequestBuilder {
  /**
   * Adds request to requests array
   * @function add
   * @param {RequestBuilder} request The request
   * @returns {MultiRequestBuilder} The multiRequest
   */
  add(request: RequestBuilder): MultiRequestBuilder {
    this.requests.push(request);

    this.params[this.requests.length + ':service'] = request.service;
    this.params[this.requests.length + ':action'] = request.action;
    this.addParams(this.requests.length + ':', request.params);
    return this;
  }

  addParams(prefix: string, object: Object) {
    for (const key of Object.keys(object)) {
      if (typeof object[key] === 'object') {
        this.addParams(prefix + key + ':', object[key]);
      } else {
        this.params[prefix + key] = object[key];
      }
    }
  }

  /**
   * Executes a multi request
   * @function execute
   * @returns {Promise} The multirequest execution promise
   */
  execute(): Promise<Object> {
    return new Promise((resolve, reject) => {
      // OM START: Removed the stringify of params
      // try {
      //   this.params = JSON.stringify(this.params);
      // } catch (err) {
      //   MultiRequestBuilder._logger.error(`${err.message}`);
      //   reject(
      //     new Error(Error.Severity.CRITICAL, Error.Category.PROVIDER, Error.Code.FAILED_PARSING_REQUEST, {
      //       error: err,
      //       params: this.params
      //     })
      //   );
      // }
      // OM END
      this.doHttpRequest().then(
        data => {
          const multiRequestResult = new MultiRequestResult(data);
          if (multiRequestResult.success) {
            resolve({
              headers: this.responseHeaders,
              response: multiRequestResult
            });
          } else {
            reject(
              new Error(Error.Severity.CRITICAL, Error.Category.NETWORK, Error.Code.MULTIREQUEST_API_ERROR, {
                url: this.url,
                headers: this.responseHeaders,
                results: multiRequestResult.results
              })
            );
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  _createXHR(): void {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          try {
            // TODO: XML
            console.error(request);
            const response = JSON.parse(request.responseText);
            this.responseHeaders = this._getResponseHeaders(request);
            // the promise returns the response for backwards compatibility
            return this._requestPromise.resolve(response);
          } catch (error) {
            this._requestPromise.reject(
              this._createError(request, Error.Code.BAD_SERVER_RESPONSE, {
                text: request.responseText
              })
            );
          }
        }
      }
    };
    // OM START: Params into URL
    const url = this.url.split('?')[0] + createQs(Object.assign({service: this.service, action: this.action ?? ''}, this.params));
    // OM END
    request.open(this.method, url, this.retryConfig.async);
    if (this.retryConfig.async && this.retryConfig.timeout) {
      request.timeout = this.retryConfig.timeout;
    }
    const requestTime = performance.now();
    request.ontimeout = () => {
      this._handleError(request, Error.Code.TIMEOUT, {
        timeout: (performance.now() - requestTime) / 1000,
        statusText: request.statusText
      });
    };
    request.onerror = request.onabort = () => {
      this._handleError(request, Error.Code.HTTP_ERROR, {
        text: request.responseText,
        statusText: request.statusText
      });
    };
    this.headers.forEach((value, key) => {
      request.setRequestHeader(key, value);
    });
    // OM START: No params in body
    request.send(this.params);
    // OM END
  }
}

/**
 * Encode query string
 *
 * @param {Object} params Params
 * @returns {string} Return
 */
function encodeQs(params) {
  let result = [];
  for (let key of Object.keys(params)) {
    if (Array.isArray(params[key])) {
      key += '[]';
      params[key].forEach(eachValue => {
        result.push(encodeURIComponent(key) + '=' + encodeURIComponent(eachValue));
      });
      continue;
    }
    result.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
  }
  return result.join('&');
}

/**
 * Encode query string
 *
 * @param {Object} params Params
 * @returns {string} Return
 */
function createQs(params) {
  if (Object.keys(params).length == 0) {
    return '';
  }

  return '?' + encodeQs(params);
}
