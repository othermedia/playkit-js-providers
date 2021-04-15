// @flow
import StreamAMGProvider from './provider';

declare var __VERSION__: string;
declare var __NAME__: string;

const NAME = __NAME__ + '-streamamg';
const VERSION = __VERSION__;

export {StreamAMGProvider as Provider, NAME, VERSION};
