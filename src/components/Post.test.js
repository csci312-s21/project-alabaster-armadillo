/*
Tests to see if all three features of a post is displayed.
*/ 
import { render } from "@testing-library/react";
import Post from "./Post";

describe("Post tests", () => {
  let post;

  beforeEach(() => {
    post = {
      user: "Name of sample user",
      contents: "Body of the sample post",
      timestamp: new Date("2020-06-10T14:54:40Z").toLocaleString(),
      tags: [{value:"ross", name:"Ross"},{value:"atwater", name:"Atwater"}]
    };
  });

  test("user name is displayed", () => {
    const { getByText } = render(<Post post={post} />);
    expect(getByText(post.user)).toBeInTheDocument();
    expect(getByText(post.user)).toBeVisible();
  });


  test("content is displayed", () => {
    const { getByText } = render(<Post post={post} />);
    expect(getByText(post.contents)).toBeInTheDocument();
    expect(getByText(post.contents)).toBeVisible();
  });

  test("timestamp is displayed", () => {
    const { getByText } = render(<Post post={post} />);
    const expectedDate = new Date(post.timestamp).toLocaleString();
    expect(getByText(expectedDate)).toBeInTheDocument();
    expect(getByText(expectedDate)).toBeVisible();
  });

});