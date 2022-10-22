import ITag from './ITag';
import TaggedNode from "./TaggedNode";
import constants from "../constants";


type TagParser = { new(dom: Node, options?: Record<string, unknown>): any; };

/**
 * AbstractTag
 */
abstract class AbstractTag implements ITag {
    // Assigned at runtime in TagParser.ts to resolve a circular dependency
    // src/parts/TagParser.ts -> src/tags/tagMap.ts -> src/tags/EachTag.ts -> src/parts/TagParser.ts
    public static TagParser: TagParser;

    public readonly nodes: Map<string, TaggedNode> = new Map();
    protected _done = false;

    public readonly children: Array<AbstractTag> = [];
    public readonly parent: Array<AbstractTag>;

    /**
     * constructor
     * @param node
     * @param parent
     * @protected
     */
    protected constructor(node: TaggedNode, parent: Array<AbstractTag>) {
        this.addNode(node);
        this.parent = parent;
    }

    /**
     * addNode
     * @param taggedNode
     */
    addNode(taggedNode: TaggedNode) {
        // TODO Also check that node.statement is part of Tag.statements
        this.nodes.set(taggedNode.statement || constants.empty /* ExpressionTag.statement */, taggedNode);
    }

    /**
     * render
     * @param data
     */
    abstract render(data: Record<string, unknown>): Promise<void>

    /**
     * done
     */
    get done(): boolean {
        return this._done;
    }
}

/**
 * Default export
 */
export default AbstractTag;