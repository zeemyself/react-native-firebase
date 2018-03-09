/**
 * @flow
 * IOSNotifications representation wrapper
 */
import { Platform } from 'react-native';
import IOSCategory from './IOSCategory';
import { getNativeModule } from '../../utils/native';

import type Notifications from './';

export default class IOSNotifications {
  _notifications: Notifications;

  constructor(notifications: Notifications) {
    this._notifications = notifications;
  }

  setCategories(categories: IOSCategory[]): Promise<void> {
    if (Platform.OS === 'ios') {
      if (!Array.isArray(categories)) {
        throw new Error(
          `IOSNotifications:setCategories expects an 'Array' but got type ${typeof categories}`
        );
      }
      const nativeCategories = [];
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        if (!(category instanceof IOSCategory)) {
          throw new Error(
            `IOSNotifications:setCategories expects array items of type 'IOSCategory' but got type ${typeof category}`
          );
        }
        nativeCategories.push(category.build());
      }
      return getNativeModule(this._notifications).setCategories(
        nativeCategories
      );
    }
    return Promise.resolve();
  }
}
