import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
//import { actionCreators } from './store';
import {
    Header,
    LeftArea,
    RightArea,
    Clear,
    Message,
    ShowCodeArea,
    LeftTitle,
    LeftCode,
    RightTitle,
    RightCode,
    MessageTitle,
    MessageText,
} from './style';

class Home extends Component {
    render() {
        return (
            <Fragment>
                {/*header部分*/}
                <Header>hello</Header>
                <ShowCodeArea>
                    {/*代码展示部分*/}
                    <LeftArea>
                        <LeftTitle>Input Code</LeftTitle>
                        <LeftCode id="editor">Code</LeftCode>
                    </LeftArea>
                    {/*代码编辑部分*/}
                    <RightArea>
                        <RightTitle>Edit Code</RightTitle>
                        <RightCode>Code</RightCode>
                    </RightArea>
                    {/*清除浮动*/}
                    <Clear></Clear>
                </ShowCodeArea>
                {/*日志部分*/}
                <Message>
                    <MessageTitle>Message</MessageTitle>
                    <MessageText>logtest1ss</MessageText>
                </Message>
                {/*脚本部分-代码展示部分使用，这部分应该用import显示*/}
                {/*{this.props.focused}*/}
            </Fragment>
        );
    }
}

//映射关系 与store里的数据做链接
//state指的是store里的所有数据
const mapStateToProps=(state)=>{
    return{
        //focused:state.focus,
    }
};

//更改关系
//将调用dispatch方法都写在这里
const mapDispatchToProps=(dispatch)=>{
    return{
        //handleMouseEnter(){
        //    const action = actionCreators.mouseEnter();
        //    dispatch(action);
        //},
        testBtn(){
            console.log('test');
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);