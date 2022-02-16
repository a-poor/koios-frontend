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
} from 'antd';

// import { ColumnsType } from 'antd/es/table' // NOTE: When splitting this file, update types to use this instead

const {Title} = Typography;
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
  [PropDataType.Number]: 'blue',
  [PropDataType.Boolean]: 'blue',
  [PropDataType.Date]: 'blue',
  [PropDataType.Time]: 'blue',
  [PropDataType.DateTime]: 'blue',
} as const;

function PropTypeTag({dtype}: {dtype: PropDataType}) {
  switch (dtype) {
    case PropDataType.Text:
      return <span>Text</span>;
    case PropDataType.Integer:
      return <span>Integer</span>;
    case PropDataType.Number:
      return <span>Number</span>;
    case PropDataType.Boolean:
      return <span>Boolean</span>;
    case PropDataType.Date:
      return <span>Date</span>;
    case PropDataType.Time:
      return <span>Time</span>;
    case PropDataType.DateTime:
      return <span>DateTime</span>;
    default:
      return <span>Unknown</span>;
  }
}

interface Prop {
  name: string;
  type: PropDataType;
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
      props: [{name: 'name', type: PropDataType.Text}],
    },
    {
      type: 'Car',
      props: [],
    },
    {
      type: 'Company',
      props: [{name: 'name', type: PropDataType.Text}],
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
      props: [{name: 'title', type: PropDataType.Text}],
    },
    {
      type: 'OWNS',
      from: 'Person',
      to: 'Car',
      props: [],
    },
  ],
};

function NodeTable({data}: {data: ({i: number} & NodeInfo)[]}) {
  return (
    <Table
      columns={[
        {
          title: '<tmp img>',
          render: () => (
            <div
              style={{
                width: '25px',
                height: '25px',
                borderRadius: 'calc(25px / 2)',
                backgroundColor: '#f0cece',
              }}
            />
          ),
        },
        {
          title: 'Type Name',
          dataIndex: 'type',
        },
        {
          title: 'Properties',
          dataIndex: 'props',
          render: (props: Prop[]) => JSON.stringify(props),
        },
        {
          title: 'Actions',
          render: () => <div style={{}} />,
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

      <Collapse defaultActiveKey={['nodes']}>
        <Panel header="Object Types (aka Nodes)" key="nodes">
          <NodeTable data={testData.nodes.map((node, i) => ({i, ...node}))} />
        </Panel>

        <Panel header="Relationship Types (aka Edges)" key="edges"></Panel>
      </Collapse>
    </div>
  );
}
