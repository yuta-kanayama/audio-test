;(function($, window, document, undefined){
"use strict";

function MySound1() {
  var self = this;
  self.$start = $('.js-soundjs-start');
  self.$stop = $('.js-soundjs-stop');
  
  var queue = new createjs.LoadQueue(true);
  queue.installPlugin( createjs.Sound );
  
  //読み込むファイルを記述（複数可能）
  var manifest = [{
    id: 'n46',
    src: 'assets/sound/n46.mp3'
  },{
    id: 'n25',
    src: 'assets/sound/n25.mp3'
  }];
  
  self.sound = {};
  for( var i = 0, len = manifest.length; i < len; i++ ) {
    self.sound[ manifest[i].id ] = {
      index: i,
      //src: manifest[i].src,
      playing: false,
      loaded: false,
      sound: null
    };
  }
  //console.table( sound );
  
  queue.loadManifest( manifest, true );
  
  //manifestで指定したファイルが１つ読み込まれるごとに実行される
  //このサンプルでは１ファイルのみなので細かい処理割愛
  queue.addEventListener('fileload', $.proxy( self.handleFileLoad, self ) );
  queue.addEventListener('complete', function() {
    self.setEvent();
  });
}

MySound1.prototype = {
  
  
  handleFileLoad: function( event ) {
    var self = this;
    self.sound[ event.item.id ].loaded = true;
    self.sound[ event.item.id ].sound = createjs.Sound.createInstance( event.item.id );
    console.table( self.sound );
  },
  
  
  start: function( sound ) {
    //sound.setVolume(0.1); //ボリュームを設定
    sound.play();
  },
  
  
  stop: function( sound ) {
    sound.stop();
  },
  
  
  setEvent: function() {
    var self = this;
    
    self.$start.click(function() {
      var $me = $(this),
          id = $me.attr('data-sound-id');
      if( self.sound[id].playing ) return false;
      self.start( self.sound[id].sound );
      self.sound[id].playing = true;
      return false;
    });
    
    self.$stop.click(function() {
      var $me = $(this),
          id = $me.attr('data-sound-id');
      if( !self.sound[id].playing ) return false;
      self.stop( self.sound[id].sound );
      self.sound[id].playing = false;
      return false;
    });
  }
  
}


window.MySound1 = MySound1;

})(jQuery, this, this.document);