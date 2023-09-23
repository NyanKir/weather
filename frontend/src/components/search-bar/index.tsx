import { useKeyPress } from '@/hooks/key-press';
import { useEffect, useReducer } from 'react';
import classNames from 'classnames';
const list = ['🍎 apple', '🍊 orange', '🍍 pineapple', '🍌 banana'];

const initialState = { selectedIndex: 0 };

const reducer = (state: { selectedIndex: number }, action: any) => {
  switch (action.type) {
    case 'arrowUp':
      return {
        selectedIndex:
          state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1
      };
    case 'arrowDown':
      return {
        selectedIndex:
          state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0
      };
    case 'select':
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
};

export const SearchBar = () => {
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' });
    }
  }, [arrowDownPressed]);

  return (
    <div className="w-4/6 relative">
      <div className="bg-white w-full h-16 rounded-xl mb-3 shadow-lg p-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full text-2xl rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="bg-white w-full rounded-xl shadow-xl overflow-hidden p-1 absolute">
        {list.map((item, i) => (
          <div
            className={classNames(
              'w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer',
              i === state.selectedIndex ? 'bg-gray-300' : ''
            )}
            key={item}
            onClick={() => dispatch({ type: 'select', payload: i })}
            role="button"
            aria-pressed={i === state.selectedIndex}
            tabIndex={0}
            // onKeyPress={(e) => {
            //   if (e.key === 'Enter') {
            //     alert("ENTER")
            //     dispatch({ type: 'select', payload: i });
            //     // @ts-ignore
            //     e.target.blur();
            //   }
            // }}
          >
            <div>
              <div className="font-bold text-lg">Name: {item}</div>
              <div className="text-xs text-gray-500">
                <span className="mr-2">No: 007886</span>
                <span className="mr-2">gender: man</span>
                <span className="mr-2">hobby: skiing</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
