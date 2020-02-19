# Hello world JavaScript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log. To learn how this action was built, see "[Creating a JavaScript action](https://help.github.com/en/articles/creating-a-javascript-action)" in the GitHub Help documentation.

## Inputs

### `msg-type`

The type of the Work Wechat message, `markdown` or `text`. Default `"text"`.

### `content`

The content of the Work Wechat message. Default `"无话可说"`.

## Outputs

### `time`

The time we call the webhook.

## Example usage

```yaml
uses: pardjs/work-wechat-webhook-action@master
with:
  msg-type: 'text'
env:
  KEY: ${{secrets.WORK_WECHAT_KEY}}
  CONTENT: '说点什么'
  MENTIONED_LIST: 'dozto,do021,bain'
```
