import {save_information,edit_storage_save} from "../../actionType/InformationModule"
import  {handleActions}  from 'redux-actions';

const initialState = {
    showData:[],
}


const InformationModule = handleActions({
    [save_information](state, action) {
        console.log('%c save_information','color:red',action)
        state.showData = action.payload
        return {...state};
    },
    [edit_storage_save](state,action){
        return {...state,...action.payload}
    }
}, initialState)

export default InformationModule