import React from "react";
import CommentBox from "components/CommentBox";
import { mount, unmount } from "enzyme";

let wrapped;

beforeEach(() => {
	wrapped = mount(<CommentBox />);
});

afterEach(() => {
	wrapped.unmount();
});

it("has a text area and a button", () => {
	expect(wrapped.find("textarea").length).toEqual(1);
	expect(wrapped.find("button").length).toEqual(1);
});

describe("the text area", () => {
	beforeEach(() => {
		wrapped.find("textarea").simulate("change", {
			target: {
				value: "new comment",
			},
		});
		wrapped.update();
	});

	it("has a text area that users can type in", () => {
		expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
	});

	it("has a form that clears the text area when submitted", () => {
		wrapped.find("form").simulate("submit", {
			preventDefault: () => {},
		});
		wrapped.update();

		expect(wrapped.find("textarea").prop("value")).toEqual("");
	});
});
