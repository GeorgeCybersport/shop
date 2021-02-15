import { IS_AUTH, IS_NOT_AUTH } from "./keys";
const initialstate = {
  isAuth: false,
  name: "",
  //id: "",
  //roleName: "",
};
export default function name(state = initialstate, action) {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        name: action.name,
        isAuth: true,
        //id: action.id,
        //roleName: action.roleName,
      };
    case IS_NOT_AUTH:
      return {
        ...state,
        name: "",
        isAuth: false,
        //id: "",
        //roleName: "",
      };
    default:
      return state;
  }
}
