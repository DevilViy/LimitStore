/*
* 重置导航栏
* */

export const ResetNavigation=({dispatch,cb,page})=>{
    dispatch({
        type:'reset',
        payload:{
            page:page
        }
    })
    if(typeof cb==='function') cb()
}