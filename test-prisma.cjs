const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: 'test' + Date.now() + '@example.com',
        name: 'Test User',
      }
    });
    console.log('User created:', user.id);
  } catch (e) {
    console.error('ERROR:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
