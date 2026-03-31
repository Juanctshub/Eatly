import { PrismaClient } from '@prisma/client'
import path from 'path'

// Get Absolute Path for SQLite on Windows to avoid 'Error code 14'
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const dbUrl = `file:${dbPath}`

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('dev.db') 
          ? process.env.DATABASE_URL 
          : dbUrl
      }
    },
    log: ['query', 'error', 'info', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db