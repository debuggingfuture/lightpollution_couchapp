exports.views = {

    lights: {
        map: function (doc) {
            emit(doc.light, null);
        }
    }
};
