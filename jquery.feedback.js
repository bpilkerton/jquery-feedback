(function($){
    $.fn.extend({ 

        feedback: function(options) {
 
            var defaults = {
                endpoint: 'http://localhost/feedback/handler.php'
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var obj = $(this);
                var content = '<p>Was this information helpful?</p>';
                content += '<form><input onclick="$.fn.feedback.sendFeedback(true)" type="radio" value="yes" name="qfbgroup" />&nbsp;Yes&nbsp;';
                content += '<input onclick="$.fn.feedback.openFeedback()" type="radio" value="no" name="qfbgroup" />&nbsp;No</form></div>';
                obj.html(content);

                $.fn.feedback.openFeedback = function() {
                    var content = '<p>Please help us improve:</p><form><textarea id="qfbData"></textarea>';
                    content += '<br /><p><a href="#" onclick="$.fn.feedback.sendFeedback(false)">Send Feedback</a></p></form>';
                    obj.html(content);
                };

                $.fn.feedback.sendFeedback = function(v) {
                    var fb = (v === true) ? 1 : 0;
                    var d = $("textarea#qfbData").val();
                    $.ajax({
                        type: 'POST',
                        url: options.endpoint,
                        data: {helpful : fb, comment: d},
                        success: function() {obj.html('<p>Thanks for the feedback!</p>');},
                    });
                };

            });
        }

    });
})(jQuery);