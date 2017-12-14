'use strict';

/**
 * @author litingting
 * @date 2017-12-14
 * @desc 展示
 */
var Game = {
    init: function(){
       var self = this;
       self.canvas = document.getElementById('J_stage');
       self.stage = new createjs.Stage(self.canvas);
       self.designWidth = 1334;
       self.designHeight = 750;

       self.preload(function(){
           self.render();
       });

       var i = 1,   
           modes = [
               createjs.view.CONTAIN,
               createjs.view.COVER,
               createjs.view.FILL,
               createjs.view.FIXED_WIDTH,
               createjs.view.FIXED_HEIGHT
           ];
       createjs.view.setViewMode(self.stage, self.designWidth, self.designHeight, modes[0], function(){
           // 做任何你所需要的游戏内容层面的适配操作
           console.log("resize")
       });
       
       this.stage.addEventListener("click",function(){
           self.text.text = modes[i % modes.length].name;
           createjs.view.setViewMode(self.stage, self.designWidth, self.designHeight, modes[i % modes.length], function(){
               // 做任何你所需要的游戏内容层面的适配操作
               console.log("resize")
           });
           i++;
       })

       createjs.Ticker.addEventListener("tick", function (e) {
           if (!e.paused) { // 通过paused属性来控制是否刷新
               // 刷新舞台
               self.stage.update(e);
           }
       });

    },
    render: function(){
       var self = this;
       var shape = new createjs.Shape();
       shape.graphics.beginFill("#000000").drawRect(0, 0, self.designWidth, self.designHeight);
       createjs.view.adjustFullSize(shape.graphics);

       var pa = new createjs.Bitmap(self.loader.getResult("path"));
       pa.y = self.designHeight - pa.getBounds().height;
       
       var bg = new createjs.Bitmap(self.loader.getResult("bg"));
       bg.y = self.designHeight - pa.getBounds().height - bg.getBounds().height + 80;

       var music1 = new createjs.Bitmap(self.loader.getResult("music"));
       var music2 = new createjs.Bitmap(self.loader.getResult("music"));
       var music3 = new createjs.Bitmap(self.loader.getResult("music"));
       var music4 = new createjs.Bitmap(self.loader.getResult("music"));
       music1.right = 0;
       music1.top = 0;

       music2.left = 100;
       music2.top = 100;

       music3.right = 109;
       music3.bottom = 109;

       music4.left = 0;
       music4.bottom = 0;

       createjs.view.adjustPosition(music1, music2, music3);
       createjs.view.adjustPosition(music4)

       self.text = new createjs.Text("CONTAIN", "80px Arial", "#ffffff");
       self.text.y = 300;
       self.text.x = 300;

       [music1, music2, music3, music4].map(function(item){
           item.times = 0;
           item.addEventListener("click", function(e){
               e.stopPropagation();
               if(item.times % 2 === 0) {
                   item.rotation = 45;
               }else {
                   item.rotation = 0;
               }
               item.times++;
           })
       })
       this.stage.addChild(shape, bg, pa, music1, music2, music3, music4, self.text);   
    },
    preload: function(callback){
       var loader = new createjs.LoadQueue();
       var files = [
           {id:"bg",src: "/ting/CreateJSView/images/sprite_midgr@2x.png"},
           {id:"path",src: "/ting/CreateJSView/images/sprite_path@2x.png"},
           {id:"music",src: "/ting/CreateJSView/images/music@2x.png"},
       ]
       loader.loadManifest(files);
       loader.on("complete",function(){
           console.log("加载完毕")
           callback && callback();
       });
       this.loader = loader;
    }
}

window.onload = function(){
    Game.init();
}