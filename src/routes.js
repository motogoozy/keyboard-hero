import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import ChallengePage from './views/ChallengePage/ChallengePage';


export default (
   <Switch>
      <Route component={Landing} exact path='/' ></Route>
      <Route component={ChallengePage} path='/challenge' ></Route>
   </Switch>
)