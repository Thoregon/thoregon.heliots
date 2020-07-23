/**
 *
 *
 * @author: Bernhard Lukassen
 */

const T = 't͛';

export default class Store {

    /**
     * define the location in matter
     * @param node - matter node where the chat is located
     * @return {Store}
     */
    static at(nodelocation) {
        this.node = universe.matter.path(nodelocation);
        return this;
    }

}
