import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className={styles.main}>
      <h1>welcome { session?.user?.name } </h1>
    </main>
  )
}
