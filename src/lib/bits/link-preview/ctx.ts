import { createBitAttrs, getOptionUpdater, removeUndefined } from "$lib/internal/index.js";
import {
	createLinkPreview,
	type CreateLinkPreviewProps,
	type LinkPreview as LinkPreviewReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { getPositioningUpdater, type PositioningProps } from "../floating/helpers.js";
import type { Writable } from "svelte/store";
import type { FloatingConfig } from "../floating/floating-config.js";

const NAME = "link-preview";
const PARTS = ["arrow", "content", "trigger"];

export const getAttrs = createBitAttrs(NAME, PARTS);

type GetReturn = LinkPreviewReturn;

export function getCtx() {
	return getContext<GetReturn>(NAME);
}

export function setCtx(props: CreateLinkPreviewProps) {
	const linkPreview = createLinkPreview({
		...removeUndefined(props),
		forceVisible: true
	});
	setContext(NAME, linkPreview);
	return {
		...linkPreview,
		updateOption: getOptionUpdater(linkPreview.options)
	};
}

export function setArrow(size = 8) {
	const linkPreview = getCtx();
	linkPreview.options.arrowSize.set(size);
	return linkPreview;
}

const defaultPlacement = {
	side: "bottom",
	align: "center"
} satisfies PositioningProps;

export function updatePositioning(props: PositioningProps) {
	const withDefaults = { ...defaultPlacement, ...props } satisfies PositioningProps;
	const {
		options: { positioning }
	} = getCtx();

	const updater = getPositioningUpdater(positioning as Writable<FloatingConfig>);
	updater(withDefaults);
}
