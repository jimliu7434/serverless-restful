# serverless-restful

## 開發方式
1. 安裝 node.js 8 up
2. 安裝 global module `serverless` 
```
npm i -g serverless
```
3. 註冊 AWS ，並開通一組 Access Token
4. 使用 serverless CLI 進行 AWS 登入
登入方式請參考 `serverless` Quick Start
[https://github.com/serverless/serverless#quick-start]
5. 開發完成，進行 Deploy
```
serverless deploy
```
上傳至 AWS
