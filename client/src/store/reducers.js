import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  //UI reducer types
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  //Data reducer types
  SET_NOTES,
  SET_NOTE,
  DELETE_NOTE,
  POST_NOTE,
  EDIT_NOTE,
  MARK_IMP,
} from "./types";

export default function (state, action) {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case SET_NOTE:
      return {
        ...state,
        note: action.payload,
        loading: false,
      };
    // case DELETE_TODO: {
    //   let index = state.todos.findIndex(
    //     (todo) => todo.todoId === action.payload
    //   );
    //   let mutatedTodos = state.todos.slice();
    //   mutatedTodos.splice(index, 1);
    //   return {
    //     ...state,
    //     todos: [...mutatedTodos],
    //   };
    // }
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };

    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    // case SET_UNAUTHENTICATED:
    //   return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        user: action.payload,
        maxNumberOfPages: Math.ceil(action.payload.noteCount / 6),
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
