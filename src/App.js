import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import QuestionContainer from "./Containers/QuestionContainer";
import NewQuestionContainer from "./Containers/NewQuestionContainer";


const App = () => (
    <BrowserRouter basename="megadizel-mockup">
        <Switch>
            <Route path='/' component={NewQuestionContainer} exact/>

        </Switch>
    </BrowserRouter>

);

export default App;
