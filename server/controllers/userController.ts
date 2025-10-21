import { Request, Response } from "express";
import admin from "../firebase.js";

const db = admin.firestore();

/** Helper to update Active status for all users under a company */
const updateCompanyUsersStatus = async (company: string, isActive: boolean) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("Company", "==", company).get();

  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.update(doc.ref, { Active: isActive});
  });
  await batch.commit();
};

/** Helper to delete all users under a company */
const deleteCompanyUsers = async (company: string) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("Company", "==", company).get();

  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

/** DEACTIVATE USER OR ALL USERS */
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const { all } = req.query;

    const userRef = db.collection("users").doc(clientId);
    const userDoc = await userRef.get();

    if (!userDoc.exists)
      return res.status(404).json({ success: false, error: "User not found" });

    const user = userDoc.data();
    const company = user?.Company;

    if (all === "true") {
      await updateCompanyUsersStatus(company, false);
      return res.json({
        success: true,
        message: `All users under ${company} have been deactivated.`,
      });
    }

    await userRef.update({ Active: false, isOnline: false });
    res.json({
      success: true,
      message: `User ${clientId} deactivated successfully.`,
    });
  } catch (error) {
    console.error("Deactivate user error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

/** REACTIVATE USER OR ALL USERS */
export const reactivateUser = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const { all } = req.query;

    const userRef = db.collection("users").doc(clientId);
    const userDoc = await userRef.get();

    if (!userDoc.exists)
      return res.status(404).json({ success: false, error: "User not found" });

    const user = userDoc.data();
    const company = user?.Company;

    if (all === "true") {
      await updateCompanyUsersStatus(company, true);
      return res.json({
        success: true,
        message: `All users under ${company} have been reactivated.`,
      });
    }

    await userRef.update({ Active: true });
    res.json({
      success: true,
      message: `User ${clientId} reactivated successfully.`,
    });
  } catch (error) {
    console.error("Reactivate user error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

/**  DELETE USER OR ALL USERS */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const { all } = req.query;

    const userRef = db.collection("users").doc(clientId);
    const userDoc = await userRef.get();

    if (!userDoc.exists)
      return res.status(404).json({ success: false, error: "User not found" });

    const user = userDoc.data();
    const company = user?.Company;

    if (all === "true") {
      await deleteCompanyUsers(company);
      return res.json({
        success: true,
        message: `All users under ${company} deleted successfully.`,
      });
    }

    await userRef.delete();
    res.json({
      success: true,
      message: `User ${clientId} deleted successfully.`,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
