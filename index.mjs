/**
 *
 *
 * @author: Bernhard Lukassen
 */

import Heliot                       from "./lib/heliot.mjs";
import components                   from './@components';

export *                            from './lib/consumer/subscriptionmain.mjs';

universe.addComponents(components);

export const service = new Heliot();
export default {}
