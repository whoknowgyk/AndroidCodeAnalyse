import {actionTypes} from './index';

const defaultState ={
    exampleCode:'',
    codeArea:{},
    message:'',
    edit:false,
};

export default (state=defaultState,action)=>{
    if (action.type===actionTypes.SET_EXAMPLE_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.exampleCode=action.data;
        return newState;
    }
    if (action.type===actionTypes.REPORT_ERROR){
        const newState=JSON.parse(JSON.stringify(state));
        newState.message=action.data;
        return newState;
    }
    if (action.type===actionTypes.SHOW_NEW_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.codeArea=action.data;
        return newState;
    }
    if (action.type===actionTypes.EDIT_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.edit=true;
        return newState;
    }
    if (action.type===actionTypes.PUSH_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.edit=false;
        return newState;
    }
    return state;
}