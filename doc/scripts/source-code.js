
var editor;
$('.editor').each(function( index ) {
    editor = ace.edit(this);
	  editor.getValue(this);
      // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("mode-javascript");
});
