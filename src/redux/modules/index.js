import { combineReducers } from 'redux';
// 각 리듀서를 임포트합니다.
import someReducer from './someReducer';

const rootReducer = combineReducers({
  some: someReducer,
  // 다른 리듀서도 추가할 수 있습니다.
});

export default rootReducer;
