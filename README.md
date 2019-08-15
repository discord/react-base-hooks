# react-base-hooks

This is a collection of basic React hooks that are an extension of the React core library.

#### Installation

```
npm install react-base-hooks
```

## useLazyValue

`useLazyValue` calls the provided factory on mount and returns this value for the duration of the component's lifecycle. See React docs on [creating expensive objects lazily](https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily).

```js
import {useLazyValue} from 'react-base-hooks';
function MyComponent() {
  const animatedValue = useLazyValue(() => new Animated.Value());
  ...
}
```

Another common use case is creating a debounced handler.

```js
function MyComponent() {
  const onScroll = useLazyValue(() => {
    return debounce(() => console.log('debounced scroll'), 1000);
  });
  ...
}
```

#### Comparison to useMemo

You cannot rely on `useMemo` as [a semantic guarantee](https://reactjs.org/docs/hooks-reference.html#usememo). React may throw away the cached value and recall your factory even if deps did not change.

#### Comparison to useState

You can get the same result using `useState(factory)[0]`, but it's a little more expensive supporting unused update functionality.

#### Comparison to useRef
You can implement this yourself as described in React doc's [how to create expensive objects lazily](https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily). However, `useLazyValue` is likely more convenient and hides the `ref.current` implementation detail.

## useForceUpdate

Provides the same functionality as `forceUpdate` in React class components. Useful when your component relies on data outside React's purview (external data or refs).

```js
import {useForceUpdate} from 'react-base-hooks';
function MyComponent() {
  const forceUpdate = useForceUpdate();
  useEffect(() => DataStore.subscribe(() => forceUpdate()), []);
  return <div>{DataStore.data}</div>;
}
```

## useStableMemo

Just like `useMemo` but is guaranteed to return the same value if provided deps don't change.

```js
import {useStableMemo} from 'react-base-hooks';
function MyComponent({input}) {
  const instance = useStableMemo(() => createInstance(input), [input]);
  ...
}
```
