export const prerender = false;

import { formEndpoint } from '../../lib/apiHandler';
import { insertBetaSignup } from '../../lib/submit';

export const POST = formEndpoint(insertBetaSignup);
