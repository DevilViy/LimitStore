import  {handleActions}  from 'redux-actions';

const initialState = {
    notifications:[],
}


const CategoryContainer = handleActions({
    ["test"](state, action) {
        console.log('%c showNumber','color:red',action)
        return {...action.payload};
    },

}, initialState)

export default CategoryContainer