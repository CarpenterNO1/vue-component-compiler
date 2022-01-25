//依赖一个http模块，相当于java中的import，与C#中的using
// const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');

const { createDefaultCompiler, assemble } = require('@vue/component-compiler');
const compiler = createDefaultCompiler();
const path = require('path')

const app = express();
const port = 7010
app.use(express.static(path.join(__dirname, 'static')))
// app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

const vueCode = `<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  
</div>
</template>

<script>
export default {
name: 'HelloWorld',
data () {
  return {
    msg: '哈哈哈哈'
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
font-weight: normal;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
</style>
`;


function compile(source) {
    const descriptor = compiler.compileToDescriptor('RemoteComponent', source);
    const code = assemble(compiler, 'RemoteComponent', descriptor);
    let component = code.code.replace('export default __vue_component__', "return __vue_component__");
    return `(function(){${component}})()`;
}

app.post('/compile', (req, res) => {
    let component = compile(req.body.code);
    res.writeHeader(200, { "Content-Type": "text/javascript", 'Access-Control-Allow-Origin': '*' });
    res.end(component);
})
app.listen(port, () => {
    console.log(`vue component compiler running on port ${port}`)
})

// //创建一个服务器对象
// server = http.createServer(function (req, res) {
//     //设置请求成功时响应头部的MIME为纯文本
    
//     res.writeHeader(200, { "Content-Type": "text/javascript", 'Access-Control-Allow-Origin': '*' });
//     //向客户端输出字符
//     let component = compile(vueCode);
//     res.end(`(function(){${component}})()`);
// });
// //让服务器监听本地8000端口开始运行
// server.listen(8000, '127.0.0.1');
// console.log("server is runing at 127.0.0.1:8000");
