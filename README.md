# jquery-scrollAddclass


## デモページ
[Demo page - scrollAddClass](http://azure-eyed-cat.com/demo/2017/01/)


## 使い方
- headerにjQuery本体とimagesLoadedのプラグイン、本プラグインを読み込み  
- 本プラグインを呼び出す為のjsファイルを用意し、headerのプラグイン用のファイルの後若しくはページの下部にjsを設置
- 追加したclassで動作させるためのcssファイルを用意


## 使用例
フェードインさせたい場合
### js
```
// optionのclassNameには要素に追加するクラス名を記述
// devideHeightは画面の高さを割る数
// timeoutは実行までの待機時間
var $fadeIn = $('#js-fadeIn');
var fadeInOptions = {
  className: 'fadeIn',
  devideHeight: 2,
  timeout: 500
};
$fadeIn.scrollAddClass(fadeInOptions);
// 要素が画面の高さの1/2まで移動して500ms後に要素をフェードインするclassをつける
```

### css
```
.main .js-fadeIn {
  -ms-filter: "alpha(opacity=0)";
  opacity: 0;
  transition: all 0.9s linear;
  -webkit-transition: all 0.9s linear;
  -moz-transition: all 0.9s linear;
  -o-transition: all 0.9s linear;
  -ms-transition: all 0.9s linear;
}

.main .js-fadeIn.fadeIn {
  -ms-filter: "alpha(opacity=100)";
  opacity: 1;
}

```


## 併用しているプラグイン
画面の高さを正確に測る為、imagesLoadedというjQueryプラグインを併用しています。


### imagesLoaded
imagesLoaded is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
