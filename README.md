# CreateJSView
> 基于CreateJS框架的H5轻互动游戏的横屏适配插件

## 实现原理
前往阅读文章[《H5游戏开发：横屏适配》](https://aotu.io/notes/2017/10/18/landscape_mode_in_html5_game/)


## API
### 1. `createjs.view.CONTAIN`
内置的 CONTAIN 模式


### 2. `createjs.view.COVER`
内置的 COVER 模式


### 3. `createjs.view.FILL`
内置的 FILL 模式


### 4. `createjs.view.FIXED_WIDTH`
内置的 FIXED_WIDTH 模式


### 5. `createjs.view.FIXED_HEIGHT`
内置的 FIXED_HEIGHT 模式


### 6. `createjs.view.setViewMode`
> createjs.view.setViewMode( stage, designWidth, designHeight, mode, resizeCallback )

为舞台设置合适的缩放适配模式，用于在横屏游戏场景进行横屏适配。

参数:
- stage {obj} 舞台对象
- designWidth {number} 设计稿宽度
- designHeight {number} 设计稿高度
- mode {obj} 内置五种缩放适配模式之一，如createjs.view.CONTAIN
- resizeCallback resize回调函数

使用示例：
```javascript
// 例如，缩放适配为CONTAIN模式
createjs.view.setViewMode(stage, designWidth, designHeight, createjs.view.CONTAIN, function(){
  console.log("resize"); //做任何你所需要的游戏内容层面的适配操作
})
```

### 7. `createjs.view.adjustFullSize`
> createjs.view.adjustFullSize( item )

用于重绘制那些以舞台区域宽高大小作为其大小设置的参考标准的全屏类元素，避免留空情况。

参数:
- item {displayObject} 需要被重绘制的对象

使用示例：
```javascript
// shape.graphics 是依据舞台大小为标准的全屏图形
shape.graphics.beginFill("#000000").drawRect(0, 0, self.designWidth, self.designHeight);

// 加入重绘制处理
createjs.view.adjustFullSize(shape.graphics);
```


### 8. `createjs.view.adjustPosition`
> createjs.view.adjustPosition( item )

用于重定位舞台贴边元素，避免被裁剪的情况。

参数:
- item {displayObject} 需要被重定位的对象

使用示例：
```javascript
// 首先，设置 top 、right 、bottom 、left 属性，以确定它的贴边位置
music1.right = 0;
music1.top = 0;

music2.left = 100;
music2.top = 100;

music3.right = 109;
music3.bottom = 109;

music4.left = 0;
music4.bottom = 0;

// 最后，把对象加入重定位处理
createjs.view.adjustPosition(music1, music2, music3, music4);
```

## 许可
MIT
