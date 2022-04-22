export default class BpmnService {
    constructor() {}

    async getDiagram(url) {
        return await fetch(url)
        .then((response) => response.text())
        .catch((err) => this.handleError(err));
    }

}