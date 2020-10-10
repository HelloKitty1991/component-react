## V1.0.1
* 修改Select组件中showSearch的判断

## V1.1.0
* 新增form表单组件

## V1.1.1
* 新增Form表单字段隐藏，可见属性
* 原有Form表单Bug修改

## V1.1.2
 * 新增Form表单文本字段类型
 * 新增ExportButton控件的扩展名，导出前事件及样式属性

## V1.1.3
* 修改Form表单label的在didMount后对其方式有误bug

## V1.1.4
* 添加ExportButton的报错信息兼容

## V1.2.0
* 添加AutoComplete组件

## V1.2.1
* 修改AutoComplete组件选中值以对象的形式返回

## V1.2.2
* 修改AutoComplete组件选中值以对象字符串的形式返回， 以修改在Form表单中使用时报错的bug

## V1.2.3
* 去掉AutoComplete组件中onChange事件的延迟，以修改在Form表单中使用时报错的bug

## V1.2.4
* 应用state管理AutoComplete组件的value值，恢复onChange的事件延迟机制。

## V1.2.5
* 修改Input组件中值的空判断的bug

## V1.3.0
* 新增Region组件

## V1.3.1
* 修改Region首次不能选择的bug

## V1.3.2
* 去掉Region组件中大小的控制


## V1.3.3
* 新增AutoComplete组件的maxLength属性

## V1.3.4
* 修复AutoComplete组件中maxLength属性引起的闪烁bug

## V1.3.5
* 更改组件之间的引用方式
* 修改index.js的写法为commonJS的方式

## V1.3.6
* 修改utils文件夹中的文件的写法为commonJS的方式

## V1.3.7
* AutoComplete组件bug修改 

## V1.3.8
* AutoComplete组件清空bug修改

## V1.3.9
* Input组件MaxLength属性bug修改

## V1.3.10
* antd包版本调整

## V1.3.11
* Input组件新增防抖开关

## V1.3.12
* TextArea组件新增防抖开关

## V1.4.0
* Form组件新增date, datetime, month, week四种字段类型 

## V1.4.1
* 解决Textarea组件中rows属性和autosize属性冲突的bug

## V1.4.2
* 新增Input组件中的ref引用

## V1.4.3
* 根据表单中addOnAfter属性，调整Input组件中清除按钮的位置

## V1.4.4
* 修改AutoComplete组件中，输入纯数字过长后被转换成为科学计数法的bug

## V1.4.9
* 备案信息footer组件添加“Copyright © 1999-2020 成都路行通信息技术有限公司版权所有”

## V1.4.25
* 修改form表单中使用label作为了表单项的key的bug

## V1.5.0
* Form表单中新增分组功能

## V1.5.1
* 修复Form表单中label为自定义React组件时的bug
* 根据Form表单中分组字段中display的值选择性的进行渲染。

## V1.5.2
* 修改Form表单项中没有label值的时候的渲染问题。
* 修改整个表单的布局为display: inline-block;
* 修复Input组件不响应maxLength变化的BUG

## V1.5.3
* 调整表单样式


## V1.5.4
* 集中处理组件样式文件， 同时编译less为css文件

## V1.6.0
* 修改表单项中自定义组件中没有注入表单相关属性的bug
* 修改表单项中错误信息的排版方式
* 修改表单项中内容过多的时候显示...的问题
* 修改表单中Input, Textarea中属性没有变化的bug
* 去除antd组件库中Input的清除按钮
* 修改表单项验证出现错误和错误信息消失的时候页面闪烁的问题
* 去除在klc-form中input[type="number"]框中浏览器自带的微调按钮
* 添加labelInset属性，修改表单项显示样式
* 添加Select的推荐术语
* 使用ant-row组件包裹formItem, 减小FormItem的底部间距，出现错误或提示的时候撑开
* 表单字段顺序错乱的bug修复
* 修复表单中Input组件的clear按钮样式错乱的问题
* 给Input和TextArea添加默认title显示value信息
* 添加labelOutset属性，修改表单项中显示样式，在labelInset属性为true时起作用
* 添加colon属性，控制表单项中标题冒号显示问题
* 添加colStyle属性，修改表单项中样式