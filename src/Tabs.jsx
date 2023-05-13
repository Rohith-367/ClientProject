import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import TabPageOne from './TabPageOne';
import TabPageTwo from './TabPageTwo';


function CustomTabs() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="generateinvoice" title="Generate Invoice">
        <TabPageOne />
      </Tab>
      <Tab eventKey="sendinvoice" title="Send Invoice">
        <TabPageTwo />
      </Tab>
    </Tabs>
  );
}

export default CustomTabs;