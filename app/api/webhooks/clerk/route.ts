import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const webhookSecret = process.env.WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("Please add webhook secret in env");
  }

  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error Occured - NO SVIX HEADERS");
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);


  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook: ", error);
    return new Response("Error Occured", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  // logs
  if (eventType === "user.created") {
    try {
      const { id, email_addresses, username, first_name, last_name, image_url } = evt.data;
      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name!,
        lastName: last_name!,
        photo: image_url,
      };
      const newUser = await createUser(user);

      if (newUser) {
        try {
          // First, await the clerkClient to get the actual client instance
          const clerk = await clerkClient();
          
          // Now use the clerk instance to update user metadata
          await clerk.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: newUser._id,
            }
          });
        } catch (error) {
          console.error("Error updating user metadata in Clerk:", error);
          return NextResponse.json({ message: "Error updating user metadata" }, { status: 500 });
        }
      }
      return NextResponse.json({ message: "OK", user: newUser });
    } catch (error) {
      console.error("Error in creating user");
    }
  }


  if (eventType === "user.updated") {
    try {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name!,
        lastName: last_name!,
        username: username!,
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: "OK", user: updatedUser });
    } catch (err) {
      console.error("Error in Updating User: ", err);
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id!);

      return NextResponse.json({ message: "OK", user: deletedUser });
    }
    catch (err) {
      console.error("Error in Deleting user: ", err);
    }
  }
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", body);

    return new Response("", { status: 200 });
}