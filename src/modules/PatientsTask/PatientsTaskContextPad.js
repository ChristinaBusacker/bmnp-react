export default class PatientsTaskContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
  
      if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
      }
  
      contextPad.registerProvider(this);
    }
  
    getContextPadEntries(element) {
      const {
        autoPlace,
        create,
        elementFactory,
        translate
      } = this;

      function appendPatientsTask(event, element) {
        if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
    
          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      }
  
      function appendPatientsTaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
    
        create.start(event, shape, element);
      }
  
      return {
        'append.patients-task': {
          group: 'model',
          className: 'bpmn-icon-user-task',
          title: translate('Append PatientsTask'),
          action: {
            click: appendPatientsTask,
            dragstart: appendPatientsTaskStart
          }
        }
      };
    }
  }
  
  PatientsTaskContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
  ];