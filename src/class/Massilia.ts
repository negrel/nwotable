interface Position {
  line: number;
  col: number;
}

export interface MassiliaOptions {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  cursor: Position;
}

const massiliaOptions = {
  fontFamily: 'Hack, Monospace',
  fontSize: 16,
  lineHeight: 24,
  cursor: {
    line: 0,
    col: 0
  }
};

export class Massilia {
  private options: MassiliaOptions;
  private editor: HTMLElement;

  public constructor(el: HTMLElement | null) {
    this.options = massiliaOptions;
    if (el) {
      this.editor = document.createElement('div');
      this.editor.setAttribute('id', 'massilia');
      el.appendChild(this.editor);
      this.createNewLine();
      this.createNewLine();
      this.createCursor();
    }
  }

  private createNewLine(): void {
    const newLine = new Line();

    newLine.addEventListener('focus', (): void => {
      newLine.setAttribute('class', 'line line-focus');
    });

    newLine.addEventListener('blur', (): void => {
      newLine.setAttribute('class', 'line');
    });

    this.editor.appendChild(newLine);
  }

  private createCursor(): void {
    const cursor = document.createElement('div');
    cursor.setAttribute('id', 'massilia-cursor');
    this.editor.getElementsByClassName('line')[0].appendChild(cursor);
  }
};

class Line {
  public isFocused: boolean;
  public cursor: Cursor;

  public constructor(el: HTMLElement | null) {
    if (el) {
      const line = document.createElement('div');
      line.setAttribute('class', 'line');
      el.appendChild(line);
    }
  }
}

class Cursor {
  public col: number

  public constructor(col: number = 0) {
    this.col = col;
  }
}
