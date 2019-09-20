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

  public set plainNote(newplainNote) {
    this.note.content = newplainNote;
  }

  public get markdown(): string {
    return DOMPurify.sanitize(marked(this.note.content));
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
