const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;
const {ok} = require('assert')

try {
  // `who-to-greet` input defined in action metadata file
  const msgType = core.getInput('msg-type') || process.env.MSG_TYPE || 'text';
  const content = core.getInput('content') || process.env.CONTENT || '无话可说';
  const data = msgType === 'markdown' 
    ? { msgtype: 'markdown', markdown: { content } } 
    : { msgtype: 'text', markdown: { content, mentioned_list: (process.env.MENTIONED_LIST || '').split(',') } }
  ok(process.env.KEY, 'key should be provided');
  axios.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.KEY}`, data, {
    headers: {'Content-Type': 'application/json'}
  }).then((res) => {
    console.log('wechat response: %j', res.data)
  }).catch(err => {
    throw new Error(err.message);
  });
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
