import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SnapAttend Backend Running 🚀");
});

app.get("/test-db", async (req, res) => {

    const { data, error } = await supabase
        .from("teachers")
        .select("*");

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);

});

export default app;