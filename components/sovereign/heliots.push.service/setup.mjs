/**
 * do the basic setup of channel in thoregon
 *
 * @author: Bernhard Lukassen
 */

import BoundedContextBuilder        from '/thoregon.tru4D';
import SchemaBuilder, { ID, CHILD, REL, INT, REAL, BOOL, STRING, DATE, DATETIME, DURATION, IMAGE, LIST, MAP, SET } from '/evolux.schema';

import PushMessageAction            from "./lib/actions/pushmessageaction.mjs";

const bg                = ref => `thoregon.heliots.${ref}`;    // shortcut and DRY

const ctx               = 'heliots.service';
const heliotsservice    = 'heliots.service';

(async () => {

    const ctxbuilder = new BoundedContextBuilder();

    let pushaction = new PushMessageAction();
    pushaction.commandid = 'AddChannelMessageCommand'

    ctxbuilder.use(ctx)
        .withAction('PushMessageAction', pushaction)
        .release('2020-05-01.1');

    await ctxbuilder.build();

    universe.logger.info(`Bounded Context: ${ctx} -> push action`);
})();

export default { ctx };
