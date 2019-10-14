import Store from '../store/store';

const showdown = require('showdown'),
  highlight = require('showdown-highlight');
const parser = new showdown.Converter({
  extensions: [highlight]
});
parser.setOption('parseImgDimensions', true);
parser.setOption('tables', true);
parser.setOption('emoji', true);
parser.setOption('metadata', true);

// Detect link to other note and image attachment
// const noteRegex = /\[([^\[]+)\]\(@note\/.*\w+\)/,
const imgRegex = /src="@attachment\/[^><:"/\\|?*]+"/;

function imgAttachment(html: string): string {
  // Checking for image attachment

  const storeAttachments = Store().state.Attachments.attachmentList,
    storeAttachmentsName = storeAttachments.map((el: any): void => el.name),
    globalImgRegex = new RegExp(imgRegex, 'g'),
    res = html.match(globalImgRegex),
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
    html = html.replace(imgRegex, `src="${attachList[i]}"`);
  }
  return html;
}

function noteAttachment(html: string): string {
  // const res = html.match(noteRegex);
  // console.log(res);

  return html;
}

export function marked(input: string): string {
  let html = parser.makeHtml(input);

  html = imgAttachment(html);
  html = noteAttachment(html);

  return html;
}

export default {
  marked
};
