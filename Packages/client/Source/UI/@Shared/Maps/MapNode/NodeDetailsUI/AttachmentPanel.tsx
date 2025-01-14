import {A, GetEntries, NN} from "web-vcore/nm/js-vextensions.js";
import {Row, Select, Text} from "web-vcore/nm/react-vcomponents.js";
import {BaseComponent} from "web-vcore/nm/react-vextensions.js";
import {GetAttachmentType, AttachmentType, ResetNodeRevisionAttachment, MapNodeType} from "dm_common";
import {EquationEditorUI} from "./AttachmentPanel/EquationEditorUI.js";
import {MediaAttachmentEditorUI} from "./AttachmentPanel/MediaAttachmentEditorUI.js";
import {QuoteInfoEditorUI} from "./AttachmentPanel/QuoteInfoEditorUI.js";
import {NodeDetailsUI_SharedProps} from "../NodeDetailsUI.js";
import {ReferencesAttachmentEditorUI} from "./AttachmentPanel/ReferencesAttachmentEditorUI.js";

export class AttachmentPanel extends BaseComponent<NodeDetailsUI_SharedProps & {}, {}> {
	render() {
		const {newData, newDataAsL2, newRevisionData, forNew, enabled, Change} = this.props;
		const attachmentType = GetAttachmentType(newDataAsL2);

		return (
			<>
				{newData.type != MapNodeType.claim &&
					<Text>Only claim nodes can have attachments.</Text>}
				{newData.type == MapNodeType.claim &&
				<>
					<Row mb={attachmentType == AttachmentType.none ? 0 : 5}>
						<Text>Type:</Text>
						<Select ml={5} options={GetEntries(AttachmentType, "ui")} enabled={enabled} value={attachmentType} onChange={val=>{
							ResetNodeRevisionAttachment(newRevisionData, val);
							Change();
						}}/>
					</Row>
					{attachmentType == AttachmentType.equation &&
						<EquationEditorUI creating={forNew} editing={enabled}
							baseData={NN(newRevisionData.equation)} onChange={val=>Change(newRevisionData.equation = val)}/>}
					{attachmentType == AttachmentType.quote &&
						<QuoteInfoEditorUI /*ref={c=>this.quoteEditor = c}*/ creating={forNew} editing={enabled}
							baseData={NN(newRevisionData.quote)} onChange={val=>Change(newRevisionData.quote = val)}
							showPreview={false} justShowed={false}/>}
					{attachmentType == AttachmentType.references &&
						<ReferencesAttachmentEditorUI creating={forNew} editing={enabled}
							baseData={NN(newRevisionData.references)} onChange={val=>Change(newRevisionData.references = val)}
							showPreview={false} justShowed={false}/>}
					{attachmentType == AttachmentType.media &&
						<MediaAttachmentEditorUI creating={forNew} editing={enabled}
							baseData={NN(newRevisionData.media)} onChange={val=>Change(newRevisionData.media = val)}/>}
				</>}
			</>
		);
	}
}