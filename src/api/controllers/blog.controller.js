const con = require('../../config/database.js')
const blogModule = require('../../modules/blog.js')
const createError = require('../../helper/error.js');

const Blog = () => {
    return {
        createBlog: async (req, res) => {
            try {
                value = [req.body.image, req.body.title, req.body.subtitle, req.body.date, req.body.blogby, req.body.html]
                const response = await blogModule.create_blog(value);
                return res.status(200).json({"message": "Blog added successfully"
                    ,response});
            } catch (error) {
                return error
            }

        },

        updateBlog: (req, res) => {
            const id = req.params.id
            const updated_value = [req.body.image, req.body.title, req.body.subtitle, req.body.date, req.body.blogby, req.body.html]
            blogModule.updateBlog(id, updated_value, (error, data) => {
                if (data.affectedRows === 0) {
                    res.status(500).json({ error: "Please input proper fileds otherwise you input same data." })
                }else{
                    res.status(200).json({ message: 'Record updated successfully.' })
                }
            })
        },

        deleteBlog: (req, res, next) => {
            const id = req.params.id
            blogModule.deleteBlog(id, (error, results) => {
                if (results.affectedRows===0){
                    res.status(404).json({error:'Blog with the ID: '+id+' does not exist.'});
                }else{
                    res.status(200).send({message:'Blog has been deleted succsesfully'});

                }
                
            })
        },

        getallBlog: (req, res, next) => {
            blogModule.getallBlog(function(error, data) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error getting blogs',
                        error: error
                    });
                }
                return res.status(200).json({
                    status: "success",
                    data});
            })
        },

         getBlog: (req, res, next) => {
            const id = req.params.id;
            blogModule.getBlog(id, function (error, data) {
                if (data === undefined) {
                    return res.status(404).json({
                        message: 'Error getting blog by id: ' + id,
                    });
                }else{
                    return res.status(200).json(data);
                }
                
            })
        }
    }
}
module.exports = Blog