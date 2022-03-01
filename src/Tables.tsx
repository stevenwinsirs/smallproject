import React, {useState, FC} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Button} from 'antd';

const columns = [
   {
      title: 'Address',
      dataIndex: 'address',
   },
   {
      title: 'Latitude',
      dataIndex: 'latitude',
   },
   {
      title: 'Longitude',
      dataIndex: 'longitude',
   },
];

const style = {
   width: '600px',
};

const pagination = {
   position: ['bottomCenter']
};

const Tables: FC = () => {
   let state = useSelector(state => state);
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const dispatch = useDispatch();
   const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
      console.log(selectedRowKeys);
   };
   const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
   };

   function removeFn(){
      dispatch({
         type: 'DEL_LOCATION',
         res: selectedRowKeys
      });
   }

   const hasSelected = selectedRowKeys.length > 0;
   return (
      <div style={style}>
         <div style={{marginBottom: 16}}>
            <Button size={'small'} type="primary" onClick={removeFn} disabled={!hasSelected}>
               Remove Address
            </Button>
            <span style={{marginLeft: 8}}>
            {hasSelected ? `Selected ${selectedRowKeys.length} addresses` : ''}
          </span>
         </div>
         <Table
            size={'small'}
            bordered={true}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={state}
            pagination={pagination}
         />
      </div>
   );
};

export default Tables;