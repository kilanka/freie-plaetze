import { KeystoneContext } from "@keystone-next/keystone/types";

import { institutions, users } from "./data";

export async function insertSeedData(context: KeystoneContext) {
  console.log(`🌱 Inserting seed data`);

  const createUser = async (userData: any) => {
    let user = null;
    try {
      user = await context.query.User.findOne({
        where: { email: userData.email },
        query: "id",
      });
    } catch (e) {}
    if (!user) {
      user = await context.query.User.createOne({
        data: userData,
        query: "id",
      });
    }
    return user;
  };

  const createPost = async (institutionData: any) => {
    let users;
    try {
      users = await context.query.User.findMany({
        where: { name: { equals: institutionData.owner } },
        query: "id",
      });
    } catch (e) {
      users = [];
    }
    institutionData.owner = { connect: { id: users[0].id } };
    const post = await context.query.Institution.createOne({
      data: institutionData,
      query: "id",
    });
    return post;
  };

  for (const user of users) {
    console.log(`👩 Adding user: ${user.name}`);
    await createUser(user);
  }
  for (const institution of institutions) {
    console.log(`📝 Adding institution: ${institution.name}`);
    await createPost(institution);
  }

  console.log(`✅ Seed data inserted`);
  process.exit();
}
