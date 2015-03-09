;(function($, window, document, undefined){
"use strict";


function MySound2() {
  var self = this;
  self.$start = $('.js-jplayer-start');
  self.$stop = $('.js-jplayer-stop');
  
  var playItem = 0;
  
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
  
  $('.jplayer').each(function( i ) {
    var $me = $(this),
        id = $me.attr('data-sound-id');
    self.sound[ id ]['sound'] = $me.jPlayer({
      ready: function() {
        console.log('jPlayer ready');
        
        $(this).jPlayer('setMedia', {
          mp3: 'assets/sound/'+ id +'.mp3'
        });
      },
      supplied: 'mp3'
    });
  });
  
  self.setEvent();
}

MySound2.prototype = {
  
  
  play: function( id ) {
    var self = this;
    self.sound[id].sound.jPlayer('play');
  },
  
  
  stop: function( id ) {
    var self = this;
    self.sound[id].sound.jPlayer('stop');
  },
  
  
  setEvent: function() {
    var self = this;
    
    self.$start.click(function() {
      var $me = $(this),
          id = $me.attr('data-sound-id');
      //if( self.sound[id].playing ) return false;
      //self.start( self.sound[id].sound );
      //self.sound[id].playing = true;
      self.play( id );
      return false;
    });
    
    self.$stop.click(function() {
      var $me = $(this),
          id = $me.attr('data-sound-id');
      self.stop( id );
      return false;
    });
  }
  
}


window.MySound2 = MySound2;

})(jQuery, this, this.document);