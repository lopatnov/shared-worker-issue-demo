# Shared Worker Issue

- run `npm install` && `npm start` to start simple server with configuration in `server-config.json`
- open <http://localhost:8080/>

Try to test in different browser tabs, you will see that workers are not shared

Try to see chrome://inspect/#workers, you will see that workers are different.

Even with the same text, it creates different shared workers. I can use import script, but still shared workers will be different

Try to import worker from another, from GitHub server, with `importScripts()` function. It can be CORS issue. Workers from different blobs still will be different.

So I need equal Blobs in different tabs or Blobs with the same text should be equal.
