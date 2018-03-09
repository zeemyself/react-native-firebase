/**
 * @flow
 * IOSCategory representation wrapper
 */
import IOSAction from './IOSAction';
import type { IOSCategoryOptions, NativeIOSCategory } from './types';

export default class IOSCategory {
  _actions: IOSAction[];
  _categoryId: string;
  _hiddenPreviewsBodyPlaceholder: string | void;
  _intentIds: string[];
  _options: IOSCategoryOptions | void;

  constructor(categoryId: string, intentIds: string[]) {
    this._actions = [];
    this._categoryId = categoryId;
    this._intentIds = intentIds;
  }

  get actions(): IOSAction[] {
    return this._actions;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get hiddenPreviewsBodyPlaceholder(): ?string {
    return this._hiddenPreviewsBodyPlaceholder;
  }

  get intentIds(): string[] {
    return this._intentIds;
  }

  get options(): ?IOSCategoryOptions {
    return this._options;
  }

  /**
   *
   * @param action
   * @returns {IOSCategory}
   */
  addAction(action: IOSAction): IOSCategory {
    if (!(action instanceof IOSAction)) {
      throw new Error(
        `IOSCategory:addAction expects an 'IOSAction' but got type ${typeof action}`
      );
    }
    this._actions.push(action);
    return this;
  }

  /**
   *
   * @param hiddenPreviewsBodyPlaceholder
   * @returns {IOSCategory}
   */
  setHiddenPreviewsBodyPlaceholder(
    hiddenPreviewsBodyPlaceholder: string
  ): IOSCategory {
    this._hiddenPreviewsBodyPlaceholder = hiddenPreviewsBodyPlaceholder;
    return this;
  }

  /**
   *
   * @param options
   * @returns {IOSCategory}
   */
  setOptions(options: IOSCategoryOptions): IOSCategory {
    this._options = options;
    return this;
  }

  build(): NativeIOSCategory {
    if (!this._categoryId) {
      throw new Error('IOSCategory: Missing required `categoryId` property');
    } else if (!this._intentIds) {
      throw new Error('IOSCategory: Missing required `intentIds` property');
    }

    return {
      actions: this._actions.map(action => action.build()),
      categoryId: this._categoryId,
      hiddenPreviewsBodyPlaceholder: this._hiddenPreviewsBodyPlaceholder,
      intentIds: this._intentIds,
      options: this._options,
    };
  }
}
