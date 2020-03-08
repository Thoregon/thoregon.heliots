/**
 *
 *
 * @author: Bernhard Lukassen
 */

import Heliot           from "./lib/heliot.mjs";
import components       from './@components';

universe.addComponents(components);

export const service = new Heliot();
export default {}
