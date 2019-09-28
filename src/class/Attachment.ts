export class Attachment {
  private fileName: string;
  private objectURL: string;

  public constructor(file: File) {
    this.fileName = file.name;
    this.objectURL = URL.createObjectURL(file);
  }

  public get name(): string {
    return this.fileName;
  }

  public get url(): string {
    return this.objectURL;
  }
}
