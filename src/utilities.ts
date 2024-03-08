/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item:any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
  
/**
 * Simple array check.
 * @param item
 * @returns {boolean}
 */
export function isArray(item:any) {
    return (item && Array.isArray(item));
}


/**
 * Deep merge two objects.
 * 
 * @param target
 * @param ...sources
 */
export function deepMergeObjects(target:{ [key: string]: any }, ...sources:{ [key: string]: any }[]) {

    if (! sources.length) return target;
    
    const source = sources.shift();
  
    if (! isObject(target) || ! isObject(source)) return deepMergeObjects(target, ...sources);

    for (const key in source) {
        if (! isObject(source[key])) {
            Object.assign(
                target, 
                { [key]: source[key] });
            continue;
        } 

        if (! target[key]) Object.assign(target, { [key]: {} });
        
        deepMergeObjects(target[key], source[key]);
    }
  
    return deepMergeObjects(target, ...sources);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target:{ [key: string]: any }, ...sources:{ [key: string]: any }[]) {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return mergeDeep(target, ...sources);
}