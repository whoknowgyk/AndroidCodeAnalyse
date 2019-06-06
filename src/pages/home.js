import React, {Component} from 'react';
import { connect } from 'react-redux';
import {actionCreators} from './store';
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Card, Button, Typography } from 'antd';
import AceEditor from 'react-ace';

const { Header, Footer } = Layout;
const { Text } = Typography;


class Home extends Component {

    showCode(){
        const newCode=this.props.codeArea;
        const codeList=[];
        const { replaceCode } = this.props;
        let num=0;
        Object.keys(newCode).forEach(function (key) {
            //console.log(key,newCode[key],typeof newCode[key]);
            const line=newCode[key];
            //未被标记
            if (line['index']===undefined){
                //console.log(line['content']);
                codeList.push(
                    <div>
                        <Text>{line['content']}</Text>
                        <br />
                    </div>
                );
            }
            //被标记
            else {
                let start=line['index']['start'];
                let end=line['index']['end'];
                let text=line['content'];
                let text1=text.substring(0,start);
                let text2=text.substring(start,end);
                let text3=text.substring(end);
                let temp=num;
                codeList.push(
                    <div>
                        <Text>{text1?text1:''}</Text>
                        <Text delete>{text2?text2:''}</Text>
                        <Text>{text3?text3:''}</Text>
                        <Button type='dashed' className='replace_btn' onClick={()=>{
                            replaceCode(temp);
                        }}>
                            replace
                        </Button>
                        <br />
                    </div>
                );
                num=num+1;
            }
        });
        return codeList;
    }

    showAceCode(){
        const newCode=this.props.codeArea;
        let code='';
        Object.keys(newCode).forEach(function (key){
            const line=newCode[key];
            //codeList.push(
            //    <div>
            //        <Text>{line['content']}</Text>
            //        <br />
            //    </div>
            //);
            code=code+line['content']+'\n'
        });
        this.props.changeCodeToEdit(code);
        console.log(this.props.editCode);
        return (
            <AceEditor
                value={this.props.editCode}
                mode='java'
                onChange={(value)=>this.props.onChange(value)}
            >
            </AceEditor>
        );
    }


    render() {
        return (
            <Layout>
                {/*标题*/}
                <Header>
                    <div id={'title'}>Title</div>
                </Header>
                <div id='medium_box'>
                    <Card
                        title="Input Code"
                        extra={[
                        //清除缓存
                        <Button key="3" onClick={this.props.clearCode}>Clear</Button>,
                        //显示示例代码
                        <Button key="2" onClick={this.props.getExampleCode}>Example</Button>,
                        //将左侧代码显示到右侧
                        //返回的参数是exampleCode，string类型
                        //analyze返回的是string类型的代码，并且得到新的object类型的代码
                        //接收的内容显示在codeArea中
                        <Button key="1" onClick={()=>{this.props.analyzeCode(this.props.exampleCode)}}>Analyze</Button>,
                    ]}
                        id='left_card'
                    >
                        <Text id='input_code_area'>
                            <AceEditor
                                mode='java'
                                //theme='xcode'
                                value={this.props.exampleCode}
                                id='editor'
                            >
                            </AceEditor>
                        </Text>
                        <br/>
                    </Card>
                    <Card
                        title="Analyze"
                        extra={[
                            //把右侧代码框中的代码返回回去，并且得到一个list，让list展示到右侧代码框
                            //analyze返回的是string类型的代码，并且得到新的object类型的代码，与codeArea关联
                            //返回的是editCode内的内容，接收的内容显示在codeArea中
                            <Button key="3" onClick={()=>{this.props.analyzeCode(this.props.editCode,this.props.edit)}}>Analyze</Button>,
                            //不返回数据
                            //接收的object类型的代码，与codeArea关联，同时具有responseCode
                            <Button key="2" onClick={this.props.replaceAll}>ReplaceAll</Button>,
                            //不返回数据
                            //接收的object类型的代码，与codeArea关联，同时具有responseCode
                            //{this.props.edit===true?<Button key="1" onClick={this.props.revertCode}>Revert</Button>:<Button disabled key="0">Revert</Button>},
                            <Button key="1" onClick={this.props.revertCode}>Revert</Button>
                        ]}
                        id='right_card'
                    >
                        {this.props.edit?this.showAceCode():this.showCode()}
                    </Card>
                    <div className='clear'></div>
                </div>
                <div>
                    <Card
                        title="Message"
                        //extra={<a href="#">More</a>}
                        id='message_card'
                    >
                        <Text id='message_text'>
                            {this.props.message}
                        </Text>
                    </Card>
                </div>
                <Footer id={'footer'}>—————&nbsp;&nbsp;&nbsp;Footer&nbsp;&nbsp;&nbsp;—————</Footer>
            </Layout>

        )
    }
}

const mapStateToProps=(state)=>{
    return{
        //示例代码，string
        exampleCode:state.homeReducer.exampleCode,
        //信息，显示在下方Message框中
        message:state.homeReducer.message,
        //右侧显示框，Object
        codeArea:state.homeReducer.codeArea,
        //true：代码以string方式显示，false：代码以object方式显示
        edit:state.homeReducer.edit,
        //右侧显示框，string
        editCode: state.homeReducer.editCode,
        //revert按钮状态，false为不可用，true为可用
        //返回值为601时不可用，点击analyse的时候重置为可用
        btnState:state.homeReducer.btnState,
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        clearCode(){
            const action = actionCreators.clearCode();
            dispatch(action);
        },
        getExampleCode(){
            const action = actionCreators.getExampleCode();
            dispatch(action);
        },
        analyzeCode(code,edit){
            if(edit===false){
                const reportAction = actionCreators.reportError('The code type is an object, please change to string first.');
                dispatch(reportAction);
            }
            else {
                const action = actionCreators.analyzeCode(code);
                dispatch(action);
            }
        },
        revertCode(){
            const action = actionCreators.revertCode();
            dispatch(action);
        },
        //要做两件事
        //1.传回index参数，接收一个object，将object转为string且在editCode中显示
        //2.将codeArea改为editCode
        //注：index从1开始
        replaceCode(index){
            const action = actionCreators.replaceCode(index);
            dispatch(action);
            const editAction = actionCreators.editCode();
            dispatch(editAction);
        },
        replaceAll(){
            const action = actionCreators.replaceAll();
            dispatch(action);
        },
        changeCodeToEdit(code){
            const action = actionCreators.changeCodeToEdit(code);
            dispatch(action);
        },
        onChange(code){
            const action = actionCreators.changeCode(code);
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);