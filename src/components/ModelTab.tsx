import React, {useState} from 'react';

import {
  Typography,
  Tabs,
  Divider,
  PageHeader,
  Collapse,
  Table,
  Tag,
  Space,
  Tooltip,
  Button,
} from 'antd';

// import { ColumnsType } from 'antd/es/table' // NOTE: When splitting this file, update types to use this instead

const {Title, Text} = Typography;
const {TabPane} = Tabs;
const {Panel} = Collapse;

enum PropDataType {
  Text = 'text',
  Integer = 'integer',
  Number = 'number',
  Boolean = 'boolean',
  Date = 'date',
  Time = 'time',
  DateTime = 'datetime',
}

const dtypeColors = {
  [PropDataType.Text]: 'green',
  [PropDataType.Integer]: 'blue',
  [PropDataType.Number]: 'volcano',
  [PropDataType.Boolean]: 'purple',
  [PropDataType.Date]: 'cyan',
  [PropDataType.Time]: 'magenta',
  [PropDataType.DateTime]: 'orange',
} as const;

const dtypeNames = {
  [PropDataType.Text]: 'Text',
  [PropDataType.Integer]: 'Integer',
  [PropDataType.Number]: 'Number',
  [PropDataType.Boolean]: 'Boolean',
  [PropDataType.Date]: 'Date',
  [PropDataType.Time]: 'Time',
  [PropDataType.DateTime]: 'DateTime',
} as const;


function PropTag({ prop }: { prop: Prop }) {
  return (
    <Tooltip title={`${prop.name}: ${dtypeNames[prop.dtype]}`}>
      <Tag color={dtypeColors[prop.dtype]}>
        { prop.name }
      </Tag>
    </Tooltip>
  );
}

function PropTags({ props }: { props: Prop[] }) {
  return (
    <Text ellipsis={true}>
      {props.map((prop, i) => (<PropTag key={i} prop={prop} />))}
    </Text>
  );
}

interface Prop {
  name: string;
  dtype: PropDataType;
  description?: string;
  defaultValue?: any;
  isNullable?: boolean;
}

interface NodeInfo {
  type: string;
  props: Prop[];
}

interface EdgeInfo {
  type: string;
  from: string;
  to: string;
  directed?: boolean;
  props: Prop[];
}

const testData: {nodes: NodeInfo[]; edges: EdgeInfo[]} = {
  nodes: [
    {
      type: 'Person',
      props: [
        {name: 'name', dtype: PropDataType.Text},
        {name: 'age', dtype: PropDataType.Integer},
        {name: 'is_cool', dtype: PropDataType.Boolean},
        {name: 'fave_color', dtype: PropDataType.Text},
      ],
    },
    {
      type: 'Car',
      props: [],
    },
    {
      type: 'Company',
      props: [{name: 'name', dtype: PropDataType.Text}],
    },
  ],
  edges: [
    {
      type: 'KNOWS',
      from: 'Person',
      to: 'Person',
      props: [],
    },
    {
      type: 'WORKS_AT',
      from: 'Person',
      to: 'Company',
      props: [{name: 'title', dtype: PropDataType.Text}],
    },
    {
      type: 'OWNS',
      from: 'Person',
      to: 'Car',
      props: [],
    },
  ],
};

function NodeTable({data}: {data: ({key: number} & NodeInfo)[]}) {
  return (
    <Table
      columns={[
        {
          align: 'right',
          dataIndex: 'type',
          render: (t) => (
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '15px',
                backgroundColor: '#f0cece',
                textAlign: "center",
                verticalAlign: "middle",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "15px",
                lineHeight: "30px",
                margin: "auto",
              }}
            >{ t[0] }</div>
          ),
        },
        {
          title: 'Type Name',
          dataIndex: 'type',
        },
        {
          title: 'Properties',
          dataIndex: 'props',
          render: (props: Prop[]) => <PropTags props={props}/>,
        },
        {
          title: 'Actions',
          render: () => (
            <Space>
              <Button key="edit">Edit</Button>
              <Button key="delete">Delete</Button>
            </Space>
          ),
        },
      ]}
      dataSource={data}
    />
  );
}

export default function ModelTab() {
  return (
    <div className="tab-model">
      <Title>Model Data</Title>
      <p>
        Welcome to the <i>Model</i> tab!
      </p>

      <Divider />

      <Collapse defaultActiveKey={['nodes', 'edges']}>
        <Panel 
          header={<Space>
            <Title level={3}>Object Types</Title>
            <Title level={5} type="secondary">(aka Nodes)</Title>
          </Space>}
          key="nodes"
        >
          <NodeTable 
            data={testData.nodes.map(
              (node, i) => ({key: i, ...node})
            )}
          />

          <Button type="primary">
              Create New Object Type
          </Button>
        
        </Panel>

        <Panel 
          header={<Space>
            <Title level={3}>Relationship Types</Title>
            <Title level={5} type="secondary">(aka Edges)</Title>
          </Space>}
          key="edges"
        >
          ...
        </Panel>
      </Collapse>
    </div>
  );
}
