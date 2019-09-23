import * as marked from 'marked';
import * as DOMPurify from 'dompurify';

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
    let title = newPlainNote.trim()
      .replace(/#+/g, '')
      .replace(/(\[.* |\!\[.*|^\>|\*)?/, '')
      .split('\n')[0]
      .substr(0, 30);

    if (title.length === 0) {
      title = 'No title...';
    }

    this.note.title = title;
  }

  public get markdown(): string {
    const res = DOMPurify.sanitize(this.note.content.split(/\s{2,}/g)
      .map((el: string): string => marked(el))
      .join());
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
}
