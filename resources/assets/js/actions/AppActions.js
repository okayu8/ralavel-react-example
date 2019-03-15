import * as Actions from '../constants/App.js'
let textId = 1

/*
  Action Creator:
  Appコンポーネント (src/App.js) から呼ばれる Action Creator群
  App.jsから呼ばれ、Action Creator内部で生成されたオブジェクトはreducer (./reducers) に渡される。
*/

//addText (Action Creator) : Appコンポーネント (App.js) でAddボタンを呼び出した時に呼ばれる。
// type (何のアクションなのかを示す定数であり必須) と下記関数はApp.jsから渡されたテキストを包含したオブジェクトを return する。return されたオブジェクトは後述のReducerに渡される。
export function addText(newText) {
    return { type: Actions.ADD_TEXT, id: textId++, text: newText };
}

//clearText (Action Creator) : Appコンポーネント (App.js) でClearボタンを呼び出した時に呼ばれる。
export function clearText() {
    return { type: Actions.CLEAR_TEXT };
}

export function addTodo(newText) {
    return { type: Actions.ADD_TODO, text: newText };
}

export function getTodo() {
    return { type: Actions.GET_TODO }
}

export function deleteTodo() {
    return { type: Actions.DELETE_TODO };
}

export function editTodo() {
    return { type: Actions.EDIT_TODO };
}