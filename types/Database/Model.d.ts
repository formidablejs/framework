import { ModelBase } from "bookshelf";

declare let Model: ModelBase<any>;

interface Model {
    /**
     * The table associated with the model.
     */
    get tableName() : String;

    /**
     * Get the route key for the model.
     */
    get routeKeyName() : String;

    /**
     * Retrieve a model by its primary key
     */
    find(primaryKey: Number) : Promise<any>
}

export default Model;
