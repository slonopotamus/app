import {Switch} from "web-vcore/nm/react-vcomponents.js";
import {BaseComponentPlus} from "web-vcore/nm/react-vextensions.js";
import {store} from "Store";
import {Observer} from "web-vcore";
import React from "react";
import {SubNavBar, SubNavBarButton} from "./@Shared/SubNavBar.js";
import {MediasUI} from "./Database/MediasUI.js";
import {TermsUI} from "./Database/TermsUI.js";
import {UsersUI} from "./Database/Users.js";
import {PoliciesUI} from "./Database/PoliciesUI.js";

@Observer
export class DatabaseUI extends BaseComponentPlus({} as {}, {}) {
	render() {
		const currentSubpage = store.main.database.subpage;
		const page = "database";
		return (
			<>
				<SubNavBar>
					<SubNavBarButton page={page} subpage="users" text="Users" actionFuncIfAlreadyActive={s=>s.main.database.selectedUserID = null}/>
					<SubNavBarButton page={page} subpage="terms" text="Terms" /* actionIfAlreadyActive={() => new ACTTermSelect({ id: null })} *//>
					<SubNavBarButton page={page} subpage="media" text="Media" /* actionIfAlreadyActive={() => new ACTImageSelect({ id: null })} *//>
					<SubNavBarButton page={page} subpage="policies" text="Policies" /* actionIfAlreadyActive={() => new ACTTermSelect({ id: null })} *//>
				</SubNavBar>
				<Switch>
					<UsersUI/>
					{currentSubpage == "terms" && <TermsUI/>}
					{currentSubpage == "media" && <MediasUI/>}
					{currentSubpage == "policies" && <PoliciesUI/>}
				</Switch>
			</>
		);
	}
}