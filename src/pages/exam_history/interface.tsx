
import type { ColumnsType } from 'antd/es/table'
import {Tag,Space,Badge} from 'antd'
export type  DataType = {
  key: React.Key;
  testType: string;
  testDateTime: string;
  status: boolean;
}

export const tableDefaultData:DataType[]=[
  {
    key: '1',
    testType: 'React源码',
    testDateTime: "2023-06-15 13:45",
    status:false,
  },
  {
    key: '2',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:false,
  },
  {
    key: '3',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '4',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '5',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '6',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '7',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '8',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '9',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '10',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },
  {
    key: '11',
    testType: 'React源码',
    testDateTime: "2023年6月5",
    status:true,
  },

];

export const tableColumns:ColumnsType<DataType> = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '考试类型',
    dataIndex: 'testType',
    key: 'testType',
  },
  {
    title: '考试时间',
    dataIndex: 'testDateTime',
    key: 'testDateTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(status:boolean)=>{
      const statusObj=status?{
        status:'default',
        text:"未阅卷"
      }:{
        status:'error',
        text:"已阅卷"
      }
      return <Space>
      <Badge status={statusObj.status as "default" | "error" | "success" | "processing" | "warning" | undefined}/>
      {statusObj.text}
    </Space>
    }
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (row) => {
      return <Tag style={{fontSize: "12px",color:"#1880FF",borderRadius: "12px",opacity: row.status?'1':'0.2',background: "#F2F4F7",cursor:row.status?"pointer":"none"}}>查看</Tag>
    },
  },
];