import { IComponent } from "./component.type";

export class Component {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    constructor(component: IComponent) {
        this.id = component.id;
        this.name = component.name;
        this.createdAt = component.createdAt;
        this.updatedAt = component.updatedAt;
    }
}