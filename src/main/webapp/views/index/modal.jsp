<div class="row-fluid">
        <h3>This is how the Simple Modal was launched</h3>
        <div>
                <div class="codebox">
<pre>
createDialog(<span style="color:red">'simpleModal.html'</span>, {
    id : 'simpleDialog',
    title: 'A Simple Modal Dialog',
    backdrop: true,
    success: {
        label: 'Yay',
        fn: function(){
            console.log('Simple modal closed');
        }
    }
});
</pre>
                </div>
        </div>
</div>