/**
 * do the basic setup of channel in thoregon
 *
 * @author: Bernhard Lukassen
 */

import BoundedContextBuilder from '/evolux.tru4D';
import SchemaBuilder, { ID, CHILD, REL, INT, REAL, BOOL, STRING, DATE, DATETIME, DURATION, IMAGE, LIST, MAP, SET } from '/evolux.schema';

const ns                = ref => `thoregon.heliots.${ref}`;    // shortcut, DRY

const ctx               = 'thoregon.heliots.service';
const entityName        = 'Subscription';
const entity            = ns(entityName);
const responsibility    = 'thoregon.heliots';

(async () => {
    let sbuilder = new SchemaBuilder();
    sbuilder.name('SubscriptionKeys')
        .ref(ns('SubscriptionKeys'))
        .addAttribute({ name: 'p256dh',             type: STRING})
        .addAttribute({ name: 'auth',               type: STRING})
    ;

    const keysentity = await sbuilder.build();

    sbuilder = new SchemaBuilder();
    sbuilder.name(entityName)
        .ref(ns(entityName))
        .addAttribute({ name: 'endpoint',           type: STRING, index: true })
        .addAttribute({ name: 'expirationTime ',    type: DATETIME })
        .addAttribute({ name: 'keys',               type: CHILD(ns('SubscriptionKeys')) })
    ;

    const entity = await sbuilder.build();

    const ctxbuilder = new BoundedContextBuilder();

    ctxbuilder.use(ctx)
        .addSchema(entity)
        .addDefaults()
        .collection(ns('subscriptions'))
        .release('2020-02-24.1')
    ;

    const boundctx = await ctxbuilder.build();
    universe.logger.info(`Bounded Context: ${ctx} -> ${entityName}`);
})();

export default { ctx, entity };
