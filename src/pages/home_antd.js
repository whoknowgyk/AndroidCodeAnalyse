//import {
//    Clear,
//    LeftArea,
//    LeftCode,
//    LeftTitle,
//    Message, MessageText,
//    MessageTitle,
//    RightArea,
//    RightCode,
//    RightTitle,
//    ShowCodeArea
//} from "./style";
//import React, {Fragment} from "react";
//
//<Fragment>
//    {/*header部分*/}
//    <Header>hello</Header>
//    <ShowCodeArea>
//        {/*代码展示部分*/}
//        <LeftArea>
//            <LeftTitle>Input Code</LeftTitle>
//            <LeftCode id="editor">Code</LeftCode>
//        </LeftArea>
//        {/*代码编辑部分*/}
//        <RightArea>
//            <RightTitle>Edit Code</RightTitle>
//            <RightCode>Code</RightCode>
//        </RightArea>
//        {/*清除浮动*/}
//        <Clear></Clear>
//    </ShowCodeArea>
//    {/*日志部分*/}
//    <Message>
//        <MessageTitle>Message</MessageTitle>
//        <MessageText>logtest1ss</MessageText>
//    </Message>
//    {/*脚本部分-代码展示部分使用，这部分应该用import显示*/}
//    {/*{this.props.focused}*/}
//</Fragment>


//import {Button, Layout, PageHeader} from "antd";
//import React from "react";
//
//{/*代码框*/}
//<div id='content_box'>
//    <div className='left_code_area'>
//        <PageHeader
//            title="Input Code"
//            extra={[
//                <Button key="3">Clear</Button>,
//                <Button key="2">Example</Button>,
//                <Button key="1">Analyse</Button>,
//            ]}
//            className='left_header'
//        >
//        </PageHeader>
//        <Content id={'left_box'}>
//            <div id={'left_code_box'}>Content</div>
//        </Content>
//    </div>
//    {/*<div className={'clear'}></div>*/}
//</div>
//{/*日志框*/}
//<div className='message_box'>
//    <PageHeader
//        title="Message"
//        className='message_header'
//    >
//    </PageHeader>
//    <Content id={'message_box'}>
//        <div id={'message_code'}>Content</div>
//    </Content>
//</div>