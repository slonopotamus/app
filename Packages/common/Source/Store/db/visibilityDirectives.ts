import {IsNaN} from "web-vcore/nm/js-vextensions.js";
import {StoreAccessor, GetDoc} from "web-vcore/node_modules/mobx-graphlink";
import {AccessPolicy} from "./accessPolicies/@AccessPolicy.js";
import {NodeChildLink} from "./nodeChildLinks/@NodeChildLink.js";
import {VisibilityDirective} from "./visibilityDirectives/@VisibilityDirective.js";

export const GetVisibilityDirective = StoreAccessor(s=>(id: string): VisibilityDirective=>{
	if (id == null || IsNaN(id)) return null;
	return GetDoc({}, a=>a.visibilityDirectives.get(id));
});