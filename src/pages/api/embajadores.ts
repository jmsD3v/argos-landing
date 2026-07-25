export const prerender = false;

import { formEndpoint } from '../../lib/apiHandler';
import { insertAmbassadorApplication } from '../../lib/submit';

export const POST = formEndpoint(insertAmbassadorApplication);
