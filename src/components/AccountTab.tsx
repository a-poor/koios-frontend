import React from 'react';

import {Typography} from 'antd';

const {Title} = Typography;

export default function AccountTab() {
  return (
    <div className="tab-account">
      <Title>Your Account</Title>
      Welcome to the <i>Account</i> tab!
    </div>
  );
}
