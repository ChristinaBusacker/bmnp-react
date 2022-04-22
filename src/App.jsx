import React, {Component} from "react";
import BpmnComponent from "./components/Bpmn/bpmn.component";

class App extends Component {
    state = { 
        action: 'edit'
    } 

    render() { 
        return (
            <main className="Test">
                <BpmnComponent  
                    url="https://raw.githubusercontent.com/bpmn-io/react-bpmn/master/example/public/diagram.bpmn"
                    edit="true"
                />
            </main>
        );
    }
}
 
export default App;