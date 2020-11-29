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
  LOGOUT_USER,
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
    case POST_NOTE: {
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    }
    case DELETE_NOTE: {
      let index = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );
      let mutatedNotes = state.notes.slice(); //copying state.notes
      mutatedNotes.splice(index, 1); //removing the note at that position
      return {
        ...state,
        notes: [...mutatedNotes],
      };
    }
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
      let maxNumberOfPages = Math.ceil(action.payload.noteCount / 6);
      if (!maxNumberOfPages) maxNumberOfPages = 0;
      return {
        authenticated: true,
        loading: false,
        user: action.payload,
        maxNumberOfPages,
      };
    case LOGOUT_USER:
      return {
        notes: [],
        note: {},
        loading: false,
        user: {},
        authenticated: false,
        maxNumberOfPages: null,
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
