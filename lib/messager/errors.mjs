/**
 * Messager errors
 *
 * @author: Bernhard Lukassen
 */

import { EError}    from "/evolux.supervise";

export const ErrNotAuthenticated            = ()            => new EError(`Not authenticated`,                  "MSGR:00001");
export const ErrChatExists                  = ()            => new EError(`Chat exists`,                        "MSGR:00002");
export const ErrChatExistsNot               = ()            => new EError(`Chat doesn't exist`,                 "MSGR:00003");

