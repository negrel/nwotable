export class Tag {
  private _fullName: string;
  private _hasParentTag: boolean;
  private _parent: string;

  public constructor(name: string) {
    const splitted = name.split('/');

    if (splitted.length > 1) {
      this._hasParentTag = true;
      this._parent = splitted.slice(0, -1).join('/');
    } else {
      this._hasParentTag = false;
    }

    this._fullName = name;
  }

  public get fullName(): string {
    return this._fullName;
  }

  public set fullName(fullName: string) {
    this._fullName = fullName;
  }

  public get name(): string {
    const splitted = this._fullName.split('/');
    return splitted[splitted.length - 1];
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
