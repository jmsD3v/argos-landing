export const prerender = false;

import { formEndpoint } from '../../lib/apiHandler';
import { insertVolunteerApplication } from '../../lib/submit';

export const POST = formEndpoint(insertVolunteerApplication);
