import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import useForceUpdate from "../useForceUpdate";

describe("useForceUpdate", () => {
  afterEach(cleanup);

  it("updates the component", () => {
    const renderMock = jest.fn();

    const MyComponent = () => {
      const forceUpdate = useForceUpdate();
      renderMock(forceUpdate);
      return (
        <button data-testid="button" onClick={forceUpdate}>
          Update
        </button>
      );
    };

    const { getByTestId } = render(<MyComponent />);
    expect(renderMock).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTestId("button"));
    expect(renderMock).toHaveBeenCalledTimes(2);

    expect(renderMock.mock.calls[1][0]).toBe(renderMock.mock.calls[0][0]);
  });
});
