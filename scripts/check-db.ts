import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  try {
    console.log('--- DIAGNÓSTICO DE BASE DE DATOS ---')
    const userCount = await prisma.user.count()
    console.log(`Usuarios en BD: ${userCount}`)
    
    const users = await prisma.user.findMany({
      include: { preferences: true, restrictions: true }
    })
    
    users.forEach(u => {
      console.log(`Usuario: ${u.name} | Meta: ${u.goal} | Restricciones: ${u.restrictions.length}`)
    })
    
    if (users.length === 0) {
      console.log('ADVERTENCIA: La base de datos está VACÍA.')
    }
  } catch (e) {
    console.error('ERROR CRÍTICO AL LEER BD:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
