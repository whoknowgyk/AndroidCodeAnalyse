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
        let num=1;
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
                let temp=num;
                codeList.push(
                    <div>
                        <Text delete>{line['content']}</Text>
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
        return (
            <AceEditor
                value={code}
                mode='java'
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
                        <Button key="3" onClick={this.props.clearCode}>Clear</Button>,
                        <Button key="2" onClick={this.props.getExampleCode}>Example</Button>,
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
                            <Button key="4" onClick={()=>{this.props.analyzeRightCode(this.props.exampleCode)}}>Analyze</Button>,
                            <Button key="2" onClick={this.props.replaceAll}>ReplaceAll</Button>,
                            <Button key="1" onClick={this.props.revertCode}>Revert</Button>,
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
        exampleCode:state.homeReducer.exampleCode,
        message:state.homeReducer.message,
        codeArea:state.homeReducer.codeArea,
        edit:state.homeReducer.edit,
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
        analyzeCode(code){
            const action = actionCreators.analyzeCode(code);
            dispatch(action);
        },
        revertCode(){
            const action = actionCreators.revertCode();
            dispatch(action);
        },
        analyzeRightCode(code){
            const action = actionCreators.analyzeRightCode(code);
            dispatch(action);
            const pushAction = actionCreators.pushCode();
            dispatch(pushAction);
        },
        replaceCode(index){
            //console.log(index);

            //const action = actionCreators.replaceCode(index);
            //dispatch(action);
            const editAction = actionCreators.editCode();
            dispatch(editAction);
        },
        replaceAll(){
            const action = actionCreators.replaceAll();
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);