import { connectDB } from "@/config/dbConfig";
import UsersModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";
import { useRadio } from "@nextui-org/react";

connectDB();

export const handleNewUserRegistration = async () => {
  try {
    const loggedInUser = await currentUser();

    console.log(
      "[handleNewUserRegistration] loggedInUser.id:",
      loggedInUser?.id
    );

    // check if the user is already registered
    const userExists = await UsersModel.findOne({
      clerkUserId: loggedInUser?.id,
    });

    if (!userExists) {
      // create a new user
      const newUser = new UsersModel({
        userName:
          loggedInUser?.username ||
          `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
        email: loggedInUser?.emailAddresses[0].emailAddress,
        clerkUserId: loggedInUser?.id,
      });

      await newUser.save();
      return newUser;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMongoDBUserIdOfLoggedInUser = async () => {
  try {
    const loggedInUser = await currentUser();

    // console.log("[getMongoDBUserIdOfLoggedInuser]: loggedInUser", loggedInUser);

    // check if the user is already registered
    const userInMongoDB = await UsersModel.findOne({
      clerkUserId: loggedInUser?.id,
    });

    if (userInMongoDB) {
      return userInMongoDB._id;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
