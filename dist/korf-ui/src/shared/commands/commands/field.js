"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFieldCommand = exports.DeleteFieldCommand = exports.CreateFieldCommand = void 0;
const uuid_1 = require("uuid");
class CreateFieldCommand {
    constructor(field) {
        this.field = field;
    }
    reduce(state) {
        console.log('Create Field');
        return Object.assign(Object.assign({}, state), { fields: [...state.fields, Object.assign(Object.assign({}, this.field), { id: (0, uuid_1.v4)() })] });
    }
}
exports.CreateFieldCommand = CreateFieldCommand;
class DeleteFieldCommand {
    constructor(id) {
        this.id = id;
    }
    reduce(state) {
        console.log('Delete Field');
        return Object.assign(Object.assign({}, state), { fields: state.fields.filter((t) => t.id !== this.id) });
    }
}
exports.DeleteFieldCommand = DeleteFieldCommand;
class UpdateFieldCommand {
    constructor(field) {
        this.field = field;
    }
    reduce(state) {
        console.log('Update Field');
        return Object.assign(Object.assign({}, state), { fields: state.fields.map((t) => t.id === this.field.id ? this.field : t) });
    }
}
exports.UpdateFieldCommand = UpdateFieldCommand;
//# sourceMappingURL=field.js.map