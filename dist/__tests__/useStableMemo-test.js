import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import useStableMemo from "../useStableMemo";
describe("useStableMemo", () => {
    afterEach(cleanup);
    it("works like memo", () => {
        const factory = jest.fn(deps => deps);
        const renderMock = jest.fn();
        const MyComponent = ({ deps }) => {
            const value = useStableMemo(() => factory(deps), deps);
            renderMock(value);
            return React.createElement("div", null);
        };
        const deps = [1, 2];
        const { rerender } = render(React.createElement(MyComponent, { deps: deps }));
        expect(factory).toHaveBeenCalledTimes(1);
        expect(renderMock).toHaveBeenCalledTimes(1);
        expect(renderMock.mock.calls[renderMock.mock.calls.length - 1][0]).toBe(deps);
        rerender(React.createElement(MyComponent, { deps: [1, 2] }));
        expect(factory).toHaveBeenCalledTimes(1);
        expect(renderMock).toHaveBeenCalledTimes(2);
        expect(renderMock.mock.calls[renderMock.mock.calls.length - 1][0]).toBe(deps);
        const newDeps = [2, 3];
        rerender(React.createElement(MyComponent, { deps: newDeps }));
        expect(factory).toHaveBeenCalledTimes(2);
        expect(renderMock).toHaveBeenCalledTimes(3);
        expect(renderMock.mock.calls[renderMock.mock.calls.length - 1][0]).toBe(newDeps);
    });
});
