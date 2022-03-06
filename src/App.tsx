import React from 'react';
import { Calandar } from './component/calander';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
function App() {
  
  return (
    <Calandar/>
  );
}

export default App;
