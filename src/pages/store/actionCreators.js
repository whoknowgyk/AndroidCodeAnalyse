import axios from 'axios/index';
import { actionTypes } from './index';

const setExampleCode = (data) => ({
   type:actionTypes.SET_EXAMPLE_CODE,
   data:data,
});

export const reportError = (data) => ({
   type:actionTypes.REPORT_ERROR,
   data:data,
});

const showNewCodeInCodeArea = (data) =>({
    type:actionTypes.SHOW_NEW_CODE_IN_AREA,
    data:data,
});

const showNewCodeInEditCode = (data) =>({
   type:actionTypes.SHOW_NEW_CODE_IN_EDIT,
   data:data,
});

export const editCode = () =>({
   type:actionTypes.EDIT_CODE,
});

export const pushCode = () => ({
   type:actionTypes.PUSH_CODE,
});

export const changeCodeToEdit =(data)=>({
    type:actionTypes.CHANGE_CODE_TO_EDIT,
    data:data,
});

export const changeEditToFalse =(data)=>({
   type:actionTypes.CHANGE_EDIT_TO_FALSE,
   data:data,
});

export const changeBtnState =(data)=>({
   type:actionTypes.CHANGE_BTN_STATE,
   data:data,
});

export const changeCode =(data)=>({
    type:actionTypes.CHANGE_CODE,
    data:data,
});

export const clearCode = () => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/clear'
      ).then(() => {
         //向日志显示函数传递succes，表示清除成功
         const action=reportError('ClearCode:SUCCESS');
         //console.log(data.data,typeof data.data);
         dispatch(action);
      }).catch(() => {
         console.log('error');
      });
   }
};

//显示示例代码
export const getExampleCode = () => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/examples'
      ).then((data) => {
         //返回的数据类型是string
         const action=setExampleCode(data.data);
         dispatch(action);
         //显示日志
         const reportAction=reportError('GetExampleCode:SUCCESS');
         dispatch(reportAction);
      }).catch(() => {
         console.log('error');
      });
   }
};

//显示代码
export const analyzeCode = (newCode) => {
   return (dispatch) => {
      axios.post('http://10.141.221.72:8711/replace/analyze', {
         code: newCode,
      }).then((data)=>{
         //成功
         if(data.data.responseCode===600){
            //data.data.lines is Object
            //console.log(data.data.lines,typeof data.data.lines)
            const action=showNewCodeInCodeArea(data.data.lines);
            dispatch(action);
            const reportAction=reportError('AnalyzeCode:SUCCESS');
            dispatch(reportAction);
            const changeAction=changeEditToFalse(false);
            dispatch(changeAction);
            const btnAction=changeBtnState('true');
            dispatch(btnAction);
         }else if (data.data.responseCode===700) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===701) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===702) {
            const action=reportError(data.data.message);
            dispatch(action);
         }
      }).catch(function (error) {
          console.log(error);
       });
   }
};

export const revertCode = () => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/revert'
      ).then((data) => {
         if(data.data.responseCode===600){
            const action=showNewCodeInCodeArea(data.data.lines);
            //console.log(data.data,typeof data.data);
            dispatch(action);
            console.log(data.data.lines);
            const changeAction=changeEditToFalse(false);
            dispatch(changeAction);
            const reportAction=reportError('RevertCode:SUCCESS');
            dispatch(reportAction);
         }else if (data.data.responseCode===700) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===701) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===702) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===601) {
            const action=reportError(data.data.message);
            dispatch(action);
         }
      }).catch(() => {
         console.log('error');
      });
   }
};

//export const analyzeRightCode = (newCode) => {
//   return (dispatch) => {
//      axios.post('http://10.141.221.72:8711/replace/analyze', {
//         code: newCode,
//      }).then((data)=>{
//         //成功
//         if(data.data.responseCode===600){
//            //data.data.lines is Object
//            //console.log(data.data.lines,typeof data.data.lines)
//            const action=showNewCode(data.data.lines);
//            dispatch(action);
//         }else if (data.data.responseCode===700) {
//            const action=reportError(data.data.message);
//            dispatch(action);
//         }else if (data.data.responseCode===701) {
//            const action=reportError(data.data.message);
//            dispatch(action);
//         }else if (data.data.responseCode===702) {
//            const action=reportError(data.data.message);
//            dispatch(action);
//         }
//      }).catch(function (error) {
//         console.log(error);
//      });
//   }
//};

export const replaceCode = (index) => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/replace/'+index
      ).then((data)=>{
         //成功
         if(data.data.responseCode===600){
            //data.data.lines is Object
            //console.log(data.data.lines,typeof data.data.lines)

            //显示代码
            const action=showNewCodeInEditCode(data.data.lines);
            dispatch(action);
            //切换展示状态为AceEditor
            const changeAction=changeEditToFalse(true);
            dispatch(changeAction);
            //报告日志显示成功
            const reportAction=reportError('ReplaceCode:SUCCESS');
            dispatch(reportAction);
         }else if (data.data.responseCode===700) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===701) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===702) {
            const action=reportError(data.data.message);
            dispatch(action);
         }
      }).catch(function (error) {
         console.log(error);
      });
   }
};

export const replaceAll = () => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/replaceall'
      ).then((data)=>{
         //成功
         if(data.data.responseCode===600){
            const action=showNewCodeInCodeArea(data.data.lines);
            dispatch(action);
            const changeAction=changeEditToFalse(false);
            dispatch(changeAction);
            const reportAction=reportError('ReplaceAll:SUCCESS');
            dispatch(reportAction);
         }else if (data.data.responseCode===700) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===701) {
            const action=reportError(data.data.message);
            dispatch(action);
         }else if (data.data.responseCode===702) {
            const action=reportError(data.data.message);
            dispatch(action);
         }
      }).catch(function (error) {
         console.log(error);
      });
   }
};

