import { marked } from './Parser';

export interface MetaData {
  created: string;
  modified: Date;
  pinned: boolean;
  favorited: boolean;
  tags: string[];
  // attachments: Attachment[];
}

export interface NoteType {
  title: string;
  content: string;
  meta: MetaData;
}

export class Note {
  private note: NoteType;

  public get data(): NoteType {
    return this.note;
  }

  public get plainNote(): string {
    return this.note.content;
  }

  public set plainNote(newPlainNote: string) {
    this.note.content = newPlainNote;

    let title = this.markdown;
    title = title.trim()
      .replace(/(<([^>]+)>)/ig, '')
      .split('\n')[0]
      .substring(0, 60);

    if (title.length === 0) {
      title = 'No title...';
    }
    this.note.title = title;
  }

  public get title(): string {
    return this.note.title;
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

  public constructor(note?: NoteType) {
    if (note !== undefined) {
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
    } else {
      this.note = {
        title: 'New note.',
        content: '# Your title',
        meta: {
          created: new Date().toString(),
          modified: new Date(),
          tags: [],
          favorited: false,
          pinned: false
        }
      };
    }
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
}
