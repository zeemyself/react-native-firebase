/**
 * @flow
 * IOSAction representation wrapper
 */
import type { IOSActionOptions, NativeIOSAction } from './types';

export default class IOSAction {
  _actionId: string;
  _options: IOSActionOptions | void;
  _title: string;

  constructor(actionId: string, title: string) {
    this._actionId = actionId;
    this._title = title;
  }

  get actionId(): string {
    return this._actionId;
  }

  get options(): ?IOSActionOptions {
    return this._options;
  }

  get title(): string {
    return this._title;
  }

  /**
   *
   * @param options
   * @returns {IOSAction}
   */
  setOptions(options: IOSActionOptions): IOSAction {
    this._options = options;
    return this;
  }

  build(): NativeIOSAction {
    if (!this._actionId) {
      throw new Error('IOSAction: Missing required `actionId` property');
    } else if (!this._title) {
      throw new Error('IOSAction: Missing required `title` property');
    }

    return {
      actionId: this._actionId,
      options: this._options,
      title: this._title,
    };
  }
}
