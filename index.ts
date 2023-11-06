import { PORT } from "./globals";
import { app } from "./src/app";
import { database } from "./src/shared/connections/database/mysql";

app.listen(PORT, async () => {
    await database.sync().then(() => console.log('database synced'));
    console.log(`Server is running on port ${PORT}`);
});