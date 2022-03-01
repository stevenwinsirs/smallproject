import 'antd/dist/antd.css';
import './static/App.css';
import Map from './Map';
import SearchModule from './SearchModule';
import Tables from './Tables';
import {useInit} from './hooks/init';
import {useSelector} from 'react-redux';
import {Button, Layout, Divider, Typography, Space, Row, Col} from 'antd';
import React,{FC} from "react";

const {Header, Footer, Content} = Layout;
const {Text, Title} = Typography;
const font = {fontSize: '16px'};
const App:FC = () =>{
   const init:Function = useInit();
   const state = useSelector(state => state);
   let location = state[state.length - 1];

   const getPosition = ():void => {
      init();
   };

   return (
      <Layout>
         <Header className="header">
            demo: React Antd UI && Google Map API
         </Header>
         <Content>
            <div className="show-wrapper">
               <Title level={3}>- Latest Data show -</Title>
               <Space>
                  <Text style={font}>Latitude: <Text mark>{location.latitude}</Text></Text>
                  <Text style={font}>Longitude: <Text mark>{location.longitude}</Text></Text>
                  <br/>
                  <Text style={font}>TimeZone: <Text mark>{location.timeZone}</Text></Text>
                  <Text style={font}>LocalTime: <Text mark>{location.localTime}</Text></Text>
               </Space>
            </div>
            <Divider/>
            <Row justify={'center'}>
               <Col span={12}>
                  <div style={{width: '500px', height: '100%', margin: '0 auto'}}>
                     <Row style={{margin: '5px 0 5px 20px'}}>
                        <Col span={6}>
                           <Button type="primary" danger onClick={getPosition}>My_Location</Button>
                        </Col>
                        <Col span={18}>
                           <SearchModule/>
                        </Col>
                     </Row>
                     <Map/>
                  </div>
               </Col>
               <Col span={12}>
                  <Tables/>
               </Col>
            </Row>
         </Content>
         <Footer style={{textAlign: 'center'}}>The task footer </Footer>
      </Layout>
   );
}


export default App