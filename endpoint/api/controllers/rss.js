const rssModel = require ('../Models/rss');

const controller = {
    //Controller Get All Rss
    getRss: (req, res) => {
        const page = pagination(req);
        rssModel.getRss(req, page)
        .then (response => {
            if (response.length != 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Cannot Found Rss");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
            console.log (error);
        })
    },
    //Controller Get rss By Id
    getRssById: (req, res) => {
        rssModel.getRssById(req)
        .then (response => {
            if (response.length > 0) {
                form.success (res, 200, response);
            } else {
                form.error (res, 400, "Rss ID Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Post New rss
    postRss: (req, res) => {

        //Chek All Field
        if (req.body.id == null || req.body.id == "") {return form.error (res, 400, "Rss Id Cant Be Empty")}
        if (req.body.description == null || req.body.description == "") {return form.error (res, 400, "Description Cant Be Empty")}
        if (req.body.image == null || req.body.image == "") {return form.error (res, 400, "Image Cant Be Empty")}
        if (req.body.audio == null || req.body.audio == "") {return form.error (res,400, "Audio cannot be Empty")}

        categoryModel.getCategoryById(req)
        .then (response => {
            if (response.length != 0) {
                rssModel.getRssById(req)
                .then(response =>{
                    if (response.length == 0) {
                        rssModel.postRss (req)
                        .then (response => {
                            rssModel.getRssById (req, response.insertId)
                            .then(response => {
                                form.success (res, 200, response);
                            })
                            .catch(error => {form.error (res, 400, error)})
                        })
                        .catch (error => {
                            form.error (res, 400, error);
                        })
                    } else {
                        form.error (res, 400, "Rss Id Is Already Exist");
                    }
                })
                .catch(error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Category Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Update Rss By Id
    updateRss: (req, res) => {

        //Chek All Field
        if (req.body.id == null || req.body.id == "") {return form.error (res, 400, "Rss Id Cant Be Empty")}
        if (req.body.description == null || req.body.description == "") {return form.error (res, 400, "Description Cant Be Empty")}
        if (req.body.image == null || req.body.image == "") {return form.error (res, 400, "Image Cant Be Empty")}
        if (req.body.audio == null || req.body.audio == "") {return form.error (res,400, "Audio cannot be Empty")}

        rssModel.getRssById (req)
        .then (response => {
            if (response.length != 0) {
                rssModel.getRssById (req)
                .then(response => {
                    if (response.length != 0 && response[0].id != Number(req.params.id)) {
                        form.error (res, 400, "Rss Id Already Exist");
                    } else {
                        rssModel.checkCategory (req)
                        .then(response => {
                            if (response.length != 0) {
                                rssModel.updateRss (req)
                                .then (response => {
                                    rssModel.getRssById (req, response.insertId)
                                    .then(response => {
                                        form.success (res, 200, response);
                                    })
                                    .catch(error => {form.error (res, 400, error)})
                                })
                                .catch (error => {
                                    form.error (res, 400, error);
                                })
                            } else {
                                form.error (res, 400, "Category Id Not Found");
                            }
                        })
                        .catch(error => {
                            form.error (res, 400, error);
                        })
                    }
                })
                .catch(error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Rss Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    },
    //Controller Delete rss By Id
    deleteRss: (req, res) => {
        
        const id = req.params.id;

        rssModel.getRssById (req)
        .then (response => {
            if (response.length > 0) {
                rssModel.deleteRss (req)
                .then (response => res.json({
                    status: 200,
                    id:id
                }))
                .catch (error => {
                    form.error (res, 400, error);
                })
            } else {
                form.error (res, 400, "ID Rss Not Found");
            }
        })
        .catch (error => {
            form.error (res, 400, error);
        })
    }
}

module.exports = controller;


