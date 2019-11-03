import { marked } from './Parser';
import { Tag } from './Tag';

// const FuzzySet = require('fuzzyset.js');

export interface MetaData {
  created: string;
  modified: Date;
  pinned: boolean;
  favorited: boolean;
  tags: Tag[];
}

export interface NoteType {
  title: string;
  content: string;
  meta: MetaData;
}

export class Note {
  private note: NoteType;

  // Create a default note
  public constructor() {
    this.note = {
      title: 'New note.',
      content: '# Your title \nYour stuff here.',
      meta: {
        created: new Date().getTime().toString(),
        modified: new Date(),
        tags: [],
        favorited: false,
        pinned: false
      }
    };
  }

  // Setup the object from a File object 'import'
  public setupFromText(content: string): void {
    const metaSearchRegex = /^(-|<){3,}(.|\n)*(-|>){3,}$/m,
      metaSearch = content.match(metaSearchRegex);

    // Remove metadata from imported note
    this.plainNote = content.replace(metaSearchRegex, '').replace('\n', '');

    // Processing metadata to apply it to object
    if (metaSearch) {
      const raw = metaSearch[0],
        metaRegex = /^\w+:\s?.*$/gm,
        metadata = raw.match(metaRegex);

      if (metadata) {
        metadata.forEach((meta): void => {
          const keyRegex = /^\w+/gm,
            propRegex = /:.*;$/gm,
            key = meta.match(keyRegex),
            rawProp = meta.match(propRegex);
          let prop = '';

          if (rawProp) {
            prop = rawProp[0].replace(/(^:|;$)/gm, '');
          }

          if (key) {
            this.editMetaData(key[0], prop);
          }
        });
      }
    }
  }

  // Setup the object from a note
  public setupFromNote(note: NoteType): void {
    this.plainNote = note.content;
    this.addTags(note.meta.tags.map((tag: any): string => tag.fullName));
  }

  public get data(): NoteType {
    return this.note;
  }

  public get plainNote(): string {
    return this.note.content;
  }

  public set plainNote(newPlainNote: string) {
    this.modified();

    this.note.content = newPlainNote;
    // Using the setter to detect the title
    this.title = this.markdown;
  }

  public get title(): string {
    return this.note.title;
  }

  public set title(note: string) {
    // Removing html markup
    let title = note.replace(/<\/?[^>]+(>|$)/g, '')
      .trim()
      .split('\n')[0]
      .substring(0, 60);

    if (title.length === 0) {
      title = 'No title...';
    }
    this.note.title = title;
  }

  public get markdown(): string {
    return marked(this.note.content);
  }

  public get favorited(): boolean {
    return this.note.meta.favorited;
  }

  public set favorited(newBool: boolean) {
    this.note.meta.favorited = newBool;
  }

  public get pinned(): boolean {
    return this.note.meta.pinned;
  }

  public set pinned(newBool: boolean) {
    this.note.meta.pinned = newBool;
  }

  public get created(): string {
    return this.note.meta.created;
  }

  public get tags(): Tag[] {
    return this.note.meta.tags;
  }

  public get allTags(): Tag[] {
    const tags = this.tags;
    let allTags: Tag[] = [];
    tags.forEach((tag: Tag): void => {
      allTags.push(tag);
      allTags.push(...tag.tree);
    });

    allTags = allTags.filter((tag: Tag, pos: number): boolean => {
      const index = allTags.map((el: Tag): string => el.fullName).indexOf(tag.fullName);
      return index === pos;
    });

    return allTags;
  }

  public modified(): void {
    this.note.meta.modified = new Date();
  }

  public downloadMD(): void {
    const fileName = this.note.title + '.md',
      file = new File(this.note.content.split(''), fileName);

    this.download(file);
  }

  public addTag(tag: Tag): void {
    if (!this.hasTag(tag.fullName)) {
      this.note.meta.tags.push(tag);
    }
  }

  public addTags(tags: string[]): void {
    tags.forEach((tag: string): void => {
      this.addTag(new Tag(tag));
    });
  }

  public delTag(tag: Tag): void {
    if (this.hasTag(tag.fullName)) {
      const index = this.note.meta.tags.indexOf(tag);
      this.note.meta.tags.splice(index, 1);
    }
  }

  public hasTag(tagName: string): boolean {
    const index = this.tags.map((element: Tag): string => element.fullName).indexOf(tagName);
    return index >= 0;
  }

  public matchTag(tagName: string): boolean {
    const index = this.allTags.map((element: Tag): string => element.fullName).indexOf(tagName);
    return index >= 0;
  }

  public match(search: string): boolean {
    const res = this.plainNote.match(search);
    if (res) {
      return res.length > 0;
    } else return false;
  }

  public async downloadPDF(): Promise<void> {
    const fileName = this.note.title + '.pdf',
      data = new FormData(),
      file = new File(this.markdown.split(''), fileName);
    data.append('File', file, fileName);
    data.append('PageRange', '10');

    fetch('https://v2.convertapi.com/convert/html/to/pdf?Secret=q4dv5mRUbXhR0rlw', {
      method: 'POST',
      body: data
    }).then((resp): Promise<void> => resp.json())
      .then(async(resp: any): Promise<void> => {
        console.log(resp);
        resp = resp.Files[0];
        console.log(resp);
        resp = new File([resp.FileData], resp.FileName, { type: 'application/pdf' });
        console.log(resp);
        this.download(resp);
      })
      .catch((err: any): void => {
        alert('Error while converting in pdf.');
        console.log(err);
      });
  }

  private download(file: File): void {
    const fileName = file.name;

    const a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout((): void => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  public downloadHTML(): void {
    const fileName = this.note.title + '.html',
      file = new File(this.markdown.split(''), fileName);

    this.download(file);
  }

  private editMetaData(key: string, value: string): void {
    console.log(`CHANGING : ${key} from ${(this.note.meta as any)[key]} to ${value}`);
    switch (key) {
      case 'tags':
        const tags = value.match(/'[^,]+'/g);
        if (tags) {
          this.addTags(tags);
        }
        break;
      case 'favorited':
        const fav = value !== 'false';
        this.note.meta.favorited = fav;
        break;
      case 'pinned':
        const pinned = value !== 'false';
        this.note.meta.pinned = pinned;
        break;
    };
  }
}
