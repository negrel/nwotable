import { marked } from './Parser';

export interface MetaData {
  created: string;
  modified: Date;
  pinned: boolean;
  favorited: boolean;
  tags: string[];
}

export interface NoteType {
  title: string;
  content: string;
  meta: MetaData;
}

export class Note {
  private note: NoteType;

  // Create a default note
  public constructor(note?: NoteType) {
    this.note = {
      title: 'New note.',
      content: '# Your title\n Your stuff here.',
      meta: {
        created: new Date().toString(),
        modified: new Date(),
        tags: [],
        favorited: false,
        pinned: false
      }
    };
  }

  // Setup the object from a File object 'import'
  public async setupFromFile(note: File): Promise<void> {
    const content = await (note as any).text(),
      metaRegex = /(-|<){3,}(.|\n)*(-|>){3,}/,
      metadata = content.match(metaRegex);

    const theNote = {
      title: '',
      content: '',
      meta: {
        created: new Date().toString(),
        modified: new Date(note.lastModified),
        pinned: false,
        favorited: false,
        tags: []
      }
    };
    this.note = theNote;
    this.plainNote = content.replace(metaRegex, '').trim();
  }

  // Setup the object from a note
  public setupFromNote(note: NoteType): void {
    this.note = {
      title: note.title || 'New note.',
      content: note.content || '# Your title',
      meta: {
        created: note.meta.created || new Date().toString(),
        modified: note.meta.modified || new Date(),
        tags: note.meta.tags || [],
        favorited: note.meta.favorited || false,
        pinned: note.meta.pinned || false
      }
    };
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
    this.editMetaData('modified', new Date());
    // Using the setter to detect the title
    this.title = newPlainNote;
  }

  public get title(): string {
    return this.note.title;
  }

  public set title(note: string) {
    let title = note.trim()
      // Removing markdown syntax
      .replace(/[#]+/, '')
      .split('\n')[0]
      .substring(0, 30);

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

  public clone(): Note {
    return new Note(this.note);
  }

  public modified(): void {
    this.note.meta.modified = new Date();
  }

  public download(): void {
    const filename = this.note.title + '.md';
    const file = new File(this.note.content.split(''), filename);

    const a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout((): void => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  public downloadPDF(): void {
    console.log('DOWNLOADING...');
  }

  private editMetaData(meta: string, value: any): string {
    const regex = new RegExp(`/${meta}\s.*\n/`);

    if (typeof value !== 'string') {
      value += '';
    }

    return this.note.content.replace(regex, value);
  }
}
