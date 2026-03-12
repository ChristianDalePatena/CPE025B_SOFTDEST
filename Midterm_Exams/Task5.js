//modified code
class ValidationError extends Error {
    constructor(fields) {
        super();
        this.fields = fields;
    }
}
function validateSchema(data, schema) {
    const invalidFields = [];

    for (let key in schema) {
        const expectedType = schema[key];
        const actualValue = data[key];

        if (actualValue === undefined || typeof actualValue !== expectedType) {
            invalidFields.push(key);
        }
    }
    if (invalidFields.length > 0) {
        throw new ValidationError(invalidFields);
    }
}
function safeValidate(data, schema) {
    try {
        validateSchema(data, schema);
        return "";
    } catch (err) {
        if (err instanceof ValidationError) {
            return err.fields.join(", ");
        }
        throw err;
    }
}
// Test Code
const userSchema = { name: 'string', age: 'number', active: 'boolean' };
const userData = { name: 'Alice', age: 'thirty', active: 1 };
console.log(safeValidate(userData, userSchema));
