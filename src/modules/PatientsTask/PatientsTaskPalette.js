export default class PatientsTaskPalette {
    constructor(create, elementFactory, palette, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
  
      palette.registerProvider(this);
    }
  
    getPaletteEntries(element) {
      const {
        create,
        elementFactory,
        translate
      } = this;
  
      function createServiceTask(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:User' });
  
        create.start(event, shape);
      }
  
      return {
        'create.patients-task': {
          group: 'activity',
          className: 'bpmn-icon-user-task',
          title: translate('Create PatientsTask'),
          action: {
            dragstart: createServiceTask,
            click: createServiceTask
          }
        },
      }
    }
  }
  
  PatientsTaskPalette.$inject = [
    'create',
    'elementFactory',
    'palette',
    'translate'
  ];