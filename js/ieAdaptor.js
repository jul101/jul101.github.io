/**
 * Created by yc_lin on 2015/5/8.
 */
//for those browsers that don't have it.  they still don't have it! but at least they won't crash.
if (!window.console){
    window.console = { time:function (){}, timeEnd:function(){}, group:function (){}, groupEnd:function(){}, log:function(){} };
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
