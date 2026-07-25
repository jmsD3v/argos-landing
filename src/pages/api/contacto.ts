export const prerender = false;

import { formEndpoint } from '../../lib/apiHandler';
import { insertContactMessage } from '../../lib/submit';

export const POST = formEndpoint(insertContactMessage);
