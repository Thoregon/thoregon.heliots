/**
 *
 *
 * @author: Bernhard Lukassen
 */

import HeliotsTerminal              from "./lib/heliots.mjs";
import components                   from './@components';

export *                            from './lib/consumer/subscriptionmain.mjs';
// export { default as Heliots }       from './lib/heliots.mjs';

universe.addComponents(components);

export const Heliots = HeliotsTerminal;
export default {}
