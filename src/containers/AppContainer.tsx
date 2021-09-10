import AppBox from '@components/AppBox'
import Editor from '@components/Editor'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function AppContainer() {
  return (
    <AppBox>
      <Router>
        <Switch>
          {/* <Route path="/" exact={true} component={Editor} /> */}
          <Route path='/editor/:id' component={Editor} />
        </Switch>
      </Router>
    </AppBox>
  )
}

export default AppContainer
