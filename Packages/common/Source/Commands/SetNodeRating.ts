import {AddSchema, AssertValidate, BU, Command, CommandMeta, DBHelper, dbp, GenerateUUID, SimpleSchema} from "web-vcore/nm/mobx-graphlink.js";
import {Assert, emptyArray_forLoading} from "web-vcore/nm/js-vextensions.js";
import {NodeRatingType} from "../DB/nodeRatings/@NodeRatingType.js";
import {NodeRating} from "../DB/nodeRatings/@NodeRating.js";
import {GetRatings} from "../DB/nodeRatings.js";
import {AssertUserCanModify} from "./Helpers/SharedAsserts.js";
import {DeleteNodeRating} from "./DeleteNodeRating.js";

@CommandMeta({
	payloadSchema: ()=>SimpleSchema({
		$rating: {$ref: NodeRating.name},
	}),
})
export class SetNodeRating extends Command<{rating: NodeRating}, {}> {
	sub_deleteOldRating: DeleteNodeRating;
	Validate() {
		const {rating} = this.payload;

		Assert(rating.type != "impact", "Cannot set impact rating directly.");
		const oldRatings = GetRatings(rating.node, rating.type, this.userInfo.id);
		Assert(oldRatings.length <= 1, `There should not be more than one rating for this given "slot"!`);
		if (oldRatings.length) {
			this.sub_deleteOldRating = new DeleteNodeRating({id: oldRatings[0].id}).MarkAsSubcommand(this);
		}

		rating.id = this.GenerateUUID_Once("rating.id");
		rating.creator = this.userInfo.id;
		rating.createdAt = Date.now();
	}

	DeclareDBUpdates(db: DBHelper) {
		const {rating} = this.payload;
		if (this.sub_deleteOldRating) {
			db.add(this.sub_deleteOldRating.GetDBUpdates(db));
		}
		db.set(dbp`nodeRatings/${rating.id}`, rating);
	}
}