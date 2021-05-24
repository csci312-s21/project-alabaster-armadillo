/*
Tests to see if all three features of a post is displayed.
*/ 
import { render } from "@testing-library/react";
import Post from "./Post";


const sample = {
  firstName: "Yaqi",
  lastName: "Huang",
  post: "Mark your calendars for Mischords May 20!",
  postTime: "59",
  postLikes: "",
  postReports: "",
  image: "image"
};


describe("Post tests", () => {

  let samplePost;

  beforeEach(() => {
    samplePost = {... sample}
  });

  test("user name is displayed", () => {
    const { getByText } = render(<Post user={samplePost} />);
    expect(getByText("Yaqi Huang")).toBeInTheDocument();
    expect(getByText("Yaqi Huang")).toBeVisible();
  });


  test("content is displayed", () => {
    const { getByText } = render(<Post user={samplePost} />);
    expect(getByText(samplePost.post)).toBeInTheDocument();
    expect(getByText(samplePost.post)).toBeVisible();
  });




});