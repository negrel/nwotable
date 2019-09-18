import * as marked from 'marked';

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

  public get markdown(): string {
    return marked(this.note.content);
  }

  public set markdown(newMarkdown) {
    this.note.content = newMarkdown;
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
