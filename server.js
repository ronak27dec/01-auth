import app from "./src/app.js";
import { connectToMongoDB } from "./src/config/database.js";

await connectToMongoDB();

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
