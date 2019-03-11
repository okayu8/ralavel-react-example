import { combineReducers } from 'redux'
import { ADD_TEXT, CLEAR_TEXT, ADD_TODO } from '../constants/App.js';
import { addTodoAction, getTodoAction } from '../apiController/ActionApi'

/*
  Reducer:
  ReducerはAction Creatorから渡されたデータをもとに新しい State を作成して返す。
*/

// アプリ起動時のstate
let initialState = [
    {
        id: 0,
        text: ''
    }
]

// State がundefinedの場合はデフォルト引数でinitialStateを使用するようにする
let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEXT:
            //ADD_TEXTアクションが来た時は現状の state にAction Creatorから returnされたデータを元に新規オブジェクトを作成、state にプラスして新しい state を返す
            return [...state, { id: action.id, text: action.text }];
        case CLEAR_TEXT:
            // CLEAR_TEXTアクションが来た場合には空の配列を返して state を初期化する
            return []
        case ADD_TODO:
            console.log("action.text " + action.text);
            return handleAddTodo(action.text);
        case GET_TODO:
            console.log("getTodo")
            return handleGetTodo();
        default:
            return state
    }
};

function handleAddTodo(text) {
    console.log('handleAddTodo!');
    const todo = {
        title: text,
        description: "",
        limit: 0,
    }
    addTodoAction(todo)
    return true;
}

function handleGetTodo() {
    getTodoAction(todo)
}

// entry.js内部で Provider コンポーネントにセットするデータストア。<Provider>以下でthis.props.state.storedTextの形で state にアクセス可能。
export const store = combineReducers(
    {
        store: appReducer
    }
)