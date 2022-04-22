import React, { Component } from "react";
import Viewer from "bpmn-js";
import Modeler from "bpmn-js/lib/Modeler";
import BpmnService from "../../services/Bpmn.service";
import ServiceTaskModule from '../../modules/ServiceTask';
import PatientsTaskModule from "../../modules/PatientsTask";
import minimapModule from 'diagram-js-minimap';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';


class BpmnComponent extends Component {
    containerRef;
    bpmn;
    state = {};
    bpmnService = new BpmnService();

    constructor(props) {
        super(props)
        this.containerRef = React.createRef();
    }

    async componentDidMount() {
        const { url, diagramXML, edit } = this.props;

        const container = this.containerRef.current;

        this.bpmn = edit ? new Modeler(
            {
                container: container,
                propertiesPanel: {
                    parent: '#js-properties-panel'
                },
                additionalModules: [
                    ServiceTaskModule,
                    PatientsTaskModule,
                    minimapModule,
                    BpmnPropertiesPanelModule,
                    BpmnPropertiesProviderModule
                ]
            }
            ) : new Viewer({ container });

        this.bpmn.on("import.done", (event) => {
            const { error, warnings } = event;

            this.bpmn.get("canvas").zoom("fit-viewport");

            if (error) {
                this.handleError(error);
            }
        });

        if(url) {
            const diagram = await this.bpmnService.getDiagram(url);
            this.setState({ diagramXML: diagram })
        }

        if (diagramXML) {
            this.displayDiagram(diagramXML);
        }
        
    }

    async componentDidUpdate(prevProps, prevState) {
        const {
          props,
          state
        } = this;
    
        if (props.url !== prevProps.url) {
            const diagram = await this.bpmnService.getDiagram(url);
            this.setState({ diagramXML: diagram })
        }
    
        const currentXML = props.diagramXML || state.diagramXML;
        const previousXML = prevProps.diagramXML || prevState.diagramXML;
    
        if (currentXML && currentXML !== previousXML) {
          return this.displayDiagram(currentXML);
        }
    }

    componentWillUnmount() {
        this.bpmn.destroy();
    }

    handleError(error) {
        console.error(error);
    }

    displayDiagram(diagramXML) {
        this.bpmn.importXML(diagramXML, () => {});
    }

    getDialog() {
        this.bpmn.saveXML({ format: true }, function (err, xml) {
            const name = "export.xml";
            const blob = new Blob([xml], {type: 'text/xml'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = name;
            link.href = url;
            link.click();
            window.URL.revokeObjectURL(url);
        });  
    }

    render() { 
        return (
            <section className="bpmn" >
                <div className="bpmn__container" ref={this.containerRef}></div>
                <div id="js-properties-panel" className="bpmn__panel"></div>
                <footer>
                    <button onClick={()=> this.getDialog(this.bpmn)}>
                        <i class="fa-solid fa-file-export"></i>
                        &nbsp;Exportieren
                    </button>
                </footer>
            </section>
        );
    }
}
 
export default BpmnComponent;