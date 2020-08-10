import React from 'react';
import Exception from '../Exception';
// eslint-disable-next-line import/no-cycle
import CheckPermissions from './CheckPermissions';

/**
 * default is "NULL"
 */
const Exception403 = () => <Exception type="403" />;

export const isComponentClass = component => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

// Determine whether the incoming component has been instantiated
// AuthorizedRoute is already instantiated
// Authorized  render is already instantiated, children is no instantiated
// Secured is not instantiated
const checkIsInstantiation = target => {
  if (isComponentClass(target)) {
    const Target = target;
    return props => <Target {...props} />;
  }
  if (React.isValidElement(target)) {
    return props => React.cloneElement(target, props);
  }
  return () => target;
};

/**
 * authority string, () => boolean | Promise
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */
const authorize = (authority, error) => {
  /**
   * conversion into a class
   * String parameters can cause staticContext not found error
   */
  let classError = false;
  if (error) {
    classError = () => error;
  }
  if (!authority) {
    throw new Error('authority is required');
  }
  return function decideAuthority(target) {
    const component = CheckPermissions(authority, target, classError || Exception403);
    return checkIsInstantiation(component);
  };
};

export default authorize;
