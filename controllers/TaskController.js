const Task = require("../models/TaskModel");
const asyncHandler = require("express-async-handler");

const newTasks = asyncHandler(async(req, res) => {
    try {
        const { title, description } = req.body
        const newTask = new Task({
            title,
            description
        });
        if(!title) {
            throw new Error("Judul task tidak boleh kosong");
        } else {
            const data = await newTask.save();
            res.status(201).json({
                status : "SUCCESS",
                message: "Task baru berhasil disimpan",
                ...data._doc
            });

        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status : "ERROR",
            message : error.message
        });
    }
})

const getAllTask = async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            status: "SUCCESS",
            data : tasks
        });

    } catch (error) {
        res.status(400).json({
            status : "ERROR",
            data : null
        })
    }
}

const getTaskById = asyncHandler( async(req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id).exec();

        if(!task) {
            throw new Error(`Data task dengan ID : ${id} tidak ditemukan`);
        } else {
            res.status(200).json({
                status: "SUCCESS",
                ...task._doc
            });
        }

    } catch (error) {
        res.status(400).json({
            status : "ERROR",
            message : error.message,
            data: null
        });
    }
})

const updateTask = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id;
        const { title, description, completed} = req.body;

        const updated = await Task.findByIdAndUpdate(id, {title, description, completed});
        
        if(!title) {
            throw new Error("Judul task tidak boleh kosong");
        }

        if(!updated) {
            throw new Error("Data task gagal diperbarui");
        } else {
            const task = await Task.findById(id).exec();;
            res.status(200).json({
                status : "SUCCESS",
                message: "Data task berhasil diubah",
                ...task._doc
            });

        }

    } catch (error) {
        res.status(400).json({
            status: "ERROR",
            message : error.message,
            data : null
        })
    }
})

const deleteTask = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        
        if(!task) {
            throw new Error(`id : ${id} tidak ditemukan di data task, harap masukkan id dengan benar`);
        } else {
            const data = await Task.deleteOne({_id : id});
            if(data.deletedCount == 1) {
                res.status(200).json({
                    status : "SUCCESS",
                    message : "Data task berhasil dihapus"
                });
            } else {
                throw new Error("Data task gagal dihapus");
            }

        }
    } catch(error) {
        res.status(400).json({
            status : "ERROR",
            message : error.message
        });
    }
})

module.exports = { getAllTask, getTaskById, newTasks, updateTask, deleteTask};