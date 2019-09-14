import * as marked from 'marked';

export interface MetaData {
  created: Date;
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

  public set data(newNote: NoteType) {
    this.note = newNote;
  }

  public get parsedNote(): string {
    return this.note.content;
  }

  public get markdown(): string {
    return marked(this.note.content);
  }

  public constructor(note?: NoteType) {
    if (note) {
      this.note = note;
    } else {
      this.note = {
        title: 'New note.',
        content: '# Your title',
        meta: {
          created: new Date('15-10-2000'),
          modified: new Date('11-09-2019'),
          tags: ['example'],
          favorited: false,
          pinned: true
        }
      };
    }
  }
}
