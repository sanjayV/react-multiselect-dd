import React from "react";
import Home from "./Home";
import renderer from "react-test-renderer";

it("Show Welcome Home title", () => {
  const tree = renderer.create(<Home />);
  expect(tree).toMatchSnapshot();
});
