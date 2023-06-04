import { atom } from "jotai";

const userAtom = atom(null);
export const toastAtom = atom({ show: false, msg: "hello mai toast hai ji" }); 
export const triggerUpdateForTournaments = atom(false);

export default userAtom
