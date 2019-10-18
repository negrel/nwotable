export class Tag {
  private _name: string;
  private _hasParentTag: boolean;
  private _parent: string;

  public constructor(name: string) {
    const tagName = name.split(' ').join('-'),
      splitted = name.split('/');

    if (splitted.length > 1) {
      this._hasParentTag = true;
      this._parent = splitted.slice(0, -1).join('/');
    } else {
      this._hasParentTag = false;
    }

    this._name = tagName;
  }

  public set name(newName: string) {
    const nameRegex = /^[\w-_]+/;

    if (nameRegex.test(newName)) {
      this._name = newName;
    }
  }

  public get name(): string {
    return this._name;
  }

  public get hasParentTag(): boolean {
    return this._hasParentTag;
  }

  public get parent(): Tag {
    return new Tag(this._parent);
  }
}

export default {
  Tag
};
