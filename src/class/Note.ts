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

  public get data(): NoteType {
    return this.note;
  }

  public get plainNote(): string {
    return this.note.content.substring(0);
  }

  public set plainNote(newPlainNote: string) {
    this.note.content = newPlainNote;
    // let title = newPlainNote.trim()
    //   .replace(/#+/g, '')
    //   .replace(/(\[.* |\!\[.*|^\>|\*)?/, '')
    //   .replace(/\<\/?.*\/?>/, '')
    //   .split('\n')[0]
    //   .substr(0, 30);
    let title = this.markdown.trim()
      .replace(/(<([^>]+)>)/ig, '')
      .split('\n')[0]
      .substring(0, 60);

    if (title.length === 0) {
      title = 'No title...';
    }

    this.note.title = title;
  }

  public get markdown(): string {
    const res = marked(this.note.content);
    return res;
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
    if (note) {
      this.note = note;
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
}
