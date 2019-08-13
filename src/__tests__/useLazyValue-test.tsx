import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import useLazyValue from "../useLazyValue";

describe("useLazyValue", () => {
  afterEach(cleanup);

  it("persists the value", () => {
    const mockValue = 17;
    const factory = jest.fn(() => mockValue);
    const renderMock = jest.fn();

    const MyComponent = () => {
      const value = useLazyValue(factory);
      renderMock(value);
      return <div />;
    };

    const { rerender } = render(<MyComponent />);
    expect(factory).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenLastCalledWith(mockValue);

    rerender(<MyComponent />);
    expect(factory).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledTimes(2);
    expect(renderMock).toHaveBeenLastCalledWith(mockValue);
  });
});
