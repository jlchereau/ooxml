import AbstractToken from "./AbstractToken";
import TokenizedNode from "./TokenizedNode";

class IfToken extends AbstractToken {
    static readonly tag = '#if';
    static readonly statements: Array<string> = ['#if', '#else', '#endif'];

    /**
     * constructor
     * @param node
     */
    constructor(node: TokenizedNode) {
        super(node);
    }

    /**
     * Render
     * @param data
     */
    render(data: Record<string, unknown> = {}) {
        this._done = true;
    }
}

/**
 * Default export
 */
export default IfToken;