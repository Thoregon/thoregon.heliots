/**
 *
 *
 * @author: Bernhard Lukassen
 */

const T = universe.T;

export default class Store {

    /**
     * define the location in matter
     * @param node - matter node where the chat is located
     * @return {Store}
     */
    static at(nodelocation) {
        this.location = nodelocation;
        this.node = universe.matter.path(nodelocation);
        return this;
    }

}
