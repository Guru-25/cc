const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI = "mongodb+srv://guru:2004@cluster0.3dqgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas!");
}).catch((error) => {
    console.error("MongoDB Atlas connection error:", error);
});

// here
const DataSchema = new mongoose.Schema({
    text: String,
    number: Number,
    email: String,
    gender: String,
    medicalHistory: String
}, { timestamps: true });

const DataModel = mongoose.model("Data", DataSchema);

app.post("/api/save", async (req, res) => {
    try {
        const newData = new DataModel(req.body);
        await newData.save();
        res.status(201).send({ message: "Data saved successfully", data: newData });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send({ message: "Error saving data" });
    }
});

app.get("/api/retrieve", async (req, res) => {
    try {
        const results = await DataModel.find().sort({ createdAt: -1 });
        res.status(200).send(results);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).send({ message: "Error retrieving data" });
    }
});

app.put("/api/update/:id", async (req, res) => {
    try {
        const updatedData = await DataModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!updatedData) {
            return res.status(404).send({ message: "Data not found" });
        }
        
        res.status(200).send({ message: "Data updated successfully", data: updatedData });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ message: "Error updating data" });
    }
});

app.delete("/api/delete/:id", async (req, res) => {
    try {
        const deletedData = await DataModel.findByIdAndDelete(req.params.id);
        
        if (!deletedData) {
            return res.status(404).send({ message: "Data not found" });
        }
        
        res.status(200).send({ message: "Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).send({ message: "Error deleting data" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});