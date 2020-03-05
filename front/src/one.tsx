import * as React from 'react'
import { Button } from 'antd'
import { Button as BB } from 'antd-mobile'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import T1 from './t1'
import T2 from './t2'

const func = () => {}

const One = () => (
  <div>
  <div>
    <div className="test">11111</div>
    <div className="test">11111</div>
    <div className="test">11111</div>
    <Button type="primary">Button</Button>
    <BB type="primary">sssssss</BB>
  </div>
   <Router>
   <div>
     <nav>
       <ul>
         <li>
           <Link to="/">Home</Link>
         </li>
         <li>
           <Link to="/abut">About</Link>
         </li>
       </ul>
     </nav>
     <Switch>
        <Route path="/abut">
         <T2 />
       </Route>
       <Route path="/">
         <T1 />
       </Route>
       
     </Switch>
   </div>
 </Router>
 </div>
)
export default One
export {
  func
}