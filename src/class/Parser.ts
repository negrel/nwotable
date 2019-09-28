import Store from '../store/store';

const showdown = require('showdown');
const parser: showdown.Converter = new showdown.Converter();
parser.setFlavor('github');

export function marked(input: string): string {
  let html = parser.makeHtml(input);

  const storeAttachments = Store().state.NoteAttachment.attachmentList,
    storeAttachmentsName = storeAttachments.map((el: any): void => el.name),
    attachRegex = /src="@attachment\/\w+\.+\w+"/g,
    res = html.match(attachRegex),
    attachList: number[] = [];

  if (res) {
    res.forEach((element: string): void => {
      // Removing the ' " ' from the string
      element = element.substring(0, element.length - 1);
      // Getting the file name.
      const name = element.split('@attachment/')[1],
        index = storeAttachmentsName.indexOf(name);
      // Pushing url of the attachment.
      if (index !== -1) {
        attachList.push(storeAttachments[index].url);
      }
    });
  }
  for (let i = 0, length = attachList.length; i < length; i++) {
    html = html.replace(/src="@attachment\/.*"/, `src="${attachList[i]}"`);
  }

  return html;
}

export default {
  marked
};
