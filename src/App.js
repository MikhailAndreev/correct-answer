import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NewQuestionContainer from "./Containers/NewQuestionContainer";


const App = () => (
    <BrowserRouter basename="correct-answer">
        <Switch>
            <Route path='/' component={NewQuestionContainer} exact/>

        </Switch>
    </BrowserRouter>

);

export default App;
