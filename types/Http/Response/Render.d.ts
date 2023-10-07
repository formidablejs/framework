import HtmlResponse from './HtmlResponse'

class HtmlTemplate {
  constructor(strings: ReadonlyArray<string>, ...keys: unkown[]);

  /**
   * Get html string
   */
  html(): string;
}

const html = (template: ReadonlyArray<string>, ...keys: unkown[]) => HtmlTemplate;
const render = (template: HtmlTemplate, data: unkown) => HtmlResponse;

export {
  HtmlTemplate,
  html,
  render
}
