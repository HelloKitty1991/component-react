require('./drag');
import { isEqual, transform as _transform, isObject, 
    isArray, get as _get} from 'lodash';


const isLinearArray = function(array) {
    if (!isArray(array)) { throw new Error('arguments must be array'); }
    for (const value of array) {
        if (isArray(value)) { return false; }
    }
    return true;
}

const differenceWithObj = function (objectInput, baseInput, {transform, exclude = []} = {}) {
    function changes(object, base) {
        return _transform(object, (result, value, key) => {
            let exist = false;
            exclude.forEach(item => {
                exist = item.includes(key);
            });
            if (!exist) {
                // Moment对象比较
                if (moment.isMoment(value) && moment.isMoment(base[key])) {
                    if (!moment(value).isSame(base[key])) {
                        if (transform) {
                            result[key] = moment(value).format(value._f);
                        } else {
                            result[key] = value;
                        }
                    }
                } else if (!isEqual(value, base[key])) {
                    if (transform && moment.isMoment(value)) {
                        result[key] = moment(value).format(value._f);
                    } else if (transform && isObject(value) && ('key' in value) && ('label' in value)) {
                        result[key] = value.key;
                    } else {
                        result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
                    }
                }
            }
        });
    }
    return changes(objectInput, baseInput);
}


export {
    isLinearArray,
    differenceWithObj
}