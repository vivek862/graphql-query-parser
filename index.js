
const getValue = function (value) {
    if (typeof value === 'string') {
        return "\"" + value + "\"";
    }
    if (Array.isArray(value)) {
        return "[" + value.map((v) =>{
            return getValue(v);
        }).join(', ') + "]";
    }
    if (value !== null && typeof value === 'object') {
        return "{" + Object.keys(value).map((v) => {
            return v + ':' + getValue(value[v]);
        }) + "}";
    }
    return value;
};

export default function getQueryString (query, type) {
    let result = [type + " {"];
    Object.keys(query).forEach(function (name) {
        let q = query[name];
		result.push(q.alias ? `${q.alias}:${name}` : name);
        if (q.variables) {
            let queryString = Object.keys(q.variables).map((v) =>{
                return v + ":" + getValue(q.variables[v]);
            }).join(', ');

            result.push("(" + (type === 'mutation' ? 'input: \{' + queryString + '}' : queryString) + ")");
        }
        result.push("{ " + q.result + " }");
    });
    result.push('}');
    return result.join(' ');
};
