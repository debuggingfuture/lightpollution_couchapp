//I consider it something stupid to use javacsript to model such simple layout
module.exports = {
    equalHeight : function() {
        var maxHeight = 0;
        $('.row.spots').each(function() {
            $(this).children('[class^=span]').each(function() {
                if($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });

            console.log(maxHeight);
            // $(this).children('[class^=span]').height(maxHeight);

        });
        //What if multiple span in a row
        //
    }
};
