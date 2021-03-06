/*
Test to see if cancel button changes interface back to the StatusBoard

Test to see if post button switches interface back to StatusBoard and adds the post to the board.
*/
import { render, screen, fireEvent } from "@testing-library/react";
import EnterStatus from "./EnterStatus";


describe("EnterStatus tests", () => {
  let post;
  const handler = jest.fn();

  beforeEach(() => {
    post = {
      title: "Title of sample article",
      contents: "Contents of the sample article",
      edited: new Date("2020-06-10T14:54:40Z").toLocaleString()
    };

    handler.mockReset();
  });

  test("Post button is disabled without contents", () => {
    const { container } = render(<EnterStatus complete={handler} />);

    const contentsInput = container.querySelector("textarea");
    expect(contentsInput).toHaveValue("");

    const postButton = screen.getByRole("button", { name: "Post" });
    expect(postButton).toBeDisabled();

    fireEvent.change(contentsInput, { target: { value: post.title } });

    expect(contentsInput).toHaveValue(post.text);
    expect(postButton).toBeEnabled();
  });


  test("Cancel button calls complete function with no arguments", () => {
    render(<EnterStatus complete={handler} />);
    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    fireEvent.click(cancelButton);

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith();
  });

});