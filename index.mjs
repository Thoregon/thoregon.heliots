/**
 *
 *
 * @author: Bernhard Lukassen
 */

import HeliotsTerminal              from "./lib/heliots.mjs";
import components                   from './@components';

// import heliots                      from "./lib/messager/setup.mjs";

export *                            from './lib/consumer/subscriptionmain.mjs';

universe.addComponents(components);

export const Heliots = HeliotsTerminal;
export default {}
