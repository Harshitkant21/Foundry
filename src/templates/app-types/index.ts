import { AppType } from '../../config/schema.js';
import { apiRules } from './api.js';
import { cliRules } from './cli.js';
import { dataMlRules } from './data-ml.js';
import { fullstackRules } from './fullstack.js';
import { libraryRules } from './library.js';
import { mobileRules } from './mobile.js';
import { otherAppTypeRules } from './other.js';
import { webRules } from './web.js';

export function getAppTypeRules(type: AppType): string {
  switch (type) {
    case 'web':
      return webRules;
    case 'api':
      return apiRules;
    case 'fullstack':
      return fullstackRules;
    case 'cli':
      return cliRules;
    case 'library':
      return libraryRules;
    case 'data-ml':
      return dataMlRules;
    case 'mobile':
      return mobileRules;
    case 'custom':
    default:
      return otherAppTypeRules;
  }
}
