import { cert, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
  credential: cert(JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT)),
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST", "OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method === "POST") {
    try {
      const { id, disabled, email, newPassword, api } = req.body;

      switch (api) {
        case `updateAccountStatus`:
          await admin.auth().updateUser(id, { disabled: disabled });
          return res
            .status(200)
            .json({ message: "Account status have been updated" });
        case `deleteAccountByEmail`:
          const userRecord = await getAuth().getUserByEmail(email);
          await getAuth().deleteUser(userRecord.uid);
          return res
            .status(200)
            .json({ message: "User deleted successfully." });
        case `resetAccountPassword`:
          await admin
            .auth()
            .updateUser(id, { password: newPassword, disabled: true });
          return res
            .status(200)
            .json({ message: "Password updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch", details: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
