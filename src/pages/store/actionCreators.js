import axios from 'axios/index';
import { actionTypes } from './index';

const setExampleCode = (data) => ({
   type:actionTypes.SET_EXAMPLE_CODE,
   data:data,
});

const reportError = (data) => ({
   type:actionTypes.REPORT_ERROR,
   data:data,
});

const showNewCode = (data) =>({
   type:actionTypes.SHOW_NEW_CODE,
   data:data,
});

export const editCode = () =>({
   type:actionTypes.EDIT_CODE,
});

export const pushCode = () => ({
   type:actionTypes.PUSH_CODE,
});

export const clearCode = () => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/clear'
      ).then(() => {
         const action=reportError('SUCCESS');
         //console.log(data.data,typeof data.data);
         dispatch(action);
      }).catch(() => {
         console.log('error');
      });
   }
};

export const getExampleCode = () => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/examples'
      ).then((data) => {
         const action=setExampleCode(data.data);
         //console.log(data.data,typeof data.data);
         dispatch(action);
      }).catch(() => {
         console.log('error');
      });
   }
};

export const analyzeCode = (newCode) => {
   return (dispatch) => {
      axios.post('http://10.141.221.72:8711/replace/analyze', {
         code: newCode,
      }).then((data)=>{
         //成功
         if(data.data.responseCode===600){
            //data.data.lines is Object
            //console.log(data.data.lines,typeof data.data.lines)
            const action=showNewCode(data.data.lines);
            dispatch(action);
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
         const action=showNewCode(data.data.lines);
         //console.log(data.data,typeof data.data);
         dispatch(action);
      }).catch(() => {
         console.log('error');
      });
   }
};

export const analyzeRightCode = (newCode) => {
   return (dispatch) => {
      axios.post('http://10.141.221.72:8711/replace/analyze', {
         code: newCode,
      }).then((data)=>{
         //成功
         if(data.data.responseCode===600){
            //data.data.lines is Object
            //console.log(data.data.lines,typeof data.data.lines)
            const action=showNewCode(data.data.lines);
            dispatch(action);
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

export const replaceCode = (index) => {
   return (dispatch) => {
      axios.get('http://10.141.221.72:8711/replace/'+index
      ).then((data)=>{
         //成功
         if(data.data.responseCode===600){
            //data.data.lines is Object
            //console.log(data.data.lines,typeof data.data.lines)
            const action=showNewCode(data.data.lines);
            dispatch(action);
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
            //data.data.lines is Object
            //console.log(data.data.lines,typeof data.data.lines)
            const action=showNewCode(data.data.lines);
            dispatch(action);
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

