/**
 * do the basic setup of channel in thoregon
 *
 * @author: Bernhard Lukassen
 */

import BoundedContextBuilder from '/thoregon.tru4D';
import SchemaBuilder, { ID, CHILD, REL, INT, REAL, BOOL, STRING, DATE, DATETIME, DURATION, IMAGE, LIST, MAP, SET } from '/evolux.schema';

const bg                = ref => `thoregon.heliots.${ref}`;    // shortcut and DRY

const ctx               = 'heliots.service';
const entityName        = 'Channel';
const entity            = bg(entityName);
const heliotsservice    = 'heliots.service';

(async () => {
    let sbuilder = new SchemaBuilder();

    sbuilder.name('Message')
        .ref(bg('Message'))
        .addAttribute({ name: 'alias',          type: STRING, index: true })
        .addAttribute({ name: 'thumbnail',      type: IMAGE })
        .addAttribute({ name: 'content',        type: STRING })
    ;

    const msgentity = await sbuilder.build();

    // todo: Member Schema? -> defined by observers like heliots? -> Events!

    sbuilder = new SchemaBuilder();
    sbuilder.name(entityName)
        .ref(bg(entityName))
        .addAttribute({ name: 'name',           type: STRING, index: true })
        .addAttribute({ name: 'description',    type: STRING })
        .addAttribute({ name: 'thumbnail',      type: IMAGE })
        .addAttribute({ name: 'messages',       type: LIST(REL(bg('Message'))) })
    ;

    const entity = await sbuilder.build();

    const ctxbuilder = new BoundedContextBuilder();

    ctxbuilder.use(ctx)
        .addSchema(entity)
        .addDefaults(heliotsservice)
        .collection('channels', 'shared')
        .release('2020-05-01.1')
    ;

    const boundctx = await ctxbuilder.build();

    universe.logger.info(`Bounded Context: ${ctx} -> ${entityName}`);
})();

export default { ctx, entity };
