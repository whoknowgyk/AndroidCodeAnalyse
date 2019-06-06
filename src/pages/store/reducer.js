import {actionTypes} from './index';

const defaultState ={
    exampleCode:'',
    codeArea:{},
    message:'',
    edit:false,
    editCode:'',
    btnState:true,
};

export default (state=defaultState,action)=>{
    if (action.type===actionTypes.CHANGE_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.editCode=action.data;
        return newState;
    }
    //显示示例代码
    if (action.type===actionTypes.SET_EXAMPLE_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.exampleCode=action.data;
        return newState;
    }
    //日志显示，包括报错和成功
    if (action.type===actionTypes.REPORT_ERROR){
        const newState=JSON.parse(JSON.stringify(state));
        //修改的是message部分的信息
        newState.message=action.data;
        return newState;
    }
    //修改codeArea
    if (action.type===actionTypes.SHOW_NEW_CODE_IN_AREA){
        const newState=JSON.parse(JSON.stringify(state));
        newState.codeArea=action.data;
        return newState;
    }
    //修改edit状态
    if (action.type===actionTypes.CHANGE_EDIT_TO_FALSE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.edit=action.data;
        return newState;
    }
    //将object转化为string传递给editCode
    if (action.type===actionTypes.SHOW_NEW_CODE_IN_EDIT){
        const newState=JSON.parse(JSON.stringify(state));
        let code='';
        let temp_code=action.data;
        Object.keys(temp_code).forEach(function (key){
            let line=temp_code[key];
            code=code+line['content']+'\n'
        });
        newState.editCode=code;
        return newState;
    }
    if (action.type===actionTypes.CHANGE_BTN_STATE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.btnState=action.data;
        return newState;
    }
    //if (action.type===actionTypes.SHOW_NEW_CODE){
    //    const newState=JSON.parse(JSON.stringify(state));
    //    newState.codeArea=action.data;
    //    if(action.index!==-1){
    //        let count=1;
    //        let temp_code=newState.codeArea;
    //        Object.keys(temp_code).forEach(function (key){
    //            if (temp_code[key]['index']===undefined) {
    //                if(count===action.index){
    //                    temp_code[key]['index']=undefined;
    //                }
    //                else {
    //                    count++;
    //                }
    //            }
    //        });
    //        newState.codeArea=temp_code;
    //    }
    //    return newState;
    //}
    //if (action.type===actionTypes.EDIT_CODE){
    //    const newState=JSON.parse(JSON.stringify(state));
    //    newState.edit=true;
    //    let code='';
    //    let temp_code=newState.codeArea;
    //    Object.keys(temp_code).forEach(function (key){
    //        let line=temp_code[key];
    //        code=code+line['content']+'\n'
    //    });
    //    newState.editCode=code;
    //    return newState;
    //}
    //if (action.type===actionTypes.PUSH_CODE){
    //    const newState=JSON.parse(JSON.stringify(state));
    //    newState.edit=false;
    //    return newState;
    //}
    //if (action.type===actionTypes.EDIT_CODE){
    //    const newState=JSON.parse(JSON.stringify(state));
    //    newState.editCode=action.data;
    //    console.log(action.data);
    //    return newState;
    //}
    return state;
}