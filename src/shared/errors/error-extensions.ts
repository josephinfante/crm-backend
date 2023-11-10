export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserError';
    }
}

export class RoleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RoleError';
    }
}

export class PageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PageError';
    }
}

export class ComponentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ComponentError';
    }
}

export class PermissionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PermissionError';
    }
}

export class BusinessUnitError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BusinessUnitError';
    }
}

export class SchoolError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SchoolError';
    }
}

export class CareerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CareerError';
    }
}

export class CampusError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CampusError';
    }
}

export class SemesterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SemesterError';
    }
}

export class ContactError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ContactError';
    }
}

export class ContactChannelError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ContactChannel';
    }
}