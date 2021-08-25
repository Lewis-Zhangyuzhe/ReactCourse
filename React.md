# React

1. Index.js is the first file to be executed

2. Fragment

   * It is just a wrapper, which let you group a list of children without adding extra nodes to the DOM(like no more nested div pairs)
   * import React from 'react' => use <React.Fragment></React.Fragment> to wrap
   * import {Fragment} from 'react' => use <Fragment></Fragment> to wrap
   * 简写<></>
   * key is the only attribute that can be passed to Fragment

3. Portals

   * Portals provide a first-way to render children into a DOM node that exists outside the DOM hierarchy of the parent component

   * 用法Usage: 

     decide where to add the portal => exp. index.html 

     ```react
     <div id="overlays"></div>
     <div id="root"></div>
     ```

     in the child component

     ```react
     import ReactDOM from "react-dom";
     ```

     Use following to create a portal;  child=> child component; container=> the desired DOM element, use getElementById to spot

     ```react
     ReactDOM.createPortal(child, container)
     ```

     Exp: (create a portal to render Backop component to a new DOM node rather than the default root one)

     ```react
     ReactDOM.createPortal(
             <Backdrop onClose={props.onClose} />,
             portalElement
           )
     ```

4. Context

   * Context provides a way to pass data through the component tree without having to pass props down manually at every level

   * using props may encounter a long props chain, which is cumbersome

   * ```react
     React.createContext()  
     ```

     context can be anything, like object or string

   * ```react
     /*
     Create a context
     **/
     const themes = {
       light: {
         foreground: "#000000",
         background: "#eeeeee"
       },
       dark: {
         foreground: "#ffffff",
         background: "#222222"
       }
     };
     
     const ThemeContext = React.createContext(themes.light);
     --------------------------------------------------------------------------------------------------------
     
     /*
     Context.Provider to wrap the desired components
     **/
     function App() {
       return (
         <ThemeContext.Provider value={themes.dark}>
           <Toolbar />
         </ThemeContext.Provider>
       );
     }
     
     function Toolbar(props) {
       return (
         <div>
           <ThemedButton />
         </div>
       );
     }
     --------------------------------------------------------------------------------------------------------
     
     /*
     While needed, use useContext() to introduce the wanted context
     **/
     
     function ThemedButton() {
       const theme = useContext(ThemeContext);
       return (
         <button style={{ background: theme.background, color: theme.foreground }}>
           I am styled by theme context!
         </button>
       );
     }
     
     ```

   * A component calling useContext will re-render when the context value changes

   * the current context value is determined by the value props of the nearest <Context.Provider>

5. usestate

   * It will not be re-initialized for component re-evaluation
   * State-change function may not immediately change the state instead of a postpose as it just schedule a state change. So relying on the prevState is so crutial.
   * For the upper issue, useEffect() is a safe way to ensure getting the lastest state after the component function is re-evaluated

6. useReducer

   * it is a alternative to useState, which can manage more complex state logic

   * ```react
     const [state, dispatch] = useReducer(reducer, initialArg, init);
     ```

   * ```react
     const initialState = {count: 0};
     
     function reducer(state, action) {
       switch (action.type) {
         case 'increment':
           return {count: state.count + 1};
         case 'decrement':
           return {count: state.count - 1};
         default:
           throw new Error();
       }
     }
     
     function Counter() {
       const [state, dispatch] = useReducer(reducer, initialState);
       return (
         <>
           Count: {state.count}
           <button onClick={() => dispatch({type: 'decrement'})}>-</button>
           <button onClick={() => dispatch({type: 'increment'})}>+</button>
         </>
       );
     }
     ```

     1. set the initial state at the second argument
     2. use dispatch function to assign certain type and others to some event, then the reducer may know how to reduce based on the action.type
     3. Reducer of type `(state, action) => newState`

7. useRef

   * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

   * A common use case is to access a child imperatively:

     ```react
     function TextInputWithFocusButton() {
       const inputEl = useRef(null);
       const onButtonClick = () => {
         // `current` points to the mounted text input element
         inputEl.current.focus();
       };
       return (
         <>
           <input ref={inputEl} type="text" />
           <button onClick={onButtonClick}>Focus the input</button>
         </>
       );
     }
     ```

   * `useRef` is like a “box” that can hold a mutable value in its `.current` property.

8. useEffect

   * `useEffect` lets us express different kinds of side effects after a component renders

   * Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects

   * Some effects need to be cleaned up, so return a function in it to clean up the effects(The return can be omitted if cleanup is not needed)

   * ``````react
     useEffect(()=>{},[dependency])
     ``````

     * only when the dependency change,  the arrow function would be executed

9. Virtual DOM diff

   * the difference between the virtual snapshots will be passed to the ReactDOM, then render the real DOM 
   * Props, state, context change will trigger the comparison

10. useMemo(store data, less use)

    * return a memoized value

    * ```
      const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
      ```

    * ```
      const memoizedValue = useMemo(() => [1,2,3,4,5], []);

11. useCallback(store function)

    * return a memoized function that only changes if one of the dependencies has changed

    ```react
    const memoizedCallback = useCallback(
      () => {
        doSomething(a, b);
      },
      [a, b],
    );
    ```

    * `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

12. React.memo

    ​		To avoid re-evaluate unnecessary child component, except the child component has new value

    * ```
      export default React.memo(DemoOutput)
      ```

    * If a reference type value(like function) passed to the child component, memo would work because reference type specialty ([1,2,3] !== [1, 2, 3]) 

    * To solve the above issue, we can leverage useCallback() to store a function and not recreate it again as long as certain dependencies not change 

13. Class-based component

    * cannot use React hook

    * can use lifecycle methods

      * componentDidMount(); called once component mounted(was evaluated & rendered) === useEffect(..., [])

      * componentDidUpdate(); called once component updated(was evaluated & rendered) === useEffect(..., [someValue])

      * componentWillUnmount(); called right before component is unmounted(remove from DOM) 

        === useEffect(()=>{return ()=>{...}},[])

    * use class-based components when meeting error boundary=> only in class-based component, we can use componentDidCatch() to catch the error occurred in the nested components under the ErrorBoundary wrapper
