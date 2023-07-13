import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const { email, secret } = req.body;
  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed" });
  }
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  if (email) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User with the same email already exists" });
    }
    const newUser = await prisma.user.create({
      data: { email },
    });
    await prisma.timersetting.create({
      data: {
        user: { connect: { id: newUser.id } },
      },
    });
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate = currentDate.toISOString();
    await prisma.tomatodetail.create({
      data: {
        user: { connect: { id: newUser.id } },
        currentDate: currentDate,
      },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;
