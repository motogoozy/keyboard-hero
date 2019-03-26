import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import ChallengePage from './views/ChallengePage/ChallengePage';
import Leaderboard from './views/Leaderboard/Leaderboard';


export default (
   <Switch>
      <Route component={Landing} exact path='/' ></Route>
      <Route component={ChallengePage} path='/challenge' ></Route>
      <Route component={Leaderboard} path='/leaderboard' ></Route>
   </Switch>
)