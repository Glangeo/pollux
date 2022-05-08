export interface IFlattenObjectOptions {
  shouldReplaceArrays?: boolean;
}

/**
 *
 * @deprecated
 */
export function flattenObject(
  obj: any,
  options: IFlattenObjectOptions = {}
): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const flatObject = {} as any;

  for (const propName of Object.keys(obj)) {
    const value = obj[propName];

    if (typeof value !== 'undefined' && value !== null) {
      if (typeof value === 'object') {
        _flattenNestedProperty(propName, value, flatObject, options);
      } else {
        flatObject[propName] = value;
      }
    }
  }

  return flatObject;
}

function _flattenNestedProperty(
  parentPropertyName: string,
  source: any,
  result: any,
  options: IFlattenObjectOptions
): void {
  const flattenValue = (value: any, propName: string, result: any) => {
    if (value && typeof value === 'object') {
      _flattenNestedProperty(propName, value, result, options);
    } else {
      result[propName] = value;
    }
  };

  if (Array.isArray(source)) {
    if (options.shouldReplaceArrays) {
      result[parentPropertyName] = source;
    } else {
      for (let i = 0; i < source.length; i++) {
        const flatPropertyName = `${parentPropertyName}.${i}`;

        flattenValue(source[i], flatPropertyName, result);
      }
    }
  } else {
    for (const propName of Object.keys(source)) {
      const value = source[propName];
      const flatPropertyName = `${parentPropertyName}.${propName}`;

      flattenValue(value, flatPropertyName, result);
    }
  }
}
